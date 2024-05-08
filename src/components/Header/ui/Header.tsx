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
import { createStyles, useTheme } from "antd-style";
import type {
  DrawerClassNames,
  DrawerStyles,
} from "antd/es/drawer/DrawerPanel";
import { ConfigProvider } from "antd/lib";

export const Header = () => {
  const { handleTheme, theme } = useContext(ThemeContext);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [open, setOpen] = useState([false, false]);
  const token = useTheme();

  // const useStyle = createStyles(({ token }) => ({
  //   "my-drawer-body": {
  //     background: token.blue1,
  //   },
  //   "my-drawer-mask": {
  //     boxShadow: `inset 0 0 15px #fff`,
  //   },
  //   "my-drawer-header": {
  //     background: token.green1,
  //   },
  //   "my-drawer-footer": {
  //     color: token.colorPrimary,
  //   },
  //   "my-drawer-content": {
  //     borderLeft: "2px dotted #333",
  //   },
  // }));

  // const toggleDrawer = () => {
  //   setDrawerVisible(!drawerVisible);
  // };

  // const toggleDrawer = (idx: number, target: boolean) => {
  //   setOpen((p) => {
  //     p[idx] = target;
  //     return [...p];
  //   });
  // };

  // const classNames: DrawerClassNames = {
  //   body: styles["my-drawer-body"],
  //   mask: styles["my-drawer-mask"],
  //   header: styles["my-drawer-header"],
  //   footer: styles["my-drawer-footer"],
  //   content: styles["my-drawer-content"],
  // };

  // const drawerStyles: DrawerStyles = {
  //   mask: {
  //     backdropFilter: "blur(10px)",
  //   },
  //   content: {
  //     boxShadow: "-10px 0 10px #666",
  //   },
  //   header: {
  //     borderBottom: `1px solid ${token.colorPrimary}`,
  //   },
  //   body: {
  //     fontSize: token.fontSizeLG,
  //   },
  //   footer: {
  //     borderTop: `1px solid ${token.colorBorder}`,
  //   },
  // };

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  // const menuItems = [
  //   {
  //     key: "1",
  //     label: user ? (
  //       <Link to="/dashboard">
  //         <Button icon={<BookOutlined />} type="text">
  //           Модулі
  //         </Button>
  //       </Link>
  //     ) : null,
  //   },
  //   {
  //     key: "2",
  //     label: user ? null : (
  //       <Link to="/login">
  //         <Button icon={<LoginOutlined />} type="text">
  //           Увійти
  //         </Button>
  //       </Link>
  //     ),
  //   },
  //   {
  //     key: "3",
  //     label: user ? null : (
  //       <Link to="/register">
  //         <Button icon={<UserAddOutlined />} type="text">
  //           Зареєструватись
  //         </Button>
  //       </Link>
  //     ),
  //   },
  //   {
  //     key: "4",
  //     label: user ? (
  //       <Button icon={<LogoutOutlined />} onClick={onLogoutClick} type="text">
  //         Вийти
  //       </Button>
  //     ) : null,
  //   },
  // ];

  // const drawerClassName =
  //   theme === "dark" ? `${styles.drawerDark}` : `${styles.drawerLight}`;

  const useStyle = createStyles(({ token }) => ({
    "my-drawer-body": {
      background: "red",
    },
    "my-drawer-mask": {
      boxShadow: `inset 0 0 15px #fff`,
    },
    "my-drawer-header": {
      background: "green",
    },
    "my-drawer-footer": {
      color: "pink",
    },
    "my-drawer-content": {
      borderLeft: "2px dotted #333",
    },
  }));

  const Menu: React.FC = () => {
    const [open, setOpen] = useState([false, false]);
    const { styles } = useStyle();
    const token = useTheme();

    const toggleDrawer = (idx: number, target: boolean) => {
      setOpen((p) => {
        p[idx] = target;
        return [...p];
      });
    };

    const classNames: DrawerClassNames = {
      body: styles["my-drawer-body"],
      mask: styles["my-drawer-mask"],
      header: styles["my-drawer-header"],
      footer: styles["my-drawer-footer"],
      content: styles["my-drawer-content"],
    };

    const drawerStyles: DrawerStyles = {
      mask: {
        backdropFilter: "blur(10px)",
      },
      content: {
        boxShadow: "-10px 0 10px #666",
      },
      header: {
        borderBottom: `1px solid ${token.colorPrimary}`,
      },
      body: {
        fontSize: token.fontSizeLG,
      },
      footer: {
        borderTop: `1px solid ${token.colorBorder}`,
      },
    };

    return (
      <>
        <Space>
          <Button type="primary" onClick={() => toggleDrawer(0, true)}>
            Open
          </Button>
          <Button type="primary" onClick={() => toggleDrawer(1, true)}>
            ConfigProvider
          </Button>
        </Space>
        <Drawer
          title="ß Drawer"
          placement="right"
          footer="Footer"
          onClose={() => toggleDrawer(0, false)}
          open={open[0]}
          classNames={classNames}
          styles={drawerStyles}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
        <ConfigProvider
          drawer={{
            classNames,
            styles: drawerStyles,
          }}
        >
          <Drawer
            title="Basic Drawer"
            placement="right"
            footer="Footer"
            onClose={() => toggleDrawer(1, false)}
            open={open[1]}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Drawer>
        </ConfigProvider>
      </>
    );
  };

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
        <Menu />
        {/* {user ? (
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
        )} */}
        {/* <Button
          type="text"
          onClick={() => handleTheme(theme === "dark" ? "light" : "dark")}
          icon={theme === "dark" ? <SunOutlined /> : <MoonOutlined />}
        />
        <Button
          icon={<MenuOutlined />}
          // onClick={toggleDrawer}
          onClick={() => toggleDrawer(0, true)}
          type="text"
          style={{ marginBottom: 16 }}
        /> */}
        {/* <ConfigProvider>
          <Drawer
            className={`${theme === "dark" ? styles.dark : styles.light}`}
            title=""
            placement="right"
            // footer="Footer"
            onClose={() => toggleDrawer(0, false)}
            open={open[0]}
            // classNames={classNames}
            // className={drawerClassName}
            styles={drawerStyles}
          >
            <Menu
              className={`${theme === "dark" ? styles.dark : styles.light}`}
              mode="vertical"
              // defaultSelectedKeys={["1"]}
              items={menuItems}
            />
          </Drawer>
        </ConfigProvider> */}
        {/* <Drawer
          // className={drawerClassName}
          title="Navigation Menu"
          placement="right"
          onClose={toggleDrawer}
          open={drawerVisible}
        >
      
        </Drawer> */}
      </div>
    </Layout.Header>
  );
};
