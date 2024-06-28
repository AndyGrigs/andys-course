import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Flex } from "antd";

interface ResultMessageProp {
  resultMessage: string;
  correctAnswer: string;
}

interface CustomAlertProps {
  message: string;
  type: "success" | "error";
  isVisible: boolean;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  message,
  type,
  isVisible,
}) => {
  if (!isVisible) return null;

  const alertStyle = {
    position: "relative",
    bottom: "auto",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1000,
    backgroundColor: type === "success" ? "#d4edda" : "#f8d7da",
    color: type === "success" ? "#155724" : "#721c24",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    opacity: 1,
    transition: "opacity 0.5s",
    width: "300px",
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <div style={{ ...(alertStyle as any) }}>
      {type === "success" ? (
        <CheckCircleOutlined />
      ) : type === "error" ? (
        <ExclamationCircleOutlined />
      ) : null}
      <span>{message}</span>
    </div>
  );
};

function ResultMessage({ resultMessage, correctAnswer }: ResultMessageProp) {
  return (
    <Flex justify="center">
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          opacity: resultMessage ? 1 : 0,
          transition: "opacity  0.5s",
          border: '1px solod white',
        }}
      >
        {resultMessage === "Correct!" ? (
          // <Alert
          //   message="Richtig!"
          //   type="success"
          //   showIcon
          //   action={
          //     <Button size="small" type="text">
          //       Weiter
          //     </Button>
          //   }
          //   closable
          // />

          <CustomAlert
            message="Gut gemacht!"
            type="success"
            isVisible={resultMessage === "Correct!"}
          />
        ) : resultMessage === "Incorrect. Try again." ? (
          // <Alert
          //   message={`Richtig ist:  ${correctAnswer}`}
          //   showIcon

          //   type="error"
          //   closable
          // />

          <CustomAlert
            message={`Richtig ist: ${correctAnswer}`}
            type="error"
            isVisible={resultMessage === "Incorrect. Try again."}
          />
        ) : null}
      </div>
    </Flex>
  );
}

export default ResultMessage;
