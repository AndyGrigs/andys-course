import React from "react";
import { Col, Flex, Typography } from "antd";
import Input, { InputRef } from "antd/lib/input";
import styles from "./ExerciseDetailsPage.module.scss";

const { Paragraph } = Typography;

interface TaskInputsProps {
  parts: string[];
  isShortExercise: boolean;
  answerValue: { [key: string]: string[] };
  currentTaskId: string;
  inputRef: React.RefObject<InputRef>;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    taskId: string,
    partIndex: number
  ) => void;
}

const TaskInputs = ({
  parts,
  isShortExercise,
  answerValue,
  currentTaskId,
  inputRef,
  onInputChange,
}: TaskInputsProps) => {
  return (
    <Flex
      vertical={!isShortExercise}
      justify="center"
      align="center"
      style={{ marginTop: "2.5em" }}
    >
      {parts.map((part, partIndex) => (
        <React.Fragment key={partIndex}>
          {part && (
            <Col>
              <Paragraph className={styles.exPar} style={{ margin: "0 0" }}>
                {part}
              </Paragraph>
            </Col>
          )}
          {partIndex < parts.length - 1 && (
            <Input
              className={styles.exerciseInput}
              ref={inputRef}
              style={{
                maxWidth: isShortExercise ? "18%" : "60%",
                color: "#000000",
                margin: "1em",
              }}
              value={
                answerValue[currentTaskId]
                  ? answerValue[currentTaskId][partIndex] || ""
                  : ""
              }
              onChange={(e) => onInputChange(e, currentTaskId, partIndex)}
              placeholder="Antwort..."
            />
          )}
        </React.Fragment>
      ))}
    </Flex>
  );
};

export default TaskInputs;
