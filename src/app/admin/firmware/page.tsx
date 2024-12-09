'use client';
import React, { useState } from 'react';

interface FirmwareData {
  version: string;
  name: string;
  make: string;
  model: string;
  date: string;
  description: string;
}

const FirmwareManagement: React.FC = () => {
  const [view, setView] = useState<'Active' | 'Decommissioned'>('Active');
  const [firmwareNumber, setFirmwareNumber] = useState('');
  const [date, setDate] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [tableData, setTableData] = useState<FirmwareData[]>([
    {
      version: '1.0.0',
      name: 'Firmware A',
      make: 'EVSE Co.',
      model: 'Model X',
      date: '2024-12-01',
      description: 'Initial version',
    },
    {
      version: '1.1.0',
      name: 'Firmware B',
      make: 'EVSE Co.',
      model: 'Model Y',
      date: '2024-12-02',
      description: 'Bug fixes',
    },
  ]);

  // Handlers
  const handleUploadClick = () => {
    console.log('Upload clicked');
  };

  const handleJobClick = () => {
    console.log('Job clicked');
  };

  const handleApply = () => {
    console.log('Filters applied');
  };

  const handleReset = () => {
    setDate('');
    setSelectedModel('');
  };

  const handleRefresh = () => {
    console.log('Table refreshed');
  };

  return (
    <div className="space-y-4 p-6">
      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handleUploadClick}
          className="rounded bg-daketBlue px-4 py-2 text-white"
        >
          Upload
        </button>
        <button
          onClick={handleJobClick}
          className="rounded bg-gray-500 px-4 py-2 text-white"
        >
          Job
        </button>
      </div>

      {/* Toggle View
      <div className="flex space-x-4">
        <button
          className={`rounded px-4 py-2 ${
            view === 'Active' ? 'bg-blue-500 text-white' : 'bg-gray-300'
          }`}
          onClick={() => setView('Active')}
        >
          Active
        </button>
        <button
          className={`rounded px-4 py-2 ${
            view === 'Decommissioned' ? 'bg-blue-500 text-white' : 'bg-gray-300'
          }`}
          onClick={() => setView('Decommissioned')}
        >
          Decommissioned
        </button>
      </div> */}

      {/* Upload Form */}
      <div className="space-y-4">
        <div className="flex space-x-4">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded border px-4 py-2"
          />
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="rounded border px-4 py-2"
          >
            <option value="">All Models</option>
            <option value="Model X">Model X</option>
            <option value="Model Y">Model Y</option>
            <option value="Model Z">Model Z</option>
          </select>
          <button
            onClick={handleApply}
            className="rounded bg-daketBlue px-4 py-2 text-white"
          >
            Apply
          </button>
          <button
            onClick={handleReset}
            className="rounded bg-gray-500 px-4 py-2 text-white"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Firmware Input + Icons */}
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={firmwareNumber}
          onChange={(e) => setFirmwareNumber(e.target.value)}
          placeholder="Firmware"
          className="rounded border px-4 py-2"
        />
        <button
          onClick={handleRefresh}
          className="rounded bg-gray-200 px-4 py-2"
        >
          🔄
        </button>
        <button className="rounded bg-gray-200 px-4 py-2">☰</button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded border">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Firmware Version</th>
              <th className="border p-2">Firmware Name</th>
              <th className="border p-2">Station Make</th>
              <th className="border p-2">Station Model</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{item.version}</td>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.make}</td>
                <td className="border p-2">{item.model}</td>
                <td className="border p-2">{item.date}</td>
                <td className="border p-2">{item.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FirmwareManagement;
