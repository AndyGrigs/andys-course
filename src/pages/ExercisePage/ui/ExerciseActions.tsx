import { Button, Flex, Image } from "antd";

interface ExerciseActionsProps {
  image?: string;
  allInputsEmpty: boolean;
  isAnswerChecked: boolean;
  onNext: () => void;
}

const ExerciseActions = ({
  image,
  allInputsEmpty,
  isAnswerChecked,
  onNext,
}: ExerciseActionsProps) => {
  return (
    <Flex
      vertical={true}
      align="center"
      justify="center"
      style={{ marginTop: "2.5em" }}
    >
      {image && (
        <div style={{ marginBottom: "2em" }}>
          <Image width={90} height={90} src={image} />
        </div>
      )}
      <Button
        style={{ marginBottom: "2em" }}
        type="primary"
        disabled={allInputsEmpty}
        onClick={onNext}
      >
        {isAnswerChecked ? "Наступне Завдання" : "Перевірити відповідь"}
      </Button>
    </Flex>
  );
};

export default ExerciseActions;
