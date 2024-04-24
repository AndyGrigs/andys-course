import { lazy } from "react";

export const RegistrationPageAsync = lazy(() => import("./ui/Registration"));
export const ReRegistrationPageAsync = lazy(
  () => import("./ui/ReRegistration")
);
