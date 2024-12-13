// 'use client'
import React, { useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
// Dynamically import React-Leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false },
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false },
);
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), {
  ssr: false,
});

interface LocationFormInputs {
  locationName: string;
  timezone: string;
  latitude: string;
  longitude: string;
  country: string;
  stateProvince: string;
  city: string;
  addressLine1: string;
  addressLine2?: string;
  postalCode: string;
  businessOwner: string;
  contactEmail: string;
  contactNumber: string;
  countryCode: string;
}

const AddLocationForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<LocationFormInputs>();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const position: [number, number] = [51.505, -0.09];

  // Inside your component
  const [shouldScroll, setShouldScroll] = useState(false);

  const onSubmit: SubmitHandler<LocationFormInputs> = (
    data: LocationFormInputs,
  ) => {
    setFormSubmitted(true);

    // Simulate adding data to the table (console log for now)
    console.log('Location Submitted:', data);

    // Reset form fields after submission
    reset();

    // Trigger scroll after form submission
    setShouldScroll(true);

    // Show success notification for 4 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 4000);
  };

  // UseEffect to handle window.scrollTo safely
  useEffect(() => {
    if (shouldScroll && typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setShouldScroll(false); // Reset the scroll trigger
    }
  }, [shouldScroll]);

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
    <div className="w-full bg-gray-100 p-6">
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

      {/* Success Message */}
      {formSubmitted && (
        <div className="fixed bottom-5 right-5 rounded-lg bg-green-500 p-4 text-white shadow-lg">
          <p>Location added successfully!</p>
        </div>
      )}

      {/* Map Section */}
      <div className="mb-12 w-full max-w-full">
        <h2 className="mb-6 text-start text-2xl font-bold text-gray-800">
          Add New Location
        </h2>
        {/* Leaflet Map */}
        <div className="h-64 w-full sm:h-96 md:h-64 lg:h-64">
          <MapContainer
            center={position}
            zoom={13}
            style={{ width: '100%', height: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>Temporary Location</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      <div className="w-full max-w-full rounded-lg bg-white p-8 shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Location Details */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Location Name*
              </label>
              <input
                type="text"
                required
                {...register('locationName', { required: true })}
                className="border-lg mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Timezone*
              </label>
              <select
                required
                {...register('timezone', { required: true })}
                className="focus:border-gra mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select Timezone</option>
                <option value="GMT">GMT</option>
                <option value="EST">EST</option>
                <option value="PST">PST</option>
                <option value="CST">CST</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Latitude*
              </label>
              <input
                type="text"
                required
                {...register('latitude', { required: true })}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Other fields */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Longitude
              </label>
              <input
                type="text"
                required
                {...register('longitude')}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Country*
              </label>
              <select
                required
                {...register('country', { required: true })}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select Country</option>
                <option value="USA">USA</option>
                <option value="Canada">Canada</option>
                <option value="India">India</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                State/Province*
              </label>
              <input
                type="text"
                required
                {...register('stateProvince', { required: true })}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* More fields... */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-900">
                City*
              </label>
              <input
                type="text"
                required
                {...register('city', { required: true })}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Address Line 1*
              </label>
              <input
                type="text"
                required
                {...register('addressLine1', { required: true })}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Address Line 2
              </label>
              <input
                type="text"
                required
                {...register('addressLine2')}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* New Fields */}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Zip/Postal Code*
              </label>
              <input
                type="text"
                required
                {...register('postalCode', { required: true })}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Business Owner
              </label>
              <input
                type="text"
                required
                {...register('businessOwner')}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Contact Email*
              </label>
              <input
                type="email"
                required
                {...register('contactEmail', { required: true })}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Contact Number (with Country Code)
              </label>
              <input
                type="tel"
                required
                {...register('contactNumber')}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 w-full rounded-md bg-daketBlue py-3 text-white hover:bg-daketBlue"
          >
            Submit Location
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddLocationForm;
