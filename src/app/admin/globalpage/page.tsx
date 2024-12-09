'use client';
import React, { useState } from 'react';

const energyData = [
  { day: 'Monday', energy: '120 kWh' },
  { day: 'Tuesday', energy: '135 kWh' },
  { day: 'Wednesday', energy: '128 kWh' },
  { day: 'Thursday', energy: '140 kWh' },
  { day: 'Friday', energy: '130 kWh' },
];

const GlobalSettings = () => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'optimization'>('analytics');
  const [efficiencyGoal, setEfficiencyGoal] = useState(95); // Example efficiency goal
  const [successAlert, setSuccessAlert] = useState(false); // State for the success alert

  const handleTabChange = (tab: 'analytics' | 'optimization') => {
    setActiveTab(tab);
  };

  const handleEfficiencyGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEfficiencyGoal(Number(e.target.value));
  };

  const handleSaveGoal = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessAlert(true); // Show the success alert when the form is submitted

    // Hide the alert after 3 seconds
    setTimeout(() => setSuccessAlert(false), 3000);
  };

  return (
    <div className="min-h-screen p-6 font-sans bg-gray-50 text-black">
      <h1 className="text-4xl font-semibold mb-6  text-[#156082]">
        Global Settings
      </h1>

      {/* Tabs */}
      <div className="flex space-x-4  mb-6">
        <button
          onClick={() => handleTabChange('analytics')}
          className={`rounded-md px-6 py-2 text-sm ${
            activeTab === 'analytics'
              ? 'bg-[#156082] text-white'
              : 'bg-gray-200 text-black'
          }`}
        >
          Energy Analytics
        </button>
        <button
          onClick={() => handleTabChange('optimization')}
          className={`rounded-md px-6 py-2 text-sm ${
            activeTab === 'optimization'
              ? 'bg-[#156082] text-white'
              : 'bg-gray-200 text-black'
          }`}
        >
          Efficiency Optimization
        </button>
      </div>

      {/* Energy Analytics Section */}
      {activeTab === 'analytics' && (
        <div className="p-6 border rounded-md ">
          <h2 className="text-2xl font-semibold mb-4 text-[#156082] text-center">
            Energy Analytics
          </h2>
        
          <table className="w-full border-collapse border border-gray-200 bg-white rounded-md shadow-md">
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
        <div className="p-6 border rounded-md bg-white shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-center text-[#156082]">
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
              <label className="block text-sm font-medium text-black">
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
              className="rounded-md px-6 py-2 border border-[#156082] bg-[#156082] text-white hover:bg-[#134b6e]"
            >
              Save Goal
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600">
            * Set your efficiency goals to maintain optimal turbine performance.
          </p>
        </div>
      )}
    </div>
  );
};

export default GlobalSettings;
