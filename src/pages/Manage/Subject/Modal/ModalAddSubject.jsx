import React, { useState, useEffect } from "react";
import Axios from "axios";

import { Modal, Form, Input, notification, Select, DatePicker } from "antd";

import { useSelector, useDispatch } from "react-redux";
import subjectAction from "@/redux/action/actionSubject";

const ModalAddSubject = () => {
  //antd
  const { Option } = Select;
  const { RangePicker } = DatePicker;

  //redux
  const dispatch = useDispatch();
  const subjectReducer = useSelector((state) => state.Subject);

  //react hook
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [classID, setClassID] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [classIdSelected, setClassIdSelected] = useState();
  const [listIdSubject, setListIdSubject] = useState();
  const [valuePickTime, setValuePickTime] = useState();

  const [listIdClass, setListIdClass] = useState([]);

  // console.log("render");

  useEffect(() => {
    setListIdClass([]);
    Axios.get("http://localhost:3002/class/getListId").then((data) => {
      setListIdClass(data.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3002/subject/getListId").then((data) => {
      setListIdSubject(data.data);
    });
  }, []);

  const handleOk = () => {
    //submit info subject to backend

    Axios.post("http://localhost:3002/subject/add", {
      id: id,
      name: name,
      classID: classID,
      startTime: startTime,
      endTime: endTime,
    });
    setId("");
    setName("");
    setClassID("");
    setStartTime("");
    setEndTime("");
    // setValueTime("");
    setClassIdSelected("Select");

    setValuePickTime(["", ""]);

    var IdExist = false;
    listIdSubject.forEach((element) => {
      console.log("id object", element.id);
      if (element.id === id) {
        IdExist = true;
      }
    });

    if (!IdExist) {
      noticationAddSubject("success", "Add subject success");
    } else {
      noticationAddSubject("error", "ID exist");
    }

    dispatch(subjectAction.activeAddSubjectModal(false));
  };

  const handleCancel = () => {
    dispatch(subjectAction.activeAddSubjectModal(false));
  };

  //show notication after add successfully
  const noticationAddSubject = (type, messages) => {
    notification[type]({
      message: messages,
      description: "",
      duration: 2,
    });
  };

  const handleChangeClassID = (value) => {
    // console.log(`selected ${value}`);
    setClassID(`${value}`);
  };

  const onChangeDatePicker = (value, dateString) => {
    setStartTime(dateString[0]);
    setEndTime(dateString[1]);
  };

  return (
    <Modal
      title="Add subject"
      visible={subjectReducer.activeAddModal}
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
              message: "Please input ID class",
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
              message: "Please input name class",
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
        <Form.Item label="Class">
          <Select
            defaultValue="Select"
            style={{
              width: 120,
            }}
            onChange={handleChangeClassID}
            value={classIdSelected}
          >
            {listIdClass?.map((key, index) => {
              return (
                <Option value={key.id} key={key.id}>
                  Class {key.id}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="Time"
          rules={[
            {
              required: true,
              message: "Please input date time ",
            },
          ]}
        >
          <RangePicker
            onChange={onChangeDatePicker}
            format="DD/MM/YYYY"
            allowClear={false}
            value={valuePickTime}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalAddSubject;
