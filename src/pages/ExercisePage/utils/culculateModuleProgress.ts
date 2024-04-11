import { useSelector } from 'react-redux';
import { selectUser } from '../../../redux/slices/authSlice';
import { selectCurrentModule } from '../../../redux/slices/moduleSlice';


export const useCalculateModuleProgress = () => {
    const user = useSelector(selectUser);
    const currentModule = useSelector(selectCurrentModule);

    const completedExercises = user?.exerciseProgress?.filter(exercise => exercise.progress === 100) || [];

    const moduleProgress = currentModule
        ? Math.floor((completedExercises.length / currentModule.exercises.length) * 100)
        : 0;



    return { moduleProgress };
}
