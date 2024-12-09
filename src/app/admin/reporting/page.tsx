'use client';
import React, { useState } from 'react';

const ReportingPage = () => {
  const [filters, setFilters] = useState({
    stationName: '',
    startDate: '',
    endDate: '',
    reportingType: '',
  });

  const [reportData, setReportData] = useState([]);
  const mockData = [
    {
      stationName: 'IESO',
      downtime: '3 hours',
      reportingType: 'Energy Report',
      startTime: '2024-12-01 10:00',
      endTime: '2024-12-01 13:00',
    },
    {
      stationName: 'IESO',
      downtime: '1 hour',
      reportingType: 'Energy Report',
      startTime: '2024-12-01 17:00',
      endTime: '2024-12-01 18:00',
    },
    {
      stationName: 'Collectdev LP',
      downtime: '2 hours',
      reportingType: 'Weather Report',
      startTime: '2024-12-02 15:00',
      endTime: '2024-12-02 17:00',
    },
    {
      stationName: '33 Isabella Street',
      downtime: '7 hours',
      reportingType: 'Performance Report',
      startTime: '2024-12-04 18:00',
      endTime: '2024-12-05 01:00',
    },
    {
      stationName: 'Central Park Station',
      downtime: '5 hours',
      reportingType: 'Traffic Update',
      startTime: '2024-12-06 09:00',
      endTime: '2024-12-06 14:00',
    },
    {
      stationName: 'Downtown Hub',
      downtime: '3 hours',
      reportingType: 'Emergency Maintenance Report',
      startTime: '2024-12-07 12:00',
      endTime: '2024-12-07 15:00',
    },
    {
      stationName: 'Main Street Station',
      downtime: '6 hours',
      reportingType: 'Weather Report',
      startTime: '2024-12-08 08:00',
      endTime: '2024-12-08 14:00',
    },
    {
      stationName: 'Westside Station',
      downtime: '4 hours',
      reportingType: 'Traffic Report',
      startTime: '2024-12-09 16:00',
      endTime: '2024-12-09 20:00',
    },
  ];

  // Extract unique station names for the dropdown
  const stationNames = Array.from(
    new Set(mockData.map((item) => item.stationName)),
  );

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleGenerateReport = () => {
    const filteredData = mockData.filter((item) => {
      const matchesStationName = filters.stationName
        ? item.stationName === filters.stationName
        : true;

      const matchesReportingType = filters.reportingType
        ? item.reportingType === filters.reportingType
        : true;

      const matchesStartDate = filters.startDate
        ? new Date(item.startTime).toDateString() ===
          new Date(filters.startDate).toDateString()
        : true;

      const matchesEndDate = filters.endDate
        ? new Date(item.endTime).toDateString() ===
          new Date(filters.endDate).toDateString()
        : true;

      return (
        matchesStationName &&
        matchesReportingType &&
        matchesStartDate &&
        matchesEndDate
      );
    });

    setReportData(filteredData);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Station Reporting</h1>
      </div>

      {/* Filters Section */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow-2xl">
        <h2 className="mb-4 text-lg font-bold text-gray-800">Filters</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Station Name
            </label>
            <select
              name="stationName"
              value={filters.stationName}
              onChange={handleFilterChange}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            >
              <option value="">All Stations</option>
              {stationNames.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Reporting Type
            </label>
            <select
              name="reportingType"
              value={filters.reportingType}
              onChange={handleFilterChange}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            >
              <option value="">All Types</option>
              <option value="Energy Report">Energy Report</option>
              <option value="Weather Report">Weather Report</option>
              <option value="Performance Report">Performance Report</option>
              <option value="Traffic Report">Traffic Report</option>
              <option value="Emergency Maintenance Report">
                Emergency Maintenance Report
              </option>
            </select>
          </div>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={handleGenerateReport}
            className="rounded-lg bg-daketBlue px-6 py-2 text-white hover:bg-daketBlue"
          >
            Generate Report
          </button>
        </div>
      </div>

      {/* Report Section */}
      <div className="rounded-lg bg-white p-6 shadow-2xl">
        <h2 className="mb-4 text-lg font-bold text-gray-800">Report</h2>
        {reportData.length === 0 ? (
          <p className="text-gray-500">
            No data available. Please filter and generate a report.
          </p>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Station Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Downtime
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Reporting Type
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Start Time
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  End Time
                </th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((data, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">
                    {data.stationName}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {data.downtime}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {data.reportingType}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {data.startTime}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {data.endTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ReportingPage;
