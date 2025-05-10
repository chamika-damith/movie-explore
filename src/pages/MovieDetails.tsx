
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useMovies } from "@/contexts/MovieContext";
import NavBar from "@/components/NavBar";
import { Bookmark, BookmarkCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Genre {
  id: number;
  name: string;
}

interface MovieDetail extends Movie {
  genres: Genre[];
  runtime?: number;
  tagline?: string;
  homepage?: string;
}

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toggleFavorite, isFavorite } = useMovies();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        const API_KEY = "3fd2be6f0c70a2a598f084ddfb75487c"; // Demo key
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }
        
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to load movie details. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, toast]);

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleBack = () => {
    navigate(-1);
  };

  const handleToggleFavorite = () => {
    if (movie) {
      toggleFavorite(movie);
    }
  };

  const isFav = movie ? isFavorite(movie.id) : false;

  const backdropUrl = movie?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;
  
  const posterUrl = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "/placeholder.svg";

  return (
    <div className="min-h-screen">
      <NavBar />
      
      {isLoading ? (
        <div className="container-fluid py-8 space-y-8">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-8 w-48" />
          </div>
          <Skeleton className="h-[400px] w-full rounded-xl" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Skeleton className="h-[500px] w-full rounded-lg" />
            <div className="md:col-span-2 space-y-4">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
        </div>
      ) : movie ? (
        <div className="animate-fade-in">
          {/* Backdrop */}
          {backdropUrl && (
            <div className="relative h-[300px] md:h-[400px] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${backdropUrl})` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
            </div>
          )}

          <div className="container-fluid relative">
            {/* Back button */}
            <Button
              variant="ghost"
              size="sm"
              className="mb-4 hover:bg-background/80"
              onClick={handleBack}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Poster */}
              <div className="md:col-span-1">
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
              </div>

              {/* Details */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">{movie.title}</h1>
                  {movie.tagline && (
                    <p className="text-lg text-muted-foreground mt-2 italic">
                      "{movie.tagline}"
                    </p>
                  )}
                </div>

                {/* Overview */}
                <div>
                  <h2 className="text-xl font-semibold mb-2">Overview</h2>
                  <p className="text-muted-foreground">{movie.overview}</p>
                </div>

                {/* Trailer - Assuming videos are included in the response */}
                {movie.videos && movie.videos.results && movie.videos.results.length > 0 && (
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Trailer</h2>
                    <div className="relative aspect-video w-full">
                      <iframe
                        className="absolute inset-0 w-full h-full rounded-lg"
                        src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}

                {/* Cast - Assuming credits are included in the response */}
                {movie.credits && movie.credits.cast && movie.credits.cast.length > 0 && (
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Top Cast</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {movie.credits.cast.slice(0, 5).map((actor) => (
                        <div key={actor.id} className="text-center">
                          <div className="rounded-full overflow-hidden w-16 h-16 mx-auto mb-2">
                            {actor.profile_path ? (
                              <img
                                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                alt={actor.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-muted flex items-center justify-center">
                                <span className="text-2xl">👤</span>
                              </div>
                            )}
                          </div>
                          <div className="text-sm font-medium truncate">
                            {actor.name}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">
                            {actor.character}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid py-20 text-center">
          <h2 className="text-2xl font-bold mb-2">Movie Not Found</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't find the movie you're looking for.
          </p>
          <Button onClick={handleBack}>Go Back</Button>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
