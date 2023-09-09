import { combineReducers, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import logger from "redux-logger";
// Import reducers
import { userReducer } from "./reducers/user.reducer";
import { projectReducer } from "./reducers/project.reducer";
import {
  allWindowsReducer,
  currentWindowReducer,
} from "./reducers/window.reducer";
// Import sagas
import { emailSaga } from "./sagas/email.saga";
import { userSaga } from "./sagas/user.saga";
import { projectSaga } from "./sagas/project.saga";
import { windowSaga } from "./sagas/window.saga";

// 1. Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// 2. Create the redux store
const store = createStore(
  combineReducers({
    user: userReducer,
    project: projectReducer,
    allWindows: allWindowsReducer,
    currentWindow: currentWindowReducer,
  }),
  applyMiddleware(sagaMiddleware, logger)
);

// 3. Create the root saga
function* rootSaga() {
  yield all([userSaga(), emailSaga(), projectSaga(), windowSaga()]);
}

// 4. Run the root saga
sagaMiddleware.run(rootSaga);

export default store;
