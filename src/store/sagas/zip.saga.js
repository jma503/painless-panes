import axios from "axios";
import { takeLatest } from "redux-saga/effects";

//action types
const ADD_ZIP = "ADD_ZIP";

//action functions
export const addZipCode = (payload) => {
  return { type: ADD_ZIP, payload };
};

//action worker sagas
export function* addZipCodeSaga(action) {
  try {
    const response = yield axios.post("/api/project", action.payload);
  } catch (error) {
    console.error(error);
  }
}

//watcher saga
export function* zipCodeSaga() {
  yield takeLatest(ADD_ZIP, addZipCodeSaga);
}
