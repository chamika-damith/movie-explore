
import React from "react";
import { Button } from "@/components/ui/button";

interface MovieNotFoundProps {
  onBackClick: () => void;
}

const MovieNotFound: React.FC<MovieNotFoundProps> = ({ onBackClick }) => {
  return (
    <div className="container-fluid py-20 text-center">
      <h2 className="text-2xl font-bold mb-2">Movie Not Found</h2>
      <p className="text-muted-foreground mb-6">
        We couldn't find the movie you're looking for.
      </p>
      <Button onClick={onBackClick}>Go Back</Button>
    </div>
  );
};

export default MovieNotFound;
