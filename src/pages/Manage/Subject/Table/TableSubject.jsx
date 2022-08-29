import React, { useState, useEffect } from "react";
import Axios from "axios";

//ant design
import { Space, Table, Button, message, Popconfirm } from "antd";
import "antd/dist/antd.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

//redux
import { connect } from "react-redux";
import {
  activeAddSubjectModal,
  setListSubject,
  saveSelectedSubject,
} from "@/redux/action/subject";
import { actChangeInfoTable } from "@/redux/action/class";

const TableSubject = (props) => {
  //redux
  const { listSubject, onChangeInfoTable } = props;
  //view class info

  //get details class to show
  useEffect(() => {
    Axios.get("http://localhost:3002/subject").then((res) => {
      props.setListSubject(res.data.data);
    });
  }, [onChangeInfoTable]);

  const data = [];
  listSubject.forEach((value, key) => {
    data.push({
      id: value.id,
      name: value.name,
      classID: value.classID,
      startTime: value.startTime,
      endTime: value.endTime,
    });
  });

  //function edit, view Modal
  const editSubject = (infoSubject) => {
    props.saveSelectedSubject(infoSubject);
    props.activeAddSubjectModal(true);
  };

  //delete function
  const deleteSubject = (idDelete) => {
    Axios.delete(`http://localhost:3002/subject/${idDelete}`, {
      idDelete: idDelete,
    });

    props.actChangeInfoTable(!onChangeInfoTable);
  };

  const confirmDelete = (idDelete) => {
    deleteSubject(idDelete);
    message.success("Delete success!");
  };

  const cancelDelete = (e) => {
    message.error("Cancel delete!");
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
      title: "Class",
      dataIndex: "classID",
      key: "age",
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === "age" ? sortedInfo.order : null,
      ellipsis: true,
      width: "70px",
    },
    {
      title: "Start time",
      dataIndex: "startTime",
      key: "startTime",
      width: "160px",
    },
    {
      title: "End time",
      dataIndex: "endTime",
      key: "endTime",
      width: "160px",
    },
    {
      title: "Action",
      key: "action",
      render: (_, infoSubject) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            style={{ margin: "0 10px" }}
            onClick={() => {
              editSubject(infoSubject);
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
              onConfirm={() => confirmDelete(infoSubject.id)}
              onCancel={cancelDelete}
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
    </div>
  );
};

export default connect(
  (store) => ({
    onChangeInfoTable: store.Class.onChangeInfoTable,
    activeAddModal: store.Subject.activeAddModal,
    listSubject: store.Subject.listSubject,
  }),
  {
    activeAddSubjectModal,
    setListSubject,
    actChangeInfoTable,
    saveSelectedSubject,
  }
)(TableSubject);
