'use client';
import React, { useState } from 'react';
import { FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

const NotificationPage = () => {
  const [alerts, setAlerts] = useState<string[]>([]);
  const [stationOverview, setStationOverview] = useState([
    { stationName: 'IESO', status: 'Normal', downtime: '3 hours' },
    { stationName: 'Collectdev LP', status: 'Weather', downtime: '5 hours' },
    {
      stationName: '33 Isabella Street',
      status: 'Maintenance',
      downtime: '7 hours',
    },
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Title */}
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-semibold text-gray-900">
          Station Alerts & Notifications
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
      <div className="mb-6 rounded-lg bg-white p-6 shadow-xl">
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
                  className={`${
                    station.status === 'Critical' ? 'bg-red-50' : 'bg-white'
                  } transition-all hover:bg-gray-100`}
                >
                  <td className="px-4 py-2 font-medium text-gray-800">
                    {station.stationName}
                  </td>
                  <td
                    className={`px-4 py-2 font-medium ${
                      station.status === 'Weather'
                        ? 'text-red-600'
                        : station.status === 'Normal'
                        ? 'text-green-600'
                        : 'text-yellow-600'
                    }`}
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
