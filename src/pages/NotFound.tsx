
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Film } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-movie-primary/10 via-background to-movie-secondary/10">
      <div className="text-center px-4 max-w-md">
        <Film className="h-20 w-20 text-movie-primary mx-auto mb-6 opacity-70" />
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! This scene isn't in our collection.
        </p>
        <Link to="/">
          <Button className="bg-movie-primary hover:bg-movie-primary/90">
            Back to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
