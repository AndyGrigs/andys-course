import "./App.css";
import { Header } from "./components/Header";
import { Layout, Breadcrumb } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { AppRouter } from "./routes/Router";
import { useContext } from "react";

import { ThemeContext } from "./hooks/ThemeProvider";
import TopNav from "./components/Header/topNav/HeaderMenu";
import AppSidebar from "./components/sidebar";
import { Breadcrumbs } from "./components/Breadcrumps/Breadcrumps";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Divider } from "antd/lib";

function App() {
  // const { theme, toggleTheme } = useTheme();
  // const [theme, setTheme] = useState("light");

  // const darkTheme = {
  //   colorPrimary: "#121212",
  //   colorTextBase: "lightgrey",
  // };
  // const lightTheme = {
  //   colorPrimary: "black",
  //   colorTextBase: " #474040",
  // };

  // const handleTheme = (theme: string) => setTheme(theme);
  //handleTheme={handleTheme} theme={theme}
  const { theme } = useContext(ThemeContext);

  return (
    <>
      {/* <ConfigProvider
        theme={{
          token: theme === "light" ? lightTheme : darkTheme,
        }}
      > */}
      <Layout style={{ minHeight: "100vh" }}>
        {/* <AppSidebar /> */}
        <Layout
          className={theme === "dark" ? "layout-dark" : "layout-light"}
          style={{ minHeight: "100vh" }}
        >
          <Header />
          <Content>
            <div style={{ width: "80%", margin: "1em auto" }}>
              <Breadcrumbs />
            </div>
            <Divider/>
            <AppRouter />
            <div className="site-layout-background"></div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Deutsch_course©2024 Created by Andriy Grygorov
          </Footer>
        </Layout>
      </Layout>
      {/* </ConfigProvider> */}
    </>
  );
}

export default App;
