import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../../../components/Loader";
import { useCallback, useEffect, useState } from "react";
import { useGetOneExercisesQuery } from "../../../redux/services/exersiceApi";
import { InputRef } from "antd/lib/input";
import { selectUserExerciseProgress } from "../../../redux/slices/userProgress/userProgressSlice";
import useCheckAnswer from "../hooks/useCheckAnswers";
import { useCalculateExerciseProgress } from "../utils/culculateExerciseProgress";
import { useUpdateUserExerciseProgressMutation } from "../../../redux/services/progressApi";
import { selectUser } from "../../../redux/slices/authSlice";
import { useAppSelector } from "../../../redux/slices/reduxHooks";
import ResultsModal from "./ResultsModal";
import useExerciseNavigation from "../hooks/useExerciseNavigation";
import { selectCurrentModule } from "../../../redux/slices/moduleSlice";
import {
  IModuleProgress,
  useCalculateModuleProgress,
} from "../utils/culculateModuleProgress";
import ResultMessage from "../pageElemnts/ResultMessage";
import ExerciseHeader from "./ExerciseHeader";
import TaskInputs from "./TaskInputs";
import ExerciseActions from "./ExerciseActions";

const ExerciseDetailsPage = () => {
  const inputRef = useRef<InputRef>(null);
  const user = useAppSelector(selectUser);
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const { checkAnswer, userResults } = useCheckAnswer();

  const [answerValue, setAnswerValue] = useState<{ [key: string]: string[] }>({});
  const [_, setFunctionsCalled] = useState(false);
  const [isModaResultlVisible, setIsModalResultVisible] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [resultMessage, setResultMessage] = useState("");
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const {
    data: exercise,
    isLoading,
    isError,
  } = useGetOneExercisesQuery(exerciseId);

  const [progressPercent, setProgressPercent] = useState(0);

  const progress = useAppSelector(selectUserExerciseProgress);
  const currentModule = useAppSelector(selectCurrentModule);
  const [updateUserExerciseProgress] = useUpdateUserExerciseProgressMutation();
  const { handleExerciseList } = useExerciseNavigation();
  useCalculateModuleProgress() as IModuleProgress;

  const totalTasks = exercise?.tasks.length || 0;

  const handleCloseModal = () => setIsModalResultVisible(false);

  const handleFinalProgress = useCallback(async () => {
    try {
      await updateUserExerciseProgress({
        userId: user?._id || "",
        exerciseId: exercise?._id ? String(exercise._id) : "",
        answers: userResults,
        progress: 100,
      });
    } catch (error) {
      console.log(error);
    }
  }, [user?._id, exercise?._id, userResults, updateUserExerciseProgress]);

  useEffect(() => {
    setFunctionsCalled(false);
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (exercise) {
      const percent = (currentTaskIndex / exercise.tasks.length) * 100;
      setProgressPercent(percent);
    }
  }, [currentTaskIndex, exercise]);

  useCalculateExerciseProgress({ userResults });

  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      taskId: string,
      partIndex: number
    ) => {
      setAnswerValue((prevState) => {
        const updatedAnswers = { ...prevState };
        if (!updatedAnswers[taskId]) {
          updatedAnswers[taskId] = [];
        }
        updatedAnswers[taskId][partIndex] = e.target.value;
        return updatedAnswers;
      });
    },
    []
  );

  const handleAddProgress = async () => {
    try {
      await updateUserExerciseProgress({
        userId: user?._id || "",
        exerciseId: (exercise?._id as string) || "",
        progress,
        answers: userResults,
      });
    } catch (error) {
      console.error("Error updating user progress:", error);
    }
  };

  const handleCheckAnswer = () => {
    if (!exercise) {
      setResultMessage("Exercise not loaded");
      return;
    }
    const isCorrect = checkAnswer(
      currentTask._id,
      currentTaskIndex,
      answerValue,
      exercise
    );
    setResultMessage(isCorrect ? "Correct!" : "Incorrect. Try again.");
    setIsAnswerChecked(false);
  };

  const clearResultMessage = () => {
    setResultMessage("");
    handleAddProgress();
  };

  const goToNextTask = () => {
    if (!exercise) {
      console.log("Exercise is not defined");
      return;
    }
    if (!isAnswerChecked) {
      handleCheckAnswer();
      setIsAnswerChecked(true);
    } else {
      clearResultMessage();
      setCurrentTaskIndex((i) => (i + 1) % exercise.tasks.length);
      if (currentTaskIndex === totalTasks - 1) {
        handleFinalProgress();
        setIsModalResultVisible(true);
      }
      setIsAnswerChecked(false);
    }
  };

  if (isLoading) return <Loader />;
  if (isError || !exercise) return <div>Error loading exercise</div>;

  const currentTask = exercise.tasks[currentTaskIndex];
  const parts = currentTask.content.split("{{input}}");
  const allInputsEmpty = Object.values(answerValue[currentTask._id] || []).every(
    (answer) => answer.trim() === ""
  );
  const isShortExercise = currentTask.solution[0].length < 15;

  return (
    <div style={{ textAlign: "center" }}>
      <ExerciseHeader
        exerciseNumber={exercise.number}
        instruction={exercise.instruction}
        example={exercise.example}
        progressPercent={progressPercent}
      />

      <TaskInputs
        parts={parts}
        isShortExercise={isShortExercise}
        answerValue={answerValue}
        currentTaskId={currentTask._id}
        inputRef={inputRef}
        onInputChange={handleInputChange}
      />

      <ResultMessage
        resultMessage={resultMessage}
        correctAnswer={currentTask.solution}
      />

      <ResultsModal
        visible={isModaResultlVisible}
        onClose={handleCloseModal}
        userResults={userResults}
        onHandleExerciseList={() => {
          if (currentModule?._id) {
            handleExerciseList(currentModule._id);
          } else {
            console.error("Module ID is not available");
          }
        }}
      />

      <ExerciseActions
        image={currentTask.image}
        allInputsEmpty={allInputsEmpty}
        isAnswerChecked={isAnswerChecked}
        onNext={goToNextTask}
      />
    </div>
  );
};

const MemoizedExerciseDetailsPage = React.memo(ExerciseDetailsPage);
export default MemoizedExerciseDetailsPage;
