
import React from "react";
import { useAppSelector } from "@/hooks/redux";
import MovieGrid from "./MovieGrid";
import { Search } from "lucide-react";
import FilterSection from "./FilterSection";

const SearchResultsSection = () => {
  const { searchResults, isLoading, searchQuery, genreFilter, yearFilter, ratingFilter } = useAppSelector(state => state.movies);

  if (!searchQuery) {
    return null;
  }

  // Apply filters
  const filteredMovies = searchResults.filter(movie => {
    // Apply genre filter
    if (genreFilter && !movie.genre_ids.includes(genreFilter)) {
      return false;
    }
    
    // Apply year filter
    if (yearFilter && movie.release_date) {
      const movieYear = movie.release_date.split('-')[0];
      if (movieYear !== yearFilter) {
        return false;
      }
    }
    
    // Apply rating filter
    if (ratingFilter !== null && movie.vote_average < ratingFilter) {
      return false;
    }
    
    return true;
  });

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
