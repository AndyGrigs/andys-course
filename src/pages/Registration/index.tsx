import { Card, Form, Row, Space, Typography } from "antd";
import Layout from "../../components/Layout";
import { Link } from "react-router-dom";
import { AppButton } from "../../components/ui/button";
import { AppInput } from "../../components/ui/input";
import { PasswordInput } from "../../components/ui/passwordInput";

export const Registration = () => {
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Реєстрація" style={{ width: "30rem" }}>
          <Form onFinish={() => null}>
            <AppInput name="name" placeholder="Ім'я" />
            <AppInput type="email" name="email" placeholder="email" />
            <PasswordInput name="password" placeholder="Пароль" />
            <PasswordInput
              name="confirmPassword"
              placeholder="Повторіть пароль"
            />
            <AppButton type="primary" htmlType="submit">
              Зареєструватись
            </AppButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Вжу є аккаунт? <Link to="/login">Війти</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
