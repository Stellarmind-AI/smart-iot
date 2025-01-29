'use client';
import React, { useState } from 'react';
import { FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
const NotificationPage = () => {
  const [alerts, setAlerts] = useState<string[]>([]);
  const [stationOverview, setStationOverview] = useState([
    { stationName: 'ECI Technology', status: 'Normal', downtime: '3 hours' },
    { stationName: 'GM Wind Tunnel', status: 'Weather', downtime: '5 hours' },
  ]);

  const addAlert = (alertMessage: string) => {
    setAlerts((prevAlerts) => [...prevAlerts, alertMessage]);
  };

  const handleGenerateReport = () => {
    addAlert('Report generated successfully.');
  };

  const checkStationOvertime = () => {
    stationOverview.forEach((station) => {
      const downtimeHours = parseInt(station.downtime.split(' ')[0]);
      if (downtimeHours > 4) {
        addAlert(`${station.stationName} has exceeded downtime threshold!`);
      }
    });
  };

  const updateStationOverview = () => {
    checkStationOvertime();
  };

  const router = useRouter();
  const navigateToDashboard = () => {
    router.push('/admin/default'); // Replace with the actual route for the add-location page
  };

  const navigateToAssets = () => {
    router.push('/admin/location');
  };

  const navigateToBusinesses = () => {
    router.push('/admin/managebusiness');
  };

  const navigateToAdministration = () => {
    router.push('/admin/usermanagement');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Navigation Buttons */}
      <div className="mb-4 flex items-center gap-4">
        {/* Back to Dashboard Button */}
        <div className="flex items-center">
          <button
            onClick={navigateToDashboard} // Replace with your navigation logic
            className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#ECF2FF] text-[#5D90A7] shadow-sm hover:bg-daketBlue hover:text-white"
            title="Back to Dashboard"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="h-6 w-6 transform transition-transform duration-300 group-hover:scale-125"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>

        {/* Additional Buttons */}
        {[
          { label: 'Assets', onClick: navigateToAssets },
          { label: 'Businesses', onClick: navigateToBusinesses },
          { label: 'Administration', onClick: navigateToAdministration },
        ].map((btn, index) => (
          <button
            key={index}
            onClick={btn.onClick} // Replace with the respective navigation logic
            className="rounded-full bg-[#ECF2FF] px-6 py-2 font-bold text-[#5D90A7] shadow-sm transition-transform duration-300 hover:scale-105 hover:bg-daketBlue hover:text-white"
            title={btn.label}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Title */}
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-semibold text-gray-900">
          Alerts & Notifications
        </h1>
      </div>

      {/* Alerts Section */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Recent Alerts
        </h2>
        <div className="space-y-4">
          {alerts.length === 0 ? (
            <p className="text-gray-500">No alerts at the moment.</p>
          ) : (
            alerts.map((alert, index) => (
              <div
                key={index}
                className="flex items-center rounded-lg border-l-4 border-yellow-400 bg-yellow-50 p-4"
              >
                <FaExclamationTriangle
                  className="mr-3 text-yellow-600"
                  size={24}
                />
                <p className="text-gray-800">{alert}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Station Overview Section */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow-2xl">
        <h2 className="mb-4 text-xl font-semibold text-gray-900">
          Station Overview
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left text-gray-800">
                  Station Name
                </th>
                <th className="px-4 py-2 text-left text-gray-800">Status</th>
                <th className="px-4 py-2 text-left text-gray-800">Downtime</th>
              </tr>
            </thead>
            <tbody>
              {stationOverview.map((station, index) => (
                <tr
                  key={index}
                  className={`$
                    {station.status === 'Critical' ? 'bg-red-50' : 'bg-white'}
                    transition-all hover:bg-gray-100`}
                >
                  <td className="px-4 py-2 font-medium text-gray-800">
                    {station.stationName}
                  </td>
                  <td
                    className={`$ {station.status === 'Weather'
                      ? 'text-red-600' :
                        station.status ===
                        'Normal' ? 'text-green-600' :
                        'text-yellow-600'} px-4
                        py-2 font-medium`}
                  >
                    {station.status}
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {station.downtime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={updateStationOverview}
          className="mt-6 transform rounded-lg bg-gradient-to-r from-daketBlue to-daketBlue px-6 py-2 text-white transition-all hover:scale-105 hover:shadow-lg"
        >
          Check Station Status
        </button>
      </div>

      {/* Report Generation Section */}
      <div className="mt-6 text-center">
        <button
          onClick={handleGenerateReport}
          className="transform rounded-lg bg-gradient-to-r from-daketBlue to-daketBlue px-6 py-2 text-white transition-all hover:scale-105 hover:shadow-lg"
        >
          Generate Report
        </button>
      </div>
    </div>
  );
};

export default NotificationPage;
