'use client';
import React, { useState } from 'react';

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

  return (
    <div className="min-h-screen p-6 bg-white text-black">
      <div className="w-full max-w-lg mx-auto p-6 border rounded-md shadow-md">
        <h1 className="text-4xl font-semibold mb-6 text-center" style={{ color: '#505759' }}>
          Add New Business
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium" style={{ color: '#363636' }}>
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
            <label className="block text-sm font-medium" style={{ color: '#363636' }}>
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
            <label className="block text-sm font-medium" style={{ color: '#363636' }}>
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
            <label className="block text-sm font-medium" style={{ color: '#363636' }}>
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
  );
};

export default AddNewBusiness;
