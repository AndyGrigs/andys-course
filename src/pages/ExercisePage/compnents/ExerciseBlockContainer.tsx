import React, { useEffect, useRef, useState } from 'react';
import { Col, Flex, Input, InputRef } from 'antd';
import { ITask } from '../../../types';
import Paragraph from 'antd/es/typography/Paragraph';
import { useAnswerState } from '../hooks/useAnswerState';

interface ExerciseBlockProps {
    parts: string[];
    currentTask: ITask;
    getAnswer: (answerValue: Record<string, string[]>) => Record<string, string[]>;
}

const ExerciseBlocksContainer: React.FC<ExerciseBlockProps> = ({ parts, currentTask, getAnswer }) => {
    const inputRef = useRef<InputRef>(null);

    const { answerValue, handleInputChange } = useAnswerState();
    getAnswer(answerValue)




    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);
    return (
        <Flex justify="center" align="center" style={{ marginTop: '2.5em' }}>
            {parts.map((part, partIndex) => (
                <React.Fragment key={partIndex}>
                    <Col>
                        <Paragraph style={{ margin: '0 1em 0 1em', fontSize: '1.5em' }}>{part}</Paragraph>
                    </Col>

                    {partIndex < parts.length - 1
                        &&
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
                                    handleInputChange(currentTask._id, partIndex, e.target.value)
                                }
                                placeholder="Antwort..."
                            />
                        </Col>}
                </React.Fragment>

            ))}
        </Flex>
    );
};

export default ExerciseBlocksContainer;

