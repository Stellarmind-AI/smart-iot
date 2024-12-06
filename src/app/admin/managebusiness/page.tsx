'use client';
import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';  // Import the search icon from react-icons

const ManageBusinesses = () => {
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
    {
      id: 3,
      name: 'TURBINE GLOBAL SERVICES',
      email: 'info@turbineservices.com',
      contact: '555-123-4567',
      website: 'https://turbineservices.com',
    },
    {
      id: 4,
      name: '456 MAIN Road ',
      email: 'info@mainroad.com',
      contact: '123-456-7890',
      website: 'https://mainroad.com',
    },
    {
      id: 5,
      name: 'Hill ELM ROAD',
      email: 'info@Hill.com',
      contact: '987-654-3210',
      website: 'https://Hill.com',
    },
    
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    website: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBusiness, setSelectedBusiness] = useState('All Businesses');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [alertMessage, setAlertMessage] = useState('');

  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBusiness = {
      id: businesses.length + 1,
      ...formData,
    };
    setBusinesses((prev) => [...prev, newBusiness]);
    setFormData({ name: '', email: '', contact: '', website: '' });
    setIsModalOpen(false);
    setAlertMessage('Your business has been added successfully!');
    setTimeout(() => setAlertMessage(''), 2000);
  };

  const filteredBusinesses = businesses.filter((business) => {
    if (selectedBusiness === 'All Businesses') {
      return business.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return (
      business.name.toLowerCase() === selectedBusiness.toLowerCase() &&
      business.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedBusinesses = [...filteredBusinesses].sort((a, b) => {
    if (!sortColumn) return 0;
    const compareA = a[sortColumn as keyof typeof a].toString();
    const compareB = b[sortColumn as keyof typeof b].toString();
    if (sortDirection === 'asc') return compareA.localeCompare(compareB);
    return compareB.localeCompare(compareA);
  });

  const handleSort = (column: string) => {
    setSortColumn(column);
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="relative min-h-screen p-6 font-sans bg-white text-black">
      <div
        className={`${isModalOpen ? 'blur-md' : ''} transition-all duration-300`}
      >
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-4xl font-semibold text-center text-daketBlue" >
            Manage Businesses
          </h1>

          <div className="flex items-center space-x-4">
            <select
              className="rounded-lg bg-white px-4 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={selectedBusiness}
              onChange={(e) => setSelectedBusiness(e.target.value)}
            >
              <option>All Businesses</option>
              {businesses.map((business) => (
                <option key={business.id} value={business.name}>
                  {business.name}
                </option>
              ))}
            </select>

            <button
              className="rounded-md px-6 py-2 text-sm border border-[#156082] bg-[#156082] text-white"
              onClick={() => setIsModalOpen(true)}
            >
              Add New Business
            </button>
          </div>
        </div>

        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search businesses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-80 md:w-96 lg:w-[500px] rounded-md border border-gray-300 p-3 pl-10 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black bg-white"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        <div className="mb-8 p-6">
          <h2 className="mb-4 text-2xl font-semibold text-[#156082]">Businesses</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse text-left text-sm text-black">
              <thead>
                <tr className="bg-gray-500">
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
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-80 backdrop-blur-sm bg-horizonBlue-950">
          <div ref={modalRef} className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
            <h2 className="text-2xl font-semibold mb-4">Add New Business</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
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
                  className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-black">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
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
                  className="rounded-md px-6 py-2 text-sm border border-[#156082] bg-[#156082] text-white"
                >
                  Add Business
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {alertMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-3 rounded-md shadow-lg">
          {alertMessage}
        </div>
      )}
    </div>
  );
};

export default ManageBusinesses;
