import React from 'react';
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 px-6 md:px-16 z-50 py-10 text-sm">
      {/* Social Icons */}
      <div className="flex space-x-6 mb-6">
        <Facebook className="hover:text-white cursor-pointer" size={20} />
        <Instagram className="hover:text-white cursor-pointer" size={20} />
        <Twitter className="hover:text-white cursor-pointer" size={20} />
        <Youtube className="hover:text-white cursor-pointer" size={20} />
      </div>

      {/* Grid Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="space-y-2">
          <p className="hover:underline cursor-pointer">AI Recommendations</p>
          <p className="hover:underline cursor-pointer">Our Vision</p>
          <p className="hover:underline cursor-pointer">Privacy Policy</p>
          <p className="hover:underline cursor-pointer">Contact Us</p>
        </div>
        <div className="space-y-2">
          <p className="hover:underline cursor-pointer">Help Centre</p>
          <p className="hover:underline cursor-pointer">Careers</p>
          <p className="hover:underline cursor-pointer">Legal Info</p>
          <p className="hover:underline cursor-pointer">Ad Preferences</p>
        </div>
        <div className="space-y-2">
          <p className="hover:underline cursor-pointer">Gift Cards</p>
          <p className="hover:underline cursor-pointer">Gemflix Shop</p>
          <p className="hover:underline cursor-pointer">Cookie Settings</p>
        </div>
        <div className="space-y-2">
          <p className="hover:underline cursor-pointer">Press & Media</p>
          <p className="hover:underline cursor-pointer">Terms of Use</p>
          <p className="hover:underline cursor-pointer">About Gemflix</p>
        </div>
      </div>

      {/* Service Code Button */}
      <button className="border border-gray-600 text-gray-400 px-4 py-1 mb-4 hover:text-white hover:border-white">
        Support Code
      </button>

      {/* Copyright */}
      <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Gemflix Inc. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
