import React from "react";
import { IMG_CDN_URL } from "./utils/constants";

const MovieCard = ({ posterPath, isGemPick }) => {
  if (!posterPath) return null;

  return (
    <div className="w-32 snap-start md:w-40 h-48 md:h-60 relative group transform transition-transform duration-300 hover:scale-105 border border-purple-500 shadow-md hover:shadow-purple-400/60 rounded-xl bg-gradient-to-br from-[#1F2937] to-[#111827]">
      {isGemPick && (
        <span className="absolute top-2 left-2 bg-purple-400 text-black text-[10px] px-2 py-1 rounded-md font-bold font-orbitron shadow-md z-10">
          💎 Gem Pick
        </span>
      )}
      <img
        className="rounded-xl w-full h-full object-cover"
        src={IMG_CDN_URL + posterPath}
        alt="Movie Poster"
        loading="eager"
        width="160"
        height="240"
      />
    </div>
  );
};

export default MovieCard;
