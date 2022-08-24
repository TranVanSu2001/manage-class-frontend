import { Layout, Menu, Avatar, Badge } from "antd";
import { useState } from "react";
import {
  AiFillHome,
  AiOutlineUnorderedList,
  AiOutlineBell,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { DefaultLayoutWrapper, ContentWrapper } from "./style";

const { Header, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  {
    label: "Home",
    key: "1",
    icon: (
      <Link to="/">
        <AiFillHome />
      </Link>
    ),
  },
  {
    label: "Manage",
    key: "sub1",
    icon: (
      <Link to="/">
        <AiOutlineUnorderedList />
      </Link>
    ),
    children: [
      {
        label: "Class",
        key: "2",
        icon: <Link to="/class"></Link>,
      },
      {
        label: "Student",
        key: "3",
        icon: <Link to="/student"></Link>,
      },
      {
        label: "Subject",
        key: "4",
        icon: <Link to="/subject"></Link>,
      },
    ],
  },
];

const DefaultLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeKey, setActiveKey] = useState(null);

  return (
    <DefaultLayoutWrapper>
      <Layout className="main-layout">
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="logo">DASHBOARD</div>

          <Menu
            theme="dark"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={items}
          />
        </Sider>

        <Layout className="site-layout">
          <Header className="dashboard-header">
            <div className="notify">
              <Badge count={5}>
                <AiOutlineBell style={{ fontSize: "1.3rem" }} />
              </Badge>
            </div>

            <Badge style={{ backgroundColor: "#52c41a" }} dot={true}>
              <Avatar
                src="https://joeschmoe.io/api/v1/random"
                style={{ border: "1px solid #f2f2f2" }}
              />
            </Badge>
          </Header>

          <ContentWrapper>{children}</ContentWrapper>

          <Footer className="footer">{`Created by Su @${new Date().getFullYear()}`}</Footer>
        </Layout>
      </Layout>
    </DefaultLayoutWrapper>
  );
};

export default DefaultLayout;
