import { Button, Modal, Input, Col, Row } from "antd";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { useCallback, useState } from "react";
import { useGetOneExercisesQuery } from "../../redux/services/exersiceApi";
import React from "react";
import useCheckAnswer from "../../hooks/useCheckAnswers";

export const ExercisePage = () => {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const [answerValue, setAnswerValue] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [userResults, setUserResults] = useState({});
  const {
    data: exercise,
    isLoading,
    isError,
  } = useGetOneExercisesQuery(exerciseId);

  const { checkAnswer, userResults } = useCheckAnswer()

  const handleInputChange = useCallback((
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
  }, []);


  if (isLoading) {
    return <Loader />;
  }

  if (isError || !exercise) {
    return <div>Error loading exercise</div>;
  }


  const goToNextTask = () => {
    setCurrentTaskIndex((currentIndex) => (currentIndex + 1) % exercise.tasks.length);
    setAnswerValue({}); // Clear the input fields
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
    <div style={{ color: "lightgrey" }}>
      <h1>{exercise.number}</h1>
      <p>{exercise.instruction}</p>
      <p>{exercise.example}</p>
      <Button type="primary" onClick={showModal}>
        Почати
      </Button>
      {/* {exercise.tasks &&
        exercise.tasks.map((task) => {
          const parts = task.content.split("{{input}}");
          return (
            <Row
              key={task._id}
              gutter={13}
              align="middle"
              style={{ marginBottom: "10px" }}
            >
              {parts.map((part, partIndex) => (
                <React.Fragment key={partIndex}>
                  {part && (
                    <Col>
                      <p style={{ marginBottom: 0 }}>{part}</p>{" "}
                    </Col>
                  )}
                  {partIndex < parts.length - 1 && (
                    <Col>
                      <Input
                        style={{ maxWidth: "50%" }}
                        onChange={(e) =>
                          handleInputChange(e, task._id, partIndex)
                        }
                        placeholder="Gebe dein Antwort ein..."
                      />
                    </Col>
                  )}
                </React.Fragment>
              ))}
              <Button onClick={() => checkAnswer(task._id)}>Check!</Button>
            </Row>
          );
        })} */}
      <Modal
        title={`Task: ${currentTaskIndex}`}
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="next" onClick={goToNextTask}>
            Наступне Завдання
          </Button>,
        ]}
      >
        <Row gutter={8} align="middle">
          {parts.map((part, partIndex) => (
            <React.Fragment key={partIndex}>
              {part && (
                <Col>
                  <p style={{ marginBottom: 0 }}>{part}</p>
                </Col>
              )}
              {partIndex < parts.length - 1 && (
                <Col>
                  <Input
                    style={{ maxWidth: "40%" }}
                    onChange={(e) =>
                      handleInputChange(e, currentTask._id, partIndex)
                    }
                    placeholder="Gebe dein Antwort ein..."
                  />
                </Col>
              )}
            </React.Fragment>
          ))}
          <Button
            onClick={() => checkAnswer(currentTask._id, currentTaskIndex, answerValue, exercise)}
          >
            Check!
          </Button>
        </Row>
      </Modal>
    </div>
  );
};
