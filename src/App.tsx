import "./App.css";
import { Header } from "./components/Header";
import { Routes, Route, RouterProvider, Router } from "react-router-dom";
import { Login } from "./pages/Login";
import { Registration } from "./pages/Registration";
import Home from "./pages/Home";
import { router } from "./router";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
      {/* <Routes>
        <RouterProvider router={router} />
      </Routes> */}
    </>
  );
}

export default App;
