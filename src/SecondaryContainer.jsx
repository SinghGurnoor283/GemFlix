import { useSelector } from "react-redux"; 
import MovieList from "./MovieList";
import React  from "react";
const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
 console.log(movies.popularMovies)
  return (
    <div className="bg-[#141414]">
      <div className="md:-mt-42 relative z-30">
        <MovieList title={"Now Playing"} movies={movies.NowPlayingMovies} />
        <MovieList title={"Popular Movies"} movies={movies.popularMovies} />
        <MovieList title={"Upcoming Movies"} movies={movies?.upcomingMovies} />
        <MovieList title={"Top Rated Tv Series"} movies={movies.topRatedTvSeries} />
        <MovieList title={"Top Rated Movies"} movies={movies.topRated} />
        <MovieList title={"Trending Tv Series"} movies={movies.trendingTvSeries} />
        
      </div>
    </div>
  );
};  

export default SecondaryContainer;