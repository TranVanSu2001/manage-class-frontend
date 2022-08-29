import React, { useState } from "react";
import axios from "axios";

import { Modal, Form, Input, notification } from "antd";

import { connect } from "react-redux";
import {
  activeViewStudentModal,
  saveSubjectMail,
} from "@/redux/action/student";

const ModalSendMail = (props) => {
  const { activeViewModal, receiveMail } = props;
  const [form] = Form.useForm();
  const [loadings, setLoadings] = useState([]);

  const onHandleSendMail = async () => {
    const { subject, content } = await form.validateFields([
      "subject",
      "content",
    ]);
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[0] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[0] = false;
        return newLoadings;
      });

      axios
        .post("http://localhost:3002/student/sendMail", {
          subject,
          content,
          receiveMail,
        })
        .then((res) => {
          if (res?.data?.code === 200) {
            noticationSendMail("success", "Send mail successfully");
          } else {
            noticationSendMail("error", "Send mail fail");
          }
        });

      //reset form after send mail
      form.setFieldsValue({
        subject: "",
        content: "",
      });
      props.activeViewStudentModal(false);
    }, 2000);
  };

  const onCancelSendMail = () => {
    //reset form after cancel send mail
    form.setFieldsValue({
      subject: "",
      content: "",
    });
    props.activeViewStudentModal(false);
  };

  const noticationSendMail = (type, messages) => {
    notification[type]({
      message: messages,
      description: "",
      duration: 2,
    });
  };
  return (
    <Modal
      title="Send mail to student"
      visible={activeViewModal}
      onCancel={onCancelSendMail}
      onOk={onHandleSendMail}
      okText="Mail"
      okButtonProps={{
        style: {},
        loading: loadings[0],
      }}
    >
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        form={form}
      >
        <Form.Item label="From">
          <Input value="tranvansu2001@gmail.com" disabled={true} />
        </Form.Item>
        <Form.Item label="To">
          <Input value={receiveMail} disabled={true} />
        </Form.Item>
        <Form.Item
          label="Subject"
          name="subject"
          rules={[
            {
              required: true,
              message: "Please input subject of email",
            },
          ]}
        >
          <Input placeholder="Subject of email" />
        </Form.Item>
        <Form.Item
          label="Content"
          name="content"
          rules={[
            {
              required: true,
              message: "Please content of email",
            },
          ]}
        >
          {/* <Input placeholder="Content of email" /> */}
          <textarea
            placeholder="Enter content email"
            style={{ minWidth: "100%", minHeight: "100px" }}
          ></textarea>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(
  (store) => ({
    activeViewModal: store.Student.activeViewModal,
    receiveMail: store.Student.receiveMail,
    subjectMail: store.Student.subjectMail,
  }),
  { activeViewStudentModal, saveSubjectMail }
)(ModalSendMail);
