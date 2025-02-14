'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  FaWind,
  FaBatteryFull,
  FaPlug,
  FaThermometerHalf,
} from 'react-icons/fa';
import { MdOutlineBolt } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import mqtt from 'mqtt';

export interface PageProps {
  gearSelection?: string;
  params?: Promise<SegmentParams>;
  searchParams?: Promise<Record<string, string>>;
}

type SegmentParams<T extends Object = {}> = T extends Record<string, any>
  ? {
      [K in keyof T]: T[K] extends string
        ? string | string[] | undefined
        : never;
    }
  : T;

const Dashboard: React.FC<PageProps> = ({ gearSelection = '1' }) => {
  const [louverValue, setLouverValue] = useState(40);
  const [gearValue, setGearValue] = useState<string>(gearSelection);
  const [forceUpdate, setForceUpdate] = useState(0);
  const gears = [
    { label: '1', position: 'left-0' },
    { label: '3', position: 'left-2/4' },
    { label: '6', position: 'left-4/2' },
    { label: '18', position: 'left-6/4' },
  ];

  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertAction, setAlertAction] = useState(() => () => {});

  const [isGearAlertVisible, setIsGearAlertVisible] = useState(false);
  const [gearAlertMessage, setGearAlertMessage] = useState('');
  const [gearAlertAction, setGearAlertAction] = useState(() => () => {});

  const [mqttClient, setMqttClient] = useState(null);
  const prevLouverValue = useRef(null);
  const prevGearValue = useRef(null);

  const [stationOverviewData, setStationOverviewData] = useState([]);
  const LOCALURL = 'https://smart-iot-backend.onrender.com/api/sensors';

  useEffect(() => {
    let intervalId;
    const fetchSensorData = async () => {
      try {
        const response = await fetch(LOCALURL);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const latestData = data[0];

        const airPressure = latestData?.airPressure
          ? parseFloat(latestData.airPressure).toFixed(1)
          : 'N/A';
        const temperature = latestData?.temperature
          ? parseFloat(latestData.temperature).toFixed(1)
          : 'N/A';
        const airVelocity = latestData?.airVelocity
          ? parseFloat(latestData.airVelocity).toFixed(1)
          : 'N/A';
        const indore = latestData?.outdoorTemperature
          ? parseFloat(latestData.outdoorTemperature).toFixed(1)
          : 'N/A';
        const outdore = latestData?.indoorTemperature
          ? parseFloat(latestData.indoorTemperature).toFixed(1)
          : 'N/A';
        const transformedData = [
          {
            title: 'ECI Technology',
            metrics: [
              {
                label: 'Turbine Speed',
                value: `${latestData?.turbineSpeed || 0} rpm`,
              },
              { label: 'Gear Selection', value: gearValue },
              {
                label: 'GEN Speed',
                value: `${latestData?.genSpeed || 0} rpm`,
              },
            ],
            icon: (
              <img
                src="/img/dashboards/DAKETIconBlue.png"
                alt="Wind Turbine Icon"
                className="h-12 w-12 object-contain"
              />
            ),
          },
          {
            title: 'Real Time Power-Battery',
            metrics: [
              {
                label: 'BAT Lavel',
                value: `${latestData?.batCapacity || 0} kWh`,
              },
              {
                label: 'BAT Voltage',
                value: `${latestData?.batVoltage || 'N/A'}`,
              },
              {
                label: 'BAT Temp.',
                value: `${latestData?.batTemp || 'N/A'}`,
              },
            ],
            icon: (
              <img
                src="/img/dashboards/BatteryIconBlue.png"
                alt="Battery Icon"
                className="h-12 w-12 object-contain"
              />
            ),
          },
          {
            title: 'Real Time Power-Inverter',
            metrics: [
              {
                label: 'Power',
                value: `${latestData?.power || 0} kW`,
              },
              {
                label: 'Voltage',
                value: `${latestData?.voltage || 'N/A'}`,
              },
              {
                label: 'Current',
                value: `${latestData?.current || 0} A`,
              },
            ],
            icon: (
              <img
                src="/img/dashboards/InverterIconBlue.png"
                alt="Inverter Icon"
                className="h-12 w-12 object-contain"
              />
            ),
          },
          {
            title: 'Environment',
            metrics: [
              {
                label: 'Air Pressure',
                value: `${airPressure} atm`,
              },
              {
                label: 'Humidity',
                value: `${latestData?.humidity || 'N/A'}%`,
              },
              {
                label: 'Air Velocity',
                value: `${airVelocity}Km/hr`,
              },
              {
                label: 'Outside Temp',
                value: `${outdore}°C`,
              },
              {
                label: 'Inside Temp',
                value: `${indore}°C`,
              },
            ],
            icon: (
              <img
                src="/img/dashboards/Nature.png"
                alt="Nature Icon"
                className="h-12 w-12 object-contain"
              />
            ),
          },
        ];

        setStationOverviewData(transformedData);
      } catch (error) {
        console.error('Failed to fetch sensor data:', error);
      }
    };

    fetchSensorData();
    intervalId = setInterval(fetchSensorData, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [gearSelection, gearValue]);

  // useEffect(() => {
  //   const client = mqtt.connect(
  //     'wss://decf-2401-4900-1c5a-e1e6-ac8e-5a0b-4f37-3ac7.ngrok-free.app',
  //   );
  //   setMqttClient(client);

  //   client.on('connect', () => {
  //     console.log('Connected to MQTT Broker');
  //     // client.subscribe('enercea/louver');
  //     // client.subscribe('enercea/gears');
  //   });

  //   client.on('message', (topic, message) => {
  //     const value = message.toString();
  //     console.log(`Received message from topic: ${topic}`);
  //     console.log(`Message value: ${value}`);
  //   });

  //   return () => {
  //     if (client) {
  //       client.end();
  //     }
  //   };
  // }, []);

  // useEffect(() => {
  //   console.log('MQTT actions now handled via API');
  //   2;
  // }, []);

  // const handleLouverChange = (e) => {
  //   const newValue = e.target.value;
  //   setAlertMessage(
  //     `Are you sure you want to update the Louver Control to ${newValue}?`,
  //   );
  //   setAlertAction(() => () => {
  //     setLouverValue(newValue);

  //     // Publish only if the value has changed
  //     if (prevLouverValue.current !== newValue) {
  //       prevLouverValue.current = newValue;
  //       if (mqttClient) {
  //         mqttClient.publish('enercea/louver', newValue);
  //         console.log('new value', newValue);
  //       }
  //     }
  //   });
  //   setIsAlertVisible(true);
  // };

  // if (mqttClient) {
  //   mqttClient.publish('enercea/louver', newValue);
  // }

  const handleLouverChange = async (e) => {
    const newValue = e.target.value;
    setAlertMessage(
      `Are you sure you want to update the Louver Control to ${newValue}?`,
    );

    setAlertAction(() => async () => {
      setLouverValue(newValue);
      try {
        const response = await fetch(
          'https://smart-iot-backend.onrender.com/api/mqtt/publish/louver',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ value: Number(newValue) }),
          },
        );
        const data = await response.json();
        console.log('API Response:', data);
      } catch (error) {
        console.error('Failed to send data:', error);
      }
    });
    setIsAlertVisible(true);
  };

  const confirmAction = () => {
    alertAction();
    setIsAlertVisible(false);
  };

  const cancelAction = () => {
    setIsAlertVisible(false);
  };

  // Handle gear change and send to MQTT broker
  // const handleGearChange = (newValue, stationTitle) => {
  //   setGearAlertMessage(
  //     `Are you sure you want to update the Gear Selection to ${newValue}?`,
  //   );

  //   setGearAlertAction(() => () => {
  //     // Update the station overview data with the new Gear Selection value
  //     setStationOverviewData((prevData) =>
  //       prevData.map((station) =>
  //         station.title === stationTitle
  //           ? {
  //               ...station,
  //               metrics: station.metrics.map((metric) =>
  //                 metric.label === 'Gear Selection'
  //                   ? { ...metric, value: newValue } // Update Gear Selection value
  //                   : metric,
  //               ),
  //             }
  //           : station,
  //       ),
  //     );

  //     // Update Gear value and publish if it has changed
  //     setGearValue(newValue);

  //     // Publish only if the value has changed
  //     if (prevGearValue.current !== newValue) {
  //       prevGearValue.current = newValue;
  //       if (mqttClient) {
  //         mqttClient.publish('enercea/gears', newValue);
  //       }
  //     }
  //   });

  //   setIsGearAlertVisible(true);
  // };

  const handleGearChange = async (newValue, p0: string) => {
    console.log('New Gear Value:', newValue);
    setGearValue(newValue);
    setForceUpdate((prev) => prev + 1); // Trigger a re-render

    setGearAlertMessage(
      `Are you sure you want to update the Gear Selection to ${newValue}?`,
    );
    setGearAlertAction(() => async () => {
      try {
        const response = await fetch(
          'https://smart-iot-backend.onrender.com/api/mqtt/publish/gears',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ value: Number(newValue) }),
          },
        );
        const data = await response.json();
        console.log('API Response:', data);
        setGearValue(newValue);
      } catch (error) {
        console.error('Failed to send data:', error);
      }
    });
    setIsGearAlertVisible(true);
  };

  const confirmGearChange = () => {
    gearAlertAction();
    setIsGearAlertVisible(false);
  };

  const cancelGearChange = () => {
    setIsGearAlertVisible(false);
  };

  //----------------------------------------------------------------
  const router = useRouter();
  const navigateToDashboard = () => {
    router.push('/admin/default'); // Replace with the actual route for the add-location page
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
  return (
    <div className=" min-h-screen">
      {/* Sidebar Section */}
      {/* Main Content */}
      <main className="p-4">
        {/* Navigation Buttons */}
        <div className="mb-4 flex items-center gap-4">
          {/* Back to Dashboard Button */}
          <div className="flex items-center">
            <button
              onClick={navigateToDashboard} // Replace with your navigation logic
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
            {/* <span className="ml-4 text-lg font-bold text-gray-800">Back</span> */}
          </div>

          {/* Additional Buttons */}
          {[
            { label: 'Assets', onClick: navigateToAssets },
            { label: 'Businesses', onClick: navigateToBusinesses },
            { label: 'Administration', onClick: navigateToAdministration },
          ].map((btn, index) => (
            <button
              key={index}
              onClick={btn.onClick} // Replace with the respective navigation logic
              className="rounded-full bg-[#ECF2FF] px-6 py-2 font-bold text-[#5D90A7] shadow-sm transition-transform duration-300 hover:scale-105 hover:bg-daketBlue hover:text-white"
              title={btn.label}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Header */}
        {/* Station Overview Cards */}
        <div className="grid grid-cols-1 gap-6 pb-8 md:grid-cols-2 lg:grid-cols-4">
          {stationOverviewData.map((section, index) => (
            <div
              key={index}
              className="flex h-full flex-col justify-between rounded-lg bg-white p-5 shadow-lg"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3">
                <div className="flex items-center gap-2">
                  <div className="text-6xl text-[#156082] lg:text-6xl">
                    {section.icon}
                  </div>
                  <h2 className="text-xl font-bold text-[#156082] lg:text-xl">
                    {section.title}
                  </h2>
                </div>
              </div>
              {/* Horizontal Line
              <hr className="my-2 border-t border-gray-300" /> */}
              {/* Metrics */}
              <div className="mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex justify-between text-[18px] font-bold ${
                      section.title === 'Environment'
                        ? 'py-3' // Smaller padding for Environment box
                        : section.metrics.length === 3 && i === 3
                        ? 'hidden' // Hide the fourth row for boxes with only 3 metrics
                        : 'py-6' // Standard padding for other boxes
                    } ${section.metrics[i] ? '' : 'invisible'}`}
                  >
                    <span className="text-[#156082]">
                      {section.metrics[i]?.label || ''}
                    </span>
                    <span className="text-[#156082]">
                      {section.metrics[i]?.value || ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Architecture Diagram */}
        <div className="flex items-center justify-center rounded-xl bg-white pt-10 shadow-xl">
          {/* Combined Section */}
          <div className="w-full max-w-7xl rounded-lg  bg-white p-6">
            <div className="flex flex-wrap gap-6  lg:flex-nowrap">
              {/* Controls Section */}
              <div className="flex w-full flex-col gap-20 border-r border-gray-500 pr-6 lg:w-1/3">
                <p className="text-darkBlue font-extrabold">Controls</p>

                {/* Louver Control */}
                <div className="space-y-4">
                  <label
                    htmlFor="louver-control"
                    className="block text-sm font-semibold text-daketBlue "
                  >
                    Louver Control
                  </label>
                  <div className="relative w-full">
                    <input
                      id="louver-control"
                      type="range"
                      min="0"
                      max="100"
                      value={louverValue}
                      onChange={handleLouverChange}
                      className="absolute inset-0 h-2 w-full appearance-none rounded-full bg-gray-300
      [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full 
      [&::-moz-range-thumb]:bg-[#1A3955] [&::-webkit-slider-thumb]:h-4 
      [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full 
      [&::-webkit-slider-thumb]:bg-[#1A3955]"
                    />
                    <div
                      className="pointer-events-none absolute top-0 h-2 rounded-full bg-[#1A3955]"
                      style={{
                        width: `${louverValue}%`,
                      }}
                    ></div>
                  </div>

                  <div className="pt-7 text-center text-sm font-medium text-gray-900">
                    Current Value:
                    <span className="font-bold"> {louverValue} </span>
                  </div>
                </div>

                {/* Gear Selection */}
                <div className="space-y-4">
                  <label className="block text-sm  font-semibold text-daketBlue">
                    Gear Selection
                  </label>
                  <div className=" relative mt-6 flex h-16 w-full items-center rounded-lg border border-gray-500 bg-white px-4">
                    {/* Gear positions */}
                    {gears.map((gear, index) => (
                      <button
                        key={gear.label}
                        onClick={() =>
                          handleGearChange(gear.label, 'ECI Technology')
                        } /* Pass both value and station title */
                        className={`absolute p-2 transition-transform ${
                          gearValue === gear.label
                            ? 'scale-125 rounded-full bg-daketBlue text-white' // Active button styles
                            : 'rounded-full bg-gray-100 text-gray-900' // Inactive button styles
                        }`}
                        style={{
                          left: `calc(${index * 25}% + 2rem)`, // Add padding at the start
                          width: '2.5rem', // Ensure width is equal to height
                          height: '2.5rem', // Set height explicitly to make it a circle
                        }}
                      >
                        {gear.label}
                      </button>
                    ))}

                    {/* Shifter handle */}
                    <div
                      className="absolute top-1/2 h-10 w-4 -translate-y-1/2 transform rounded-full"
                      style={{
                        left: `calc(${
                          gears.findIndex((gear) => gear.label === gearValue) *
                          25
                        }% + 2rem)`, // Match the padding offset
                      }}
                    ></div>
                  </div>

                  <p className="mt-4 text-center text-sm text-gray-900">
                    Current Gear: <span className="font-bold">{gearValue}</span>
                  </p>
                </div>
              </div>

              {/* Station Architecture Section */}
              <div className="w-full lg:w-2/3">
                <img
                  src="/img/dashboards/Overview_Frame.png"
                  alt="Station Architecture"
                  className="h-[500px] w-full rounded-lg object-contain"
                />
              </div>
            </div>
          </div>
          {/* Alert Modal */}
          {isAlertVisible && (
            <div className="bg-black fixed inset-0 flex items-center justify-center bg-opacity-50 pt-20">
              <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <h4 className="text-lg font-bold">{alertMessage}</h4>
                <div className="mt-4 flex justify-end gap-4">
                  <button
                    onClick={cancelAction}
                    className="rounded bg-gray-200 px-4 py-2 text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmAction}
                    className="rounded bg-daketBlue px-4 py-2 text-white"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Gear Selection Alert Modal */}
          {isGearAlertVisible && (
            <div className="bg-black fixed inset-0 flex items-center justify-center bg-opacity-50">
              <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
                <h4 className="text-lg font-bold text-gray-900">
                  {gearAlertMessage}
                </h4>
                <div className="mt-4 flex justify-end gap-4">
                  <button
                    onClick={cancelGearChange}
                    className="rounded bg-gray-200 px-4 py-2 text-gray-900 hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmGearChange}
                    className="hover:bg-daketBlue-dark rounded bg-daketBlue px-4 py-2 text-white"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
export default Dashboard;
