import React from 'react';

// --- DATA DUMMY ---
const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z', active: true },
  { id: 'transactions', label: 'Transactions', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
  { id: 'budgeting', label: 'Budgeting', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
  { id: 'analytics', label: 'Analytics', icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z' },
  { id: 'goals', label: 'Goals', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
];

const transactions = [
  { id: 1, title: 'Gacoan Central Park', date: 'Kemarin • 19:24', amount: '- Rp 45.000', type: 'expense', category: 'Makanan', iconColor: 'text-amber-500', bgColor: 'bg-amber-50' },
  { id: 2, title: 'Top Up GoPay', date: 'Kemarin • 08:15', amount: '- Rp 200.000', type: 'expense', category: 'Top Up', iconColor: 'text-purple-600', bgColor: 'bg-purple-50' },
  { id: 3, title: 'Gaji PT. Maju Jaya', date: '25 Okt • 00:01', amount: '+ Rp 15.000.000', type: 'income', category: 'Penghasilan', iconColor: 'text-teal-600', bgColor: 'bg-teal-50' },
];

// --- KOMPONEN KECIL (Helper Components) ---
const Icon = ({ path, className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
  </svg>
);

// --- KOMPONEN UTAMA ---
const DashboardPage = () => {
  return (
    <div className="flex min-h-screen bg-[#fdfaf6] font-sans text-gray-800">
      
      {/* SIDEBAR (Semantik: aside) */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col justify-between sticky top-0 h-screen">
        <div>
          <div className="p-8">
            <h2 className="text-2xl font-bold text-amber-500">FASTWorks</h2>
          </div>
          
          <nav aria-label="Main Navigation">
            <ul className="space-y-1 px-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${item.active ? 'bg-amber-50 text-purple-900 font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
                    <Icon path={item.icon} className={item.active ? 'text-purple-600 w-5 h-5' : 'w-5 h-5'} />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="p-6 space-y-4">
          <button className="w-full bg-[#ffb320] hover:bg-amber-500 text-gray-900 font-semibold py-3 rounded-xl transition-colors shadow-sm">
            New Transaction
          </button>
          
          <nav aria-label="Secondary Navigation">
            <ul className="space-y-1">
              <li>
                <a href="#help" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  <Icon path="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  Help Center
                </a>
              </li>
              <li>
                <a href="#logout" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-500 hover:text-gray-900 transition-colors">
                  <Icon path="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  Logout
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      {/* AREA KONTEN UTAMA */}
      <div className="flex-1 flex flex-col">
        
        {/* HEADER (Semantik: header) */}
        <header className="flex justify-between items-center px-8 py-5 bg-[#fdfaf6]">
          {/* H1 digunakan untuk judul halaman demi SEO */}
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            Halo, Username <span role="img" aria-label="wave">👋</span>
          </h1>
          
          <div className="flex items-center gap-5">
            <button aria-label="Notifications" className="text-gray-400 hover:text-gray-600 relative">
              <Icon path="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button aria-label="Settings" className="text-gray-400 hover:text-gray-600">
              <Icon path="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            </button>
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80" alt="Profile" className="w-9 h-9 rounded-full object-cover ring-2 ring-amber-100" />
          </div>
        </header>

        {/* KONTEN (Semantik: main) */}
        <main className="p-8 pt-2 flex-1 space-y-6">
          
          {/* Top Metrics Row */}
          <section aria-label="Financial Metrics" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Total Saldo */}
            <article className="bg-linear-to-br from-amber-400 via-orange-400 to-purple-600 rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
              <h3 className="text-sm font-medium opacity-90 mb-2">Total Saldo</h3>
              <p className="text-3xl font-bold mb-4">Rp 42.500.000</p>
              <div className="inline-flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                <Icon path="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" className="w-3 h-3" />
                +12.5% dari bulan lalu
              </div>
            </article>

            {/* Card 2: Pengeluaran */}
            <article className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                  <Icon path="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </div>
                <span className="bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full">-5% Target</span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Pengeluaran Bulan Ini</h3>
                <p className="text-2xl font-bold text-purple-800">Rp 8.240.000</p>
              </div>
            </article>

            {/* Card 3: Sisa Anggaran */}
            <article className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                  <Icon path="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </div>
                <span className="bg-cyan-100 text-cyan-700 text-xs font-bold px-3 py-1 rounded-full">Aman</span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Sisa Anggaran</h3>
                <p className="text-2xl font-bold text-gray-900 mb-3">Rp 3.760.000</p>
                {/* Progress Bar */}
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-linear-to-r from-amber-400 to-purple-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
              </div>
            </article>
          </section>

          {/* Middle Charts Row */}
          <section aria-label="Analytics" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Tren Pengeluaran */}
            <article className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Tren Pengeluaran</h2>
                  <p className="text-xs text-gray-500">Data real-time 7 hari terakhir</p>
                </div>
                <button className="border border-gray-200 text-gray-600 text-xs px-3 py-1.5 rounded-lg flex items-center gap-2 hover:bg-gray-50">
                  Minggu Ini
                  <Icon path="M19 9l-7 7-7-7" className="w-3 h-3" />
                </button>
              </div>
              {/* Chart Placeholder Area */}
              <div className="flex-1 flex flex-col justify-end mt-4">
                 <div className="flex justify-between text-xs text-gray-400 px-2 border-t border-dashed border-gray-200 pt-4 mt-auto">
                   <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>
                 </div>
              </div>
            </article>

            {/* Skor Kesehatan */}
            <article className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-center flex flex-col items-center justify-center">
              <h2 className="text-sm font-bold text-gray-900 mb-6">Skor Kesehatan Finansial</h2>
              
              {/* Radial Progress Placeholder */}
              <div className="relative w-32 h-32 flex items-center justify-center mb-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f3f4f6" strokeWidth="10" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f59e0b" strokeWidth="10" strokeDasharray="251" strokeDashoffset="62" strokeLinecap="round" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-bold text-purple-800 leading-none">75</span>
                  <span className="text-[10px] font-bold text-gray-400 mt-1">SEHAT</span>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 leading-relaxed px-4">
                Bagus! Kamu berada di jalur yang benar untuk mencapai tujuan tabunganmu.
              </p>
            </article>
          </section>

          {/* Bottom Row */}
          <section aria-label="Transactions and Insights" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Transaksi Terbaru */}
            <article className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900">Transaksi Terbaru</h2>
                <a href="#all" className="text-purple-600 text-sm font-semibold hover:text-purple-800">Lihat Semua</a>
              </div>
              
              <ul className="space-y-4">
                {transactions.map((trx) => (
                  <li key={trx.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${trx.bgColor} ${trx.iconColor}`}>
                        {/* Simple icon logic based on category */}
                        {trx.category === 'Makanan' && <Icon path="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5" />}
                        {trx.category === 'Top Up' && <Icon path="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2" />}
                        {trx.category === 'Penghasilan' && <Icon path="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm">{trx.title}</h3>
                        <p className="text-xs text-gray-500">{trx.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold text-sm ${trx.type === 'expense' ? 'text-red-600' : 'text-teal-600'}`}>
                        {trx.amount}
                      </p>
                      <p className="text-xs text-cyan-700 font-medium">{trx.category}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>

            {/* Insight AI */}
            <article className="bg-amber-50/30 rounded-3xl p-6 border-2 border-dashed border-amber-300 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <Icon path="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" className="w-5 h-5 text-purple-600" />
                <h2 className="text-sm font-bold text-purple-900">Insight Jago AI</h2>
              </div>
              <p className="text-sm text-gray-700 italic leading-relaxed mb-4">
                "Pengeluaran kopi Anda meningkat <span className="text-amber-600 font-bold">20%</span> minggu ini. Pertimbangkan untuk membatasi budget 'Gaya Hidup' agar target Umroh tetap tercapai."
              </p>
              <a href="#insight" className="text-purple-600 text-xs font-semibold hover:underline flex items-center gap-1">
                Lihat Rincian Analisis <Icon path="M17 8l4 4m0 0l-4 4m4-4H3" className="w-3 h-3" />
              </a>
            </article>

          </section>
        </main>
        
        {/* Floating Action Button (Optional, meniru tanda + di kanan bawah gambar) */}
        <button aria-label="Add" className="fixed bottom-8 right-8 bg-[#ffb320] text-gray-900 w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-amber-500 hover:scale-105 transition-all">
           <Icon path="M12 4v16m8-8H4" className="w-6 h-6" />
        </button>

      </div>
    </div>
  );
};

export default DashboardPage;