import React from 'react';
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';

const GptSearch = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-12">
        <GptSearchBar />
      </div>
      <GptMovieSuggestions />
    </div>
  );
};

export default GptSearch;
