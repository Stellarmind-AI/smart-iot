import {
  FaTachometerAlt,
  FaCogs,
  FaChartLine,
  FaDesktop,
} from 'react-icons/fa';

const routes = [
  {
    layout: '/admin',
    path: 'default',
    name: 'Dashboard',
    icon: <FaTachometerAlt />,
  },
  {
    layout: '/admin',
    path: 'overview',
    name: 'Station Overview',
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

export default routes;
