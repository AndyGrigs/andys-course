import { Card } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { AppButton } from "../../../components/ui/button";

const UserCodePage = () => {
  const location = useLocation();
  const { fullName, code } = location.state;
  console.log(code);
  const navigate = useNavigate();

  if (!code) {
    return <div>No code provided.</div>;
  }

  const handleNavigation = () => {
    navigate("/dashboard");
  };

  return (
    <Card
      title={`Hallo ${fullName}!`}
      style={{ width: "30rem", margin: "20px auto" }}
    >
      <div style={{ textAlign: "center" }}>
        <h3>Trage dein code ins Heft ein!</h3>
        <h1>{code}</h1>
      </div>

      <AppButton onClick={handleNavigation}>Let's go!</AppButton>
    </Card>
  );
};
export default UserCodePage;
