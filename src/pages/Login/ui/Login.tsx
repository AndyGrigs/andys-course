import { Card, Form, Row, Space, Typography } from "antd";
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

  const login = async (data: UserData) => {
    try {
      await loginUser(data).unwrap();
      navigate("/dashboard");
    } catch (err) {
      const maybeError = isErrorWithMessage(err);
      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("Unbekanter Felhler");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Einlogen" style={{ width: "30rem" }}>
          <Form onFinish={login}>
            <AppInput type="text" name="fullName" placeholder="Name" />
            <AppInput name="code" placeholder="Code" />
            <AppButton type="primary" htmlType="submit">
              Eintreten
            </AppButton>
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
