
import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { setGenreFilter, setYearFilter, setRatingFilter, clearFilters } from "@/store/slices/movieSlice";
import { 
  Select, 
  SelectTrigger, 
  SelectContent, 
  SelectItem, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter, FilterX } from "lucide-react";

// Common genres in movies
const GENRES = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 14, name: "Fantasy" },
  { id: 27, name: "Horror" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 53, name: "Thriller" }
];

// Generate years from 1990 to current year
const generateYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 1990; year--) {
    years.push(year.toString());
  }
  return years;
};

const YEARS = generateYears();

// Rating options
const RATINGS = [
  { value: 8, label: "8+ ⭐" },
  { value: 7, label: "7+ ⭐" },
  { value: 6, label: "6+ ⭐" },
  { value: 5, label: "5+ ⭐" },
  { value: 0, label: "All Ratings" }
];

const FilterSection = () => {
  const dispatch = useAppDispatch();
  const { genreFilter, yearFilter, ratingFilter, searchQuery, trendingMovies, searchResults } = useAppSelector(state => state.movies);
  
  const [filtersActive, setFiltersActive] = useState(false);
  const [totalMovies, setTotalMovies] = useState(0);
  const [filteredCount, setFilteredCount] = useState(0);

  // Calculate filtered movies based on current filters
  const getFilteredMovies = () => {
    const movies = searchQuery ? searchResults : trendingMovies;
    return movies.filter(movie => {
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
  };

  // Calculate total and filtered counts
  useEffect(() => {
    const total = searchQuery ? searchResults.length : trendingMovies.length;
    setTotalMovies(total);
    setFilteredCount(getFilteredMovies().length);
  }, [genreFilter, yearFilter, ratingFilter, searchQuery, searchResults, trendingMovies]);

  // Determine if any filters are active
  useEffect(() => {
    setFiltersActive(
      genreFilter !== null || 
      yearFilter !== null || 
      ratingFilter !== null && ratingFilter > 0
    );
  }, [genreFilter, yearFilter, ratingFilter]);

  const handleGenreChange = (value: string) => {
    dispatch(setGenreFilter(value === "all" ? null : parseInt(value)));
  };

  const handleYearChange = (value: string) => {
    dispatch(setYearFilter(value === "all" ? null : value));
  };

  const handleRatingChange = (value: string) => {
    dispatch(setRatingFilter(parseInt(value)));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="flex items-center">
          <Filter className="mr-2 h-5 w-5 text-movie-primary" />
          <h3 className="text-lg font-medium">Filters</h3>
        </div>

        <div className="flex flex-wrap gap-3">
          <Select 
            value={genreFilter?.toString() || "all"}
            onValueChange={handleGenreChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              {GENRES.map(genre => (
                <SelectItem key={genre.id} value={genre.id.toString()}>
                  {genre.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            value={yearFilter || "all"}
            onValueChange={handleYearChange}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {YEARS.map(year => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select 
            value={ratingFilter?.toString() || "0"}
            onValueChange={handleRatingChange}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              {RATINGS.map(rating => (
                <SelectItem key={rating.value} value={rating.value.toString()}>
                  {rating.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {filtersActive && (
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center" 
              onClick={handleClearFilters}
            >
              <FilterX className="h-4 w-4 mr-1" />
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {filtersActive && (
        <div className="text-sm text-muted-foreground">
          Showing {filteredCount} of {totalMovies} movies
        </div>
      )}
    </div>
  );
};

export default FilterSection;
