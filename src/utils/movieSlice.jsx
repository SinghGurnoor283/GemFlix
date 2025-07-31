import {createSlice} from '@reduxjs/toolkit';
import useTopRatedTvSeries from '../Hooks/useTopRatedTvSeries';
const movieSlice=createSlice({
    name: "movies",
    initialState:{
        NowPlayingMovies:null,
        movieLogo: null,
        popularMovies:null,
        upcomingMovies: null,
        topRated: null,
        topRatedTvSeries: null,
        trendingTvSeries: null,
    },
    reducers:{
        addNowPlayingMovies:(state,action)=>{
            state.NowPlayingMovies=action.payload;
        },
        addMovieLogo: (state, action) => {
        state.movieLogo = action.payload; 
        },
        addPopularMovies: (state, action) => {
        state.popularMovies = action.payload; 
        },
        addUpcomingMovies: (state, action) => {
            state.upcomingMovies = action.payload;
        },
        addTopRated: (state, action) => {
            state.topRated = action.payload;
        },
        addTopRatedTvSeries: (state, action) => {
            state.topRatedTvSeries = action.payload;
        },
        addTrendingTvSeries: (state, action) => {
            state.trendingTvSeries = action.payload;
        }

    }
})
export const {addNowPlayingMovies,addMovieLogo,addPopularMovies,addUpcomingMovies,addTopRated, addTopRatedTvSeries,addTrendingTvSeries}=movieSlice.actions
export default movieSlice.reducer