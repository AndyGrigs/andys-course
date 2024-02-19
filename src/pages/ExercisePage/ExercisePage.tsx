import { Button, Card, List, Flex, Input, Col, Row } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from "../../components/Loader";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useGetOneExercisesQuery } from "../../redux/services/exersiceApi";
import React from "react";


export const ExercisePage: React.FC = () => {
  const { exerciseId } = useParams<{ exerciseId: string }>();

  // const exercise = useSelector((state: RootState) => {
  //   const allExercises = state.exercise.allExercises;
  //   const selectedExercise = allExercises.find((ex) => ex._id === exerciseId);
  //   console.log("Selected Exercise:", selectedExercise);
  //   console.log(" Exercise Id:", exerciseId);
  //   return selectedExercise;
  // });

  //const [answerValue, setAnswerValue] = useState(" ");
  const [answerValue, setAnswerValue] = useState<Record<string, string>>({});
  const [inputValues, setInputValues] = useState<{ [key: string]: string[] }>({});
  const {
    data: exercise,
    isLoading,
    isError,
  } = useGetOneExercisesQuery(exerciseId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !exercise) {
    return <div>Error loading exercise</div>;
  }
  console.log(exercise);

  function normalizeString(input: string): string {
    return input.toLowerCase().trim();
  }

  // const handleInputChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   taskId: string,
  //   partIndex: number
  // ) => {
  //   // Оновлення значення конкретного інпута
  //   setInputValues(prevValues => {
  //     // Створення копії поточного стану
  //     const updatedValues = { ...prevValues };

  //     // Перевірка, чи існує вже масив для даного taskId
  //     if (!updatedValues[taskId]) {
  //       updatedValues[taskId] = [];
  //     }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    taskId: string,
    partIndex: number
  ) => {
    setAnswerValue((prevState) => ({ ...prevState, [taskId]: e.target.value }));
  };

  function compareStrings(userAnswer: string, solution: string): boolean {
    // Implement the comparison logic here
    // For example, if the solution is a string, you might compare it like this:
    return userAnswer === solution;
  }

  const checkAnswer = (taskId: string, partIndex: number) => {
    const task = exercise.tasks.find((t) => t._id === taskId);
    console.log(task);
    if (!task) {
      console.error("Task not found");
      return;
    }

    // Get the answer from the state
    const userAnswer = answerValue[taskId] || "";
    console.log(userAnswer);
    // Combine the parts and the user answer
    const parts = task.content.split("{{input}}");
    const combinedAnswer = parts.reduce((acc, part, index) => {
      // For each part, add the user answer in the correct position
      if (index === partIndex) {
        return acc + userAnswer + part;
      }
      return acc + part;
    }, "");

    // Here you should compare combinedAnswer with the solution for that task
    const isCorrect = combinedAnswer.trim() === task.solution[0].trim();
    console.log(task.solution[0]);
    console.log(isCorrect);
    console.log(
      `Answer for task ${taskId} is ${isCorrect ? "correct" : "incorrect"}`
    );
    // Here you can update the state to show feedback to the user
  };

  return (
    <div style={{ color: "lightgrey" }}>
      <h1>{exercise.number}</h1>
      <p>{exercise.instruction}</p>
      <p>{exercise.example}</p>
      {exercise.tasks &&
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
                        onChange={(e) => handleInputChange(e, task._id, partIndex)}
                        placeholder="Gebe dein Antwort ein..."
                      />
                    </Col>
                  )}
                </React.Fragment>
              ))}
              <Button onClick={() => checkAnswer(task._id, parts.length - 2)}>
                Check!
              </Button>
            </Row>
          );
        })}
    </div>
  );
};
