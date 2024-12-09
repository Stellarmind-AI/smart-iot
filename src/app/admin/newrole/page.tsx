"use client";
import { useState } from "react";

export default function AddNewRole() {
  // State to store the form data
  const [roleName, setRoleName] = useState("");
  const [permissions, setPermissions] = useState({
    Analytics: { View: false, Edit: false, Export: false, Delete: false },
    Business: { View: false, Edit: false, Export: false, Delete: false },
    "Abnormal Events": { View: false, Edit: false, Export: false, Delete: false },
    Station: { View: false, Edit: false, Export: false, Delete: false },
    Location: { View: false, Edit: false, Export: false, Delete: false },
    Role: { View: false, Edit: false, Export: false, Delete: false },
    Feedback: { View: false, Edit: false, Export: false, Delete: false },
    "Firmware Settings": { View: false, Edit: false, Export: false, Delete: false },
    "Global Settings": { View: false, Edit: false, Export: false, Delete: false },
  });
  const [locked, setLocked] = useState(false);
  const [createdRole, setCreatedRole] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  const permissionsList = ["View", "Edit", "Export", "Delete"];

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
    setRoleName("");
    setPermissions({
      Analytics: { View: false, Edit: false, Export: false, Delete: false },
      Business: { View: false, Edit: false, Export: false, Delete: false },
      "Abnormal Events": { View: false, Edit: false, Export: false, Delete: false },
      Station: { View: false, Edit: false, Export: false, Delete: false },
      Location: { View: false, Edit: false, Export: false, Delete: false },
      Role: { View: false, Edit: false, Export: false, Delete: false },
      Feedback: { View: false, Edit: false, Export: false, Delete: false },
      "Firmware Settings": { View: false, Edit: false, Export: false, Delete: false },
      "Global Settings": { View: false, Edit: false, Export: false, Delete: false },
    });
    setLocked(false);
    setTimeout(() => setAlertMessage(''), 3000); // Reset the lock status
  };

  return (
    <div className="p-6">
    
      <h1 className="text-2xl font-bold text-[#156082] mb-6">Add New Role</h1>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {/* Role Name */}
        <div className="mb-4">
          <label htmlFor="roleName" className="block text-xl font-bold text-[#156082] mb-2">
            Role Name
          </label>
          <input
            type="text"
            id="roleName"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#156082]"
            required
          />
        </div>

        {/* Permissions Section */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-[#156082] mb-4">Permissions</h3>
          {Object.keys(permissions).map((section) => (
            <div key={section} className="mb-4">
              <h4 className="font-medium text-[#156082] mb-2">{section}</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {permissionsList.map((action) => (
                  <label key={action} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={permissions[section][action]}
                      onChange={() => handlePermissionChange(section, action)}
                      className="form-checkbox h-5 w-5 text-[#156082] focus:ring focus:ring-offset-0 focus:ring-[#156082]"
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
            className="form-checkbox h-5 w-5 text-[#156082] focus:ring focus:ring-offset-0 focus:ring-[#156082]"
          />
          <label className="text-lg text-[#156082]">Lock this role</label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-[#156082] text-white px-6 py-2 rounded-lg hover:bg-[#0f4e5e] focus:outline-none focus:ring-2 focus:ring-[#156082]"
          >
            Create Role
          </button>
        </div>
        {alertMessage && (
        <div className="mt-6 mb-4 text-white bg-green-500 p-4 rounded-md">
          {alertMessage}
        </div>
      )}
      </form>



      {/* Temporary Output */}
      {createdRole && (
        <div className="mt-8 p-6 bg-gray-100 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-[#156082] mb-4">New Role Created</h3>
          <div className="mb-4">
            <strong>Role Name:</strong> {createdRole.name}
          </div>
          <div className="mb-4">
            <strong>Lock Status:</strong> {createdRole.locked ? "Locked" : "Unlocked"}
          </div>
          <div>
            <strong>Permissions:</strong>
            <ul className="list-disc pl-6 mt-2">
              {Object.keys(createdRole.permissions).map((section) => (
                <li key={section} className="mb-2">
                  <strong>{section}:</strong>
                  <ul className="list-inside">
                    {permissionsList.map((action) => (
                      <li key={action} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={createdRole.permissions[section][action]}
                          className="form-checkbox h-5 w-5 text-[#156082] mr-2"
                          readOnly
                        />
                        {action}: {createdRole.permissions[section][action] ? "Allowed" : "Denied"}
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
  );
}
