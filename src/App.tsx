import { Container } from "@mui/material";
import "./App.css";
import { Header } from "./components/Header";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Registration } from "./pages/Registration";
import Home from "./pages/Home";
import Dashboard from "./components/Dashboard";
import module from "./assets/module.json";

function App() {
  return (
    <>
      <Header />
      {/* <Dashboard module={module} /> */}
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/posts/:id" element={<FullPost />}/> */}
          {/* <Route path="/add-post" element={<AddPost />}/> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
