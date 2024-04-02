import { useEffect } from 'react';
import { useGetOneExercisesQuery } from '../../../redux/services/exersiceApi';

const useExerciseFetching = (exerciseId: string) => {
    const { data: exercise, isLoading, isError } = useGetOneExercisesQuery(exerciseId);

    useEffect(() => {
        console.log("Exercise data:", exercise);
    }, [exercise]);

    return { exercise, isLoading, isError };
};

export default useExerciseFetching
