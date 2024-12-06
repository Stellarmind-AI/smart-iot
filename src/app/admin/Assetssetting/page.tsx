'use client';
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const ConnectorsTable = () => {
  const connectorsData = [
    { name: 'API Connector', description: 'Integrates with external APIs to fetch data.' },
    { name: 'Database Connector', description: 'Connects to various SQL/NoSQL databases for data management.' },
    { name: 'FTP Connector', description: 'Allows file transfers via FTP protocols.' },
    { name: 'SMTP Connector', description: 'Used for sending and receiving emails through SMTP.' },
    { name: 'WebSocket Connector', description: 'Enables real-time communication through WebSockets.' },
  ];

  // State to manage the search query
  const [searchQuery, setSearchQuery] = useState('');

  // Filtered connectors based on search query
  const filteredConnectors = connectorsData.filter((connector) => 
    connector.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    connector.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen p-6 bg-white text-black">
      <div className="w-full max-w-5xl mx-auto p-6 border rounded-md shadow-md">
        <div className="overflow-x-auto">
          {/* Header with Connectors title and search box */}
          <div className="flex flex-row justify-between items-center mb-4">
            <div className=" text-2xl font-semibold text-center text-daketBlue" >Connectors</div>

            <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="outline-none border-none bg-transparent text-sm text-gray-700"
              />
              <FaSearch className="h-5 w-5 text-gray-600 ml-2" />
            </div>
          </div>

          {/* Table */}
          <table className="w-full table-auto border-collapse text-left text-sm text-black">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 font-semibold">Name</th>
                <th className="px-4 py-2 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredConnectors.length > 0 ? (
                filteredConnectors.map((connector, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">{connector.name}</td>
                    <td className="px-4 py-2">{connector.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  {/* <td colSpan="2" className="px-4 py-2 text-center text-gray-500">
                    No results found.
                  </td> */}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ConnectorsTable;
