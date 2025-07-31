import React from 'react'
import {useDispatch} from 'react-redux'
import { addTopRatedTvSeries } from '../utils/movieSlice'
import { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants'
const useTopRatedTvSeries = () => {
  const dispatch = useDispatch()
  const getTopRatedTvSeries=async()=>{
    const data= await fetch('https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1', API_OPTIONS)
    const json = await data.json()
    // console.log(json.results)
    dispatch(addTopRatedTvSeries(json.results))
  }
  useEffect(()=>{
    getTopRatedTvSeries();
  },[])
}

export default useTopRatedTvSeries
