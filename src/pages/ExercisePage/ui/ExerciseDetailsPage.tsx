import { Button, Input, Col, Flex, Typography, Divider } from "antd";
const { Title, Paragraph } = Typography;
import { useParams, Link } from "react-router-dom";
import { Loader } from "../../../components/Loader";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGetOneExercisesQuery } from "../../../redux/services/exersiceApi";
import React from "react";
import useCheckAnswer from "../../../hooks/useCheckAnswers";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import styles from "./ExerciseDetailsPage.module.scss";

const ExerciseDetailsPage = () => {
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

  const inputRefs = useRef<{ [key: string]: HTMLInputElement[] }>({});

  // useEffect(() => {
  //   //let timeoutId: NodeJS.Timeout | null = null;

  //   if (resultMessage) {
  //     setIconClass(styles.fadeIn);
  //     // timeoutId = setTimeout(() => setIconClass(styles.fadeOut), 2000);
  //   } else {
  //     setIconClass("");
  //   }

  //   // return () => {
  //   //   if (timeoutId) {
  //   //     clearTimeout(timeoutId);
  //   //   }
  //   // };
  // }, [resultMessage]);

  useEffect(() => {
    if (resultMessage) {
      setIconClass(styles.fadeIn);
      setTimeout(() => setIconClass(styles.fadeOut), 2000);
    } else {
      setIconClass("");
    }
  }, [resultMessage]);

  console.log(userResults);

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

  const inputValues = Object.entries(inputRefs.current).reduce(
    (acc, [taskId, refs]) => {
      acc[taskId] = refs.map((ref) => ref.value.trim());
      return acc;
    },
    {} as { [key: string]: string[] }
  );

  const allInputsEmpty = Object.values(answerValue).every((answers) =>
    answers.every((answer) => answer.trim() === "")
  );

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
  };

  const goToNextTask = () => {
    if (!exercise) {
      // Handle the case where exercise is undefined
      // For example, you might want to set an error message or return early
      setResultMessage("Exercise not loaded");
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
                  ref={(el) => {
                    if (!inputRefs.current[currentTask._id]) {
                      inputRefs.current[currentTask._id] = [];
                    }
                    if (el instanceof HTMLInputElement) {
                      inputRefs.current[currentTask._id][partIndex] = el;
                    }
                  }}
                  style={{
                    maxWidth: "100%",
                    color: "#000000",
                    fontSize: "1.5em",
                  }}
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
        <Button onClick={goToNextTask}>
          {isAnswerChecked ? "Наступне Завдання" : "Перевірити відповідь"}
        </Button>
      </Flex>
    </div>
  );
};

export default React.memo(ExerciseDetailsPage);
