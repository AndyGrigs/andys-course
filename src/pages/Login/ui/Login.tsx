import { Button, Card, Form, Input, Row, Space, Typography } from "antd";
import Layout from "../../../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/authSlice";
import { UserData, useLoginMutation } from "../../../redux/services/auth";
import { ErrorMessage } from "../../../components/Error";
import { ThemeContext } from "../../../hooks/ThemeProvider";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [error, setError] = useState("");
  const user = useSelector(selectUser);
  const [loginUser] = useLoginMutation();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const onFinish = async (data: UserData) => {
    try {
      const response = await loginUser(data).unwrap();
      const { token } = response;
      localStorage.setItem("token", token);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card
          title="Einlogen"
          // style={{ width: "30rem" }}
          style={
            theme === "dark"
              ? { background: "#5585b5", border: "none" }
              : { background: "#fff" }
          }
        >
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
              Kein Konto?
              <Link
                to="/register"
                style={
                  theme === "dark"
                    ? {
                        color: "#C6E2FB",
                        marginLeft: "1em",
                        borderBottom: "1px solid ",
                      }
                    : {
                        color: "",
                        marginLeft: "1em",
                        borderBottom: "1px solid ",
                      }
                }
              >
                Зареєструйтесь
              </Link>
            </Typography.Text>
            <Typography.Text>
              Ein Code vergessen?
              <Link
                style={
                  theme === "dark"
                    ? {
                        color: "#C6E2FB",
                        marginLeft: "1em",
                        borderBottom: "1px solid ",
                      }
                    : {
                        color: "",
                        marginLeft: "1em",
                        borderBottom: "1px solid ",
                      }
                }
                to="/register-update"
              >
                Neues Code erhalten
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
