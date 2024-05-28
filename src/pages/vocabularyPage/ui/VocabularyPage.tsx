import React, { useContext, useState } from 'react';
import { List, Card, Radio, Button, message } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { useSelector } from 'react-redux';
import { selectCurrentModule } from '../../../redux/slices/moduleSlice';
import { ThemeContext } from '../../../hooks/ThemeProvider';
import { selectUser, updateLokalUserPoints } from '../../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useUpdateUserPointsMutation } from '../../../redux/services/pointsApi';

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
  const module = useSelector(selectCurrentModule);
  const vocabulary = module?.vocabulary;
  const { theme } = useContext(ThemeContext);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [updatePoints] = useUpdateUserPointsMutation();




  const handleOptionChange = (word: string, option: string) => {
    setAnswers({
    ...answers,
      [word]: option
    });
  };

  const handleSubmitForItem = (word: string) => {
    const answer = answers[word];
    if (answer === vocabulary?.find(item => item.word === word)?.correctAnswer && user) {
      message.success(`Correct answer for "${word}"`);
      let points: number = user.points;
      points += 1;
      const payload: UpdatePointsPayload = {
        userId: user._id, 
        points: points,
      };
      dispatch(updateLokalUserPoints(payload))
      try {
        updatePoints({ userId: user?._id, points });
      } catch (error) {
        console.log(error);
      }
    } else {
      message.error(`Wrong answer for "${word}". Correct is "${vocabulary?.find(item => item.word === word)?.correctAnswer}".`);
    }
  };

  return (
    <List
      grid={{ gutter: 16, column: 1 }}
      dataSource={vocabulary}
      renderItem={(item: VocabularyItem) => (
        <List.Item key={item.word}>
          <Card
           className={theme === "dark" ? "card-dark" : "card-light"}
          style={{ width: '50%', margin: 'auto' }}>
            <div><strong>{item.word}</strong></div>
            <Radio.Group 
              onChange={(e: RadioChangeEvent) => handleOptionChange(item.word, e.target.value)}
              value={answers[item.word]}
            >
              {item.options.map(option => (
                <Radio key={option.answer} value={option.answer}>{option.answer}</Radio>
              ))}
            </Radio.Group>
            {/* <Button type="primary" onClick={() => handleSubmitForItem(item.word)} style={{ marginTop: 8 }}>
              Submit
            </Button> */}
             {/* {Object.keys(answers).length > 0 && (
              <Button type="primary" onClick={() => handleSubmitForItem(item.word)} style={{ marginTop: 8 }}>
                Submit
              </Button>
            )} */}
              {answers[item.word] && (
              <Button type="primary" onClick={() => handleSubmitForItem(item.word)} style={{ marginTop: 8 }}>
                Check!
              </Button>
            )}
          </Card>
        </List.Item>
      )}
    >
    </List>
  );
};

export default VocabularyPage;