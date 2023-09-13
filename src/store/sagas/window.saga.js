import axios from "axios";
import { put, select, takeLatest } from "redux-saga/effects";
import { setAllWindows, setCurrentWindowId } from "../reducers/window.reducer";

// action types
export const GET_ALL_WINDOWS = "GET_ALL_WINDOWS";
export const ADD_WINDOW = "ADD_WINDOW";

// action functions
export const getAllWindows = (payload) => {
  return { type: GET_ALL_WINDOWS, payload };
};

export const addWindow = (payload) => {
  return { type: ADD_WINDOW, payload };
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
  const project_id = action.payload.project_id;
  try {
    const response = yield axios.post(
      `/api/window/:${action.payload.project_id}`,
      action.payload
    );
    const windowId = yield response.data;
    yield put(setCurrentWindowId(windowId));
    console.log("Window ID from server --> ", windowId);
  } catch (error) {
    console.error(error);
  }
}

export function* updateWindowImage(action) {
  const windowId = action.payload.id;
  try {
    const response = yield axios.put(
      `/api/window/image/:${windowId}`, action.payload
    );
    const windowImage = response.data
    yield put (setCurrentWindowId(windowImage))
  }
  catch (error) {
    console.error(error);
  }
};

// watcher saga
export function* windowSaga() {
  yield takeLatest(GET_ALL_WINDOWS, getAllWindowsSaga);
  yield takeLatest(ADD_WINDOW, addWindowSaga);
}
