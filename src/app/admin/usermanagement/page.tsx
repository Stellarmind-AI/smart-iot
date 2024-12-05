'use client';
import React, { useState } from 'react';

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
  ]);

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for new user form
  const [formData, setFormData] = useState({
    fullName: '',
    accountStatus: '',
    email: '',
    contact: '',
    role: '',
    reportingManager: '',
    network: '', // Added network field
    isTwoFactorEnabled: false, // Two-factor authentication checkbox
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
  };

  // Filter users by search term
  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="min-h-screen p-6 font-sans bg-white text-black">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-4xl font-semibold" style={{ color: '#505759' }}>
          Manage Users
        </h1>

        <div className="flex items-center space-x-4">
          {/* Add New User Button */}
          <button
            className="rounded-md px-6 py-2 text-sm border border-[#156082] bg-[#156082] text-white"
            onClick={() => setIsModalOpen(true)} // Open modal
          >
            Add New User
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black bg-white"
        />
      </div>

      {/* Users Table */}
      <div className="mb-8 p-6">
        <h2 className="mb-4 text-2xl font-semibold" style={{ color: '#363636' }}>
          Users
        </h2>
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
                  onClick={() => handleSort('fullName')}
                >
                  Full Name{' '}
                  {sortColumn === 'fullName' ? (sortDirection === 'asc' ? '▲' : '▼') : ''}
                </th>
                <th className="px-4 py-2 font-semibold">Account Status</th>
                <th className="px-4 py-2 font-semibold">Email Contact</th>
                <th className="px-4 py-2 font-semibold">Role</th>
                <th className="px-4 py-2 font-semibold">Reporting Manager</th>
                <th className="px-4 py-2 font-semibold">Network</th> {/* Added Network Column */}
                <th className="px-4 py-2 font-semibold">2FA Enabled</th> {/* Added 2FA Column */}
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-200">
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2 font-medium">{user.fullName}</td>
                  <td className="px-4 py-2">{user.accountStatus}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">{user.reportingManager}</td>
                  <td className="px-4 py-2">{user.network}</td> {/* Display Network */}
                  <td className="px-4 py-2">{user.isTwoFactorEnabled ? 'Yes' : 'No'}</td> {/* Display 2FA Status */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Adding New User */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold text-black">Add New User</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black bg-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black">Account Status</label>
                <input
                  type="text"
                  name="accountStatus"
                  value={formData.accountStatus}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black bg-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black">Email Contact</label>
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
                <label className="block text-sm font-medium text-black">Phone Contact</label>
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
                <label className="block text-sm font-medium text-black">Role</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black bg-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black">Reporting Manager</label>
                <input
                  type="text"
                  name="reportingManager"
                  value={formData.reportingManager}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black bg-white"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black">Network (Optional)</label>
                <input
                  type="text"
                  name="network"
                  value={formData.network}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 text-black bg-white"
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
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-md bg-gray-300 px-6 py-2 text-sm text-black hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md px-6 py-2 text-sm border border-[#156082] bg-[#156082] text-white"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
