import React, { useState, useEffect } from "react";
import Axios from "axios";

//ant design
import { Space, Table, Button, message, Popconfirm } from "antd";
import "antd/dist/antd.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

//redux
import { useDispatch } from "react-redux";
import subjectAction from "@/redux/action/actionSubject";

import ModalEditSubject from "../Modal/ModalEditSubject";

const TableSubject = () => {
  //redux
  const dispatch = useDispatch();

  const [listSubject, setListSubject] = useState([]);
  //view class info
  const [listIdClass, setListIdClass] = useState([]);

  const [infomationSubjectById, setInfomationSubjectById] = useState([]);

  //get details class to show
  useEffect(() => {
    Axios.get("http://localhost:3002/subject/getSubject").then((data) => {
      setListSubject(data.data);
    });
  }, [listSubject]);

  useEffect(() => {
    Axios.get("http://localhost:3002/class/getListId").then((response) => {
      setListIdClass(response.data);
    });
  }, [listIdClass]);

  var filterClass = [];
  // console.log("list id", listIdClass);
  var listIdClassFiltter = [];

  filterClass = listIdClass?.forEach((key, index) => {
    const listClass = { text: key.id, value: key.id };

    filterClass.push(listClass);
    listIdClassFiltter = filterClass;
  });

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

  // console.log("data", data);

  //function edit, view Modal
  const editSubject = (idEdit) => {
    Axios.post("http://localhost:3002/subject/getInfoById", {
      idEdit: idEdit,
    })
      .then((response) => {
        setInfomationSubjectById(response.data[0]);
      })
      .catch((error) => {
        console.log("error: " + error);
      });

    dispatch(subjectAction.activeEditSubjectModal(true));
  };

  //delete function
  //notication delete

  const deleteSubject = (idDelete) => {
    Axios.post("http://localhost:3002/subject/deleteSubject", {
      idDelete: idDelete,
    });
  };

  const confirm = (idDelete) => {
    console.log("id delete", idDelete);
    message.success("Delete success!");
    deleteSubject(idDelete);
  };

  const cancel = (e) => {
    message.error("Cancel delete!");
  };

  //data table

  //sort table
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChangeTable = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
    console.log("clear");
  };

  const clearAll = () => {
    console.log("clear");
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setAgeSort = () => {
    console.log("clear");
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };

  // console.log("filterClass", filterClass);

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
      render: (_, info) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            style={{ margin: "0 10px" }}
            onClick={() => {
              editSubject(info.id);
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
              onConfirm={() => confirm(info.id)}
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
        </Space>
      ),
      width: "200px",
    },
  ];
  return (
    <div>
      <div>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </div>
      <Table
        dataSource={data}
        columns={columns}
        onChange={handleChangeTable}
      ></Table>
      <ModalEditSubject infomationSubjectById={infomationSubjectById} />
    </div>
  );
};

export default TableSubject;
