import "./App.css";
import { Header } from "./components/Header";
import { Routes, Route, RouterProvider, Router } from "react-router-dom";
import { Login } from "./pages/Login";
import { Registration } from "./pages/Registration";
import Home from "./pages/Home";
import Dashboard from "./components/Dashboard";
import mod from "./assets/module.json";
import { Auth } from "./features/authLoader";

function App() {
  return (
    <>
      <Header />
      <Auth>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/dashboard" element={<Dashboard module={mod} />} />
        </Routes>
      </Auth>
    </>
  );
}

export default App;
