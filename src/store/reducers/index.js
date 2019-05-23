import { combineReducers } from "redux";
import * as actionTypes from "../actions/types";

const initialState = {
  current_user: null
};

const user_reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        current_user: action.payload.current_user
      };
    default:
      return state;
  }
};

const root_reducer = combineReducers({
  user: user_reducer
});

export default root_reducer;
