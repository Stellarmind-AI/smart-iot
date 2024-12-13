'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddNewBusiness = () => {
  const [formData, setFormData] = useState({
    name: '',
    contactEmail: '',
    contactNumber: '',
    website: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Business Data:', formData);
    // Handle form submission logic
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      name: '',
      contactEmail: '',
      contactNumber: '',
      website: '',
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
    <div className="text-black min-h-screen bg-white p-6">
      {/* Navigation Buttons */}
      <div className="mb-4 flex items-center gap-4">
        {/* Back to Dashboard Button */}
        <div className="flex items-center">
          <button
            onClick={navigateToDashboard} // Replace with your navigation logic
            className="group flex h-12 w-12 items-center justify-center rounded-full bg-daketBlue text-white shadow-lg hover:bg-daketBlue"
            title="Back to Dashboard"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="h-6 w-6 transform transition-transform duration-300 group-hover:scale-150"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <span className="ml-4 text-lg font-bold text-gray-800">Back</span>
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
            className="rounded-full bg-daketBlue px-6 py-2 font-bold text-white shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-daketBlue"
            title={btn.label}
          >
            {btn.label}
          </button>
        ))}
      </div>
      <div className="mx-auto w-full max-w-lg rounded-md border p-6 shadow-md">
        <h1 className="mb-6 text-center text-4xl font-semibold text-daketBlue">
          Add New Business
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium"
              style={{ color: '#363636' }}
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border p-2 shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium"
              style={{ color: '#363636' }}
            >
              Contact Email
            </label>
            <input
              type="email"
              name="contactEmail"
              value={formData.contactEmail}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border p-2 shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium"
              style={{ color: '#363636' }}
            >
              Contact Number
            </label>
            <input
              type="text"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border p-2 shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium"
              style={{ color: '#363636' }}
            >
              Website
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border p-2 shadow-sm"
            />
          </div>
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
              Add Business
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewBusiness;
