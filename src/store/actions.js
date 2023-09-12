/**
 * Gathers all of the actions in one place for easy lookup
 */
import { sendEmail } from "./sagas/email.saga";
import { getUser } from "./sagas/user.saga";
import { getProject, updateProjectZipCode } from "./sagas/project.saga";
import { getFrames } from "./sagas/frame.saga";
import { getAllWindows, addWindow } from "./sagas/window.saga";

const actions = {
  // email
  sendEmail,
  // user
  getUser,
  // project
  getProject,
  updateProjectZipCode,
  //frames
  getFrames,
  //window
  getAllWindows,
  addWindow,
};

export default actions;
