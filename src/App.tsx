import "./App.css";
import { Header } from "./components/Header";
import { Layout, Breadcrumb, Space, Switch } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { AppRouter } from "./routes/Router";
import AppSidebar from "./components/sidebar";
import { useState } from "react";
import { ConfigProvider } from "antd";

function App() {
  const [theme, setTheme] = useState("light");

  const darkTheme = {
    colorPrimary: "lightblue",
    colorTextBase: "lightblue",
  };
  const lightTheme = {
    colorPrimary: "black",
    colorTextBase: " #474040",
  };

  const handleTheme = (theme: string) => setTheme(theme);

  return (
    <>
      <ConfigProvider
        theme={{
          token: theme === "light" ? lightTheme : darkTheme,
        }}
      >
        <Layout style={{ minHeight: "100vh" }}>
          {/* <AppSidebar /> */}
          <Layout
            className={theme === "dark" ? "layout-dark" : "layout-light"}
            style={{ minHeight: "100vh" }}
          >
            <Header handleTheme={handleTheme} theme={theme} />
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
      </ConfigProvider>
    </>
  );
}

export default App;
