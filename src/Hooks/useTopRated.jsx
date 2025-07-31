import React from 'react'
import {useDispatch} from 'react-redux'
import { addTopRated } from '../utils/movieSlice'
import { useEffect } from 'react'
import { API_OPTIONS } from '../utils/constants'
const useTopRated = () => {
  const dispatch = useDispatch()
  const getTopRated=async()=>{
    const data= await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', API_OPTIONS)
    const json = await data.json()
    // console.log(json.results)
    dispatch(addTopRated(json.results))
  }
  useEffect(()=>{
    getTopRated();
  },[])
}

export default useTopRated
