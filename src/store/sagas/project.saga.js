import axios from "axios";
import { put, select, takeLatest } from "redux-saga/effects";
import { setProject, setAllProjects } from "../reducers/project.reducer";

/** 1. CURRENT PROJECT SAGAS **/
//action types
const GET_PROJECT = "GET_PROJECT";
const GET_ALL_PROJECTS = "GET_ALL_PROJECTS"
const UPDATE_PROJECT_ZIP_CODE = "UPDATE_PROJECT_ZIP_CODE";

//action functions
export const getProject = () => {
  return { type: GET_PROJECT };
};

export const updateProjectZipCode = (payload) => {
  return { type: UPDATE_PROJECT_ZIP_CODE, payload };
};

//action worker sagas
export function* getProjectSaga() {
  try {
    const response = yield axios.get("/api/project/latest");
    const project = yield response.data;
    yield put(setProject(project));
  } catch (error) {
    console.error(error);
  }
}

//action functions
<<<<<<< HEAD
export const getAllProjects = () => {
=======
export const getAllProject = () => {
>>>>>>> a7890c5b25b811cd017f9f8af5c5a4fe7cf23214
  return { type: GET_ALL_PROJECTS };
};

//action worker sagas
<<<<<<< HEAD
export function* getAllProjectsSaga() {
=======
export function* getAllProjectSaga() {
>>>>>>> a7890c5b25b811cd017f9f8af5c5a4fe7cf23214
  try {
    const response = yield axios.get("/api/project/all");
    const project = yield response.data;
    yield put(setAllProjects(project));
  } catch (error) {
    console.error(error);
  }
}


export function* updateProjectZipCodeSaga(action) {
  try {
    const project = yield select((store) => store.project);
    console.log("Project:", project);
    console.log("Zip code update:", action.payload);
    yield axios.put(`/api/project/zip/${project.id}`, action.payload);
    yield put(getProject());
  } catch (error) {
    console.error(error);
  }
}

//watcher saga
export function* projectSaga() {
  yield takeLatest(GET_PROJECT, getProjectSaga);
  yield takeLatest(GET_ALL_PROJECTS, getAllProjectsSaga);
  yield takeLatest(UPDATE_PROJECT_ZIP_CODE, updateProjectZipCodeSaga);
}
