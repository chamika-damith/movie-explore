
import React from "react";
import { useMovies } from "@/contexts/MovieContext";
import MovieGrid from "./MovieGrid";
import { TrendingUp } from "lucide-react";
import FilterSection from "./FilterSection";

const TrendingSection = () => {
  const { filteredMovies, isLoading } = useMovies();

  return (
    <section className="py-8">
      <div className="flex items-center mb-6">
        <TrendingUp className="mr-2 h-5 w-5 text-movie-primary" />
        <h2 className="text-2xl font-bold">Trending Movies</h2>
      </div>
      
      <FilterSection />
      
      <MovieGrid 
        movies={filteredMovies} 
        isLoading={isLoading} 
        emptyMessage="No trending movies available right now" 
      />
    </section>
  );
};

export default TrendingSection;
