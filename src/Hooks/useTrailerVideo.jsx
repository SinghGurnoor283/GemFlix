import React from 'react'
import { useEffect,useState } from 'react'
import { API_OPTIONS } from '../utils/constants'
const useTrailerVideo = (id) => {
  console.log(id);
  const [trailerId,setTrailerId]=useState();
      const getMovieTrailer=async ()=>{
          const data=await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      API_OPTIONS)
          const json=await data.json();
          console.log(json.results)
        
          const trailers=json.results.filter((video)=> video.type=="Trailer")
          console.log(trailers)
          const anyOneTrailer=trailers[0]
          setTrailerId(anyOneTrailer?.key)
          
      }
      useEffect(()=>{
          getMovieTrailer();
      },[])
      return trailerId;
}

export default useTrailerVideo
