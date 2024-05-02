import "./App.css";
import { Header } from "./components/Header";
import { Layout, Breadcrumb } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { AppRouter } from "./routes/Router";
import { useState } from "react";
import { ConfigProvider } from "antd";
import { ThemeProvider } from "./hooks/ThemeProvider";

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
          // className={theme === "dark" ? "layout-dark" : "layout-light"}
          style={{ minHeight: "100vh" }}
        >
          <Header />
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              {/* <Breadcrumb.Item>Student</Breadcrumb.Item>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item> */}
            </Breadcrumb>
            <AppRouter />
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            ></div>
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
