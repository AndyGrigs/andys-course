import { Link } from "react-router-dom";
import { Layout, Space, Typography, Button } from "antd";
import { LoginOutlined, UserAddOutlined } from "@ant-design/icons";
import style from "./Header.module.scss";

export const Header = () => {
  return (
    <Layout.Header className={style.header}>
      <Link to="/">
        <Space>
          <Typography.Title level={4}>Lernst du Deutsch?</Typography.Title>
        </Space>
      </Link>
      <div>
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
      </div>
    </Layout.Header>
  );
};

