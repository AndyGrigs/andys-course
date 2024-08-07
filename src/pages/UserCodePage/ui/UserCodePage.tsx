import { Card } from "antd";
import { Link, useLocation } from "react-router-dom";
import style from "./code.module.scss";

const UserCodePage = () => {
  const location = useLocation();
  const { fullName, code } = location.state;

  if (!code) {
    return <div>Нема коду...</div>;
  }

  return (
    <Card className={style.code} title={`Привіт ${fullName}!`}>
      <div style={{ textAlign: "center" }}>
        <h3>Запиши свій код!</h3>
        <h1>{code}</h1>

        <Link to="/modules">Start!</Link>
      </div>
    </Card>
  );
};
export default UserCodePage;
