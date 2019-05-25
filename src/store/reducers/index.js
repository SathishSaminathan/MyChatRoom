import { combineReducers } from "redux";
import * as actionTypes from "../actions/types";

const initialState = {
  currentUser: null,
  messageId: null
};

const user_reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        currentUser: action.payload.current_user
      };
    case actionTypes.CLEAR_USER:
      return {
        ...state,
        currentUser: null,
        messageId: null
      };
    case actionTypes.ACTIVE_MESSAGE:
      return {
        ...state,
        messageId: action.messageId
      };
    default:
      return state;
  }
};

const root_reducer = combineReducers({
  user: user_reducer
});

export default root_reducer;
