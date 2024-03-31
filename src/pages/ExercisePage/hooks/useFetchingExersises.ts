import { useGetOneExercisesQuery } from '../../../redux/services/exersiceApi';


export const useFetchingExercises = (exerciseId: string) => {
    const {
        data: exercise,
        isLoading,
        isError,
    } = useGetOneExercisesQuery(exerciseId);

    return [exercise, isLoading, isError]
};