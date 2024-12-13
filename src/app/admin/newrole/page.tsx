'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddNewRole() {
  // State to store the form data
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState({
    Analytics: { View: false, Edit: false, Export: false, Delete: false },
    Business: { View: false, Edit: false, Export: false, Delete: false },
    'Abnormal Events': {
      View: false,
      Edit: false,
      Export: false,
      Delete: false,
    },
    Station: { View: false, Edit: false, Export: false, Delete: false },
    Location: { View: false, Edit: false, Export: false, Delete: false },
    Role: { View: false, Edit: false, Export: false, Delete: false },
    Feedback: { View: false, Edit: false, Export: false, Delete: false },
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
  });
  const [locked, setLocked] = useState(false);
  const [createdRole, setCreatedRole] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  const permissionsList = ['View', 'Edit', 'Export', 'Delete'];

  const handlePermissionChange = (section, action) => {
    setPermissions((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [action]: !prev[section][action],
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRole = {
      name: roleName,
      locked: locked,
      permissions: permissions,
    };
    setCreatedRole(newRole); // Update the created role state with the new role
    setAlertMessage('User added successfully!'); // Show success alert

    // Reset form
    setRoleName('');
    setPermissions({
      Analytics: { View: false, Edit: false, Export: false, Delete: false },
      Business: { View: false, Edit: false, Export: false, Delete: false },
      'Abnormal Events': {
        View: false,
        Edit: false,
        Export: false,
        Delete: false,
      },
      Station: { View: false, Edit: false, Export: false, Delete: false },
      Location: { View: false, Edit: false, Export: false, Delete: false },
      Role: { View: false, Edit: false, Export: false, Delete: false },
      Feedback: { View: false, Edit: false, Export: false, Delete: false },
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
    });
    setLocked(false);
    setTimeout(() => setAlertMessage(''), 3000); // Reset the lock status
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
      <div className="p-6">
        <h1 className="mb-6 text-2xl font-bold text-[#156082]">Add New Role</h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-lg bg-white p-6 shadow-md"
        >
          {/* Role Name */}
          <div className="mb-4">
            <label
              htmlFor="roleName"
              className="mb-2 block text-xl font-bold text-[#156082]"
            >
              Role Name
            </label>
            <input
              type="text"
              id="roleName"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-[#156082]"
              required
            />
          </div>

          {/* Permissions Section */}
          <div className="mb-4">
            <h3 className="mb-4 text-xl font-semibold text-[#156082]">
              Permissions
            </h3>
            {Object.keys(permissions).map((section) => (
              <div key={section} className="mb-4">
                <h4 className="mb-2 font-medium text-[#156082]">{section}</h4>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {permissionsList.map((action) => (
                    <label key={action} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={permissions[section][action]}
                        onChange={() => handlePermissionChange(section, action)}
                        className="form-checkbox h-5 w-5 text-[#156082] focus:ring focus:ring-[#156082] focus:ring-offset-0"
                      />
                      <span>{action}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Lock Role */}
          <div className="mb-4 flex items-center space-x-2">
            <input
              type="checkbox"
              checked={locked}
              onChange={() => setLocked(!locked)}
              className="form-checkbox h-5 w-5 text-[#156082] focus:ring focus:ring-[#156082] focus:ring-offset-0"
            />
            <label className="text-lg text-[#156082]">Lock this role</label>
          </div>

          {/* Submit Button */}
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="rounded-lg bg-[#156082] px-6 py-2 text-white hover:bg-[#0f4e5e] focus:outline-none focus:ring-2 focus:ring-[#156082]"
            >
              Create Role
            </button>
          </div>
          {alertMessage && (
            <div className="mb-4 mt-6 rounded-md bg-green-500 p-4 text-white">
              {alertMessage}
            </div>
          )}
        </form>

        {/* Temporary Output */}
        {createdRole && (
          <div className="mt-8 rounded-lg bg-gray-100 p-6 shadow-md">
            <h3 className="mb-4 text-xl font-semibold text-[#156082]">
              New Role Created
            </h3>
            <div className="mb-4">
              <strong>Role Name:</strong> {createdRole.name}
            </div>
            <div className="mb-4">
              <strong>Lock Status:</strong>{' '}
              {createdRole.locked ? 'Locked' : 'Unlocked'}
            </div>
            <div>
              <strong>Permissions:</strong>
              <ul className="mt-2 list-disc pl-6">
                {Object.keys(createdRole.permissions).map((section) => (
                  <li key={section} className="mb-2">
                    <strong>{section}:</strong>
                    <ul className="list-inside">
                      {permissionsList.map((action) => (
                        <li key={action} className="flex items-center">
                          <input
                            type="checkbox"
                            checked={createdRole.permissions[section][action]}
                            className="form-checkbox mr-2 h-5 w-5 text-[#156082]"
                            readOnly
                          />
                          {action}:{' '}
                          {createdRole.permissions[section][action]
                            ? 'Allowed'
                            : 'Denied'}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Alert Message */}
      </div>
    </>
  );
}
