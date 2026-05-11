import { Divider, Progress, Typography } from "antd";

const { Title } = Typography;

interface ExerciseHeaderProps {
  exerciseNumber: string | number;
  instruction: string;
  example: string;
  progressPercent: number;
}

const ExerciseHeader = ({
  exerciseNumber,
  instruction,
  example,
  progressPercent,
}: ExerciseHeaderProps) => {
  return (
    <>
      <Title level={5}>
        {String(exerciseNumber)[0]}. {instruction}
      </Title>
      <Typography.Paragraph>{example}</Typography.Paragraph>
      <Divider />
      <p style={{ maxWidth: "80%", margin: "0 auto" }}>
        <Progress percent={Math.round(progressPercent)} status="active" />
      </p>
      <Divider />
    </>
  );
};

export default ExerciseHeader;
