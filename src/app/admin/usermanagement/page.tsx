'use client';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // For the search icon
import { useRouter } from 'next/navigation';

const ManageUsers = () => {
  // State for users
  const [users, setUsers] = useState([
    {
      id: 1,
      fullName: 'John Doe',
      accountStatus: 'Active',
      email: 'john.doe@example.com',
      contact: '123-456-7890',
      role: 'Manager',
      reportingManager: 'Jane Smith',
      network: 'Network A',
      isTwoFactorEnabled: true,
    },
    {
      id: 2,
      fullName: 'Alice Johnson',
      accountStatus: 'Inactive',
      email: 'alice.johnson@example.com',
      contact: '987-654-3210',
      role: 'Developer',
      reportingManager: 'John Doe',
      network: 'Network B',
      isTwoFactorEnabled: false,
    },
    {
      id: 3,
      fullName: 'Bob Williams',
      accountStatus: 'Active',
      email: 'bob.williams@example.com',
      contact: '654-321-0987',
      role: 'Designer',
      reportingManager: 'Alice Johnson',
      network: 'Network A',
      isTwoFactorEnabled: true,
    },
    {
      id: 4,
      fullName: 'Eve Smith',
      accountStatus: 'Inactive',
      email: 'eve.smith@example.com',
      contact: '456-789-0123',
      role: 'QA',
      reportingManager: 'Bob Williams',
      network: 'Network C',
      isTwoFactorEnabled: false,
    },
    {
      id: 5,
      fullName: 'Mark Lee',
      accountStatus: 'Active',
      email: 'mark.lee@example.com',
      contact: '321-654-9870',
      role: 'Project Manager',
      reportingManager: 'Eve Smith',
      network: 'Network A',
      isTwoFactorEnabled: true,
    },
  ]);

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // State for new user form
  const [formData, setFormData] = useState({
    fullName: '',
    accountStatus: '',
    email: '',
    contact: '',
    role: '',
    reportingManager: '',
    network: '',
    isTwoFactorEnabled: false,
  });

  // State for search and sorting
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle checkbox change for two-factor authentication
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, isTwoFactorEnabled: e.target.checked }));
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = {
      id: users.length + 1,
      ...formData,
    };
    setUsers((prev) => [...prev, newUser]);
    setAlertMessage('User added successfully!');
    setFormData({
      fullName: '',
      accountStatus: '',
      email: '',
      contact: '',
      role: '',
      reportingManager: '',
      network: '',
      isTwoFactorEnabled: false,
    }); // Reset form
    setIsModalOpen(false); // Close modal
    setTimeout(() => setAlertMessage(''), 3000); // Clear alert after 3 seconds
  };

  // Filter users by search term
  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const closeModal = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false); // Close the modal when clicking outside
    }
  };

  // Sort users by selected column
  const sortedUsers = [...filteredUsers].sort((a, b) => {
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
      <div className="text-black min-h-screen bg-white p-6 font-sans">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-4xl font-semibold text-daketBlue">
            Manage Users
          </h1>

          <div className="flex items-center space-x-4">
            {/* Add New User Button */}
            <button
              className="rounded-md border border-[#156082] bg-[#156082] px-6 py-2 text-sm text-white"
              onClick={() => setIsModalOpen(true)} // Open modal
            >
              Add New User
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 transform text-gray-500" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-black w-full rounded-md border border-gray-300 bg-white p-2 pl-10 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Users Table */}
        <div className="mb-8 p-6">
          <h2
            className="mb-4 text-2xl font-semibold"
            style={{ color: '#363636' }}
          >
            Users
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
                    onClick={() => handleSort('fullName')}
                  >
                    Full Name{' '}
                    {sortColumn === 'fullName'
                      ? sortDirection === 'asc'
                        ? '▲'
                        : '▼'
                      : ''}
                  </th>
                  <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Account Status
                  </th>
                  <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Email Contact
                  </th>
                  <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Phone Contact
                  </th>
                  <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Role
                  </th>
                  <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Reporting Manager
                  </th>
                  <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Network
                  </th>
                  <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                    Two-Factor
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b px-6 py-4 text-sm text-gray-800">
                      {user.id}
                    </td>
                    <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b px-6 py-4 text-sm text-gray-800">
                      {user.fullName}
                    </td>
                    <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b px-6 py-4 text-sm text-gray-800">
                      {user.accountStatus}
                    </td>
                    <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b px-6 py-4 text-sm text-gray-800">
                      {user.email}
                    </td>
                    <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b px-6 py-4 text-sm text-gray-800">
                      {user.contact}
                    </td>
                    <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b px-6 py-4 text-sm text-gray-800">
                      {user.role}
                    </td>
                    <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b px-6 py-4 text-sm text-gray-800">
                      {user.reportingManager}
                    </td>
                    <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b px-6 py-4 text-sm text-gray-800">
                      {user.network}
                    </td>
                    <td className="overflow-hidden text-ellipsis whitespace-nowrap border-b px-6 py-4 text-sm text-gray-800">
                      {user.isTwoFactorEnabled ? 'Enabled' : 'Disabled'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for Adding New User */}
        {isModalOpen && (
          <div
            onClick={closeModal}
            className="fixed inset-0 z-50 flex items-center justify-center bg-horizonBlue-950 bg-opacity-80 backdrop-blur-sm"
          >
            <div
              className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
            >
              <h3 className="mb-6 text-2xl font-semibold">Add New User</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="text-black block text-sm font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="text-black mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-black block text-sm font-medium">
                    Account Status
                  </label>
                  <input
                    type="text"
                    name="accountStatus"
                    value={formData.accountStatus}
                    onChange={handleChange}
                    required
                    className="text-black mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
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
                    className="text-black mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-black block text-sm font-medium">
                    Phone Contact
                  </label>
                  <input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    required
                    className="text-black mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-black block text-sm font-medium">
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="text-black mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-black block text-sm font-medium">
                    Reporting Manager
                  </label>
                  <input
                    type="text"
                    name="reportingManager"
                    value={formData.reportingManager}
                    onChange={handleChange}
                    required
                    className="text-black mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="text-black block text-sm font-medium">
                    Network
                  </label>
                  <input
                    type="text"
                    name="network"
                    value={formData.network}
                    onChange={handleChange}
                    className="text-black mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="isTwoFactorEnabled"
                      checked={formData.isTwoFactorEnabled}
                      onChange={handleCheckboxChange}
                      className="mr-2"
                    />
                    Enable Two-Factor Authentication
                  </label>
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)} // Close modal
                    className="text-black rounded-md bg-gray-300 px-6 py-2 text-sm hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md border border-[#156082] bg-[#156082] px-6 py-2 text-sm text-white"
                  >
                    Add User
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Alert Message */}
        {alertMessage && (
          <div className="mb-4 rounded-md bg-green-500 p-4 text-white">
            {alertMessage}
          </div>
        )}
      </div>
    </>
  );
};

export default ManageUsers;
