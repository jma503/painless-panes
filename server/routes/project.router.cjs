const express = require("express");
const {
  requireAuthenticationMiddleware,
} = require("../middlewares/auth.middleware.cjs");
const query = require("../queries/project.query.cjs");

const router = express.Router();

/**
 * @api {GET} /api/project/latest Get the latest project for the current user
 *
 * @apiSuccess {Object} response The latest project:
 *   {"id": <Number>, "zip": <String>, "user_id": <Number>}
 */
router.get("/latest", requireAuthenticationMiddleware, async (req, res) => {
  const user = req.user;
  try {
    const project = await query.lookupLatestProject(user.id);
    console.log(`Latest project for user ${user.id}:`, project);
    res.send(project);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

/**
 * @api {PUT} /api/project/zip/:projectId Set the zip code for a project
 *
 * @apiBody {Object} body The user’s zip code: {“zipCode”: <String>}
 */
router.put(
  "/zip/:projectId",
  requireAuthenticationMiddleware,
  async (req, res) => {
    try {
      await query.updateZipCode({ ...req.body, id: req.params.projectId });
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  }
);

module.exports = router;
