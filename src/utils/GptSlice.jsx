import {createSlice} from '@reduxjs/toolkit';

const GptSlice=createSlice({
        name:'gpt',
        initialState:{
            showGptSearch: false,
            movieResults: null,
            movieNames: null
        },
        reducers: {
            toggleGptSearchView:(state,action)=>{
                state.showGptSearch=!state.showGptSearch
            },
            addGptMoviesResult:(state,action)=>{
                const {movieNames,movieResults}=action.payload
                state.movieResults=movieResults
                state.movieNames=movieNames
            }
        }
})
export const {toggleGptSearchView,addGptMoviesResult}=GptSlice.actions
export default GptSlice.reducer