
import React from "react";
import { Movie, MovieDetail } from "@/store/slices/movieSlice";
import { toggleFavorite } from "@/store/slices/movieSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";

interface MoviePosterProps {
  movie: MovieDetail; // Changed from Movie to MovieDetail to have access to genres and runtime
  posterUrl: string;
}

const MoviePoster: React.FC<MoviePosterProps> = ({ movie, posterUrl }) => {
  const dispatch = useAppDispatch();
  const { favorites } = useAppSelector(state => state.movies);
  const isFav = favorites.some(fav => fav.id === movie.id);
  
  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(movie));
  };
  
  return (
    <div className="sticky top-24 space-y-4">
      <div className="relative rounded-lg overflow-hidden shadow-lg">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-auto"
        />
        <div className="absolute top-2 right-2">
          <Button
            size="icon"
            variant="ghost"
            className="bg-black/30 hover:bg-black/50 rounded-full h-10 w-10"
            onClick={handleToggleFavorite}
          >
            {isFav ? (
              <BookmarkCheck className="h-5 w-5 text-movie-primary" />
            ) : (
              <Bookmark className="h-5 w-5 text-white" />
            )}
          </Button>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-yellow-500 mr-1">⭐</span>
          <span className="font-bold">{movie.vote_average?.toFixed(1)}</span>
          <span className="text-muted-foreground ml-1">/ 10</span>
        </div>
        {movie.release_date && (
          <div className="text-sm text-muted-foreground">
            {new Date(movie.release_date).getFullYear()}
          </div>
        )}
      </div>

      {/* Runtime */}
      {movie.runtime && (
        <div className="text-sm text-muted-foreground">
          {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
        </div>
      )}

      {/* Genres */}
      {movie.genres && movie.genres.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {movie.genres.map((genre) => (
            <span
              key={genre.id}
              className="px-3 py-1 bg-muted rounded-full text-xs"
            >
              {genre.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviePoster;
