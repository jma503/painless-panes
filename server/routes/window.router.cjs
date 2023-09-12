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

router.post("/upload/test", requireAuthenticationMiddleware, (req, res) => {
  const imageData = req.body.image;
  // --TODO-- since this is a base64 encoding and not an image upload, we
  // can't use the built-in hash as a filename. will just have to
  // come up with something else
  // const hash = req.files.image.md5;
  // --TODO-- the image key will contain the folder inside the
  // painless-panes bucket and the file name (currently test).
  // the file name should be changed to the unique identifier we decide
  // to use instead of the hash
  const imageKey = `${req.user.id}/test`; // folder/file
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET,
    Key: imageKey, // folder/file
    Body: imageData, // image data to upload
  });

  // send back the md5 hash to store in the database
  // used for accessing the photos
  s3Client.send(command).then((response) => {
    console.log(imageKey);
    res.send(imageKey).status(200);
  });
});

router.get("/upload/test", async (req, res) => {
  try {
    // const { imageName } = req.params;
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET,
      Key: `1/test`, // folder/file
    });
    const data = await s3Client.send(command);
    data.Body.pipe(res);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
