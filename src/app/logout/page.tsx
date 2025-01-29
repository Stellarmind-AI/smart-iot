'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Logout = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(true); // Controls modal visibility

  const handleConfirmLogout = () => {
    Cookies.remove('authToken');

    router.push('/login');
  };

  const handleCancelLogout = () => {
    router.push('/admin/default');
  };

  return (
    <div>
      {/* Overlay for the modal background */}
      {showModal && (
        <div className="bg-black fixed inset-0 z-40 bg-opacity-50"></div>
      )}
      {/* Modal */}
      <div className="flex h-screen items-center justify-center">
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-bold text-gray-800">
                Are you sure you want to logout?
              </h2>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleCancelLogout}
                  className="rounded-md bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmLogout}
                  className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Logout;
