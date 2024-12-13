import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '0.5rem', // Rounded corners for the map container
  overflow: 'hidden', // Ensure content doesn't overflow the rounded corners
};

// Center the map on Canada
const center = {
  lat: 56.130366, // Approximate center latitude of Canada
  lng: -106.346771, // Approximate center longitude of Canada
};

// Canadian station locations
const stations = [
  { id: '1', name: 'IESO', position: { lat: 43.651070, lng: -79.347015 } }, // Toronto, Ontario
  { id: '2', name: 'Collectdev LP', position: { lat: 45.421532, lng: -75.697189 } }, // Ottawa, Ontario
  { id: '3', name: '33 Isabella Street', position: { lat: 49.282729, lng: -83.697189 } }, // Vancouver, British Columbia
  { id: '4', name: 'IESO', position: { lat: 53.546124, lng: -74.697189 } }, // Edmonton, Alberta
  { id: '5', name: 'IESO', position: { lat: 45.501689, lng: -86.697189 } }, // Montreal, Quebec
];

const GoogleMapComponentWithoutRouter: React.FC = () => {
  const [isClient, setIsClient] = useState(false);
  const [selectedStation, setSelectedStation] = useState<any>(null);

  useEffect(() => {
    setIsClient(true); // Ensure rendering only on the client-side
  }, []);

  const handleMarkerClick = (station: any) => {
    setSelectedStation(station);
  };

  const redirectToOverview = () => {
    window.location.href = '/admin/overview'; // Redirect to the overview page
  };

  if (!isClient) {
    return null; // Avoid rendering during SSR
  }

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={3} // Adjusted to show all of Canada
      >
        {/* Place markers for each station */}
        {stations.map((station) => (
          <Marker
            key={station.id}
            position={station.position}
            title={station.name} // Display station name on hover
            onClick={() => handleMarkerClick(station)} // Handle marker click
          />
        ))}

        {/* InfoWindow for selected station */}
        {selectedStation && (
          <InfoWindow
            position={selectedStation.position}
            onCloseClick={() => setSelectedStation(null)}
          >
            <div>
              <h3 className="text-lg font-bold mb-2">{selectedStation.name}</h3>
              <button
                onClick={redirectToOverview}
                className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600"
              >
                Go to Overview
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponentWithoutRouter;
