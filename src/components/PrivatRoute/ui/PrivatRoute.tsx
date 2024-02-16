import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../../../redux/slices/authSlice"; // Update the path as necessary

const PrivateRoute: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
