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
      project_id
    );
    const windowId = yield windowIdResponse.data;
    yield put(setCurrentWindowId(windowId));
    const windowPicToAdd = { image: action.payload.image, windowId: windowId };
    const windowPathResponse = yield axios.post(
      `/api/window/photoUpload/blah`,
      windowPicToAdd
    );
    // can then dispatch a put to update the path to the photo in the database
    // with windowPathResponse

    // yield put(
    //   addWindowPhoto({
    //     windowId: windowId,
    //     image: action.payload.image,
    //   })
    // );
  } catch (error) {
    console.error(error);
  }
}

// export function* addWindowPhoto(action) {
//   try {
//     const response = yield axios.post(
//       `/api/window/photoUpload/blah`,
//       action.payload
//     );
//     // const windowId = yield response.data;
//     // yield put(setCurrentWindowId(windowId));
//     // console.log("Window ID from server --> ", windowId);
//   } catch (error) {
//     console.error(error);
//   }
// }

// watcher saga
export function* windowSaga() {
  yield takeLatest(ADD_WINDOW, addWindowSaga);
  // yield takeLatest(ADD_WINDOW_PHOTO, addWindowPhoto);
}
