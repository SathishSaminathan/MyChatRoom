import { SET_USER, CLEAR_USER, ACTIVE_MESSAGE } from "./types";

export const setUser = user => {
  return {
    type: SET_USER,
    payload: {
      current_user: user
    }
  };
};

export const clearUser = () => {
  return {
    type: CLEAR_USER
  };
};

export const setActiveMessage = (messageId) => {
  return {
    type: ACTIVE_MESSAGE,
    messageId:messageId
  };
};
