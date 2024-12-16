'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;

    // Check if the target is a checkbox, and safely access `checked` if it is.
    const updatedValue =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
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
      <div className="text-black flex min-h-screen items-center justify-center bg-white">
        <div className="w-full max-w-2xl rounded-md border p-6 shadow-md">
          <h1 className="mb-6 text-center text-4xl font-semibold text-daketBlue">
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
    </>
  );
};

export default AddNewUser;
