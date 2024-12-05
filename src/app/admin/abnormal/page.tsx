'use client';
import React, { useState } from 'react';

const AbnormalEventsPage = () => {
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
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      {/* Title */}
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-semibold text-gray-900">Abnormal Event</h1>
      </div>

      {/* Alerts Section */}
      <div className="mb-8 rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Alerts & Notifications
        </h2>
        {alerts.length === 0 ? (
          <p className="text-gray-500">No alerts at the moment.</p>
        ) : (
          <ul className="space-y-3">
            {alerts.map((alert, index) => (
              <li
                key={index}
                className="flex items-center space-x-3 rounded-lg border-l-4 border-yellow-500 bg-yellow-100 px-4 py-2 shadow"
              >
                <span className="font-medium text-yellow-600">{alert}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Station Overview Section */}
      <div className="mb-8 rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Station Overview
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-left text-sm text-gray-800">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 font-semibold">Station Name</th>
                <th className="px-4 py-2 font-semibold">Status</th>
                <th className="px-4 py-2 font-semibold">Downtime</th>
              </tr>
            </thead>
            <tbody>
              {stationOverview.map((station, index) => (
                <tr
                  key={index}
                  className={`${
                    station.status === 'Weather' ? 'bg-red-100' : 'bg-white'
                  } border-b hover:bg-gray-100`}
                >
                  <td className="px-4 py-2">{station.stationName}</td>
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
                  <td className="px-4 py-2">{station.downtime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          onClick={updateStationOverview}
          className="mt-4 w-full rounded-lg bg-daketBlue px-6 py-2 text-white shadow-md transition-transform hover:scale-105 hover:bg-daketBlue md:w-auto"
        >
          Check Station Status
        </button>
      </div>

      {/* Report Generation Section */}
      <div className="text-center">
        <button
          onClick={handleGenerateReport}
          className="rounded-lg bg-daketBlue px-6 py-2 text-white shadow-md transition-transform hover:scale-105 hover:bg-daketBlue"
        >
          Generate Report
        </button>
      </div>
    </div>
  );
};

export default AbnormalEventsPage;
