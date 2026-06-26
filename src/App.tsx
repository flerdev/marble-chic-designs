import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Cocinas from "./pages/Cocinas";
import CocinaSerie from "./pages/CocinaSerie";
import PiletasPage from "./pages/PiletasPage";
import PlacardPage from "./pages/PlacardPage";
import SistemaOpenPage from "./pages/SistemaOpenPage";
import ProximamentePage from "./pages/ProximamentePage";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cocinas" element={<Cocinas />} />
          <Route path="/cocinas/:serie" element={<CocinaSerie />} />
          <Route path="/piletas/*" element={<PiletasPage />} />
          <Route path="/placards/*" element={<PlacardPage />} />
          <Route path="/sistema-open/*" element={<SistemaOpenPage />} />
          {/* Placeholder for upcoming category pages */}
          <Route path="/:slug" element={<ProximamentePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
