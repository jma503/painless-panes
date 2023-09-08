/**
 * Gathers all of the actions in one place for easy lookup
 */
import { sendEmail } from "./sagas/email.saga";
import { getUser } from "./sagas/user.saga";
import { getFrames } from "./sagas/frame.saga";
import { addWindow } from "./sagas/window.saga";
import { addZipCode } from "./sagas/zip.saga";

const actions = {
  // email
  sendEmail,
  // user
  getUser,
  //frames
  getFrames,
  //window
  addWindow,
  // zip code
  addZipCode,
};

export default actions;
