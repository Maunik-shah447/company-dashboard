// app/login/page.tsx
'use client';
import { useState } from 'react';
import { supabase } from '../../utils/supabase';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
    } else {
      router.push('/'); 
      router.refresh();
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-6 font-sans text-gray-900">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md border border-gray-100">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Staff Login</h1>
        
        {errorMsg && <p className="text-red-500 text-sm mb-4 bg-red-50 p-2 rounded">{errorMsg}</p>}
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Email Address</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none" 
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition mt-2">
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}