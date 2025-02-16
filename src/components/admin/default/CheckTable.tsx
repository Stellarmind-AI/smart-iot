import React from 'react';
import CardMenu from 'components/card/CardMenu';
import Card from 'components/card';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import Link from 'next/link';

type RowObj = {
  turbine: string;
  location: string;
  Serialnumber: string;
  chargerPoint: string;
  status: 'online' | 'offline';
};

const columnHelper = createColumnHelper<RowObj>();

function CheckTable(props: { tableData: any }) {
  const { tableData } = props;
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [statusFilter, setStatusFilter] = React.useState<
    'all' | 'online' | 'offline'
  >('all');

  const staticData: RowObj[] = [
    {
      turbine: 'ECI Technology',
      location:
        'ECI Technology Group Inc. - Electronics manufacturer, 815 Middlefield Rd #1&2, Scarborough, ON M1V 2P9, Canada',
      Serialnumber: '56362323',
      chargerPoint: 'Charger 1',
      status: 'online',
    },
    {
      turbine: 'GM wind Tunnel',
      location:
        'Automotive Centre of Excellence, Founders Dr, Oshawa, ON L1G 8C4, Canada',
      Serialnumber: '42232233',
      chargerPoint: 'Charger 2',
      status: 'offline',
    },
    // {
    //   turbine: '33 Isabella Street',
    //   location: 'Isabella Street',
    //   Serialnumber: '67834043',
    //   chargerPoint: 'Charger 3',
    //   status: 'online',
    // },
    // {
    //   turbine: 'IESO',
    //   location: 'Coalex Street',
    //   Serialnumber: '34234223',
    //   chargerPoint: 'Charger 4',
    //   status: 'offline',
    // },
    // {
    //   turbine: 'IESO',
    //   location: 'Green Park',
    //   Serialnumber: '67342382',
    //   chargerPoint: 'Charger 5',
    //   status: 'online',
    // },
  ];

  const filteredData = staticData.filter((device) => {
    if (statusFilter === 'all') return true;
    return device.status === statusFilter;
  });

  const columns = [
    columnHelper.accessor('turbine', {
      id: 'turbine',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          STATION
        </p>
      ),
      cell: (info) => {
        const row = info.row.original;
        return (
          <Link
            href={{
              pathname: '/admin/overview',
              query: {
                turbine: row.turbine,
                location: row.location,
                Serialnumber: row.Serialnumber,
                status: row.status,
              },
            }}
          >
            <p className="cursor-pointer text-sm font-bold text-navy-700 hover:underline dark:text-white">
              {info.getValue()}
            </p>
          </Link>
        );
      },
    }),

    columnHelper.accessor('location', {
      id: 'location',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          LOCATION
        </p>
      ),
      cell: (info) => {
        const row = info.row.original;
        return (
          <Link
            href={{
              pathname: '/admin/overview',
              query: {
                turbine: row.turbine,
                location: row.location,
                Serialnumber: row.Serialnumber,
                status: row.status,
              },
            }}
          >
            <p className="cursor-pointer text-sm font-bold text-navy-700 hover:underline dark:text-white">
              {info.getValue()}
            </p>
          </Link>
        );
      },
      // Apply custom width and truncate only if necessary
      meta: {
        className: 'w-[350px] break-words', // Increased width for location, and break long words if needed
      },
    }),

    columnHelper.accessor('Serialnumber', {
      id: 'Serialnumber',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          SERIALNUMBER
        </p>
      ),
      cell: (info) => {
        const row = info.row.original;
        return (
          <Link
            href={{
              pathname: '/admin/overview',
              query: {
                turbine: row.turbine,
                location: row.location,
                Serialnumber: row.Serialnumber,
                status: row.status,
              },
            }}
          >
            <p className="cursor-pointer text-sm font-bold text-navy-700 hover:underline dark:text-white">
              {info.getValue()}
            </p>
          </Link>
        );
      },
      // Increase the width for Serialnumber
      meta: {
        className: 'w-[200px]', // Adjusted width for Serialnumber
      },
    }),

    columnHelper.accessor('status', {
      id: 'status',
      header: () => (
        <p className="text-sm font-bold text-gray-600 dark:text-white">
          STATUS
        </p>
      ),
      cell: (info) => {
        const row = info.row.original;
        return (
          <Link
            href={{
              pathname: '/admin/overview',
              query: {
                turbine: row.turbine,
                location: row.location,
                Serialnumber: row.Serialnumber,
                status: row.status,
              },
            }}
          >
            <div className="flex items-center text-center">
              {info.getValue() === 'online' ? (
                <button className="h-3 w-3 rounded-full bg-green-500" />
              ) : (
                <button className="h-3 w-3 rounded-full bg-green-500" />
              )}
            </div>
          </Link>
        );
      },
      // Increase the width for Status column
      meta: {
        className: 'w-[180px]', // Adjusted width for Status
      },
    }),
  ];

  const [data, setData] = React.useState(() => [...filteredData]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <Card extra={'w-full h-full sm:overflow-auto px-6'}>
      <header className="relative flex items-center justify-between pt-4">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          DAKET Stations
        </div>
        <CardMenu />
      </header>

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
                {headerGroup.headers.map((header) => (
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
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.slice(0, 5)
              .map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className={`${
                        cell.column.id === 'location'
                          ? 'min-w-[200px]'
                          : cell.column.id === 'status'
                          ? 'min-w-[120px] ps-4'
                          : 'min-w-[120px]'
                      } border-white/0 py-3 pr-4`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default CheckTable;
