// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  // 1. Check if the user is logged in right when the page opens
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login'); // Kick out if not logged in
      } else {
        fetchProducts(); // Load data if they are logged in
      }
    };
    checkUser();
  }, [router]);

  // 2. Fetch products from Supabase
  const fetchProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setProducts(data);
    setLoading(false);
  };

  // 3. Handle adding a new product
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await supabase.from('products').insert([
      { title, price: Number(price), description }
    ]);

    // Clear the form fields
    setTitle('');
    setPrice('');
    setDescription('');
    
    // Refresh the list
    fetchProducts();
  };

  // 4. Handle signing out
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center font-sans text-gray-500">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <main className="p-10 max-w-4xl mx-auto font-sans text-gray-900">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Company Dashboard</h1>
        <button 
          onClick={handleSignOut} 
          className="text-sm bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-gray-700 font-medium transition"
        >
          Sign Out
        </button>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg mb-10">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
          <input 
            type="text" 
            placeholder="Product Title" 
            required 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500" 
          />
          <input 
            type="number" 
            placeholder="Price ($)" 
            step="0.01" 
            required 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500" 
          />
          <textarea 
            placeholder="Product Description" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-blue-500" 
          />
          <button type="submit" className="bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition">
            Save Product
          </button>
        </form>
      </div>

      <h2 className="text-xl font-semibold mb-4">Current Inventory</h2>
      <div className="grid gap-4">
        {products.map((product) => (
          <div key={product.id} className="border border-gray-200 p-4 rounded-lg shadow-sm bg-white">
            <h3 className="font-bold text-lg">{product.title}</h3>
            <p className="text-green-600 font-semibold">${product.price}</p>
            <p className="text-gray-600 mt-2">{product.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}