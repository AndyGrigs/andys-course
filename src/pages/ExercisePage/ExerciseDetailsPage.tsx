import { Button, Input, Col, Flex, Row, Space } from "antd";
import { useParams, Link } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { memo, useCallback, useState } from "react";
import { useGetOneExercisesQuery } from "../../redux/services/exersiceApi";
import React from "react";
import useCheckAnswer from "../../hooks/useCheckAnswers";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

export const ExerciseDetailsPage = () => {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const { checkAnswer, userResults } = useCheckAnswer();
  const [answerValue, setAnswerValue] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [resultMessage, setResultMessage] = useState("");
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const {
    data: exercise,
    isLoading,
    isError,
  } = useGetOneExercisesQuery(exerciseId);

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

  const allInputsEmpty = Object.values(answerValue).every((answers) =>
    answers.every((answer) => answer.trim() === "")
  );

  const handleCheckAnswer = () => {
    if (!exercise) {
      // Handle the case where exercise is undefined
      // For example, you might want to set an error message or return early
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
    <div style={{ color: "lightgrey", textAlign: "center" }}>
      <h1>{exercise.number}</h1>
      <p>{exercise.instruction}</p>
      <p>{exercise.example}</p>
      <Flex justify="center" align="center" style={{ marginTop: "2.5em" }}>
        {parts.map((part, partIndex) => (
          <React.Fragment key={partIndex}>
            {part && (
              <Col>
                <p style={{ margin: "0 1em 0 1em" }}>{part}</p>
              </Col>
            )}
            {partIndex < parts.length - 1 && (
              <Col span={3}>
                <Input
                  style={{ maxWidth: "100%" }}
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

        {/* <Col span={6}>
          <Button
            style={{ marginLeft: "2em" }}
            onClick={() => handleCheckAnswer()}
          >
            Check!
          </Button>
        </Col> */}
      </Flex>

      <Flex>
        {resultMessage === "Correct!" ? (
          <CheckCircleOutlined style={{ color: "green", fontSize: "48px" }} />
        ) : resultMessage === "Incorrect. Try again." ? (
          <CloseCircleOutlined style={{ color: "red", fontSize: "48px" }} />
        ) : null}
      </Flex>

      <Flex align="center" justify="center" style={{ marginTop: "2.5em" }}>
        <Button disabled={allInputsEmpty} onClick={goToNextTask}>
          {isAnswerChecked ? "Наступне Завдання" : "Перевірити відповідь"}
        </Button>
      </Flex>
    </div>
  );
};
