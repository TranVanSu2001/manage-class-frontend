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
  actChangeInfoTable,
  activeViewStudentClass,
} from "@/redux/action/class";
import TableViewStudentClass from "./TableViewStudentClass";
// import ModalViewClass from "../Modal/ModalViewClass";

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
  const { listClass, onChangeInfoTable } = props;

  const [infoStudentByIdClass, setInfoStudentByClass] = useState([]);
  //get details class to show
  useEffect(() => {
    axios.get("http://localhost:3002/class").then((res) => {
      props.actSaveGetListClass(res?.data?.data || []);
    });
  }, [onChangeInfoTable]);

  const data = [];
  listClass.forEach((value, key) => {
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
    axios.delete(`http://localhost:3002/class/${idDelete}`, {
      idDelete: idDelete,
    });
    props.actChangeInfoTable(!onChangeInfoTable);
  };

  const onViewClass = (classID) => {
    axios
      .get(`http://localhost:3002/class/getStudent/${classID}`, {
        classID: classID,
      })
      .then((response) => {
        setInfoStudentByClass(response.data.data);
      })
      .catch((error) => {
        console.log("error: " + error);
      });
    props.activeViewStudentClass(true);
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

      <TableViewStudentClass infoStudentByIdClass={infoStudentByIdClass} />
    </div>
  );
};

export default connect(
  (store) => ({
    listClass: store.Class.listClass,
    onChangeInfoTable: store.Class.onChangeInfoTable,
  }),
  {
    activeViewStudentClass,
    actSaveGetListClass,
    actSetModalClassOpen,
    actSetSelectedClass,
    actChangeInfoTable,
  }
)(TableClass);
