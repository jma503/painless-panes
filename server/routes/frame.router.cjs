const express = require("express");
const query = require("../queries/frame.query.cjs")

const router = express.Router();

/**
 * @api {get} /frame - Get all frames from database
 */
router.get("/", async (_, res) => {
    try {
      frames = await query.getFrames();
      res.status(200).send(frames);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });

router.put("/:id", async (_, res) => {
  try {
    const windowId = req.params.id;
    const { desired_frame_id } = req.body;

    if (desired_frame_id === undefined) {
      return res.status(400).json({ error: "desired_frame_id is required for the update." });
    } 

    const updateQuery = `
    UPDATE "window"
    SET desired_framed_id = $1
    WHERE id = $2
    `;

    await pool.query(updateQuery, [desired_frame_id, windowId]);

    res.status(200).json({ message: "Window's desired_frame_id updated successfully." });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

  module.exports = router;