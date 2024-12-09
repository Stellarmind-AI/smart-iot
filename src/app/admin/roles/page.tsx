"use client";
import { useState } from "react";

export default function RolesPermissions() {
  // List of roles
  const roles = [
    {
      name: "Administrator (AD)",
      locked: false,
      permissions: {
        Analytics: { View: true, Edit: true, Export: true, Delete: true },
        Business: { View: true, Edit: true, Export: true, Delete: true },
        "Abnormal Events": { View: true, Edit: true, Export: true, Delete: true },
        Station: { View: true, Edit: true, Export: true, Delete: true },
        Location: { View: true, Edit: true, Export: true, Delete: true },
        Role: { View: true, Edit: true, Export: true, Delete: true },
        Feedback: { View: true, Edit: true, Export: true, Delete: true },
        "Firmware Settings": { View: true, Edit: true, Export: true, Delete: false },
        "Global Settings": { View: true, Edit: true, Export: true, Delete: false },
      },
    },
    {
      name: "Manager",
      locked: false,
      permissions: {
        Analytics: { View: true, Edit: true, Export: true, Delete: false },
        Business: { View: true, Edit: true, Export: true, Delete: false },
        "Abnormal Events": { View: true, Edit: true, Export: true, Delete: false },
        Station: { View: true, Edit: true, Export: true, Delete: false },
        Location: { View: true, Edit: true, Export: true, Delete: false },
        Role: { View: true, Edit: false, Export: false, Delete: false },
        Feedback: { View: true, Edit: true, Export: true, Delete: false },
        "Firmware Settings": { View: true, Edit: false, Export: false, Delete: false },
        "Global Settings": { View: true, Edit: false, Export: false, Delete: false },
      },
    },
    {
      name: "Technician",
      locked: false,
      permissions: {
        Analytics: { View: false, Edit: false, Export: false, Delete: false },
        Business: { View: false, Edit: false, Export: false, Delete: false },
        "Abnormal Events": { View: true, Edit: false, Export: false, Delete: false },
        Station: { View: true, Edit: true, Export: false, Delete: false },
        Location: { View: true, Edit: false, Export: false, Delete: false },
        Role: { View: false, Edit: false, Export: false, Delete: false },
        Feedback: { View: true, Edit: false, Export: false, Delete: false },
        "Firmware Settings": { View: true, Edit: false, Export: false, Delete: false },
        "Global Settings": { View: false, Edit: false, Export: false, Delete: false },
      },
    },
    {
      name: "User",
      locked: false,
      permissions: {
        Analytics: { View: false, Edit: false, Export: false, Delete: false },
        Business: { View: false, Edit: false, Export: false, Delete: false },
        "Abnormal Events": { View: false, Edit: false, Export: false, Delete: false },
        Station: { View: true, Edit: false, Export: false, Delete: false },
        Location: { View: true, Edit: false, Export: false, Delete: false },
        Role: { View: false, Edit: false, Export: false, Delete: false },
        Feedback: { View: true, Edit: false, Export: false, Delete: false },
        "Firmware Settings": { View: false, Edit: false, Export: false, Delete: false },
        "Global Settings": { View: false, Edit: false, Export: false, Delete: false },
      },
    },
    {
      name: "Site Manager",
      locked: false,
      permissions: {
        Analytics: { View: true, Edit: false, Export: false, Delete: false },
        Business: { View: true, Edit: false, Export: false, Delete: false },
        "Abnormal Events": { View: true, Edit: false, Export: false, Delete: false },
        Station: { View: true, Edit: true, Export: false, Delete: false },
        Location: { View: true, Edit: true, Export: false, Delete: false },
        Role: { View: true, Edit: false, Export: false, Delete: false },
        Feedback: { View: true, Edit: false, Export: false, Delete: false },
        "Firmware Settings": { View: true, Edit: false, Export: false, Delete: false },
        "Global Settings": { View: true, Edit: false, Export: false, Delete: false },
      },
    },
  ];

  const permissions = ["View", "Edit", "Export", "Delete"];
  const [selectedRole, setSelectedRole] = useState(roles[0]); // Default to the first role

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#156082] mb-6">Roles and Permissions</h1>

      {/* Roles Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {roles.map((role, index) => (
          <div
            key={index}
            onClick={() => setSelectedRole(role)}
            className={`cursor-pointer p-4 rounded-lg shadow-md border ${
              selectedRole.name === role.name
                ? "bg-[#156082] text-white border-[#156082]"
                : "bg-gray-200 text-black hover:bg-[#156082] hover:text-white"
            }`}
          >
            <h3 className="text-center font-semibold">{role.name}</h3>
            {role.locked && (
              <p className="text-center mt-2 text-sm bg-white text-black rounded px-2 py-1">
                Locked
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Permissions Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-2 md:grid-cols-[1fr_repeat(4,100px)] p-4 bg-[#156082] text-white">
          <div className="font-semibold flex items-center">Permission Type</div>
          {permissions.map((action, index) => (
            <div key={index} className="font-semibold flex items-center justify-center">
              {action}
            </div>
          ))}
        </div>

        {/* Dynamic Permission Rows */}
        {Object.keys(selectedRole.permissions).map((section, index) => (
          <div
            key={index}
            className={`grid grid-cols-2 md:grid-cols-[1fr_repeat(4,100px)] p-4 ${
              index % 2 === 0 ? "bg-gray-200" : "bg-white"
            }`}
          >
            {/* Section Name */}
            <div className="flex items-center">{section}</div>

            {/* Checkboxes for each action */}
            {permissions.map((action, actionIndex) => (
              <div key={actionIndex} className="flex items-center justify-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-[#156082] focus:ring focus:ring-offset-0 focus:ring-[#156082]"
                  checked={selectedRole.permissions[section][action]}
                  readOnly
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
