import axios from "axios";
import { takeLatest } from "redux-saga/effects";

// action types
const SEND_EMAIL = "SEND_EMAIL";
const SEND_CONFIRMATION_EMAIL = "SEND_CONFIRMATION_EMAIL"

// action functions
export const sendEmail = (payload) => {
  return { type: SEND_EMAIL, payload };
};

export const sendConfirmationEmail = () => {
  return { type: SEND_CONFIRMATION_EMAIL};
};

// action worker sagas
export function* sendEmailSaga(action) {
  try {
    const response = yield axios.post("/api/email/send", action.payload);
  } catch (error) {
    console.error(error);
  }
}

export function* sendConfirmationEmailSaga(action) {
  try {
    const response = yield axios.post("/api/email/confirmation", action.payload);
  } catch (error) {
    console.error(error);
  }
}

// watcher saga
export function* emailSaga() {
  yield takeLatest(SEND_EMAIL, sendEmailSaga);
  yield takeLatest(SEND_CONFIRMATION_EMAIL, sendConfirmationEmailSaga);
}
