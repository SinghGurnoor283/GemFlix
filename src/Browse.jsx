import React from 'react';
import { useSelector } from 'react-redux';

// Your existing custom hooks for fetching data
import useNowPlaying from './Hooks/useNowPlaying';
import usePopularMovies from './Hooks/usePopularMovies';
import useUpcomingMovies from './Hooks/useUpcomingMovies';
import useTopRated from './Hooks/useTopRated';
import useTopRatedTvSeries from './Hooks/useTopRatedTvSeries';
import useTrendingTvSeries from './Hooks/useTrendingTvSeries';

// Your existing components
import Header from './Header';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import GptSearch from './GptSearch';
import Footer from './Footer';

const Browse = () => {
    // --- YOUR EXISTING LOGIC AND STATE (UNCHANGED) ---
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
    
    // These hooks will fetch data as before
    useNowPlaying();
    usePopularMovies();
    useUpcomingMovies();
    useTopRated();
    useTopRatedTvSeries();
    useTrendingTvSeries();

    // --- NEW MODERN & RESPONSIVE UI ---
    return (
        <div className="bg-[#141414] text-white min-h-screen">
            <Header />
            
            <main>
                {showGptSearch ? (
                    <GptSearch />
                ) : (
                    // Using React.Fragment to avoid adding extra nodes to the DOM
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
