// src/components/ResultsModal.tsx
import React from 'react';
import { Button, Descriptions, Modal, Typography } from 'antd';
const { Title } = Typography;

interface ResultsModalProps {
    visible: boolean;
    onClose: () => void;
    userResults: object;
   
    onHandleExerciseList: () => void;
}

const ResultsModal: React.FC<ResultsModalProps> = ({ visible, onClose, userResults, onHandleExerciseList }) => {

    return (
        <Modal
            title="Your Results"
            open={visible}
            onCancel={onClose}
            footer={null}
        >
            <Title level={4}>Your results are:</Title>

            <Descriptions column={1} bordered>
                {Object.entries(userResults).map(([key, value]) => (
                    <Descriptions.Item key={key} label={key}>{value}</Descriptions.Item>
                ))}
            </Descriptions>
            <div style={{ marginTop: '20px' }}>
                <Button type="primary" style={{ marginLeft: '10px' }} onClick={onHandleExerciseList}>
                    Займатись далі
                </Button>
            </div>
        </Modal>
    );
};

export default ResultsModal;