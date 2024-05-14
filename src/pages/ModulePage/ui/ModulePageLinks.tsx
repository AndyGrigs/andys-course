import React, { useContext } from "react";
import { Card, List, Button } from "antd";
import { useGetAllModulesQuery } from "../../../redux/services/modules";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/authSlice";
import { Loader } from "../../../components/Loader";
import { ThemeContext } from "../../../hooks/ThemeProvider";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentModule } from "../../../redux/slices/moduleSlice";
import { useDispatch } from "react-redux";
// import useCreateModuleProgress from "../hooks/useCreateModuleProgress";
import {
  useCreateUserModuleProgressMutation,
  useGetAllUserModuleProgressQuery,
} from "../../../redux/services/progressApi";

const ModulePage: React.FC = () => {
  const { data: modules, isLoading, isError } = useGetAllModulesQuery();
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  // const createModuleProgress = useCreateModuleProgress();
  const [createUserModuleProgress] = useCreateUserModuleProgressMutation();
  const {
    data: allUserModuleProgresses,
    isLoading: isAllUserModuleProgressesLoading,
    isError: isAllUserModuleProgressesError,
  } = useGetAllUserModuleProgressQuery(user?._id ?? "");
  const progress = 0;

  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading Modules...</div>;

  const createModuleProgress = async (
    userId: string,
    moduleId: string,
    moduleName: string,
    progress: number
  ) => {
    const existingModuleProgress = allUserModuleProgresses?.find(
      (progress) => progress.moduleId === moduleId
    );
    if (existingModuleProgress) {
      console.log("Progress for this module already exists");
    } else {
      try {
        await createUserModuleProgress({
          userId,
          moduleId,
          moduleName,
          progress,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleStartClick = (moduleId: string, moduleName: string) => {
    const currentModule = modules?.find((module) => module._id);
    // handleCreateUserModuleProgress(currentModule?._id || "", currentModule?.name || '');
    dispatch(setCurrentModule(currentModule));
    createModuleProgress(
      user?._id || "",
      currentModule?._id || "",
      currentModule?.name || "",
      progress
    );
  };

  return (
    <Card
      className={theme === "dark" ? "card-dark" : "card-light"}
      title="Твої модулі"
      bordered={false}
      style={{ width: "100%" }}
    >
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3 }}
        dataSource={modules}
        renderItem={(module) => (
          <List.Item key={module._id}>
            <Card
              style={theme === "dark" ? { background: "#5a7cbb" } : {}}
              title={module.name}
            >
              <List
                size="small"
                dataSource={[
                  //   { title: "Videos", link: `/modules/${module._id.$oid}/videos` },
                  {
                    title: "Text Content",
                    link: `/module/${module._id}/text`,
                  },
                  {
                    title: "Vocabulary",
                    link: `/module/${module._id}/vocabulary`,
                  },
                  {
                    title: "Exercises",
                    link: `/module/${module._id}/exercises`,
                  },
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <Button
                      onClick={() => {
                        handleStartClick(module._id, module.name);
                        navigate(item.link); // Use navigate to programmatically navigate to the link
                      }}
                      type="text"
                    >
                      {item.title}
                    </Button>
                  </List.Item>
                )}
              />
            </Card>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ModulePage;
