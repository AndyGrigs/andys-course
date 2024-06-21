import React, { useRef } from "react";
import { Button, Col, Flex, Typography, Divider, Image } from "antd";
const { Title, Paragraph } = Typography;
import { useParams } from "react-router-dom";
import { Loader } from "../../../components/Loader";
import { useCallback, useEffect, useState } from "react";
import { useGetOneExercisesQuery } from "../../../redux/services/exersiceApi";
import styles from "./ExerciseDetailsPage.module.scss";
import Input, { InputRef } from "antd/lib/input";
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
import { Progress } from "antd";

const ExerciseDetailsPage = () => {
  const inputRef = useRef<InputRef>(null);

  const user = useAppSelector(selectUser);

  const { exerciseId } = useParams<{ exerciseId: string }>();
  const { checkAnswer, userResults } = useCheckAnswer();
  const [answerValue, setAnswerValue] = useState<{ [key: string]: string[] }>(
    {}
  );
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
  // const [completedTasksCount, setCompletedTasksCount] = useState(0);
  // const [remainingTasksCount, setRemainingTasksCount] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);

  const progress = useAppSelector(selectUserExerciseProgress);
  const currentModule = useAppSelector(selectCurrentModule);
  const [updateUserExerciseProgress] = useUpdateUserExerciseProgressMutation();
  const { handleExerciseList } = useExerciseNavigation();
  useCalculateModuleProgress() as IModuleProgress;

  const totalTasks = exercise?.tasks.length || 0;
  const handleCloseModal = () => {
    setIsModalResultVisible(false);
  };

  const handleFinalProgress = useCallback(async () => {
    try {
      const finalResult = {
        userId: user?._id || "",
        exerciseId: exercise?._id ? String(exercise._id) : "",
        answers: userResults,
        progress: 100,
      };
      await updateUserExerciseProgress(finalResult);
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

  // useEffect(() => {
  //   if (exercise) {
  //     const completedCount = currentTaskIndex + 1;
  //     const remainingCount = exercise.tasks.length - completedCount;
  //     setCompletedTasksCount(completedCount);
  //     setRemainingTasksCount(remainingCount);
  //   }
  // }, [currentTaskIndex, exercise]);

  useEffect(() => {
    if (exercise) {
      const totalTasks = exercise.tasks.length;
      const completedTasks = currentTaskIndex + 1; // Assuming `currentTaskIndex` starts from 0
      const percent = (completedTasks / totalTasks) * 100;
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
      const data = {
        userId: user?._id || "",
        exerciseId: (exercise?._id as string) || "",
        progress,
        answers: userResults,
      };

      await updateUserExerciseProgress(data);
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
      setCurrentTaskIndex(
        (currentIndex) => (currentIndex + 1) % exercise.tasks.length
      );

      if (currentTaskIndex === totalTasks - 1) {
        handleFinalProgress();
        setIsModalResultVisible(true);
      }
      setIsAnswerChecked(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !exercise) {
    return <div>Error loading exercise</div>;
  }

  const currentTask = exercise.tasks[currentTaskIndex];

  const parts = currentTask.content.split("{{input}}");

  const allInputsEmpty = Object.values(
    answerValue[currentTask._id] || []
  ).every((answer) => answer.trim() === "");

  const isShortExercise = currentTask.content.length < 20;
  /**
  
 strokeColor: Sets the color of the progress bar.
status: Can be active, exception, or normal. active shows a more dynamic, animated progress bar.
showInfo: Set to false if you don't want to show the percentage number.
strokeWidth: The thickness of the progress line.
 */
  return (
    <div style={{ textAlign: "center" }}>
      <Title level={5}>
        {String(exercise.number)[0]}. {exercise.instruction}
      </Title>
      <Typography.Paragraph>{exercise.example}</Typography.Paragraph>
      <Divider />

      <p style={{ maxWidth: "80%", margin: "0 auto" }}>
        <Progress percent={Math.round(progressPercent)} status="active" />
      </p>

      <Divider />
      <Flex
        vertical={!isShortExercise}
        justify="center"
        align="center"
        style={{ marginTop: "2.5em" }}
      >
        {parts.map((part, partIndex) => (
          <React.Fragment key={partIndex}>
            {part && (
              <Col>
                <Paragraph className={styles.exPar} style={{ margin: "0 0" }}>
                  {part}
                </Paragraph>
              </Col>
            )}
            {partIndex < parts.length - 1 && (
              // <Col span={24}>

              <Input
                className={styles.exerciseInput}
                ref={inputRef}
                style={{
                  maxWidth: isShortExercise ? "18%" : "60%",
                  color: "#000000",
                  margin: "1em",
                  // fontSize: "1.5em",
                }}
                value={
                  answerValue[currentTask._id]
                    ? answerValue[currentTask._id][partIndex] || ""
                    : ""
                }
                onChange={(e) =>
                  handleInputChange(e, currentTask._id, partIndex)
                }
                placeholder="Antwort..."
              />
              // </Col>
            )}
          </React.Fragment>
        ))}
      </Flex>

      <ResultMessage
        resultMessage={resultMessage}
        correctAnswer={currentTask.solution}
      />

      <ResultsModal
        visible={isModaResultlVisible}
        onClose={handleCloseModal}
        userResults={userResults}
        onHandleExerciseList={() => {
          if (currentModule && currentModule._id) {
            handleExerciseList(currentModule._id);
          } else {
            console.error("Module ID is not available");
          }
        }}
      />
      <Flex
        vertical={true}
        align="center"
        justify="center"
        style={{ marginTop: "2.5em" }}
      >
        {currentTask.image ? (
          <div style={{ marginBottom: "2em" }}>
            <Image width={90} height={90} src={currentTask.image} />
          </div>
        ) : undefined}

        <Button
          style={{ marginBottom: "2em" }}
          type="primary"
          disabled={allInputsEmpty}
          onClick={goToNextTask}
        >
          {isAnswerChecked ? "Наступне Завдання" : "Перевірити відповідь"}
        </Button>
      </Flex>
    </div>
  );
};

const MemoizedExerciseDetailsPage = React.memo(ExerciseDetailsPage);
export default MemoizedExerciseDetailsPage;
