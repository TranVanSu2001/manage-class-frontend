import React, { useState, useEffect } from "react";
import axios from "axios";
import { Space, Table, Button } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import { message, Popconfirm } from "antd";
import { connect } from "react-redux";
import {
  actSaveGetListClass,
  actSetModalClassOpen,
  actSetSelectedClass,
} from "@/redux/action/class";
import TableViewStudentClass from "./TableViewStudentClass";
import ModalViewClass from "../Modal/ModalViewClass";

const getColumns = (
  onEditClass,
  onViewClass,
  onDeleteClass,
  onConfirmDelete,
  onCancelDelete
) => [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Number of Student",
    dataIndex: "numberOfStudent",
    key: "numberOfStudent",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (value, classInfo) => (
      <Space size="middle">
        <Button
          type="primary"
          icon={<EditOutlined />}
          size="small"
          onClick={() => {
            onEditClass(classInfo);
          }}
        >
          Edit
        </Button>

        <Button
          type="primary"
          icon={<DeleteOutlined />}
          size="small"
          style={{ margin: "0 10px" }}
          onClick={() => {
            onDeleteClass(classInfo.id);
          }}
        >
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => onConfirmDelete(classInfo.id)}
            onCancel={onCancelDelete}
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
          icon={<UnorderedListOutlined />}
          size="small"
          onClick={() => onViewClass(classInfo.id)}
        >
          Detail
        </Button>
      </Space>
    ),
  },
];

const TableClass = (props) => {
  const { listClass } = props;

  const [infoClass, setInfoClass] = useState({});
  const [isModalOpen, setModalOpen] = useState({});
  const [infoStudentByIdClass, setInfoStudentByClass] = useState([]);

  //get details class to show
  useEffect(() => {
    axios.get("http://localhost:3002/class").then((res) => {
      props.actSaveGetListClass(res?.data?.data || []);
    });
  }, []);

  const data = [];
  listClass?.forEach((value, key) => {
    data.push({
      id: value.id,
      name: value.name,
      numberOfStudent: value.numberOfStudent,
    });
  });

  const onEditClass = (classInfo) => {
    props.actSetSelectedClass(classInfo);
    props.actSetModalClassOpen(true);
  };

  const onDeleteClass = (idDelete) => {
    axios.post("http://localhost:3002/class/deleteClass", {
      idDelete: idDelete,
    });
  };

  const onViewClass = (idClass) => {
    axios
      .post("http://localhost:3002/class/getListStudentById", {
        idClass: idClass,
      })

      .then((response) => {
        setInfoStudentByClass(response.data);
      })
      .catch((error) => {
        console.log("error: " + error);
      });
  };

  //notication delete
  const onConfirmDelete = (idDelete) => {
    message.success("Delete success!");
    onDeleteClass(idDelete);
  };

  const onCancelDelete = (e) => {
    message.error("Cancel delete!");
  };

  return (
    <div>
      <Table
        dataSource={data}
        columns={getColumns(
          onEditClass,
          onViewClass,
          onDeleteClass,
          onConfirmDelete,
          onCancelDelete
        )}
      />

      <ModalViewClass infoClass={infoClass} isModalOpen={isModalOpen} />
      <TableViewStudentClass infoStudentByIdClass={infoStudentByIdClass} />
    </div>
  );
};

export default connect(
  (store) => ({
    listClass: store.Class.listClass,
  }),
  { actSaveGetListClass, actSetModalClassOpen, actSetSelectedClass }
)(TableClass);
