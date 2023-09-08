import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";

// action types
const ADD_WINDOW = "ADD_WINDOW";

// action functions
export const addWindow = (payload) => {
  return { type: ADD_WINDOW, payload };
};

// action worker sagas
export function* addWindowSaga(action) {
  try {
    const response = yield axios.post(
      `/api/window/:${action.payload.project_id}`,
      action.payload
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
