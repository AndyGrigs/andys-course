import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Input, Col, Flex, Typography, Divider } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useGetOneExercisesQuery } from "../../redux/services/exersiceApi";
import useCheckAnswer from "../../hooks/useCheckAnswers";
import styles from "./ui/ExerciseDetailsPage.module.scss";
import { Loader } from "../../components/Loader";

const { Title, Paragraph } = Typography;

export const ExercisePage = () => {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const { checkAnswer, userResults } = useCheckAnswer();
  const [resultMessage, setResultMessage] = useState("");
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [iconClass, setIconClass] = useState("");
  const {
    data: exercise,
    isLoading,
    isError,
  } = useGetOneExercisesQuery(exerciseId);

  const inputRefs = useRef<{ [key: string]: HTMLInputElement[] }>({});

  useEffect(() => {
    if (resultMessage) {
      setIconClass(styles.fadeIn);
      setTimeout(() => setIconClass(styles.fadeOut), 2000);
    } else {
      setIconClass("");
    }
  }, [resultMessage]);

  const handleCheckAnswer = () => {
    if (!exercise) {
      setResultMessage("Exercise not loaded");
      return;
    }

    const inputValues = Object.entries(inputRefs.current).reduce(
      (acc, [taskId, refs]) => {
        acc[taskId] = refs.map((ref) => ref.value.trim());
        return acc;
      },
      {} as { [key: string]: string[] }
    );

    const isCorrect = checkAnswer(
      exercise.tasks[0]._id, // Assuming you want to check the first task
      0, // Assuming you want to check the first task
      inputValues,
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
      setResultMessage("Exercise not loaded");
      return;
    }

    if (!isAnswerChecked) {
      handleCheckAnswer();
      setIsAnswerChecked(true);
    } else {
      clearResultMessage();
      // Logic to go to the next task
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !exercise) {
    return <div>Error loading exercise</div>;
  }

  return (
    <div style={{ textAlign: "center" }}>
      <Title level={3}>{exercise.number}</Title>
      <Title level={4}>{exercise.instruction}</Title>
      <Title level={2}>{exercise.example}</Title>
      <Divider />
      <Flex justify="center" align="center" style={{ marginTop: "2.5em" }}>
        {exercise.tasks.map((task, taskIndex) => (
          <React.Fragment key={taskIndex}>
            <Col>
              <Paragraph style={{ margin: "0 1em 0 1em", fontSize: "1.5em" }}>
                {task.content}
              </Paragraph>
            </Col>
            <Col span={3}>
              <Input
                ref={(el) => {
                  if (!inputRefs.current[task._id]) {
                    inputRefs.current[task._id] = [];
                  }
                  if (el instanceof HTMLInputElement) {
                    inputRefs.current[task._id][taskIndex] = el;
                  }
                }}
                style={{
                  maxWidth: "100%",
                  color: "#000000",
                  fontSize: "1.5em",
                }}
                placeholder="Antwort..."
              />
            </Col>
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
        <Button disabled={!isAnswerChecked} onClick={goToNextTask}>
          {isAnswerChecked ? "Наступне Завдання" : "Перевірити відповідь"}
        </Button>
      </Flex>
    </div>
  );
};
