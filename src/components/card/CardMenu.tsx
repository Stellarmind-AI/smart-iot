import React from 'react';
import { RiSettings3Fill } from 'react-icons/ri'; // Turbine-like icon

function AddTurbineForm() {
  const [formOpen, setFormOpen] = React.useState(false); // Track if the form is open

  const handleFormOpen = () => {
    setFormOpen(true); // Open form
  };

  const handleFormClose = () => {
    setFormOpen(false); // Close form
  };

  return (
    <div>
      {/* Add Turbine Button */}
      <button
        type="button"
        onClick={handleFormOpen}
        className="hover:text-black flex cursor-pointer items-center gap-2 border-none bg-none p-0 text-gray-600"
      >
        <RiSettings3Fill />
        <span>Add Turbine</span>
      </button>

      {/* Form with gray background when open */}
      {formOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50"
          onClick={handleFormClose} // Close the form when clicking outside
        >
          <div
            className="rounded-lg bg-white p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
          >
            <h3 className="mb-4 text-2xl font-bold">Turbine Control Form</h3>
            <form>
              {/* Turbine Name */}
              <label htmlFor="turbineName" className="mb-2 block">
                Turbine Name
              </label>
              <input
                id="turbineName"
                type="text"
                className="mb-4 w-full rounded-md border border-gray-300 p-2"
              />

              {/* Location */}
              <label htmlFor="location" className="mb-2 block">
                Location
              </label>
              <input
                id="location"
                type="text"
                className="mb-4 w-full rounded-md border border-gray-300 p-2"
              />

              {/* Serial Number */}
              <label htmlFor="serialNumber" className="mb-2 block">
                Serial Number
              </label>
              <input
                id="serialNumber"
                type="text"
                className="mb-4 w-full rounded-md border border-gray-300 p-2"
              />

              {/* Status */}
              <label htmlFor="status" className="mb-2 block">
                Status
              </label>
              <select
                id="status"
                className="mb-4 w-full rounded-md border border-gray-300 p-2"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="maintenance">Maintenance</option>
              </select>

              {/* Submit Button */}
              <button
                type="submit"
                className="rounded-md bg-blue-500 px-4 py-2 text-white"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddTurbineForm;
