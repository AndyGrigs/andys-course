import React, { useRef } from "react";
import { Button, Col, Flex, Typography, Divider, Image } from "antd";
const { Title, Paragraph } = Typography;
import { useParams } from "react-router-dom";
import { Loader } from "../../../components/Loader";
import { useCallback, useEffect, useState } from "react";
import { useGetOneExercisesQuery } from "../../../redux/services/exersiceApi";
import styles from "./ExerciseDetailsPage.module.scss";
import { useDispatch } from "react-redux";
import Input, { InputRef } from "antd/lib/input";
import { selectUserExerciseProgress } from "../../../redux/slices/userProgress/userProgressSlice";
import useCheckAnswer from "../hooks/useCheckAnswers";
import { useCalculateExerciseProgress } from "../utils/culculateExerciseProgress";
import {
  useUpdateUserExerciseProgressMutation,
  useUpdateUserModuleProgressMutation,
} from "../../../redux/services/progressApi";
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

const ExerciseDetailsPage = () => {
  const inputRef = useRef<InputRef>(null);

  const dispatch = useDispatch();
  const user = useAppSelector(selectUser);

  const { exerciseId } = useParams<{ exerciseId: string }>();
  const { checkAnswer, userResults } = useCheckAnswer();
  const [answerValue, setAnswerValue] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [isModaResultlVisible, setIsModalResultVisible] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [resultMessage, setResultMessage] = useState("");
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const {
    data: exercise,
    isLoading,
    isError,
  } = useGetOneExercisesQuery(exerciseId);

  const progress = useAppSelector(selectUserExerciseProgress);
  const currentModule = useAppSelector(selectCurrentModule);
  const [updateUserExerciseProgress] = useUpdateUserExerciseProgressMutation();
  const { handleRepeatExercise, handleExerciseList } = useExerciseNavigation();
  const [updateUserModuleProgress] = useUpdateUserModuleProgressMutation();
  const { moduleProgressPercentage } =
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
  }, [user?._id, userResults, updateUserExerciseProgress]);

  const handleUpdateModuleProgress = useCallback(async () => {
    try {
      const data = {
        userId: user?._id || "",
        moduleId: currentModule?._id || "",
        progress: moduleProgressPercentage,
      };
      await updateUserModuleProgress(data);
    } catch (error) {
      console.log(error);
    }
  }, [user, currentModule, moduleProgressPercentage, updateUserModuleProgress]);

  useEffect(() => {
    console.log("User Exercise Progress:", progress);
  }, [progress]);

  useEffect(() => {
    if (currentTaskIndex === totalTasks - 1) {
      setIsModalResultVisible(true);
      handleFinalProgress();
      handleUpdateModuleProgress();
    }
  }, [
    currentTaskIndex,
    totalTasks,
    handleFinalProgress,
    handleUpdateModuleProgress,
  ]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useCalculateExerciseProgress({ userResults });

  useEffect(() => {
    if (userResults) {
      console.log(userResults);
    }
  }, [userResults]);

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
        updatedAnswers[taskId][partIndex] = e.target.value.trim().toLowerCase();

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
    console.log("Answer being sent for checking:", answerValue);

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

  return (
    <div style={{ textAlign: "center" }}>
      <Title level={3}>{exercise.number}</Title>
      <Title level={4}>{exercise.instruction}</Title>
      <Title level={2}>{exercise.example}</Title>
      <Divider />
      <Flex
        gap={8}
        justify="center"
        align="center"
        style={{ marginTop: "2.5em" }}
      >
        {parts.map((part, partIndex) => (
          <React.Fragment key={partIndex}>
            {part && (
              <Col>
                <Paragraph
                  className={styles.exPar}
                  style={{ margin: "0 .2em" }}
                >
                  {part}
                </Paragraph>
              </Col>
            )}
            {partIndex < parts.length - 1 && (
              <Col span={3}>
                <Input
                  className={styles.exerciseInput}
                  ref={inputRef}
                  style={{
                    maxWidth: "100%",
                    color: "#000000",
                    margin: "0 -3em",
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
              </Col>
            )}
          </React.Fragment>
        ))}
      </Flex>

      <ResultMessage resultMessage={resultMessage} />

      <ResultsModal
        visible={isModaResultlVisible}
        onClose={handleCloseModal}
        userResults={userResults}
        onRepeatExercise={() => {
          if (
            exercise &&
            typeof exercise._id === "string" &&
            currentModule?._id
          ) {
            handleRepeatExercise(currentModule._id, exercise._id);
          } else {
            // Handle the case where exercise._id is not a string or is undefined
            console.error("Exercise ID is not available");
          }
        }}
        onHandleExerciseList={() => {
          if (currentModule && currentModule._id) {
            handleExerciseList(currentModule._id);
          } else {
            // Handle the case where currentModule or currentModule._id is undefined
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
        <div style={{ marginBottom: "2em" }}>
          <Image width={90} height={90} src={currentTask.image} />
        </div>
        <Button disabled={allInputsEmpty} onClick={goToNextTask}>
          {isAnswerChecked ? "Наступне Завдання" : "Перевірити відповідь"}
        </Button>
        <img src="./assets/pronomen/ich.jpg" alt="" />
      </Flex>
    </div>
  );
};

const MemoizedExerciseDetailsPage = React.memo(ExerciseDetailsPage);
export default MemoizedExerciseDetailsPage;
