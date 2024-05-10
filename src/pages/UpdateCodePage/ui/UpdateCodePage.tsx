import { Row, Card, Form, Space, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
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
import { ThemeContext } from "../../../hooks/ThemeProvider";

type registerData = Omit<IUser, "id"> & { confirmCode: string };

const UpdateCode = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [error, setError] = useState("");
  const [updateCode] = useUpdateCodeMutation();
  const { theme } = useContext(ThemeContext);


  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [navigate, user]);

  const onFinish = async (data: registerData) => {
    try {
      const response = await updateCode(data).unwrap();
      const { code, fullName } = response;

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
        <Card
          title="Відновити вхід"
          style={
            theme === "dark"
              ? { background: "#5585b5", border: "none" }
              : { background: "#fff" }
          }
        >
          <Form onFinish={onFinish}>
            <AppInput name="fullName" placeholder="Ім'я" />
            <AppInput name="repeatName" placeholder="Повтори своє ім'я" />
            <AppButton type="primary" htmlType="submit">
              Отримати код
            </AppButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              <Link 
               style={
                theme === "dark"
                  ? {
                      color: "#C6E2FB",
                      borderBottom: "1px solid ",
                    }
                  : {
                      color: "#030",
                      borderBottom: "1px solid ",
                    }
              }
              to="/login">Увійти в аккаунт</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};

export default UpdateCode;
