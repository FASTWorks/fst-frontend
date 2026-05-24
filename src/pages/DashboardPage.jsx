import React, { useState } from 'react';

// --- 1. Minimal SVG Icons Components ---
const DashboardIcon = () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const WalletIcon = () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const UploadIcon = () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
const ChartIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"></path></svg>;
const PiggyBankIcon = () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const UserIcon = () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const LogoutIcon = () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const TrendingUpIcon = () => <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const ArrowUpRightIcon = () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>;
const ArrowDownRightIcon = () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>;
const FoodIcon = () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const BriefcaseIcon = () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const SparklesIcon = () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
const MenuIcon = () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>;
const CloseIcon = () => <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;

const navLinks = [
  { id: 1, label: 'Dashboard', icon: <DashboardIcon />, active: true },
  { id: 2, label: 'Pemasukan', icon: <WalletIcon />, active: false },
  { id: 3, label: 'Upload', icon: <UploadIcon />, active: false },
  { id: 4, label: 'Pengeluaran', icon: <ChartIcon />, active: false },
  { id: 5, label: 'Tabungan', icon: <PiggyBankIcon />, active: false },
  { id: 6, label: 'Profile', icon: <UserIcon />, active: false },
];

const transactions = [
  { id: 1, title: 'Gacoan Central Park', date: 'Kemarin • 19:24', amount: '- Rp 45.000', category: 'Makanan', type: 'expense', icon: <FoodIcon /> },
  { id: 2, title: 'Top Up GoPay', date: 'Kemarin • 08:15', amount: '- Rp 200.000', category: 'Top Up', type: 'expense', icon: <WalletIcon /> },
  { id: 3, title: 'Gaji PT. Maju Jaya', date: '25 Okt • 00:01', amount: '+ Rp 15.000.000', category: 'Penghasilan', type: 'income', icon: <BriefcaseIcon /> },
];

