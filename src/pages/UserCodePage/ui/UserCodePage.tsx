import { Card } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { AppButton } from "../../../components/ui/button";

const UserCodePage = () => {
  const location = useLocation();
  const { code } = location.state || {};
  const navigate = useNavigate();

  if (!code) {
    return <div>No code provided.</div>;
  }

  const handleNavigation = () => {
    navigate("/dashboard");
  };

  return (
    <Card title={`Gratuliere!`} style={{ width: "30rem", margin: "20px auto" }}>
      <div style={{ textAlign: "center" }}>
        <h3>Trage dein code ins Heft ein!</h3>
        <h1>{code}</h1>
      </div>

      <AppButton onClick={handleNavigation}>Let's go!</AppButton>
    </Card>
  );
};
export default UserCodePage;
