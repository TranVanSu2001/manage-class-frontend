import React, { useEffect, useMemo } from "react";
import Axios from "axios";
import { Modal, Form, Input, InputNumber, notification } from "antd";
import _ from "lodash";
import { connect } from "react-redux";
import {
  actSetModalClassOpen,
  actSetSelectedClass,
  actSaveCreateClass,
  actSaveUpdateClass,
  actSaveGetListClass,
  actChangeInfoTable,
} from "@/redux/action/class";

const ModalAddClass = (props) => {
  //select from redux
  const { isModalOpen, selectedClass, listClass, onChangeInfoTable } = props;
  const [form] = Form.useForm();

  const isCreateMode = useMemo(() => {
    return _.isEmpty(selectedClass);
  }, [selectedClass]);

  //validate form to get input value
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

    //add info class
    if (isCreateMode) {
      Axios.post("http://localhost:3002/class", {
        id,
        name,
        numberOfStudent,
      }).then((res) => {
        if (res?.data?.code === 200) {
          props.actSaveCreateClass(requestBody);
          props.actSetModalClassOpen(false);
          noticationAddClass("success", "Add class successfully");
        } else if (res?.data.code === 304) {
          noticationAddClass("error", "Exist class id");
          props.actSetModalClassOpen(false);
        }
      });

      //edit info selected class
    } else {
      Axios.put("http://localhost:3002/class", {
        id,
        name,
        numberOfStudent,
      }).then((res) => {
        if (res?.data?.code === 200) {
          // TODO: implement action, reducer for update

          listClass.forEach((classElement) => {
            if (classElement.id === id) {
              classElement.name = name;
              classElement.numberOfStudent = numberOfStudent;
            }
          });

          // props.actSaveGetListClass([]);
          props.actChangeInfoTable(!onChangeInfoTable);
          props.actSaveGetListClass(listClass);
          props.actSetModalClassOpen(false);
          noticationAddClass("success", "Edit class successfully");
        } else if (res?.data?.code === 400) {
          props.actSetModalClassOpen(false);
          noticationAddClass("success", "Edit class successfully");
        }
      });
    }

    // //reset form aftet submit
    form.setFieldsValue({
      id: "",
      name: "",
      numberOfStudent: "",
    });
  };

  const handleCancelModal = () => {
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
      onCancel={handleCancelModal}
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
    listClass: store.Class.listClass,
    onChangeInfoTable: store.Class.onChangeInfoTable,
  }),
  {
    actSetModalClassOpen,
    actSetSelectedClass,
    actSaveCreateClass,
    actSaveUpdateClass,
    actSaveGetListClass,
    actChangeInfoTable,
  }
)(ModalAddClass);
