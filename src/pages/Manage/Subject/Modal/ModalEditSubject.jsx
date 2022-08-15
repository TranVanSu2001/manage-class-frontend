import React, { useState, useEffect } from "react";
import Axios from "axios";
import moment from "moment";

import { Modal, Form, Input, notification, DatePicker, Select } from "antd";

import { useSelector, useDispatch } from "react-redux";
import subjectAction from "@/redux/action/actionSubject";

const { RangePicker } = DatePicker;
const { Option } = Select;

const ModalEditSubject = (props) => {
  //react hook
  const { infomationSubjectById } = props;
  // const infomationSubjectById = props.infomationSubjectById;

  const oldId = infomationSubjectById.id;
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [classID, setClassID] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [listID, setListID] = useState([]);
  const [valuePickTime, setValuePickTime] = useState();
  const [listIdClass, setListIdClass] = useState([]);
  const [valueClassSelect, setValueClassSelect] = useState();

  //get infomation subject to show in modal to edit
  useEffect(() => {
    setId(infomationSubjectById.id);
    setName(infomationSubjectById.name);
    setClassID(infomationSubjectById.classID);

    const startTimeMoment = moment(
      infomationSubjectById.startTime,
      "DD/MM/YYYY"
    );
    const endTimeMoment = moment(infomationSubjectById.endTime, "DD/MM/YYYY");
    setValuePickTime([startTimeMoment, endTimeMoment]);
  }, [infomationSubjectById]);

  //get list id class
  useEffect(() => {
    Axios.get("http://localhost:3002/class/getListId").then((data) => {
      setListIdClass(data.data);
    });
  }, []);

  //redux
  const dispatch = useDispatch();
  const subjectReducer = useSelector((state) => state.Subject);

  //handle edit
  const handleOk = () => {
    //submit info class to backend
    Axios.post("http://localhost:3002/subject/editSubject", {
      id: id,
      name: name,
      classID: classID,
      startTime: startTime,
      endTime: endTime,
      oldId: oldId,
    });

    Axios.get("http://localhost:3002/class/getListId").then((data) => {
      setListID(data.data);
    });

    var IdExist = false;
    listID.forEach((element) => {
      console.log("id object", element.id);
      if (element.id === id) {
        IdExist = true;
      }
    });

    if (!IdExist) {
      noticationEditClass("success", "Edit class student");
    } else {
      noticationEditClass("error", "ID exist");
    }

    dispatch(subjectAction.activeEditSubjectModal(false));
    setValueClassSelect("Select");
  };

  //handle cancel edit
  const handleCancel = () => {
    dispatch(subjectAction.activeEditSubjectModal(false));
  };

  //show notication
  const noticationEditClass = (type, messages) => {
    notification[type]({
      message: messages,
      description: "",
      duration: 2,
    });
  };

  const onChangeDatePicker = (value, dateString) => {
    setStartTime(dateString[0]);
    setEndTime(dateString[1]);

    console.log("start", dateString[0]);

    // console.log(typeof dateString[0]);

    // console.log("start time: " + dateString[0]);
    // console.log("end time: " + dateString[1]);

    const startTimeMoment = moment(dateString[0], "DD/MM/YYYY");
    const endTimeMoment = moment(dateString[1], "DD/MM/YYYY");

    setValuePickTime([startTimeMoment, endTimeMoment]);
  };

  const handleChangeSelectClassId = (value) => {
    // console.log(`selected ${value}`);
    setClassID(`${value}`);
    setValueClassSelect(value);
  };

  return (
    <Modal
      title="Edit class"
      visible={subjectReducer.activeEditModal}
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
            onChange={handleChangeSelectClassId}
            value={valueClassSelect}
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
            value={valuePickTime}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalEditSubject;
