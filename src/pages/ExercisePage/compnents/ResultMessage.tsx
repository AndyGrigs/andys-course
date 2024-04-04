// src/components/ResultMessage.tsx
import React from 'react';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

interface ResultMessageProps {
    resultMessage: string;
}

const ResultMessage: React.FC<ResultMessageProps> = ({ resultMessage }) => {
    console.log('ResultMessage is rendering', resultMessage);
    return (
        <div
            style={{
                position: "absolute",
                top: "17em",
                right: "7em",
                zIndex: 1000,
                opacity: resultMessage ? 1 : 0,
                transition: "opacity 0.5s",
            }}
        >
            {resultMessage === "Correct!" ? (
                <CheckCircleOutlined style={{ color: "green", fontSize: "96px" }} />
            ) : resultMessage === "Incorrect." ? (
                <CloseCircleOutlined style={{ color: "red", fontSize: "96px" }} />
            ) : null}
        </div>
    );
};

export default ResultMessage;