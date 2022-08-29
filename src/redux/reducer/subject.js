import {
  SET_ADD_SUBJECT_MODAL,
  SET_EDIT_SUBJECT_MODAL,
  GET_LIST_ID_SUBJECT,
  SAVE_GET_LIST_SUBJECT,
  SAVE_SELECTED_SUBJECT,
} from "../type";

const initialState = {
  listSubject: [],
  activeAddModal: false,
  activeEditModal: false,
  listIdSubject: [],
  selectedSubject: {},
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

    case GET_LIST_ID_SUBJECT:
      return {
        ...state,
        listIdSubject: payload,
      };

    case SAVE_GET_LIST_SUBJECT:
      return {
        ...state,
        listSubject: payload,
      };

    case SAVE_SELECTED_SUBJECT:
      return {
        ...state,
        selectedSubject: payload,
      };

    default:
      return state;
  }
};

export default subjectReducer;
