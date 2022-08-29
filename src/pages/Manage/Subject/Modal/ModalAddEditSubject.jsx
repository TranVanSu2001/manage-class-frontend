import moment from "moment";

import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";

import { Modal, Form, Input, notification, Select, DatePicker } from "antd";
import _ from "lodash";

import { connect } from "react-redux";
import {
  getListIdSubject,
  activeAddSubjectModal,
  saveSelectedSubject,
} from "@/redux/action/subject";
import { setListIdClass, actChangeInfoTable } from "@/redux/action/class";

const ModalAddEditSubject = (props) => {
  const dateFormat = "DD/MM/YYYY";
  //react hook
  const [classID, setClassID] = useState("Select");
  const [valuePickTime, setValuePickTime] = useState([null, null]);

  const {
    listIdClass,
    activeAddModal,
    listIdSubject,
    onChangeInfoTable,
    selectedSubject,
  } = props;

  const [form] = Form.useForm();

  const isCreateMode = useMemo(() => {
    return _.isEmpty(selectedSubject);
  }, [selectedSubject]);

  //antd
  const { Option } = Select;
  const { RangePicker } = DatePicker;

  useEffect(() => {
    axios.get("http://localhost:3002/class/listIdClass").then((res) => {
      props.setListIdClass(res.data.data || []);
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3002/subject/listIdSubject").then((res) => {
      props.getListIdSubject(res.data.data || []);
    });
  }, [onChangeInfoTable]);

  useEffect(() => {
    form.setFieldsValue({
      id: selectedSubject?.id,
      name: selectedSubject?.name,
    });

    // if ((Object.keys(selectedSubject).length = !0)) {
    //   setClassID(selectedSubject?.classID);
    //   setValuePickTime([
    //     moment(selectedSubject?.startTime, dateFormat),
    //     moment(selectedSubject?.endTime, dateFormat),
    //   ]);
    // }
    if (!_.isEmpty(selectedSubject)) {
      setClassID(selectedSubject?.classID);
      setValuePickTime([
        moment(selectedSubject?.startTime, dateFormat),
        moment(selectedSubject?.endTime, dateFormat),
      ]);
    }
  }, [selectedSubject]);

  const onHandleAddEdit = async () => {
    //submit info subject to backend
    const { id, name } = await form.validateFields(["id", "name"]);

    const requestBody = {
      id,
      name,
      classID,
      startTime: valuePickTime[0].format(dateFormat),
      endTime: valuePickTime[1].format(dateFormat),
    };

    if (isCreateMode) {
      axios.post("http://localhost:3002/subject", requestBody);

      var IdExist = false;
      listIdSubject.forEach((element) => {
        if (element.id === id) {
          IdExist = true;
        }
      });

      if (!IdExist) {
        noticationAddSubject("success", "Add subject success");
      } else {
        noticationAddSubject("error", "ID exist");
      }
    } //edit subject
    else {
      axios.put("http://localhost:3002/subject", requestBody);
      props.saveSelectedSubject({});
    }
    //reset form
    form.setFieldsValue({
      id: "",
      name: "",
    });
    setClassID("Select");
    setValuePickTime([null, null]);

    props.actChangeInfoTable(!onChangeInfoTable);
    props.activeAddSubjectModal(false);
  };

  const onHandleCancelAddEdit = () => {
    props.saveSelectedSubject({});
    props.activeAddSubjectModal(false);
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
    setValuePickTime([
      moment(dateString[0], dateFormat),
      moment(dateString[1], dateFormat),
    ]);
  };

  return (
    <Modal
      title={isCreateMode ? "Add subject" : "Edit subject"}
      visible={activeAddModal}
      onOk={onHandleAddEdit}
      onCancel={onHandleCancelAddEdit}
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
        initialValues={{
          remember: true,
        }}
        form={form}
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
          <Input type="text" />
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
          <Input type="text" />
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
            format={dateFormat}
            allowClear={false}
            value={valuePickTime}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(
  (store) => ({
    onChangeInfoTable: store.Class.onChangeInfoTable,
    listIdClass: store.Class.listIdClass,
    selectedSubject: store.Subject.selectedSubject,
    activeAddModal: store.Subject.activeAddModal,
    listIdSubject: store.Subject.listIdSubject,
  }),
  {
    getListIdSubject,
    activeAddSubjectModal,
    setListIdClass,
    actChangeInfoTable,
    saveSelectedSubject,
  }
)(ModalAddEditSubject);
