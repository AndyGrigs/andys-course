import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "../components/PrivatRoute";
import { Auth } from "../features/authLoader";
import { ModulePageAsync } from "../pages/ModulePage";
import { LoginPageAsync } from "../pages/Login";
import { RegistrationPageAsync } from "../pages/Registration";
import { HomePageAsync } from "../pages/Home";
import { ModuleExercisesPageAsync } from "../pages/ModuleExercises";
import { ExercisePageAsync } from "../pages/ExercisePage";
import { Suspense } from "react";
import { UpdateCodePageAsync } from "../pages/UpdateCodePage";
import { UserCodePageAsync } from "../pages/UserCodePage";
import { Loader } from "../components/Loader";
import { TextPageAsync } from "../pages/TextPage";
import { VocabularyPageAsync } from "../pages/vocabularyPage";

export const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<Loader/>}>
      <Auth>
        <Routes>
          <Route path="/" element={<HomePageAsync />} />
          <Route path="/login" element={<LoginPageAsync />} />
          <Route path="/register" element={<RegistrationPageAsync />} />
          <Route path="/register-update" element={<UpdateCodePageAsync />} />
          <Route path="/user-code" element={<UserCodePageAsync />} />
          <Route path="" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<ModulePageAsync />} />
            <Route
              path="module/:moduleId/exercises"
              element={<ModuleExercisesPageAsync />}
            />
            <Route
              path="module/:moduleId/text"
              element={<TextPageAsync />}
            />
            <Route
            path="module/:moduleId/vocabulary"
            element={<VocabularyPageAsync />}
          />
            <Route
              path="module/:moduleId/exercises/:exerciseId"
              element={<ExercisePageAsync />}
            />
          </Route>
        </Routes>
      </Auth>
    </Suspense>
  );
};
