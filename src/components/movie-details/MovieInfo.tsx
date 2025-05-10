
import React from "react";
import { MovieDetail } from "@/store/slices/movieSlice";

interface MovieInfoProps {
  movie: MovieDetail;
}

const MovieInfo: React.FC<MovieInfoProps> = ({ movie }) => {
  return (
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

      {/* Trailer */}
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

      {/* Cast */}
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
  );
};

export default MovieInfo;
