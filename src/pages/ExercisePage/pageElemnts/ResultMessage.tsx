import { Flex, Alert, Button} from "antd";

interface ResultMessageProp {
  resultMessage: string;
  correctAnswer: string;
}

function ResultMessage({ resultMessage, correctAnswer }: ResultMessageProp) {
  return (
    <Flex justify="center">
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          opacity: resultMessage ? 1 : 0,
          transition: "opacity  0.5s",
        }}
      >
        {resultMessage === "Correct!" ? (
          <Alert
            message="Richtig!"
            type="success"
            showIcon
            action={
              <Button size="small" type="text">
                Weiter
              </Button>
            }
            closable
          />
        ) : resultMessage === "Incorrect. Try again." ? (
          <Alert
            message={`Richtig ist:  ${correctAnswer}`}
            showIcon
           
            type="error"
            closable
          />
        ) : null}
      </div>
    </Flex>
  );
}

export default ResultMessage;
