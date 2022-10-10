import React, { useState, useEffect } from "react";
import { Space, Table, Button, message, Popconfirm } from "antd";
import "antd/dist/antd.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
  actAddSubjectModal,
  actSelectedSubject,
  actSetListSubject,
} from "@/redux/action/subject";
import subjectApi from "@/api/subject";

const TableSubject = (props) => {
  const { listSubject } = props;

  useEffect(() => {
    getAllSubject();
  }, []);

  const getAllSubject = async () => {
    const res = await subjectApi.getListSubject();

    if (res) {
      props.actSetListSubject(res.data);
    }
  };

  const editSubject = (infoSubject) => {
    props.actSelectedSubject(infoSubject);
    props.actAddSubjectModal(true);
  };

  const deleteSubject = async (idDelete) => {
    const res = await subjectApi.deleteSubject({ idDelete });
    if (res?.code === 200) {
      getAllSubject();
    }
  };

  const confirmDelete = (idDelete) => {
    deleteSubject(idDelete);
    message.success("Delete success!");
  };

  const cancelDelete = (e) => {
    message.error("Cancel delete!");
  };

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
      sorter: (a, b) => a.id - b.id,
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
      key: "classID",
      sorter: (a, b) => a.classID - b.classID,
      sortOrder: sortedInfo.columnKey === "classID" ? sortedInfo.order : null,
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
        dataSource={listSubject}
        columns={columns}
        onChange={handleChangeTable}
      ></Table>
    </div>
  );
};

export default connect(
  (store) => ({
    activeAddModal: store.Subject.activeAddModal,
    listSubject: store.Subject.listSubject,
  }),
  {
    actAddSubjectModal,
    actSelectedSubject,
    actSetListSubject,
  }
)(TableSubject);
