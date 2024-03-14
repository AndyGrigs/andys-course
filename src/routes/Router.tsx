import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "../components/PrivatRoute";
import { Auth } from "../features/authLoader";
import { ModulePage } from "../pages/ModulePage";
import { Login } from "../pages/Login";
import { Registration } from "../pages/Registration";
import { HomePage } from "../pages/Home";
import { ModuleExercises } from "../pages/ModuleExercises";
import { ExerciseDetailsPage } from "../pages/ExercisePage";

export const AppRouter: React.FC = () => {
  return (
    <Auth>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        <Route path="" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<ModulePage />} />
          <Route
            path="module/:moduleId/exercises"
            element={<ModuleExercises />}
          />
          {/* <Route
            path="module/:moduleId/exercises/:exerciseId"
            element={<ExercisePage />}
          /> */}
          <Route
            path="module/:moduleId/exercises/:exerciseId"
            element={<ExerciseDetailsPage />}
          />
        </Route>
      </Routes>
    </Auth>
  );
};
