import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivatRoute";
import { Auth } from "../features/authLoader";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import { Login } from "../pages/Login";
import { Registration } from "../pages/Registration";
import ModuleExercises from "../pages/ModuleExercises";

export const AppRouter: React.FC = () => {
  return (
    <Auth>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        {/* <Route path="/dashboard" element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
          <Route
            path="/module/:moduleId/exercises"
            element={<ModuleExercises />}
          />
        </Route>  */}

        <Route path="" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="module/:moduleId/exercises"
            element={<ModuleExercises />}
          />
        </Route>
        {/* <Route
          path="module/:moduleId/exercises"
          element={<ModuleExercises />}
        /> */}
      </Routes>
    </Auth>
  );
};
