import React, { useState, useCallback, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import NavLink from 'components/link/NavLink';
import Image from 'next/image';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';

const SidebarLinks = (): JSX.Element => {
  const pathname = usePathname();
  const router = useRouter();
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [activeSubpage, setActiveSubpage] = useState<string | null>(null); // Track active subpage

  const activeRoute = useCallback(
    (routeName: string) => pathname === routeName,
    [pathname],
  );

  // Routes definition
  const routes = useMemo(
    () => [
      {
        layout: '/admin',
        path: 'default',
        name: 'Dashboard',
        hasPage: true,
        whiteImg: '/img/dashboards/Dashboard Icon White.png',
        blueImg: '/img/dashboards/Dashboard Icon Blue.png',
        subpages: [
          { name: 'Reporting', path: '/admin/reporting' },
          { name: 'Alerts & Notifications', path: '/admin/notification' },
        ],
      },
      {
        layout: '/admin',
        path: 'voltage',
        name: 'Assets',
        hasPage: false,
        whiteImg: '/img/dashboards/DAKET Icon White.png',
        blueImg: '/img/dashboards/DAKET Icon Blue.png',
        subpages: [
          { name: 'Location Management', path: '/admin/location' },
          { name: 'Station Management', path: '/admin/station' },
          { name: 'Add New Location', path: '/admin/newlocation' },
          { name: 'Add New Stations', path: '/admin/newstation' },
          { name: 'Firmware Management ', path: '/admin/firmware' },
        ],
      },
      {
        layout: '/admin',
        path: 'Business',
        name: 'Businesses',
        hasPage: false,
        whiteImg: '/img/dashboards/Bussines Icon White.png',
        blueImg: '/img/dashboards/Bussines Icon Blue.png',
        subpages: [
          { name: 'Manage Businesses', path: '/admin/managebusiness' },
          { name: 'Add new Business', path: '/admin/newbusiness' },
        ],
      },
      {
        layout: '/admin',
        path: 'users',
        name: 'Administration',
        hasPage: false,
        whiteImg: '/img/dashboards/Administration Icon White.png',
        blueImg: '/img/dashboards/Administration Icon Blue.png',
        subpages: [
          { name: 'User Management', path: '/admin/usermanagement' },
          { name: 'Roles & Permission', path: '/admin/roles' },
          { name: 'Add New User', path: '/admin/newuser' },
          { name: 'Add New Role', path: '/admin/newrole' },
          { name: 'Global Settings', path: '/admin/globalpage' },
        ],
      },
    ],
    [],
  );

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
    const route = routes[index];

    if (!route.hasPage && route.subpages.length > 0) {
      setActiveSubpage(route.subpages[0].path);
      router.push(route.subpages[0].path);
    }
  };

  const handleSubpageClick = (subpagePath: string) => {
    setActiveSubpage(subpagePath);
    router.push(subpagePath);
  };

  const handleParentClick = (index: number, hasPage: boolean) => {
    if (!hasPage) {
      toggleDropdown(index);
    } else {
      router.push(routes[index].layout + '/' + routes[index].path);
      toggleDropdown(index);
    }
  };

  const MemoizedNavLink = React.memo(({ route, isActive, isHovered }: any) => (
    <NavLink
      href={`${route.layout}/${route.path}`}
      className="flex flex-1 items-center"
    >
      <span className="relative flex items-center">
        <Image
          src={isHovered || isActive ? route.blueImg : route.whiteImg}
          alt={`${route.name} Icon`}
          width={24}
          height={24}
          priority
        />
      </span>
      <p
        className={`leading-1 ml-4 text-[18px] ${
          isActive ? 'font-bold' : 'font-medium'
        }`}
      >
        {route.name}
      </p>
    </NavLink>
  ));

  return (
    <>
      {routes.map((route, index) => {
        const isActive = useMemo(
          () =>
            activeRoute(route.layout + '/' + route.path) ||
            route.subpages.some((subpage) => activeRoute(subpage.path)) ||
            openDropdown === index,
          [activeRoute, route, openDropdown],
        );

        const borderRadiusClass =
          index === 0
            ? 'rounded-tl-xl rounded-tr-xl'
            : index === routes.length - 1
            ? 'rounded-bl-xl rounded-br-xl'
            : '';

        return (
          <div key={index}>
            <div
              className={`group relative flex items-center px-4 py-4 transition-all duration-200 ${borderRadiusClass} ${
                isActive
                  ? 'bg-[#ECF2FF] text-[#156082]'
                  : 'bg-[#156082] text-white hover:bg-[#ECF2FF] hover:font-bold hover:text-[#156082]'
              } cursor-pointer`}
              onClick={() => handleParentClick(index, route.hasPage)}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <MemoizedNavLink
                route={route}
                isActive={isActive}
                isHovered={hoverIndex === index}
              />

              {route.subpages.length > 0 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown(index);
                  }}
                  className={`group ml-auto text-white hover:text-[#156082] ${
                    isActive ? 'text-[#156082]' : ''
                  }`}
                >
                  {openDropdown === index ? (
                    <ChevronUpIcon className="h-5 w-5 text-[#156082]" />
                  ) : (
                    <ChevronDownIcon
                      className={`h-5 w-5 ${
                        isActive
                          ? 'text-[#156082]'
                          : 'text-white group-hover:text-[#156082]'
                      }`}
                    />
                  )}
                </button>
              )}
            </div>

            {openDropdown === index && route.subpages.length > 0 && (
              <div className="mt-2 text-center">
                {route.subpages.map((subpage, subIndex) => {
                  const isSubActive = activeSubpage === subpage.path;

                  return (
                    <div
                      key={subIndex}
                      className={`mb-2 w-full rounded-lg px-4 py-2 transition-all duration-200 ease-in-out ${
                        isSubActive
                          ? 'bg-[#ECF2FF] font-bold text-[#156082]'
                          : 'bg-[#F9F9F9] text-[#505759]'
                      } cursor-pointer hover:bg-[#ECF2FF] hover:font-bold hover:text-[#156082]`}
                      onClick={() => handleSubpageClick(subpage.path)}
                    >
                      {subpage.name}
                    </div>
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

export default React.memo(SidebarLinks);
