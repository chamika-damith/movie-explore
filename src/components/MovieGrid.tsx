
import React from "react";
import MovieCard from "./MovieCard";
import { Movie } from "@/contexts/MovieContext";
import { Skeleton } from "@/components/ui/skeleton";

interface MovieGridProps {
  movies: Movie[];
  isLoading?: boolean;
  emptyMessage?: string;
}

const MovieGrid: React.FC<MovieGridProps> = ({ 
  movies, 
  isLoading = false, 
  emptyMessage = "No movies found" 
}) => {
  // Loading skeletons
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="h-[350px] rounded-lg overflow-hidden">
            <Skeleton className="h-full w-full" />
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-muted-foreground text-lg">{emptyMessage}</p>
      </div>
    );
  }

  // Movies grid
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
