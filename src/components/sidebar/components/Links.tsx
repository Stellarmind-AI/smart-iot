import React, { useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import NavLink from 'components/link/NavLink';
import Image from 'next/image';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'; // v2 path

export const SidebarLinks = (): JSX.Element => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<number | null>(null); // State for tracking the opened dropdown

  // Function to check if the route or its subpage is active (Exact path match)
  const activeRoute = useCallback(
    (routeName: string) => pathname === routeName, // Exact match
    [pathname]
  );

  // Define the routes with their subpages
  const routes = [
    {
      layout: '/admin',
      path: 'default',
      name: 'Dashboard',
      whiteImg: '/img/dashboards/Dashboard Icon white.png',
      blueImg: '/img/dashboards/Dashboard Icon Blue.png',
      subpages: [
        { name: 'Stations Overview', path: '/admin/overview' },
        { name: 'Stations Downtime', path: '/comingsoon' },
        { name: 'Reporting', path: '/comingsoon' },
        { name: 'Alerts & Notifications', path: '/comingsoon' },
        { name: 'Abnormal Events', path: '/comingsoon' }, // 5 pages for the first route
      ],
    },
    {
      layout: '/admin',
      path: 'voltage',
      name: 'Assets',
      whiteImg: '/img/dashboards/DAKET Icon white.png',
      blueImg: '/img/dashboards/DAKET Icon Blue.png',
      subpages: [
        { name: 'Location Management', path: '/comingsoon' },
        { name: 'Station Management', path: '/comingsoon' },
        { name: 'Add New Location', path: '/comingsoon' },
        { name: 'Add New Stations', path: '/comingsoon' },
        { name: 'Asset Settings', path: '/comingsoon' },
        { name: 'Firmware Management ', path: '/comingsoon' },
      ],
    },
    {
      layout: '/admin',
      path: 'Business',
      name: 'Businesses',
      whiteImg: '/img/dashboards/Bussines Icon White.png',
      blueImg: '/img/dashboards/Bussines Icon Blue.png',
      subpages: [], // No subpages, just a regular nav item
    },
    {
      layout: '/admin',
      path: 'users',
      name: 'Administration',
      whiteImg: '/img/dashboards/Administration Icon white.png',
      blueImg: '/img/dashboards/Administration Icon Blue.png',
      subpages: [
        { name: 'User Management', path: '/comingsoon' },
        { name: 'Roles & Permission', path: '/comingsoon' },
        { name: 'Add New User', path: '/comingsoon' },
        { name: 'Add New Role', path: '/comingsoon' },
        { name: 'Global Settings', path: '/comingsoon' },
      ],
    },
  ];

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index); // Toggle dropdown visibility
  };

  const handleClick = (route: { path: string, subpages: any[] }, index: number) => {
    // Close the dropdown if the route has no subpages
    if (route.subpages.length === 0) {
      setOpenDropdown(null); // Close all dropdowns if no subpages
    } else {
      // If the route has subpages, toggle its dropdown
      toggleDropdown(index);
    }
  };

  return (
    <>
      {routes.map((route, index) => {
        const isActive =
          activeRoute(route.layout + '/' + route.path) || // Check if the main route is active
          route.subpages.some(subpage => activeRoute(subpage.path)); // Check if any subpage is active

        // Determine the rounded corner classes
        let borderRadiusClass = '';
        if (index === 0) {
          borderRadiusClass = 'rounded-tl-xl rounded-tr-xl'; // Top corners for the first item
        } else if (index === routes.length - 1) {
          borderRadiusClass = 'rounded-bl-xl rounded-br-xl'; // Bottom corners for the last item
        }

        return (
          <div key={index}>
            <NavLink href={`${route.layout}/${route.path}`} onClick={() => handleClick(route, index)}>
              <div
                className={`group relative flex cursor-pointer items-center px-4 py-4 transition-all duration-200 ${borderRadiusClass} ${
                  isActive
                    ? 'bg-[#ECF2FF] text-[#156082]' // Active: light blue bg, dark blue text
                    : 'bg-[#156082] text-white hover:bg-[#ECF2FF] hover:text-[#156082] hover:font-bold' // Inactive: dark bg, white text, hover changes
                }`}
              >
                <span className="relative flex items-center">
                  {/* Inactive white icon */}
                  {!isActive && (
                    <Image
                      src={route.whiteImg}
                      alt={`${route.name} Icon Inactive`}
                      width={24}
                      height={24}
                      className="absolute transition-opacity duration-200 group-hover:opacity-0"
                    />
                  )}
                  {/* Hover and Active blue icon */}
                  <Image
                    src={route.blueImg}
                    alt={`${route.name} Icon Hover/Active`}
                    width={24}
                    height={24}
                    className={`transition-opacity duration-200 ${
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </span>
                <p
                  className={`ml-4 leading-1 text-[18px] ${
                    isActive ? 'font-bold' : 'font-medium'
                  }`}
                >
                  {route.name}
                </p>
                {/* Dropdown toggle button */}
                {route.subpages.length > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent click from triggering NavLink
                      toggleDropdown(index);
                    }}
                    className={`ml-auto text-white group hover:text-[#156082] active:text-[#156082] ${
                      isActive ? 'text-[#156082]' : '' // Blue when active
                    }`}
                  >
                    {openDropdown === index ? (
                      <ChevronUpIcon className="w-5 h-5 text-[#156082]" />
                    ) : (
                      <ChevronDownIcon
                        className={`w-5 h-5 ${isActive ? 'text-[#156082]' : 'text-white group-hover:text-[#156082]'}`}
                      />
                    )}
                  </button>
                )}
              </div>
            </NavLink>

            {/* Subpages Dropdown (only for first 2 routes) */}
            {openDropdown === index && route.subpages.length > 0 && (
              <div className="mt-2 text-center">
                {route.subpages.map((subpage, subIndex) => {
                  const isSubActive = activeRoute(subpage.path); // Check if the subpage is active

                  return (
                    <NavLink
                      key={subIndex}
                      href={subpage.path}
                      className={`hover:text-[#156082] `}
                      isActive={(match, location) => location.pathname === subpage.path} // Active if pathname matches subpage path
                    >
                      <div
                        className={`px-4 py-2 rounded-lg w-full mb-2 transition-all ease-in-out duration-200 ${
                          isSubActive
                            ? 'bg-[#ECF2FF] text-[#156082] font-bold' // Active state
                            : 'bg-[#F9F9F9] text-[#505759]' // Default state
                        } 
                        hover:bg-[#ECF2FF] hover:text-[#156082] hover:font-bold`} // Hover effects
                      >
                        {subpage.name}
                      </div>
                    </NavLink>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default SidebarLinks;
