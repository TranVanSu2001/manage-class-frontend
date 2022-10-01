import { SAVE_INFOMATION_SIGN_IN } from "../type";

const initialState = {
  usernameLogin: "",
  passwordLogin: "",
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

    default:
      return state;
  }
};

export default userReducer;
