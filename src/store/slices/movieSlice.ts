
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

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

export interface MovieDetail extends Movie {
  genres: { id: number; name: string }[];
  runtime?: number;
  tagline?: string;
  homepage?: string;
  videos?: {
    results: Array<{
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
    }>;
  };
  credits?: {
    cast: Array<{
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }>;
    crew: Array<{
      id: number;
      name: string;
      job: string;
    }>;
  };
}

interface MovieState {
  trendingMovies: Movie[];
  searchResults: Movie[];
  favorites: Movie[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  genreFilter: number | null;
  yearFilter: string | null;
  ratingFilter: number | null;
}

// API key should be in an environment variable in a production app
const API_KEY = "3fd2be6f0c70a2a598f084ddfb75487c"; // This is a demo key for TMDb
const API_BASE_URL = "https://api.themoviedb.org/3";

// Get initial favorites from localStorage
const getSavedFavorites = (): Movie[] => {
  const savedFavorites = localStorage.getItem('movieExplorerFavorites');
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

// Get initial search query from localStorage
const getSavedSearchQuery = (): string => {
  return localStorage.getItem('movieExplorerLastSearch') || '';
};

const initialState: MovieState = {
  trendingMovies: [],
  searchResults: [],
  favorites: getSavedFavorites(),
  isLoading: false,
  error: null,
  searchQuery: getSavedSearchQuery(),
  genreFilter: null,
  yearFilter: null,
  ratingFilter: null,
};

// Async thunks for API calls
export const fetchTrendingMovies = createAsyncThunk(
  'movies/fetchTrending',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/trending/movie/day?api_key=${API_KEY}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch trending movies");
      }
      
      const data = await response.json();
      return data.results;
    } catch (err) {
      return rejectWithValue("Failed to fetch trending movies");
    }
  }
);

export const searchMovies = createAsyncThunk(
  'movies/search',
  async (query: string, { rejectWithValue }) => {
    if (!query.trim()) return [];
    
    try {
      const response = await fetch(
        `${API_BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
      );
      
      if (!response.ok) {
        throw new Error("Failed to search movies");
      }
      
      const data = await response.json();
      // Save last search query to localStorage
      localStorage.setItem("movieExplorerLastSearch", query);
      return data.results;
    } catch (err) {
      return rejectWithValue("Failed to search movies");
    }
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Movie>) => {
      const movie = action.payload;
      const index = state.favorites.findIndex(fav => fav.id === movie.id);
      
      if (index >= 0) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(movie);
      }
      
      // Update localStorage
      localStorage.setItem('movieExplorerFavorites', JSON.stringify(state.favorites));
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchQuery = '';
      localStorage.removeItem('movieExplorerLastSearch');
    },
    setGenreFilter: (state, action: PayloadAction<number | null>) => {
      state.genreFilter = action.payload;
    },
    setYearFilter: (state, action: PayloadAction<string | null>) => {
      state.yearFilter = action.payload;
    },
    setRatingFilter: (state, action: PayloadAction<number | null>) => {
      state.ratingFilter = action.payload;
    },
    clearFilters: (state) => {
      state.genreFilter = null;
      state.yearFilter = null;
      state.ratingFilter = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trendingMovies = action.payload;
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(searchMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  toggleFavorite,
  setSearchQuery,
  clearSearchResults,
  setGenreFilter,
  setYearFilter,
  setRatingFilter,
  clearFilters,
} = movieSlice.actions;

export default movieSlice.reducer;
