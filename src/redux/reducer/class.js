import {
  SET_VIEW_CLASS_MODAL,
  SET_VIEW_STUDENT_IN_CLASS,
  SAVE_GET_LIST_CLASS,
  SET_MODAL_CLASS_OPEN,
  SET_SELECTED_CLASS,
  SAVE_CREATE_CLASS

} from "../type";

const initialState = {
  listClass: [],
  isModalOpen: false,
  selectedClass: {},
  activeViewModal: false,
  activeViewStudentClass: false,
};

const classReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SAVE_GET_LIST_CLASS:
      return {
        ...state,
        listClass: payload
      };

    case SET_MODAL_CLASS_OPEN:
      return {
        ...state,
        isModalOpen: payload
      };

    case SET_SELECTED_CLASS:
      return {
        ...state,
        selectedClass: payload
      };

    case SAVE_CREATE_CLASS: {
      return {
        ...state,
        listClass: [...state.listClass, payload]
      };
    }

    case SET_VIEW_CLASS_MODAL:
      return {
        ...state,
        activeViewModal: payload,
      };

    case SET_VIEW_STUDENT_IN_CLASS:
      return {
        ...state,
        activeViewStudentClass: payload,
      };

    default:
      return state;
  }
};

export default classReducer;
