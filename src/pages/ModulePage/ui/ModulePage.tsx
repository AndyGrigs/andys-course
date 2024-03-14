import React from "react";
import { Button, Card, List, Flex, Progress } from "antd";
import { useGetAllModulesQuery } from "../../../redux/services/modules";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../components/Loader";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/authSlice";

export const ModulePage: React.FC = () => {
  const user = useSelector(selectUser);

  const {
    data: modulesData,
    isLoading: isModulesLoading,
    isError: isModulesError,
  } = useGetAllModulesQuery();

  const navigate = useNavigate();

  // const calculateProgressPercentage = (moduleProgress) => {
  //   const totalExercises = module.exercises.length;
  //   const completedExercises = moduleProgress.completedExercises;
  //   return (completedExercises / totalExercises) * 100;
  // };
  console.log(user?.moduleProgress);
  const handleStartClick = (moduleId: string) => {
    navigate(`/module/${moduleId}/exercises`);
  };

  if (isModulesLoading) {
    return <Loader />;
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
        renderItem={(module) => {
          // Find the progress object for the current module
          const moduleProgress = user?.moduleProgress.find(
            (progress) => progress.moduleId === module._id
          );

          // Calculate the progress percentage
          const progressPercentage = moduleProgress
            ? moduleProgress.progress
            : 0;

          return (
            <List.Item key={module._id}>
              <Card style={{ textAlign: "center" }} title={module.name}>
                <Flex justify="center" align="center" vertical gap={10}>
                  <li key={module.name}>
                    <Progress
                      style={{ width: "120px" }}
                      percent={progressPercentage}
                      status="active"
                    />
                  </li>
                  <div>{module.exercises.length} вправ</div>
                  <Button
                    onClick={() => handleStartClick(module._id)}
                    size="small"
                  >
                    Почати
                  </Button>
                </Flex>
              </Card>
            </List.Item>
          );
        }}
      />
    </Card>
  );
};
