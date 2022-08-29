import {
  SET_ADD_SUBJECT_MODAL,
  SET_EDIT_SUBJECT_MODAL,
  GET_LIST_ID_SUBJECT,
  SAVE_GET_LIST_SUBJECT,
  SAVE_SELECTED_SUBJECT,
} from "../type";

export const activeAddSubjectModal = (payload) => ({
  type: SET_ADD_SUBJECT_MODAL,
  payload,
});

export const activeEditSubjectModal = (payload) => ({
  type: SET_EDIT_SUBJECT_MODAL,
  payload,
});

export const getListIdSubject = (payload) => ({
  type: GET_LIST_ID_SUBJECT,
  payload,
});

export const setListSubject = (payload) => ({
  type: SAVE_GET_LIST_SUBJECT,
  payload,
});

export const saveSelectedSubject = (payload) => ({
  type: SAVE_SELECTED_SUBJECT,
  payload,
});
