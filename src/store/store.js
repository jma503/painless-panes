import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import logger from "redux-logger";
// Import reducers
import { userReducer } from "./reducers/user.reducer";
import { projectReducer, allProjectsReducer } from "./reducers/project.reducer";
import {
  allWindowsReducer,
  currentWindowIdReducer,
} from "./reducers/window.reducer";
import { framesReducer } from "./reducers/frame.reducer";
// Import sagas
import { emailSaga } from "./sagas/email.saga";
import { userSaga } from "./sagas/user.saga";
import { projectSaga } from "./sagas/project.saga";
import { windowSaga } from "./sagas/window.saga";
import { framesSaga } from "./sagas/frame.saga";

// 1. Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// 2. Create the redux store
const store = createStore(
  combineReducers({
    user: userReducer,
    project: projectReducer,
    projects: allProjectsReducer,
    allWindows: allWindowsReducer,
    currentWindowId: currentWindowIdReducer,
    frames: framesReducer,
  }),
  applyMiddleware(sagaMiddleware, logger)
);

// 3. Create the root saga
function* rootSaga() {
  yield all([
    userSaga(),
    emailSaga(),
    projectSaga(),
    windowSaga(),
    framesSaga(),
  ]);
}

// 4. Run the root saga
sagaMiddleware.run(rootSaga);

export default store;
