'use client';
import React, { useState, useEffect } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '0.5rem', // Rounded corners for the map container
  overflow: 'hidden', // Ensure content doesn't overflow the rounded corners
};

// Center the map on Canada
const center = {
  lat: 45.18559887007295, // Approximate center latitude of Canada ,
  lng: -78.89327466126198, // Approximate center longitude of Canada
};

// Canadian station locations
const stations = [
  {
    id: '1',
    name: 'ECI Technology',
    position: { lat: 43.82325417438871, lng: -79.26272904261897 }, // Toronto, Ontario
    location:
      'ECI Technology Group Inc. - Electronics manufacturer, 815 Middlefield Rd #1&2, Scarborough, ON M1V 2P9, Canada',
    status: 'online',
  },
  {
    id: '2',
    name: 'GM wind Tunnel',
    position: { lat: 43.94564374051123, lng: -78.89942651911576 }, // Ottawa, Ontario
    location:
      'Automotive Centre of Excellence, Founders Dr, Oshawa, ON L1G 8C4, Canada',
    status: 'online',
  },
  // {
  //   id: '3',
  //   name: '33 Isabella Street',
  //   position: { lat: 49.282729, lng: -83.697189 }, // Vancouver, British Columbia
  //   location: 'Isabella Street',
  // },
  // {
  //   id: '4',
  //   name: 'IESO',
  //   position: { lat: 53.546124, lng: -74.697189 }, // Edmonton, Alberta
  //   location: 'Coalex Street',
  // },
  // {
  //   id: '5',
  //   name: 'IESO',
  //   position: { lat: 45.501689, lng: -86.697189 }, // Montreal, Quebec
  //   location: 'Green Park',
  // },
];

const GoogleMapComponentWithoutRouter: React.FC = () => {
  // const [isClient, setIsClient] = useState(false);
  const [selectedStation, setSelectedStation] = useState<any>(null);

  // useEffect(() => {
  //   setIsClient(true); // Ensure rendering only on the client-side
  // }, []);

  const handleMarkerClick = (station: any) => {
    setSelectedStation(station);
  };

  const redirectToOverview = () => {
    window.location.href = '/admin/overview'; // Redirect to the overview page
  };

  // if (!isClient) {
  //   return null; // Avoid rendering during SSR
  // }

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={5} // Adjusted to show all of Canada
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
              <h3 className="text-lg font-bold">{selectedStation.name}</h3>
              <p className="text-md mb-2 font-semibold">
                {selectedStation.location}
              </p>

              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">Status:</span>
                {selectedStation.status === 'online' ? (
                  <span className="h-5 w-5 rounded-full bg-green-500"></span>
                ) : (
                  <span className="h-5 w-5 rounded-full bg-red-500"></span>
                )}
                <span className="text-md font-semibold capitalize">
                  {selectedStation.status}
                </span>
              </div>

              <button
                onClick={redirectToOverview}
                className="hover:bg-bg-daketBlue rounded-lg bg-daketBlue px-3 py-2 text-white"
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
