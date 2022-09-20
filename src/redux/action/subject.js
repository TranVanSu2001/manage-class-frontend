import {
  SET_ADD_SUBJECT_MODAL,
  SET_EDIT_SUBJECT_MODAL,
  SAVE_GET_LIST_SUBJECT,
  SAVE_SELECTED_SUBJECT,
  SAVE_CREATE_SUBJECT,
  SAVE_UPDATE_SUBJECT,
} from "../type";

export const actAddSubjectModal = (payload) => ({
  type: SET_ADD_SUBJECT_MODAL,
  payload,
});

export const actSaveCreateSubject = (payload) => ({
  type: SAVE_CREATE_SUBJECT,
  payload,
});

export const actSaveUpdateSubject = (payload) => ({
  type: SAVE_UPDATE_SUBJECT,
  payload,
});

export const actUpdateSubjectModal = (payload) => ({
  type: SET_EDIT_SUBJECT_MODAL,
  payload,
});

export const actSetListSubject = (payload) => ({
  type: SAVE_GET_LIST_SUBJECT,
  payload,
});

export const actSelectedSubject = (payload) => ({
  type: SAVE_SELECTED_SUBJECT,
  payload,
});
