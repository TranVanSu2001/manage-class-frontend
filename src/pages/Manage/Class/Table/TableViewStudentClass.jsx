import React, { useState, useEffect } from "react";
import { Space, Table, Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  activeAddStudentModal,
  activeViewStudentClass,
} from "@/redux/action/class";
import studentAction from "@/redux/action/actionStudent";
import ModalAddStudent from "../../Student/Modal/ModalAddStudent";

const TableViewStudentClass = (props) => {
  const { activeAddStudentModal } = props;
  //sort table
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  useEffect(() => {}, [props]);

  const infoStudentByIdClass = props?.infoStudentByIdClass;
  //data table
  var data = [];

  const classReducer = useSelector((state) => state.Class);

  infoStudentByIdClass.forEach((value, key) => {
    data.push({
      id: value.id,
      name: value.name,
      age: value.age,
      email: value.email,
      sex: value.sex,
    });
  });

  const dispatch = useDispatch();

  //modal
  const handleModalClose = () => {
    // dispatch(classAction.activeViewStudentClass(false));
    props.activeViewStudentClass(false);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === "age" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
    },
  ];

  const handleChangeTable = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };

  const addMoreStudentInClass = () => {
    props.activeAddStudentModal(true);
    console.log("123");
  };

  return (
    <div>
      <Modal
        visible={classReducer.activeViewStudentClass}
        onCancel={handleModalClose}
        onOk={handleModalClose}
        width={1060}
        bodyStyle={{ padding: "2.6rem", alignItems: "center" }}
        title={
          infoStudentByIdClass.length === 0
            ? ""
            : `Student in class ${infoStudentByIdClass[0].classID}`
        }
      >
        <Space
          style={{
            marginBottom: 16,
            // display: "none",
          }}
        >
          <Button onClick={setAgeSort}>Sort age</Button>
          <Button onClick={clearFilters}>Clear filters</Button>
          <Button onClick={clearAll}>Clear filters and sorters</Button>
        </Space>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ margin: "0 10px" }}
          onClick={addMoreStudentInClass}
        >
          Add more
        </Button>
        <Table
          columns={columns}
          dataSource={data}
          style={{ height: "100%", width: "100%" }}
          onChange={handleChangeTable}
          pagination={false}
        ></Table>
      </Modal>
    </div>
  );
};

export default connect(
  (store) => ({
    listClass: store.Class.listClass,
    onChangeInfoTable: store.Class.onChangeInfoTable,
  }),
  { activeViewStudentClass }
)(TableViewStudentClass);
