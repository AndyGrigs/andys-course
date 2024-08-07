import { Button, Card, Form, Input, Row, Space, Typography } from "antd";
import Layout from "../../../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import {  useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/authSlice";
import { UserData, useLoginMutation } from "../../../redux/services/auth";
import { ErrorMessage } from "../../../components/Error";

import { isErrorWithMessage } from "../../../utils/isErrorWithMessage";
import { useTranslation } from "react-i18next";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [error, setError] = useState("");
  const user = useSelector(selectUser);
  const [loginUser] = useLoginMutation();

  useEffect(() => {
    if (user) {
      navigate("/modules");
    }
  }, [user, navigate]);

  const onFinish = async (data: UserData) => {
    try {
      const response = await loginUser(data).unwrap();
      const { token } = response;
      localStorage.setItem("token", token);
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError(t("genericError"));
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card
          title={t("login")}
          // style={{ width: "30rem" }}
        >
          <Form onFinish={onFinish}>
            <Form.Item
              name="fullName"
              label={t("name")}
              rules={[{ required: true, message: t("writeYourName")  }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="code"
              label={t("code")}
              rules={[{ required: true, message: t("enterYourCode") }]}
            >
              <Input.Password
              
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                {t("login")}
              </Button>
            </Form.Item>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              {t("dontHaveAccount")}{"  "}
              <Link
                to="/register"
              >
                {t("register")}
              </Link>
            </Typography.Text>
            <Typography.Text>
              {t("dontKnowCode")}{"  "}
              <Link to="/register-update"
              >
                {t("restore")}
              </Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

export default Login;
