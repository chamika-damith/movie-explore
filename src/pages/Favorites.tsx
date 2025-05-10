
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useMovies } from "@/contexts/MovieContext";
import NavBar from "@/components/NavBar";
import MovieGrid from "@/components/MovieGrid";
import { Bookmark } from "lucide-react";

const Favorites = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { favorites } = useMovies();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="container-fluid py-8">
        <div className="flex items-center mb-6">
          <Bookmark className="mr-2 h-5 w-5 text-movie-accent" />
          <h1 className="text-2xl font-bold">My Favorites</h1>
        </div>
        
        <MovieGrid 
          movies={favorites} 
          emptyMessage="You haven't added any favorites yet. Explore movies and click the bookmark icon to add them here!" 
        />
      </main>
    </div>
  );
};

export default Favorites;
