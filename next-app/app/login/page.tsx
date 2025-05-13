'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { handleLogin} from '../components/auth.ts'

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const  handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Logging in', { email, password });
    let result: boolean | null = null
    result = await handleLogin(email, password)
    if ( result ) {
      router.push('/dashboard')
      localStorage.setItem("username", email)
    }
    // Reset fields
    setEmail('');
    setPassword('');
  };

  const handleForgotPasswordRedirect = () => {
    router.push('/forgot-password');
  };

  const handleRegisterRedirect = () => {
    router.push('/register');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
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

        <div className="text-right">
          <button
            type="button"
            onClick={handleForgotPasswordRedirect}
            className="text-sm text-blue-500 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <button type="submit" onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Log In
        </button>

        <div className="text-center mt-2">
          <p className="text-sm">Don't have an account?</p>
          <button
            type="button"
            onClick={handleRegisterRedirect}
            className="mt-1 text-sm text-sky-500 hover:underline"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

