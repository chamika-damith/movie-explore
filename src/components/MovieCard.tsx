
import React from "react";
import { Link } from "react-router-dom";
import { Movie, useMovies } from "@/contexts/MovieContext";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { toggleFavorite, isFavorite } = useMovies();
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.svg";
  
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "Unknown";
  
  const isFav = isFavorite(movie.id);

  return (
    <Card className="movie-card group h-[350px] relative overflow-hidden">
      <div className="h-full relative">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="movie-card-gradient"></div>
        
        <div className="absolute top-2 right-2">
          <Button 
            size="icon" 
            variant="ghost"
            className="bg-black/30 hover:bg-black/50 rounded-full h-8 w-8"
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(movie);
            }}
          >
            {isFav ? (
              <BookmarkCheck className="h-5 w-5 text-movie-primary" />
            ) : (
              <Bookmark className="h-5 w-5 text-white" />
            )}
          </Button>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transition-all duration-300">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm opacity-90">{releaseYear}</p>
            <div className="flex items-center bg-black/60 px-2 py-0.5 rounded text-xs">
              ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
            </div>
          </div>
          <h3 className="font-bold truncate">{movie.title}</h3>
          
          <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Link
              to={`/movie/${movie.id}`}
              className="bg-movie-primary hover:bg-movie-primary/90 text-white text-sm py-1 px-3 rounded-full inline-block"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MovieCard;
