import React, { useState, useEffect, useMemo } from "react";
import Axios from "axios";
import { Modal, Form, Input, notification, InputNumber } from "antd";
import _ from "lodash";
import { connect } from "react-redux";
import {
  actSetModalClassOpen,
  actSetSelectedClass,
  actSaveCreateClass,
} from "@/redux/action/class";

const ModalAddClass = (props) => {
  const { isModalOpen, selectedClass } = props;
  const [listID, setListID] = useState([]);
  const [form] = Form.useForm();

  const isCreateMode = useMemo(() => {
    return _.isEmpty(selectedClass);
  }, [selectedClass]);

  useEffect(() => {
    form.setFieldsValue({
      id: selectedClass?.id,
      name: selectedClass?.name,
      numberOfStudent: selectedClass?.numberOfStudent,
    });
  }, [selectedClass, form]);

  const onSubmitForm = async () => {
    const { id, name, numberOfStudent } = await form.validateFields([
      "id",
      "name",
      "numberOfStudent",
    ]);

    const requestBody = {
      id,
      name,
      numberOfStudent,
    };

    if (isCreateMode) {
      Axios.post("http://localhost:3002/class", {
        id,
        name,
        numberOfStudent,
      }).then((res) => {
        if (res?.data?.code === 200) {
          props.actSaveCreateClass(requestBody);
          props.actSetModalClassOpen(false);
        }
      });
    } else {
      Axios.put("http://localhost:3002/class", {
        id,
        name,
        numberOfStudent,
      }).then((res) => {
        if (res?.data?.code === 200) {
          // TODO: implement action, reducer for update
          props.actSetModalClassOpen(false);
        }
      });
    }
  };

  const handleCancel = () => {
    props.actSetModalClassOpen(false);
    props.actSetSelectedClass(null);
  };

  //show notication after add successfully
  const noticationAddClass = (type, messages) => {
    notification[type]({
      message: messages,
      description: "",
      duration: 2,
    });
  };

  return (
    <Modal
      title={isCreateMode ? "Add Class" : "Update Class"}
      visible={isModalOpen}
      onOk={onSubmitForm}
      onCancel={handleCancel}
      okText={isCreateMode ? "Add" : "Update"}
      width="30rem"
    >
      <Form layout="vertical" form={form}>
        <Form.Item
          label="ID"
          name="id"
          rules={[
            {
              required: true,
              message: "Please input ID class",
            },
          ]}
        >
          <Input placeholder="Enter Class ID" />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input name class",
            },
          ]}
        >
          <Input placeholder="Enter class name" />
        </Form.Item>

        <Form.Item
          label="Number Student"
          name="numberOfStudent"
          rules={[
            {
              required: true,
              message: "Please input number of student",
            },
          ]}
        >
          <InputNumber
            placeholder="Enter number of student"
            style={{ width: "100%" }}
            min={1}
            max={30}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(
  (store) => ({
    isModalOpen: store.Class.isModalOpen,
    selectedClass: store.Class.selectedClass,
  }),
  { actSetModalClassOpen, actSetSelectedClass, actSaveCreateClass }
)(ModalAddClass);
