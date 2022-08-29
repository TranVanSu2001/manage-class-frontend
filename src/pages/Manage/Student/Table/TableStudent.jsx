import React, { useState, useEffect } from "react";
import Axios from "axios";

import { Space, Table, Button } from "antd";
import { message, Popconfirm } from "antd";

import { connect } from "react-redux";
import {
  activeEditStudentModal,
  getListStudent,
  saveSelectedStudent,
  activeAddStudentModal,
  activeViewStudentModal,
  saveReceiveMail,
} from "@/redux/action/student";

import { actChangeInfoTable } from "@/redux/action/class";

import "antd/dist/antd.css";
import { EditOutlined, DeleteOutlined, MailOutlined } from "@ant-design/icons";

//redux
// import studentAction from "@/redux/action/student";
import ModalSendMail from "../Modal/ModalSendMail";

const TableStudent = (props) => {
  const { listStudent, listIdClass, onChangeInfoTable } = props;

  //get details class to show
  useEffect(() => {
    Axios.get("http://localhost:3002/student").then((res) => {
      props.getListStudent(res.data.data);
    });
  }, [onChangeInfoTable]);

  var filterClass = [];
  var listIdClassFiltter = [];

  filterClass = listIdClass?.forEach((key, index) => {
    const listClass = { text: key.id, value: key.id };

    filterClass.push(listClass);
    listIdClassFiltter = filterClass;
  });

  const data = [];
  listStudent.forEach((value, key) => {
    data.push({
      id: value.id,
      name: value.name,
      age: value.age,
      email: value.email,
      classID: value.classID,
      sex: value.sex,
    });
  });

  //function edit, view Modal
  const editStudent = (infoStudent) => {
    props.saveSelectedStudent(infoStudent);
    props.activeAddStudentModal(true);
  };

  //delete function
  //notication delete

  const deleteStudent = (idDelete) => {
    Axios.delete(`http://localhost:3002/student/${idDelete}`, {
      idDelete: idDelete,
    });
    props.actChangeInfoTable(!onChangeInfoTable);
  };

  const confirmDelete = (idDelete) => {
    deleteStudent(idDelete);
    message.success("Delete success!");
  };

  const cancel = (e) => {
    message.error("Cancel delete!");
  };

  //function send mail to student
  const sendMailToStudent = (receiveMail) => {
    props.saveReceiveMail(receiveMail);
    props.activeViewStudentModal(true);
  };

  //sort table
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChangeTable = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id.length - b.id.length,
      sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,
      ellipsis: true,
      width: "70px",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "160px",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === "age" ? sortedInfo.order : null,
      ellipsis: true,
      width: "70px",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "160px",
    },
    {
      title: "Class",
      dataIndex: "classID",
      key: "classID",
      filters: [...listIdClassFiltter],
      filteredValue: filteredInfo.classID || null,
      onFilter: (value, record) => record.classID.includes(value),
      width: "70px",
    },
    {
      title: "Sex",
      dataIndex: "sex",
      key: "sex",
      filters: [
        {
          text: "Male",
          value: "Male",
        },
        {
          text: "Female",
          value: "Female",
        },
      ],
      filteredValue: filteredInfo.sex || null,
      onFilter: (value, record) => record.sex.includes(value),
      width: "70px",
    },
    {
      title: "Action",
      key: "action",
      render: (_, infoStudent) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            style={{ margin: "0 10px" }}
            onClick={() => {
              editStudent(infoStudent);
            }}
          >
            Edit
          </Button>
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            size="small"
            style={{ margin: "0 10px" }}
          >
            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={() => confirmDelete(infoStudent.id)}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <span
                style={{
                  color: "white",
                }}
              >
                Delete
              </span>
            </Popconfirm>
          </Button>
          <Button
            type="primary"
            icon={<MailOutlined />}
            size="small"
            onClick={() => sendMailToStudent(infoStudent.email)}
          >
            Mail
          </Button>
        </Space>
      ),
      width: "200px",
    },
  ];
  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        onChange={handleChangeTable}
      ></Table>
      <ModalSendMail />
    </div>
  );
};

export default connect(
  (store) => ({
    listStudent: store.Student.listStudent,
    listIdClass: store.Class.listIdClass,
    onChangeInfoTable: store.Class.onChangeInfoTable,
  }),
  {
    activeEditStudentModal,
    getListStudent,
    saveSelectedStudent,
    activeAddStudentModal,
    actChangeInfoTable,
    activeViewStudentModal,
    saveReceiveMail,
  }
)(TableStudent);
