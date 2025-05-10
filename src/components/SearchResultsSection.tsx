
import React from "react";
import { useMovies } from "@/contexts/MovieContext";
import MovieGrid from "./MovieGrid";
import { Search } from "lucide-react";
import FilterSection from "./FilterSection";

const SearchResultsSection = () => {
  const { filteredMovies, isLoading, searchQuery } = useMovies();

  if (!searchQuery) {
    return null;
  }

  return (
    <section className="py-8">
      <div className="flex items-center mb-6">
        <Search className="mr-2 h-5 w-5 text-movie-secondary" />
        <h2 className="text-2xl font-bold">
          Search Results: "{searchQuery}"
        </h2>
      </div>
      
      <FilterSection />
      
      <MovieGrid 
        movies={filteredMovies} 
        isLoading={isLoading} 
        emptyMessage="No movies found matching your search" 
      />
    </section>
  );
};

export default SearchResultsSection;
