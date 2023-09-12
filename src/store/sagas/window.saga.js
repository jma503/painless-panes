import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { setCurrentWindowId } from "../reducers/window.reducer";
// action types
export const ADD_WINDOW = "ADD_WINDOW";
export const ADD_WINDOW_PHOTO = "ADD_WINDOW_PHOTO";

// action functions
export const addWindow = (payload) => {
  return { type: ADD_WINDOW, payload };
};

export const uploadWindowPhoto = (payload) => {
  return { type: ADD_WINDOW, payload };
};

// action worker sagas
export function* addWindowSaga(action) {
  const project_id = action.payload.project_id;
  try {
    const windowIdResponse = yield axios.post(
      `/api/window/${project_id}`,
      action.payload
    );
    // id of the created window
    const windowId = yield windowIdResponse.data;
    yield put(setCurrentWindowId(windowId));
    const windowPicToAdd = { image: action.payload.image, windowId: windowId };
    // folder/file of the bucket the image is stored in
    const windowPathResponse = yield axios.post(
      `/api/window/photoUpload/user`,
      windowPicToAdd
    );
    // console.log(windowPathResponse);
    // can then dispatch a put to update the path to the photo in the database
    // with windowPathResponse
  } catch (error) {
    console.error(error);
  }
}

// watcher saga
export function* windowSaga() {
  yield takeLatest(ADD_WINDOW, addWindowSaga);
}
