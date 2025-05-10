/**
 * Main Application Component
 * 
 * This is the root component of the Reel Verse Explorer application.
 * It sets up the core providers and routing structure:
 * - Redux store for global state management
 * - React Query for data fetching
 * - Toast notifications
 * - Tooltips
 * - React Router for navigation
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store';

// Page Components
import Index from "./pages/Index";
import Login from "./pages/Login";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

// Initialize React Query client
const queryClient = new QueryClient();

/**
 * App Component
 * 
 * Provides the application structure with:
 * - Redux store provider
 * - React Query provider for data fetching
 * - Toast notifications for user feedback
 * - Tooltip provider for UI enhancements
 * - Router setup with main application routes
 */
const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
