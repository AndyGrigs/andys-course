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
  const [answerValue, setAnswerValue] = useState<{ [key: string]: string[] }>(
    {}
  );
  console.log(answerValue);

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



  const concatAnswerValue = (obj: { [key: string]: string[] }) => {
    let concatenatedString = "";
    for (const key in obj) {
      if (Array.isArray(obj[key])) {
        concatenatedString += obj[key].join("");
      }
    }

    return concatenatedString
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
      updatedAnswers[taskId][partIndex] = e.target.value;

      return updatedAnswers;
    });
  };

  function compareAnswer(userAnswer: string, solution: string): boolean {
    // Implement the comparison logic here
    // For example, if the solution is a string, you might compare it like this:
    return userAnswer == solution
  }

  const checkAnswer = (taskId: string, partIndex: number) => {
    const task = exercise.tasks.find((t) => t._id === taskId);
    console.log(task);

    if (!task) {
      console.error("Task not found");
      return;
    }
    console.log(concatAnswerValue(answerValue))
    //const isCorrect = console.log(task.solution[0]);
    const isCorrect = compareAnswer(concatAnswerValue(answerValue).trim(), (task.solution[0].replace(/\s/g, '').trim()))
    console.log(concatAnswerValue(answerValue).replace(/\s/g, '').trim(), task.solution[0].replace(/\s/g, ''))
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
                        onChange={(e) =>
                          handleInputChange(e, task._id, partIndex)
                        }
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
