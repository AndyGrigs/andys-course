import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "../components/PrivatRoute";
import { Auth } from "../features/authLoader";
import { ModulePage } from "../pages/ModulePage";
import Home from "../pages/Home";
import { Login } from "../pages/Login";
import { Registration } from "../pages/Registration";
import { ModuleExercises } from "../pages/ModuleExercises";
import { ExercisePage } from "../pages/ExercisePage";

export const AppRouter: React.FC = () => {
  return (
    <Auth>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        <Route path="" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<ModulePage />} />
          <Route
            path="module/:moduleId/exercises"
            element={<ModuleExercises />}
          />
          <Route
            path="module/:moduleId/exercises/:exerciseId"
            element={<ExercisePage />}
          />
        </Route>
      </Routes>
    </Auth>
  );
};
