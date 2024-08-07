import { Card, Form, Input, Row, Space, Typography, Button } from "antd";
import Layout from "../../../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/authSlice";
import { useEffect, useState } from "react";
import { useRegisterMutation } from "../../../redux/services/auth";
import { IUser } from "../../../app/types";
import { isErrorWithMessage } from "../../../utils/isErrorWithMessage";
import { useTranslation } from "react-i18next";


type registerData = Omit<IUser, "id"> & { confirmPassword: string };

const Registration = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [registerUser] = useRegisterMutation();
  const {t} = useTranslation()

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
        setError(t('genericError'));
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card
          title={t("register")}
        >
          <Form onFinish={register}>
            <Form.Item
              name="fullName"
              label={t('name')}
              rules={[{ required: true, message: t('writeYourName') }]}
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
                {t('register')}
              </Button>
            </Form.Item>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              {t("alreadyHaveAccount")}{"  "}
              <Link
                to="/login"
              >
                {t("login")}
              </Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

export default Registration;
