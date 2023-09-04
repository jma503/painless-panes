import axios from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { setUser } from "../reducers/user.reducer";

// action types
const GET_USER = "GET_USER";

// action functions
export const getUser = () => {
  return { type: GET_USER };
};

// action worker sagas
export function* getUserSaga() {
  try {
    const response = yield axios.get("/api/user");
    const user = yield response.data;
    yield put(setUser(user));
  } catch (error) {
    console.error(error);
  }
}

// watcher saga
export function* userSaga() {
  yield takeLatest(GET_USER, getUserSaga);
}
