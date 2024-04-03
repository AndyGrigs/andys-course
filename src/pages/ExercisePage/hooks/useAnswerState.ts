import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAnswerValue } from '../../../redux/slices/answerValueSlice';

interface UseAnswerState {
    answerValue: Record<string, string[]>;
    handleInputChange: (taskId: string, partIndex: number, value: string) => void;
    allInputsEmpty: boolean;
}



export const useAnswerState = (): UseAnswerState => {
    const dispatch = useDispatch();
    const [answerValue, setAnswerValueState] = useState<Record<string, string[]>>({});
    const allInputsEmpty = Object.values(answerValue).every(values => values.every(value => value.trim() === ''));

    const handleInputChange = useCallback((taskId: string, partIndex: number, value: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        dispatch(setAnswerValue((prevState) => {
            const updatedAnswers = { ...prevState };
            if (!updatedAnswers[taskId]) {
                updatedAnswers[taskId] = [];
            }
            const trimmedValue = typeof value === 'string' ? value.trim() : '';
            updatedAnswers[taskId][partIndex] = trimmedValue;

            return updatedAnswers;
        }));
    }, [dispatch]); // Include dispatch in the dependency array


    return {
        answerValue,
        handleInputChange,
        allInputsEmpty,
    };
}
