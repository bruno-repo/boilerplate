import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";
import LoadingPage from "@/pages/LoadingPage";

const ProtectedRoute = () => {
  const { isAuthenticated, isInitialized } = useAuth();
  const location = useLocation();

  // Show loading while authentication is initializing
  if (!isInitialized) {
    return <LoadingPage />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render child routes if authenticated
  return <Outlet />;
};

export default ProtectedRoute;
