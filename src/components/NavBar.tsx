
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { useMovies } from "@/contexts/MovieContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Sun, Moon, Film, User, LogOut } from "lucide-react";

const NavBar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { searchQuery, setSearchQuery, searchMovies } = useMovies();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchMovies(searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container-fluid py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Nav Links */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2">
              <Film className="h-6 w-6 text-movie-primary" />
              <span className="text-xl font-bold">ReelVerse</span>
            </Link>
            
            <nav className="hidden md:flex space-x-4">
              <Link to="/" className="text-sm hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/favorites" className="text-sm hover:text-primary transition-colors">
                Favorites
              </Link>
            </nav>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="hidden md:flex relative w-full max-w-md mx-4">
            <Input
              type="text"
              placeholder="Search movies..."
              className="pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              size="icon" 
              variant="ghost" 
              className="absolute right-0 top-0 h-full"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme} 
              className="hidden sm:flex"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {user ? (
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">{user.username}</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-sm flex items-center" 
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/login" className="hidden md:block">
                <Button variant="default" size="sm" className="bg-movie-primary hover:bg-movie-primary/90">
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M3 12h18M3 6h18M3 18h18"
                  }
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <form onSubmit={handleSearch} className="flex relative">
              <Input
                type="text"
                placeholder="Search movies..."
                className="pr-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                size="icon" 
                variant="ghost" 
                className="absolute right-0 top-0 h-full"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>

            <nav className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="px-2 py-1 hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/favorites" 
                className="px-2 py-1 hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Favorites
              </Link>
              <div className="flex items-center justify-between">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleTheme}
                  className="px-2 py-1 h-auto"
                >
                  {theme === "dark" ? (
                    <div className="flex items-center">
                      <Sun className="h-4 w-4 mr-2" />
                      <span>Light Mode</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Moon className="h-4 w-4 mr-2" />
                      <span>Dark Mode</span>
                    </div>
                  )}
                </Button>
              </div>

              {user ? (
                <div className="space-y-2">
                  <div className="px-2 py-1 flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>{user.username}</span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full justify-start px-2"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link 
                  to="/login" 
                  className="w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button variant="default" size="sm" className="w-full bg-movie-primary hover:bg-movie-primary/90">
                    Sign In
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
