'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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
      make: 'Station 1',
      model: 'Model X',
      date: '2024-12-01',
      description: 'Initial version',
    },
    {
      version: '1.1.0',
      name: 'Firmware B',
      make: 'Station 2',
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
    <div className="space-y-4 p-6">
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
        <h1 className="text-3xl font-bold text-gray-800">
          Firmware Management
        </h1>
      </div>

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
            <tr className="bg-gray-500">
              <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                Firmware Version
              </th>
              <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                Firmware Name
              </th>
              <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                Station Make
              </th>
              <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                Station Model
              </th>
              <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                Date
              </th>
              <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={index}>
                <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b px-6 py-4 text-sm text-gray-800">
                  {item.version}
                </td>
                <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b px-6 py-4 text-sm text-gray-800">
                  {item.name}
                </td>
                <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b px-6 py-4 text-sm text-gray-800">
                  {item.make}
                </td>
                <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b px-6 py-4 text-sm text-gray-800">
                  {item.model}
                </td>
                <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b px-6 py-4 text-sm text-gray-800">
                  {item.date}
                </td>
                <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b px-6 py-4 text-sm text-gray-800">
                  {item.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FirmwareManagement;
