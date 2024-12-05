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

import WeeklyRevenue from 'components/admin/default/WeeklyRevenue';
import CheckTable from 'components/admin/default/CheckTable';
import tableDataCheck from 'variables/data-tables/tableDataCheck';

// Register Chart.js elements and chartjs-plugin-datalabels
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { MdHeight, MdPadding } from 'react-icons/md';
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

// Custom plugin for center text
const centerTextPlugin = {
  id: 'centerText',
  beforeDraw: (chart) => {
    try {
      const { ctx, chartArea } = chart;

      if (!chartArea) {
        console.error('Chart area is not defined');
        return;
      }

      // Retrieve options for centerText plugin
      const bgColor =
        chart.config.options.plugins?.centerText?.bgColor || '#156082';
      const text = chart.config.options.plugins?.centerText?.text;
      const fontSize =
        chart.config.options.plugins?.centerText?.font?.size || 24;
      const fontWeight =
        chart.config.options.plugins?.centerText?.font?.weight || 'bold';
      const fontFamily =
        chart.config.options.plugins?.centerText?.font?.family || 'Arial';
      const color =
        chart.config.options.plugins?.centerText?.color || '#FFFFFF';

      if (!text) {
        console.error('No text provided for centerText');
        return;
      }

      const { width, height } = chart;
      const radius = Math.min(width, height) / 2; // Calculate radius for clipping

      ctx.save();

      // Clip to the circular area of the pie chart
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();

      // Fill the circular background
      ctx.fillStyle = bgColor;
      ctx.fillRect(
        chartArea.left,
        chartArea.top,
        chartArea.width,
        chartArea.height,
      );

      // Draw the center text
      ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle'; // Ensures vertical alignment
      ctx.fillText(text, width / 2, height / 2);

      ctx.restore();
    } catch (error) {
      console.error('Error in centerTextPlugin:', error);
    }
  },
};

ChartJS.register(centerTextPlugin);

// Chart data configuration
const chartData = [
  {
    title: `Active Stations\n DAKET`,
    data: [657],
    icon: (
      <img
        src="/img/dashboards/DAKETIconBlue.png"
        alt="Assets Icon"
        className="h-12 w-12 object-contain"
      />
    ),
    color: '#156082',
    showChart: true,
  },
  {
    title: 'Real Time Power\n MW',
    data: [8.7],
    icon: (
      <img
        src="/img/dashboards/Realtime.png"
        alt="Assets Icon"
        className="h-12 w-12 object-contain"
      />
    ),
    color: '#156082',
    showChart: true,
  },
  {
    title: 'Total Power 24 HR \n MWH',
    data: [207.3],
    icon: (
      <img
        src="/img/dashboards/BatteryEVChargerIconBlue.png"
        alt="Assets Icon"
        className="h-12 w-12 object-contain"
      />
    ),
    color: '#156082',
    showChart: true,
  },
  {
    title: 'Data Analytics',
    icon: (
      <img
        src="/img/dashboards/WebAppIconBlue.png"
        alt="Assets Icon"
        className="h-12 w-12 object-contain"
      />
    ),
    color: '#156082',
    showChart: false, // Chart hidden for this entry
  },
];

// Pie Chart Widget Component
const PieChartWidget = ({
  title,
  data = [],
  color = '#156082',
  icon,
  topics = [],
  showChart = true, // Added showChart prop
}) => {
  const pieData = {
    datasets: [
      {
        data: data,
        borderWidth: 0,
      },
    ],
  };
  const total = data?.reduce((sum, value) => sum + value, 0);
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
      centerText: {
        display: true,
        text: `${total}`,
        color: '#FFFFFF',
        font: {
          size: 44,
          weight: 'bold',
        },
        bgColor: color,
      },
      datalabels: { display: false },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };
  // Split title by '\n'
  const [titlePart1, titlePart2] = title.split('\n');

  return (
    <div
      className="relative flex flex-col gap-3 rounded-lg bg-gradient-to-t from-[#8DB2C2] to-white p-5 shadow-lg dark:border-navy-700 dark:bg-navy-700"
      style={{
        boxShadow: `-5px -2px 5px rgba(21, 96, 130, 0.3)`,
      }}
    >
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center">{icon}</div>
        <div>
          <h4 className="text-lg font-bold text-daketBlue dark:text-white">
            {titlePart1}{' '}
            <span className="text-xl font-extrabold text-daketBlue dark:text-gray-200">
              {titlePart2}
            </span>
          </h4>
        </div>
      </div>
      {showChart ? (
        <div className="flex items-center justify-center">
          <div
            className="relative flex h-48 w-48 items-center justify-center rounded-full bg-gray-50"
            style={{
              background: `linear-gradient(to top, ${color} 20%, #ffffff 100%)`,
            }}
          >
            <Pie
              className="bg-transparent z-10"
              data={pieData}
              options={pieOptions}
            />
          </div>
        </div>
      ) : (
        <div className="h-48 w-48"></div> // Keeps the layout consistent when no chart is displayed
      )}
    </div>
  );
};

// Dashboard Component
const Dashboard = () => {
  return (
    <div className="rounded-lg  p-5 dark:bg-navy-800 dark:text-white">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {chartData?.map((chart, index) => (
          <PieChartWidget
            key={index}
            title={chart.title}
            data={chart.data}
            color={chart.color}
            icon={chart.icon}
            showChart={chart.showChart} // Pass showChart prop
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
