import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Layout,
  Space,
  Typography,
  Button,
  Drawer,
  Flex,
  MenuProps,
} from "antd";
import {
  BookOutlined,
  LoginOutlined,
  LogoutOutlined,
  MoonOutlined,
  SunOutlined,
  UserAddOutlined,
  MenuOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
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
import { HeaderItems } from "./HeaderItems";

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

  const useStyle = createStyles(() => ({
    "my-drawer-mask": {
      boxShadow: `inset 0 0 15px #fff`,
    },
    "drawer-header-light": {
      background: "green",
    },
    "drawer-header-dark": {
      background: "green",
    },
    "my-drawer-footer": {},
    "my-drawer-content": {
      borderLeft: "2px solid #333",
    },
    "drawer-body-dark": {
      // color: "#fff",
      backgroundColor: "#5585b5",
    },
    "drawer-body-light": {
      backgroundColor:
        "radial-gradient(circle at 0% 0.5%, rgb(241, 241, 242) 0.1%, rgb(224, 226, 228) 100.2%)",
    },
  }));

  // const AppHeaderMenu: React.FC = () => {
  //   const onClick: MenuProps["onClick"] = (e) => {
  //     console.log("click ", e);
  //   };

  //   return (
  //     <Menu
  //       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //       //@ts-ignore
  //       onClick={onClick}
  //       style={{ width: 256 }}
  //       defaultSelectedKeys={["1"]}
  //       defaultOpenKeys={["sub1"]}
  //       mode="inline"
  //       items={items}
  //     />
  //   );
  // };

  const Menu = () => {
    const { styles } = useStyle();
    const token = useTheme();
    const [isOpen, setIsOpen] = useState(false); // Manage the open state within the component

    const toggleDrawer = () => {
      setIsOpen(!isOpen); // Toggle the open state
    };

    const classNames: DrawerClassNames = {
      body:
        theme === "dark"
          ? styles["drawer-body-dark"]
          : styles["drawer-body-light"],
      mask: styles["my-drawer-mask"],
      header:
        theme === "dark"
          ? styles["drawer-body-dark"]
          : styles["drawer-body-light"],
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
          <Button
            icon={<MenuOutlined />}
            onClick={toggleDrawer}
            type="text"
            style={{ marginBottom: 16 }}
          />
        </Space>

        <Drawer
          title="Cabinet"
          placement="right"
          // footer="Footer"
          onClose={toggleDrawer}
          open={isOpen}
          classNames={classNames}
          styles={drawerStyles}
        >
          {/* <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1", "sub2", "sub4"]}
            items={items}
            style={{ height: "100%", borderRight: 0 }}
          /> */}
          {user ? (
            <Flex vertical align="center">
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
            </Flex>
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
          <HeaderItems />
          {/* <AppHeaderMenu /> */}
        </Drawer>
        {/* <ConfigProvider
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
        </ConfigProvider> */}
      </>
    );
  };

  type MenuItem = Required<MenuProps>["items"][number];

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
        <Button
          type="text"
          onClick={() => handleTheme(theme === "dark" ? "light" : "dark")}
          icon={theme === "dark" ? <SunOutlined /> : <MoonOutlined />}
        />
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
        {/*
         */}
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
