const query = require("../queries/project.query.cjs");

const express = require("express");
const {
  requireAuthenticationMiddleware,
} = require("../middlewares/auth.middleware.cjs");

const router = express.Router();

/** 
@apiBody {Object} body The user’s zip code: {“zip”: <String>}
@apiSuccess {Object} response The project ID: {“id”: <Number>}
*/

router.post("/api/project", requireAuthenticationMiddleware, async (req, res) => {
    try {
      await query.addZipCode(req.body);
      res.sendStatus(201);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  });