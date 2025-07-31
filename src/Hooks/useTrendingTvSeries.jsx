import React from 'react'
import {useDispatch} from 'react-redux'
import { addTrendingTvSeries } from '../utils/movieSlice'
import { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants'
const useTrendingTvSeries = () => {
  const dispatch = useDispatch()
  const getTrendingTvSeries=async()=>{
    const data= await fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', API_OPTIONS)
    const json = await data.json()
    // console.log(json.results)
    dispatch(addTrendingTvSeries(json.results))
  }
  useEffect(()=>{
    getTrendingTvSeries();
  },[])
}

export default useTrendingTvSeries
