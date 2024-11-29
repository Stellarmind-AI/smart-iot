'use client';

import React, { useEffect, useRef, useState } from 'react';
import { RadialGauge } from 'canvas-gauges';
import 'tailwindcss/tailwind.css';

const MultiGaugeDashboard: React.FC = () => {
  const [voltage, setVoltage] = useState<number>(152);
  const [rpm, setRpm] = useState<number>(200);
  const [temperature, setTemperature] = useState<number>(26.9);
  const [windSpeed, setWindSpeed] = useState<number>(4);
  const [humidity, setHumidity] = useState<number>(19.9);
  const [louverValue, setLouverValue] = useState<number>();
  // Refs for gauges
  const refs = {
    voltage: useRef<HTMLCanvasElement>(null),
    rpm: useRef<HTMLCanvasElement>(null),
    temperature: useRef<HTMLCanvasElement>(null),
    wind: useRef<HTMLCanvasElement>(null),
    humidity: useRef<HTMLCanvasElement>(null),
  };

  const gaugeInstances = useRef<Record<string, RadialGauge | null>>({
    voltage: null,
    rpm: null,
    temperature: null,
    wind: null,
    humidity: null,
  });

  const createGauge = (
    ref: React.RefObject<HTMLCanvasElement>,
    options: Partial<RadialGauge>,
    key: string,
  ) => {
    if (ref.current && !gaugeInstances.current[key]) {
      gaugeInstances.current[key] = new RadialGauge({
        renderTo: ref.current,
        width: 300,
        height: 200, // Half-circle appearance
        colorPlate: '#ffffff', // Light background for gauge plate
        borderShadowWidth: 0,
        borders: false,
        borderOuterWidth: 8,
        borderOuterColor: '#4A5568', // Border color
        colorNeedle: '#4A5568', // Needle color
        needleType: 'arrow',
        needleWidth: 3,
        needleCircleSize: 10,
        needleCircleOuter: true,
        units: ' ',
        majorTicks: [0, 50, 100, 150, 200],
        minorTicks: 5,
        strokeTicks: true,
        ticksAngle: 180, // Half circle (180 degrees)
        startAngle: 90, // Start from 90 degrees for the half-circle
        valueBox: false,
        fontValueSize: 24,
        highlights: [
          { from: 0, to: 50, color: '#F56565' }, // Red for lower range
          { from: 50, to: 100, color: '#FBBF24' }, // Yellow for middle range
          { from: 100, to: 200, color: '#48BB78' }, // Green for upper range
        ],
        ...options,
      });
      gaugeInstances.current[key]?.draw();
    }
  };

  useEffect(() => {
    // Initialize all gauges
    createGauge(
      refs.voltage,
      { value: voltage, minValue: 0, maxValue: 300, units: 'V' },
      'voltage',
    );
    createGauge(
      refs.rpm,
      { value: rpm, minValue: 0, maxValue: 200, units: 'RPM' },
      'rpm',
    );
    createGauge(
      refs.temperature,
      { value: temperature, minValue: 0, maxValue: 260, units: '°C' },
      'temperature',
    );
    createGauge(
      refs.wind,
      { value: windSpeed, minValue: 0, maxValue: 200, units: 'm/s' },
      'wind',
    );
    createGauge(
      refs.humidity,
      { value: humidity, minValue: 0, maxValue: 350, units: '%' },
      'humidity',
    );
  }, []);

  // Update gauges when values change
  useEffect(() => {
    if (gaugeInstances.current.voltage)
      gaugeInstances.current.voltage.value = voltage;
    if (gaugeInstances.current.rpm) gaugeInstances.current.rpm.value = rpm;
    if (gaugeInstances.current.temperature)
      gaugeInstances.current.temperature.value = temperature;
    if (gaugeInstances.current.wind)
      gaugeInstances.current.wind.value = windSpeed;
    if (gaugeInstances.current.humidity)
      gaugeInstances.current.humidity.value = humidity;
  }, [voltage, rpm, temperature, windSpeed, humidity]);

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
