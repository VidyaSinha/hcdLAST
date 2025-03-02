import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NbaCriteria from "./pages/NbaCriteria";
import CriteriaFour from "./pages/CriteriaFour";
import EnrollmentDetails from "./pages/EnrollmentDetails";
import UploadDocuments from "./pages/UploadDocuments";
import SuccessRate from "./pages/SuccessRate";
import SuccessRateUpload from "./pages/SuccessRateUpload";
import SuccessRateNoBacklog from "./pages/SuccessRateNoBacklog";
import SuccessRateWithBacklog from "./pages/SuccessRateWithBacklog";
import AcademicPerformance from "./pages/AcademicPerformance";
import AcademicPerformanceUpload from "./pages/AcademicPerformanceUpload";
import PlacementDetails from "./pages/PlacementDetails";
import PlacementDetailsUpload from "./pages/PlacementDetailsUpload";
import NotFound from './NotFound';

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    if (path === "/dashboard") {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/nba-criteria" element={<NbaCriteria />} />
                <Route path="/criteria-four" element={<CriteriaFour />} />
                <Route path="/enrollment-details" element={<EnrollmentDetails />} />
                <Route path="/upload-documents" element={<UploadDocuments />} />
                <Route path="/success-rate" element={<SuccessRate />} />
                <Route path="/success-rate-upload" element={<SuccessRateUpload />} />
                <Route path="/success-rate-no-backlog" element={<SuccessRateNoBacklog />} />
                <Route path="/success-rate-with-backlog" element={<SuccessRateWithBacklog />} />
                <Route path="/academic-performance" element={<AcademicPerformance />} />
                <Route path="/academic-performance-upload" element={<AcademicPerformanceUpload />} />
                <Route path="/placement-details" element={<PlacementDetails />} />
                <Route path="/placement-details-upload" element={<PlacementDetailsUpload />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
