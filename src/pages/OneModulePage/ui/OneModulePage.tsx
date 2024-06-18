// Import necessary hooks and components at the top of OneModulePage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentModule } from "../../../redux/slices/moduleSlice";
import { Button, Card, List } from "antd";
import { Divider } from 'antd';
import Title from 'antd/es/typography/Title';

const OneModulePage: React.FC = () => {
  const currentModule = useSelector(selectCurrentModule);
  const navigate = useNavigate();

  return (
    <section>
      <Title level={5} style={{ maxWidth: '80%', margin: "0 auto" }}>🎯Читай і опрацюй текст. Потім переходь до вправ на вивчення слів та граматичних вправю</Title>
      <Divider />


        <Card
          title=""
          bordered={false}
          style={{ width: "40%", margin: "0 auto" }}
        >
          <Card
          >
            <List
              size="small"
              dataSource={[
                {
                  title: "1. Text",
                  link: `/modules/${currentModule?._id}/text`,
                },
                {
                  title: "2. Vocabular",
                  link: `/modules/${currentModule?._id}/vocabulary`,
                },
                {
                  title: "3. Übungen",
                  link: `/modules/${currentModule?._id}/exercises`,
                },
              ]}
              renderItem={(item) => (
                <List.Item>
                  <Button
                    onClick={() => {
                      navigate(item.link);
                    }}
                    type="text"
                  >
                    {item.title}
                  </Button>
                </List.Item>
              )}
            />
          </Card>
        </Card>
    
    </section>
  );
};

export default OneModulePage;
