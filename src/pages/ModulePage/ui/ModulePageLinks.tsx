import React from "react";
import { useGetAllModulesQuery } from "../../../redux/services/modules";
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/slices/authSlice";
import { Loader } from "../../../components/Loader";
import { Outlet, useNavigate } from "react-router-dom";
import { setCurrentModule } from "../../../redux/slices/moduleSlice";
import { useDispatch } from "react-redux";
import {
  useCreateUserModuleProgressMutation,
  useGetAllUserModuleProgressQuery,
} from "../../../redux/services/progressApi";
import { AppCard } from '../../../components/ui/AppCard/ui/AppCard';

const ModulePage: React.FC = () => {
  const { data: modules, isLoading, isError } = useGetAllModulesQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [createUserModuleProgress] = useCreateUserModuleProgressMutation();
  const { data: allUserModuleProgresses } = useGetAllUserModuleProgressQuery(
    user?._id ?? ""
  );

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

  const handleModuleLinkClick = (moduleId: string) => {
    const currentModule = modules?.find((module) => module._id === moduleId);
    dispatch(setCurrentModule(currentModule));
    createModuleProgress(
      user?._id || "",
      currentModule?._id || "",
      currentModule?.name || "",
      progress
    );
    navigate(`/modules/${moduleId}`);
  };

  return (
    <>
    <section>
      {modules?.map(module => (

           <AppCard
           key={module._id}
           title={module.name}
           description=''
           buttonText="Почати"
           buttonOnClick={() => {
             handleModuleLinkClick(module._id)
           }}
        />
    
      ))}
    </section>
      <Outlet />
    </>
  );
};

export default ModulePage;
