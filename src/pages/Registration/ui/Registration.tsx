import { Card, Form, Input, Row, Space, Typography, Button } from "antd";
import Layout from "../../../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/authSlice";
import { useEffect, useState } from "react";
import { useRegisterMutation } from "../../../redux/services/auth";
import { IUser } from "../../../app/types";
import { isErrorWithMessage } from "../../../utils/isErrorWithMessage";


type registerData = Omit<IUser, "id"> & { confirmPassword: string };

const Registration = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [registerUser] = useRegisterMutation();

  useEffect(() => {
    if (user) navigate("/modules");
  }, [navigate, user]);

  const register = async (data: registerData) => {
    try {
      const response = await registerUser(data).unwrap();
      const { code, token, fullName } = response;
      localStorage.setItem("token", token);
      navigate("/user-code", { state: { code, fullName } });
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("сталась помилка...");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card
          title="Зареєструватись"
        >
          <Form onFinish={register}>
            <Form.Item
              name="fullName"
              label="Ім'я"
              rules={[{ required: true, message: "напиши своє ім'я" }]}
            >
              <Input
                onChange={(e) => e.target.value.trim()}
              
              />
            </Form.Item>

            {error && (
              <Form.Item>
                <Typography.Text type="danger">{error}</Typography.Text>
              </Form.Item>
            )}

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Зареєструватись
              </Button>
            </Form.Item>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Вже є аккаунт?{" "}
              <Link
                to="/login"
              >
                Увійти
              </Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

export default Registration;
