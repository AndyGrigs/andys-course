import { useCallback, useState } from 'react';

interface UseAnswerState {
    answerValue: Record<string, string[]>;
    handleInputChange: (taskId: string, partIndex: number, value: string) => void;
    allInputsEmpty: boolean;
}



export const useAnswerState = (): UseAnswerState => {
    const [answerValue, setAnswerValue] = useState<Record<string, string[]>>({});
    const getAnswerValue = () => {
        return answerValue;
    }
    // const handleInputChange = (taskId: string, partIndex: number, value: string) => {
    //     setAnswerValue(prevState => {
    //         const updatedAnswers = { ...prevState };
    //         if (!updatedAnswers[taskId]) {
    //             updatedAnswers[taskId] = [];
    //         }
    //         const trimmedValue = typeof value === 'string' ? value.trim() : '';
    //         updatedAnswers[taskId][partIndex] = trimmedValue;
    //         return updatedAnswers;
    //     });
    // };



    const handleInputChange = useCallback((taskId: string, partIndex: number, value: string) => {
        setAnswerValue(prevState => {
            const updatedAnswers = { ...prevState };
            if (!updatedAnswers[taskId]) {
                updatedAnswers[taskId] = [];
            }
            const trimmedValue = typeof value === 'string' ? value.trim() : '';
            updatedAnswers[taskId][partIndex] = trimmedValue;
            return updatedAnswers;
        });
    }, []);

    const allInputsEmpty = Object.values(answerValue).every(answers =>
        answers.every(answer => answer.trim() === "")
    );

    return { answerValue, handleInputChange, allInputsEmpty };
}