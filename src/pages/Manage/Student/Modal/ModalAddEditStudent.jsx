import React, { useMemo, useEffect } from "react";
import { Modal, Form, Input, notification, Select } from "antd";
import { connect } from "react-redux";
import _ from "lodash";
import {
  actSetModalStudentOpen,
  actSaveGetListStudent,
  actSetSelectedStudent,
  actSaveCreateStudent,
  actSaveUpdateStudent,
} from "@/redux/action/student";
import { setListIdClass } from "@/redux/action/class";
import studentApi from "@/api/student";

const { Option } = Select;
const listGender = ["Male", "Female"];

const ModalAddEditStudent = (props) => {
  const { isModalOpen, listClass, selectedStudent } = props;
  const [form] = Form.useForm();

  const isCreateMode = useMemo(() => {
    return _.isEmpty(selectedStudent);
  }, [selectedStudent]);

  // validate form to get input value
  useEffect(() => {
    form.setFieldsValue({
      id: selectedStudent?.id,
      name: selectedStudent?.name,
      age: selectedStudent?.age,
      email: selectedStudent?.email,
      classID: selectedStudent?.classID,
      gender: selectedStudent?.sex,
    });
  }, [selectedStudent]);

  const onSubmitForm = async () => {
    const { id, name, age, email, classID, gender } = await form.validateFields(
      ["id", "name", "age", "email", "classID", "gender"]
    );

    const requestBody = {
      id,
      name,
      age,
      email,
      classID,
      sex: gender,
    };

    //create student
    if (isCreateMode) {
      const res = await studentApi.createStudent(requestBody);
      if (res?.code === 200) {
        props.actSaveCreateStudent(requestBody);
        onCloseModal();
        onShowNotifcation("success", "Add student success");
      } else if (res?.code === 304) {
        onShowNotifcation("error", "Student existed");
      } else {
        console.log("data set: ", res.data);
      }
      //update student
    } else {
      const res = await studentApi.updateStudent(requestBody);
      if (res?.code === 200) {
        props.actSaveUpdateStudent(requestBody);
        onCloseModal();
        onShowNotifcation("success", "Edit student successfully");
      } else if (res?.code === 400) {
        onShowNotifcation("error", "Error occur when edit student");
      }
    }
  };

  const onCloseModal = () => {
    props.actSetSelectedStudent({});
    props.actSetModalStudentOpen(false);
  };

  const onShowNotifcation = (type, messages) => {
    notification[type]({
      message: messages,
      description: "",
      duration: 2,
    });
  };

  return (
    <Modal
      title={isCreateMode ? "Add student" : "Edit student"}
      visible={isModalOpen}
      onOk={onSubmitForm}
      onCancel={onCloseModal}
      okText={isCreateMode ? "Add" : "Edit"}
    >
      <Form layout="vertical" autoComplete="off" form={form}>
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

        <Form.Item label="Class" name="classID">
          <Select placeholder="Select a class">
            {listClass?.map((classInfo, index) => {
              return (
                <Option value={classInfo?.id} key={index}>
                  Class {classInfo?.id}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item label="Gender" name="gender">
          <Select placeholder="Select gender">
            {listGender.map((key, index) => {
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
    listClass: store.Class.listClass,
    isModalOpen: store.Student.isModalOpen,
    selectedStudent: store.Student.selectedStudent,
  }),
  {
    actSetModalStudentOpen,
    setListIdClass,
    actSaveGetListStudent,
    actSetSelectedStudent,
    actSaveCreateStudent,
    actSaveUpdateStudent,
  }
)(ModalAddEditStudent);
