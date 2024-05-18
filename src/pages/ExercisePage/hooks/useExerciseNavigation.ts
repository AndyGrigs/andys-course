// src/hooks/useExerciseNavigation.ts
import { useNavigate } from 'react-router-dom';
import { setExerciseProgress } from '../../../redux/slices/userProgress/userProgressSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateLokalUserExerciseProgress } from '../../../redux/slices/authSlice';
import { useUpdateUserExerciseProgressMutation } from '../../../redux/services/progressApi';
import { selectCurrentExercise } from '../../../redux/slices/exerciseSlice';
import { useState } from 'react';


const useExerciseNavigation = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const user = useSelector(selectUser);
   const [updateUserExerciseProgress] = useUpdateUserExerciseProgressMutation();
   const [isExecuting, setIsExecuting] = useState(false)
   const currentExercise = useSelector(selectCurrentExercise)

   // const handleRepeatExercise = async (moduleId: string, exerciseId: string) => {
   //    // Prevent execution if already in progress
   //    if (isExecuting) return;
    
   //    setIsExecuting(true); // Assuming you have a state to track execution
    
   //    try {
   //      navigate(`/modules/${moduleId}/exercises/${exerciseId}`);
   //      dispatch(setExerciseProgress(0));
   //      dispatch(updateLokalUserExerciseProgress({ exerciseId, progress: 0 }));
    
   //      const data = {
   //        userId: user?._id || '',
   //        exerciseId,
   //        progress: 0,
   //        answers: {},
   //      };
    
   //      // Retry logic can be implemented here if necessary
   //      await updateUserExerciseProgress(data);
   //    } catch (error) {
   //      console.error("Error updating user progress:", error);
   //      // Handle specific error cases or implement retry logic
   //    } finally {
   //      setIsExecuting(false); // Reset execution state
   //    }
   //  };


   // const handleRepeatExercise = async (moduleId: string, exerciseId: string) => {
   //    navigate(`/modules/${moduleId}/exercises/${exerciseId}`);
   //    dispatch(setExerciseProgress(0))
   //    dispatch(updateLokalUserExerciseProgress({ exerciseId, progress: 0 }))
   //    try {
   //       const data = {
   //          userId: user?._id || '',
   //          exerciseId,
   //          progress: 0,
   //          answers: {}
   //       };
   //       await updateUserExerciseProgress(data)

   //    } catch (error) {
   //       console.error("Error updating user progress:", error);
   //    }
   // };

  

   const handleExerciseList = async (moduleId: string) => {

      navigate(`/modules/${moduleId}/exercises`);
      try {
         const finalResult = {
            userId: user?._id || '',
            exerciseId: currentExercise?._id as string || '',
            progress: 100,
            answers: {}
         };
         await updateUserExerciseProgress(finalResult)
      } catch (error) {
         console.log(error)
      }

   };

   return { handleExerciseList };
};

export default useExerciseNavigation;