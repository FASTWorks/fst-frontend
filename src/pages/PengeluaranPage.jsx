import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { financeApi } from '@/api/finance';

// --- Mock Icons ---
const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
);
const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
);
const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
);
const TrashIcon = () => (
  <svg className="w-5 h-5 text-[#963F71] hover:text-red-600 transition-colors cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
);

const PengeluaranPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Data State
  const [storeName, setStoreName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState('kebutuhan_primer');
  const [items, setItems] = useState([
    { id: Date.now(), name: '', qty: 1, price: 0 },
  ]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Fungsi Logika Form
  const handleItemChange = (id, field, value) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleAddItem = () => {
    const newItem = { id: Date.now(), name: '', qty: 1, price: 0 };
    setItems([...items, newItem]);
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.qty * item.price), 0);
  };

  // Form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess('');
    setIsSubmitting(true);

    try {
      // Create a transaction for each item
      const transactionPromises = items
        .filter((item) => item.name && item.price > 0)
        .map((item) =>
          financeApi.createTransaction({
            type: 'expense',
            amount: item.qty * item.price,
            name: item.name,
            source: 'manual',
            parent_category: category,
            transaction_date: new Date(date).toISOString(),
            note: storeName ? `Dari ${storeName}` : undefined,
          })
        );

      await Promise.all(transactionPromises);
      setSubmitSuccess('Pengeluaran berhasil disimpan!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Gagal menyimpan pengeluaran.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Navigasi Sidebar (href sudah disesuaikan dengan label)
  const navLinks = [
    { id: 1, label: 'Dashboard', href: '/dashboard', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>, active: false },
    { id: 2, label: 'Pemasukan', href: '/pemasukan', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>, active: false },
    { id: 3, label: 'Upload', href: '/upload', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>, active: false },
    { id: 4, label: 'Pengeluaran', href: '/pengeluaran', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"></path></svg>, active: true },
    { id: 5, label: 'Tabungan', href: '/tabungan', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>, active: false },
    { id: 6, label: 'Profile', href: '/profile', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>, active: false },
  ];

  return (
    <div className="flex h-screen bg-[#FFFDF9] font-sans text-gray-800 overflow-hidden">
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/20 z-40 md:hidden" onClick={toggleSidebar} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 flex flex-col justify-between px-4 py-6 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div>
          <div className="flex flex-col items-center mb-10 relative">
            <button className="md:hidden absolute -right-2 -top-2 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100" onClick={toggleSidebar}>
              <CloseIcon />
            </button>
            <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-2">
              <img src="/assets/logo/logo-fast-v1-bg-white.svg" alt="FAST Logo" className="w-full h-full object-contain" />
            </div>
          </div>

          <nav className="space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`flex items-center px-4 py-3 rounded-xl transition-colors ${
                  link.active
                    ? 'bg-[#FFF8ED] text-[#963F71] font-bold border-l-4 border-[#FFAD2D]'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium'
                }`}
              >
                <span className="mr-3">{link.icon}</span>
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="space-y-4">
          <Link to="/pengeluaran" className="">
            <button className="w-full bg-[#FFAD2D] hover:bg-[#F29F25] text-white font-bold py-3 px-4 rounded-xl shadow-sm transition-colors">
              New Transaction
            </button>
          </Link>
          <button onClick={handleLogout} className="flex items-center text-gray-500 hover:text-gray-900 px-4 py-2 w-full transition-colors">
            <LogoutIcon />
            <span className="ml-3 font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        
        {/* Header */}
        <header className="bg-white px-4 md:px-8 py-4 md:py-5 flex justify-between items-center border-b border-gray-100 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <MenuIcon />
            </button>

            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              Halo, {user?.name || 'User'} <span className="text-xl md:text-2xl">👋</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-[#FFAD2D]">
              <Link to="/profile" className="w-full h-full block">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Baji" 
                  alt="Profile Avatar" 
                  className="w-full h-full object-cover bg-gray-100"
                />
              </Link>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8 flex-1">
          <div className="max-w-6xl mx-auto h-full flex flex-col">
            
            {/* Title Section */}
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Pengeluaran</h2>
              <p className="text-gray-600 text-sm md:text-base">
                Inputkan pengeluaran Anda secara manual dengan tampilan yang memuaskan
              </p>
            </div>

            {/* Main Card Container */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm flex-1 mb-8 overflow-hidden flex flex-col">
              
              <div className="px-6 md:px-10 py-6 border-b border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900">Input Pengeluaran Manual</h3>
              </div>

              {/* Form Container (Centered like a receipt/ticket) */}
              <div className="p-6 md:p-10 flex flex-col items-center flex-1 bg-white">
                
                <form className="w-full max-w-xl bg-[#FCFBFA] border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col" onSubmit={handleFormSubmit}>

                  {/* Alerts */}
                  {submitError && (
                    <div className="mx-6 mt-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
                      {submitError}
                    </div>
                  )}
                  {submitSuccess && (
                    <div className="mx-6 mt-6 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-medium">
                      {submitSuccess}
                    </div>
                  )}
                  
                  {/* Top Form Section */}
                  <div className="p-6 md:p-8">
                    {/* Store & Date Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                          Store Name
                        </label>
                        <input 
                          type="text" 
                          value={storeName}
                          onChange={(e) => setStoreName(e.target.value)}
                          placeholder="Nama toko/merchant"
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFAD2D] text-sm font-medium bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                          Date
                        </label>
                        <input 
                          type="date" 
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFAD2D] text-sm font-medium bg-white"
                        />
                      </div>
                    </div>

                    {/* Category Selector */}
                    <div className="mb-8">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                        Kategori Pengeluaran
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFAD2D] text-sm font-medium bg-white"
                      >
                        <option value="kebutuhan_primer">Kebutuhan Primer</option>
                        <option value="kebutuhan_sekunder">Kebutuhan Sekunder</option>
                        <option value="dana_darurat">Dana Darurat</option>
                        <option value="tabungan">Tabungan</option>
                      </select>
                    </div>

                    {/* Items List Section */}
                    <div className="mb-4 flex justify-between items-end">
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                        Items List
                      </label>
                      <div className="flex gap-10 pr-12 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        <span>Qty</span>
                      </div>
                      <button 
                        type="button" 
                        onClick={handleAddItem}
                        className="text-[#FFAD2D] text-xs font-bold hover:text-orange-500"
                      >
                        + ADD ITEM
                      </button>
                    </div>

                    {/* Dynamic Editable Items Array */}
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div key={item.id} className="flex gap-3 items-center">
                          <input 
                            type="text" 
                            value={item.name}
                            onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                            placeholder="Nama Item"
                            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium focus:outline-none focus:border-[#FFAD2D] focus:ring-1 focus:ring-[#FFAD2D] bg-white"
                          />
                          <input 
                            type="number" 
                            value={item.qty}
                            onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)}
                            min="1"
                            className="w-16 text-center px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium focus:outline-none focus:border-[#FFAD2D] focus:ring-1 focus:ring-[#FFAD2D] bg-white"
                          />
                          
                          {/* Price Input with Fixed "Rp" */}
                          <div className="relative w-32">
                            <span className="absolute left-3 top-2.5 text-sm font-medium text-gray-500">
                              Rp
                            </span>
                            <input 
                              type="text" 
                              value={item.price === 0 ? '' : new Intl.NumberFormat('id-ID').format(item.price)}
                              onChange={(e) => {
                                const rawValue = e.target.value.replace(/[^0-9]/g, '');
                                handleItemChange(item.id, 'price', Number(rawValue));
                              }}
                              placeholder="0"
                              className="w-full pl-8 pr-3 py-2 rounded-lg border border-gray-300 text-sm font-medium focus:outline-none focus:border-[#FFAD2D] focus:ring-1 focus:ring-[#FFAD2D] bg-white"
                            />
                          </div>

                          <button type="button" onClick={() => handleDeleteItem(item.id)} className="p-1">
                            <TrashIcon />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Total Area */}
                  <div className="p-6 md:p-8 bg-[#FCFBFA]">
                    <div className="bg-[#FFFDF4] border-2 border-[#FDE0B5] rounded-xl p-5 shadow-sm">
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-xl font-bold text-gray-900">TOTAL</span>
                        <span className="text-3xl font-bold text-[#E58C17]">
                          Rp {new Intl.NumberFormat('id-ID').format(calculateTotal())}
                        </span>
                      </div>
                      <div className="flex gap-4">
                        <button 
                          type="button"
                          onClick={() => {
                            setStoreName('');
                            setDate(new Date().toISOString().split('T')[0]);
                            setCategory('kebutuhan_primer');
                            setItems([{ id: Date.now(), name: '', qty: 1, price: 0 }]);
                            setSubmitError('');
                            setSubmitSuccess('');
                          }}
                          className="flex-1 py-3 rounded-lg border border-gray-900 text-gray-900 font-bold hover:bg-gray-50 transition-colors bg-white shadow-sm"
                        >
                          DISCARD
                        </button>
                        <button 
                          type="submit"
                          disabled={isSubmitting}
                          className="flex-1 py-3 rounded-lg bg-[#F59E0B] hover:bg-[#d98205] text-white font-bold shadow-sm transition-colors disabled:opacity-60"
                        >
                          {isSubmitting ? 'Menyimpan...' : 'SAVE RECEIPT'}
                        </button>
                      </div>
                    </div>
                  </div>

                </form>
              </div>

            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PengeluaranPage;