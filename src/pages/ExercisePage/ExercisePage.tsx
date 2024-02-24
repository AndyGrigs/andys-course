import { Button, Modal, Input, Col, Row } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { memo, useCallback, useMemo, useState } from "react";
import { useGetOneExercisesQuery } from "../../redux/services/exersiceApi";
import React from "react";

export const ExercisePage = () => {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const [answerValue, setAnswerValue] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userResults, setUserResults] = useState({});
  const {
    data: exercise,
    isLoading,
    isError,
  } = useGetOneExercisesQuery(exerciseId);

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

  const concatAnswerValue = useCallback((taskId: string, obj: { [key: string]: string[] }) => {
    if (!obj[taskId]) return "";
    return obj[taskId].join("");
  }, []);


  if (isLoading) {
    return <Loader />;
  }

  if (isError || !exercise) {
    return <div>Error loading exercise</div>;
  }



  function compareAnswer(userAnswer: string, solution: string): boolean {
    return userAnswer == solution;
  }

  const checkAnswer = (taskId: string, taskIndex: number) => {
    const task = exercise.tasks.find((t) => t._id === taskId);

    if (!task) {
      console.error("Task not found");
      return;
    }

    console.log(answerValue);
    //const isCorrect = console.log(task.solution[0]);
    const isCorrect = compareAnswer(
      concatAnswerValue(taskId, answerValue),
      task.solution[0].replace(/\s/g, "")
    );

    setUserResults((prevResults) => ({
      ...prevResults,
      [taskIndex]: isCorrect,
    }));

    console.log(
      concatAnswerValue(taskId, answerValue),
      task.solution[0].replace(/\s/g, "")
    );
    console.log(isCorrect);
    console.log(
      `Answer for task ${taskId} is ${isCorrect ? "correct" : "incorrect"}`
    );
    // Here you can update the state to show feedback to the user
  };

  const goToNextTask = () =>
    setCurrentTaskIndex(
      (currentIndex) => (currentIndex + 1) % exercise.tasks.length
    );
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
        title={`Task: ${currentTask._id}`}
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
            onClick={() => checkAnswer(currentTask._id, currentTaskIndex)}
          >
            Check!
          </Button>
        </Row>
      </Modal>
    </div>
  );
};
