'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const energyData = [
  { day: 'Monday', energy: '120 kWh' },
  { day: 'Tuesday', energy: '135 kWh' },
  { day: 'Wednesday', energy: '128 kWh' },
  { day: 'Thursday', energy: '140 kWh' },
  { day: 'Friday', energy: '130 kWh' },
];

const GlobalSettings = () => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'optimization'>(
    'analytics',
  );
  const [efficiencyGoal, setEfficiencyGoal] = useState(95); // Example efficiency goal
  const [successAlert, setSuccessAlert] = useState(false); // State for the success alert

  const handleTabChange = (tab: 'analytics' | 'optimization') => {
    setActiveTab(tab);
  };

  const handleEfficiencyGoalChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEfficiencyGoal(Number(e.target.value));
  };

  const handleSaveGoal = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessAlert(true); // Show the success alert when the form is submitted

    // Hide the alert after 3 seconds
    setTimeout(() => setSuccessAlert(false), 3000);
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
      </div>
      <div className="text-black min-h-screen bg-gray-50 p-6 font-sans">
        <h1 className="mb-6 text-4xl font-semibold  text-[#156082]">
          Global Settings
        </h1>

        {/* Tabs */}
        <div className="mb-6 flex  space-x-4">
          <button
            onClick={() => handleTabChange('analytics')}
            className={`rounded-md px-6 py-2 text-sm ${
              activeTab === 'analytics'
                ? 'bg-[#156082] text-white'
                : 'text-black bg-gray-200'
            }`}
          >
            Energy Analytics
          </button>
          <button
            onClick={() => handleTabChange('optimization')}
            className={`rounded-md px-6 py-2 text-sm ${
              activeTab === 'optimization'
                ? 'bg-[#156082] text-white'
                : 'text-black bg-gray-200'
            }`}
          >
            Efficiency Optimization
          </button>
        </div>

        {/* Energy Analytics Section */}
        {activeTab === 'analytics' && (
          <div className="rounded-md border p-6 ">
            <h2 className="mb-4 text-center text-2xl font-semibold text-[#156082]">
              Energy Analytics
            </h2>

            <table className="w-full border-collapse rounded-md border border-gray-200 bg-white shadow-md">
              <thead>
                <tr className="bg-[#156082] text-white">
                  <th className="px-4 py-2 text-left">Day</th>
                  <th className="px-4 py-2 text-left">Energy Usage</th>
                </tr>
              </thead>
              <tbody>
                {energyData.map((entry, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-gray-100 ${
                      index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <td className="px-4 py-2">{entry.day}</td>
                    <td className="px-4 py-2">{entry.energy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Efficiency Optimization Section */}
        {activeTab === 'optimization' && (
          <div className="rounded-md border bg-white p-6 shadow-md">
            <h2 className="mb-4 text-center text-2xl font-semibold text-[#156082]">
              Efficiency Optimization
            </h2>

            {/* Success Alert */}
            {successAlert && (
              <div className="mb-4 rounded-md bg-green-500 p-4 text-white">
                Efficiency goal saved successfully!
              </div>
            )}

            <form onSubmit={handleSaveGoal}>
              <div className="mb-4">
                <label className="text-black block text-sm font-medium">
                  Efficiency Goal (%)
                </label>
                <input
                  type="number"
                  value={efficiencyGoal}
                  onChange={handleEfficiencyGoalChange}
                  className="mt-1 block w-full rounded-md border p-2 shadow-sm"
                />
              </div>
              <button
                type="submit"
                className="rounded-md border border-[#156082] bg-[#156082] px-6 py-2 text-white hover:bg-[#134b6e]"
              >
                Save Goal
              </button>
            </form>
            <p className="mt-4 text-sm text-gray-600">
              * Set your efficiency goals to maintain optimal turbine
              performance.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default GlobalSettings;
