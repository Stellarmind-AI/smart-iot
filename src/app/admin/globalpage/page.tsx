'use client';
import React, { useState } from 'react';

const GlobalSettings = () => {
  const [activeTab, setActiveTab] = useState<'tariff' | 'reservation'>('tariff');
  const [tariffData, setTariffData] = useState([
    { id: 1, time: '9:00 AM - 6:00 PM', current: true },
    { id: 2, time: '6:00 PM - 9:00 PM', current: false },
  ]);
  const [reservationData, setReservationData] = useState({
    minTime: '',
    maxTime: '',
    paymentType: '',
    reservationCount: '',
  });

  const [editTariffId, setEditTariffId] = useState<number | null>(null);

  // Form Data for editing
  const [editTariffTime, setEditTariffTime] = useState('');

  const handleTabChange = (tab: 'tariff' | 'reservation') => {
    setActiveTab(tab);
  };

  const handleTariffEdit = (id: number, time: string) => {
    setEditTariffId(id);
    setEditTariffTime(time);
  };

  const handleTariffSave = () => {
    setTariffData((prev) =>
      prev.map((item) =>
        item.id === editTariffId ? { ...item, time: editTariffTime } : item
      )
    );
    setEditTariffId(null);
  };

  const handleReservationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReservationData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen p-6 font-sans bg-white text-black">
      <h1 className="text-4xl font-semibold mb-6" style={{ color: '#505759' }}>
        Global Settings
      </h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => handleTabChange('tariff')}
          className={`rounded-md px-6 py-2 text-sm ${
            activeTab === 'tariff'
              ? 'bg-[#156082] text-white'
              : 'bg-gray-200 text-black'
          }`}
        >
          Tariff Settings
        </button>
        <button
          onClick={() => handleTabChange('reservation')}
          className={`rounded-md px-6 py-2 text-sm ${
            activeTab === 'reservation'
              ? 'bg-[#156082] text-white'
              : 'bg-gray-200 text-black'
          }`}
        >
          Reservation Settings
        </button>
      </div>

      {/* Tariff Settings Section */}
      {activeTab === 'tariff' && (
        <div className="p-4 border rounded-md">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#363636' }}>
            Tariff Settings
          </h2>
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 font-semibold">ID</th>
                <th className="px-4 py-2 font-semibold">Current Time</th>
                <th className="px-4 py-2 font-semibold">Status</th>
                <th className="px-4 py-2 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tariffData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">
                    {editTariffId === item.id ? (
                      <input
                        type="text"
                        value={editTariffTime}
                        onChange={(e) => setEditTariffTime(e.target.value)}
                        className="rounded-md border p-1"
                      />
                    ) : (
                      item.time
                    )}
                  </td>
                  <td className="px-4 py-2">{item.current ? 'Current' : 'Inactive'}</td>
                  <td className="px-4 py-2">
                    {editTariffId === item.id ? (
                      <>
                        <button
                          onClick={handleTariffSave}
                          className="mr-2 rounded-md bg-[#156082] px-3 py-1 text-white"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditTariffId(null)}
                          className="rounded-md bg-gray-200 px-3 py-1 text-black"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleTariffEdit(item.id, item.time)}
                        className="rounded-md bg-[#156082] px-3 py-1 text-white"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Reservation Settings Section */}
      {activeTab === 'reservation' && (
        <div className="p-4 border rounded-md">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: '#363636' }}>
            Reservation Settings
          </h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black">
                Minimum Time
              </label>
              <input
                type="text"
                name="minTime"
                value={reservationData.minTime}
                onChange={handleReservationChange}
                className="mt-1 block w-full rounded-md border p-2 shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black">
                Maximum Time
              </label>
              <input
                type="text"
                name="maxTime"
                value={reservationData.maxTime}
                onChange={handleReservationChange}
                className="mt-1 block w-full rounded-md border p-2 shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black">
                Payment Type
              </label>
              <input
                type="text"
                name="paymentType"
                value={reservationData.paymentType}
                onChange={handleReservationChange}
                className="mt-1 block w-full rounded-md border p-2 shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-black">
                Reservation Count
              </label>
              <input
                type="number"
                name="reservationCount"
                value={reservationData.reservationCount}
                onChange={handleReservationChange}
                className="mt-1 block w-full rounded-md border p-2 shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="rounded-md px-6 py-2 border border-[#156082] bg-[#156082] text-white"
            >
              Save Changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default GlobalSettings;
