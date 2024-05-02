import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Flex, Alert, Button } from "antd";
import { Space } from "antd";
interface ResultMessageProp {
  resultMessage: string;
}

function ResultMessage({ resultMessage }: ResultMessageProp) {
  return (
    <Flex justify="center">
      <div
        style={{
          position: "absolute",
          alignItems: "center",
          margin: "auto",
          //   top: 0,
          //   right: 0,
          //   left: 0,
          //   bottom: 0,
          zIndex: 1000,
          opacity: resultMessage ? 1 : 0,
          transition: "opacity  0.5s",
        }}
      >
        {resultMessage === "Correct!" ? (
          <Alert
            message="Success Tips"
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
            message=""
            showIcon
            description="Du hast unrichtig gemacht!    "
            type="error"
            action={
              <Button size="small" danger>
                Detail
              </Button>
            }
            closable
          />
        ) : null}
      </div>
    </Flex>
  );
}

export default ResultMessage;