const barChartData = [
  { day: 'Sen', height: 'h-16', color: 'bg-[#DED5C6]' },
  { day: 'Sel', height: 'h-24', color: 'bg-[#DED5C6]' },
  { day: 'Rab', height: 'h-32', color: 'bg-[#963F71]' }, 
  { day: 'Kam', height: 'h-36', color: 'bg-[#FFAD2D]' }, 
  { day: 'Jum', height: 'h-24', color: 'bg-[#DED5C6]' },
  { day: 'Sab', height: 'h-12', color: 'bg-[#DED5C6]' },
  { day: 'Min', height: 'h-20', color: 'bg-[#DED5C6]' },
];

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-[#FFFDF9] font-sans overflow-hidden relative">
      
      {/* Overlay Background for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 md:hidden transition-opacity"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar Component (Responsive) */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 flex flex-col justify-between px-4 py-6 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div>
          {/* Logo Area */}
          <div className="flex flex-col items-center mb-10 relative">
            {/* Close button for mobile inside sidebar */}
            <button 
              className="md:hidden absolute -right-2 -top-2 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
              onClick={toggleSidebar}
            >
              <CloseIcon />
            </button>

            <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-2">
              <img 
                src="src/assets/logo/logo-fast-v1-bg-white.svg" 
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
                href={link.label.toLowerCase()}
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
          <button className="w-full bg-[#FFAD2D] hover:bg-[#F29F25] text-white font-bold py-3 px-4 rounded-xl shadow-sm transition-colors">
            New Transaction
          </button>
          <button className="flex items-center text-gray-500 hover:text-gray-900 px-4 py-2 w-full transition-colors">
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
            {/* Hamburger Button for Mobile */}
            <button 
              className="md:hidden p-2 -ml-2 mr-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={toggleSidebar}
            >
              <MenuIcon />
            </button>
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              Halo, Username <span className="text-xl md:text-2xl">👋</span>
            </h2>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-[#FFAD2D] overflow-hidden shrink-0">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Baji" 
              alt="Profile Avatar" 
              className="w-full h-full object-cover bg-gray-100"
            />
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto px-6 md:px-10 pb-24 md:pb-10">
          
          {/* Top Row: Financial Summaries */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            
            {/* Asset Card */}
            <div className="bg-linear-to-br from-[#E18252] to-[#8C3A7A] rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
              <div className="flex items-center mb-4 opacity-80">
                <WalletIcon />
                <span className="ml-2 font-medium">Asset</span>
              </div>
              <h3 className="text-3xl font-bold mb-6">Rp 10.000.000</h3>
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                <TrendingUpIcon />
                <span className="ml-1">+12.5% dari bulan lalu</span>
              </div>
            </div>

            {/* Income Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-500">
                  <ArrowUpRightIcon />
                </div>
                <span className="bg-green-100 text-green-600 text-xs font-bold px-3 py-1 rounded-full">Income</span>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Uang Masuk</p>
                <h3 className="text-2xl font-bold text-[#8C3A7A]">Rp 7.000.000</h3>
              </div>
            </div>

            {/* Expense Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-500">
                  <ArrowDownRightIcon />
                </div>
                <span className="bg-red-100 text-red-500 text-xs font-bold px-3 py-1 rounded-full">Tabungan</span>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Uang Keluar</p>
                <h3 className="text-2xl font-bold text-red-600 mb-3">Rp 3.000.000</h3>
                <div className="w-full bg-orange-100 rounded-full h-2">
                  <div className="bg-[#8C3A7A] h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </section>

          {/* Middle Row: Charts & Scores */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            
            {/* Spending Trend */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Tren Pengeluaran</h3>
                  <p className="text-xs text-gray-500">Data real-time 7 hari terakhir</p>
                </div>
                <select className="bg-white border border-gray-200 text-gray-600 text-sm rounded-lg focus:ring-[#FFAD2D] focus:border-[#FFAD2D] block p-2">
                  <option>7 days ago</option>
                  <option>30 days ago</option>
                </select>
              </div>
              {/* Bar Chart Mockup */}
              <div className="flex items-end justify-between h-48 pt-4">
                {barChartData.map((bar, index) => (
                  <div key={index} className="flex flex-col items-center w-full">
                    <div className={`w-8 sm:w-16 rounded-t-lg ${bar.color} ${bar.height}`}></div>
                    <span className="text-xs text-gray-500 mt-2">{bar.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Health Score */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
              <h3 className="text-md font-bold text-gray-900 mb-6">Skor Kesehatan Finansial</h3>
              <div className="relative w-32 h-32 mb-6">
                {/* SVG Donut Chart */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-gray-100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-[#FFAD2D]" strokeWidth="4" strokeDasharray="75, 100" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-[#8C3A7A]">75</span>
                  <span className="text-[10px] font-bold text-gray-500 tracking-widest">SEHAT</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed px-4">
                Bagus! Kamu berada di jalur yang benar untuk mencapai tujuan tabunganmu.
              </p>
            </div>
          </section>

          {/* Bottom Row: Transactions & AI Insights */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Recent Transactions */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Transaksi Terbaru</h3>
                <a href="#" className="text-sm font-semibold text-[#8C3A7A] hover:text-[#702e5c]">Lihat Semua</a>
              </div>
              <div className="space-y-4">
                {transactions.map((trx) => (
                  <div key={trx.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-xl transition-colors">
                    <div className="flex items-center">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFF8ED] rounded-xl flex items-center justify-center text-[#FFAD2D] mr-3 sm:mr-4 shrink-0">
                        {trx.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-gray-900">{trx.title}</h4>
                        <p className="text-xs text-gray-500">{trx.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <h4 className={`text-sm font-bold ${trx.type === 'expense' ? 'text-red-600' : 'text-[#006C7A]'}`}>
                        {trx.amount}
                      </h4>
                      <p className="text-xs text-[#006C7A]">{trx.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insight */}
            <div className="bg-[#FFFDF9] border-2 border-dashed border-[#FFAD2D] rounded-3xl p-6 relative">
              <div className="flex items-center mb-4 text-[#8C3A7A]">
                <SparklesIcon />
                <h3 className="ml-2 font-bold text-sm">Insight Jago AI</h3>
              </div>
              <p className="text-sm text-gray-800 leading-relaxed italic">
                "Infokan Pengeluaran kopi Anda meningkat <span className="text-[#FFAD2D] font-bold">20%</span> minggu ini. Pertimbangkan untuk membatasi budget 'Gaya Hidup' agar target <span className="font-semibold">Umroh</span> tetap tercapai."
              </p>
            </div>
          </section>

        </main>
        {/* Hehew */}

        <button className="fixed md:hidden bottom-8 right-6 w-14 h-14 bg-[#FFAD2D] hover:bg-[#F29F25] text-white rounded-full shadow-lg flex items-center justify-center text-3xl font-light transition-transform hover:scale-105 z-40">
          +
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;