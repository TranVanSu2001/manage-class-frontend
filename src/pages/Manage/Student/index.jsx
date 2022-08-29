import React from "react";
import TableStudent from "./Table/TableStudent";

import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import {
  StudentWrapper,
  StudentTitle,
  StudentContainer,
  ButtonAction,
} from "./style";

import { activeAddStudentModal } from "@/redux/action/student";
import { connect } from "react-redux";

import ModalAddEditStudent from "./Modal/ModalAddEditStudent";

const Student = (props) => {
  const showAddModal = () => {
    props.activeAddStudentModal(true);
  };

  return (
    <StudentWrapper>
      <StudentTitle>Manage Student</StudentTitle>
      <ButtonAction>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ margin: "0 10px" }}
          onClick={showAddModal}
        >
          Add
        </Button>
        <ModalAddEditStudent />
      </ButtonAction>
      <StudentContainer>
        <TableStudent />
      </StudentContainer>
    </StudentWrapper>
  );
};

export default connect((store) => ({}), { activeAddStudentModal })(Student);
