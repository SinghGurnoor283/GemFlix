import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  const isLoading = !movies || movies.length === 0;
  const moviesWithPosters = movies?.filter((movie) => movie.poster_path);

  if (!moviesWithPosters || moviesWithPosters.length === 0) return null;

  return (
    <div className="px-4 mt-3 md:px-6 min-h-[260px]">
      <h1 className="text-purple-400 text-xl md:text-2xl font-bold py-4 md:py-4 font-orbitron">
        {title || "🔥 GemFlix Picks"}
      </h1>
      <div className="flex overflow-x-scroll overflow-y-hidden scrollbar-hide snap-x snap-mandatory">
        <div className="flex space-x-6 pb-5">
          {isLoading
            ? Array(6)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="w-32 md:w-40 h-48 md:h-60 bg-[#1F2937] rounded-lg animate-pulse"
                  />
                ))
            : moviesWithPosters.map((movie, i) => (
                <MovieCard
                  key={movie.id}
                  posterPath={movie.poster_path}
                  isGemPick={i % 7 === 0} // Show badge every 7th movie
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
