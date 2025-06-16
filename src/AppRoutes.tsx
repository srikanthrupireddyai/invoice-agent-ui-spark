import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import LoginPage from "./pages/LoginPage";
import VerifyAccountPage from "./pages/VerifyAccountPage";
import DiagnosticPage from "./pages/DiagnosticPage";
import { getCurrentUser } from "./services/authService";
import { useEffect, useState } from "react";

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = getCurrentUser();
  
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    // Wrap in try/catch to catch initialization errors
    try {
      console.log('AppRoutes: Initializing');
      // No need for async operation here, just set initialized
      setIsInitialized(true);
    } catch (err) {
      console.error('AppRoutes initialization error:', err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    }
  }, []);
  
  // Show error state if there was an error during initialization
  if (error) {
    return <div className="flex h-screen items-center justify-center flex-col gap-4">
      <div className="text-red-500 font-bold">Error initializing app</div>
      <div>{error.message}</div>
    </div>;
  }
  
  // Simple loading indicator while initializing
  if (!isInitialized) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  console.log('AppRoutes: Rendering routes');
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/verify-account" element={<VerifyAccountPage />} />
      <Route path="/diagnostic" element={<DiagnosticPage />} />
      <Route 
        path="/dashboard/*" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      {/* Redirect any other routes to landing page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
