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
import { connect } from "react-redux";
import { activeAddSubjectModal } from "@/redux/action/subject";

import TableSubject from "./Table/TableSubject";

import ModalAddEditSubject from "@/pages/Manage/Subject/Modal/ModalAddEditSubject";

const Subject = (props) => {
  const showModal = () => {
    props.activeAddSubjectModal(true);
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
        <ModalAddEditSubject />
      </ButtonAction>
      <SubjectContainer>
        <TableSubject />
      </SubjectContainer>
    </SubjectWrapper>
  );
};

export default connect((store) => ({}), { activeAddSubjectModal })(Subject);
