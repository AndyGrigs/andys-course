// Import necessary hooks and components at the top of OneModulePage.tsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentModule } from "../../../redux/slices/moduleSlice";
import { ThemeContext } from "../../../app/providers/ThemeAntdProvider";
import { Button, Card, Flex, List } from "antd";

const OneModulePage: React.FC = () => {
  const currentModule = useSelector(selectCurrentModule);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <Flex align="center">
      <Card
        className={theme === "dark" ? "card-dark" : "card-light"}
        title=""
        bordered={false}
        style={{ width: "60%", margin: "0 auto" }}
      >
        <Card
          style={theme === "dark" ? { background: "#5a7cbb" } : {}}
          title={currentModule?.name}
        >
          <List
            size="small"
            dataSource={[
              //   { title: "Videos", link: `/modules/${module._id.$oid}/videos` },
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
