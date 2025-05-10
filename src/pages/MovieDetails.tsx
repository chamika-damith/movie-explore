
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { MovieDetail } from "@/store/slices/movieSlice";
import NavBar from "@/components/NavBar";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import MovieBackdrop from "@/components/movie-details/MovieBackdrop";
import MoviePoster from "@/components/movie-details/MoviePoster";
import MovieInfo from "@/components/movie-details/MovieInfo";
import MovieDetailsSkeleton from "@/components/movie-details/MovieDetailsSkeleton";
import MovieNotFound from "@/components/movie-details/MovieNotFound";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAppSelector(state => state.auth);
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
        <MovieDetailsSkeleton />
      ) : movie ? (
        <div className="animate-fade-in">
          <MovieBackdrop backdropUrl={backdropUrl} />

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
                <MoviePoster movie={movie} posterUrl={posterUrl} />
              </div>

              {/* Details */}
              <MovieInfo movie={movie} />
            </div>
          </div>
        </div>
      ) : (
        <MovieNotFound onBackClick={handleBack} />
      )}
    </div>
  );
};

export default MovieDetails;
