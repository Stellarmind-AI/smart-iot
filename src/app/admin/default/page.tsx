'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {
  FaWind,
  FaChargingStation,
  FaPlug,
  FaInfoCircle,
} from 'react-icons/fa';

import MiniCalendar from 'components/calendar/MiniCalendar';
import WeeklyRevenue from 'components/admin/default/WeeklyRevenue';
import CheckTable from 'components/admin/default/CheckTable';
import tableDataCheck from 'variables/data-tables/tableDataCheck';

// Register Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend);

// Data configuration
const chartData = [
  {
    title: 'Assets',
    data: [130, 441, 30],
    labels: ['All', 'Online', 'Offline'],
    colors: ['#404040', '#59E659', '#FF7F50'],
    icon: <FaWind className="text-4xl text-gray-800 dark:text-white" />,
    showChart: true,
  },
  {
    title: 'Stations',
    data: [330, 13, 461],
    labels: ['In Use', 'Not In Use', 'Offline'],
    colors: ['#404040', '#FF7F50', '#59E659'],
    icon: (
      <FaChargingStation className="text-4xl text-gray-800 dark:text-white" />
    ),
    showChart: true,
  },
  {
    title: 'Voltage generation',
    data: [130, 21, 461],
    labels: ['Available', 'In Use', 'Unavailable'],
    colors: ['#404040', '#FF7F50', '#59E659'],
    icon: <FaPlug className="text-4xl text-gray-800 dark:text-white" />,
    showChart: true,
  },
  {
    title: 'Real Time Power',
    data: [130, 241, 461],
    topics: [
      { name: 'Low Power ', value: 23.45 },
      { name: 'High Power', value: 44.1 },
      { name: 'Low Power ', value: 21.45 },
      { name: 'High Power', value: 54.1 },
      { name: 'Low Power ', value: 19.45 },
      { name: 'High Power', value: 65.1 },
    ],
    icon: <FaInfoCircle className="text-4xl text-gray-800 dark:text-white" />,
    showChart: false,
  },
];

// Pie Chart Widget Component
const PieChartWidget = ({
  title,
  data = [],
  labels = [],
  colors = [],
  icon,
  showChart,
  topics = [],
}) => {
  const pieData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: colors,
        hoverBackgroundColor: colors.map((color) => color + 'CC'),
      },
    ],
  };

  const total = data?.reduce((sum, value) => sum + value, 0);

  return (
    <div className="flex flex-col gap-3 rounded-lg bg-white p-5 shadow-lg dark:border-navy-700 dark:bg-navy-700">
      {/* Info Section */}
      <div className="flex items-center gap-3">
        {/* Left: Icon */}
        <div className="flex items-center justify-center">{icon}</div>
        {/* Right: Title and Numbers */}
        <div>
          <h4 className="text-lg font-bold text-gray-800 dark:text-white">
            {title}
          </h4>
          {showChart && (
            <p className="text-4xl font-bold text-[#156082]">{total}</p>
          )}
        </div>
      </div>

      {/* Conditional Chart or Topics */}
      {showChart ? (
        <div className="flex flex-col items-center">
          <div className="w-full">
            <Pie
              data={pieData}
              options={{
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </div>

          {/* Labels */}
          <div className="mt-3 flex w-full justify-between text-sm">
            {labels?.map((label, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: colors[index] }}
                ></div>
                <span className="mt-1 text-gray-700 dark:text-gray-300">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-3">
          {/* Display Topics and Numbers */}
          {topics?.map((topic, index) => (
            <div key={index} className="mb-2 flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">
                {topic.name}
              </span>
              <span className="text-lg font-bold text-[#156082]">
                {topic.value}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="rounded-lg bg-gray-50 p-5 dark:bg-navy-800 dark:text-white">
      {/* Widgets Section */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {chartData?.map((chart, index) => (
          <PieChartWidget
            key={index}
            title={chart.title}
            data={chart.data}
            labels={chart.labels}
            colors={chart.colors}
            icon={chart.icon}
            showChart={chart.showChart}
            topics={chart.topics}
          />
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <CheckTable tableData={tableDataCheck} />
        <WeeklyRevenue />
      </div>
    </div>
  );
};

export default Dashboard;
