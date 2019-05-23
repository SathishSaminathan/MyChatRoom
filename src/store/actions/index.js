import { SET_USER, CLEAR_USER } from "./types";

export const setUser = user => {
  return {
    type: SET_USER,
    payload: {
      current_user: user
    }
  };
};

export const clearUser =()=>{
  return{
    type:CLEAR_USER,
  }
}
