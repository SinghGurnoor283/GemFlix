import React from 'react';
import { useSelector } from 'react-redux';
import useNowPlaying from './Hooks/useNowPlaying';
import usePopularMovies from './Hooks/usePopularMovies';
import useUpcomingMovies from './Hooks/useUpcomingMovies';
import useTopRated from './Hooks/useTopRated';
import useTopRatedTvSeries from './Hooks/useTopRatedTvSeries';
import useTrendingTvSeries from './Hooks/useTrendingTvSeries';
import Header from './Header';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import GptSearch from './GptSearch';
import Footer from './Footer';

const Browse = () => {
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
    
    useNowPlaying();
    usePopularMovies();
    useUpcomingMovies();
    useTopRated();
    useTopRatedTvSeries();
    useTrendingTvSeries();


    return (
        <div className="bg-[#141414] text-white min-h-screen">
            <Header />
            
            <main>
                {showGptSearch ? (
                    <GptSearch />
                ) : (
                    <>
                        <MainContainer />
                        <SecondaryContainer />
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Browse;
