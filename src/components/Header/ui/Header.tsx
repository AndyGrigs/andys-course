import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Space, Typography, Button, Drawer, Menu } from "antd";
import {
  BookOutlined,
  LoginOutlined,
  LogoutOutlined,
  MoonOutlined,
  SunOutlined,
  UserAddOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectUser } from "../../../redux/slices/authSlice";
import styles from "./Header.module.scss";
import { ThemeContext } from "../../../hooks/ThemeProvider";

export const Header = () => {
  const { handleTheme, theme } = useContext(ThemeContext);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    {
      key: "1",
      icon: <BookOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: "2",
      icon: <LoginOutlined />,
      label: <Link to="/login">Login</Link>,
    },
    {
      key: "3",
      icon: <UserAddOutlined />,
      label: <Link to="/register">Register</Link>,
    },
  ];

  return (
    <Layout.Header
      className={`${styles.header} ${
        theme === "dark" ? styles.dark : styles.light
      }`}
    >
      <Link to="/">
        <Space>
          <Typography.Title level={4}>Logo</Typography.Title>
        </Space>
      </Link>
      <div className={styles.links}>
        {user ? (
          <Space>
            <Link to="/dashboard">
              <Button icon={<BookOutlined />} type="text">
                Кабінет
              </Button>
            </Link>
            <Button
              icon={<LogoutOutlined />}
              onClick={onLogoutClick}
              type="text"
            >
              Вийти
            </Button>
          </Space>
        ) : (
          <Space>
            <Link to="/login">
              <Button icon={<LoginOutlined />} type="text">
                Увійти
              </Button>
            </Link>
            <Link to="/register">
              <Button icon={<UserAddOutlined />} type="text">
                Зареєструватись
              </Button>
            </Link>
          </Space>
        )}
        <Button
          type="text"
          onClick={() => handleTheme(theme === "dark" ? "light" : "dark")}
          icon={theme === "dark" ? <SunOutlined /> : <MoonOutlined />}
        />
        <Button
          icon={<MenuOutlined />}
          onClick={toggleDrawer}
          type="text"
          style={{ marginBottom: 16 }}
        />
        <Drawer
          title="Navigation Menu"
          placement="right"
          onClose={toggleDrawer}
          open={drawerVisible}
        >
          <Menu mode="vertical" defaultSelectedKeys={["1"]} items={menuItems} />
        </Drawer>
      </div>
    </Layout.Header>
  );
};
