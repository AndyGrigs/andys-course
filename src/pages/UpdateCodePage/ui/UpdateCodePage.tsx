import { Row, Card, Form, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppButton } from "../../../components/ui/button";
import { AppInput } from "../../../components/ui/input";
import { useUpdateCodeMutation } from "../../../redux/services/auth";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/authSlice";
import { isErrorWithMessage } from "../../../utils/isErrorWithMessage";
import { IUser } from "../../../types";
import { Loader } from "../../../components/Loader";
import Layout from "../../../components/Layout";

type registerData = Omit<IUser, "id"> & { confirmCode: string };

const UpdateCode = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [updateCode] = useUpdateCodeMutation();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [navigate, user]);

  const onFinish = async (data: registerData) => {
    try {
      const response = await updateCode(data).unwrap();
      const { code, fullName } = response;
      console.log(code, fullName);
      navigate("/user-code", { state: { code, fullName } });
    } catch (err) {
      const maybeError = isErrorWithMessage(err);

      if (maybeError) {
        setError(err.data.message);
      } else {
        setError("es ist ein Fehler!");
      }
    }
  };

  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Anmeldung aktualizieren" style={{ width: "30rem" }}>
          <Form onFinish={onFinish}>
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

export default UpdateCode;
