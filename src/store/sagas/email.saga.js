import axios from "axios";
import { takeLatest } from "redux-saga/effects";

// action types
const SEND_EMAIL = "SEND_EMAIL";

// action functions
export const sendEmail = (payload) => {
  return { type: SEND_EMAIL, payload };
};

// action worker sagas
export function* sendEmailSaga(action) {
  try {
    const response = yield axios.post("/api/email/send", action.payload);
  } catch (error) {
    console.error(error);
  }
}

// watcher saga
export function* emailSaga() {
  yield takeLatest(SEND_EMAIL, sendEmailSaga);
}
