'use client';
import React, { useState } from 'react';

const StationManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Active' | 'Decommissioned'>(
    'Active',
  );
  const [filters, setFilters] = useState({
    location: '',
    charger: '',
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
      charger: '',
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
    // Mock data for tables
    const mockData =
      activeTab === 'Active'
        ? [
            {
              onlineOffline: 'Online',
              station: 'Station A',
              location: 'Location 1',
              connectorStatus: 'Connected',
              model: 'Model X',
              cpId: '12345',
              qrCode: 'QR123',
              firmwareVersion: '1.2.3',
              serialNumber: 'SN12345',
              lastOnline: '2024-12-05 10:00 AM',
            },
            {
              onlineOffline: 'Offline',
              station: 'Station B',
              location: 'Location 2',
              connectorStatus: 'Disconnected',
              model: 'Model Y',
              cpId: '67890',
              qrCode: 'QR456',
              firmwareVersion: '2.3.4',
              serialNumber: 'SN67890',
              lastOnline: '2024-12-01 03:00 PM',
            },
            {
              onlineOffline: 'Online',
              station: 'Station E',
              location: 'Location 5',
              connectorStatus: 'Charging',
              model: 'Model A',
              cpId: '22334',
              qrCode: 'QR789',
              firmwareVersion: '1.0.0',
              serialNumber: 'SN22334',
              lastOnline: '2024-12-04 05:00 PM',
            },
            {
              onlineOffline: 'Offline',
              station: 'Station F',
              location: 'Location 6',
              connectorStatus: 'Error',
              model: 'Model B',
              cpId: '55678',
              qrCode: 'QR012',
              firmwareVersion: '2.1.5',
              serialNumber: 'SN55678',
              lastOnline: '2024-12-03 11:30 AM',
            },
            {
              onlineOffline: 'Online',
              station: 'Station G',
              location: 'Location 7',
              connectorStatus: 'Ready',
              model: 'Model C',
              cpId: '66789',
              qrCode: 'QR345',
              firmwareVersion: '3.0.7',
              serialNumber: 'SN66789',
              lastOnline: '2024-12-05 08:00 AM',
            },
            {
              onlineOffline: 'Offline',
              station: 'Station H',
              location: 'Location 8',
              connectorStatus: 'Disconnected',
              model: 'Model D',
              cpId: '77890',
              qrCode: 'QR678',
              firmwareVersion: '4.0.9',
              serialNumber: 'SN77890',
              lastOnline: '2024-11-30 02:00 PM',
            },
            {
              onlineOffline: 'Online',
              station: 'Station I',
              location: 'Location 9',
              connectorStatus: 'Connected',
              model: 'Model E',
              cpId: '88901',
              qrCode: 'QR901',
              firmwareVersion: '5.1.2',
              serialNumber: 'SN88901',
              lastOnline: '2024-12-05 09:30 AM',
            },
          ]
        : [
            {
              station: 'Station C',
              location: 'Location 3',
              model: 'Model Z',
              cpId: '11223',
              firmwareVersion: '3.4.5',
              serialNumber: 'SN11223',
              lastOnline: '2024-11-28 01:00 PM',
            },
            {
              station: 'Station D',
              location: 'Location 4',
              model: 'Model W',
              cpId: '44556',
              firmwareVersion: '4.5.6',
              serialNumber: 'SN44556',
              lastOnline: '2024-11-20 08:00 AM',
            },
            {
              station: 'Station J',
              location: 'Location 10',
              model: 'Model F',
              cpId: '99112',
              firmwareVersion: '6.0.1',
              serialNumber: 'SN99112',
              lastOnline: '2024-11-25 06:30 PM',
            },
            {
              station: 'Station K',
              location: 'Location 11',
              model: 'Model G',
              cpId: '99223',
              firmwareVersion: '7.1.3',
              serialNumber: 'SN99223',
              lastOnline: '2024-11-22 04:00 PM',
            },
            {
              station: 'Station L',
              location: 'Location 12',
              model: 'Model H',
              cpId: '99334',
              firmwareVersion: '8.2.4',
              serialNumber: 'SN99334',
              lastOnline: '2024-11-18 10:15 AM',
            },
            {
              station: 'Station M',
              location: 'Location 13',
              model: 'Model I',
              cpId: '99445',
              firmwareVersion: '9.3.5',
              serialNumber: 'SN99445',
              lastOnline: '2024-11-15 03:45 PM',
            },
            {
              station: 'Station N',
              location: 'Location 14',
              model: 'Model J',
              cpId: '99556',
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
      charger: '',
      model: '',
      connector: '',
      connectorStatus: '',
    });
    setSearchQuery('');
    setTableData([]);
  };

  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="mb-4 flex space-x-4">
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
          <option value="Location 1">Location 1</option>
          <option value="Location 2">Location 2</option>
        </select>
        <select
          name="charger"
          value={filters.charger}
          onChange={handleFilterChange}
          className="rounded border p-2"
        >
          <option value="">All Chargers</option>
          <option value="Charger 1">Charger 1</option>
          <option value="Charger 2">Charger 2</option>
        </select>
        <select
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
        )}

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
          <button className="rounded bg-gray-800 px-4 py-2 text-white">
            Export Stations
          </button>
          <button className="rounded bg-gray-800 px-4 py-2 text-white">
            Download QR Codes
          </button>
        </div>
      )}

      {/* Table */}
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
                  Connector(s) Status
                </th>
                <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                  Model
                </th>
                <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                  CP ID
                </th>
                <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                  QR Code
                </th>
                <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                  Firmware Version
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
                  Model
                </th>
                <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                  CP ID
                </th>
                <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                  Firmware Version
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
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {row.onlineOffline}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {row.station}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {row.location}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {row.connectorStatus}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {row.model}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {row.cpId}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {row.qrCode}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {row.firmwareVersion}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {row.serialNumber}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {row.lastOnline}
                  </td>
                </>
              )}
              {activeTab === 'Decommissioned' && (
                <>
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {row.station}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {row.location}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {row.model}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {row.cpId}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {row.firmwareVersion}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {row.serialNumber}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {row.lastOnline}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StationManagement;
