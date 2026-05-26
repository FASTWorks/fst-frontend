import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom'; // Asumsi Anda menggunakan react-router-dom

// --- Mock Icons (Sesuaikan dengan import Anda) ---
const CloseIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>;
const MenuIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>;
const LogoutIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>;
const WalletIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>;
const TrendingUpIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>;
const ArrowUpRightIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7v10"></path></svg>;
const ArrowDownRightIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17L7 7M17 17V7M17 17H7"></path></svg>;
const SparklesIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>;

const DashboardPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // State untuk periode chart ('7days' atau '30days')
  const [chartPeriod, setChartPeriod] = useState('7days');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // --- Nav Links Mock ---
  const navLinks = [
    { id: 1, label: 'Dashboard', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>, active: true },
    { id: 2, label: 'Pemasukan', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>, active: false },
    { id: 3, label: 'Upload', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>, active: false },
    { id: 4, label: 'Pengeluaran', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"></path></svg>, active: false },
    { id: 5, label: 'Tabungan', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>, active: false },
    { id: 6, label: 'Profile', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>, active: false },
  ];

  // --- Transaksi Mock ---
  const transactions = [
    { id: 1, title: 'Kopi Kenangan', date: 'Hari ini', amount: 'Rp 45.000', category: 'Gaya Hidup', type: 'expense', icon: '☕' },
    { id: 2, title: 'Gaji Bulanan', date: 'Kemarin', amount: 'Rp 5.000.000', category: 'Pendapatan', type: 'income', icon: '💰' },
  ];

  // --- LOGIKA CHART DINAMIS ---
  
// --- STATE UNTUK TOOLTIP HOVER ---
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // --- MOCK DATA PENGELUARAN (DUMMY) ---
  const chartData7Days = useMemo(() => {
    const data = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      data.push({
        label: d.toLocaleDateString('id-ID', { weekday: 'short' }), // Sen, Sel, dll
        value: Math.floor(Math.random() * 300000) + 50000, // Dummy Rp 50k - 350k
      });
    }
    return data;
  }, []);

  const chartData30Days = useMemo(() => {
    const data = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      data.push({
        label: d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }), // 12 Mei
        value: Math.floor(Math.random() * 500000) + 50000, // Dummy Rp 50k - 550k
      });
    }
    return data;
  }, []);

  // --- LOGIKA PERHITUNGAN KOORDINAT LINE CHART ---
  const activeData = chartPeriod === '7days' ? chartData7Days : chartData30Days;
  const maxVal = Math.max(...activeData.map(d => d.value)); // Cari nilai tertinggi untuk skala chart

  const svgPoints = useMemo(() => {
    return activeData.map((d, index) => {
      const x = (index / (activeData.length - 1)) * 1000; // Skala lebar 0 - 1000
      // Skala tinggi 0 - 200, sisakan ruang 40px di atas agar tooltip tidak terpotong
      const y = 200 - ((d.value / maxVal) * 160); 
      return { x, y, ...d, index };
    });
  }, [activeData, maxVal]);

  const polylineString = svgPoints.map(p => `${p.x},${p.y}`).join(' ');


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
          <Link to="/pengeluaran" className="block">
            <button className="w-full bg-[#FFAD2D] hover:bg-[#F29F25] text-white font-bold py-3 px-4 rounded-xl shadow-sm transition-colors">
              New Transaction
            </button>
          </Link>
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
            <Link to="/profile" className="w-full h-full block">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Baji" 
                alt="Profile Avatar" 
                className="w-full h-full object-cover bg-gray-100"
              />
            </Link>
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
            
            {/* Spending Trend (DINAMIS BERDASARKAN STATE) */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Tren Pengeluaran</h3>
                  <p className="text-xs text-gray-500">
                    Data real-time {chartPeriod === '7days' ? '7 hari' : '1 bulan'} terakhir
                  </p>
                </div>
                <select 
                  value={chartPeriod}
                  onChange={(e) => setChartPeriod(e.target.value)}
                  className="bg-white border border-gray-200 text-gray-900 font-medium text-sm rounded-lg focus:ring-[#FFAD2D] focus:border-[#FFAD2D] block p-2 cursor-pointer"
                >
                  <option value="7days">7 days ago</option>
                  <option value="30days">1 Month ago</option>
                </select>
              </div>
              
              {/* --- LINE CHART INTERAKTIF DENGAN HOVER TOOLTIP --- */}
              <div 
                className="w-full relative h-48 pt-4 mt-2" 
                onMouseLeave={() => setHoveredPoint(null)} // Sembunyikan tooltip kalau mouse keluar area
                >
                {/* SVG Garis & Titik */}
                <svg viewBox="0 0 1000 200" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                  {/* Garis Utama */}
                  <polyline
                    fill="none"
                    stroke="#FFAD2D"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={polylineString}
                    className="transition-all duration-500"
                  />
                  
                  {/* Titik-titik (Circles) yang bisa di hover */}
                  {svgPoints.map((point) => (
                    <circle
                      key={point.index}
                      cx={point.x}
                      cy={point.y}
                      r={hoveredPoint?.index === point.index ? "8" : "5"}
                      fill={hoveredPoint?.index === point.index ? "#8C3A7A" : "#FFFFFF"}
                      stroke={hoveredPoint?.index === point.index ? "#8C3A7A" : "#FFAD2D"}
                      strokeWidth="3"
                      className="transition-all duration-200 cursor-pointer"
                      onMouseEnter={() => setHoveredPoint(point)}
                    />
                  ))}
                </svg>

                {/* Tooltip HTML (Muncul saat hoveredPoint tidak null) */}
                {hoveredPoint && (
                  <div 
                    className="absolute z-10 bg-gray-900 text-white text-xs rounded-xl shadow-lg p-2.5 pointer-events-none transform -translate-x-1/2 -translate-y-full transition-all duration-100 ease-in-out"
                    style={{
                      left: `${(hoveredPoint.x / 1000) * 100}%`,
                      top: `calc(${(hoveredPoint.y / 200) * 100}% - 12px)`
                    }}
                  >
                    <div className="text-gray-300 font-medium text-[10px] mb-1">{hoveredPoint.label}</div>
                    <div className="font-bold text-[#FFAD2D] whitespace-nowrap">
                      Rp {new Intl.NumberFormat('id-ID').format(hoveredPoint.value)}
                    </div>
                  </div>
                )}
              </div>

              {/* Label Sumbu X (Bawah Chart) */}
              <div className="flex justify-between w-full mt-3 text-xs text-gray-400 font-medium">
                {chartPeriod === '7days' ? (
                  // Tampilkan semua nama hari jika mode 7 hari
                  activeData.map((d, i) => (
                    <span key={i} className={i === 6 ? 'font-bold text-[#8C3A7A]' : ''}>
                      {d.label}
                    </span>
                  ))
                ) : (
                  // Tampilkan Awal, Tengah, Akhir saja jika mode 30 hari agar tidak sempit
                  <>
                    <span>{activeData[0].label}</span>
                    <span>{activeData[14].label}</span>
                    <span className="font-bold text-[#8C3A7A]">{activeData[29].label}</span>
                  </>
                )}
              </div>
            </div>

            {/* Financial Health Score */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
              <h3 className="text-md font-bold text-gray-900 mb-6">Skor Kesehatan Finansial</h3>
              <div className="relative w-32 h-32 mb-6">
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
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFF8ED] rounded-xl flex items-center justify-center text-[#FFAD2D] mr-3 sm:mr-4 shrink-0 text-xl">
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

        <button className="fixed md:hidden bottom-8 right-6 w-14 h-14 bg-[#FFAD2D] hover:bg-[#F29F25] text-white rounded-full shadow-lg flex items-center justify-center align-middle text-3xl font-light transition-transform hover:scale-105 z-40">
          +
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;