import React from 'react'
import {useDispatch} from 'react-redux'
import { addPopularMovies } from '../utils/movieSlice'
import { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants'
const usePopularMovies = () => {
  const dispatch = useDispatch()
  const getPopularPlaying=async()=>{
    const data= await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', API_OPTIONS)
    const json = await data.json()
    // console.log(json.results)
    dispatch(addPopularMovies(json.results))
  }
  useEffect(()=>{
    getPopularPlaying();
  },[])
}

export default usePopularMovies
