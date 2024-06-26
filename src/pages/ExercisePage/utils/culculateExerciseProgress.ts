import { useSelector } from 'react-redux';
import { setExerciseProgress } from '../../../redux/slices/userProgress/userProgressSlice';
import { selectCurrentExercise } from '../../../redux/slices/exerciseSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { AppDispatch } from '../../../redux/store';
import { updateLokalUserExerciseProgress } from '../../../redux/slices/authSlice';

interface UserResults {
    [taskId: string]: boolean;
}

export const useCalculateExerciseProgress = ({ userResults }: { userResults: UserResults }) => {
    const currentExercise = useSelector(selectCurrentExercise);

    const dispatch: AppDispatch = useDispatch();


    useEffect(() => {
        if (currentExercise) {
            const totalTasks = currentExercise.tasks.length;
            const completedTasks = Object.keys(userResults).length;
            // const progress = Math.floor((completedTasks / totalTasks) * 100);
            const progress = Math.min(Math.floor((completedTasks / totalTasks) * 100), 100);

            dispatch(setExerciseProgress(progress))
            const exerciseId = currentExercise._id;

            dispatch(updateLokalUserExerciseProgress({ exerciseId, progress }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentExercise, userResults]);
}
