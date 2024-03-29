import { Link, useNavigate } from "react-router-dom";
import { Layout, Space, Typography, Button, Switch } from "antd";
import {
  BookOutlined,
  LoginOutlined,
  LogoutOutlined,
  MoonOutlined,
  SunOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import style from "./Header.module.scss";
import { useSelector } from "react-redux";
import { logout, selectUser } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

interface HeaderProps {
  handleTheme: (theme: string) => void;
  theme: string;
}

export const Header = ({ handleTheme, theme }: HeaderProps) => {
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
      className={`${style.header} ${theme === "dark" ? style.dark : style.light
        }`}
    >
      <Link to="/">
        <Space>
          <Typography.Title level={4}>Lernst du Deutsch?</Typography.Title>
        </Space>
      </Link>
      <div>
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
            <Space>
              <Switch
                onChange={(checked) => handleTheme(checked ? "dark" : "light")}
                checkedChildren={<MoonOutlined />}
                unCheckedChildren={<SunOutlined />}
                defaultChecked
              />
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
      </div>
    </Layout.Header>
  );
};
