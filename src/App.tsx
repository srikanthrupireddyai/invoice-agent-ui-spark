
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import SigninPage from "./pages/SigninPage";
import Dashboard from "./pages/Dashboard";
import VerifyAccountPage from "./pages/VerifyAccountPage";
import ZohoCallback from "./pages/ZohoCallback";

const queryClient = new QueryClient();

const App = () => {
  console.log('App: Rendering app with direct routes');
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/verify-account" element={<VerifyAccountPage />} />
            <Route path="/callback" element={<ZohoCallback />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
