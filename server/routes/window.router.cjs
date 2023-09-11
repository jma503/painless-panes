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
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
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
  const user = req.user;
  try {
    const project = await query.getListOfWindows(user.projectId);
    console.log(`Get all windows for project ${user.projectId}:`, project);
    res.send(project);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post(
  "/upload/:projectId",
  requireAuthenticationMiddleware,
  (req, res) => {
    // if the file body is null (no photo provided)
    const projectId = req.params.projectId;
    if (req.files === null) {
      res.json(null).status(200);

      // if a photo is provided, process and upload it
    } else {
      const imageData = req.files.image.data;
      const hash = req.files.image.md5;
      const imageKey = `${req.user.id}/${hash}`; // folder/file
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET,
        Key: imageKey, // folder/file
        Body: imageData, // image data to upload
      });

      // send back the md5 hash to store in the database
      // used for accessing the photos
      s3Client.send(command).then((response) => {
        res.json(hash).status(200);
      });
    }
  }
);

module.exports = router;
