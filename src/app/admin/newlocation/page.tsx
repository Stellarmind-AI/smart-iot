'use client';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

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
  paymentType: string;
  caNumber?: string;
  reservable: boolean;
}

const AddLocationForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<LocationFormInputs>();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const position: [number, number] = [51.505, -0.09];
  const onSubmit: SubmitHandler<LocationFormInputs> = (
    data: LocationFormInputs,
  ) => {
    setFormSubmitted(true);

    // Simulate adding data to the table (console log for now)
    console.log('Location Submitted:', data);

    // Reset form fields after submission
    reset();

    // Show success notification for 4 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 4000);

    // Scroll to the top of the page after submission
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);
  };

  return (
    <div className="w-full bg-gray-100 p-6">
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
                {...register('locationName', { required: true })}
                className="border-lg mt-1 block w-full rounded-md border border-gray-300 bg-white p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Timezone*
              </label>
              <select
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
                {...register('longitude')}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Country*
              </label>
              <select
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
                {...register('contactNumber')}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Payment Type*
              </label>
              <select
                {...register('paymentType', { required: true })}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="">Select Payment Type</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="PayPal">PayPal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                CA Number (Optional)
              </label>
              <input
                type="text"
                {...register('caNumber')}
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Reservable Toggle */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex items-center">
              <label className="block text-sm font-medium text-gray-900">
                Reservable
              </label>
              <input
                type="checkbox"
                {...register('reservable')}
                className="ml-2 h-6 w-6"
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