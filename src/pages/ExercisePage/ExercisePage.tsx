import { Button, Modal, Input, Col, Row, Flex } from "antd";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { memo, useCallback, useState } from "react";
import { useGetOneExercisesQuery } from "../../redux/services/exersiceApi";
import React from "react";
import useCheckAnswer from "../../hooks/useCheckAnswers";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

export const ExercisePage = () => {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const { checkAnswer } = useCheckAnswer();
  const [answerValue, setAnswerValue] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const {
    data: exercise,
    isLoading,
    isError,
  } = useGetOneExercisesQuery(exerciseId);

  // const { checkAnswer, userResults } = useCheckAnswer()
  // console.log(userResults)

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

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !exercise) {
    return <div>Error loading exercise</div>;
  }

  const handleCheckAnswer = () => {
    const isCorrect = checkAnswer(
      currentTask._id,
      currentTaskIndex,
      answerValue,
      exercise
    );
    setResultMessage(isCorrect ? "Correct!" : "Incorrect. Try again.");
  };

  const clearResultMessage = () => {
    setResultMessage("");
  };

  const goToNextTask = () => {
    clearResultMessage();
    setCurrentTaskIndex(
      (currentIndex) => (currentIndex + 1) % exercise.tasks.length
    );
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const currentTask = exercise.tasks[currentTaskIndex];
  const parts = currentTask.content.split("{{input}}");

  return (
    <div style={{ color: "lightgrey", textAlign: "center" }}>
      <h1>{exercise.number}</h1>
      <p>{exercise.instruction}</p>
      <p>{exercise.example}</p>
      <Button style={{ width: "20%" }} onClick={showModal}>
        Почати
      </Button>

      {/* <Modal
        title={`Task: ${currentTaskIndex}`}
        open={isModalVisible}
        onCancel={handleModalClose}
        style={{ height: "80%" }}
        width="50%"
        footer={[
          <Button key="next" onClick={goToNextTask}>
            Наступне Завдання
          </Button>,
        ]}
      >
        <Flex justify="center" align="center">
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
          <Button
            style={{ marginLeft: "2em" }}
            onClick={() => handleCheckAnswer()}
          >
            Check!
          </Button>
        </Flex>

        <Flex>
          {resultMessage === "Correct!" ? (
            <CheckCircleOutlined style={{ color: "green", fontSize: "48px" }} />
          ) : resultMessage === "Incorrect. Try again." ? (
            <CloseCircleOutlined style={{ color: "red", fontSize: "48px" }} />
          ) : null}
        </Flex>
      </Modal> */}
    </div>
  );
};
