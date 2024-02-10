import React from "react";
import { Button, Card, List, Flex } from "antd";
import { useGetAllModulesQuery } from "../../redux/services/modules";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader";

const Dashboard: React.FC = () => {
  const { data: modulesData, isLoading, isError } = useGetAllModulesQuery();
  const navigate = useNavigate();

  const handleStartClick = (moduleId: string) => {
    console.log("moduleId:", moduleId);
    navigate(`/module/${moduleId}/exercises`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>Error loading modules.</div>;
  }

  return (
    <Card title="Твої модулі" bordered={false} style={{ width: "100%" }}>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
        dataSource={modulesData}
        renderItem={(item) => (
          <List.Item key={item._id}>
            <Card style={{ textAlign: "center" }} title={item.name}>
              <Flex justify="center" align="center" vertical gap={10}>
                <div>{item.exercises.length} вправ</div>
                <Button onClick={() => handleStartClick(item._id)} size="small">
                  Почати
                </Button>
              </Flex>
            </Card>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Dashboard;
