import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "@/hooks/use-auth";
import { Header } from "./Header";

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center py-10 px-4">
        <Outlet />
      </main>
      <footer className="border-t py-6 bg-muted/40">
        <div className="container flex justify-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Pro React Boilerplate
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
