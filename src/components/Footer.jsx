import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full mt-auto px-6 py-4 text-center text-gray-400 bg-gradient-to-r from-black via-gray-900 to-black border-t border-gray-800 backdrop-blur-sm shadow-inner">
      <p className="text-sm">
        © {new Date().getFullYear()} Destiny Comics Universe. All rights reserved.
      </p>
      <p className="text-xs mt-1 opacity-70">
        Powered by imagination · Built with 💻 React + Tailwind
      </p>
    </footer>
  );
};

export default Footer;
