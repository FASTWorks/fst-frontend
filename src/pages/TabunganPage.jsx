import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { financeApi } from '@/api/finance';

// Helper
const formatRupiah = (num) => {
  if (!num || num === 0) return '0';
  return new Intl.NumberFormat('id-ID').format(num);
};

// --- Icons ---
const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
);
const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
);
const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
);
const BagIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);
const PencilIcon = () => (
  <svg className="w-4 h-4 text-[#963F71] hover:text-[#7a325b] cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
);
const TrashIcon = () => (
  <svg className="w-4 h-4 text-red-500 hover:text-red-700 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
);
const TrendingUpIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
);
const GridIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
);
const ListIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
);

const TabunganPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [tabunganData, setTabunganData] = useState([]);
  const [totalSaldoTabungan, setTotalSaldoTabungan] = useState(0);
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [goalsRes, budgetRes] = await Promise.all([
        financeApi.listSavingGoals(),
        financeApi.getBudgetSummary()
      ]);
      setTabunganData(goalsRes.data?.data || []);
      
      const budget = budgetRes.data?.data;
      const allocTabungan = budget?.categories?.tabungan?.allocated || 0;
      const spentTabungan = budget?.categories?.tabungan?.spent || 0;
      setTotalSaldoTabungan(allocTabungan - spentTabungan);
    } catch (err) {
      console.error("Gagal mengambil data tabungan:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = async () => {
    const isConfirm = window.confirm("Apakah Anda yakin ingin keluar dari aplikasi?");
    if (isConfirm) {
      await logout();
      navigate('/login');
    }
  };

  const handleDeleteTabungan = async (id) => {
    const tabungan = tabunganData.find(t => t.id === id);
    const amountToReturn = tabungan?.currentAmount || 0;

    const isConfirm = window.confirm('Apakah Anda yakin ingin menghapus tabungan ini?');
    if (isConfirm) {
      try {
        await financeApi.deleteSavingGoal(id);
        
        if (amountToReturn > 0) {
          alert(`Berhasil dihapus! Saldo sebesar Rp ${formatRupiah(amountToReturn)} telah dikembalikan ke Kantong Tabungan Utama.`);
        } else {
          alert("Tabungan berhasil dihapus.");
        }
        
        fetchData(); // Refresh data setelah delete
      } catch (err) {
        console.error("Gagal menghapus tabungan:", err);
        alert(err.response?.data?.message || "Gagal menghapus tabungan.");
      }
    }
  };

  return (
    <div className="flex h-screen bg-[#FFFDF9] font-sans text-gray-800 overflow-hidden">
      
      {/* Overlay mobile */}
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
            {/* Hardcoded nav links for simplicity, active: Tabungan */}
            <a href="/dashboard" className="flex items-center px-4 py-3 rounded-xl transition-colors text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium">
              <span className="mr-3"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg></span>Dashboard
            </a>
            <a href="/pemasukan" className="flex items-center px-4 py-3 rounded-xl transition-colors text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium">
              <span className="mr-3"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg></span>Pemasukan
            </a>
            <a href="/upload" className="flex items-center px-4 py-3 rounded-xl transition-colors text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium">
              <span className="mr-3"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg></span>Upload
            </a>
            <a href="/pengeluaran" className="flex items-center px-4 py-3 rounded-xl transition-colors text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium">
              <span className="mr-3"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"></path></svg></span>Pengeluaran
            </a>
            <a href="/tabungan" className="flex items-center px-4 py-3 rounded-xl transition-colors bg-[#FFF8ED] text-[#963F71] font-bold border-l-4 border-[#FFAD2D]">
              <span className="mr-3"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></span>Tabungan
            </a>
            <a href="/profile" className="flex items-center px-4 py-3 rounded-xl transition-colors text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium">
              <span className="mr-3"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg></span>Profile
            </a>
          </nav>
        </div>
        <div className="space-y-4">
          <Link to="/pengeluaran" className="">
            <button className="w-full bg-[#FFAD2D] hover:bg-[#F29F25] text-white font-bold py-3 px-4 rounded-xl shadow-sm transition-colors">
              New Transaction
            </button>
          </Link>
          <button onClick={handleLogout} className="flex items-center text-gray-500 hover:text-gray-900 px-4 py-2 w-full transition-colors">
            <LogoutIcon /><span className="ml-3 font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
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
                  src={user?.profilePicture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'Felix'}`} 
                  alt="Profile Avatar" 
                  className="w-full h-full object-cover bg-gray-100"
                />
              </Link>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8 flex-1">
          <div className="max-w-6xl mx-auto flex flex-col gap-8">
            
            {/* Header Text */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Tabungan</h2>
              <p className="text-gray-600 text-sm md:text-base">
                Ayo menabung dan capai target dengan akurat
              </p>
            </div>

            {/* Banner Saldo Utama */}
            <div className="bg-linear-to-r from-[#8C3A7A] to-[#A2448F] rounded-3xl p-6 md:p-10 flex flex-col md:flex-row justify-between md:items-center shadow-md text-white gap-6">
              <div>
                <p className="text-sm font-medium opacity-90 mb-1">Kantong Tabungan Utama</p>
                <h3 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
                  Rp{formatRupiah(totalSaldoTabungan)}
                </h3>
                {/* Remove +12.5% static indicator for now */}
              </div>
              <Link to="/tabungan/buat" className="bg-[#F59E0B] hover:bg-[#d98205] text-white font-bold py-3.5 px-6 rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2 whitespace-nowrap border-2 border-transparent hover:border-white/20">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                Buat Tabungan
              </Link>
            </div>

            {/* Section Tabungan Anda */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-gray-900">Tabungan Anda</h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-md transition-colors ${
                      viewMode === 'grid' 
                        ? 'bg-gray-200 text-gray-800' 
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                  >
                    <GridIcon />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md transition-colors ${
                      viewMode === 'list' 
                        ? 'bg-gray-200 text-gray-800' 
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}>
                    <ListIcon />
                  </button>
                </div>
              </div>
              <div className={
                  viewMode === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                    : "flex flex-col gap-4"
                }>
                {isLoading ? (
                  <div className="text-center py-12 text-gray-500">Memuat tabungan...</div>
                ) : tabunganData.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-3xl border border-dashed border-gray-300">
                    Belum ada tabungan yang dibuat.
                  </div>
                ) : (
                  tabunganData.map((data) => (
                    <div 
                      key={data.id} 
                    className={`bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex ${
                      viewMode === 'list' ? 'flex-col md:flex-row md:items-center gap-6' : 'flex-col'
                    }`}>
                    {/* Card Header (Icon & Title Group) */}
                    <div className={`flex ${viewMode === 'list' ? 'w-full md:w-1/4 flex-col' : 'flex-col w-full'}`}>
                      <div className="flex justify-between items-start mb-4">
                        <div className="text-gray-900">
                          <BagIcon />
                        </div>
                        {/* Action Edit/Delete (Hanya tampil di atas jika mode Grid, jika List pindah ke kanan) */}
                          {viewMode === 'grid' && (
                            <div className="flex items-center gap-2 border border-gray-300 rounded-full px-3 py-1.5">
                              <Link to={`/tabungan/edit/${data.id}`}><PencilIcon /></Link>
                              <div className="w-px h-4 bg-gray-300"></div>
                              <button type="button" onClick={() => handleDeleteTabungan(data.id)} className="focus:outline-none">
                                <TrashIcon />
                              </button>
                            </div>
                          )}
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1" title={data.goalName}>
                          {data.goalName}
                        </h4>
                        <p className="text-xs text-gray-500 font-medium mb-2 md:mb-0">{data.daysRemaining} Days Remaining</p>
                    </div>

                    {/* Progress Area */}
                    <div className={`flex-1 ${viewMode === 'grid' ? 'mb-6' : 'w-full md:px-4'}`}>
                      <div className="mb-2 flex justify-between items-end">
                        <span className="text-xs font-bold text-gray-500">Progress</span>
                        <span className="text-sm font-bold text-gray-900">{data.progressPct}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2 md:mb-0">
                        <div 
                          className="bg-[#F59E0B] h-2.5 rounded-full" 
                          style={{ width: `${data.progressPct}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Amounts Area */}
                    <div className={`flex justify-between ${viewMode === 'list' ? 'w-full md:w-auto md:flex-col md:items-end md:gap-2' : 'items-end mb-6 w-full'}`}>
                      <div className={`flex flex-col ${viewMode === 'list' ? 'md:text-right' : ''}`}>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Saved</span>
                        <span className="text-sm font-bold text-gray-900">Rp{formatRupiah(data.currentAmount)}</span>
                      </div>
                      <div className={`flex flex-col text-right ${viewMode === 'list' ? 'md:text-right' : ''}`}>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Target</span>
                        <span className="text-xs font-bold text-gray-500">Rp{formatRupiah(data.targetAmount)}</span>
                      </div>
                    </div>

                    {/* Action Button & List Mode Actions */}
                    <div className={`flex items-center gap-3 ${viewMode === 'list' ? 'w-full md:w-auto' : 'mt-auto w-full'}`}>
                      <Link 
                        to={`/tabungan/catat/${data.id}`} 
                        className={`flex justify-center items-center bg-[#963F71] hover:bg-[#7a325b] text-white font-bold py-2.5 px-4 rounded-xl border-2 border-gray-900 shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] transition-transform active:translate-y-0.5 active:shadow-none ${viewMode === 'list' ? 'flex-1 md:flex-none whitespace-nowrap' : 'w-full mt-4'}`}
                      >
                        Catat Tabungan
                      </Link>
                      
                      {/* Action Edit/Delete (Tampil di sebelah tombol Catat jika mode List) */}
                      {viewMode === 'list' && (
                        <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-3 py-2.5 h-full">
                          <Link to={`/tabungan/edit/${data.id}`}><PencilIcon /></Link>
                          <div className="w-px h-4 bg-gray-300"></div>
                          <button type="button" onClick={() => handleDeleteTabungan(data.id)} className="focus:outline-none">
                            <TrashIcon />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )))}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default TabunganPage;