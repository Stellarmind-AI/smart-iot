'use client';
import React, { useState } from 'react';

const AddNewUser = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    accountStatus: '',
    email: '',
    phoneContact: '',
    role: '',
    reportingManager: '',
    network: '',
    enableTwoFactor: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('User Data:', formData);
    // Handle user data submission here
  };

  const handleCancel = () => {
    setFormData({
      fullName: '',
      accountStatus: '',
      email: '',
      phoneContact: '',
      role: '',
      reportingManager: '',
      network: '',
      enableTwoFactor: false,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="w-full max-w-2xl p-6 border rounded-md shadow-md">
        <h1 className="text-4xl font-semibold mb-6 text-center text-[#505759]">
          Add New User
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#363636]">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border p-2 shadow-sm"
            />
          </div>

          {/* Account Status */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#363636]">
              Account Status
            </label>
            <select
              name="accountStatus"
              value={formData.accountStatus}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border p-2 shadow-sm"
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Email Contact */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#363636]">
              Email Contact
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border p-2 shadow-sm"
            />
          </div>

          {/* Phone Contact */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#363636]">
              Phone Contact
            </label>
            <input
              type="text"
              name="phoneContact"
              value={formData.phoneContact}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border p-2 shadow-sm"
            />
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#363636]">
              Role
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border p-2 shadow-sm"
            />
          </div>

          {/* Reporting Manager */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#363636]">
              Reporting Manager
            </label>
            <input
              type="text"
              name="reportingManager"
              value={formData.reportingManager}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border p-2 shadow-sm"
            />
          </div>

          {/* Network */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-[#363636]">
              Network (Optional)
            </label>
            <input
              type="text"
              name="network"
              value={formData.network}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border p-2 shadow-sm"
            />
          </div>

          {/* Two-Factor Authentication */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="enableTwoFactor"
              checked={formData.enableTwoFactor}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm font-medium text-[#363636]">
              Enable Two-Factor Authentication
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
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
  );
};

export default AddNewUser;
