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

  // const {
  //   data: modulesData,
  //   isLoading: isModulesLoading,
  //   isError: isModulesError,
  // } = useGetAllModulesQuery();

  // console.log(modulesData);

  // if (isModulesLoading) {
  //   return <Loader />;
  // }

  // if (isModulesError) {
  //   return <div>Error loading Modules...</div>;
  // }

  const onLogoutClick = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  const items: MenuItem[] = [
    // {
    //   key: "sub2",
    //   label: "",
    //   icon: <AppstoreOutlined />,
    //   children: [
    //     {
    //       key: "sub3",
    //       label: "Submenu",
    //       // children: [
    //       //   { key: "7", label: "Option 7" },
    //       //   { key: "8", label: "Option 8" },
    //       // ],
    //       children: modulesData?.map((module, index)=>(
    //         {
    //           key: `module-${index}`,
    //           label: module.name,
    //           children: Object.entries(module).map(([key, value], index)=>{
    //             if (Array.isArray(value) || typeof value === 'object') {
    //               // For arrays and objects, display a summary or provide a submenu
    //               return {
    //                 key: `${key}-${index}`,
    //                 label: `${key}: ${Array.isArray(value)? value.length : 'Object'}`,
    //                 // Optionally, add a submenu for arrays or objects
    //               };
    //             } else {
    //               // For simple values, display them directly
    //               return {
    //                 key: `${key}-${index}`,
    //                 label: `${key}: ${value}`,
    //               };
    //             }
    //           })
    //         }
    //       ))
    //     },
    //   ],
    // },

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
