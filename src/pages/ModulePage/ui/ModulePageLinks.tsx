import React, { useContext, useState } from "react";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Card, List, Button } from "antd";
import { useGetAllModulesQuery } from "../../../redux/services/modules";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/authSlice";
import { Loader } from "../../../components/Loader";
import { ThemeContext } from "../../../hooks/ThemeProvider";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { setCurrentModule } from "../../../redux/slices/moduleSlice";
import { useDispatch } from "react-redux";
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
    const currentModule = modules?.find((module) => module._id === moduleId);
    dispatch(setCurrentModule(currentModule));
    createModuleProgress(
      user?._id || "",
      currentModule?._id || "",
      currentModule?.name || "",
      progress
    );
  };





  return (
   <>
   {/* <div style={{ padding: "20px" }}>
      <Menu items={items} />
      <h1>Modules</h1>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={modules}
        renderItem={(module) => (
          <List.Item>
            <Card title={module.name}>
              <p><strong>Module Grammar:</strong> {module.moduleGrammar.length > 0 ? module.moduleGrammar.join(", ") : "None"}</p>
              <p><strong>Videos:</strong> {module.videos.length}</p>
              <p><strong>Text:</strong> {module.text ? "Available" : "None"}</p>
              <p><strong>Text Questions:</strong></p>
              <p><strong>Vocabulary:</strong> {module.vocabulary.length}</p>
              <p><strong>Articles Exercises:</strong></p>
              <p><strong>Exercises:</strong> {module.exercises.length}</p>
              <Button type="primary" onClick={() => handleStartClick(module._id, module.name)}>
                Start Module
              </Button>
            </Card>
          </List.Item>
        )}
      />
    </div> */}
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
                    link: `/modules/${module._id}/text`,
                  },
                  {
                    title: "Vocabulary",
                    link: `/modules/${module._id}/vocabulary`,
                  },
                  {
                    title: "Exercises",
                    link: `/modules/${module._id}/exercises`,
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
    <Outlet/>
   </>
  );
};

export default ModulePage;
