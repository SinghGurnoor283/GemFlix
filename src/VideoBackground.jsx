import React, { useEffect, useRef, useState } from "react";
import useTrailerVideo from "./Hooks/useTrailerVideo";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const VideoBackground = ({ id }) => {
  const trailerId = useTrailerVideo(id);
  const iframeRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const message = {
      event: "command",
      func: isMuted ? "mute" : "unMute",
    };

    iframe.contentWindow?.postMessage(JSON.stringify(message), "*");
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  if (!trailerId) {
    return (
      <div className="absolute top-0 left-0 w-full h-screen bg-[#141414] flex items-center justify-center text-white">
        Loading Video...
      </div>
    );
  }

  return (
    <div className="relative w-screen">
      <iframe
      ref={iframeRef}
      className="w-full h-full md:h-screen aspect-video scale-[1.4] md:scale-[1.95] xl:scale-[1.4]"
      src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerId}&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1`}
      title="Background Trailer"
      allow="autoplay; fullscreen; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      frameBorder="0"
      allowFullScreen
    />


      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent z-10" />

   
      <button
        onClick={toggleMute}
        className="absolute bottom-3 md:bottom-30 right-5 md:right-8 xl:right-12 bg-black/60 p-1 md:p-2 rounded-full text-white text-xl z-40 hover:bg-black/80 transition pointer-events-auto"
      >
        {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
      </button>
    </div>
  );
};

export default VideoBackground;
