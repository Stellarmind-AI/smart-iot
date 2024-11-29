'use client';
import React, { useState, useEffect } from 'react';
import Card from 'components/card'; // Assuming Card is a reusable component like in your CheckTable
import { FaUser, FaEnvelope, FaUserTag, FaPlus } from 'react-icons/fa'; // Icons for user, email, user type, and add button

type UserData = {
  username: string;
  email: string;
  usertype: 'Admin' | 'Technician' | 'Support' | 'Sales';
  permission: string;
};

const StaticContentTable: React.FC = () => {
  const initialUserData: UserData[] = [
    {
      username: 'Dipak ',
      email: 'dipak@gmail.com',
      usertype: 'Admin',
      permission: 'All',
    },
    {
      username: 'Mahendra',
      email: 'mahendra@gmail.com',
      usertype: 'Support',
      permission: 'Analytics',
    },
    {
      username: 'Smeet',
      email: 'smeet@gmail.com',
      usertype: 'Technician',
      permission: 'Technical',
    },
    {
      username: 'Astha',
      email: 'astha@gmail.com',
      usertype: 'Admin',
      permission: 'All',
    },
    {
      username: 'Aesha',
      email: 'Aesha@gmail.com',
      usertype: 'Support',
      permission: 'Analytics',
    },
    {
      username: 'Milan',
      email: 'milan@gmail.com',
      usertype: 'Sales',
      permission: 'Sales',
    },
    {
      username: 'Shubh',
      email: 'shubh@gmail.com',
      usertype: 'Support',
      permission: 'Analytics',
    },
  ];

  const [userData, setUserData] = useState<UserData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState<UserData>({
    username: '',
    email: '',
    usertype: 'Admin',
    permission: 'All',
  });

  useEffect(() => {
    setUserData(initialUserData);
  }, []);

  const handleRoleChange = (
    index: number,
    newRole: 'Admin' | 'Technician' | 'Support' | 'Sales',
  ) => {
    const updatedData = [...userData];
    updatedData[index].usertype = newRole;
    updatedData[index].permission = getPermission(newRole);
    setUserData(updatedData);
  };

  const getPermission = (
    role: 'Admin' | 'Technician' | 'Support' | 'Sales',
  ) => {
    switch (role) {
      case 'Admin':
        return 'All';
      case 'Support':
        return 'Analytics';
      case 'Technician':
        return 'Technical';
      case 'Sales':
        return 'Sales';
      default:
        return '';
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = () => {
    setUserData((prevData) => [...prevData, newUser]);
    setIsModalOpen(false);
  };

  return (
    <Card extra="w-full h-full sm:overflow-auto px-6">
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-900 dark:text-white">
          User Table
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute right-4 top-4 flex items-center gap-2 rounded-lg bg-cyan-800 px-4 py-2 text-white"
        >
          <FaPlus /> Add User
        </button>
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-black px-4 py-2 text-left text-lg font-bold">
                Username
              </th>
              <th className="text-black px-4 py-2 text-left text-lg font-bold">
                Email
              </th>
              <th className="text-black px-4 py-2 text-left text-lg font-bold">
                Permission
              </th>
              <th className="text-black px-4 py-2 text-left text-lg font-bold">
                User Role
              </th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border-b px-4 py-2 text-sm text-gray-900">
                  <FaUser className="mr-2 inline-block" />
                  {user.username}
                </td>
                <td className="border-b px-4 py-2 text-sm text-gray-900">
                  <FaEnvelope className="mr-2 inline-block" />
                  {user.email}
                </td>
                <td className="border-b px-4 py-2 text-sm text-gray-900">
                  {user.permission}
                </td>
                <td className="border-b px-4 py-2 text-sm text-gray-900">
                  <div className="flex items-center">
                    <FaUserTag className="mr-2 inline-block" />
                    <select
                      value={user.usertype}
                      onChange={(e) =>
                        handleRoleChange(
                          index,
                          e.target.value as
                            | 'Admin'
                            | 'Technician'
                            | 'Support'
                            | 'Sales',
                        )
                      }
                      className="rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-900 focus:outline-none"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Technician">Technician</option>
                      <option value="Support">Support</option>
                      <option value="Sales">Sales</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-300 bg-opacity-50">
          <div className="w-96 rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Add New User</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={newUser.username}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={newUser.email}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  name="usertype"
                  value={newUser.usertype}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="Admin">Admin</option>
                  <option value="Technician">Technician</option>
                  <option value="Support">Support</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-md bg-gray-300 px-4 py-2 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddUser}
                  className="rounded-md bg-blue-500 px-4 py-2 text-sm text-white"
                >
                  Add User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Card>
  );
};

export default StaticContentTable;
