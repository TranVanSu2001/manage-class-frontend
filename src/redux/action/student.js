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

//get all list student
export const getListStudent = (payload) => ({
  type: SAVE_GET_LIST_STUDENT,
  payload,
});

export const activeAddStudentModal = (payload) => ({
  type: SET_ADD_STUDENT_MODAL,
  payload,
});

export const activeEditStudentModal = (payload) => ({
  type: SET_EDIT_STUDENT_MODAL,
  payload,
});

export const activeViewStudentModal = (payload) => ({
  type: SET_VIEW_STUDENT_MODAL,
  payload,
});

export const saveSelectedStudent = (payload) => ({
  type: SAVE_SELECTED_STUDENT,
  payload,
});

export const getListIdStudent = (payload) => ({
  type: GET_LIST_ID_STUDENT,
  payload,
});

export const saveCreateStudent = (payload) => ({
  type: SAVE_CREATE_STUDENT,
  payload,
});

export const saveReceiveMail = (payload) => ({
  type: SAVE_RECEIVE_MAIL,
  payload,
});

export const saveSubjectMail = (payload) => ({
  type: SAVE_SUBJECT_MAIL,
  payload,
});
