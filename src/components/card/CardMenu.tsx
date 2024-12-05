import React from 'react';
import { RiSettings3Fill } from 'react-icons/ri'; // Turbine-like icon
import { AiOutlineClose } from 'react-icons/ai'; // Close icon

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
      {/* Add Station Button */}
      <button
        type="button"
        onClick={handleFormOpen}
        className="hover:text-black flex items-center gap-2 text-lg font-bold text-daketBlue transition"
      >
        <RiSettings3Fill size={24} />
        <span>Add Station</span>
      </button>

      {/* Form with gray background when open */}
      {formOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-horizonBlue-950 bg-opacity-80"
          onClick={handleFormClose} // Close the form when clicking outside
        >
          <div
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-8 shadow-lg" // Updated for scrolling
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the form
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleFormClose}
              className="absolute right-4 top-4 text-daketBlue hover:text-daketBlue"
            >
              <AiOutlineClose size={24} />
            </button>

            <h3 className="mb-6 text-center text-2xl font-bold text-gray-800">
              Add Turbine Station
            </h3>
            <form>
              {/* Turbine Name */}
              <div className="mb-6">
                <label
                  htmlFor="turbineName"
                  className="text-black mb-1 block text-lg font-medium"
                >
                  Turbine Name
                </label>
                <input
                  id="turbineName"
                  type="text"
                  className="block w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:border-daketBlue focus:ring-daketBlue sm:text-sm"
                />
              </div>

              {/* Location */}
              <div className="mb-6">
                <label
                  htmlFor="location"
                  className="text-black mb-1 block text-lg font-medium"
                >
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  className="block w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:border-daketBlue focus:ring-daketBlue sm:text-sm"
                />
              </div>

              {/* Latitude and Longitude */}
              <div className="mb-6 grid grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="latitude"
                    className="text-black mb-1 block text-lg font-medium"
                  >
                    Latitude
                  </label>
                  <input
                    id="latitude"
                    type="text"
                    className="block w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:border-daketBlue focus:ring-daketBlue sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="longitude"
                    className="text-black mb-1 block text-lg font-medium"
                  >
                    Longitude
                  </label>
                  <input
                    id="longitude"
                    type="text"
                    className="block w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:border-daketBlue focus:ring-daketBlue sm:text-sm"
                  />
                </div>
              </div>

              {/* Serial Number */}
              <div className="mb-6">
                <label
                  htmlFor="serialNumber"
                  className="text-black mb-1 block text-lg font-medium"
                >
                  Serial Number
                </label>
                <input
                  id="serialNumber"
                  type="text"
                  className="block w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:border-daketBlue focus:ring-daketBlue sm:text-sm"
                />
              </div>

              {/* Status */}
              <div className="mb-6">
                <label
                  htmlFor="status"
                  className="text-black mb-1 block text-lg font-medium"
                >
                  Status
                </label>
                <select
                  id="status"
                  className="block w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:border-daketBlue focus:ring-daketBlue sm:text-sm"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  {/* <option value="maintenance">Maintenance</option> */}
                </select>
              </div>

              {/* Station Image */}
              <div className="mb-6">
                <label
                  htmlFor="stationImage"
                  className="text-black mb-1 block text-lg font-medium"
                >
                  Station Image
                </label>
                <input
                  id="stationImage"
                  type="file"
                  className="block w-full rounded-md border-2 border-gray-300 p-2 shadow-sm focus:border-daketBlue focus:ring-daketBlue sm:text-sm"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="hover:bg-daketBlue-dark w-full rounded-md bg-daketBlue px-4 py-2 text-white shadow-sm transition focus:outline-none focus:ring-2 focus:ring-daketBlue focus:ring-offset-2"
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
