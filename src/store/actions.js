/**
 * Gathers all of the actions in one place for easy lookup
 */
import { sendEmail } from "./sagas/email.saga";
import { getUser } from "./sagas/user.saga";

const actions = {
  // email
  sendEmail,
  // user
  getUser,
};

export default actions;
