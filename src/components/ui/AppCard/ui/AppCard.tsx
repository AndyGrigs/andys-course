import { Card } from "antd";
import style from "./AppCard.module.scss";

export const AppCard = ({ children }) => {
  return (
    <Card
      className={`${style.header} ${
        theme === "dark" ? style.dark : style.light
      }`}
    >
      {children}
    </Card>
  );
};
