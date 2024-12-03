'use client';
// Layout components
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import routes from 'routes';
import React from 'react';
import { FiMenu, FiX } from 'react-icons/fi'; // Importing Menu and Close icons
import Sidebar from 'components/sidebar';
import Image from 'next/image'; // If you are using a logo image, import Image from 'next/image'

export default function Admin({ children }: { children: React.ReactNode }) {
  // State to manage sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-full w-full bg-background-100 dark:bg-background-900">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-30 h-full bg-white shadow-lg transition-transform dark:bg-background-900 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          w-[200px] md:w-[250px] md:translate-x-0`} // Reduced width for small screens and default width for larger screens, removed transform effect on large screens
      >
       

        {/* Sidebar Component */}
        <Sidebar routes={routes} open={isSidebarOpen} setOpen={setIsSidebarOpen} />
      </div>

      {/* Main Content */}
      <div className="relative h-full w-full font-dm dark:bg-navy-900">
        {/* Navbar (visible on all screens) */}
        <div className="fixed top-0 z-20 flex w-full items-center justify-between py-3">
          {/* Logo */}
          <h1 className="text-lg font-bold text-gray-800 dark:text-white ml-2 hidden md:block">
            Admin Dashboard
          </h1>

          {/* Menu Button (visible only in mobile view) */}
          <button
            onClick={toggleSidebar}
            className="text-2xl text-gray-800 dark:text-white md:hidden p-3"
          >
            <FiMenu /> {/* Open icon */}
          </button>

          {/* Close Button (only visible when sidebar is open and placed on the right, visible in mobile view) */}
          {isSidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="text-2xl text-gray-800 dark:text-white ml-auto md:hidden p-3"
            >
              <FiX /> {/* Close icon */}
            </button>
          )}
        </div>

        {/* Main Content Wrapper */}
        <main
          className={`mx-2.5 flex-none transition-all dark:bg-navy-900 
              md:pr-2 xl:ml-[323px]`} // Sidebar space is added only in large screens
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
