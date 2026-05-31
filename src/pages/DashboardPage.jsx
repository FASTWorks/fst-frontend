import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { aggregatorApi } from '@/api/aggregator';
import { analyticsApi } from '@/api/analytics';

// --- Mock Icons (Sesuaikan dengan import Anda) ---
const DownloadIcon = () => <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>;
const ChevronLeftIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>;
const ChevronRightIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>;
const CloseIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>;
const MenuIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>;
const LogoutIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>;
const WalletIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>;
const TrendingUpIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>;
const ArrowUpRightIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7v10"></path></svg>;
const ArrowDownRightIcon = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17L7 7M17 17V7M17 17H7"></path></svg>;
const SparklesIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>;

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(number || 0);
};

const formatDate = (isoString) => {
  if (!isoString) return '';
  const d = new Date(isoString);
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(/\./g, ':');
};

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chartPeriod, setChartPeriod] = useState('7days');

  // State untuk data dari API
  const [dashboardData, setDashboardData] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [aiInsight, setAiInsight] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Fetch dashboard data dari aggregator
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const { data } = await aggregatorApi.getDashboardData();
        setDashboardData(data.data);
      } catch (err) {
        console.warn('Dashboard data fetch failed, using fallback:', err.message);
      } finally {
        setIsDataLoading(false);
      }
    };

    const fetchAiInsight = async () => {
      try {
        const { data } = await analyticsApi.getInsight();
        setAiInsight(data.data?.insight);
      } catch {
        // AI insight is optional, fail silently
      }
    };

    fetchDashboardData();
    fetchAiInsight();
  }, []);

  const handleLogout = async () => {
    const isConfirm = window.confirm("Apakah Anda yakin ingin keluar dari aplikasi?");
    if (isConfirm) {
      await logout();
      navigate('/login');
    }
  };

  // --- Nav Links Mock ---
  const navLinks = [
    { id: 1, label: 'Dashboard', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>, active: true },
    { id: 2, label: 'Pemasukan', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>, active: false },
    { id: 3, label: 'Upload', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>, active: false },
    { id: 4, label: 'Pengeluaran', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"></path></svg>, active: false },
    { id: 5, label: 'Tabungan', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>, active: false },
    { id: 6, label: 'Profile', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>, active: false },
  ];

  // --- Transaksi ---
  // Menggunakan data transaksi dari backend, atau kosong jika belum ada (user baru)
  const summary = dashboardData?.dashboard || {};
  const transactions = summary?.recentTransactions || [];

  const totalAsset = summary?.asset?.total || 0;
  const totalIncome = summary?.income?.total || 0;
  const totalExpense = summary?.expense?.total || 0;
  
  const healthScore = summary?.financialHealth?.score || 0;
  const healthStatus = summary?.financialHealth?.status || 'BELUM ADA DATA';
  const healthMessage = summary?.financialHealth?.message || 'Buat budget alokasi dana agar kesehatan finansialmu dapat dihitung.';

  // Target income dinamis: Kelipatan 10 juta (minimal 10 juta) agar bar bisa bertahap penuh
  const incomeTarget = Math.max(Math.ceil(totalIncome / 10000000) * 10000000, 10000000);
  const incomePercentage = totalIncome > 0 ? (totalIncome / incomeTarget) * 100 : 1; // 1% untuk "titik"
  
  // Expense persentase berdasarkan porsi income yang sudah dihabiskan
  const expensePercentage = totalIncome > 0 
    ? Math.min((totalExpense / totalIncome) * 100, 100) 
    : (totalExpense > 0 ? 100 : 1); 

  // --- LOGIKA CHART DINAMIS ---
  // --- STATE UNTUK TOOLTIP HOVER ---
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // --- DRAG TO SCROLL LOGIC ---
  const chartScrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - chartScrollRef.current.offsetLeft);
    setScrollLeft(chartScrollRef.current.scrollLeft);
  };

  const handleMouseLeaveChart = () => {
    setIsDragging(false);
    setHoveredPoint(null);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - chartScrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // scroll speed multiplier
    chartScrollRef.current.scrollLeft = scrollLeft - walk;
  };

  // Menggunakan data cashflowTrend dari backend (akumulasi pemasukan - pengeluaran 7 hari)
  const chartData7Days = useMemo(() => {
    const rawTrend = summary?.cashflowTrend || [];
    
    // Jika data kosong, buat array 7 hari dengan value 0 sebagai empty state
    if (rawTrend.length === 0) {
      const emptyData = [];
      const days = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        emptyData.push({
          label: days[d.getDay()],
          value: 0
        });
      }
      return emptyData;
    }

    // Jika ada data, mapping ke format yang dibutuhkan chart
    return rawTrend.map(t => ({
      label: t.day,
      value: t.amount
    }));
  }, [summary?.cashflowTrend]);

  const chartData30Days = useMemo(() => {
    const rawTrend30 = summary?.cashflowTrend30Days || [];
    
    if (rawTrend30.length === 0) {
      const emptyData = [];
      for (let i = 29; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        emptyData.push({
          label: d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
          value: 0
        });
      }
      return emptyData;
    }

    return rawTrend30.map(t => ({
      label: t.day,
      value: t.amount
    }));
  }, [summary?.cashflowTrend30Days]);

  // --- LOGIKA PERHITUNGAN KOORDINAT LINE CHART ---
  const activeData = chartPeriod === '7days' ? chartData7Days : chartData30Days;
  const maxVal = Math.max(...activeData.map(d => d.value)); // Cari nilai tertinggi untuk skala chart
  const safeMaxVal = maxVal === 0 ? 1 : maxVal; // Hindari pembagian dengan 0 (NaN)

  const svgPoints = useMemo(() => {
    return activeData.map((d, index) => {
      const x = (index / (activeData.length - 1)) * 1000; // Skala lebar 0 - 1000
      // Skala tinggi 0 - 200, sisakan ruang 40px di atas agar tooltip tidak terpotong
      const y = 200 - ((d.value / safeMaxVal) * 160); 
      return { x, y, ...d, index };
    });
  }, [activeData, maxVal]);

  const polylineString = svgPoints.map(p => `${p.x},${p.y}`).join(' ');

  // --- LOGIKA FILTER & PAGINATION TRANSAKSI ---
  const [currentTrxPage, setCurrentTrxPage] = useState(1);
  const [isViewAll, setIsViewAll] = useState(false); // State baru untuk toggle Lihat Semua
  const [trxFilter, setTrxFilter] = useState('terbaru'); // State untuk filter
  const itemsPerTrxPage = 5; // Menampilkan 5 transaksi per halaman (sesuaikan selera)

  const sortedTransactions = useMemo(() => {
    let sorted = [...transactions];
    switch(trxFilter) {
      case 'terbaru':
        return sorted; 
      case 'terlama':
        return sorted.reverse();
      case 'pengeluaran_terbanyak':
        return sorted.filter(t => t.type === 'expense').sort((a, b) => b.amount - a.amount);
      case 'pemasukan_terbanyak':
        return sorted.filter(t => t.type === 'income').sort((a, b) => b.amount - a.amount);
      default:
        return sorted;
    }
  }, [transactions, trxFilter]);

  const totalTrxPages = Math.ceil(sortedTransactions.length / itemsPerTrxPage);

  // Memotong array transaksi sesuai halaman yang aktif
  const currentTransactions = isViewAll 
    ? sortedTransactions 
    : sortedTransactions.slice(
        (currentTrxPage - 1) * itemsPerTrxPage,
        currentTrxPage * itemsPerTrxPage
      );
  

  const handleDownloadCSV = () => {
    // 1. Definisikan Header Tabel
    const headers = ['No', 'Nama Transaksi', 'Tanggal', 'Nominal', 'Kategori', 'Tipe'];

    // 2. Map data ke format baris CSV (Di sini saya pakai 'transactions' agar semua data ter-download)
    // Jika ingin hanya halaman aktif, ganti dengan 'currentTransactions'
    const csvRows = transactions.map((trx, index) => {
      return [
        index + 1,
        `"${trx.title}"`, // Diberi tanda kutip ganda (") jaga-jaga jika ada koma di nama transaksi
        `"${trx.date}"`,
        `"${trx.amount}"`,
        `"${trx.category}"`,
        trx.type === 'income' ? 'Pemasukan' : 'Pengeluaran'
      ].join(','); // Gabungkan per kolom dengan koma
    });

    // 3. Gabungkan Header dan Baris Data dengan enter (\n)
    const csvString = [headers.join(','), ...csvRows].join('\n');

    // 4. Buat File (Blob) dan paksa browser untuk mendownloadnya
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    link.href = url;
    link.setAttribute('download', `Riwayat_Transaksi_FAST_${new Date().toISOString().slice(0, 10)}.csv`);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          <Link to="/pengeluaran" className="block">
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
              <h3 className="text-3xl font-bold mb-6">Rp {new Intl.NumberFormat('id-ID').format(totalAsset)}</h3>
              <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                <TrendingUpIcon />
                <span className="ml-1">{summary?.asset?.percentageChange >= 0 ? '+' : ''}{summary?.asset?.percentageChange || 0}% dari bulan lalu</span>
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
                <h3 className="text-2xl font-bold text-[#8C3A7A] mb-3">Rp {new Intl.NumberFormat('id-ID').format(totalIncome)}</h3>
                <div className="w-full bg-[#F3E8F0] rounded-full h-2">
                  <div className="bg-[#8C3A7A] h-2 rounded-full transition-all duration-1000 ease-out" style={{ width: `${incomePercentage}%` }}></div>
                </div>
              </div>
            </div>

            {/* Expense Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-500">
                  <ArrowDownRightIcon />
                </div>
                <span className="bg-red-100 text-red-500 text-xs font-bold px-3 py-1 rounded-full">Expense</span>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Uang Keluar</p>
                <h3 className="text-2xl font-bold text-red-600 mb-3">Rp {new Intl.NumberFormat('id-ID').format(totalExpense)}</h3>
                <div className="w-full bg-orange-100 rounded-full h-2">
                  <div className={`h-2 rounded-full transition-all duration-1000 ease-out ${expensePercentage > 80 ? 'bg-red-600' : 'bg-[#FFAD2D]'}`} style={{ width: `${expensePercentage}%` }}></div>
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
                  <h3 className="text-lg font-bold text-gray-900">Tren Saldo (Cashflow)</h3>
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
                ref={chartScrollRef}
                className={`w-full overflow-x-auto overflow-y-hidden pb-4 select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeaveChart}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
              >
                <div 
                  className="relative h-48 pt-4 mt-2 min-w-[800px] px-4" 
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
                <div className="flex justify-between w-full mt-3 text-xs text-gray-400 font-medium min-w-[800px] px-4">
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
                      <span>{activeData[0]?.label}</span>
                      <span>{activeData[Math.floor(activeData.length / 2)]?.label}</span>
                      <span className="font-bold text-[#8C3A7A]">{activeData[activeData.length - 1]?.label}</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Budget Allocation Bars & Financial Health Score */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
              <h3 className="text-md font-bold text-gray-900 mb-4 text-center">Status Budget Anda</h3>
              
              {/* Progress Bars */}
              <div className="space-y-4 mb-6">
                {/* Primer */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-gray-700">Kebutuhan Primer</span>
                    <span className="text-gray-500 font-medium">
                      {formatRupiah((summary?.budgetAllocation?.allocKebutuhanPrimer || 0) - (summary?.budgetAllocation?.spentKebutuhanPrimer || 0))}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500 bg-[#FFAD2D]"
                      style={{ 
                        width: `${Math.max(0, Math.min(100, (((summary?.budgetAllocation?.allocKebutuhanPrimer || 0) - (summary?.budgetAllocation?.spentKebutuhanPrimer || 0)) / (summary?.budgetAllocation?.allocKebutuhanPrimer || 1)) * 100))}%` 
                      }}
                    ></div>
                  </div>
                </div>

                {/* Sekunder */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-gray-700">Kebutuhan Sekunder</span>
                    <span className="text-gray-500 font-medium">
                      {formatRupiah((summary?.budgetAllocation?.allocKebutuhanSekunder || 0) - (summary?.budgetAllocation?.spentKebutuhanSekunder || 0))}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500 bg-[#8C3A7A]"
                      style={{ 
                        width: `${Math.max(0, Math.min(100, (((summary?.budgetAllocation?.allocKebutuhanSekunder || 0) - (summary?.budgetAllocation?.spentKebutuhanSekunder || 0)) / (summary?.budgetAllocation?.allocKebutuhanSekunder || 1)) * 100))}%` 
                      }}
                    ></div>
                  </div>
                </div>

                {/* Darurat */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-gray-700">Dana Darurat</span>
                    <span className="text-gray-500 font-medium">
                      {formatRupiah((summary?.budgetAllocation?.allocDanaDarurat || 0) - (summary?.budgetAllocation?.spentDanaDarurat || 0))}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-green-500 transition-all duration-500"
                      style={{ 
                        width: `${Math.max(0, Math.min(100, (((summary?.budgetAllocation?.allocDanaDarurat || 0) - (summary?.budgetAllocation?.spentDanaDarurat || 0)) / (summary?.budgetAllocation?.allocDanaDarurat || 1)) * 100))}%` 
                      }}
                    ></div>
                  </div>
                </div>

                {/* Tabungan */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-gray-700">Kantong Tabungan Utama</span>
                    <span className="text-gray-500 font-medium">
                      {formatRupiah((summary?.budgetAllocation?.allocTabungan || 0) - (summary?.budgetAllocation?.spentTabungan || 0))}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-blue-500 transition-all duration-500"
                      style={{ 
                        width: `${Math.max(0, Math.min(100, (((summary?.budgetAllocation?.allocTabungan || 0) - (summary?.budgetAllocation?.spentTabungan || 0)) / (summary?.budgetAllocation?.allocTabungan || 1)) * 100))}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-gray-100 mb-6"></div>

              {/* Health Score Circle */}
              <div className="flex flex-col items-center justify-center text-center">
                <h3 className="text-md font-bold text-gray-900 mb-6">Skor Kesehatan Finansial</h3>
              <div className="relative w-32 h-32 mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path className="text-gray-100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path className="text-[#FFAD2D] transition-all duration-1000 ease-out" strokeWidth="4" strokeDasharray={`${Math.max(healthScore, 0.1)}, 100`} strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-[#8C3A7A]">{healthScore}</span>
                  <span className="text-[10px] font-bold text-gray-500 tracking-widest">{healthStatus}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed px-4">
                {healthMessage}
              </p>
            </div>
            </div>
          </section>

          {/* Bottom Row: Transactions & AI Insights */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
          {/* Recent Transactions Woy Gemini bagian ini yang perlu anda Ubah*/}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 lg:col-span-2 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Transaksi Terbaru</h3>
                
                <div className="flex items-center gap-4">
                  {/* Tombol Download */}
                  <button 
                    onClick={handleDownloadCSV}
                    className="flex items-center text-xs font-bold bg-[#FFF8ED] text-[#FFAD2D] hover:bg-[#FFAD2D] hover:text-white px-3 py-1.5 rounded-lg transition-colors shadow-sm"
                  >
                    <DownloadIcon />
                    Export CSV
                  </button>

                  {/* Dropdown Filter */}
                  <select 
                    value={trxFilter}
                    onChange={(e) => {
                      setTrxFilter(e.target.value);
                      setCurrentTrxPage(1); // Reset ke halaman 1 saat ganti filter
                    }}
                    className="text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#FFAD2D]"
                  >
                    <option value="terbaru">Terbaru</option>
                    <option value="terlama">Terlama</option>
                    <option value="pengeluaran_terbanyak">Pengeluaran Terbanyak</option>
                    <option value="pemasukan_terbanyak">Pemasukan Terbanyak</option>
                  </select>

                  {/* Tombol Toggle Lihat Semua */}
                  <button 
                    onClick={() => setIsViewAll(!isViewAll)}
                    className="text-sm font-semibold text-[#8C3A7A] hover:text-[#702e5c] focus:outline-none transition-colors"
                  >
                    {isViewAll ? 'Lihat Sebagian' : 'Lihat Semua'}
                  </button>
                </div>
              </div>
              
              {/* List Transaksi */}
              {/* Jika view all aktif, beri max-height dan overflow agar bisa di-scroll internal */}
              {/* List Transaksi */}
              {transactions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center flex-1 min-h-85">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4 text-2xl">
                    💸
                  </div>
                  <p className="text-gray-500 font-medium">Belum ada transaksi</p>
                  <p className="text-xs text-gray-400 mt-1">Catat pemasukan atau pengeluaran pertamamu!</p>
                </div>
              ) : (
                <div className={`space-y-4 flex-1 ${isViewAll ? 'max-h-85 overflow-y-auto pr-2' : 'min-h-85'}`}>
                  {currentTransactions.map((trx, index) => {
                    
                    // --- LOGIKA NOMOR URUT DINAMIS ---
                    // Jika Lihat Semua aktif, cukup index + 1. 
                    // Jika tidak, hitung berdasarkan (Halaman Sebelumnya * Jumlah Item) + index lokal + 1
                    const nomorUrut = isViewAll 
                      ? index + 1 
                      : (currentTrxPage - 1) * itemsPerTrxPage + index + 1;

                    // --- LOGIKA STYLING TRANSAKSI DINAMIS ---
                    let icon, iconBg, iconColor, amountColor, sign, displayCategory;
                    
                    if (trx.type === 'income') {
                      icon = <TrendingUpIcon />;
                      iconBg = 'bg-green-100';
                      iconColor = 'text-green-600';
                      amountColor = 'text-green-600';
                      sign = '+';
                      displayCategory = trx.category || 'Pemasukan';
                    } else if (trx.type === 'expense') {
                      icon = <WalletIcon />;
                      iconBg = 'bg-red-100';
                      iconColor = 'text-red-600';
                      amountColor = 'text-red-600';
                      sign = '-';
                      displayCategory = trx.category || 'Pengeluaran';
                    } else if (trx.type === 'saving_transfer') {
                      const isDeposit = trx.amount > 0;
                      icon = <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>; // Piggy bank icon
                      iconBg = isDeposit ? 'bg-blue-100' : 'bg-orange-100';
                      iconColor = isDeposit ? 'text-blue-600' : 'text-orange-600';
                      amountColor = isDeposit ? 'text-blue-600' : 'text-orange-600';
                      sign = isDeposit ? '+' : '-';
                      displayCategory = 'Kantong Tabungan Utama';
                    } else {
                      icon = <WalletIcon />;
                      iconBg = 'bg-gray-100';
                      iconColor = 'text-gray-600';
                      amountColor = 'text-gray-900';
                      sign = '';
                      displayCategory = trx.category || 'Lainnya';
                    }

                    // Format kategori agar lebih human-readable (mengubah kebutuhan_primer menjadi Kebutuhan Primer)
                    displayCategory = displayCategory.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

                    return (
                      <div key={trx.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-xl transition-colors">
                        <div className="flex items-center">
                          
                          {/* Render Nomor Urut */}
                          <span className="text-sm font-bold text-gray-400 w-5 sm:w-7 text-left shrink-0">
                            {nomorUrut}.
                          </span>

                          <div className={`w-10 h-10 sm:w-12 sm:h-12 ${iconBg} rounded-xl flex items-center justify-center ${iconColor} mr-3 sm:mr-4 shrink-0 text-xl`}>
                            {icon}
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-gray-900">{trx.name || trx.title || 'Transaksi'}</h4>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2 mt-0.5">
                              <p className="text-xs text-gray-500">{formatDate(trx.date)}</p>
                              {trx.note && (
                                <>
                                  <span className="hidden sm:inline text-gray-300 text-xs">•</span>
                                  <p className="text-xs text-gray-600 font-medium italic truncate max-w-[150px] sm:max-w-[200px]">
                                    "{trx.note}"
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <h4 className={`text-sm font-bold ${amountColor}`}>
                            {sign}{formatRupiah(Math.abs(trx.amount))}
                          </h4>
                          <p className={`text-xs ${amountColor} opacity-80`}>{displayCategory}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* --- PAGINATION CONTROLS DI BAWAH TRANSAKSI --- */}
              {/* Hanya tampilkan navigasi halaman jika BUKAN dalam mode Lihat Semua */}
              {!isViewAll && transactions.length > 0 && (
                <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-500 font-medium hidden sm:block">
                    Menampilkan {(currentTrxPage - 1) * itemsPerTrxPage + (currentTransactions.length > 0 ? 1 : 0)} - {Math.min(currentTrxPage * itemsPerTrxPage, sortedTransactions.length)} dari {sortedTransactions.length}
                  </span>
                  
                  <div className="flex items-center gap-1 w-full sm:w-auto justify-center sm:justify-end">
                    <button 
                      onClick={() => setCurrentTrxPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentTrxPage === 1}
                      className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeftIcon />
                    </button>

                    {(() => {
                      const pages = [];
                      if (totalTrxPages <= 4) {
                        for (let i = 1; i <= totalTrxPages; i++) pages.push(i);
                      } else {
                        if (currentTrxPage <= 2) {
                          pages.push(1, 2, 3, '...', totalTrxPages);
                        } else if (currentTrxPage >= totalTrxPages - 1) {
                          pages.push(1, '...', totalTrxPages - 2, totalTrxPages - 1, totalTrxPages);
                        } else {
                          pages.push(1, '...', currentTrxPage - 1, currentTrxPage, currentTrxPage + 1, '...', totalTrxPages);
                        }
                      }
                      
                      return pages.map((page, idx) => {
                        if (page === '...') {
                          return <span key={`ellipsis-${idx}`} className="px-1 text-gray-400 text-xs font-bold">...</span>;
                        }
                        return (
                          <button 
                            key={`page-${page}`}
                            onClick={() => setCurrentTrxPage(page)}
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-bold transition-colors ${
                              currentTrxPage === page 
                                ? 'bg-[#FFAD2D] text-white shadow-sm' 
                                : 'text-gray-600 hover:bg-gray-100'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      });
                    })()}

                    <button 
                      onClick={() => setCurrentTrxPage(prev => Math.min(prev + 1, totalTrxPages))}
                      disabled={currentTrxPage === totalTrxPages}
                      className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRightIcon />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* AI Insight */}
            <div className="bg-[#FFFDF9] border-2 border-dashed border-[#FFAD2D] rounded-3xl p-6 relative">
              <div className="flex items-center mb-4 text-[#8C3A7A]">
                <SparklesIcon />
                <h3 className="ml-2 font-bold text-sm">Insight FAST AI</h3>
              </div>
              <p className="text-sm text-gray-800 leading-relaxed italic">
                {aiInsight || '"Belum ada data yang cukup. FAST AI akan menganalisis pola pemasukan dan pengeluaran Anda untuk memberikan rekomendasi yang berguna agar Anda semakin JAGO dalam mengatur keuangan!"'}
              </p>
            </div>
          </section>

        </main>

        <Link to="/pengeluaran" className="fixed md:hidden bottom-8 right-6 w-14 h-14 bg-[#FFAD2D] hover:bg-[#F29F25] text-white rounded-full shadow-lg flex items-center justify-center align-middle text-3xl font-light transition-transform hover:scale-105 z-40">
          +
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;