'use client';
import React from 'react';
import {
  FaWind,
  FaBatteryFull,
  FaPlug,
  FaThermometerHalf,
} from 'react-icons/fa';
import { MdOutlineBolt } from 'react-icons/md';
const stationOverviewData = [
  {
    title: 'IESO Sault Site',
    metrics: [
      { label: 'Turbine Speed', value: '10 rpm' },
      { label: 'Gear Selection', value: '3:18' },
      { label: 'GEN Speed', value: '300 rpm' },
    ],
    icon: (
      <img
        src="/img/dashboards/DAKETIconBlue.png" // Replace with your image URL
        alt="Wind Turbine Icon"
        className="h-12 w-12 object-contain" // Adjust size with Tailwind classes
      />
    ),
  },
  {
    title: 'Real Time Power-Battery',
    metrics: [
      { label: 'BAT Capacity', value: '8.5 kW' },
      { label: 'BAT Voltage', value: '379 Vac' },
      { label: 'BAT Temp.', value: '25°C' },
    ],
    icon: (
      <img
        src="/img/dashboards/BatteryIconBlue.png" // Replace with your image URL
        alt="Wind Turbine Icon"
        className="h-12 w-12 object-contain" // Adjust size with Tailwind classes
      />
    ),
  },
  {
    title: 'Real Time Power-Inverter',
    metrics: [
      { label: 'Power', value: '8.5 kW' },
      { label: 'Voltage', value: '379 Vac' },
      { label: 'Current', value: '15.07 A' },
    ],
    icon: (
      <img
        src="/img/dashboards/InverterIconBlue.png" // Replace wit   h your image URL
        alt="Wind Turbine Icon"
        className="h-12 w-12 object-contain" // Adjust size with Tailwind classes
      />
    ),
  },
  {
    title: 'Environment',
    metrics: [
      { label: 'Temperature', value: '25°C' },
      { label: 'Humidity', value: '50% RH' },
      { label: 'Air Velocity', value: '8.5 m/s' },
    ],
    icon: (
      <img
        src="/img/dashboards/Nature.png" // Replace with your image URL
        alt="Wind Turbine Icon"
        className="h-12 w-12 object-contain" // Adjust size with Tailwind classes
      />
    ),
  },
];
const Dashboard = () => {
  return (
    <div className="min-h-screen">
      {/* Sidebar Section */}
      {/* Main Content */}
      <main className="p-4">
        {/* Header */}
        {/* Station Overview Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stationOverviewData.map((section, index) => (
            <div
              key={index}
              className="flex h-auto flex-col gap-3 rounded-lg bg-white p-5 shadow-lg" // Adjusts dynamically
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3">
                {' '}
                {/* Added padding bottom */}
                <div className="flex items-center gap-2">
                  <div className="text-6xl text-[#156082] lg:text-6xl">
                    {section.icon}
                  </div>{' '}
                  {/* Bigger icon */}
                  <h2 className="text-xl font-bold text-[#156082] lg:text-xl">
                    {' '}
                    {/* Larger font */}
                    {section.title}
                  </h2>
                </div>
              </div>
              {/* Metrics */}
              <div className="mt-3">
                {section.metrics.map((metric, i) => (
                  <div
                    key={i}
                    className="flex justify-between py-6 text-[18px] font-bold"
                  >
                    <span className="text-[#156082]">
                      {' '}
                      {/* Responsive font */}
                      {metric.label}
                    </span>
                    <span className="text-[#156082]">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Architecture Diagram */}
        <div className="mt-10">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <img
              src="/img/dashboards/station_overview.png" // Replace with your uploaded image link
              alt="Station Architecture"
              className="w-full rounded-md"
            />
          </div>
        </div>
      </main>
    </div>
  );
};
export default Dashboard;
