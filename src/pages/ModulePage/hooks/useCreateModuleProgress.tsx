// src/hooks/useCreateModuleProgress.ts
import {  useSelector } from 'react-redux';
import { useCreateUserModuleProgressMutation, useGetAllUserModuleProgressQuery } from '../../../redux/services/progressApi';
import { selectUser } from '../../../redux/slices/authSlice';

interface CreateModuleProgressParams {
  userId: string;
  moduleId: string;
  moduleName: string;
  progress: number;
}

const useCreateModuleProgress = (_params: CreateModuleProgressParams) => {
  const user = useSelector(selectUser);

  const [createUserModuleProgress] = useCreateUserModuleProgressMutation();
  const {
    data: allUserModuleProgresses,
   
  } = useGetAllUserModuleProgressQuery(user?._id ?? "");

  const createModuleProgress = async (params: CreateModuleProgressParams) => {
    const existingModuleProgress = allUserModuleProgresses?.find(
      (progress) => progress.moduleId === params.moduleId
    );
    if (existingModuleProgress) {
      console.log("Progress for this module already exists");
    } else {
      try {
        await createUserModuleProgress({
          userId: params.userId,
          moduleId: params.moduleId,
          moduleName: params.moduleName,
          progress: params.progress,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return createModuleProgress;
};

export default useCreateModuleProgress;