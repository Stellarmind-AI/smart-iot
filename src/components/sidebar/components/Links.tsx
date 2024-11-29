/* eslint-disable */
import React, { useCallback } from 'react';
import { usePathname } from 'next/navigation';
import NavLink from 'components/link/NavLink';
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
      icon: <FaTachometerAlt />,
    },
    {
      layout: '/admin',
      path: 'voltage',
      name: 'Analytics/Reporting',
      icon: <FaChartLine />,
    },
    {
      layout: '/admin',
      path: 'users',
      name: 'Administration',
      icon: <FaCogs />,
    },
    {
      layout: '/login',
      path: '.',
      name: 'Logout',
      icon: <FaDesktop />,
    },
  ];

  // Create the links for the routes
  const createLinks = (routes: typeof newRoutes) => {
    return routes.map((route, index) => {
      const isActive = activeRoute(route.path);

      return (
        <NavLink key={index} href={route.layout + '/' + route.path}>
          <div className="relative mb-3 flex hover:cursor-pointer">
            <li className="my-[3px] flex cursor-pointer items-center px-8">
              <span
                className={`${isActive ? 'text-[#156082]' : 'text-gray-600'}`}
              >
                {route.icon}
              </span>
              <p
                className={`leading-1 ml-4 flex ${
                  isActive
                    ? 'font-bold text-[#156082]'
                    : 'font-medium text-gray-600'
                } hover:text-[#156082]`}
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
