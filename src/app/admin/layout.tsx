'use client';
// Layout components
import { useState } from 'react';
import { FiMenu } from 'react-icons/fi'; // Importing Menu icon
import Sidebar from 'components/sidebar'; // Sidebar component
import { ReactNode } from 'react';
import Image from 'next/image'; // If you are using a logo image, import Image from 'next/image'

export default function Admin({ children }: { children: React.ReactNode }) {
  // State to manage sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-full w-full bg-background-100 dark:bg-background-900">
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-30 h-full transition-transform 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          w-[200px] md:translate-x-0 lg:w-[250px]`} // Reduced width for small screens and default width for larger screens
      >
        {/* Sidebar Component */}
        <Sidebar routes={[]} open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      </div>

      {/* Main Content */}
      <div className="relative h-full w-full font-dm dark:bg-navy-900">
        {/* Navbar (visible on all screens) */}
        <div
          className="fixed top-0 z-20 flex w-full items-center justify-between px-4 py-3 
    "
        >
          {/* Content */}

          {/* Logo or Title in the Navbar */}
          <div className="flex items-center space-x-3"></div>

          {/* Menu Toggle Button (only visible on screens smaller than 1024px) */}
          <button
            onClick={toggleSidebar}
            className="block p-3 text-2xl text-gray-800 dark:text-white lg:hidden"
          >
            <FiMenu /> {/* Menu icon */}
          </button>
        </div>

        {/* Main Content Wrapper */}
        <main
          className={`mx-2.5 flex-none transition-all dark:bg-navy-900 
              md:pr-2 lg:ml-[323px]`} // Sidebar space is added only in large screens
        >
          {/* Routes */}
          <div className="mx-auto min-h-screen p-2 pt-[60px] md:p-2 md:pt-0">
            {/* Padding adjusted for navbar on mobile */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
