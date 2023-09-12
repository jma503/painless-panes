// Commenting for now - don't believe we need a reducer for POSTing a frame,
// leaving it in in case we do need a window reducer down the road

// action types
export const SET_ALL_WINDOWS = "SET_ALL_WINDOWS";
export const SET_CURRENT_WINDOW_ID = "SET_CURRENT_WINDOW_ID";

// action functions
export const setAllWindows = (payload) => {
  return { type: SET_ALL_WINDOWS, payload };
};

// action to set the current window ID
export const setCurrentWindowId = (payload) => {
  return { type: SET_CURRENT_WINDOW_ID, payload };
};

// reducer
export function allWindowsReducer(state = [], action) {
  switch (action.type) {
    case SET_ALL_WINDOWS:
      return action.payload;
    default:
      return state;
  }
}

export function currentWindowIdReducer(state = null, action) {
  switch (action.type) {
    // returns the current window's ID via state as an object
    case SET_CURRENT_WINDOW_ID:
      return action.payload;
    default:
      return state;
  }
}
