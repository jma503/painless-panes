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
// const SET_PROJECTS = "SET_PROJECTS";

// // action functions
// export const setProjects = (payload) => {
//   return { type: SET_PROJECTS, payload };
// };

// // reducer
// export function projectsReducer(state = [], action) {
//   switch (action.type) {
//     case SET_PROJECTS:
//       return action.payload;
//     default:
//       return state;
//   }
// }
