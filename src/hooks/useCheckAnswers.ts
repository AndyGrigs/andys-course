import { useCallback, useState } from 'react';
import { IExerciseResponse } from '../types';


function compareAnswer(userAnswer: string, solution: string): boolean {
    return userAnswer === solution;
}


const useCheckAnswer = () => {
    const [userResults, setUserResults] = useState({});

    const concatAnswerValue = useCallback((taskId: string, obj: { [key: string]: string[] }) => {
        if (!obj[taskId]) return " ";
        return obj[taskId].join("")
    }, []);


    function checkAnswer(taskId: string, taskIndex: number, answerValue: { [key: string]: string[]; }, exercise: IExerciseResponse) {
        const task = exercise.tasks.find((t) => t._id === taskId);

        if (!task) {
            console.error("Task not found");

            return;
        }

        const isCorrect = compareAnswer(
            concatAnswerValue(taskId, answerValue),
            task.solution[0].replace(/\s/g, "")
        );

        setUserResults((prevResults) => ({
            ...prevResults,
            [taskIndex]: isCorrect,
        }));

        console.log(
            `Answer for task ${taskId} is ${isCorrect ? "correct" : "incorrect"}`
        );
    }
    return { userResults, checkAnswer }
};

export default useCheckAnswer;
