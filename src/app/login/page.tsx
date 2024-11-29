'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Image from 'next/image';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true); // Start loading

    // Dummy authentication logic
    if (email === 'admin@example.com' && password === 'password') {
      Cookies.set('authToken', 'dummyToken', { expires: 1 }); // Save token in a cookie
      router.push('/admin/default'); // Redirect to dashboard
    } else {
      setError('Invalid email or password.');
      setIsLoading(false); // Stop loading on error
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-white to-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-6 flex justify-center">
          {/* Company Logo */}
          <Image
            src="/img/layout/Enercea_logo.png"
            alt="Company Logo"
            className="h-25 w-25 object-contain"
            width={400}
            height={400}
          />
        </div>
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800">
          Welcome Back
        </h2>
        <p className="mb-6 text-center text-gray-600">
          Login to access your dashboard
        </p>

        {error && (
          <p className="mb-4 text-center text-sm text-red-500">{error}</p>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 p-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full rounded-md py-2 font-semibold text-white ${
              isLoading
                ? 'cursor-not-allowed bg-gray-400'
                : 'bg-cyan-800 hover:bg-cyan-900'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          <a
            href="/login"
            className="font-semibold text-cyan-800 hover:underline"
          >
            Forgot Password?
          </a>
        </p>

        {/* <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <a href="#" className="font-semibold text-cyan-800 hover:underline">
            Contact Admin
          </a>
        </p> */}
      </div>
    </div>
  );
};

export default Login;
