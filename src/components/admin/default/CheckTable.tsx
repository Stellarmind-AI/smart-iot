import React from 'react';
import CardMenu from 'components/card/CardMenu';
import Checkbox from 'components/checkbox';
import Card from 'components/card';
import { FaCircle, FaCircleNotch } from 'react-icons/fa'; // Import icons for online/offline status

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import Link from 'next/link'; // Import Link from Next.js

type RowObj = {
  turbine: string; // Change deviceName to turbine
  location: string;
  Serialnumber: string;
  chargerPoint: string;
  status: 'online' | 'offline';
};

function CheckTable(props: { tableData: any }) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [statusFilter, setStatusFilter] = React.useState<
    'all' | 'online' | 'offline'
  >('all');

  // Static data for devices (10 entries), change deviceName to turbine
  const staticData: RowObj[] = [
    {
      turbine: 'IESO',
      location: 'Sault Site',
      Serialnumber: '56362323',
      chargerPoint: 'Charger 1',
      status: 'online',
    },
    {
      turbine: 'Collectdev LP',
      location: 'Toronto Street',
      Serialnumber: '42232233',
      chargerPoint: 'Charger 2',
      status: 'offline',
    },
    {
      turbine: '33 Isabella Street',
      location: 'Isabella Street',
      Serialnumber: '67834043',
      chargerPoint: 'Charger 3',
      status: 'online',
    },
    {
      turbine: 'IESO',
      location: 'Coalex Street',
      Serialnumber: '34234223',
      chargerPoint: 'Charger 4',
      status: 'offline',
    },
    {
      turbine: 'IESO',
      location: 'Green Park',
      Serialnumber: '67342382',
      chargerPoint: 'Charger 5',
      status: 'online',
    },
  ];

  const filteredData = staticData.filter((device) => {
    if (statusFilter === 'all') return true;
    return device.status === statusFilter;
  });

  const columns = [
    columnHelper.accessor('turbine', {
      // Change deviceName to turbine
      id: 'turbine',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          TURBINE
        </p> // Change header to TURBINE
      ),
      cell: (info) => (
        <Link href={`/admin/voltage?name=${info.getValue()}`}>
          <p className="cursor-pointer text-sm font-bold text-navy-700 dark:text-white">
            {info.getValue()}
          </p>
        </Link>
      ),
    }),
    columnHelper.accessor('location', {
      id: 'location',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          LOCATION
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor('Serialnumber', {
      id: 'Serialnumber',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          SERIALNUMBER
        </p>
      ),
      cell: (info) => (
        <p className="text-sm font-bold text-navy-700 dark:text-white">
          {info.getValue()}
        </p>
      ),
    }),

    columnHelper.accessor('status', {
      id: 'status',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          STATUS
        </p>
      ),
      cell: (info) => (
        <div className="flex items-center text-center">
          {info.getValue() === 'online' ? (
            <button className="h-3 w-3 rounded-full bg-green-500" />
          ) : (
            <button className="h-3 w-3 rounded-full bg-red-500" />
          )}
        </div>
      ),
    }),
  ];

  const [data, setData] = React.useState(() => [...filteredData]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <Card extra={'w-full h-full sm:overflow-auto px-6'}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          Turbine Table {/* Change table name to Turbine Table */}
        </div>
        <CardMenu />
      </header>

      {/* Filter Buttons centered with no background and gray border */}
      <div className="mt-4 flex justify-center space-x-4">
        <button
          className="rounded-md border border-gray-400 px-6 py-2 text-gray-600 hover:bg-gray-100"
          onClick={() => setStatusFilter('all')}
        >
          All
        </button>
        <button
          className="rounded-md border border-gray-400 px-6 py-2 text-green-600 hover:bg-gray-100"
          onClick={() => setStatusFilter('online')}
        >
          Online
        </button>
        <button
          className="rounded-md border border-gray-400 px-6 py-2 text-red-600 hover:bg-gray-100"
          onClick={() => setStatusFilter('offline')}
        >
          Offline
        </button>
      </div>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="!border-px !border-gray-400">
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      onClick={header.column.getToggleSortingHandler()}
                      className="cursor-pointer border-b-[1px] border-gray-200 pb-2 pr-4 pt-4 text-start"
                    >
                      <div className="items-center justify-between text-xs text-gray-200">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.slice(0, 5)
              .map((row) => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="min-w-[150px] border-white/0 py-3 pr-4"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default CheckTable;

const columnHelper = createColumnHelper<RowObj>();
