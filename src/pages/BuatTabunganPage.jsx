import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { financeApi } from '@/api/finance';

// --- Mock Icons (Sesuaikan dengan project Anda) ---
const CloseIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>;
const LogoutIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>;
const MenuIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>;

const BuatTabunganPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [namaTabungan, setNamaTabungan] = useState('');
  const [targetTabungan, setTargetTabungan] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!namaTabungan || targetTabungan <= 0) {
      setError('Mohon lengkapi nama dan target tabungan.');
      return;
    }
    
    if (targetTabungan > 1000000000) {
      setError('Target tabungan maksimal adalah Rp1.000.000.000 (1 Miliar).');
      return;
    }

    setError('');
    setSuccess('');
    setIsSubmitting(true);

    try {
      await financeApi.createSavingGoal({
        goal_name: namaTabungan,
        target_amount: targetTabungan
      });
      setSuccess('Tabungan berhasil dibuat!');
      setTimeout(() => navigate('/tabungan'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal membuat tabungan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Data Navigasi Sidebar (Label format lowercase untuk href)
  const navLinks = [
    { id: 1, label: 'Dashboard', href: '/dashboard', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>, active: false },
    { id: 2, label: 'Pemasukan', href: '/pemasukan', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>, active: false },
    { id: 3, label: 'Upload', href: '/upload', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>, active: false },
    { id: 4, label: 'Pengeluaran', href: '/pengeluaran', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"></path></svg>, active: false },
    { id: 5, label: 'Tabungan', href: '/tabungan', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>, active: true },
    { id: 6, label: 'Profile', href: '/profile', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>, active: false },
  ];

  return (
    <div className="flex h-screen bg-[#FFFDF9] font-sans text-gray-800 overflow-hidden">
      
      {/* Overlay Mobile */}
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
                <span className="mr-3">{link.icon}</span>{link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="space-y-4">
          <button className="w-full bg-[#FFAD2D] hover:bg-[#F29F25] text-white font-bold py-3 px-4 rounded-xl shadow-sm transition-colors">
            New Transaction
          </button>
          <button onClick={handleLogout} className="flex items-center text-gray-500 hover:text-gray-900 px-4 py-2 w-full transition-colors">
            <LogoutIcon /><span className="ml-3 font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        
        {/* Header */}
        <header className="bg-white px-4 md:px-8 py-4 md:py-5 flex justify-between items-center border-b border-gray-100 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <MenuIcon />
            </button>
            <h2 className="text-xl font-bold text-gray-800 hidden md:block">Halo, {user?.name || 'User'} <span className="text-xl md:text-2xl">👋</span></h2>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold md:hidden">FAST</h1>
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-[#FFAD2D]">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User Avatar" className="w-full h-full object-cover bg-gray-200" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-8 flex-1">
          <div className="max-w-4xl mx-auto flex flex-col h-full">
            
            {/* Title Section */}
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Tabungan</h2>
              <p className="text-gray-500 text-sm md:text-base">
                Isi form berikut untuk membuat tabungan baru
              </p>
            </div>

            {/* Dashed Form Container */}
            <div className="flex-1 border-2 border-dashed border-gray-300 rounded-3xl p-6 md:p-12 flex flex-col items-center">
              
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Buat Tabungan</h3>

              <form className="w-full max-w-xl" onSubmit={handleSubmit}>

                {/* Alerts */}
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-medium">
                    {success}
                  </div>
                )}
                
                {/* Nama Tabungan */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Nama Tabungan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Tabungan Pernikahan"
                    value={namaTabungan}
                    onChange={(e) => {
                      if (e.target.value.length <= 38) {
                        setNamaTabungan(e.target.value);
                      }
                    }}
                    maxLength={38}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFAD2D] font-medium text-gray-700"
                  />
                  <div className="flex justify-end mt-1">
                    <span className={`text-xs font-medium ${namaTabungan.length === 38 ? 'text-orange-500' : 'text-gray-400'}`}>
                      {namaTabungan.length}/38 karakter
                    </span>
                  </div>
                </div>

                {/* Target Tabungan (Dengan Prefix "Rp" Statis) */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Target Tabungan <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-gray-500 font-medium pointer-events-none">
                      Rp
                    </span>
                    <input
                      type="text"
                      placeholder="100.000.000"
                      value={targetTabungan === 0 ? '' : new Intl.NumberFormat('id-ID').format(targetTabungan)}
                      onChange={(e) => {
                        let rawValue = e.target.value.replace(/[^0-9]/g, '');
                        let num = Number(rawValue);
                        if (num > 1000000000) num = 1000000000;
                        setTargetTabungan(num);
                      }}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFAD2D] font-medium text-gray-700"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2 font-medium">
                    Maksimal target tabungan: Rp1.000.000.000 (1 Miliar).
                  </p>
                </div>

                {/* Footnotes */}
                <div className="mb-8 space-y-1">
                  <p className="text-xs text-gray-700 font-medium">
                    <span className="text-red-500">*</span> Wajib diisi
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3">
                  <Link
                    to="/tabungan"
                    className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-2.5 rounded-xl bg-[#963F71] hover:bg-[#7a325b] text-white font-bold border-2 border-gray-900 shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] transition-transform active:translate-y-0.5 active:shadow-none disabled:opacity-60"
                  >
                    {isSubmitting ? 'Menyimpan...' : 'Save'}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BuatTabunganPage;