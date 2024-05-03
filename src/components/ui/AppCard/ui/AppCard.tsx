import { Card } from "antd";
import style from "./AppCard.module.scss";
import { ReactNode, useContext } from "react";
import { ThemeContext } from "../../../../hooks/ThemeProvider";

export const AppCard = ({ children }: { children: ReactNode }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Card className={theme === "dark" ? "card-dark" : "card-light"}>
      {children}
    </Card>
  );
};
