import React, { useState } from "react";
import Axios from "axios";
import { Modal, Form, Input, notification, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import studentAction from "@/redux/action/actionStudent";
import { useEffect } from "react";

const ModalAddStudent = () => {
  const { Option } = Select;

  //react hook
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [classID, setClassID] = useState("");
  const [sex, setSex] = useState("Male");
  const [listIdClass, setListIdClass] = useState([]);
  const [classIdSelected, setClassIdSelected] = useState();
  const [sexSelected, setSexSelected] = useState();
  const [listStudentId, setListStudentId] = useState();

  //redux
  const dispatch = useDispatch();
  const studentReducer = useSelector((state) => state.Student);

  useEffect(() => {
    setListIdClass([]);
    // Axios.get("http://localhost:3002/class/getListId").then((data) => {
    //   setListIdClass(data.data || []);
    // });
  }, [studentReducer.activeAddModal]);

  useEffect(() => {
    // Axios.get("http://localhost:3002/class/getListId").then((data) => {
    //   setListStudentId(data.data || []);
    // });
  }, []);

  const listSex = ["Male", "Female"];

  const handleOk = () => {
    //submit info class to backend
    Axios.post("http://localhost:3002/student/add", {
      id: id,
      name: name,
      age: age,
      email: email,
      classID: classID,
      sex: sex,
    });

    setId("");
    setName("");
    setAge("");
    setEmail("");
    setClassIdSelected("Select");
    setSexSelected("Select");
    dispatch(studentAction.activeAddStudentModal(false));

    var IdExist = false;
    listStudentId.forEach((element) => {
      if (element.id === id) {
        IdExist = true;
      }
    });

    if (!IdExist) {
      noticationAddStudent("success", "Add student success");
    } else {
      noticationAddStudent("error", "ID exist");
    }
  };

  const handleCancel = () => {
    dispatch(studentAction.activeAddStudentModal(false));
  };

  //show notication after add successfully
  const noticationAddStudent = (type, messages) => {
    notification[type]({
      message: messages,
      description: "",
      duration: 2,
    });
  };

  //select class to add
  const handleChange = (value) => {
    // console.log(`selected ${value}`);
    setClassID(`${value}`);
  };

  const handleChangeSex = (value) => {
    // console.log(`selected ${value}`);
    setSex(`${value}`);
  };

  return (
    <Modal
      title="Add student"
      visible={studentReducer.activeAddModal}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={"Add"}
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
            value={classIdSelected}
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
            value={sexSelected}
          >
            {/* <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="Yiminghe">yiminghe</Option> */}

            {listSex.map((key, index) => {
              return (
                <Option value={key} key={key}>
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

export default ModalAddStudent;
