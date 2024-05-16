import { useCallback, useState } from "react";
import { IExerciseResponse } from "../../../types";
import { useUpdateUserPointsMutation } from "../../../redux/services/pointsApi";
import { useSelector } from "react-redux";
import { selectUser, updateLokalUserPoints } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

interface UpdatePointsPayload {
    userId: string;
    points: number;
  }

function compareAnswer(userAnswer: string, solution: string): boolean {
  return userAnswer === solution;
}

const useCheckAnswer = () => {
  const [userResults, setUserResults] = useState({});
  const [updatePoints] = useUpdateUserPointsMutation();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const concatAnswerValue = useCallback(
    (taskId: string, obj: { [key: string]: string[] }) => {
      if (!obj[taskId]) return " ";
      return obj[taskId].join("");
    },
    []
  );

  function checkAnswer(
    taskId: string,
    taskIndex: number,
    answerValue: { [key: string]: string[] },
    exercise: IExerciseResponse
  ) {
    const task = exercise.tasks.find((t) => t._id === taskId);
    console.log(answerValue);
    if (!task) {
      console.error("Task not found");

      return;
    }

    const isCorrect = compareAnswer(
      concatAnswerValue(taskId, answerValue).replace(/\s/g, "").toLowerCase(),
      task.solution[0].replace(/\s/g, "").toLowerCase()
    );

    if (isCorrect && user) {
      let points: number = user.points;
      points+=1;
      const payload: UpdatePointsPayload = {
        userId: user._id, 
        points: points,
      };
      dispatch(updateLokalUserPoints(payload))
      try {
        updatePoints({ userId: user?._id, points });
      } catch (error) {
        console.log(error);
      }
    
    }

    setUserResults((prevResults) => ({
      ...prevResults,
      [taskIndex]: isCorrect,
    }));

    return isCorrect;
  }
  return { userResults, checkAnswer };
};

export default useCheckAnswer;
