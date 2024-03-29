import React, { useRef } from "react";
import { Button, Input, Col, Flex, Typography, Divider } from "antd";
const { Title, Paragraph } = Typography;
import { useParams } from "react-router-dom";
import { Loader } from "../../../components/Loader";
import { useCallback, useEffect, useState } from "react";
import { useGetOneExercisesQuery } from "../../../redux/services/exersiceApi";
import useCheckAnswer from "../../../hooks/useCheckAnswers";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import styles from "./ExerciseDetailsPage.module.scss";
import { useSelector } from "react-redux";
import useCreatingExerciseProgress from "../../../hooks/useCreatingExerciseProgress";
import { selectCurrentModule } from "../../../redux/slices/moduleSlice";
import { InputRef } from "antd/lib/input";
import { selectUser } from "../../../redux/slices/authSlice";

const ExerciseDetailsPage = () => {
  const inputRef = useRef<InputRef>(null);
  const user = useSelector(selectUser);

  const { exerciseId } = useParams<{ exerciseId: string }>();
  const { checkAnswer, userResults } = useCheckAnswer();
  const [answerValue, setAnswerValue] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [resultMessage, setResultMessage] = useState("");
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [iconClass, setIconClass] = useState("");
  const {
    data: exercise,
    isLoading,
    isError,
  } = useGetOneExercisesQuery(exerciseId);

  const currentModule = useSelector(selectCurrentModule);
  // Assuming `exercise` and `currentModule` are fetched asynchronously and might be undefined
  const moduleName = currentModule?.name || "";
  const exerciseNumber = exercise?.number || undefined;

  // Now, `moduleName` and `exerciseNumber` are guaranteed to be strings, so you can safely call `useCreatingExerciseProgress`
  const { createUserExerciseProgress } = useCreatingExerciseProgress(
    exerciseId || "",
    moduleName,
    exerciseNumber || 0
  );

  const handleCreateUserExerciseProgress = async (exerciseId: string) => {
    try {
      const localStorageProgress = localStorage.getItem(
        `exerciseProgress_${exerciseId}`
      );
      if (localStorageProgress) {
        const existingProgress = JSON.parse(localStorageProgress);
        console.log(
          "Progress exercise found in local storage:",
          existingProgress
        );
      } else {
        const existingProgress = user?.exerciseProgress.find((progress) => {
          return progress.exerciseId === exerciseId;
        });
        if (!existingProgress) {
          const result = await createUserExerciseProgress({
            userId: user?._id,
            progress: {
              exerciseIdId: exerciseId,
              exerciseNumber: 1,
              progress: 0,
              completed: "false",
            },
          }).unwrap();
          console.log("Success:", result);

          localStorage.setItem(
            `exerciseProgress_${exerciseId}`,
            JSON.stringify(result.progress)
          );
        } else {
          // If the progress exists in the database, store it in the local storage
          localStorage.setItem(
            `exerciseProgress_${exerciseId}`,
            JSON.stringify(existingProgress.progress)
          );
        }
      }
    } catch (error) {
      console.error("Failed:", error);
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (resultMessage) {
      setIconClass(styles.fadeIn);
      setTimeout(() => setIconClass(styles.fadeOut), 2000);
    } else {
      setIconClass("");
    }
  }, [resultMessage]);

  useEffect(() => {
    if (userResults) {
      console.log(userResults);
    }
  }, [userResults]); // This effect runs whenever `userResults` changes

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
        updatedAnswers[taskId][partIndex] = e.target.value.trim();

        return updatedAnswers;
      });
    },
    []
  );

  const allInputsEmpty = Object.values(answerValue).every((answers) =>
    answers.every((answer) => answer.trim() === "")
  );

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

  console.log("render");

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !exercise) {
    return <div>Error loading exercise</div>;
  }

  const currentTask = exercise.tasks[currentTaskIndex];
  const parts = currentTask.content.split("{{input}}");

  return (
    <div style={{ textAlign: "center" }}>
      <Title level={3}>{exercise.number}</Title>
      <Title level={4}>{exercise.instruction}</Title>
      <Title level={2}>{exercise.example}</Title>
      <Divider />
      <Flex justify="center" align="center" style={{ marginTop: "2.5em" }}>
        {parts.map((part, partIndex) => (
          <React.Fragment key={partIndex}>
            {part && (
              <Col>
                <Paragraph style={{ margin: "0 1em 0 1em", fontSize: "1.5em" }}>
                  {part}
                </Paragraph>
              </Col>
            )}
            {partIndex < parts.length - 1 && (
              <Col span={3}>
                <Input
                  ref={inputRef}
                  style={{
                    maxWidth: "100%",
                    color: "#000000",
                    fontSize: "1.5em",
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
                {/* <Input
                  style={{
                    maxWidth: "100%",
                    color: "#000000",
                    fontSize: "1.5em",
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
                /> */}
              </Col>
            )}
          </React.Fragment>
        ))}
      </Flex>

      <Flex>
        <div
          className={iconClass}
          style={{
            position: "absolute",
            top: "17em",
            right: "7em",
            zIndex: 1000,
            opacity: resultMessage ? 1 : 0,
            transition: "opacity  0.5s",
          }}
        >
          {resultMessage === "Correct!" ? (
            <CheckCircleOutlined style={{ color: "green", fontSize: "96px" }} />
          ) : resultMessage === "Incorrect. Try again." ? (
            <CloseCircleOutlined style={{ color: "red", fontSize: "96px" }} />
          ) : null}
        </div>
      </Flex>

      <Flex align="center" justify="center" style={{ marginTop: "2.5em" }}>
        <Button disabled={allInputsEmpty} onClick={goToNextTask}>
          {isAnswerChecked ? "Наступне Завдання" : "Перевірити відповідь"}
        </Button>
      </Flex>
    </div>
  );
};

const MemoizedExerciseDetailsPage = React.memo(ExerciseDetailsPage);
export default MemoizedExerciseDetailsPage;
