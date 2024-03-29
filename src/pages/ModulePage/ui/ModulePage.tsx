import React from "react";
import { Button, Card, List, Flex, Progress } from "antd";
import { useGetAllModulesQuery } from "../../../redux/services/modules";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../components/Loader";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { setCurrentModule } from "../../../redux/slices/moduleSlice";
import { useCreateUserModuleProgressMutation } from "../../../redux/services/progressApi";

const ModulePage: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const {
    data: modulesData,
    isLoading: isModulesLoading,
    isError: isModulesError,
  } = useGetAllModulesQuery();

  const [createUserModuleProgress] = useCreateUserModuleProgressMutation();

  const navigate = useNavigate();
  /*
  const handleCreateUserModuleProgress = async (moduleId: string) => {
    try {
      const localStorageProgress = localStorage.getItem(`moduleProgress_${moduleId}`);
      if (localStorageProgress) {
        // If the progress exists in the local storage, parse it and use it
        const existingProgress = JSON.parse(localStorageProgress);
        console.log("Progress found in local storage:", existingProgress);
        // Here you can use the existingProgress as needed
        // For example, you might want to update the UI to reflect the existing progress
      }


      const existingProgress = user?.moduleProgress.find((progress) => {
        progress.moduleId === moduleId;
      });

      if (!existingProgress) {
        const result = await createUserModuleProgress({
          userId: user?._id, // Replace with actual user ID
          progress: {
            moduleId: moduleId,
            moduleNumber: 1,
            progress: 0,
            completed: "false",
          },
        }).unwrap();
        console.log("Success:", result);
      } else {
        // For example, to update the progress, you would use a similar mutation but targeting the existing progress ID
        console.log("Progress already exists for this module.");
      }
    } catch (error) {
      console.error("Failed:", error);
    }
  };
*/
  const handleCreateUserModuleProgress = async (moduleId: string) => {
    try {
      // Check if the progress for the module exists in the local storage
      const localStorageProgress = localStorage.getItem(
        `moduleProgress_${moduleId}`
      );
      if (localStorageProgress) {
        // If the progress exists in the local storage, parse it and use it
        const existingProgress = JSON.parse(localStorageProgress);
        console.log(
          "Progress module found in local storage:",
          existingProgress
        );
        // Here you can use the existingProgress as needed
        // For example, you might want to update the UI to reflect the existing progress
      } else {
        // If the progress does not exist in the local storage, find it in the user's moduleProgress
        const existingProgress = user?.moduleProgress.find((progress) => {
          return progress.moduleId === moduleId;
        });

        if (!existingProgress) {
          // If the progress does not exist in the database, create a new object
          const result = await createUserModuleProgress({
            userId: user?._id,
            progress: {
              moduleId: moduleId,
              moduleNumber: 1,
              progress: 0,
              completed: "false",
            },
          }).unwrap();
          console.log("Success:", result);

          // Store the new progress in the local storage
          localStorage.setItem(
            `moduleProgress_${moduleId}`,
            JSON.stringify(result.progress)
          );
        } else {
          // If the progress exists in the database, store it in the local storage
          localStorage.setItem(
            `moduleProgress_${moduleId}`,
            JSON.stringify(existingProgress.progress)
          );
        }
      }
    } catch (error) {
      console.error("Failed:", error);
    }
  };

  const handleStartClick = (moduleId: string) => {
    const currentModule = modulesData?.find((module) => module._id);
    handleCreateUserModuleProgress(currentModule?._id || "");
    dispatch(setCurrentModule(currentModule));
    navigate(`/module/${moduleId}/exercises`);
  };

  if (isModulesLoading) {
    return <Loader />;
  }

  if (isModulesError) {
    return <div>Error loading Modules...</div>;
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

export default ModulePage;
