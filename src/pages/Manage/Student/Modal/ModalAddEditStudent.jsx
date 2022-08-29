import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { Modal, Form, Input, notification, Select } from "antd";
import { connect } from "react-redux";
import _ from "lodash";

import {
  activeAddStudentModal,
  getListIdStudent,
  getListStudent,
  saveSelectedStudent,
  saveCreateStudent,
} from "@/redux/action/student";
import { setListIdClass, actChangeInfoTable } from "@/redux/action/class";

const ModalAddEditStudent = (props) => {
  const {
    activeAddModal,
    listIdClass,
    selectedStudent,
    listIdStudent,
    listStudent,
    onChangeInfoTable,
  } = props;

  const { Option } = Select;

  //react hook
  const [classID, setClassID] = useState("Select");
  const [sex, setSex] = useState("Select");

  const [form] = Form.useForm();

  const isCreateMode = useMemo(() => {
    return _.isEmpty(selectedStudent);
  }, [selectedStudent]);

  //redux

  //validate form to get input value
  useEffect(() => {
    form.setFieldsValue({
      id: selectedStudent?.id,
      name: selectedStudent?.name,
      age: selectedStudent?.age,
      email: selectedStudent?.email,
    });

    if ((Object.keys(selectedStudent).length = !0)) {
      setClassID(selectedStudent?.classID);
      setSex(selectedStudent?.sex);
    }
  }, [selectedStudent]);

  useEffect(() => {
    axios.get("http://localhost:3002/class/listIdClass").then((res) => {
      props.setListIdClass(res.data.data || []);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3002/student/getIdStudent").then((res) => {
      props.getListIdStudent(res.data.data || []);
    });
  }, []);

  const listSex = ["Male", "Female"];

  const onHandleAddEdit = async () => {
    const { id, name, age, email } = await form.validateFields([
      "id",
      "name",
      "age",
      "email",
    ]);

    const requestBody = {
      id,
      name,
      age,
      email,
      classID,
      sex,
    };

    //type add student
    if (isCreateMode) {
      //submit info class to backend
      axios.post("http://localhost:3002/student", requestBody).then((res) => {
        if (res?.data?.code === 200) {
          props.saveCreateStudent(requestBody);
          props.activeAddStudentModal(false);

          var IdExist = false;
          listIdStudent?.forEach((element) => {
            if (element.id === id) {
              IdExist = true;
            }
          });

          if (!IdExist) {
            noticationAddStudent("success", "Add student success");
          } else {
            noticationAddStudent("error", "ID exist");
          }
        }
      });
    }
    //edit student
    else {
      axios.put("http://localhost:3002/student", requestBody).then((res) => {
        if (res?.data?.code === 200) {
          // TODO: implement action, reducer for update

          listStudent.forEach((classElement) => {
            if (classElement.id === id) {
              classElement.name = name;
              classElement.age = age;
              classElement.email = email;
              classElement.classID = classID;
              classElement.sex = sex;
            }
          });

          // props.actSaveGetListClass([]);
          props.actChangeInfoTable(!onChangeInfoTable);
          props.getListStudent(listStudent);
          props.activeAddStudentModal(false);
          props.saveSelectedStudent({});
          noticationAddStudent("success", "Edit student successfully");
        } else if (res?.data?.code === 400) {
          props.saveSelectedStudent({});
          props.actSetModalClassOpen(false);
          noticationAddStudent("success", "Edit student successfully");
        }
      });
      console.log("edit");
    }

    //reset form input
    form.setFieldsValue({
      id: "",
      name: "",
      age: "",
      email: "",
    });
    setSex("Select");
    setClassID("Select");
  };

  const onHandleCancel = () => {
    //reset form input
    form.setFieldsValue({
      id: "",
      name: "",
      age: "",
      email: "",
    });
    setSex("Select");
    setClassID("Select");
    props.saveSelectedStudent({});
    props.activeAddStudentModal(false);
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
  const handleChangeClassID = (value) => {
    setClassID(`${value}`);
  };

  const handleChangeSex = (value) => {
    setSex(`${value}`);
  };

  return (
    <Modal
      title={isCreateMode ? "Add student" : "Edit student"}
      visible={activeAddModal}
      onOk={onHandleAddEdit}
      onCancel={onHandleCancel}
      okText={isCreateMode ? "Add" : "Edit"}
    >
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="ID"
          name="id"
          rules={[
            {
              required: true,
              message: "Please input ID student",
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
              message: "Please input name student",
            },
          ]}
        >
          <Input placeholder="Enter student name" />
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
          rules={[
            {
              required: true,
              message: "Please input age of student",
            },
          ]}
        >
          <Input placeholder="Enter age student" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input email of student",
            },
          ]}
        >
          <Input placeholder="Enter email student" />
        </Form.Item>

        <Form.Item label="Class">
          <Select
            defaultValue="Select"
            style={{
              width: 120,
            }}
            onChange={handleChangeClassID}
            value={classID}
          >
            {listIdClass?.map((key, index) => {
              return (
                <Option value={key.id} key={index}>
                  Class {key.id}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item label="Sex">
          <Select
            defaultValue="Select"
            style={{
              width: 120,
            }}
            onChange={handleChangeSex}
            value={sex}
          >
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

export default connect(
  (store) => ({
    listIdClass: store.Class.listIdClass,
    onChangeInfoTable: store.Class.onChangeInfoTable,
    activeAddModal: store.Student.activeAddModal,
    selectedStudent: store.Student.selectedStudent,
    listIdStudent: store.Student.listIdStudent,
    listStudent: store.Student.listStudent,
  }),
  {
    activeAddStudentModal,
    setListIdClass,
    getListIdStudent,
    getListStudent,
    actChangeInfoTable,
    saveSelectedStudent,
    saveCreateStudent,
  }
)(ModalAddEditStudent);
