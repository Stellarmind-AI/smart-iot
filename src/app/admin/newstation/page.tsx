'use client';
import React from 'react';

import { useRouter } from 'next/navigation';
const AddNewStation = () => {
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
      <div className="w-full ps-6 pt-6 ">
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
                    <option>
                      ECI Technology Group Inc. - Electronics manufacturer, 815
                      Middlefield Rd #1&2, Scarborough, ON M1V 2P9, Canada
                    </option>
                    <option>
                      Automotive Centre of Excellence, Founders Dr, Oshawa, ON
                      L1G 8C4, Canada
                    </option>
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
    </>
  );
};

export default AddNewStation;
