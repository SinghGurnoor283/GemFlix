import React, { useEffect, useState, useRef } from 'react';
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { toggleGptSearchView } from './utils/GptSlice';
import { changeLanguage } from './utils/configSlice';
import LOGO from './assets/logo.png';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.userReducer);
  console.log( user );
  const isGptOpen = useSelector((store) => store.gpt.showGptSearch);
  const currentLanguage = useSelector((store) => store.config.lang);

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLangChange = (e) => dispatch(changeLanguage(e.target.value));

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).catch(console.error);
  };

  const handleGptClick = () => dispatch(toggleGptSearchView());

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black to-transparent transition-colors duration-300">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-row sm:flex-row justify-between items-center gap-4">
          {/* Logo + Brand */}
          <div className="flex items-center gap-2">
            {!isGptOpen && <img src={LOGO} alt="Gemflix Logo" className="lg:w-12 lg:h-12 w-10 h-10 object-contain" />}
            <h1 className="text-2xl lg:text-4xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 tracking-wide">
              Gemflix
            </h1>
          </div>

          {/* Actions */}
            {user && (
              <div className="flex flex-wrap justify-center sm:justify-end items-center gap-3 sm:gap-4">
                {isGptOpen && (
                  <select
                    onChange={handleLangChange}
                    value={currentLanguage}
                    className="p-2 rounded-md bg-gray-800 text-white border border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="en">English</option>
                    <option value="hindi">Hindi</option>
                    <option value="french">French</option>
                    <option value="spanish">Spanish</option>
                  </select>
                )}

              <button
                onClick={handleGptClick}
                className="py-2 px-4 lg:py-3 lg:px-5 text-sm bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-full shadow-md transition-transform transform hover:scale-105"
              >
                {isGptOpen ? "Home" : "Gem AI 🔍"}
              </button>

              {/* Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button onClick={toggleDropdown} className="focus:outline-none">
                  <div className="lg:w-11 lg:h-11 w-10 h-10 rounded-full bg-purple-700 text-white flex items-center justify-center text-lg font-bold border-2 border-purple-400 hover:border-pink-500 transition">
                    {user?.userInfo?.displayName?.charAt(0).toUpperCase() || "G"}
                  </div>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-gray-900 border border-gray-700 rounded-lg shadow-xl text-white py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-700">
                      <p className="font-semibold">{user?.userInfo?.displayName || 'Guest'}</p>
                      <p className="text-sm text-gray-400">{user.userInfo?.email}</p>
                    </div>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-700">Account</a>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-700">Help Center</a>
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 hover:bg-purple-700 font-semibold"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
