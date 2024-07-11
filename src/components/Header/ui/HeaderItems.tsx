import React from "react";
import {
  BookOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, selectUser } from "../../../redux/slices/authSlice";
import { useTranslation } from 'react-i18next';

type MenuItem = Required<MenuProps>["items"][number];

export const HeaderItems: React.FC = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
            label: t("studies"),
            icon: <BookOutlined />,
            onClick: () => navigate("/modules"),
          },
          {
            key: "13",
            label: t("logout"),
            icon: <LogoutOutlined />,
            onClick: onLogoutClick,
          },
        ]
        : [
          {
            key: "login",
            label:  t("login"),
            icon: <LoginOutlined />,
            onClick: () => navigate("/login"),
          },
          {
            key: "register",
            label:  t("register"),
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
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
      items={items}
    />
  );
};
