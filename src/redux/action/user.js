import { SAVE_INFOMATION_SIGN_IN, SET_AUTH_USER } from "../type";

export const actSaveInfomationSignIn = (payload) => ({
  type: SAVE_INFOMATION_SIGN_IN,
  payload,
});

export const actSetAuthUser = (payload) => ({
  type: SET_AUTH_USER,
  payload,
});
