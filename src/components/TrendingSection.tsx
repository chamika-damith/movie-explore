
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { fetchTrendingMovies } from "@/store/slices/movieSlice";
import MovieGrid from "./MovieGrid";
import { TrendingUp } from "lucide-react";
import FilterSection from "./FilterSection";

const TrendingSection = () => {
  const dispatch = useAppDispatch();
  const { trendingMovies, isLoading, genreFilter, yearFilter, ratingFilter } = useAppSelector(state => state.movies);
  
  // Apply filters
  const filteredMovies = trendingMovies.filter(movie => {
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
  
  useEffect(() => {
    dispatch(fetchTrendingMovies());
  }, [dispatch]);

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
