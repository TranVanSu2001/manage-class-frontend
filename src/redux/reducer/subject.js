import {
  SET_ADD_SUBJECT_MODAL,
  SET_EDIT_SUBJECT_MODAL,
  SET_VIEW_SUBJECT_MODAL,
} from "../type";

const initialState = {
  activeAddModal: false,
  activeEditModal: false,
};

const subjectReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ADD_SUBJECT_MODAL:
      return {
        ...state,
        activeAddModal: payload,
      };

    case SET_EDIT_SUBJECT_MODAL:
      return {
        ...state,
        activeEditModal: payload,
      };

    default:
      return state;
  }
};

export default subjectReducer;
