import { Button, Card, Form, Input, Row, Space, Typography } from "antd";
import Layout from "../../../components/Layout";
import { AppInput } from "../../../components/ui/input";
import { AppButton } from "../../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/authSlice";
import { UserData, useLoginMutation } from "../../../redux/services/auth";
import { isErrorWithMessage } from "../../../utils/isErrorWithMessage";
import { ErrorMessage } from "../../../components/Error";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const user = useSelector(selectUser);
  const [loginUser] = useLoginMutation();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // const login = async (data: UserData) => {
  //   try {
  //     await loginUser(data).unwrap();
  //     navigate("/dashboard");
  //   } catch (err) {
  //     const maybeError = isErrorWithMessage(err);
  //     if (maybeError) {
  //       setError(err.data.message);
  //     } else {
  //       setError("Unbekanter Felhler");
  //     }
  //   }
  // };

  const onFinish = async (data: UserData) => {
    try {
      const response = await loginUser(data).unwrap();
      const { token } = response;
      localStorage.setItem("token", token); // Store the token in localStorage or your preferred storage mechanism
      console.log("Logged in successfully");
      // Redirect the user or perform other actions upon successful login
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Einlogen" style={{ width: "30rem" }}>
          {/* <Form onFinish={login}>
            <AppInput type="text" name="fullName" placeholder="Name" />
            <AppInput name="code" placeholder="Code" />
            <AppButton type="primary" htmlType="submit">
              Eintreten
            </AppButton>
          </Form> */}
          <Form onFinish={onFinish}>
            <Form.Item
              name="fullName"
              label="Full Name"
              rules={[
                { required: true, message: "Please enter your full name" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="code"
              label="Code"
              rules={[{ required: true, message: "Please enter your code" }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Kein Konto?<Link to="/register">Зареєструйтесь</Link>
            </Typography.Text>
            <Typography.Text>
              Ein Code vergessen?
              <Link to="/register-update">Neues Code erhalten</Link>
            </Typography.Text>
            <ErrorMessage message={error} />
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

export default Login;
