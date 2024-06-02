import "./App.css";
import { Header } from "./components/Header";
import { Layout } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { AppRouter } from "./routes/Router";
import { useContext } from "react";

import { ThemeContext } from "./hooks/ThemeProvider";
import { Breadcrumbs } from "./components/Breadcrumps/Breadcrumps";
import { Divider } from "antd/lib";
import { AppCard } from './components/ui/AppCard/ui/AppCard';


//13263
function App() {
  const { theme } = useContext(ThemeContext);

  return (
    // <>
    //   <Layout style={{ minHeight: "100vh" }}>
    //     <Layout
    //       className={theme === "dark" ? "layout-dark" : ""}
    //       style={{ minHeight: "100vh" }}
    //     >
    //       <Header />
    //       <Content>
    // <div style={{ width: "80%", margin: "1em auto" }}>
    //   <Breadcrumbs />
    // </div>
    //         <Divider/>
    //         <AppRouter />
    //         <div className="site-layout-background"></div>
    //       </Content>
    //       <Footer style={
    //     theme === "dark"
    //       ? { background: "#5585b5", color: '#fff', textAlign: 'center' }
    //       : { background: "#fff", textAlign: 'center' }
    //   }>
    //         Deutsch course©2024 Created by Andriy Grygorov
    //       </Footer>
    //     </Layout>
    //   </Layout>

    // </>

    <>
      <Header />
      <div style={{ width: "80%", margin: "1em auto" }}>
        <Breadcrumbs />
      </div>
      <Divider/>
      <AppRouter />
    </>
  );
}

export default App;

{/* <AppCard
        title="Custom Title"
        description="This is a custom description."
        buttonText="Click Me"
        buttonOnClick={() => alert('Button clicked')}
      >
        <p>This is custom content inside the AppCard.</p>
      </AppCard> */}