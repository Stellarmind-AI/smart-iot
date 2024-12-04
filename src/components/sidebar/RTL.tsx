import React, { useState } from 'react';
import { HiX, HiMenu } from 'react-icons/hi';
import Links from './components/Links';

function SidebarHorizon() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Sidebar for large screens (1024px and larger) */}
      <div className="hidden lg:block fixed top-0 left-0 z-50 w-[285px] h-full bg-white dark:bg-background-900 shadow-md">
        <Links />
      </div>

      {/* Toggleable Sidebar for smaller screens (less than 1024px) */}
      <div
        className={`fixed top-0 left-0 z-50 w-[285px] h-full bg-white dark:bg-background-900 shadow-md transform transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:hidden`}
      >
        <span
          className="absolute left-4 top-4 block cursor-pointer"
          onClick={() => setSidebarOpen(false)}
        >
          <HiX />
        </span>
        <Links />
      </div>

      {/* Toggle Button for smaller screens */}
      <button
        className="fixed top-4 left-4 z-50 text-2xl text-gray-800 dark:text-white lg:hidden"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        <HiMenu />
      </button>
    </>
  );
}

export default SidebarHorizon;