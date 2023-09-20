/**
 * Gathers all of the actions in one place for easy lookup
 */
import { sendEmail } from "./sagas/email.saga";
import { sendConfirmationEmail } from "./sagas/email.saga";
import { getUser } from "./sagas/user.saga";
import { getProject, updateProjectZipCode, getAllProjects } from "./sagas/project.saga";
import { getFrames } from "./sagas/frame.saga";
import {
  getAllWindows,
  addWindow,
  updateWindowDimensions,
  addWindowPhoto,
} from "./sagas/window.saga";

const actions = {
  // email
  sendEmail,
  //confirmation email
  sendConfirmationEmail,
  // user
  getUser,
  // project
  getProject,
  updateProjectZipCode,
  getAllProjects,
  //frames
  getFrames,
  //window
  getAllWindows,
  addWindow,
  updateWindowDimensions,
  addWindowPhoto,
};

export default actions;
