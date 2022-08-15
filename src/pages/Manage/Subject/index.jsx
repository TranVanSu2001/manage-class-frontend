import React from "react";

//antd
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

import {
  SubjectWrapper,
  SubjectTitle,
  SubjectContainer,
  ButtonAction,
} from "./style";

//redux
import { useDispatch, useSelector } from "react-redux";
import subjectAction from "@/redux/action/actionSubject";

import TableSubject from "./Table/TableSubject";

import ModalAddSubject from "@/pages/Manage/Subject/Modal/ModalAddSubject";

const Subject = () => {
  //redux
  const dispatch = useDispatch();
  const classReducer = useSelector((state) => state.Class);

  const showModal = () => {
    dispatch(subjectAction.activeAddSubjectModal(true));
  };

  return (
    <SubjectWrapper>
      <SubjectTitle>Manage Subject</SubjectTitle>
      <ButtonAction>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ margin: "0 10px" }}
          onClick={showModal}
        >
          Add
        </Button>
        <ModalAddSubject />
      </ButtonAction>
      <SubjectContainer>
        <TableSubject />
      </SubjectContainer>
    </SubjectWrapper>
  );
};

export default Subject;
