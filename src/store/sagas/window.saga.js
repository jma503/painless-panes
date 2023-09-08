import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// action types
const ADD_WINDOW = "ADD_WINDOW";

// action functions
export const addWindow = () => {
  return { type: ADD_WINDOW };
};

// action worker sagas
export function* addWindowSaga(window) {
  // const {
  //   image,
  //   height,
  //   width,
  //   location_id,
  //   current_frame_id,
  //   desired_frame_id,
  //   project_id,
  // } = window;

  try {
    const response = yield axios.post(
      `/api/window/:${window.project_id}`,
      window
    );
    const windowId = yield response.data;
    // yield put(setWindow(window));
    console.log("Window ID from server --> ", windowId);
  } catch (error) {
    console.error(error);
  }
}

// watcher saga
export function* windowSaga() {
  yield takeLatest(ADD_WINDOW, addWindowSaga);
}
