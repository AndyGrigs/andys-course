// Import necessary hooks and components at the top of OneModulePage.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentModule } from "../../../redux/slices/moduleSlice";
import { Button, Card, Flex, List } from "antd";

const OneModulePage: React.FC = () => {
  const currentModule = useSelector(selectCurrentModule);
  const navigate = useNavigate();

  return (
    <Flex align="center">
      <Card
        title=""
        bordered={false}
        style={{ width: "60%", margin: "0 auto" }}
      >
        <Card
        >
          <List
            size="small"
            dataSource={[
              {
                title: "Text",
                link: `/modules/${currentModule?._id}/text`,
              },
              {
                title: "Vocabular",
                link: `/modules/${currentModule?._id}/vocabulary`,
              },
              {
                title: "Übungen",
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
    </Flex>
  );
};

export default OneModulePage;
