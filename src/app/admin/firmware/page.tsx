'use client';
import React from 'react';

const ComingSoon = () => {
  return (
    <div className="flex h-screen bg-[#f0f4f8]">
      {/* Sidebar */}

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center bg-[#f0f4f8]">
        <div className="text-center">
          <h1 className="mb-4 text-5xl font-bold text-[#156082]">
            Coming Soon!
          </h1>
          <p className="text-lg text-[#505759]">
            We are working on something amazing. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
