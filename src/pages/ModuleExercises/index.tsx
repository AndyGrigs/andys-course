import { lazy } from "react";

export const ModuleExercisesPageAsync = lazy(
  () => import("./ui/ModuleExercises")
);
