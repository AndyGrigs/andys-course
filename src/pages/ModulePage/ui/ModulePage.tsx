import React, { useEffect } from "react";
import { Button, Card, List, Flex, Progress } from "antd";
import { useGetAllModulesQuery } from "../../../redux/services/modules";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../../components/Loader";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { setCurrentModule } from "../../../redux/slices/moduleSlice";
import { useCreateUserModuleProgressMutation, useGetAllUserModuleProgressQuery } from "../../../redux/services/progressApi";
import { setModuleProgress } from '../../../redux/slices/userProgress/userProgressSlice';

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

  const { data: allUserModuleProgresses, isLoading: isAllUserModuleProgressesLoading, isError: isAllUserModuleProgressesError } = useGetAllUserModuleProgressQuery(user?._id ?? '');
  // Correct usage of a custom hoo
  // Ensure this is called at the top level of a component or another custom hook



  const createModuleProgress = async (userId: string, moduleId: string, moduleName: string, progress: number) => {
    const existingModuleProgress = allUserModuleProgresses?.find(progress => progress.moduleId === moduleId)
    if (existingModuleProgress) {
      console.log('Progress for this module already exists')
    } else {
      try {
        await createUserModuleProgress({ userId, moduleId, moduleName, progress })
      } catch (error) {
        console.log(error)
      }

    }

  }

  // const handleCreateUserModuleProgress = async (moduleId: string, moduleName: string) => {
  //   try {
  //     const existingProgress = user?.moduleProgress.find((progress) => {
  //       dispatch(setModuleProgress(progress.progress))
  //       return progress.moduleId === moduleId;
  //     });

  //     if (!existingProgress) {
  //       const result = await createUserModuleProgress({
  //         userId: user?._id ?? '',
  //         progress: {
  //           moduleId: moduleId,
  //           moduleName: moduleName,
  //           progress: 0,
  //         },
  //       }).unwrap();
  //       console.log("Success:", result);
  //       dispatch(setModuleProgress(result.progress))
  //     } else {
  //       console.log("Progress already exists for this module.");
  //     }
  //   } catch (error) {
  //     console.error("Failed:", error);
  //   }
  // };
  const progress = 0;
  //useCalculateModuleProgress()

  const handleStartClick = (moduleId: string) => {
    const currentModule = modulesData?.find((module) => module._id);
    // handleCreateUserModuleProgress(currentModule?._id || "", currentModule?.name || '');
    dispatch(setCurrentModule(currentModule));
    createModuleProgress(user?._id || '', currentModule?._id || '', currentModule?.name || '', progress)
    console.log(user?._id || '', currentModule?._id || '', currentModule?.name || '', progress)
    navigate(`/module/${moduleId}/exercises`);
  };

  if (isModulesLoading || isAllUserModuleProgressesLoading) {
    return <Loader />;
  }

  if (isModulesError || isAllUserModuleProgressesError) {
    return <div>Error loading Modules...</div>;
  }

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

          const moduleProgress = allUserModuleProgresses?.find(
            (progress: { moduleId: string; }) => progress.moduleId === module._id
          );

          // Calculate the progress percentage
          const progressPercentage = moduleProgress?.progress
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
