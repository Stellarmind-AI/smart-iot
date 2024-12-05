import React, { useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import NavLink from 'components/link/NavLink';
import Image from 'next/image';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid'; // v2 path

export const SidebarLinks = (): JSX.Element => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  const activeRoute = useCallback(
    (routeName: string) => pathname === routeName,
    [pathname]
  );

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
      subpages: [
        { name: 'Manage Businesses', path: '/comingsoon' },
        { name: 'Add new Business', path: '/comingsoon' },
      ], // No subpages, just a regular nav item
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
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <>
      {routes.map((route, index) => {
        const isActive =
          activeRoute(route.layout + '/' + route.path) ||
          route.subpages.some(subpage => activeRoute(subpage.path));

        let borderRadiusClass = '';
        if (index === 0) borderRadiusClass = 'rounded-tl-xl rounded-tr-xl';
        if (index === routes.length - 1) borderRadiusClass = 'rounded-bl-xl rounded-br-xl';

        return (
          <div key={index}>
            <div
              className={`group relative flex items-center px-4 py-4 transition-all duration-200 ${borderRadiusClass} ${
                isActive
                  ? 'bg-[#ECF2FF] text-[#156082]'
                  : 'bg-[#156082] text-white hover:bg-[#ECF2FF] hover:text-[#156082] hover:font-bold'
              }`}
            >
              <NavLink href={`${route.layout}/${route.path}`} className="flex items-center flex-1">
                <span className="relative flex items-center">
                  {!isActive && (
                    <Image
                      src={route.whiteImg}
                      alt={`${route.name} Icon Inactive`}
                      width={24}
                      height={24}
                      className="absolute transition-opacity duration-200 group-hover:opacity-0"
                    />
                  )}
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
                <p className={`ml-4 leading-1 text-[18px] ${isActive ? 'font-bold' : 'font-medium'}`}>
                  {route.name}
                </p>
              </NavLink>

              {route.subpages.length > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering NavLink navigation
                    toggleDropdown(index);
                  }}
                  className={`ml-auto text-white group hover:text-[#156082] ${
                    isActive ? 'text-[#156082]' : ''
                  }`}
                >
                  {openDropdown === index ? (
                    <ChevronUpIcon className="w-5 h-5 text-[#156082]" />
                  ) : (
                    <ChevronDownIcon
                      className={`w-5 h-5 ${
                        isActive ? 'text-[#156082]' : 'text-white group-hover:text-[#156082]'
                      }`}
                    />
                  )}
                </button>
              )}
            </div>

            {openDropdown === index && route.subpages.length > 0 && (
              <div className="mt-2 text-center">
                {route.subpages.map((subpage, subIndex) => {
                  const isSubActive = activeRoute(subpage.path);

                  return (
                    <NavLink
                      key={subIndex}
                      href={subpage.path}
                      className={`hover:text-[#156082]`}
                    >
                      <div
                        className={`px-4 py-2 rounded-lg w-full mb-2 transition-all ease-in-out duration-200 ${
                          isSubActive
                            ? 'bg-[#ECF2FF] text-[#156082] font-bold'
                            : 'bg-[#F9F9F9] text-[#505759]'
                        } hover:bg-[#ECF2FF] hover:text-[#156082] hover:font-bold`}
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
