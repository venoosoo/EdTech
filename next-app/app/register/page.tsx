'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleRegister } from "../components/auth"

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Registering', { email, password, confirmPassword });

    if (password === confirmPassword){  
      handleRegister(email, password)
      localStorage.setItem("username", email)
    } else {
      console.log('password is not same')
    }


    // Reset fields
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-center mb-4">Register</h1>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="login"
          required
          className="border p-2 rounded"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="border p-2 rounded"
        />

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          required
          className="border p-2 rounded"
        />

        <button type="submit" onClick={handleSubmit} className="bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Register
        </button>

        <div className="text-center mt-2">
          <p className="text-sm">Already have an account?</p>
          <button
            type="button"
            onClick={handleLoginRedirect}
            className="mt-1 text-sm text-blue-500 hover:underline"
          >
            Log in instead
          </button>
        </div>
      </form>
    </div>
  );
}

