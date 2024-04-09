import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { useAppSelector } from '../../../redux/slices/reduxHooks';
import { selectUser } from '../../../redux/slices/authSlice';
import { selectUserExerciseProgress } from '../../../redux/slices/userProgress/userProgressSlice';
import { useUpdateUserExerciseProgressMutation } from '../../../redux/services/progressApi';
import { useEffect, useMemo } from 'react';


export const useSendProgress = () => {
    const user = useAppSelector(selectUser);
    const progress = useAppSelector(selectUserExerciseProgress);

    const userAndProgress = useMemo(() => ({ user, progress }), [user, progress]);
    // Extract the mutation trigger function and state object
    const [triggerMutation, { data, error, isLoading }] = useUpdateUserExerciseProgressMutation();

    useEffect(() => {
        if (userAndProgress.user?._id && userAndProgress.progress) {
            triggerMutation({ userId: user?._id ?? '', progress })
                .unwrap()
                .then((result) => {
                    console.log(result);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [user, userAndProgress.progress, triggerMutation]);

    // You can return isLoading, error, or data as needed
    return { isLoading, error, data };
};
