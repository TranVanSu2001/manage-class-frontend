import { SAVE_INFOMATION_SIGN_IN, SET_AUTH_USER } from "../type";

const initialState = {
  usernameLogin: "",
  passwordLogin: "",
  isAuth: false,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SAVE_INFOMATION_SIGN_IN:
      return {
        ...state,
        usernameLogin: payload.usernameLogin,
        passwordLogin: payload.passwordLogin,
      };

    case SET_AUTH_USER:
      return {
        ...state,
        isAuth: payload,
      };

    default:
      return state;
  }
};

export default userReducer;
