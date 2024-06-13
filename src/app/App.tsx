// import './styles/index.scss';
import styles from "../app/styles/app.module.scss";
import { Header } from "../components/Header";
import { Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { AppRouter } from "./routes/Router";

import { Breadcrumbs } from "../components/Breadcrumps/Breadcrumps";
import { Divider } from "antd/lib";
import { AppCard } from "../components/ui/AppCard/ui/AppCard";
import { classNames } from "../shared/helpers/classNames";
import ThemeToggle from "./theme/ThemeToggle";
import { useTheme } from "./theme/ThemeContext";
import { useEffect } from "react";

//36853
function App() {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div >
      <Header />
      <div style={{ width: "80%", margin: "1em auto" }}>
          <Breadcrumbs />
        </div>
        <Divider/>
      <div className="content-page">
        <AppRouter />
        
      </div>
    </div>
    // <div className={styles.globalWrapper}>
    //   <Header />
    //   <div className={theme === "dark" ? styles.appBlack : styles.appLight}></div>
    //   <main className={styles.container}>
      
    //     <Divider />
    //     <div className="content-page">
    //       <AppRouter />
    //     </div>
    //   </main>
    // </div>
  );
}

export default App;
