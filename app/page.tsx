export const revalidate = 0; 

import { supabase } from '../utils/supabase';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  // Fetch data from database
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  // Function to add new data
  async function addProduct(formData: FormData) {
    'use server' 
    const title = formData.get('title') as string;
    const price = formData.get('price');
    const description = formData.get('description') as string;

    await supabase.from('products').insert([
      { title, price: Number(price), description }
    ]);
    redirect('/'); 
  }

  return (
    <main className="p-10 max-w-4xl mx-auto font-sans">
      <h1 className="text-3xl font-bold mb-8">Company Dashboard</h1>

      <div className="bg-gray-100 p-6 rounded-lg mb-10">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <form action={addProduct} className="flex flex-col gap-4">
          <input type="text" name="title" placeholder="Product Title" required className="p-2 border border-gray-300 rounded" />
          <input type="number" name="price" placeholder="Price ($)" step="0.01" required className="p-2 border border-gray-300 rounded" />
          <textarea name="description" placeholder="Product Description" className="p-2 border border-gray-300 rounded" />
          <button type="submit" className="bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700">
            Save Product
          </button>
        </form>
      </div>

      <h2 className="text-xl font-semibold mb-4">Current Inventory</h2>
      <div className="grid gap-4">
        {products?.map((product) => (
          <div key={product.id} className="border border-gray-200 p-4 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg">{product.title}</h3>
            <p className="text-green-600 font-semibold">${product.price}</p>
            <p className="text-gray-600 mt-2">{product.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}