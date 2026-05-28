// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  
  // Staff Management State
  const [staffEmail, setStaffEmail] = useState('');
  const [staffPassword, setStaffPassword] = useState('');
  const [staffMessage, setStaffMessage] = useState('');

  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      } else {
        fetchProducts();
      }
    };
    checkUser();
  }, [router]);

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (data) setProducts(data);
    setLoading(false);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('products').insert([{ title, price: Number(price), description }]);
    setTitle(''); setPrice(''); setDescription('');
    fetchProducts();
  };

  const handleCreateStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    setStaffMessage('Processing account creation...');

    const adminSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY || '', 
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const { error } = await adminSupabase.auth.admin.createUser({
      email: staffEmail,
      password: staffPassword,
      email_confirm: true
    });

    if (error) {
      setStaffMessage(`❌ ${error.message}`);
    } else {
      setStaffMessage('🎉 Success! Staff member created safely.');
      setStaffEmail('');
      setStaffPassword('');
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center font-sans">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-slate-500 font-medium text-sm">Opening Secure Workspace...</p>
      </div>
    );
  }

  // Calculate quick metric counts dynamically
  const totalValue = products.reduce((acc, current) => acc + (Number(current.price) || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
      
      {/* Premium Global Navigation Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-200">
              O
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 tracking-tight">OAN Industries</h1>
              <p className="text-xs text-indigo-600 font-semibold tracking-wider uppercase">Enterprise Hub</p>
            </div>
          </div>
          <button 
            onClick={handleSignOut} 
            className="text-sm bg-slate-100 hover:bg-slate-200 hover:text-red-600 px-4 py-2 rounded-xl text-slate-600 font-semibold transition-all duration-200"
          >
            Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Real-time Insights Metric Bar */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8下">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total SKUs Tracked</span>
            <span className="text-3xl font-extrabold text-slate-800">{products.length}</span>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Cumulative Value</span>
            <span className="text-3xl font-extrabold text-emerald-600">${totalValue.toFixed(2)}</span>
          </div>
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 p-6 rounded-2xl text-white shadow-lg shadow-indigo-100 flex flex-col justify-center">
            <span className="text-xs font-semibold text-indigo-100 uppercase tracking-wider opacity-80">System Security</span>
            <span className="text-xl font-bold mt-1">Method 2 Active</span>
          </div>
        </section>

        {/* Master Content Workspace Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          
          {/* Action Control Forms Left Sidebar */}
          <aside className="lg:col-span-1 flex flex-col gap-6">
            
            {/* Design Card 1: Inventory Input Management */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h2 className="text-base font-bold text-slate-800 mb-1">Log New Product</h2>
              <p className="text-xs text-slate-400 mb-4">Input data to synchronize inventory records.</p>
              
              <form onSubmit={handleAddProduct} className="flex flex-col gap-3.5">
                <input 
                  type="text" 
                  placeholder="Product Title" 
                  required 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  className="p-2.5 text-sm border border-slate-200 rounded-xl outline-none w-full bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" 
                />
                <input 
                  type="number" 
                  placeholder="Price ($)" 
                  step="0.01" 
                  required 
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)} 
                  className="p-2.5 text-sm border border-slate-200 rounded-xl outline-none w-full bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all" 
                />
                <textarea 
                  placeholder="Product Specifications/Description" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  className="p-2.5 text-sm border border-slate-200 rounded-xl outline-none w-full bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all h-24 resize-none" 
                />
                <button 
                  type="submit" 
                  className="bg-indigo-600 text-white text-sm font-bold py-2.5 rounded-xl hover:bg-indigo-700 transition-all duration-200 shadow-md shadow-indigo-100"
                >
                  Publish Asset
                </button>
              </form>
            </div>

            {/* Design Card 2: Method 2 Secure Identity Provisioning */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl text-white">
              <h2 className="text-base font-bold text-white mb-1">Staff Management</h2>
              <p className="text-xs text-slate-400 mb-4">Provision verified credentials for organizational personnel.</p>
              
              {staffMessage && (
                <p className="text-xs font-semibold mb-3 text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 p-2.5 rounded-xl">
                  {staffMessage}
                </p>
              )}
              
              <form onSubmit={handleCreateStaff} className="flex flex-col gap-3.5">
                <input 
                  type="email" 
                  placeholder="Official Email Address" 
                  required 
                  value={staffEmail} 
                  onChange={(e) => setStaffEmail(e.target.value)} 
                  className="p-2.5 text-sm border border-slate-700 rounded-xl outline-none w-full bg-slate-800/50 text-white focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-500" 
                />
                <input 
                  type="password" 
                  placeholder="Assigned Access Password" 
                  required 
                  value={staffPassword} 
                  onChange={(e) => setStaffPassword(e.target.value)} 
                  className="p-2.5 text-sm border border-slate-700 rounded-xl outline-none w-full bg-slate-800/50 text-white focus:bg-slate-800 focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-500" 
                />
                <button 
                  type="submit" 
                  className="bg-white text-slate-950 text-sm font-bold py-2.5 rounded-xl hover:bg-slate-100 transition-all duration-200"
                >
                  Deploy Access Key
                </button>
              </form>
            </div>

          </aside>

          {/* Real-time Stock Records Content Data View */}
          <main className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-slate-800">Current Corporate Assets</h2>
              <span className="text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full">
                Live Sync Active
              </span>
            </div>
            
            {products.length === 0 ? (
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center bg-white">
                <p className="text-slate-400 font-medium text-sm">No inventory recorded. Utilize the panel to your left to launch products.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {products.map((product) => (
                  <div 
                    key={product.id} 
                    className="border border-slate-100 p-5 rounded-2xl shadow-sm bg-white hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-bold text-slate-800 text-base tracking-tight group-hover:text-indigo-600 transition-colors">
                          {product.title}
                        </h3>
                        <span className="text-sm font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-100 shrink-0">
                          ${Number(product.price).toFixed(2)}
                        </span>
                      </div>
                      <p className="text-slate-500 text-xs line-clamp-3 leading-relaxed">
                        {product.description || "No supplemental details document listed for this item."}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-50 flex justify-between items-center text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                      <span>ID: #{product.id.toString().slice(0, 5)}</span>
                      <span>Verified Asset</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
          
        </div>
      </div>
    </div>
  );
}