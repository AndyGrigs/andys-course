import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

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
    border: '1px solid darkgreen',
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    opacity: 1,
    transition: "opacity 0.5s",
    width: "200px",
  };

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <div style={{ ...(alertStyle as any) }}>
      {type === "success" ? (
        <CheckCircleOutlined />
      ) : type === "error" ? (
        <ExclamationCircleOutlined />
      ) : null}
      <span style={{marginLeft: ".5em"}}>{message}</span>
    </div>
  );
};

function ResultMessage({ resultMessage, correctAnswer }: ResultMessageProp) {
  return (
  
      <div
        style={{
          position: "absolute",
          top: "65%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          opacity: resultMessage ? 1 : 0,
          transition: "opacity  0.5s",
          
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
   
  );
}

export default ResultMessage;
