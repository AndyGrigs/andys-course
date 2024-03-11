import React from "react";
import { Button, Card, List, Flex, Progress } from "antd";
import { useGetAllModulesQuery } from "../../../redux/services/modules";
import { useGetAllUserModuleProgressQuery } from "../../../redux/services/progressApi";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../components/Loader";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/authSlice";

export const ModulePage: React.FC = () => {
  const user = useSelector(selectUser);
  console.log(user);
  const {
    data: modulesData,
    isLoading: isModulesLoading,
    isError: isModulesError,
  } = useGetAllModulesQuery();

  const {
    data: userModuleProgress,
    isLoading: isProgressLoading,
    isError: isProgressError,
  } = useGetAllUserModuleProgressQuery(user?._id);
  const navigate = useNavigate();

  console.log(userModuleProgress);

  // const calculateProgressPercentage = (moduleProgress) => {
  //   const totalExercises = module.exercises.length;
  //   const completedExercises = moduleProgress.completedExercises;
  //   return (completedExercises / totalExercises) * 100;
  // };

  const handleStartClick = (moduleId: string) => {
    navigate(`/module/${moduleId}/exercises`);
  };

  if (isModulesLoading || isProgressLoading) {
    return <Loader />;
    if (isModulesError || isProgressError) {
      return <div>Error loading modules or progress.</div>;
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
          renderItem={(module) => (
            <List.Item key={module._id}>
              <Card style={{ textAlign: "center" }} title={module.name}>
                <Flex justify="center" align="center" vertical gap={10}>
                  <li key={module.name}>
                    {/* <Progress
                      style={{ width: "120px" }}
                      percent={calculateProgressPercentage(
                        userModuleProgress.find(
                          (progress) => progress.moduleId === module._id
                        )
                      )}
                      status="active"
                    /> */}
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
          )}
        />
      </Card>
    );
  }
};
