// src/pages/TaskPage.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useCheckAnswer from '../../../hooks/useCheckAnswers';
import { useGetOneExercisesQuery } from '../../../redux/services/exersiceApi';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

interface TaskPageProps {
  exerciseId: string;
  taskIndex: number;
}

const TaskPage: React.FC<TaskPageProps> = ({ exerciseId, taskIndex }) => {
  const { data: exercise } = useGetOneExercisesQuery(exerciseId);
  const [answerValue, setAnswerValue] = useState<{ [key: string]: string[] }>({});
  const [resultMessage, setResultMessage] = useState('');

  // Assuming you have a function to check the answer
  const checkAnswer = (taskId: string, answer: string) => {
    // Implement your logic to check the answer
    return true; // Placeholder return value
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, taskId: string) => {

  };

  const handleCheckAnswer = () => {

  };

  if (!exercise) {
    return <div>Loading...</div>;
  }

  const currentTask = exercise.tasks[taskIndex];

  return (
    <div>
      <h1>{currentTask.title}</h1>
      <p>{currentTask.description}</p>
      <input
        value={answerValue[currentTask._id] || ''}
        onChange={(e) => handleInputChange(e, currentTask._id)}
        placeholder="Your answer..."
      />
      <button onClick={handleCheckAnswer}>Check!</button>
      {resultMessage && <div>{resultMessage}</div>}
    </div>
  );
};

export default TaskPage;


