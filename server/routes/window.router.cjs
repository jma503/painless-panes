/**
 * Window-related routes
 *
 *Prefix: /api/window
 *
 *
 *@api {POST} /api/window/:projectId Create a new window for this project and get the new window’s ID
 */
const query = require("../queries/window.query.cjs");

const express = require("express");
const {
  requireAuthenticationMiddleware,
} = require("../middlewares/auth.middleware.cjs");

// AWS Declarations
const {
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
  ListObjectsV2Command,
} = require("@aws-sdk/client-s3");
const s3Client = new S3Client({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const router = express.Router();

/** 
@apiParam {Number} projectId The project ID to create this window for
@apiSuccess {Object} response The window ID: {“id”: <Number>}
*/
router.post(
  "/:projectId",
  requireAuthenticationMiddleware,
  async (req, res) => {
    const projectId = req.params.projectId;
    console.log(projectId);
    try {
      const windowId = await query.addWindow(projectId);
      res.status(200).send(windowId);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

/** 
@api {GET} /api/window/:projectId Get all windows for a project
@apiSuccess {Object[]} response A list of window objects:
[
{"id": <Number>, "image": <String>, "height": <Number>, "width": <Number>, "desired_frame_id": <Number>, "project_id": <Number>},
...
]
*/

router.get("/:projectId", requireAuthenticationMiddleware, async (req, res) => {
  const projectId = req.params.projectId;
  try {
    const project = await query.getListOfWindows(projectId);
    console.log(`Get all windows for project ${projectId}:`, project);
    res.send(project);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post(
  `/photoUpload/user`,
  requireAuthenticationMiddleware,
  (req, res) => {
    const imageData = req.body.image;
    const windowId = req.body.windowId;
    const imageKey = `${req.user.id}/${windowId.id}`; // folder/file
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: imageKey, // folder/file
      Body: imageData, // image data to upload
    });

    // send back the md5 hash to store in the database
    // used for accessing the photos
    s3Client.send(command).then((response) => {
      // console.log(imageKey);
      res.send(imageKey).status(200);
    });
  }
);

router.get("/upload/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.AWS_BUCKET,
      Prefix: userId,
    });
    s3Client.send(command).then((response) => {
      const data = response.Contents;
      console.log(data);
      res.send(data).status(200);
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
