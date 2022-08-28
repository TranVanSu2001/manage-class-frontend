import React, { useState, useEffect } from "react";
import Axios from "axios";

import { Modal, Form, Input, notification, Select } from "antd";

import { useSelector, useDispatch } from "react-redux";
import studentAction from "@/redux/action/actionStudent";

const ModalEditStudent = (props) => {
  //antd
  const { Option } = Select;

  const infoStudent = props.infoStudent;
  // console.log("infoStudent: " + infoStudent);

  //state
  const oldId = infoStudent.id;
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [classID, setClassID] = useState("");
  const [sex, setSex] = useState("Male");
  const [listIdClass, setListIdClass] = useState([]);

  useEffect(() => {
    setId(infoStudent.id);
    setName(infoStudent.name);
    setAge(infoStudent.age);
    setEmail(infoStudent.email);
    setClassID(infoStudent.classID);
    setSex(infoStudent.sex);
  }, [infoStudent]);

  useEffect(() => {
    Axios.get("http://localhost:3002/class/getListId").then((data) => {
      setListIdClass(data.data);
    });
  }, []);

  //redux
  const dispatch = useDispatch();
  const studentReducer = useSelector((state) => state.Student);

  const handleOk = () => {
    //submit info class to backend

    Axios.post("http://localhost:3002/student/editStudent", {
      id: id,
      name: name,
      age: age,
      email: email,
      oldId: oldId,
      classID: classID,
      sex: sex,
    });
    dispatch(studentAction.activeEditStudentModal(false));
    if (oldId !== id) {
      noticationEditClassSuccess();
    }
  };

  const handleCancel = () => {
    dispatch(studentAction.activeEditStudentModal(false));
  };

  //show notication
  const noticationEditClassSuccess = () => {
    notification["success"]({
      message: "Edit class successfully",
      description: "",
      duration: 2,
    });
  };

  //select class to add
  const handleChange = (value) => {
    // console.log(`selected ${value}`);
    setClassID(`${value}`);
  };

  //list sex select
  const listSex = ["Male", "Female"];

  const handleChangeSex = (value) => {
    // console.log(`selected ${value}`);
    setSex(`${value}`);
  };

  return (
    <Modal
      title="Edit student"
      visible={studentReducer.activeEditModal}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={"Edit"}
    >
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="ID"
          rules={[
            {
              required: true,
              message: "Please input ID student",
            },
          ]}
        >
          <Input
            type="text"
            onChange={(e) => {
              setId(e.target.value);
            }}
            value={id}
          />
        </Form.Item>
        <Form.Item
          label="Name"
          rules={[
            {
              required: true,
              message: "Please input name student",
            },
          ]}
        >
          <Input
            type="text"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
        </Form.Item>
        <Form.Item
          label="Age"
          rules={[
            {
              required: true,
              message: "Please input age of student",
            },
          ]}
        >
          <Input
            type="text"
            onChange={(e) => {
              setAge(e.target.value);
            }}
            value={age}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          rules={[
            {
              required: true,
              message: "Please input email of student",
            },
          ]}
        >
          <Input
            type="text"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
        </Form.Item>
        <Form.Item label="Class">
          <Select
            defaultValue="Select"
            style={{
              width: 120,
            }}
            onChange={handleChange}
          >
            {/* <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option> */}

            {listIdClass?.map((key, index) => {
              return (
                <Option value={key.id} key={key.id}>
                  Class {key.id}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item label="Sex">
          <Select
            defaultValue="Male"
            style={{
              width: 120,
            }}
            onChange={handleChangeSex}
          >
            {/* <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option> */}

            {listSex.map((key, index) => {
              return (
                <Option value={key} key={index}>
                  {key}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEditStudent;
