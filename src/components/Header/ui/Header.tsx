import { Link, useNavigate } from "react-router-dom";
import { Layout, Space, Typography, Button, Menu, Drawer } from "antd";
import {
  BookOutlined,
  LoginOutlined,
  LogoutOutlined,
  MoonOutlined,
  SunOutlined,
  UserAddOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import styles from "./Header.module.scss";
import { useSelector } from "react-redux";
import { logout, selectUser } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { useContext, useState } from "react";
import { ThemeContext } from "../../../hooks/ThemeProvider";

type MenuItem = {
  key: string;
  label: string;
};

const menuItems: MenuItem[] = [
  { key: "home", label: "Home" },
  { key: "about", label: "About" },
  { key: "services", label: "Services" },
  { key: "contact", label: "Contact" },
];

export const Header = () => {
  const { handleTheme, theme } = useContext(ThemeContext);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Layout.Header
      className={`${styles.header} ${
        theme === "dark" ? styles.dark : styles.light
      }`}
    >
      <Link to="/">
        <Space>
          <Typography.Title level={4}></Typography.Title>
        </Space>
      </Link>
      <div className={styles.links}>
        {user ? (
          <>
            <Space>
              <Link to="/dashboard">
                <Button icon={<BookOutlined />} type="text">
                  Кабінет
                </Button>
              </Link>
            </Space>
            <Space>
              <Button
                type="text"
                icon={<LogoutOutlined />}
                onClick={onLogoutClick}
              >
                Вийти
              </Button>
            </Space>
          </>
        ) : (
          <>
            <Space>
              <Link to="/login">
                <Button icon={<LoginOutlined />} type="text">
                  Увійти
                </Button>
              </Link>
            </Space>
            <Space>
              <Link to="/register">
                <Button icon={<UserAddOutlined />} type="text">
                  Зареєструватись
                </Button>
              </Link>
            </Space>
          </>
        )}
        <Space>
          <Button
            type="text"
            onClick={() => handleTheme(theme === "dark" ? "light" : "dark")}
            icon={theme === "dark" ? <SunOutlined /> : <MoonOutlined />}
          />
        </Space>
      </div>
    </Layout.Header>
  );
  // return (

  // );
};
