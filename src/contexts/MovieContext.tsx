
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids: number[];
}

interface MovieContextType {
  trendingMovies: Movie[];
  searchResults: Movie[];
  favorites: Movie[];
  isLoading: boolean;
  error: string | null;
  searchMovies: (query: string) => void;
  fetchTrendingMovies: () => void;
  toggleFavorite: (movie: Movie) => void;
  isFavorite: (movieId: number) => boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  clearSearchResults: () => void;
}

const MovieContext = createContext<MovieContextType | null>(null);

// API key should be in an environment variable in a production app
const API_KEY = "3fd2be6f0c70a2a598f084ddfb75487c"; // This is a demo key for TMDb
const API_BASE_URL = "https://api.themoviedb.org/3";

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("movieExplorerFavorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Fetch trending movies when the component mounts
  useEffect(() => {
    fetchTrendingMovies();
    // Check for last search in localStorage
    const lastSearch = localStorage.getItem("movieExplorerLastSearch");
    if (lastSearch) {
      setSearchQuery(lastSearch);
      searchMovies(lastSearch);
    }
  }, []);

  const fetchTrendingMovies = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_BASE_URL}/trending/movie/day?api_key=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch trending movies");
      }
      
      const data = await response.json();
      setTrendingMovies(data.results);
    } catch (err) {
      setError("Failed to fetch trending movies");
      toast({
        title: "Error",
        description: "Failed to fetch trending movies. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const searchMovies = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to search movies");
      }
      
      const data = await response.json();
      setSearchResults(data.results);
      
      // Save last search query to localStorage
      localStorage.setItem("movieExplorerLastSearch", query);
    } catch (err) {
      setError("Failed to search movies");
      toast({
        title: "Error",
        description: "Failed to search movies. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = (movie: Movie) => {
    const isFav = favorites.some((fav) => fav.id === movie.id);
    
    let updatedFavorites;
    if (isFav) {
      updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
      toast({
        title: "Removed from favorites",
        description: `"${movie.title}" has been removed from your favorites.`,
      });
    } else {
      updatedFavorites = [...favorites, movie];
      toast({
        title: "Added to favorites",
        description: `"${movie.title}" has been added to your favorites.`,
      });
    }
    
    setFavorites(updatedFavorites);
    localStorage.setItem("movieExplorerFavorites", JSON.stringify(updatedFavorites));
  };

  const isFavorite = (movieId: number) => {
    return favorites.some((fav) => fav.id === movieId);
  };

  const clearSearchResults = () => {
    setSearchResults([]);
    setSearchQuery("");
    localStorage.removeItem("movieExplorerLastSearch");
  };

  return (
    <MovieContext.Provider
      value={{
        trendingMovies,
        searchResults,
        favorites,
        isLoading,
        error,
        searchMovies,
        fetchTrendingMovies,
        toggleFavorite,
        isFavorite,
        searchQuery,
        setSearchQuery,
        clearSearchResults,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (context === null) {
    throw new Error("useMovies must be used within a MovieProvider");
  }
  return context;
};
