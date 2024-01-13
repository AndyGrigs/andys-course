import { Card, Form, Row, Space, Typography } from "antd";
import Layout from "../../components/Layout";
import { PasswordInput } from "../../components/ui/passwordInput";
import { AppInput } from "../../components/ui/input";
import { AppButton } from "../../components/ui/button";
import { Link } from "react-router-dom";

export const Login: React.FC = () => {
  return (
    <Layout>
      <Row align="middle" justify="center">
        <Card title="Війти" style={{ width: "30rem" }}>
          <Form onFinish={() => null}>
            <AppInput type="email" name="email" placeholder="email" />
            <PasswordInput name="password" placeholder="Пароль" />
            <AppButton type="primary" htmlType="submit">
              Війти
            </AppButton>
          </Form>
          <Space direction="vertical" size="large">
            <Typography.Text>
              Нема аккаунту? <Link to="/register">Зареєструйтесь</Link>
            </Typography.Text>
          </Space>
        </Card>
      </Row>
    </Layout>
  );
};
