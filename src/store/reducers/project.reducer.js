/** 1. CURRENT PROJECT REDUCER **/
// action types
const SET_PROJECT = "SET_PROJECT";

// action functions
export const setProject = (payload) => {
  return { type: SET_PROJECT, payload };
};

// reducer
export function projectReducer(state = {}, action) {
  switch (action.type) {
    case SET_PROJECT:
      return action.payload;
    default:
      return state;
  }
}

// /** If we wanted to additionally track past projects for the user **/
// /** 2. PROJECTS REDUCER **/
// // action types
const SET_ALL_PROJECTS = "SET_ALL_PROJECTS";

// action functions
export const setAllProjects = (payload) => {
  return { type: SET_ALL_PROJECTS, payload };
};

// reducer
export function allProjectsReducer(state = [], action) {
  switch (action.type) {
    case SET_ALL_PROJECTS:
      return action.payload;
    default:
      return state;
  }
}
