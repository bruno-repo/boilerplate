import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense } from "react";

import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { queryClient } from "@/lib/react-query";
import LoadingPage from "@/pages/LoadingPage";
import { AuthProvider } from "@/providers/AuthProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import AppRoutes from "@/routes/AppRoutes";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="auth-theme">
        <AuthProvider>
          <Suspense fallback={<LoadingPage />}>
            <AppRoutes />
          </Suspense>
          <Toaster />
          <SonnerToaster position="top-right" />
        </AuthProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
