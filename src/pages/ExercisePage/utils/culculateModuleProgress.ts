import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/slices/authSlice';
import { selectCurrentModule } from '../../../redux/slices/moduleSlice';
import { useGetAllUserExerciseProgressQuery } from '../../../redux/services/progressApi';

export interface IModuleProgress {
    moduleProgressPercentage: number;
}

export const useCalculateModuleProgress = (): IModuleProgress | 0 => {
    const user = useSelector(selectUser);
    const currentModule = useSelector(selectCurrentModule);
    const { data: allExerciseProgress, isError } = useGetAllUserExerciseProgressQuery(user?._id)

    // Handle error
    if (isError) {
        console.error('Error fetching exercise progress');
        return 0; // Return 0 or any default value in case of error
    }

    // Ensure allExerciseProgress is an array and currentModule is not null
    if (!Array.isArray(allExerciseProgress) || !currentModule) {
        return 0; // Return 0 or any default value if data is not available
    }

    const completedExercises = allExerciseProgress?.filter(exercise => exercise.progress === 100) || [];
    const moduleProgressPercentage = currentModule
        ? Math.floor((completedExercises.length / currentModule.exercises.length) * 100)
        : 0;

    return { moduleProgressPercentage };
}
