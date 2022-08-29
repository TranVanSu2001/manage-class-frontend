import {
  SET_ADD_STUDENT_MODAL,
  SET_EDIT_STUDENT_MODAL,
  SET_VIEW_STUDENT_MODAL,
  SAVE_GET_LIST_STUDENT,
  SAVE_SELECTED_STUDENT,
  GET_LIST_ID_STUDENT,
  SAVE_CREATE_STUDENT,
  SAVE_RECEIVE_MAIL,
  SAVE_SUBJECT_MAIL,
} from "../type";

const initialState = {
  listStudent: [],
  activeAddModal: false,
  activeEditModal: false,
  activeViewModal: false,
  selectedStudent: {},
  listIdStudent: [],
  receiveMail: "",
  subjectMail: "",
};

const studentReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ADD_STUDENT_MODAL:
      return {
        ...state,
        activeAddModal: payload,
      };

    case SET_EDIT_STUDENT_MODAL:
      return {
        ...state,
        activeEditModal: payload,
      };

    case SET_VIEW_STUDENT_MODAL:
      return {
        ...state,
        activeViewModal: payload,
      };

    case SAVE_GET_LIST_STUDENT:
      return {
        ...state,
        listStudent: payload,
      };

    case SAVE_SELECTED_STUDENT:
      return {
        ...state,
        selectedStudent: payload,
      };

    case GET_LIST_ID_STUDENT:
      return {
        ...state,
        listIdStudent: payload,
      };

    case SAVE_CREATE_STUDENT:
      return {
        ...state,
        listStudent: [...state.listStudent, payload],
      };

    case SAVE_RECEIVE_MAIL:
      return {
        ...state,
        receiveMail: payload,
      };

    case SAVE_SUBJECT_MAIL:
      return {
        ...state,
        subjectMail: payload,
      };

    default:
      return state;
  }
};

export default studentReducer;
