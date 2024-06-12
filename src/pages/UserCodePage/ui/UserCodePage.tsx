import { Card } from "antd";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../../../app/providers/ThemeAntdProvider";
import { useContext } from "react";

const UserCodePage = () => {
  const location = useLocation();
  const { fullName, code } = location.state;
  const { theme } = useContext(ThemeContext);

  if (!code) {
    return <div>Нема коду...</div>;
  }

  return (
    <Card
      title={`Привіт ${fullName}!`}
      style={
        theme === "dark"
          ? { background: "#5585b5", border: "none" }
          : { background: "#fff" }
      }
    >
      <div style={{ textAlign: "center" }}>
        <h3>Запиши свій код!</h3>
        <h1>{code}</h1>

        <Link to="/modules">Start!</Link>
      </div>
    </Card>
  );
};
export default UserCodePage;
