'use client';
import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa'; // Import the search icon from react-icons
import { useRouter } from 'next/navigation';
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
    <>
      <div className="ps-6 pt-6">
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
      </div>
      <div className="text-black relative min-h-screen bg-white p-6 font-sans">
        <div
          className={`${
            isModalOpen ? 'blur-md' : ''
          } transition-all duration-300`}
        >
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-center text-4xl font-semibold text-daketBlue">
              Manage Businesses
            </h1>

            <div className="flex items-center space-x-4">
              <select
                className="text-black rounded-lg bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
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
                className="rounded-md border border-[#156082] bg-[#156082] px-6 py-2 text-sm text-white"
                onClick={() => setIsModalOpen(true)}
              >
                Add New Business
              </button>
            </div>
          </div>

          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search businesses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-black w-full rounded-md border border-gray-300 bg-white p-3 pl-10 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:w-80 md:w-96 lg:w-[500px]"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500" />
          </div>

          <div className="mb-8 p-6">
            <h2 className="mb-4 text-2xl font-semibold text-[#156082]">
              Businesses
            </h2>
            <div className="overflow-x-auto">
              <table className="text-black w-full table-auto border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-gray-500">
                    <th
                      className="cursor-pointer border-b px-6 py-3 text-left text-sm font-medium text-gray-900"
                      onClick={() => handleSort('id')}
                    >
                      ID{' '}
                      {sortColumn === 'id'
                        ? sortDirection === 'asc'
                          ? '▲'
                          : '▼'
                        : ''}
                    </th>
                    <th
                      className="cursor-pointer border-b px-6 py-3 text-left text-sm font-medium text-gray-900"
                      onClick={() => handleSort('name')}
                    >
                      Name{' '}
                      {sortColumn === 'name'
                        ? sortDirection === 'asc'
                          ? '▲'
                          : '▼'
                        : ''}
                    </th>
                    <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                      Contact Email
                    </th>
                    <th
                      className="cursor-pointer border-b px-6 py-3 text-left text-sm font-medium text-gray-900"
                      onClick={() => handleSort('contact')}
                    >
                      Contact Number{' '}
                      {sortColumn === 'contact'
                        ? sortDirection === 'asc'
                          ? '▲'
                          : '▼'
                        : ''}
                    </th>
                    <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                      Website
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedBusinesses.map((business) => (
                    <tr key={business.id}>
                      <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b px-6 py-4 text-sm text-gray-800">
                        {business.id}
                      </td>
                      <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b px-6 py-4 text-sm text-gray-800">
                        {business.name}
                      </td>
                      <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b px-6 py-4 text-sm text-gray-800">
                        {business.email}
                      </td>
                      <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b px-6 py-4 text-sm text-gray-800">
                        {business.contact}
                      </td>
                      <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b px-6 py-4 text-sm text-gray-800">
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
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-horizonBlue-950 bg-opacity-80 backdrop-blur-sm">
            <div
              ref={modalRef}
              className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl"
            >
              <h2 className="mb-4 text-2xl font-semibold">Add New Business</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="text-black block text-sm font-medium">
                    Name
                  </label>
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
                  <label className="text-black block text-sm font-medium">
                    Email
                  </label>
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
                  <label className="text-black block text-sm font-medium">
                    Contact Number
                  </label>
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
                  <label className="text-black block text-sm font-medium">
                    Website
                  </label>
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
                    className="text-black rounded-md bg-gray-300 px-6 py-2 text-sm hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md border border-[#156082] bg-[#156082] px-6 py-2 text-sm text-white"
                  >
                    Add Business
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {alertMessage && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 transform rounded-md bg-green-500 p-3 text-white shadow-lg">
            {alertMessage}
          </div>
        )}
      </div>
    </>
  );
};

export default ManageBusinesses;
