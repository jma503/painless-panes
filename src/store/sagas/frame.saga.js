import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { setFrames } from "../reducers/frame.reducer";

// action types
const GET_FRAMES = "GET_FRAMES";

// action functions
export const getFrames = () => {
    return { type: GET_FRAMES};
  };

  // action worker sagas
export function* getFramesSaga() {
  try {
    const response = yield axios.get("/api/frames");
    const frames = yield response.data;
    yield put(setFrames(frames));
  } catch (error) {
    console.error(error);
  }
}

// watcher saga
export function* framesSaga() {
    yield takeLatest(GET_FRAMES, getFramesSaga);
  }