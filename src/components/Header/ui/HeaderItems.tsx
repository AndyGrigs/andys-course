import React, { useContext } from "react";
import {
  BookOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { ThemeContext } from "../../../hooks/ThemeProvider";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, selectUser } from "../../../redux/slices/authSlice";

type MenuItem = Required<MenuProps>["items"][number];

export const HeaderItems: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const items: MenuItem[] = [

    {
      type: "divider",
    },

    {
      key: "accaunt",
      label: "",
      type: "group",

      children: user
        ? [
            {
              key: "dashboard",
              label: "Навчальння",
              icon: <BookOutlined />,
              onClick: () => navigate("/modules"),
            },
            {
              key: "13",
              label: "Вийти",
              icon: <LogoutOutlined />,
              onClick: onLogoutClick,
            },
          ]
        : [
            {
              key: "login",
              label: "Увійти",
              icon: <LoginOutlined />,
              onClick: () => navigate("/login"),
            },
            {
              key: "register",
              label: "Зареєструватись",
              icon: <UserAddOutlined />,
              onClick: () => navigate("/register"),
            },
          ],
    },
  ];

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  return (
    <Menu
      onClick={onClick}
      style={
        theme === "dark" ? { background: "#5585b5" } : { background: "#fff" }
      }
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
    />
  );
};
