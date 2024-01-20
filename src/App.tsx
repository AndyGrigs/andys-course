import "./App.css";
import { Header } from "./components/Header";
import { Routes, Route, } from "react-router-dom";
import { Login } from "./pages/Login";
import { Registration } from "./pages/Registration";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { Auth } from "./features/authLoader";
import { Layout, Menu, Breadcrumb } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer } from "antd/es/layout/layout";
import PrivateRoute from "./components/PrivatRoute";
import { AppRouter } from "./routes";
import AppSidebar from "./components/sidebar";

function App() {

  return (
    <>
      {/* <Header /
      */}
      <Layout style={{ minHeight: '100vh' }}>
        <AppSidebar />
        <Layout className="site-layout">
          <Header />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {/* <Breadcrumb.Item>Student</Breadcrumb.Item>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item> */}
            </Breadcrumb>
            <AppRouter />
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Deutsch_course©2024 Created by Andriy Grygorov
          </Footer>
        </Layout>
      </Layout>


    </>
  );
}

export default App;
