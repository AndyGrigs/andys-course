import React, { useState } from 'react';
import { List, Card, Radio, Button, message } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import { useSelector } from 'react-redux';
import { selectCurrentModule } from '../../../redux/slices/moduleSlice';

interface VocabularyItem {
  word: string;
  translation: string;
  instruction: string;
  correctAnswer: string;
  options: { answer: string }[];
}

interface VocabularyPageProps {
  // Removed the vocabulary prop since we're fetching it directly from the store
}

const VocabularyPage: React.FC<VocabularyPageProps> = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const module = useSelector(selectCurrentModule);
  const vocabulary = module?.vocabulary;

  const handleOptionChange = (word: string, option: string) => {
    setAnswers({
    ...answers,
      [word]: option
    });
  };

  const handleSubmitForItem = (word: string) => {
    const answer = answers[word];
    if (answer === vocabulary?.find(item => item.word === word)?.correctAnswer) {
      message.success(`Correct answer for "${word}"`);
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
          <Card title={item.instruction} style={{ width: '50%', margin: 'auto' }}>
            <div><strong>{item.word}</strong></div>
            <Radio.Group 
              onChange={(e: RadioChangeEvent) => handleOptionChange(item.word, e.target.value)}
              value={answers[item.word]}
            >
              {item.options.map(option => (
                <Radio key={option.answer} value={option.answer}>{option.answer}</Radio>
              ))}
            </Radio.Group>
            <Button type="primary" onClick={() => handleSubmitForItem(item.word)} style={{ marginTop: 8 }}>
              Submit
            </Button>
          </Card>
        </List.Item>
      )}
    >
    </List>
  );
};

export default VocabularyPage;