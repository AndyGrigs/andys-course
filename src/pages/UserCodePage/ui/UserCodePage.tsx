import { Card } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { AppButton } from "../../../components/ui/button";
import { ThemeContext } from "../../../hooks/ThemeProvider";
import { useContext } from "react";

const UserCodePage = () => {
  const location = useLocation();
  const { fullName, code } = location.state;
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  if (!code) {
    return <div>Нема коду...</div>;
  }

  const handleNavigation = () => {
    navigate("/login");
  };

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
        <h3>Запиши свій новий код!</h3>
        <h1>{code}</h1>
        <AppButton type="primary" onClick={handleNavigation}>
          Увійти з новим кодом
        </AppButton>
      </div>
    </Card>
  );
};
export default UserCodePage;
