import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import RequestZone from "./pages/RequestZone";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";
import CityPage from "./pages/CityPage";
import CitiesIndex from "./pages/CitiesIndex";
import GuidePage from "./pages/GuidePage";
import { GUIDES } from "./lib/guides";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/richiedi-zona" element={<RequestZone />} />
            <Route path="/contatti" element={<Contacts />} />
            <Route path="/citta" element={<CitiesIndex />} />
            <Route path="/citta/:slug" element={<CityPage />} />
            {/* Rotte generate da guides.json: stessa fonte usata dal prerendering. */}
            {GUIDES.map((g) => (
              <Route key={g.slug} path={`/${g.slug}`} element={<GuidePage slug={g.slug} />} />
            ))}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
