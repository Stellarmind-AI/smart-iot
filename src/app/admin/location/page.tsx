'use client';

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

// Define types for the form and report data
type LocationFormInputs = {
  name: string;
  address: string;
  city: string;
  state: string;
  stations: number;
  connectors: number;
  access: string;
  paymentType: string;
  siteRating: number;
  maxPowerSupply: number;
  reservable: boolean;
  locationName: string;
  timezone: string;
  latitude: number;
  longitude: number;
  country: string;
  address1: string;
  address2: string;
  zipcode: number;
  businessOwner: string;
  contactEmail: string;
  countryCode: string;
  contactNumber: string;
  caNumber: number;
};

type ReportData = {
  location: string;
  address: string;
  city: string;
  stateProvince: string;
  stations: number;
  connectors: number;
  access: string;
  paymentType: string;
  siteRating: number;
  maxPowerSupply: string;
  reservable: boolean;
};

const LocationReportingPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LocationFormInputs>();

  // States for filters, data, and search functionality
  const [filters, setFilters] = useState({
    location: '',
    address: '',
    city: '',
    stateProvince: '',
    stations: '',
    connectors: '',
    access: '',
    paymentType: '',
    siteRating: '',
    maxPowerSupply: '',
    reservable: '',
  });

  const [reportData, setReportData] = useState<ReportData[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Mock static data
  const mockData: ReportData[] = [
    {
      location: 'Central Park',
      address: '123 Park Ave',
      city: 'New York',
      stateProvince: 'NY',
      stations: 5,
      connectors: 10,
      access: 'Public',
      paymentType: 'Credit Card',
      siteRating: 4.5,
      maxPowerSupply: '100 KWH',
      reservable: true,
    },
    {
      location: 'Golden Gate',
      address: '456 Bridge Blvd',
      city: 'San Francisco',
      stateProvince: 'CA',
      stations: 8,
      connectors: 15,
      access: 'Private',
      paymentType: 'Cash',
      siteRating: 4.8,
      maxPowerSupply: '120 KWH',
      reservable: false,
    },
    {
      location: 'Lincoln Park',
      address: '789 Park Lane',
      city: 'Chicago',
      stateProvince: 'IL',
      stations: 6,
      connectors: 12,
      access: 'Public',
      paymentType: 'Credit Card',
      siteRating: 4.2,
      maxPowerSupply: '90 KWH',
      reservable: true,
    },
    {
      location: 'Space Needle',
      address: '100 Needle St',
      city: 'Seattle',
      stateProvince: 'WA',
      stations: 4,
      connectors: 8,
      access: 'Public',
      paymentType: 'Mobile App',
      siteRating: 4.7,
      maxPowerSupply: '110 KWH',
      reservable: true,
    },
    {
      location: 'Times Square',
      address: '200 Broadway Ave',
      city: 'New York',
      stateProvince: 'NY',
      stations: 10,
      connectors: 20,
      access: 'Private',
      paymentType: 'Credit Card',
      siteRating: 4.9,
      maxPowerSupply: '150 KWH',
      reservable: false,
    },
    {
      location: 'Hollywood Boulevard',
      address: '300 Sunset Blvd',
      city: 'Los Angeles',
      stateProvince: 'CA',
      stations: 7,
      connectors: 14,
      access: 'Public',
      paymentType: 'Mobile App',
      siteRating: 4.6,
      maxPowerSupply: '130 KWH',
      reservable: true,
    },
  ];

  // Handle form submission
  const onSubmit: SubmitHandler<LocationFormInputs> = (data: any) => {
    setFormSubmitted(true);
    setShowForm(false);

    setTimeout(() => {
      setFormSubmitted(false); // Hide notification after 4 seconds
    }, 4000);

    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 500);

    console.log('Location Submitted:', data);
  };

  const handleReset = () => {
    setShowForm(true);
    setFormSubmitted(false);
  };

  // Handle filter change
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Apply filters
  const applyFilters = () => {
    const filteredData = mockData.filter((item) => {
      const matchesLocation = filters.location
        ? item.location.toLowerCase().includes(filters.location.toLowerCase())
        : true;
      const matchesAddress = filters.address
        ? item.address.toLowerCase().includes(filters.address.toLowerCase())
        : true;
      const matchesCity = filters.city
        ? item.city.toLowerCase() === filters.city.toLowerCase()
        : true;
      const matchesStateProvince = filters.stateProvince
        ? item.stateProvince.toLowerCase() ===
          filters.stateProvince.toLowerCase()
        : true;
      const matchesStations = filters.stations
        ? item.stations.toString() === filters.stations
        : true;
      const matchesConnectors = filters.connectors
        ? item.connectors.toString() === filters.connectors
        : true;
      const matchesAccess = filters.access
        ? item.access.toLowerCase() === filters.access.toLowerCase()
        : true;
      const matchesPaymentType = filters.paymentType
        ? item.paymentType.toLowerCase() === filters.paymentType.toLowerCase()
        : true;
      const matchesSiteRating = filters.siteRating
        ? item.siteRating.toString() === filters.siteRating
        : true;
      const matchesMaxPowerSupply = filters.maxPowerSupply
        ? item.maxPowerSupply.toString() === filters.maxPowerSupply
        : true;
      const matchesReservable =
        filters.reservable !== ''
          ? item.reservable === (filters.reservable === 'true')
          : true;

      return (
        matchesLocation &&
        matchesAddress &&
        matchesCity &&
        matchesStateProvince &&
        matchesStations &&
        matchesConnectors &&
        matchesAccess &&
        matchesPaymentType &&
        matchesSiteRating &&
        matchesMaxPowerSupply &&
        matchesReservable
      );
    });

    setReportData(filteredData);
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      location: '',
      address: '',
      city: '',
      stateProvince: '',
      stations: '',
      connectors: '',
      access: '',
      paymentType: '',
      siteRating: '',
      maxPowerSupply: '',
      reservable: '',
    });
    setReportData(mockData); // Reset to full data
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Location Form & Reporting
        </h1>
      </div>

      {/* Add New Location Button */}
      <div className="mb-4 text-right">
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-daketBlue px-6 py-2 text-white hover:scale-105 hover:bg-daketBlue"
        >
          {showForm ? 'Close Form' : 'Add New Location'}
        </button>
      </div>

      {/* Filters Section */}
      <div className="mb-6 rounded-lg bg-white p-6 shadow-2xl">
        <h2 className="mb-4 text-lg font-bold text-gray-800">Filters</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Location
            </label>
            <select
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            >
              <option value="">All Locations</option>
              <option value="Central Park">Central Park</option>
              <option value="Golden Gate">Golden Gate</option>
              <option value="Central Park">Central Park</option>
              <option value="Lincoln Park">Lincoln Park</option>
              <option value="Space Needle">Space Needle</option>
              <option value="Times Square">Times Square</option>
              <option value="Hollywood Boulevard">Hollywood Boulevard</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">
              All States/Province
            </label>
            <select
              name="stateProvince"
              value={filters.stateProvince}
              onChange={handleFilterChange}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            >
              <option value="">States/Province</option>
              <option value="NY">NY</option>
              <option value="CA">CA</option>
              <option value="IL">IL</option>
              <option value="WA">WA</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">
              All Cities
            </label>
            <select
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            >
              <option value="">All Cities</option>
              <option value="Toronto">New York</option>
              <option value="Montreal">San Francisco</option>
              <option value="Toronto">Chicago</option>
              <option value="Montreal">Seattle</option>
              <option value="Ottawa">Los Angeles</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Payment Types
            </label>
            <select
              name="paymentType"
              value={filters.paymentType}
              onChange={handleFilterChange}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            >
              <option value="">All Payment Types</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Cash">Cash</option>
              <option value="Mobile App">Mobile App</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Reservable
            </label>
            <select
              name="reservable"
              value={filters.reservable}
              onChange={handleFilterChange}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            >
              <option value="">All</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900">
              Access
            </label>
            <select
              name="access"
              value={filters.access}
              onChange={handleFilterChange}
              className="w-full rounded-lg border border-gray-300 p-2 text-sm"
            >
              <option value="">All Access Types</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={resetFilters}
            className="rounded-lg bg-gray-300 px-6 py-2 text-sm text-gray-700 hover:scale-105 hover:bg-gray-400"
          >
            Reset Filters
          </button>
          <button
            onClick={applyFilters}
            className="rounded-lg bg-daketBlue px-6 py-2 text-sm text-white hover:scale-105 hover:bg-daketBlue"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Updated Data Results */}
      <div className="mt-6">
        <h2 className="mb-4 text-lg font-bold text-gray-800">Reports</h2>
        <div className="overflow-x-auto rounded-lg shadow-2xl">
          <table className="min-w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gray-500">
                <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                  <div className="flex items-center">Location</div>
                </th>
                <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                  <div className="flex items-center">Address</div>
                </th>
                <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                  City
                </th>
                <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                  State/Province
                </th>
                <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                  Stations
                </th>
                <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                  Connectors
                </th>
                <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                  Access
                </th>
                <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                  Payment Type
                </th>
                <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                  Site Rating
                </th>
                <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                  Max Power Supply (KWH)
                </th>
                <th className="border-b px-6 py-3 text-left text-sm font-medium text-gray-900">
                  Reservable
                </th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                >
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {item.location}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {item.address}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {item.city}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {item.stateProvince}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {item.stations}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {item.connectors}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {item.access}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {item.paymentType}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {item.siteRating}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {item.maxPowerSupply}
                  </td>
                  <td className="border-b px-6 py-4 text-sm text-gray-800">
                    {item.reservable ? 'Yes' : 'No'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Success Message */}
        {formSubmitted && (
          <div className="fixed bottom-5 right-5 rounded-lg bg-green-500 p-4 text-white shadow-lg">
            <p>Location added successfully!</p>
          </div>
        )}

        {/* Form for Adding New Location */}
        {showForm && (
          <div className="rounded-lg bg-white p-6 shadow-2xl">
            <h2 className="mb-4 text-lg font-bold text-gray-800">
              Add New Location
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Location Name*
                </label>
                <input
                  {...register('locationName', {
                    required: 'Location name is required',
                  })}
                  className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                  type="text"
                />
                {errors.locationName && (
                  <p className="text-sm text-red-600">
                    {errors.locationName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  TimeZone*
                </label>
                <select
                  {...register('timezone', {
                    required: 'TimeZone is required',
                  })}
                  className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                >
                  <option value="GMT">GMT</option>
                  <option value="PST">IST</option>
                  <option value="EST">EST</option>
                  <option value="PST">PST</option>
                </select>
                {errors.timezone && (
                  <p className="text-sm text-red-600">
                    {errors.timezone.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Latitude*
                </label>
                <input
                  {...register('latitude', {
                    required: 'Latitude is required',
                  })}
                  className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                  type="text"
                />
                {errors.latitude && (
                  <p className="text-sm text-red-600">
                    {errors.latitude.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Longitude*
                </label>
                <input
                  {...register('longitude', {
                    required: 'Longitude is required',
                  })}
                  className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                  type="text"
                />
                {errors.longitude && (
                  <p className="text-sm text-red-600">
                    {errors.longitude.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Country*
                </label>
                <select
                  {...register('country', { required: 'Country is required' })}
                  className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                >
                  <option value="USA">USA</option>
                  <option value="Canada">CANADA</option>
                  <option value="UK">UK</option>
                  <option value="INDIA">INDIA</option>
                  <option value="CHINA">CHINA</option>
                </select>
                {errors.country && (
                  <p className="text-sm text-red-600">
                    {errors.country.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  State/Province*
                </label>
                <input
                  {...register('state', {
                    required: 'State/Province is required',
                  })}
                  className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                  type="text"
                />
                {errors.state && (
                  <p className="text-sm text-red-600">{errors.state.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  City*
                </label>
                <select
                  {...register('city', { required: 'City is required' })}
                  className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                >
                  <option value="New York">New York</option>
                  <option value="Los Angeles">Los Angeles</option>
                  <option value="Chicago">Chicago</option>
                  <option value="Houston">Houston</option>
                  <option value="San Francisco">San Francisco</option>
                  <option value="Toronto">Toronto</option>
                  <option value="Vancouver">Vancouver</option>
                  <option value="Montreal">Montreal</option>
                  <option value="Calgary">Calgary</option>
                  <option value="Ottawa">Ottawa</option>
                  <option value="London">London</option>
                  <option value="Manchester">Manchester</option>
                  <option value="Birmingham">Birmingham</option>
                  <option value="Glasgow">Glasgow</option>
                  <option value="Edinburgh">Edinburgh</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Ahemdabad">Ahemdabad</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Beijing">Beijing</option>
                  <option value="Shanghai">Shanghai</option>
                  <option value="Shenzhen">Shenzhen</option>
                  <option value="Guangzhou">Guangzhou</option>
                  <option value="Chengdu">Chengdu</option>
                </select>
                {errors.city && (
                  <p className="text-sm text-red-600">{errors.city.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Address Line 1*
                </label>
                <input
                  {...register('address1', {
                    required: 'Address Line 1 is required',
                  })}
                  className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                  type="text"
                />
                {errors.address1 && (
                  <p className="text-sm text-red-600">
                    {errors.address1.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Address Line 2
                </label>
                <input
                  {...register('address2')}
                  className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                  type="text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Zip/Postal Code*
                </label>
                <input
                  {...register('zipcode', {
                    required: 'Zip/Postal code is required',
                  })}
                  className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                  type="text"
                />
                {errors.zipcode && (
                  <p className="text-sm text-red-600">
                    {errors.zipcode.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Business Owner
                </label>
                <input
                  {...register('businessOwner')}
                  className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                  type="text"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Contact Email*
                </label>
                <input
                  {...register('contactEmail', {
                    required: 'Contact email is required',
                  })}
                  className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                  type="email"
                />
                {errors.contactEmail && (
                  <p className="text-sm text-red-600">
                    {errors.contactEmail.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Contact Number*
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    {...register('countryCode', {
                      required: 'Country code is required',
                    })}
                    className="w-20 rounded-lg border border-gray-300 p-2 text-sm"
                    placeholder="+1"
                    type="text"
                  />
                  <input
                    {...register('contactNumber', {
                      required: 'Contact number is required',
                    })}
                    className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                    type="text"
                  />
                </div>
                {errors.contactNumber && (
                  <p className="text-sm text-red-600">
                    {errors.contactNumber.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Payment Type*
                </label>
                <select
                  {...register('paymentType', {
                    required: 'Payment type is required',
                  })}
                  className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                >
                  <option value="Cash">Cash</option>
                  <option value="Credit">Credit</option>
                </select>
                {errors.paymentType && (
                  <p className="text-sm text-red-600">
                    {errors.paymentType.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  CA Number (Optional)
                </label>
                <input
                  {...register('caNumber')}
                  className="w-full rounded-lg border border-gray-300 p-2 text-sm"
                  type="text"
                />
              </div>

              {/* Reservable Toggle */}
              <div className="flex items-center">
                <label className="mr-2 text-sm font-medium text-gray-900">
                  Reservable
                </label>
                <input
                  type="checkbox"
                  {...register('reservable')}
                  className="h-5 w-5"
                />
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full rounded-lg bg-daketBlue py-2 text-white"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reset Button */}
        <div className="mt-4">
          <button
            onClick={handleReset}
            className="w-full rounded-lg bg-gray-500 py-2 text-white"
          >
            Reset Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationReportingPage;
