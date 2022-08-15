import { SET_ADD_SUBJECT_MODAL, SET_EDIT_SUBJECT_MODAL } from "../type";

const activeAddSubjectModal = (payload) => ({
  type: SET_ADD_SUBJECT_MODAL,
  payload,
});

const activeEditSubjectModal = (payload) => ({
  type: SET_EDIT_SUBJECT_MODAL,
  payload,
});

const exportDefault = {
  activeAddSubjectModal,
  activeEditSubjectModal,
};

export default exportDefault;
