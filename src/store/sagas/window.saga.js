import axios from "axios";
import { put, select, takeLatest } from "redux-saga/effects";
import { setAllWindows, setCurrentWindowId } from "../reducers/window.reducer";

// action types
export const GET_ALL_WINDOWS = "GET_ALL_WINDOWS";
export const ADD_WINDOW = "ADD_WINDOW";
export const ADD_WINDOW_PHOTO = "ADD_WINDOW_PHOTO";

// action functions
export const getAllWindows = (payload) => {
  return { type: GET_ALL_WINDOWS, payload };
};

export const addWindow = (payload) => {
  return { type: ADD_WINDOW, payload };
};

export const addWindowPhoto = (payload) => {
  return { type: ADD_WINDOW_PHOTO, payload };
};

// action worker sagas
export function* getAllWindowsSaga(action) {
  const project_id = action.payload.project_id;
  console.log("Getting all windows for project:", project_id);
  try {
    const response = yield axios.get(`/api/window/${project_id}`);
    const windows = yield response.data;
    console.log("Received window list:", windows);
    yield put(setAllWindows(windows));

    // If the currentWindowId is null, set it to the last window in he list
    const currentWindowId = yield select((store) => store.currentWindowId);
    if (currentWindowId === null) {
      const lastWindowId = Math.max(windows.map((window) => window.id));
      yield put(setCurrentWindowId(lastWindowId));
    }
  } catch (error) {
    console.error(error);
  }
}

export function* addWindowSaga(action) {
  const project_id = action.payload.get("project_id");
  try {
    const windowIdResponse = yield axios.post(
      `/api/window/${project_id}`,
      project_id
    );
    // id of the created window
    const windowId = yield windowIdResponse.data;
    yield put(setCurrentWindowId(windowId));
    e;
  } catch (error) {
    console.error(error);
  }
}

export function* addWindowPhotoSaga(action) {
  const project_id = action.payload.get("project_id");
  // const currentWindowId = action.payload.get("current_window_id");
  try {
    // folder/file of the bucket the image is stored in
    const windowPathResponse = yield axios.post(
      `/api/window/photoUpload/aws`,
      action.payload
    );
    console.log(windowPathResponse.data);
    // can then dispatch a put to update the path to the photo in the database
    // with windowPathResponse
  } catch (error) {
    console.error(error);
  }
}

// watcher saga
export function* windowSaga() {
  yield takeLatest(GET_ALL_WINDOWS, getAllWindowsSaga);
  yield takeLatest(ADD_WINDOW, addWindowSaga);
  yield takeLatest(ADD_WINDOW_PHOTO, addWindowPhotoSaga);
}
