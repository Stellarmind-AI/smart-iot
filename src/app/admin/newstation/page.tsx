'use client';
import React from 'react';

const AddNewStation = () => {
  return (
    <div className="flex h-screen bg-[#f0f4f8]">
      {/* Main Content */}
      <div className="flex-1 bg-white p-10">
        <h1 className="mb-6 text-3xl font-bold text-[#156082]">
          Add New Station
        </h1>
        <div className="rounded-lg bg-[#f9f9f9] p-6 shadow-md">
          <form className="space-y-6">
            {/* Form Row 1 */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="chargePointID"
                  className="block text-sm font-medium text-[#505759]"
                >
                  Station ID*
                </label>
                <input
                  id="chargePointID"
                  type="text"
                  required
                  placeholder="Enter Charge Point ID"
                  className="mt-2 w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-[#156082]"
                />
              </div>
              <div>
                <label
                  htmlFor="serialNumber"
                  className="block text-sm font-medium text-[#505759]"
                >
                  Serial Number*
                </label>
                <input
                  id="serialNumber"
                  type="text"
                  required
                  placeholder="Enter Serial Number"
                  className="mt-2 w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-[#156082]"
                />
              </div>
            </div>

            {/* Form Row 2 */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-[#505759]"
                >
                  Location*
                </label>
                <select
                  id="location"
                  required
                  className="mt-2 w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-[#156082]"
                >
                  <option>Select Location</option>
                  <option>Location A</option>
                  <option>Location B</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="stationName"
                  className="block text-sm font-medium text-[#505759]"
                >
                  Station Name*
                </label>
                <input
                  id="stationName"
                  type="text"
                  required
                  placeholder="Enter Station Name"
                  className="mt-2 w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-[#156082]"
                />
              </div>
            </div>

            {/* Form Row 3 */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="make"
                  className="block text-sm font-medium text-[#505759]"
                >
                  Make*
                </label>
                <select
                  id="make"
                  required
                  className="mt-2 w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-[#156082]"
                >
                  <option>Select Make</option>
                  <option>Make A</option>
                  <option>Make B</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="model"
                  className="block text-sm font-medium text-[#505759]"
                >
                  Model*
                </label>
                <select
                  id="model"
                  required
                  className="mt-2 w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-[#156082]"
                >
                  <option>Select Model</option>
                  <option>Model A</option>
                  <option>Model B</option>
                </select>
              </div>
            </div>

            {/* Form Row 4 */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="securityProfile"
                  className="block text-sm font-medium text-[#505759]"
                >
                  Security Profile*
                </label>
                <select
                  id="securityProfile"
                  required
                  className="mt-2 w-full rounded-lg border border-gray-300 p-2.5 focus:ring-2 focus:ring-[#156082]"
                >
                  <option>Select Security Profile</option>
                  <option>Profile A</option>
                  <option>Profile B</option>
                </select>
              </div>
              <div className="flex items-center gap-4">
                <input
                  id="isRationed"
                  type="checkbox"
                  required
                  className="h-5 w-5 rounded border-gray-300 focus:ring-[#156082]"
                />
                <label
                  htmlFor="isRationed"
                  className="text-sm font-medium text-[#505759]"
                >
                  Is Rationed
                </label>
              </div>
            </div>

            {/* Form Row 5 */}
            <div className="flex items-center gap-6">
              <label
                htmlFor="installationState"
                className="block text-sm font-medium text-[#505759]"
              >
                Installation State:
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <input
                    id="planned"
                    type="radio"
                    name="installationState"
                    required
                    className="h-5 w-5 border-gray-300 focus:ring-[#156082]"
                  />
                  <label
                    htmlFor="planned"
                    className="ml-2 text-sm font-medium text-[#505759]"
                  >
                    Planned
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="commissioned"
                    type="radio"
                    name="installationState"
                    className="h-5 w-5 border-gray-300 focus:ring-[#156082]"
                  />
                  <label
                    htmlFor="commissioned"
                    className="ml-2 text-sm font-medium text-[#505759]"
                  >
                    Commissioned
                  </label>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="rounded-lg bg-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-[#156082] px-6 py-2 text-sm font-medium text-white hover:bg-[#1d6fa3]"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewStation;
