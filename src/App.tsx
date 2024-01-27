import "./App.css";
import { Header } from "./components/Header";
import { Layout, Breadcrumb } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
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
