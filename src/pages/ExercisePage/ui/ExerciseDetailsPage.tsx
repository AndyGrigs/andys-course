import React from "react";
import { Button, Flex, Typography, Divider } from "antd";
const { Title } = Typography;
import { useParams } from "react-router-dom";
import { Loader } from "../../../components/Loader";
import { useEffect, useState } from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { selectUserExerciseProgress } from '../../../redux/slices/userProgressSlice';
import useCheckAnswer from '../hooks/useCheckAnswers';
import useExerciseFetching from '../hooks/useExerciseFetching';
import { useAnswerState } from '../hooks/useAnswerState';
import { useTaskNavigation } from '../hooks/useTaskNavigation';
import ExerciseBlocksContainer from '../compnents/ExerciseBlockContainer';
// import { useCheckAllInputsFilled } from '../hooks/useCheckingInput';

const ExerciseDetailsPage = () => {
  // const inputRef = useRef<InputRef>(null);
  // const user = useSelector(selectUser);

  const { exerciseId } = useParams<{ exerciseId: string }>();
  const [resultMessage, setResultMessage] = useState("");
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const { checkAnswer, userResults } = useCheckAnswer();

  const { exercise, isLoading, isError } = useExerciseFetching(exerciseId ?? '');

  const { currentTaskIndex, goToNextTask } = useTaskNavigation(exercise ? exercise.tasks.length : 0)

  const userExerciseProgress = useSelector(selectUserExerciseProgress);


  useEffect(() => {
    console.log("User Exercise Progress:", userExerciseProgress);
  }, [userExerciseProgress]);



  useEffect(() => {
    if (userResults) {
      console.log(userResults);
    }
  }, [userResults]);



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
    setResultMessage("");
    goToNextTask()
  };



  if (isLoading) {
    return <Loader />;
  }

  if (isError || !exercise) {
    return <div>Error loading exercise</div>;
  }

  // const replaceInputPlaceholders = (content: string) => {
  //   const parts = content.split("{{input}}");
  //   return parts.map((part, index) => (
  //     <React.Fragment key={index}>
  //       {part}
  //       {index < parts.length - 1 && <Input placeholder="Enter your answer" />}
  //     </React.Fragment>
  //   ));
  // };

  const currentTask = exercise.tasks[currentTaskIndex];
  const parts = currentTask.content.split("{{input}}");
  return (
    <div style={{ textAlign: "center" }}>
      <Title level={3}>{exercise.number}</Title>
      <Title level={4}>{exercise.instruction}</Title>
      <Title level={2}>{exercise.example}</Title>
      <Divider />

      <React.Fragment>
        {currentTask && <ExerciseBlocksContainer parts={parts} currentTask={currentTask} />}
      </React.Fragment>

      <Flex>
        <div
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
        <Button onClick={handleCheckAnswer}>
          {isAnswerChecked ? "Наступне Завдання" : "Перевірити відповідь"}
        </Button>
      </Flex>
    </div>
  );
};

const MemoizedExerciseDetailsPage = React.memo(ExerciseDetailsPage);
export default MemoizedExerciseDetailsPage;
