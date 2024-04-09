import React, { useRef } from "react";
import { Button, Input, Col, Flex, Typography, Divider } from "antd";
const { Title, Paragraph } = Typography;
import { useParams } from "react-router-dom";
import { Loader } from "../../../components/Loader";
import { useCallback, useEffect, useState } from "react";
import { useGetOneExercisesQuery } from "../../../redux/services/exersiceApi";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import styles from "./ExerciseDetailsPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { InputRef } from "antd/lib/input";
import { selectUserExerciseProgress } from '../../../redux/slices/userProgress/userProgressSlice';
import useCheckAnswer from '../hooks/useCheckAnswers';
import { useCalculateExerciseProgress } from '../utils/culculateExerciseProgress';
import { useUpdateUserExerciseProgressMutation } from '../../../redux/services/progressApi';
import { selectUser } from '../../../redux/slices/authSlice';
import { useAppSelector } from '../../../redux/slices/reduxHooks';

const ExerciseDetailsPage = () => {
  const inputRef = useRef<InputRef>(null);
  const dispatch: AppDispatch = useDispatch();
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
  const userExerciseProgress = useSelector(selectUserExerciseProgress);
  const user = useAppSelector(selectUser);
  const progress = useAppSelector(selectUserExerciseProgress);
  const [updateUserExerciseProgress] = useUpdateUserExerciseProgressMutation();

  useEffect(() => {
    console.log("User Exercise Progress:", userExerciseProgress);
  }, [userExerciseProgress]);



  useEffect(() => {
    return () => {
      dispatch(updateUserExerciseProgress({ exerciseId: exercise?._id || "", progress: progress }));
    };
  }, [dispatch]);




  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (resultMessage) {
      setIconClass(styles.fadeIn);
      setTimeout(() => setIconClass(styles.fadeOut), 2000);
    } else {
      setIconClass("");
    }
  }, [resultMessage]);


  useCalculateExerciseProgress({ userResults })


  useEffect(() => {
    if (userResults) {
      console.log(userResults);
    }
  }, [userResults]); // This effect runs whenever `userResults` changes

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

  const handleAddProgress = async () => {
    try {

      const data = {
        userId: user?._id || '', // Provide an empty string as a default value
        exerciseId: exercise?._id as string || '',
        progress
      };

      await updateUserExerciseProgress(data);
    } catch (error) {
      console.error("Error updating user progress:", error);
    }
  };

  // const allInputsEmpty = Object.values(answerValue).every((answers) =>
  //   answers.every((answer) => answer.trim() === "")
  // );


  const handleCheckAnswer = () => {
    if (!exercise) {
      setResultMessage("Exercise not loaded");
      return;
    }
    console.log("Answer being sent for checking:", answerValue);

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
    handleAddProgress()
  };

  const goToNextTask = () => {
    if (!exercise) {
      console.log("Exercise is not defined");
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
  const allInputsEmpty = Object.values(answerValue[currentTask._id] || []).every((answer) => answer.trim() === "");

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
                  ref={inputRef}
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
                />
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
        <Button disabled={allInputsEmpty} onClick={goToNextTask}>
          {isAnswerChecked ? "Наступне Завдання" : "Перевірити відповідь"}
        </Button>
      </Flex>
    </div>
  );
};

const MemoizedExerciseDetailsPage = React.memo(ExerciseDetailsPage);
export default MemoizedExerciseDetailsPage;
