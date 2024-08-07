import { Card } from "antd";
import { Link, useLocation } from "react-router-dom";
import style from "./code.module.scss";
import { useTranslation } from 'react-i18next';

const UserCodePage = () => {
  const location = useLocation();
  const { fullName, code } = location.state;
  const {t} = useTranslation()

  if (!code) {
    return <div>{t("noCode")}</div>;
  }

  return (
    <Card className={style.code} title={`${t("greeting")} ${fullName}!`}>
      <div style={{ textAlign: "center" }}>
        <h3>{t("enterYourCode")}</h3>
        <h1>{code}</h1>

        <Link to="/modules">{t("start")}</Link>
      </div>
    </Card>
  );
};
export default UserCodePage;
