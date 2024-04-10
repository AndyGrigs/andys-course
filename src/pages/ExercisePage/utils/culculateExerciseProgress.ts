import { useSelector } from 'react-redux';
import { setExerciseProgress } from '../../../redux/slices/userProgress/userProgressSlice';
import { selectCurrentExercise } from '../../../redux/slices/exerciseSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch } from '../../../redux/store';
import { selectUser, updateLokalUserExerciseProgress } from '../../../redux/slices/authSlice';

interface UserResults {
    [taskId: string]: boolean;
}

export const useCalculateExerciseProgress = ({ userResults }: { userResults: UserResults }) => {
    const user = useSelector(selectUser)
    const currentExercise = useSelector(selectCurrentExercise);

    const dispatch: AppDispatch = useDispatch();





    useEffect(() => {
        if (currentExercise) {
            const totalTasks = currentExercise.tasks.length;
            const completedTasks = Object.keys(userResults).length;
            const progress = Math.floor((completedTasks / totalTasks) * 100);

            // const data = {
            //     userId: user?._id || '', // Provide an empty string as a default value
            //     exerciseId: currentExercise?._id as string || '',
            //     progress
            // };
            // updateUserExerciseProgress(data)
            //відправка в бд
            dispatch(setExerciseProgress(progress))
            const exerciseId = currentExercise._id;
            // const userId = user?._id;
            dispatch(updateLokalUserExerciseProgress({ exerciseId, progress }))
        } else {
            dispatch(setExerciseProgress(0));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentExercise, userResults]);
}
