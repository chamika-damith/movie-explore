
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/redux";
import NavBar from "@/components/NavBar";
import TrendingSection from "@/components/TrendingSection";
import SearchResultsSection from "@/components/SearchResultsSection";

const Index = () => {
  const { user, isLoading: authLoading } = useAppSelector(state => state.auth);
  const { searchQuery } = useAppSelector(state => state.movies);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="container-fluid">
        {searchQuery ? <SearchResultsSection /> : <TrendingSection />}
      </main>
    </div>
  );
};

export default Index;
