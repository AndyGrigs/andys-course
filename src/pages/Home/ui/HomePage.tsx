import React from "react";
import { Layout, Typography } from "antd";
const { Content } = Layout;
const { Title, Paragraph } = Typography;

const HomePage: React.FC = () => {
  return (
    <Content style={{ padding: "0 50px", marginTop: 64 }}>
      <div
        className="site-layout-content"
        style={{ padding: 24, minHeight: 380 }}
      >
        <Title level={2}>Вивчайте німецьку легко та ефективно!</Title>
        <Paragraph>
          Наші курси допоможуть вам швидко освоїти німецьку мову. Отримайте
          доступ до різноманітних вправ, інтерактивних занять та підтримки від
          досвідчених викладачів.
        </Paragraph>
      </div>
    </Content>
  );
};

export default HomePage;
