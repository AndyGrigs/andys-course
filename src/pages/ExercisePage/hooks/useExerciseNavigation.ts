// src/hooks/useExerciseNavigation.ts
import { useNavigate } from 'react-router-dom';
import { setExerciseProgress } from '../../../redux/slices/userProgress/userProgressSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateLokalUserExerciseProgress } from '../../../redux/slices/authSlice';
import { useUpdateUserExerciseProgressMutation } from '../../../redux/services/progressApi';
import { selectCurrentExercise } from '../../../redux/slices/exerciseSlice';
import { selectCurrentModule } from '../../../redux/slices/moduleSlice';


const useExerciseNavigation = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const user = useSelector(selectUser);
   const [updateUserExerciseProgress] = useUpdateUserExerciseProgressMutation();
   const currentExercise = useSelector(selectCurrentExercise)
   const currentModule = useSelector(selectCurrentModule)




   const handleRepeatExercise = async (moduleId: string, exerciseId: string) => {
      navigate(`/module/${moduleId}/exercises/${exerciseId}`);
      dispatch(setExerciseProgress(0))
      dispatch(updateLokalUserExerciseProgress({ exerciseId, progress: 0 }))
      try {
         const data = {
            userId: user?._id || '',
            exerciseId,
            progress: 0
         };
         await updateUserExerciseProgress(data)

      } catch (error) {
         console.error("Error updating user progress:", error);
      }
   };

   const handleExerciseList = async (moduleId: string) => {

      navigate(`/module/${moduleId}/exercises`);
      try {
         const finalResult = {
            userId: user?._id || '',
            exerciseId: currentExercise?._id as string || '',
            progress: 100
         };
         await updateUserExerciseProgress(finalResult)
      } catch (error) {
         console.log(error)
      }

   };

   return { handleRepeatExercise, handleExerciseList };
};

export default useExerciseNavigation;