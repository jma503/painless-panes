const express = require("express");
require("dotenv").config();

const app = express();

const sessionMiddleware = require("./middlewares/session.middleware.cjs");
const passport = require("./modules/passport.cjs");

// Route includes
const emailRouter = require("./routes/email.router.cjs");
const userRouter = require("./routes/user.router.cjs");
const frameRouter = require("./routes/frame.router.cjs")
const projectRouter = require("./routes/project.router.cjs")
const locationRouter = require("./routes/location.router.cjs");

// Express middleware
app.use(express.json());

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/api/email", emailRouter);
app.use("/api/user", userRouter);
app.use("api/frames", frameRouter)
app.use("/api/project", projectRouter);
app.use("/api/location", locationRouter);

// Serve static files
app.use(express.static("build"));

/** Listen * */
app.listen(process.env.PORT, () => {
  console.log(`Listening on port: ${process.env.PORT}`);
});
