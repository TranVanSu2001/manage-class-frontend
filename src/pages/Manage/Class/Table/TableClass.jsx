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
import { useDispatch } from "react-redux";
import classAction from "@/redux/action/actionClass";
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
    dataIndex: "numStu",
    key: "numStu",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (value, info) => (
      <Space size="middle">
        <Button
          type="primary"
          icon={<EditOutlined />}
          size="small"
          style={{ marginBottom: "1rem" }}
          onClick={() => {
            onEditClass(info.id);
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
            onDeleteClass(info.id);
          }}
        >
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => onConfirmDelete(info.id)}
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
          onClick={() => onViewClass(info.id)}
        >
          View
        </Button>
      </Space>
    ),
  },
];

const TableClass = () => {
  const [listClass, setListClass] = useState([]);
  //view class info
  const [infoClass, setInfoClass] = useState({});
  const [infoStudentByIdClass, setInfoStudentByClass] = useState([]);

  //get details class to show
  useEffect(() => {
    axios.get("http://localhost:3002/class/getClass").then((data) => {
      setListClass(data.data || []);
    });
  }, [listClass]);

  const data = [];
  listClass?.forEach((value, key) => {
    data.push({
      id: value.id,
      name: value.name,
      numStu: value.numberOfStudent,
    });
  });

  const dispatch = useDispatch();

  const onEditClass = (idEdit) => {
    axios
      .post("http://localhost:3002/class/getInfoById", {
        idEdit: idEdit,
      })
      .then((response) => {
        setInfoClass(response.data[0]);
      })
      .catch((error) => {
        console.log("error: " + error);
      });

    dispatch(classAction.activeEditClassModal(true));
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
    dispatch(classAction.activeViewStudentClass(true));
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

      <ModalViewClass infoClass={infoClass} />
      <TableViewStudentClass infoStudentByIdClass={infoStudentByIdClass} />
    </div>
  );
};

export default TableClass;
