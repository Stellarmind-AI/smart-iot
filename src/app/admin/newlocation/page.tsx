'use client';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
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

const AddLocationForm: React.FC = () => {
  const { register, handleSubmit, setValue, reset, watch } = useForm<LocationFormInputs>();
  const [locationName, setLocationName] = useState<string>('');
  const [addressLine1, setAddressLine1] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [stateProvince, setStateProvince] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markerPosition, setMarkerPosition] = useState<{ lat: number, lng: number }>({ lat: 40.7128, lng: -74.0060 });
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

  const defaultLocation = { lat: 40.7128, lng: -74.0060 }; // Default location (New York City)

  const fetchLocationName = (latitude: number, longitude: number) => {
    if (window.google && window.google.maps) {
      const geocoder = new window.google.maps.Geocoder();
      const latLng = { lat: latitude, lng: longitude };

      geocoder.geocode({ location: latLng }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const result = results[0];

          setLocationName(result.formatted_address);
          setValue('locationName', result.formatted_address);

          const lat = result.geometry.location.lat();
          const lng = result.geometry.location.lng();

          setValue('latitude', lat.toFixed(6));
          setValue('longitude', lng.toFixed(6));

          setAddressLine1('');
          setCity('');
          setStateProvince('');
          setCountry('');
          setPostalCode('');
        } else {
          console.error('Geocoder failed due to: ' + status);
        }
      });
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMarkerPosition({ lat: latitude, lng: longitude });
          setValue('latitude', latitude.toFixed(6));
          setValue('longitude', longitude.toFixed(6));
          fetchLocationName(latitude, longitude);
        },
        (error) => {
          console.error('Error fetching location:', error);
          alert('Could not fetch current location.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const onSubmit: SubmitHandler<LocationFormInputs> = (data) => {
    console.log('Form submitted with data:', data);
    // Submit the form data (you can send it to your API here)
  };

  const router = useRouter();
  const navigateToDashboard = () => {
    router.push('/admin/default');
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

  const initializeMap = (mapInstance: google.maps.Map) => {
    setMap(mapInstance);
    const initialMarkerInstance = new google.maps.Marker({
      position: markerPosition,
      map: mapInstance,
      draggable: true,
    });

    google.maps.event.addListener(initialMarkerInstance, 'dragend', () => {
      const position = initialMarkerInstance.getPosition();
      if (position) {
        const lat = parseFloat(position.lat().toFixed(6));
        const lng = parseFloat(position.lng().toFixed(6));
        setValue('latitude', lat.toFixed(6));
        setValue('longitude', lng.toFixed(6));
        fetchLocationName(lat, lng);
      }
    });

    mapInstance.addListener('click', (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const lat = parseFloat(event.latLng.lat().toFixed(6));
        const lng = parseFloat(event.latLng.lng().toFixed(6));
        setMarkerPosition({ lat, lng });
        initialMarkerInstance.setPosition(event.latLng);
        setValue('latitude', lat.toFixed(6));
        setValue('longitude', lng.toFixed(6));
        fetchLocationName(lat, lng);
      }
    });
  };

  // Load Google Maps API script manually
  useEffect(() => {
    if (typeof window !== 'undefined' && !window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDVoweyAAxiBHwR9WGA-ZxDStTMXxnoo8s&callback=initMap`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        setIsGoogleMapsLoaded(true);
      };

      window.initMap = () => {
        if (map) {
          initializeMap(map);
        }
      };
    }

    return () => {
      // Cleanup script from the DOM when the component is unmounted
      const script = document.querySelector(`script[src^="https://maps.googleapis.com/maps/api/js"]`);
      if (script) {
        script.remove();
      }
    };
  }, [map]);

  if (!isGoogleMapsLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  return (
    <div className="w-full p-6">
      <div className="mb-4 flex items-center gap-4">
        <div className="flex items-center">
          <button
            onClick={navigateToDashboard}
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
        {[{ label: 'Assets', onClick: navigateToAssets },
          { label: 'Businesses', onClick: navigateToBusinesses },
          { label: 'Administration', onClick: navigateToAdministration }].map((btn, index) => (
            <button
              key={index}
              onClick={btn.onClick}
              className="rounded-full bg-[#ECF2FF] px-6 py-2 font-bold text-[#5D90A7] shadow-sm transition-transform duration-300 hover:scale-105 hover:bg-daketBlue hover:text-white"
              title={btn.label}
            >
              {btn.label}
            </button>
          ))}
      </div>

      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Add New Location</h2>

      <div id="google-map" className="h-64 w-full sm:h-96 mb-4">
        <GoogleMap
          mapContainerStyle={{ height: "400px", width: "100%" }}
          center={markerPosition}
          zoom={13}
          onLoad={initializeMap} // Ensure map is initialized properly
        >
          <Marker position={markerPosition} draggable={true} />
        </GoogleMap>
      </div>

      <div className="mb-4">
        <button
          type="button"
          onClick={getCurrentLocation}
          className="w-full rounded-md bg-daketBlue my-2 px-4 py-2 text-white hover:bg-daketBlue"
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
              onChange={(e) => setLocationName(e.target.value)} // Allow manual input
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
          <div>
            <label className="block text-sm font-medium text-gray-900">Address</label>
            <input
              type="text"
              {...register('addressLine1')}
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)} // Allow manual input
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-12 px-4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">City</label>
            <input
              type="text"
              {...register('city')}
              value={city}
              onChange={(e) => setCity(e.target.value)} // Allow manual input
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-12 px-4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">State/Province</label>
            <input
              type="text"
              {...register('stateProvince')}
              value={stateProvince}
              onChange={(e) => setStateProvince(e.target.value)} // Allow manual input
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-12 px-4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Country</label>
            <input
              type="text"
              {...register('country')}
              value={country}
              onChange={(e) => setCountry(e.target.value)} // Allow manual input
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-12 px-4"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Postal Code</label>
            <input
              type="text"
              {...register('postalCode')}
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)} // Allow manual input
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-12 px-4"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-daketBlue px-4 py-2 text-white hover:bg-daketBlue"
        >
          Submit
        </button>
      </form>

    </div>
  );
};

export default AddLocationForm;
