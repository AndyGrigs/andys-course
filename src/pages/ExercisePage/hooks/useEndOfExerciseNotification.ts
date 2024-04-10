// useEndOfExerciseNotification.ts
import { useEffect } from 'react';

export const useEndOfExerciseNotification = (isEndOfExercise: boolean) => {
    useEffect(() => {
        if (isEndOfExercise) {
            console.log('Das Ende der Übung wurde erreicht.');
        }
    }, [isEndOfExercise]);
};