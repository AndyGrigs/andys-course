import { Card, Form, Input, Row, Space, Typography } from "antd";
import Layout from "../../../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { AppButton } from "../../../components/ui/button";
import { AppInput } from "../../../components/ui/input";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/authSlice";
import { useEffect, useState } from "react";
import { useRegisterMutation } from "../../../redux/services/auth";
import { IUser } from "../../../types";
import { isErrorWithMessage } from "../../../utils/isErrorWithMessage";
import { Loader } from "../../../components/Loader/ui/Loader";

type registerData = Omit<IUser, "id"> & { confirmPassword: string };

const Registration = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [registerUser] = useRegisterMutation();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [navigate, user]);

  const register = async (data: registerData) => {
    try {
      const response = await registerUser(data).unwrap();
      const { code, token } = response;
      localStorage.setItem("token", token);
      navigate("/user-code", { state: { code } });
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Ein Fehler((");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Anmeldung" style={{ width: "30rem" }}>
          {/* <Form onFinish={register}>
            <AppInput name="fullName" placeholder="Name" />
            <AppButton type="primary" htmlType="submit">
              Anmelden
            </AppButton>
          </Form> */}
          <Form onFinish={register}>
            <Form.Item
              name="fullName"
              label="Full Name"
              rules={[
                { required: true, message: "Please enter your full name" },
              ]}
            >
              <Input />
            </Form.Item>

            {error && (
              <Form.Item>
                <Typography.Text type="danger">{error}</Typography.Text>
              </Form.Item>
            )}

            <Form.Item>
              <AppButton type="primary" htmlType="submit">
                Register
              </AppButton>
            </Form.Item>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Hast du schon ein Konto? <Link to="/login">Eintreten</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

export default Registration;
