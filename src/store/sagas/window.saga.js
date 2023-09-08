import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// action types
const ADD_WINDOW = "ADD_WINDOW";

// action functions
export const addWindow = () => {
  return { type: ADD_WINDOW };
};

// action worker sagas
export function* addWindowSaga() {
  try {
    const response = yield axios.get("/api/window/:id");
    const frames = yield response.data;
    yield put(setFrames(frames));
  } catch (error) {
    console.error(error);
  }
}

// watcher saga
export function* windowSaga() {
  yield takeLatest(ADD_WINDOW, addWindowSaga);
}
