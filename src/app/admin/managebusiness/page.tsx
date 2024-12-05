'use client';
import React, { useState } from 'react';

const ManageBusinesses = () => {
  // State for businesses
  const [businesses, setBusinesses] = useState([
    {
      id: 1,
      name: '123 MAIN STREET',
      email: 'info@mainstreet.com',
      contact: '123-456-7890',
      website: 'https://mainstreet.com',
    },
    {
      id: 2,
      name: '456 ELM ROAD',
      email: 'info@elmroad.com',
      contact: '987-654-3210',
      website: 'https://elmroad.com',
    },
  ]);

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for new business form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    website: '',
  });

  // Search and sort states
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBusiness = {
      id: businesses.length + 1,
      ...formData,
    };
    setBusinesses((prev) => [...prev, newBusiness]);
    setFormData({ name: '', email: '', contact: '', website: '' }); // Reset form
    setIsModalOpen(false); // Close modal
  };

  // Filter businesses by search term
  const filteredBusinesses = businesses.filter((business) =>
    business.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort businesses by selected column
  const sortedBusinesses = [...filteredBusinesses].sort((a, b) => {
    if (!sortColumn) return 0;
    const compareA = a[sortColumn as keyof typeof a].toString();
    const compareB = b[sortColumn as keyof typeof b].toString();
    if (sortDirection === 'asc') return compareA.localeCompare(compareB);
    return compareB.localeCompare(compareA);
  });

  // Handle sorting
  const handleSort = (column: string) => {
    setSortColumn(column);
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="min-h-screen p-6 font-sans bg-white text-black">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-4xl font-semibold">Manage Businesses</h1>

        <div className="flex items-center space-x-4">
          {/* All Businesses Dropdown */}
          <select className="rounded-lg bg-white px-4 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-300">
            <option>All Businesses</option>
            <option>Active Businesses</option>
            <option>Inactive Businesses</option>
          </select>

          {/* Add New Business Button */}
          <button
                  className="rounded-md  px-6 py-2 text-sm border border-[#156082] bg-[#156082] text-white"
                  onClick={() => setIsModalOpen(true)} // Open modal
          >
            Add New Business
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search businesses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black bg-white"
        />
      </div>

      {/* Businesses Table */}
      <div className="mb-8 p-6">
        <h2 className="mb-4 text-2xl font-semibold text-[#156082]">Businesses</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-left text-sm text-black">
            <thead>
              <tr className="bg-gray-100">
                <th
                  className="cursor-pointer px-4 py-2 font-semibold"
                  onClick={() => handleSort('id')}
                >
                  ID{' '}
                  {sortColumn === 'id' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th
                  className="cursor-pointer px-4 py-2 font-semibold"
                  onClick={() => handleSort('name')}
                >
                  Name{' '}
                  {sortColumn === 'name' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th className="px-4 py-2 font-semibold">Contact Email</th>
                <th
                  className="cursor-pointer px-4 py-2 font-semibold"
                  onClick={() => handleSort('contact')}
                >
                  Contact Number{' '}
                  {sortColumn === 'contact' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th className="px-4 py-2 font-semibold">Website</th>
              </tr>
            </thead>
            <tbody>
              {sortedBusinesses.map((business) => (
                <tr key={business.id} className="hover:bg-gray-200">
                  <td className="px-4 py-2">{business.id}</td>
                  <td className="px-4 py-2 font-medium">{business.name}</td>
                  <td className="px-4 py-2">{business.email}</td>
                  <td className="px-4 py-2">{business.contact}</td>
                  <td className="px-4 py-2">
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#156082] hover:underline"
                    >
                      {business.website}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Adding New Business */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold text-black">Add New Business</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black bg-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black">Contact Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black bg-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black">Contact Number</label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black bg-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black bg-white"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-md bg-gray-300 px-6 py-2 text-sm text-black hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md  px-6 py-2 text-sm border border-[#156082] bg-[#156082] text-white"
                >
                  Add Business
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBusinesses;
