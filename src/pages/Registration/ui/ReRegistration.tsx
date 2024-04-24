import { Layout, Row, Card, Form, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppButton } from "../../../components/ui/button";
import { AppInput } from "../../../components/ui/input";
import { useReRegisterMutation } from "../../../redux/services/auth";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/authSlice";
import { isErrorWithMessage } from "../../../utils/isErrorWithMessage";
import { IUser } from "../../../types";

type registerData = Omit<IUser, "id"> & { confirmCode: string };

const ReRegistration = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [reRegisterUser] = useReRegisterMutation();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [navigate, user]);

  const reRegister = async (data: registerData) => {
    try {
      await reRegisterUser(data).unwrap();
      navigate("/dashboard");
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
        <Card title="Anmeldung aktualizieren" style={{ width: "30rem" }}>
          <Form onFinish={reRegister}>
            <AppInput name="fullName" placeholder="Name" />
            <AppInput name="fullName" placeholder="Wiederhol den Name" />
            <AppButton type="primary" htmlType="submit">
              Anmelden
            </AppButton>
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

export default ReRegistration;
