'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type ReportData = {
  location: string;
  address: string;
  city: string;
  stateProvince: string;
  stations: number;
  connectors: number;
  siteRating: number;
};

const LocationReportingPage: React.FC = () => {
  // States for filters and data
  const [filters, setFilters] = useState({
    location: '',
    city: '',
    stateProvince: '',
  });

  const [reportData, setReportData] = useState<ReportData[]>([]);

  // Mock static data
  const mockData: ReportData[] = [
    {
      location: 'Central Park',
      address: '123 Park Ave',
      city: 'New York',
      stateProvince: 'NY',
      stations: 5,
      connectors: 10,
      siteRating: 4.5,
    },
    {
      location: 'Golden Gate',
      address: '456 Bridge Blvd',
      city: 'San Francisco',
      stateProvince: 'CA',
      stations: 8,
      connectors: 15,
      siteRating: 4.8,
    },
    {
      location: 'Lincoln Park',
      address: '789 Park Lane',
      city: 'Chicago',
      stateProvince: 'IL',
      stations: 6,
      connectors: 12,
      siteRating: 4.2,
    },
    {
      location: 'Space Needle',
      address: '100 Needle St',
      city: 'Seattle',
      stateProvince: 'WA',
      stations: 4,
      connectors: 8,
      siteRating: 4.7,
    },
    {
      location: 'Times Square',
      address: '200 Broadway Ave',
      city: 'New York',
      stateProvince: 'NY',
      stations: 10,
      connectors: 20,
      siteRating: 4.9,
    },
  ];

  // Handle filter change
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Apply filters
  const applyFilters = () => {
    const filteredData = mockData.filter((item) => {
      const matchesLocation = filters.location
        ? item.location.toLowerCase().includes(filters.location.toLowerCase())
        : true;
      const matchesCity = filters.city
        ? item.city.toLowerCase() === filters.city.toLowerCase()
        : true;
      const matchesStateProvince = filters.stateProvince
        ? item.stateProvince.toLowerCase() ===
          filters.stateProvince.toLowerCase()
        : true;

      return matchesLocation && matchesCity && matchesStateProvince;
    });

    setReportData(filteredData);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      location: '',
      city: '',
      stateProvince: '',
    });
    setReportData(mockData); // Reset to full data
  };

  const router = useRouter();
  const handleAddLocation = () => {
    router.push('/admin/newlocation'); // Replace with the actual route for the add-location page
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Location Form & Reporting
        </h1>
      </div>

      {/* Add New Location Button */}
      <div className="mb-4 text-right">
        <button
          onClick={handleAddLocation}
          className="rounded-lg bg-daketBlue px-6 py-2 text-white hover:scale-105 hover:bg-daketBlue"
        >
          Add New Location
        </button>
      </div>

      {/* Filters Section */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow-2xl">
        <h2 className="mb-4 text-lg font-bold text-gray-800">Filters</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Location
            </label>
            <select
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            >
              <option value="">All Locations</option>
              <option value="Central Park">Central Park</option>
              <option value="Golden Gate">Golden Gate</option>
              <option value="Lincoln Park">Lincoln Park</option>
              <option value="Space Needle">Space Needle</option>
              <option value="Times Square">Times Square</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">
              All States/Province
            </label>
            <select
              name="stateProvince"
              value={filters.stateProvince}
              onChange={handleFilterChange}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            >
              <option value="">States/Province</option>
              <option value="NY">NY</option>
              <option value="CA">CA</option>
              <option value="IL">IL</option>
              <option value="WA">WA</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">
              All Cities
            </label>
            <select
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            >
              <option value="">All Cities</option>
              <option value="New York">New York</option>
              <option value="San Francisco">San Francisco</option>
              <option value="Chicago">Chicago</option>
              <option value="Seattle">Seattle</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={resetFilters}
            className="rounded-lg bg-gray-300 px-6 py-2 text-sm text-gray-700 hover:scale-105 hover:bg-gray-400"
          >
            Reset Filters
          </button>
          <button
            onClick={applyFilters}
            className="rounded-lg bg-daketBlue px-6 py-2 text-sm text-white hover:scale-105 hover:bg-daketBlue"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="mt-6">
        <h2 className="mb-4 text-lg font-bold text-gray-800">Reports</h2>
        <div className="overflow-x-auto rounded-lg shadow-2xl">
          <table className="min-w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gray-500">
                <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                  Location
                </th>
                <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                  Address
                </th>
                <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                  City
                </th>
                <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                  State/Province
                </th>
                <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                  Stations
                </th>
                <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                  Connectors
                </th>
                <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                  Site Rating
                </th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                >
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {item.location}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {item.address}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {item.city}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {item.stateProvince}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {item.stations}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {item.connectors}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {item.siteRating}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LocationReportingPage;
