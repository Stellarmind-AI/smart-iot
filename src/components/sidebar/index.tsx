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
      className={`duration-175 linear fixed z-50 flex min-h-full flex-col bg-white pb-10 
        shadow-lg shadow-gray-500/50 transition-all dark:bg-navy-800 dark:text-white 
        ${open ? 'translate-x-0' : '-translate-x-full'} 
        w-[260px] md:w-[320px] lg:translate-x-0`} // Fixed visibility logic for lg and larger
    >
      <div className="mx-6 mt-8 flex items-center justify-between md:justify-center">
        <div className="mr-3">
          <img
            src="/Enercea-logo.webp"
            alt="Enercea Logo"
            className="h-[70px] rounded-xl md:h-[100px]" // Logo size increased
          />
        </div>
      </div>

      <ul className="w-full max-w-[310px] px-5 pt-6 md:px-7">
        <SidebarLinks />
      </ul>
    </div>
  );
}

export default SidebarHorizon;
