// import './styles/index.scss';
import { Header } from "../components/Header";
import { AppRouter } from "./routes/Router";

import { Breadcrumbs } from "../components/Breadcrumps/Breadcrumps";
import { Divider } from "antd/lib";
import { useTheme } from "./theme/ThemeContext";
import { useEffect } from "react";

//42181
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
      <section className="content-page">
        <AppRouter />
      </section>
    </div>
  );
}

export default App;
