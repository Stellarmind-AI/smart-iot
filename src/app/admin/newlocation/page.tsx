"use client";
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useRouter } from 'next/navigation';

interface LocationFormInputs {
  locationName: string;
  latitude: string;
  longitude: string;
  addressLine1: string;
  city: string;
  stateProvince: string;
  country: string;
  postalCode: string;
  timezone: string;
  businessOwner: string;
  contactEmail: string;
  contactNumber: string;
  countryCode: string;
}

declare global {
  interface Window {
    google: any;
  }
}

const AddLocationForm: React.FC = () => {
  const { register, handleSubmit, setValue, reset, watch } = useForm<LocationFormInputs>();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState<google.maps.Marker | null>(null);
  const [locationName, setLocationName] = useState<string>('');
  const [addressLine1, setAddressLine1] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [stateProvince, setStateProvince] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');

  const defaultLocation = { lat: 40.7128, lng: -74.006 }; // Default location (New York City)

  // Initialize map
  const initializeMap = (center: { lat: number; lng: number }) => {
    const mapInstance = new window.google.maps.Map(
      document.getElementById('google-map') as HTMLElement,
      {
        center,
        zoom: 13,
      },
    );

    const initialMarker = new window.google.maps.Marker({
      position: center,
      map: mapInstance,
      draggable: true,
    });

    // Set initial latitude and longitude
    setValue('latitude', center.lat.toFixed(6));
    setValue('longitude', center.lng.toFixed(6));

    // Update on marker drag
    initialMarker.addListener('dragend', () => {
      const position = initialMarker.getPosition();
      if (position) {
        const lat = position.lat().toFixed(6);
        const lng = position.lng().toFixed(6);

        setValue('latitude', lat);
        setValue('longitude', lng);
        fetchLocationName(position.lat(), position.lng());
      }
    });

    // Update on map click
    mapInstance.addListener('click', (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const lat = event.latLng.lat().toFixed(6);
        const lng = event.latLng.lng().toFixed(6);

        initialMarker.setPosition(event.latLng);
        setValue('latitude', lat);
        setValue('longitude', lng);
        fetchLocationName(event.latLng.lat(), event.latLng.lng());
      }
    });

    // Set map and marker state
    setMap(mapInstance);
    setMarker(initialMarker);
  };

  // Fetch location details using Geocoding API
  const fetchLocationName = (latitude: number, longitude: number) => {
    const geocoder = new window.google.maps.Geocoder();
    const latLng = { lat: latitude, lng: longitude };

    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK' && results[0]) {
        const result = results[0];
        setLocationName(result.formatted_address);
        setValue('locationName', result.formatted_address);

        // Populate other address details
        const addressComponents = result.address_components;
        setAddressLine1(addressComponents?.find((comp: any) => comp.types.includes('route'))?.long_name || '');
        setCity(addressComponents?.find((comp: any) => comp.types.includes('locality'))?.long_name || '');
        setStateProvince(addressComponents?.find((comp: any) => comp.types.includes('administrative_area_level_1'))?.long_name || '');
        setCountry(addressComponents?.find((comp: any) => comp.types.includes('country'))?.long_name || '');
        setPostalCode(addressComponents?.find((comp: any) => comp.types.includes('postal_code'))?.long_name || '');

        // Set values in the form
        setValue('addressLine1', addressLine1);
        setValue('city', city);
        setValue('stateProvince', stateProvince);
        setValue('country', country);
        setValue('postalCode', postalCode);
      } else {
        console.error('Geocoder failed due to: ' + status);
      }
    });
  };

  // Use current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Center map and update marker
          const currentLocation = { lat: latitude, lng: longitude };
          if (map && marker) {
            map.setCenter(currentLocation);
            marker.setPosition(currentLocation);
          } else {
            initializeMap(currentLocation);
          }

          setValue('latitude', latitude.toFixed(6));
          setValue('longitude', longitude.toFixed(6));
          fetchLocationName(latitude, longitude);
        },
        (error) => {
          console.error('Error fetching location:', error);
          alert('Could not fetch current location.');
        },
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google) {
      // Load map with the default location
      initializeMap(defaultLocation);
      fetchLocationName(defaultLocation.lat, defaultLocation.lng);
    }
  }, []);

  const onSubmit: SubmitHandler<LocationFormInputs> = (data) => {
    console.log('Form submitted with data:', data);
    // Submit the form data (you can send it to your API here)
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
    <div className="w-full p-6">
      {/* Navigation Buttons */}
      <div className="mb-4 flex items-center gap-4">
        {/* Back to Dashboard Button */}
        <div className="flex items-center">
          <button
            onClick={navigateToDashboard} // Replace with your navigation logic
            className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#ECF2FF] text-[#5D90A7] shadow-sm hover:bg-daketBlue hover:text-white"
            title="Back to Dashboard"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="h-6 w-6 transform transition-transform duration-300 group-hover:scale-125"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        </div>

        {/* Additional Buttons */}
        {[{ label: 'Assets', onClick: navigateToAssets },
          { label: 'Businesses', onClick: navigateToBusinesses },
          { label: 'Administration', onClick: navigateToAdministration }].map((btn, index) => (
            <button
              key={index}
              onClick={btn.onClick} // Replace with the respective navigation logic
              className="rounded-full bg-[#ECF2FF] px-6 py-2 font-bold text-[#5D90A7] shadow-sm transition-transform duration-300 hover:scale-105 hover:bg-daketBlue hover:text-white"
              title={btn.label}
            >
              {btn.label}
            </button>
          ))}
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Add New Location</h2>

   
      {/* Google Map */}
      <div id="google-map" className="h-64 w-full sm:h-96 mb-4"></div>

         {/* Use Current Location Button */}
         <div className="mb-4">
        <button
          type="button"
          onClick={getCurrentLocation}
          className="w-full rounded-md bg-daketBlue px-4 py-2 text-white hover:bg-daketBlue"
        >
          Use Current Location
        </button>
      </div>


      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Location Name */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Location Name</label>
            <input
              type="text"
              {...register('locationName')}
              value={locationName}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-12 px-4"
            />
          </div>

          {/* Latitude */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Latitude</label>
            <input
              type="text"
              {...register('latitude', { required: true })}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-12 px-4"
            />
          </div>

          {/* Longitude */}
          <div>
            <label className="block text-sm font-medium text-gray-900">Longitude</label>
            <input
              type="text"
              {...register('longitude', { required: true })}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-12 px-4"
            />
          </div>
        </div>

        {/* Address and City Fields */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-900">Address</label>
            <input
              type="text"
              {...register('addressLine1')}
              value={addressLine1}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-12 px-4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">City</label>
            <input
              type="text"
              {...register('city')}
              value={city}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-12 px-4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">State/Province</label>
            <input
              type="text"
              {...register('stateProvince')}
              value={stateProvince}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-12 px-4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Country</label>
            <input
              type="text"
              {...register('country')}
              value={country}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-12 px-4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Postal Code</label>
            <input
              type="text"
              {...register('postalCode')}
              value={postalCode}
              readOnly
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-12 px-4"
            />
          </div>
        </div>

        {/* Timezone */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-900">Timezone</label>
            <select
              {...register('timezone')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 sm:text-sm h-12 px-4"
            >
              <option value="GMT">GMT</option>
              <option value="EST">EST</option>
              <option value="PST">PST</option>
              <option value="CST">CST</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Company Name</label>
            <input
              type="text"
              {...register('businessOwner')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-12 px-4"
            />
          </div>
        </div>

        {/* Contact Details */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-900">Contact Email</label>
            <input
              type="email"
              {...register('contactEmail')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-12 px-4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Contact Number</label>
            <input
              type="text"
              {...register('contactNumber')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-12 px-4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Country Code</label>
            <input
              type="text"
              {...register('countryCode')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-12 px-4"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-6">
          <button
            type="submit"
            className="rounded-md bg-daketBlue py-2 px-4 text-white hover:bg-daketBlue"
          >
            Submit Location
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLocationForm;
