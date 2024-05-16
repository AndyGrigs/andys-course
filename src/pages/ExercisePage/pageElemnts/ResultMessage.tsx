import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Flex, Alert, Button, message } from "antd";
import { Space } from "antd";
interface ResultMessageProp {
  resultMessage: string;
  correctAnswer: string;
}

function ResultMessage({ resultMessage, correctAnswer }: ResultMessageProp) {
  return (
    // <>
    //   {resultMessage === "Correct!"? (
    //     message.success(`Success Correct answer is: ${correctAnswer}`, 5, () => {
    //       // You can add any action you want to perform after the message is closed
    //     })
    //   ) : resultMessage === "Incorrect. Try again."? (
    //     message.error(`Incorrect. Try again. Correct answer is: ${correctAnswer}`, 5, () => {
    //       // You can add any action you want to perform after the message is closed
    //     })
    //   ) : null}
    // </>
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
            // description="Du hast unrichtig gemacht!    "
            type="error"
            // action={
            //   <Button size="small" danger>
            //     Detail
            //   </Button>
            // }
            closable
          />
        ) : null}
      </div>
    </Flex>
  );
}

export default ResultMessage;
