import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import lang from './utils/languageConstants';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { API_KEY, API_OPTIONS } from './utils/constants';
import { addGptMoviesResult } from './utils/GptSlice';
import logo from './assets/Logo.png'; 

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const dispatch = useDispatch();
  const searchText = useRef(null);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const placeholderList = lang[langKey].gptSearchPlaceholders;

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholderList.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [langKey]);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${movie}&include_adult=false&language=en-US&page=1`,
      API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = debounce(async () => {
    if (!searchText.current?.value) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

      const prompt = `You are an intelligent movie and web series recommendation system specifically trained on Netflix's style and catalog. Based on the following user query, suggest 5-7 highly relevant and trending Netflix-style titles. Recommendations should be similar in theme, genre, or vibe to what is asked. Return only the names of shows or movies, separated by commas. Do not explain anything or mention data limitations. User Query: ${searchText.current.value}.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text().split(",");
      const promiseArray = text.map((movie) => searchMovieTMDB(movie.trim()));
      const tmdbResults = await Promise.all(promiseArray);

      dispatch(addGptMoviesResult({ movieNames: text, movieResults: tmdbResults }));
    } catch (err) {
      console.error('Error from Gemini API:', err);
      setErrorMsg("Something went wrong! Please try again later.");
    } finally {
      setLoading(false);
    }
  }, 800);

  return (
      <div className="text-center mt-6">
      <h1 className="text-4xl font-bold mb-6 text-white">🎬 Discover Your Next Favorite</h1>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
        <input
          ref={searchText}
          type="text"
          className="w-full lg:w-[700px] p-4 rounded-xl text-base bg-gradient-to-br from-black to-black text-white placeholder-purple-300 border border-purple-700 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
          placeholder={placeholderList[placeholderIndex] || "What do you want to watch?"}
          disabled={loading}
        />
        <button
          onClick={handleGptSearchClick}
          className={`${
            loading
              ? 'bg-purple-900/60 cursor-not-allowed'
              : 'bg-gradient-to-br from-purple-700 via-fuchsia-600 to-pink-600 hover:brightness-110'
          } text-white px-6 py-3 rounded-xl font-semibold shadow-lg transition duration-300 w-full sm:w-auto`}
          disabled={loading}
        >
          {loading ? 'Finding magic...' : lang[langKey].search}
        </button>
      </div>

      {loading && (
        <div className="mt-20 flex flex-col justify-center items-center animate-pulse transition-all duration-700 ease-in-out">
          <img
            src={logo}
            alt="GemFlix Logo"
            className="h-36 w-36 mb-6 transform transition-transform duration-700 hover:scale-105"
          />
          <p className="text-2xl font-semibold text-purple-200 tracking-wide transition-opacity duration-700">
            🎬 GemFlix is curating your movie picks...
          </p>
        </div>
      )}

      {errorMsg && (
        <p className="mt-4 text-red-400 font-semibold">{errorMsg}</p>
      )}
    </div>

  );
};

export default GptSearchBar;