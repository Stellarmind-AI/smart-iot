'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RolesPermissions() {
  // List of roles
  const roles = [
    {
      name: 'Administrator (AD)',
      locked: false,
      permissions: {
        Analytics: { View: true, Edit: true, Export: true, Delete: true },
        Business: { View: true, Edit: true, Export: true, Delete: true },
        'Abnormal Events': {
          View: true,
          Edit: true,
          Export: true,
          Delete: true,
        },
        Station: { View: true, Edit: true, Export: true, Delete: true },
        Location: { View: true, Edit: true, Export: true, Delete: true },
        Role: { View: true, Edit: true, Export: true, Delete: true },
        Feedback: { View: true, Edit: true, Export: true, Delete: true },
        'Firmware Settings': {
          View: true,
          Edit: true,
          Export: true,
          Delete: false,
        },
        'Global Settings': {
          View: true,
          Edit: true,
          Export: true,
          Delete: false,
        },
      },
    },
    {
      name: 'Manager',
      locked: false,
      permissions: {
        Analytics: { View: true, Edit: true, Export: true, Delete: false },
        Business: { View: true, Edit: true, Export: true, Delete: false },
        'Abnormal Events': {
          View: true,
          Edit: true,
          Export: true,
          Delete: false,
        },
        Station: { View: true, Edit: true, Export: true, Delete: false },
        Location: { View: true, Edit: true, Export: true, Delete: false },
        Role: { View: true, Edit: false, Export: false, Delete: false },
        Feedback: { View: true, Edit: true, Export: true, Delete: false },
        'Firmware Settings': {
          View: true,
          Edit: false,
          Export: false,
          Delete: false,
        },
        'Global Settings': {
          View: true,
          Edit: false,
          Export: false,
          Delete: false,
        },
      },
    },
    {
      name: 'Technician',
      locked: false,
      permissions: {
        Analytics: { View: false, Edit: false, Export: false, Delete: false },
        Business: { View: false, Edit: false, Export: false, Delete: false },
        'Abnormal Events': {
          View: true,
          Edit: false,
          Export: false,
          Delete: false,
        },
        Station: { View: true, Edit: true, Export: false, Delete: false },
        Location: { View: true, Edit: false, Export: false, Delete: false },
        Role: { View: false, Edit: false, Export: false, Delete: false },
        Feedback: { View: true, Edit: false, Export: false, Delete: false },
        'Firmware Settings': {
          View: true,
          Edit: false,
          Export: false,
          Delete: false,
        },
        'Global Settings': {
          View: false,
          Edit: false,
          Export: false,
          Delete: false,
        },
      },
    },
    {
      name: 'User',
      locked: false,
      permissions: {
        Analytics: { View: false, Edit: false, Export: false, Delete: false },
        Business: { View: false, Edit: false, Export: false, Delete: false },
        'Abnormal Events': {
          View: false,
          Edit: false,
          Export: false,
          Delete: false,
        },
        Station: { View: true, Edit: false, Export: false, Delete: false },
        Location: { View: true, Edit: false, Export: false, Delete: false },
        Role: { View: false, Edit: false, Export: false, Delete: false },
        Feedback: { View: true, Edit: false, Export: false, Delete: false },
        'Firmware Settings': {
          View: false,
          Edit: false,
          Export: false,
          Delete: false,
        },
        'Global Settings': {
          View: false,
          Edit: false,
          Export: false,
          Delete: false,
        },
      },
    },
    {
      name: 'Site Manager',
      locked: false,
      permissions: {
        Analytics: { View: true, Edit: false, Export: false, Delete: false },
        Business: { View: true, Edit: false, Export: false, Delete: false },
        'Abnormal Events': {
          View: true,
          Edit: false,
          Export: false,
          Delete: false,
        },
        Station: { View: true, Edit: true, Export: false, Delete: false },
        Location: { View: true, Edit: true, Export: false, Delete: false },
        Role: { View: true, Edit: false, Export: false, Delete: false },
        Feedback: { View: true, Edit: false, Export: false, Delete: false },
        'Firmware Settings': {
          View: true,
          Edit: false,
          Export: false,
          Delete: false,
        },
        'Global Settings': {
          View: true,
          Edit: false,
          Export: false,
          Delete: false,
        },
      },
    },
  ];

  const permissions = ['View', 'Edit', 'Export', 'Delete'];
  const [selectedRole, setSelectedRole] = useState(roles[0]); // Default to the first role

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
      <div className="p-6">
        <h1 className="mb-6 text-2xl font-bold text-[#156082]">
          Roles and Permissions
        </h1>

        {/* Roles Grid */}
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {roles.map((role, index) => (
            <div
              key={index}
              onClick={() => setSelectedRole(role)}
              className={`cursor-pointer rounded-lg border p-4 shadow-md ${
                selectedRole.name === role.name
                  ? 'border-[#156082] bg-[#156082] text-white'
                  : 'text-black bg-gray-200 hover:bg-[#156082] hover:text-white'
              }`}
            >
              <h3 className="text-center font-semibold">{role.name}</h3>
              {role.locked && (
                <p className="text-black mt-2 rounded bg-white px-2 py-1 text-center text-sm">
                  Locked
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Permissions Table */}
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
          {/* Header */}
          <div className="grid grid-cols-2 bg-[#156082] p-4 text-white md:grid-cols-[1fr_repeat(4,100px)]">
            <div className="flex items-center font-semibold">
              Permission Type
            </div>
            {permissions.map((action, index) => (
              <div
                key={index}
                className="flex items-center justify-center font-semibold"
              >
                {action}
              </div>
            ))}
          </div>

          {/* Dynamic Permission Rows */}
          {Object.keys(selectedRole.permissions).map((section, index) => (
            <div
              key={index}
              className={`grid grid-cols-2 p-4 md:grid-cols-[1fr_repeat(4,100px)] ${
                index % 2 === 0 ? 'bg-gray-200' : 'bg-white'
              }`}
            >
              {/* Section Name */}
              <div className="flex items-center">{section}</div>

              {/* Checkboxes for each action */}
              {permissions.map((action, actionIndex) => (
                <div
                  key={actionIndex}
                  className="flex items-center justify-center"
                >
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 accent-[#156082] focus:ring focus:ring-[#156082] focus:ring-offset-0"
                    checked={selectedRole.permissions[section][action]}
                    readOnly
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
