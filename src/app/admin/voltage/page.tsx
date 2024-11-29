'use client';
import React, { useRef, useState } from 'react';
import 'tailwindcss/tailwind.css';

const MultiGaugeDashboard: React.FC = () => {
  const [voltage, setVoltage] = useState<number>(152);
  const [rpm, setRpm] = useState<number>(200);
  const [temperature, setTemperature] = useState<number>(26.9);
  const [windSpeed, setWindSpeed] = useState<number>(4);
  const [humidity, setHumidity] = useState<number>(19.9);
  const [louverValue, setLouverValue] = useState<number>(50); // Set an initial value

  // Refs for gauges
  const refs = {
    voltage: useRef<HTMLCanvasElement>(null),
    rpm: useRef<HTMLCanvasElement>(null),
    temperature: useRef<HTMLCanvasElement>(null),
    wind: useRef<HTMLCanvasElement>(null),
    humidity: useRef<HTMLCanvasElement>(null),
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
        Multi-Gauge Dashboard
      </h1>

      {/* Monitor-A Section */}
      <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Monitor-A</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center">
            <h3 className="mb-2 text-gray-900">Voltage</h3>
            <canvas ref={refs.voltage}></canvas>
            <p className="mt-2 text-lg font-bold text-gray-900">{voltage} V</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="mb-2 text-gray-900">RPM</h3>
            <canvas ref={refs.rpm}></canvas>
            <p className="mt-2 text-lg font-bold text-gray-900">{rpm} RPM</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="mb-2 text-gray-900">Temperature</h3>
            <canvas ref={refs.temperature}></canvas>
            <p className="mt-2 text-lg font-bold text-gray-900">
              {temperature} °C
            </p>
          </div>
        </div>
      </div>

      {/* Monitor-B Section */}
      <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Monitor-B</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
          <div className="flex flex-col items-center">
            <h3 className="mb-2 text-gray-900">Wind Speed</h3>
            <canvas ref={refs.wind}></canvas>
            <p className="mt-2 text-lg font-bold text-gray-900">
              {windSpeed} m/s
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="mb-2 text-gray-900">Humidity</h3>
            <canvas ref={refs.humidity}></canvas>
            <p className="mt-2 text-lg font-bold text-gray-900">{humidity} %</p>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold text-gray-800">Controls</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="text-center">
            <h3 className="mb-2 text-gray-900">Louver Control</h3>
            {/* Display the current value dynamically */}
            <p className="mb-2 text-lg font-bold text-gray-700">
              {louverValue}
            </p>
            <input
              type="range"
              min="0"
              max="100"
              value={louverValue} // Bind the value to state
              onChange={(e) => setLouverValue(Number(e.target.value))} // Update state on change
              className="w-full"
            />
          </div>
          <div className="text-center">
            <h3 className="mb-2 text-gray-900">Gear Selection</h3>
            <select className="w-full rounded border border-gray-300 p-2">
              <option value="3:18">3:18</option>
              <option value="4:20">4:20</option>
              <option value="5:22">5:22</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiGaugeDashboard;
