import React, { useState } from "react";
import { List, Card, Radio, message } from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentModule } from "../../../redux/slices/moduleSlice";
import { selectUser, updateLokalUserPoints } from "../../../redux/slices/authSlice";
import { useUpdateUserPointsMutation } from "../../../redux/services/pointsApi";
import styles from "./VocabularyPage.module.scss";

interface VocabularyItem {
  word: string;
  translation: string;
  instruction: string;
  correctAnswer: string;
  options: { answer: string }[];
}

interface UpdatePointsPayload {
  userId: string;
  points: number;
}

interface VocabularyPageProps {}

const VocabularyPage: React.FC<VocabularyPageProps> = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [answeredQuestions, setAnsweredQuestions] = useState<Record<string, boolean>>({});
  const module = useSelector(selectCurrentModule);
  const vocabulary = module?.vocabulary;
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [updatePoints] = useUpdateUserPointsMutation();

  const handleOptionChange = (word: string, option: string) => {
    const newAnswers = {
      ...answers,
      [word]: option,
    };
    setAnswers(newAnswers);
    checkAnswer(word, option);
    setAnsweredQuestions({
      ...answeredQuestions,
      [word]: true,
    });
  };

  const checkAnswer = (word: string, selectedOption: string) => {
    const correctAnswer = vocabulary?.find((item) => item.word === word)?.correctAnswer;

    if (selectedOption === correctAnswer && user) {
      message.success(`Correct answer for "${word}"`);
      const points = user.points + 1; // Increment user's points
      const payload: UpdatePointsPayload = {
        userId: user._id,
        points: points,
      };
      dispatch(updateLokalUserPoints(payload));
      try {
        updatePoints({ userId: user?._id, points });
      } catch (error) {
        console.error(error); 
      }
    } else {
      message.error(`Wrong answer for "${word}". Correct is "${correctAnswer}"`);
    }
  };

  return (
    <List
      grid={{ gutter: 16, column: 1 }}
      dataSource={vocabulary}
      renderItem={(item: VocabularyItem) => (
        <List.Item key={item.word}>
          <Card className={styles.card} style={{ width: "50%", margin: "auto" }}>
            <div>
              <strong>{item.word}</strong>
            </div>
            <Radio.Group
              onChange={(e: RadioChangeEvent) => handleOptionChange(item.word, e.target.value)}
              value={answers[item.word]}
              disabled={answeredQuestions[item.word]}
            >
              {item.options.map((option) => (
                <Radio key={option.answer} value={option.answer}>
                  {option.answer}
                </Radio>
              ))}
            </Radio.Group>
          </Card>
        </List.Item>
      )}
    ></List>
  );
};

export default VocabularyPage;
