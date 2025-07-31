import React from 'react';
import { useSelector } from 'react-redux';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.NowPlayingMovies);

  if (!movies) return null;

  const mainMovie = movies[2];
  const { original_title, overview, id, logoUrl } = mainMovie;

  return (
    <div className="overflow-hidden pb-10  bg-[#141414]">
      <VideoBackground id={id} />
      <VideoTitle
        movieId={id}
        title={logoUrl?.title || original_title}
        logoUrl={logoUrl}
        overview={overview}
      />
    </div>
  );
};

export default MainContainer;
