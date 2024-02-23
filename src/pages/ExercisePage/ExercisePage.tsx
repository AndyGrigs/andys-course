import { Button, Modal, Input, Col, Row } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { useCallback, useMemo, useState } from "react";
import { useGetOneExercisesQuery } from "../../redux/services/exersiceApi";
import React from "react";

export const ExercisePage: React.FC = () => {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const [answerValue, setAnswerValue] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [userResults, setUserResults] = useState<object>({});
  const {
    data: exercise,
    isLoading,
    isError,
  } = useGetOneExercisesQuery(exerciseId);

  console.log(`users answers result ${userResults}`);
  console.log(`users answers ${userResults}`);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !exercise) {
    return <div>Error loading exercise</div>;
  }

  // const concatAnswerValue = (obj: { [key: string]: string[] }) => {
  //   let concatenatedString = "";
  //   for (const key in obj) {
  //     if (Array.isArray(obj[key])) {
  //       concatenatedString += obj[key].join("");
  //     }
  //   }

  //   return concatenatedString
  // };

  const concatAnswerValue = (
    taskId: string,
    obj: { [key: string]: string[] }
  ) => {
    if (!obj[taskId]) return "";
    return obj[taskId].join("");
  };

  const handleInputChange = (
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
  };

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
          // <Button key="close" onClick={handleModalClose}>
          //   Закрити
          // </Button>,
        ]}
      >
        <Row gutter={13} align="middle">
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
                    style={{ maxWidth: "30%" }}
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
