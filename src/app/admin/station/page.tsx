'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
const StationManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Active' | 'Decommissioned'>(
    'Active',
  );
  const [filters, setFilters] = useState({
    location: '',
    station: '',
    model: '',
    connector: '',
    connectorStatus: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [tableData, setTableData] = useState<any[]>([]);

  const handleTabChange = (tab: 'Active' | 'Decommissioned') => {
    setActiveTab(tab);
    setFilters({
      location: '',
      station: '',
      model: '',
      connector: '',
      connectorStatus: '',
    });
    setTableData([]);
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleApply = () => {
    // Mock data for tables , , , Street, Park
    const mockData =
      activeTab === 'Active'
        ? [
            {
              onlineOffline: 'Online',
              station: 'D60',
              location: 'Sault Site',
              connectorStatus: 'Connected',
              model: 'Model X',
              firmwareVersion: '1.2.3',
              serialNumber: 'SN12345',
              lastOnline: '2024-12-05 10:00 AM',
            },
            {
              onlineOffline: 'Offline',
              station: 'D90',
              location: 'Toronto Street',
              connectorStatus: 'Disconnected',
              model: 'Model Y',
              firmwareVersion: '2.3.4',
              serialNumber: 'SN67890',
              lastOnline: '2024-12-01 03:00 PM',
            },
            {
              onlineOffline: 'Online',
              station: 'D120',
              location: 'Isabella Street',
              connectorStatus: 'Charging',
              model: 'Model A',
              firmwareVersion: '1.0.0',
              serialNumber: 'SN22334',
              lastOnline: '2024-12-04 05:00 PM',
            },
            {
              onlineOffline: 'Offline',
              station: 'D90x',
              location: 'Coalex Street',
              connectorStatus: 'Error',
              model: 'Model B',
              firmwareVersion: '2.1.5',
              serialNumber: 'SN55678',
              lastOnline: '2024-12-03 11:30 AM',
            },
            {
              onlineOffline: 'Online',
              station: 'A10 kilowatt',
              location: 'Green Park',
              connectorStatus: 'Ready',
              model: 'Model C',
              firmwareVersion: '3.0.7',
              serialNumber: 'SN66789',
              lastOnline: '2024-12-05 08:00 AM',
            },
            {
              onlineOffline: 'Offline',
              station: 'A25 kilowatt',
              location: 'Coalex Street',
              connectorStatus: 'Disconnected',
              model: 'Model D',
              firmwareVersion: '4.0.9',
              serialNumber: 'SN77890',
              lastOnline: '2024-11-30 02:00 PM',
            },
            {
              onlineOffline: 'Online',
              station: 'A50 kilowatt',
              location: 'Toronto Street',
              connectorStatus: 'Connected',
              model: 'Model E',
              firmwareVersion: '5.1.2',
              serialNumber: 'SN88901',
              lastOnline: '2024-12-05 09:30 AM',
            },
          ]
        : [
            {
              station: 'D60',
              location: 'Sault Site',
              model: 'Model Z',
              firmwareVersion: '3.4.5',
              serialNumber: 'SN11223',
              lastOnline: '2024-11-28 01:00 PM',
            },
            {
              station: 'D90',
              location: 'Toronto Street',
              model: 'Model W',
              firmwareVersion: '4.5.6',
              serialNumber: 'SN44556',
              lastOnline: '2024-11-20 08:00 AM',
            },
            {
              station: 'D120',
              location: 'Isabella Street',
              model: 'Model F',
              firmwareVersion: '6.0.1',
              serialNumber: 'SN99112',
              lastOnline: '2024-11-25 06:30 PM',
            },
            {
              station: 'D90x',
              location: 'Coalex Street',
              model: 'Model G',
              firmwareVersion: '7.1.3',
              serialNumber: 'SN99223',
              lastOnline: '2024-11-22 04:00 PM',
            },
            {
              station: 'A10 kilowatt',
              location: 'Green Park',
              model: 'Model H',
              firmwareVersion: '8.2.4',
              serialNumber: 'SN99334',
              lastOnline: '2024-11-18 10:15 AM',
            },
            {
              station: 'A25 kilowatt',
              location: 'Toronto Street',
              model: 'Model I',
              firmwareVersion: '9.3.5',
              serialNumber: 'SN99445',
              lastOnline: '2024-11-15 03:45 PM',
            },
            {
              station: 'A50 kilowatt',
              location: 'Coalex Street',
              model: 'Model J',
              firmwareVersion: '10.0.0',
              serialNumber: 'SN99556',
              lastOnline: '2024-11-10 07:00 AM',
            },
          ];

    setTableData(mockData);
  };

  const handleReset = () => {
    setFilters({
      location: '',
      station: '',
      model: '',
      connector: '',
      connectorStatus: '',
    });
    setSearchQuery('');
    setTableData([]);
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
    <div className="p-6">
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
          {/* <span className="ml-4 text-lg font-bold text-gray-800">Back</span> */}
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

      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Station Management</h1>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex space-x-4 pt-2">
        <button
          className={`rounded px-4 py-2 font-semibold ${
            activeTab === 'Active'
              ? 'bg-daketBlue text-white hover:scale-105'
              : 'bg-gray-200 hover:scale-105'
          }`}
          onClick={() => handleTabChange('Active')}
        >
          Active
        </button>
        <button
          className={`rounded px-4 py-2 font-semibold ${
            activeTab === 'Decommissioned'
              ? 'bg-daketBlue text-white hover:scale-105'
              : 'bg-gray-200 hover:scale-105'
          }`}
          onClick={() => handleTabChange('Decommissioned')}
        >
          Decommissioned
        </button>
      </div>

      {/* Filters */}
      <div className="mb-4 grid grid-cols-2 gap-4 md:grid-cols-5">
        <select
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
          className="rounded border p-2"
        >
          <option value="">All Locations</option>
          <option value="Sault Site">Sault Site</option>
          <option value="Toronto Street">Toronto Street</option>
          <option value="Isabella Street">Isabella Street</option>
          <option value="Coalex Street">Coalex Street</option>
          <option value="Green Park">Green Park</option>
        </select>
        <select
          name="station"
          value={filters.station}
          onChange={handleFilterChange}
          className="rounded border p-2"
        >
          <option value="">All Station</option>
          <option value="D60">D60</option>
          <option value="D90">D90</option>
          <option value="D120">D120</option>
          <option value="D90x">D90x</option>
          <option value="A10 kilowatt">A10 kilowatt</option>
          <option value="A25 kilowatt">A25 kilowatt</option>
          <option value="A50 kilowatt">A50 kilowatt</option>
          <option value="A100 kilowatt">A100 kilowatt</option>
        </select>
        {/* <select
          name="model"
          value={filters.model}
          onChange={handleFilterChange}
          className="rounded border p-2"
        >
          <option value="">All Models</option>
          <option value="Model X">Model X</option>
          <option value="Model Y">Model Y</option>
        </select>
        <select
          name="connector"
          value={filters.connector}
          onChange={handleFilterChange}
          className="rounded border p-2"
        >
          <option value="">All Connectors</option>
          <option value="Connector 1">Connector 1</option>
          <option value="Connector 2">Connector 2</option>
        </select>
        {activeTab === 'Active' && (
          <select
            name="connectorStatus"
            value={filters.connectorStatus}
            onChange={handleFilterChange}
            className="rounded border p-2"
          >
            <option value="">All Connector Status</option>
            <option value="Connected">Connected</option>
            <option value="Disconnected">Disconnected</option>
          </select>
        )} */}

        {/* Actions */}
        <div className="mt-4 space-x-4">
          <button
            onClick={handleApply}
            className="rounded bg-daketBlue px-4 py-2 text-white hover:scale-105"
          >
            Apply
          </button>
          <button
            onClick={handleReset}
            className="rounded bg-gray-200 px-4 py-2 text-gray-900"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Toolbar */}
      {activeTab === 'Active' && (
        <div className="mb-6 flex items-center space-x-4">
          <div>
            <span className="font-bold">{`Stations (${tableData.length})`}</span>
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-64 rounded border px-4 py-2"
          />
          <button className="text-black rounded bg-gray-200 px-4 py-2">
            All
          </button>
          <button className="text-black rounded bg-gray-200 px-4 py-2">
            Online
          </button>
          <button className="text-black rounded bg-gray-200 px-4 py-2">
            Offline
          </button>
          <button className="rounded bg-daketBlue px-4 py-2 text-white">
            Export Stations
          </button>
          {/* <button className="rounded bg-daketBlue px-4 py-2 text-white">
            Download QR Codes
          </button> */}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto rounded-lg bg-white shadow-lg">
          <thead>
            <tr className="bg-gray-500">
              {activeTab === 'Active' && (
                <>
                  <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Online/Offline
                  </th>
                  <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Station
                  </th>
                  <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Location
                  </th>
                  <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Serial Number
                  </th>
                  <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Last Online
                  </th>
                </>
              )}
              {activeTab === 'Decommissioned' && (
                <>
                  <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Station
                  </th>
                  <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Location
                  </th>
                  <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Serial Number
                  </th>
                  <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Last Online
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                {activeTab === 'Active' && (
                  <>
                    <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b px-6 py-4 text-sm text-gray-800">
                      {row.onlineOffline}
                    </td>
                    <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b px-6 py-4 text-sm text-gray-800">
                      {row.station}
                    </td>
                    <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b px-6 py-4 text-sm text-gray-800">
                      {row.location}
                    </td>
                    <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b px-6 py-4 text-sm text-gray-800">
                      {row.serialNumber}
                    </td>
                    <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b px-6 py-4 text-sm text-gray-800">
                      {row.lastOnline}
                    </td>
                  </>
                )}
                {activeTab === 'Decommissioned' && (
                  <>
                    <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b px-6 py-4 text-sm text-gray-800">
                      {row.station}
                    </td>
                    <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b px-6 py-4 text-sm text-gray-800">
                      {row.location}
                    </td>
                    <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b px-6 py-4 text-sm text-gray-800">
                      {row.serialNumber}
                    </td>
                    <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b px-6 py-4 text-sm text-gray-800">
                      {row.lastOnline}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StationManagement;
