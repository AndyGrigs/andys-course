import { Layout as AntLayout } from "antd";
import styles from "./index.module.scss";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div className={styles.layout}>
      <AntLayout.Content>{children}</AntLayout.Content>
    </div>
  );
}

export default Layout;
