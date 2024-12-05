'use client';
import React, { useState } from 'react';

const StationDowntimeForm = () => {
  const [formData, setFormData] = useState({
    stationName: '',
    downtimeReason: '',
    startTime: '',
    endTime: '',
    remarks: '',
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    // Add submission logic here (API call, etc.)
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-2xl">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Station Downtime Form
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Station Name */}
          <div className="mb-4">
            <label
              htmlFor="stationName"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Station Name
            </label>
            <input
              type="text"
              id="stationName"
              name="stationName"
              value={formData.stationName}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
              placeholder="Enter station name"
              required
            />
          </div>

          {/* Downtime Reason */}
          <div className="mb-4">
            <label
              htmlFor="downtimeReason"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Downtime Reason
            </label>
            <select
              id="downtimeReason"
              name="downtimeReason"
              value={formData.downtimeReason}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
              required
            >
              <option value="" disabled>
                Select reason
              </option>
              <option value="maintenance">Maintenance</option>
              <option value="technical_issue">Technical Issue</option>
              <option value="weather">Weather Conditions</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Start Time */}
          <div className="mb-4">
            <label
              htmlFor="startTime"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Start Time
            </label>
            <input
              type="datetime-local"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
              required
            />
          </div>

          {/* End Time */}
          <div className="mb-4">
            <label
              htmlFor="endTime"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              End Time
            </label>
            <input
              type="datetime-local"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
              required
            />
          </div>

          {/* Remarks */}
          <div className="mb-4">
            <label
              htmlFor="remarks"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Remarks (Optional)
            </label>
            <textarea
              id="remarks"
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
              placeholder="Additional notes or remarks"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="rounded-lg bg-daketBlue px-12 py-2 text-lg font-medium text-white hover:bg-daketBlue"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StationDowntimeForm;
