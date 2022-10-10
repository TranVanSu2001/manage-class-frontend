import moment from "moment";
import { useEffect, useMemo } from "react";
import { Modal, Form, Input, notification, Select, DatePicker } from "antd";
import _ from "lodash";
import { connect } from "react-redux";
import {
  actAddSubjectModal,
  actSelectedSubject,
  actSaveCreateSubject,
  actSaveUpdateSubject,
} from "@/redux/action/subject";
import { actSaveGetListClass } from "@/redux/action/class";
import subjectApi from "@/api/subject";
import classApi from "@/api/class";

const dateFormat = "DD/MM/YYYY";

const ModalAddEditSubject = (props) => {
  const { listClass, activeAddModal, selectedSubject } = props;
  const [form] = Form.useForm();

  const isCreateMode = useMemo(() => {
    return _.isEmpty(selectedSubject);
  }, [selectedSubject]);

  const { Option } = Select;
  const { RangePicker } = DatePicker;

  useEffect(() => {
    getListIdClass();
  }, []);

  const getListIdClass = async () => {
    const res = await classApi.getListClass();

    if (res) {
      props.actSaveGetListClass(res?.data || []);
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      id: selectedSubject?.id,
      name: selectedSubject?.name,
      classID: selectedSubject?.classID,
      pickTimeSubject: selectedSubject?.startTime
        ? [
            moment(selectedSubject?.startTime || null, dateFormat),
            moment(selectedSubject?.endTime || null, dateFormat),
          ]
        : [null, null],
    });
  }, [selectedSubject, form]);

  const onSubmitSubject = async () => {
    const { id, name, classID, pickTimeSubject } = await form.validateFields([
      "id",
      "name",
      "classID",
      "pickTimeSubject",
    ]);

    const requestBody = {
      id,
      name,
      classID,
      startTime: pickTimeSubject[0].format(dateFormat),
      endTime: pickTimeSubject[1].format(dateFormat),
    };

    if (isCreateMode) {
      const res = await subjectApi.createSubject(requestBody);
      if (res?.code === 200) {
        props.actSaveCreateSubject(requestBody);
        onCloseModal();
        onShowNotifcation("success", "Add subject success");
      }
    } //edit subject
    else {
      const res = await subjectApi.updateSubject(requestBody);
      if (res?.code === 200) {
        props.actSaveUpdateSubject(requestBody);
        onCloseModal();
        onShowNotifcation("success", "Edit subject success");
      }
    }
  };

  const onCloseModal = () => {
    props.actSelectedSubject({});
    props.actAddSubjectModal(false);
  };

  //show notication after add successfully
  const onShowNotifcation = (type, messages) => {
    notification[type]({
      message: messages,
      description: "",
      duration: 2,
    });
  };

  return (
    <Modal
      title={isCreateMode ? "Add subject" : "Edit subject"}
      visible={activeAddModal}
      onOk={onSubmitSubject}
      onCancel={onCloseModal}
      okText={isCreateMode ? "Add" : "Edit"}
    >
      <Form form={form} autoComplete="off" layout="vertical">
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

        <Form.Item
          label="Time"
          rules={[
            {
              required: true,
              message: "Please input date time ",
            },
          ]}
          name="pickTimeSubject"
        >
          <RangePicker
            format={dateFormat}
            allowClear={true}
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default connect(
  (store) => ({
    listClass: store.Class.listClass,
    selectedSubject: store.Subject.selectedSubject,
    activeAddModal: store.Subject.activeAddModal,
    listIdSubject: store.Subject.listIdSubject,
  }),
  {
    actAddSubjectModal,
    actSaveGetListClass,
    actSelectedSubject,
    actSaveUpdateSubject,
    actSaveCreateSubject,
  }
)(ModalAddEditSubject);
