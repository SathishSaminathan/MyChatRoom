import { combineReducers } from "redux";
import * as actionTypes from "../actions/types";

const initialState = {
  currentUser: null
};

const user_reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        currentUser: action.payload.current_user
      };
    case actionTypes.CLEAR_USER:
      return {
        ...state,
        currentUser: null
      };
    default:
      return state;
  }
};

const root_reducer = combineReducers({
  user: user_reducer
});

export default root_reducer;
