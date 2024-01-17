import "./App.css";
import { Header } from "./components/Header";
import { Routes, Route, } from "react-router-dom";
import { Login } from "./pages/Login";
import { Registration } from "./pages/Registration";
import Home from "./pages/Home";
import Dashboard from "./components/Dashboard";
import { Auth } from "./features/authLoader";
import { Layout, Menu, Breadcrumb } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer } from "antd/es/layout/layout";

function App() {

  return (
    <>
      {/* <Header /
      */}
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            {/* <Menu.Item key="1">
            </Menu.Item> */}
            {/* Additional menu items can be added here */}
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Student</Breadcrumb.Item>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>

              <Auth>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Registration />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
              </Auth>

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
