import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetOneExercisesQuery } from '../../redux/services/exersiceApi';
import { Loader } from '../../components/Loader';
import { Row, Col, Input, Button } from 'antd';

interface Answer {
    id: string;
    value: string;
}

export const ExercisePage1: React.FC = () => {
    const { exerciseId } = useParams<{ exerciseId: string }>();
    const [answerValue, setAnswerValue] = useState<Answer[]>([]);
    const {
        data: exercise,
        isLoading,
        isError,
    } = useGetOneExercisesQuery(exerciseId);

    if (isLoading) {
        return <Loader />;
    }

    if (isError || !exercise) {
        return <div>Error loading exercise</div>;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
        const newAnswer = { id, value: e.target.value };
        setAnswerValue(prev => {
            const existingAnswer = prev.find(answer => answer.id === id);
            if (existingAnswer) {
                return prev.map(answer => answer.id === id ? newAnswer : answer);
            } else {
                return [...prev, newAnswer];
            }
        });
    };
    console.log(answerValue)
    const checkAnswer = (taskId: string) => {
        const task = exercise.tasks.find(t => t._id === taskId);
        if (!task) {
            console.error("Task not found");
            return;
        }

        const userAnswer = answerValue.find(answer => answer.id === taskId)?.value || "";
        // Assuming task.solution is an array of correct answers
        const isCorrect = task.solution.includes(userAnswer.trim());

        console.log(`Answer for task ${taskId} is ${isCorrect ? "correct" : "incorrect"}`);
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
                            gutter={3}
                            align="middle"
                            style={{ marginBottom: "10px" }}
                        >
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
                                                style={{ maxWidth: "50%" }}
                                                onChange={(e) =>
                                                    handleInputChange(e, task._id)
                                                }
                                                placeholder="Enter your answer..."
                                            />
                                        </Col>
                                    )}
                                </React.Fragment>
                            ))}
                            <Col>
                                <Button onClick={() => checkAnswer(task._id)}>
                                    Check!
                                </Button>
                            </Col>
                        </Row>
                    );
                })}
        </div>
    )
}
