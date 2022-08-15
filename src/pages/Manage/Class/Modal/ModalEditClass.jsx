import React, { useState } from "react";
import Axios from "axios";
import { Modal, Form, Input, notification, InputNumber } from "antd";
import { useSelector, useDispatch } from "react-redux";
import classAction from "@/redux/action/actionClass";

const ModalAddClass = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [numOfStu, setNumOfStu] = useState("");
  const [listID, setListID] = useState([]);

  const dispatch = useDispatch();
  const classReducer = useSelector((state) => state.Class);

  const handleOk = () => {
    //submit info class to backend
    Axios.post("http://localhost:3002/class/add", {
      id: id,
      name: name,
      numOfStu: numOfStu,
    });
    setId("");
    setName("");
    setNumOfStu("");
    dispatch(classAction.activeAddClassModal(false));

    Axios.get("http://localhost:3002/class/getListId").then((data) => {
      setListID(data.data);
    });

    var IdExist = false;
    listID.forEach((element) => {
      if (element.id === id) {
        IdExist = true;
      }
    });

    if (numOfStu <= 0) {
      noticationAddClass(
        "error",
        "Number of student must be greater than zero"
      );

      return;
    }

    if (!IdExist) {
      noticationAddClass("success", "Add class success");
    } else {
      noticationAddClass("error", "ID exist");
    }
  };

  const handleCancel = () => {
    dispatch(classAction.activeAddClassModal(false));
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
      title="Add class"
      visible={classReducer.activeAddModal}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={"Add"}
      width="30rem"
    >
      <Form
        name="basic"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
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
          name={numOfStu}
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
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddClass;
