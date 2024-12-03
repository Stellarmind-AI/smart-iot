/* eslint-disable */
import React, { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import NavLink from 'components/link/NavLink';
import Image from 'next/image';

import {
  FaTachometerAlt,
  FaCogs,
  FaDesktop,
  FaChartLine,
} from 'react-icons/fa';

export const SidebarLinks = (): JSX.Element => {
  const pathname = usePathname();

  // Function to check if the route is active
  const activeRoute = useCallback(
    (routeName: string) => {
      return pathname?.includes(routeName);
    },
    [pathname],
  );

  // Define the routes
  const newRoutes = [
    {
      layout: '/admin',
      path: 'default',
      name: 'Dashboard',
      icon: (
        <Image
          src="/img/dashboards/Dashboard Icon Blue.png" // Path to your image
          alt="Dashboard Icon"
          width={24} // Set the width of the image (adjust as needed)
          height={24} // Set the height of the image (adjust as needed)
        />
      ),
    },
    {
      layout: '/admin',
      path: 'overview',
      name: 'Station Overview',
    },
    {
      layout: '/admin',
      path: 'voltage',
      name: 'Assets',
      icon: (
        <Image
          src="/img/dashboards/DAKET Icon Blue.png" // Path to your image
          alt="Dashboard Icon"
          width={24} // Set the width of the image (adjust as needed)
          height={24} // Set the height of the image (adjust as needed)
        />
      ),
    },
    {
      layout: '/admin',
      path: 'voltage',
      name: 'Businesses',
      icon: (
        <Image
          src="/img/dashboards/Bussines Icon Blue.png" // Path to your image
          alt="Dashboard Icon"
          width={24} // Set the width of the image (adjust as needed)
          height={24} // Set the height of the image (adjust as needed)
        />
      ),
    },
    {
      layout: '/admin',
      path: 'users',
      name: 'Administration',
      icon: (
        <Image
          src="/img/dashboards/Administration Icon Blue.png" // Path to your image
          alt="Dashboard Icon"
          width={24} // Set the width of the image (adjust as needed)
          height={24} // Set the height of the image (adjust as needed)
        />
      ),
    },
  ];

  // Create the links for the routes
  const createLinks = (routes: typeof newRoutes) => {
    return routes.map((route, index) => {
      const isActive = activeRoute(route.path);

      return (
        <NavLink key={index} href={route.layout + '/' + route.path}>
          <div className="relative mb-3 flex cursor-pointer">
            <li className="my-[3px] flex cursor-pointer items-center px-4 lg:px-6"> {/* Adjusted padding for large screens */} 
            <span
  className={`${isActive ? 'text-[#156082] transform scale-110 shadow-xl' : 'text-[#156082]'}`}
>
  {route.icon}
</span>

<p
  className={`leading-1 ml-6 text-[16px] flex ${
    isActive
      ? 'font-bold text-[#156082] transform scale-105'
      : 'font-medium text-[#156082] '
  }`}
>
  {route.name}
</p>

            </li>
            {isActive ? (
              <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-[#156082]" />
            ) : null}
          </div>
        </NavLink>
      );
    });
  };

  return <>{createLinks(newRoutes)}</>;
};

export default SidebarLinks;
