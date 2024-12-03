/* eslint-disable */
import { HiX } from 'react-icons/hi';
import SidebarLinks from './components/Links'; // Import SidebarLinks component
import { ReactNode } from 'react';

interface SidebarHorizonProps {
  open: boolean; // Indicates whether the sidebar is open or not
  setOpen: (open: boolean) => void; // Function to set the sidebar open state
  routes: Array<{
    name: string;
    layout: string;
    path: string;
    icon: ReactNode;
    secondary?: boolean;
  }>; // Add routes prop
}

function SidebarHorizon({ open, setOpen }: SidebarHorizonProps) {
  return (
<div
  className={`duration-175 linear fixed z-50 flex min-h-full flex-col bg-white pb-10 shadow-lg shadow-gray-500/50 transition-all dark:bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 ${
    open ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'
  } w-[250px] lg:w-[300px]`} // Adjusted width for smaller and larger screens
>

     

      {/* Sidebar Header with Logo */}
      <div className="mx-6 mt-8 flex items-center justify-center">
        <div className="mr-3">
          <img
            src="/Enercea-logo.webp" // Path to your logo
            alt="Enercea Logo"
            className="h-[90px]" // Logo size increased
          />
        </div>
      </div>

      {/* Navigation Links Section */}
      <ul className="mb-auto pt-6 space-y-6 px-6 md:px-7">
        {/* Integrating SidebarLinks component here */}
        <SidebarLinks />
      </ul>

      {/* Optional Free Horizon Card */}
      {/* <div className="flex justify-center mt-8">
        <SidebarCard />
      </div> */}
    </div>
  );
}

export default SidebarHorizon;
