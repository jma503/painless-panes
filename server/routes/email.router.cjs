/**
 * Email verification routes
 *
 * Prefix: /api/email
 *
 * (See https://apidocjs.com/ for API documentation format)
 */
const express = require("express");
const {
  sendEmailMiddleware,
  verifyEmailMiddleware,
} = require("../middlewares/auth.middleware.cjs");

const router = express.Router();

const { sendContactEmail } = require("../modules/email.cjs");

/**
 * @api {post} /api/email/send Send the user an email with a magic link for verification
 *
 * @apiBody {String} email The user's email address
 */
router.post("/send", sendEmailMiddleware, (req, res) => {
  console.log(`Sent emaill with magic link to ${req.body.email}`);
  res.sendStatus(202);
});

/**
 * @api {get} /api/email/verify This will be triggered by the magic link
 *
 * @apiParam {String} token The verification token in the magic link
 */
router.get("/verify", verifyEmailMiddleware, (req, res) => {
  console.log("The email checks out. The user has been added to the database");
  console.log("Redirecting to", process.env.CLIENT_URL);
  return res.status(201).redirect(`${process.env.CLIENT_URL}/form/1`);
});

/**
 * @api {post}
 *
 * @apiBody {String} email The sender's email address
 * @apiBody {String} message The message to be sent
 */

router.post("/contact", async (req, res) => {
  try {
    const { email, message } = req.body;
    console.log("Received contact request", { email, message });
    const response = await sendContactEmail(email, message);

    console.log("Email sent successfully", response);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.log("Failed to send email", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
