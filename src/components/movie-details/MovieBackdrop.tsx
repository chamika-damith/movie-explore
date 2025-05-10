
import React from "react";

interface MovieBackdropProps {
  backdropUrl: string | null;
}

const MovieBackdrop: React.FC<MovieBackdropProps> = ({ backdropUrl }) => {
  if (!backdropUrl) return null;
  
  return (
    <div className="relative h-[300px] md:h-[400px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};

export default MovieBackdrop;
