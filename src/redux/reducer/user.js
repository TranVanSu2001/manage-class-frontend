import { SAVE_INFOMATION_SIGN_IN, USER_LOG_OUT } from "../type";

const initialState = {
  token: "",
  passwordLogin: "",
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SAVE_INFOMATION_SIGN_IN:
      return {
        ...state,
        usernameLogin: payload.usernameLogin,
        token: payload.token
      };

    case USER_LOG_OUT:
      return initialState;

    default:
      return state;
  }
};

export default userReducer;
