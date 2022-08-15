import React from "react";
import TableClass from "./Table/TableClass";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import classAction from "@/redux/action/actionClass";
import ModalEditClass from "./Modal/ModalEditClass";
import { ClassWrapper, ClassContainer, PageHeadingWrapper } from "./style";

const Class = () => {
  const dispatch = useDispatch();

  const showModal = () => {
    dispatch(classAction.activeAddClassModal(true));
  };

  return (
    <ClassWrapper>
      <PageHeadingWrapper>
        <div className="heading">Manage Class</div>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ marginBottom: "1rem" }}
          onClick={showModal}
        >
          Add
        </Button>
      </PageHeadingWrapper>

      <ClassContainer>
        <TableClass />
      </ClassContainer>

      <ModalEditClass />
    </ClassWrapper>
  );
};

export default Class;
