import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { financeApi } from '@/api/finance';

// --- 1. Minimal SVG Icons Components ---
const DashboardIcon = () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const WalletIcon = () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const UploadIcon = () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
const ChartIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"></path></svg>;
const PiggyBankIcon = () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const UserIcon = () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const LogoutIcon = () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const MenuIcon = () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;
const CloseIcon = () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

// --- 2. Dummy Data (Navigation) ---
// Perhatikan id: 2 (Pemasukan) sekarang diatur active: true
const navLinks = [
  { id: 1, label: 'Dashboard', icon: <DashboardIcon />, active: false },
  { id: 2, label: 'Pemasukan', icon: <WalletIcon />, active: true },
  { id: 3, label: 'Upload', icon: <UploadIcon />, active: false },
  { id: 4, label: 'Pengeluaran', icon: <ChartIcon />, active: false },
  { id: 5, label: 'Tabungan', icon: <PiggyBankIcon />, active: false },
  { id: 6, label: 'Profile', icon: <UserIcon />, active: false },
];

// --- 3. Main Component ---
const PemasukanPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isTabunganActive, setIsTabunganActive] = useState(false); 
  const [nabungPeriod, setNabungPeriod] = useState('minggu');

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess('');
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.target);
      const parseNumber = (val) => parseInt((val || '0').toString().replace(/[^0-9]/g, '')) || 0;

      const incomeData = {
        amount: parseNumber(formData.get('nominal_pemasukan')),
        alloc_kebutuhan_primer: parseNumber(formData.get('kebutuhan_primer')),
        alloc_kebutuhan_sekunder: parseNumber(formData.get('kebutuhan_sekunder')),
        alloc_dana_darurat: parseNumber(formData.get('dana_darurat')),
        alloc_tabungan: isTabunganActive ? parseNumber(formData.get('nabung_otomatis')) : 0,
        is_saving_active: isTabunganActive,
        income_date: new Date().toISOString(),
      };

      if (isTabunganActive) {
        incomeData.new_saving_goal = {
          goal_name: formData.get('nama_tabungan') || 'Tabungan Baru',
          target_amount: parseNumber(formData.get('target_tabungan')),
          saving_frequency: nabungPeriod === 'minggu' ? 'weekly' : 'monthly',
          saving_amount: parseNumber(formData.get('nabung_otomatis')),
        };
      }

      await financeApi.createIncome(incomeData);
      setSubmitSuccess('Pemasukan berhasil disimpan!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Gagal menyimpan pemasukan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#FFFDF9] font-sans overflow-hidden relative">
      
      {/* Overlay Background for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 md:hidden transition-opacity"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar Component */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 flex flex-col justify-between px-4 py-6 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div>
          {/* Logo Area */}
          <div className="flex flex-col items-center mb-10 relative">
            <button 
              className="md:hidden absolute -right-2 -top-2 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              onClick={toggleSidebar}
            >
              <CloseIcon />
            </button>

            <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-2">
              <img 
                src="/assets/logo/logo-fast-v1-bg-white.svg" 
                alt="FAST Logo" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`/${link.label.toLowerCase()}`}
                className={`flex items-center px-4 py-3 rounded-xl transition-colors ${
                  link.active
                    ? 'bg-[#FFF8ED] text-[#963F71] font-semibold border-l-4 border-[#FFAD2D]'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <span className="mr-3">{link.icon}</span>
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer */}
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        
        {/* Header */}
        <header className="flex justify-between items-center px-6 md:px-10 py-6 bg-[#FFFDF9] sticky top-0 z-30">
          <div className="flex items-center">
            <button 
              className="md:hidden p-2 -ml-2 mr-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={toggleSidebar}
            >
              <MenuIcon />
            </button>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              Halo, {user?.name || 'User'} <span className="text-xl md:text-2xl">👋</span>
            </h2>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-[#FFAD2D] overflow-hidden shrink-0">
            <Link to="/profile" className="w-full h-full block">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Baji" 
                alt="Profile Avatar" 
                className="w-full h-full object-cover bg-gray-100"
              />
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto px-6 md:px-10 pb-24 md:pb-10">
          
          {/* Page Title Section */}
          <section className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Isi Pemasukan Anda
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              Isi form berikut untuk menginputkan penghasilan Anda agar bisa lanjut ke tahap berikutnya
            </p>
          </section>

          {/* Form Container (White Card) */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 w-full">
            
            {/* Dashed Border Box */}
            <div className="border-2 border-dashed border-[#DED5C6] rounded-2xl p-6 md:p-10 max-w-3xl mx-auto">
              
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
                Input Pemasukan
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Alerts */}
                {submitError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
                    {submitError}
                  </div>
                )}
                {submitSuccess && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-medium">
                    {submitSuccess}
                  </div>
                )}
                
                {/* Nominal Pemasukan */}
                <div>
                  <label htmlFor="nominal_pemasukan" className="block text-sm font-bold text-gray-900 mb-2">
                    Nominal Pemasukan
                  </label>
                  <input
                    type="text"
                    id="nominal_pemasukan"
                    name="nominal_pemasukan"
                    placeholder="Rp5.000.000"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFAD2D] focus:border-transparent text-gray-900 placeholder-gray-400"
                  />
                </div>

                {/* Aktifkan Tabungan Toggle */}
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Aktifkan Tabungan<span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsTabunganActive(false)}
                      className={`px-5 py-1.5 rounded-full text-sm font-bold border transition-colors ${
                        !isTabunganActive 
                          ? 'bg-[#FFAD2D] text-white border-[#FFAD2D]' 
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      No
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsTabunganActive(true)}
                      className={`px-5 py-1.5 rounded-full text-sm font-bold border transition-colors ${
                        isTabunganActive 
                          ? 'bg-[#FFAD2D] text-white border-[#FFAD2D]' 
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      Yes
                    </button>
                  </div>
                </div>

                {/* --- Grid Layout untuk Form di bawahnya --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Kebutuhan Primer */}
                  <div>
                    <label htmlFor="kebutuhan_primer" className="block text-sm font-bold text-gray-900 mb-2">
                      Kebutuhan Primer<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="kebutuhan_primer"
                      name="kebutuhan_primer"
                      placeholder="Rp3.000.000"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFAD2D] focus:border-transparent text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>

                  {/* Kebutuhan Sekunder */}
                  <div>
                    <label htmlFor="kebutuhan_sekunder" className="block text-sm font-bold text-gray-900 mb-2">
                      Kebutuhan Sekunder<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="kebutuhan_sekunder"
                      name="kebutuhan_sekunder"
                      placeholder="Rp1.000.000"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFAD2D] focus:border-transparent text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>

                  {/* Dana Darurat */}
                  <div>
                    <label htmlFor="dana_darurat" className="block text-sm font-bold text-gray-900 mb-2">
                      Dana Darurat<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="dana_darurat"
                      name="dana_darurat"
                      placeholder="Rp1.000.000"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFAD2D] focus:border-transparent text-gray-900 placeholder-gray-400"
                      required
                    />
                  </div>

                  {/* Render Field Tambahan Jika Tabungan Aktif */}
                  {isTabunganActive && (
                    <>
                      {/* Nama Tabungan */}
                      <div>
                        <label htmlFor="nama_tabungan" className="block text-sm font-bold text-gray-900 mb-2">
                          Nama Tabungan<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="nama_tabungan"
                          name="nama_tabungan"
                          placeholder="McLaren 750S"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFAD2D] focus:border-transparent text-gray-900 placeholder-gray-400"
                          required
                        />
                      </div>

                      {/* Target Tabungan */}
                      <div>
                        <label htmlFor="target_tabungan" className="block text-sm font-bold text-gray-900 mb-2">
                          Target Tabungan<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="target_tabungan"
                          name="target_tabungan"
                          placeholder="Rp13.000.000.000"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFAD2D] focus:border-transparent text-gray-900 placeholder-gray-400"
                          required
                        />
                      </div>

                      {/* Nabung Otomatis */}
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">
                          Nabung Otomatis<span className="text-red-500">**</span>
                        </label>
                        <div className="flex flex-col gap-3">
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => setNabungPeriod('minggu')}
                              className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-colors ${
                                nabungPeriod === 'minggu'
                                  ? 'bg-[#FFAD2D] text-white border-[#FFAD2D]' 
                                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              Per Minggu
                            </button>
                            
                            <button
                              type="button"
                              onClick={() => setNabungPeriod('bulan')}
                              className={`px-4 py-1.5 rounded-full text-sm font-bold border transition-colors ${
                                nabungPeriod === 'bulan'
                                  ? 'bg-[#FFAD2D] text-white border-[#FFAD2D]' // [DIPERBAIKI DI SINI]
                                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              Per Bulan
                            </button>
                          </div>
                          <input
                            type="text"
                            name="nabung_otomatis"
                            placeholder="Rp10.000.000"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFAD2D] focus:border-transparent text-gray-900 placeholder-gray-400"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors bg-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 rounded-lg bg-[#8C3A7A] hover:bg-[#702e5c] text-white font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8C3A7A] focus:ring-offset-2 transition-colors disabled:opacity-60"
                  >
                    {isSubmitting ? 'Menyimpan...' : 'Save'}
                  </button>
                </div>

                {/* Info Text */}
                <div className="pt-2 flex flex-col gap-1">
                  <p className="text-xs text-gray-700 font-medium">
                    • Wajib di isi<span className="text-red-500">*</span>
                  </p>
                  {isTabunganActive && (
                    <p className="text-xs text-gray-700 font-medium">
                      • Setiap minggu/bulan saldo Anda akan otomatis di pindah ke tabungan<span className="text-red-500">**</span>
                    </p>
                  )}
                </div>

              </form>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
};

export default PemasukanPage;