// src/hooks/useCreateModuleProgress.ts
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateUserModuleProgressMutation, useGetAllUserModuleProgressQuery } from '../../../redux/services/progressApi';
import { ThemeContext } from '../../../hooks/ThemeProvider';
import { selectUser } from '../../../redux/slices/authSlice';

interface CreateModuleProgressParams {
  userId: string;
  moduleId: string;
  moduleName: string;
  progress: number;
}

const useCreateModuleProgress = (params: CreateModuleProgressParams) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [createUserModuleProgress] = useCreateUserModuleProgressMutation();
  const {
    data: allUserModuleProgresses,
    isLoading: isAllUserModuleProgressesLoading,
    isError: isAllUserModuleProgressesError,
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