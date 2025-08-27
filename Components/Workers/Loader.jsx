import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <div className="flex flex-col items-center space-y-5">
        {/* Spinner */}
        <div className="relative w-16 h-16">
          {/* Outer faded ring */}
          <div className="absolute inset-0 rounded-full border-4 border-orange-500 opacity-20 dark:opacity-30" />

          {/* Spinning top border */}
          <div className="absolute inset-0 animate-spin rounded-full border-t-4 border-orange-500" />

          {/* Center pulse */}
          <div className="absolute inset-2 bg-orange-500 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-white dark:bg-black rounded-full shadow-md animate-ping" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
