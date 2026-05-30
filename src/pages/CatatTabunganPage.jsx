import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { financeApi } from '@/api/finance';

// Helper
const formatRupiah = (num) => {
  if (!num || num === 0) return '0';
  return new Intl.NumberFormat('id-ID').format(num);
};
const parseRupiah = (str) => {
  if (!str) return 0;
  return Number(str.replace(/[^0-9]/g, ''));
};

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
const PlusIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>;
const MinusIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4"></path></svg>;
const NumberIcon = () => <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect width="16" height="16" x="4" y="4" rx="2" strokeWidth="2"></rect><path strokeWidth="2" d="M8 10h2v4m2-4h2v4m2-4h2v4"></path></svg>; // Icon 123
const TextIcon = () => <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7"></path></svg>; // Icon lines

const CatatTabunganPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // State untuk form
  const [jenisTransaksi, setJenisTransaksi] = useState('tambah'); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [nominal, setNominal] = useState(0);
  const [keterangan, setKeterangan] = useState('');

  const [savingGoal, setSavingGoal] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  useEffect(() => {
    // Fetch detail tabungan untuk header dan validasi saldo (khusus tarik dana)
    const fetchGoal = async () => {
      try {
        const res = await financeApi.listSavingGoals();
        const goals = res.data?.data || [];
        const goal = goals.find(g => g.id === id);
        if (goal) {
          setSavingGoal(goal);
        } else {
          setSubmitError("Tabungan tidak ditemukan");
        }
      } catch (err) {
        console.error("Gagal memuat detail tabungan:", err);
      }
    };
    if (id) fetchGoal();
  }, [id]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleNominalChange = (e) => {
    const val = parseRupiah(e.target.value);
    setNominal(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess('');
    
    if (nominal <= 0) {
      setSubmitError('Nominal harus lebih dari 0.');
      return;
    }
    if (!keterangan.trim()) {
      setSubmitError('Keterangan wajib diisi.');
      return;
    }
    
    // Jika tarik dana, pastikan saldo cukup
    if (jenisTransaksi === 'kurang' && savingGoal && nominal > savingGoal.currentAmount) {
      setSubmitError(`Saldo tabungan tidak cukup untuk ditarik. Saldo saat ini: Rp${formatRupiah(savingGoal.currentAmount)}`);
      return;
    }

    // Jika tambah dana, pastikan wadah tidak pecah (tidak melebihi target)
    if (jenisTransaksi === 'tambah' && savingGoal) {
      const sisaTarget = savingGoal.targetAmount - savingGoal.currentAmount;
      if (nominal > sisaTarget) {
        setSubmitError(`Waduh wadahnya bisa pecah! Maksimal yang bisa ditambahkan adalah Rp${formatRupiah(sisaTarget)}`);
        return;
      }
    }

    setIsSubmitting(true);
    try {
      const finalAmount = jenisTransaksi === 'tambah' ? nominal : -nominal;
      await financeApi.addMoney(id, finalAmount, keterangan);
      
      setSubmitSuccess('Transaksi tabungan berhasil dicatat!');
      setTimeout(() => navigate('/tabungan'), 1500);
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Terjadi kesalahan saat mencatat tabungan.');
    } finally {
      setIsSubmitting(false);
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
          <button className="w-full bg-[#FFAD2D] hover:bg-[#F29F25] text-white font-bold py-3 px-4 rounded-xl shadow-sm transition-colors">
            New Transaction
          </button>
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
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User Avatar" className="w-full h-full object-cover bg-gray-200" />
            </div>
          </div>
        </header>
    
    <main className="p-4 md:p-8 flex-1">
      <div className="max-w-4xl mx-auto flex flex-col h-full">
        
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Catat Tabungan</h2>
          <p className="text-gray-500 text-sm md:text-base">
            Catat tabungan menambah maupun mengurangi saldo tabungan
          </p>
        </div>

        {/* Dashed Container */}
        <div className="flex-1 border-2 border-dashed border-gray-300 rounded-3xl p-6 md:p-12 flex flex-col items-center">
          
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Catat Tabungan: {savingGoal?.goalName || '...'}
          </h3>
          <p className="text-gray-500 text-sm font-medium mb-8">
            Saldo saat ini: Rp{savingGoal ? formatRupiah(savingGoal.currentAmount) : 0}
          </p>

          <form className="w-full max-w-xl" onSubmit={handleSubmit}>

            {/* Notifikasi Error/Success */}
            {submitError && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm font-medium flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
                {submitError}
              </div>
            )}
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 border border-green-200 rounded-xl text-sm font-medium flex items-start gap-3">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                {submitSuccess}
              </div>
            )}

            
            {/* Toggle Tambah / Kurang */}
            <div className="flex rounded-xl border border-gray-300 overflow-hidden mb-8 shadow-sm">
              <button
                type="button"
                onClick={() => setJenisTransaksi('tambah')}
                className={`flex-1 py-3 flex justify-center items-center gap-2 text-sm font-bold transition-colors ${
                  jenisTransaksi === 'tambah' 
                    ? 'bg-[#963F71] text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <PlusIcon /> Tambah
              </button>
              <button
                type="button"
                onClick={() => setJenisTransaksi('kurang')}
                className={`flex-1 py-3 flex justify-center items-center gap-2 text-sm font-bold transition-colors border-l border-gray-300 ${
                  jenisTransaksi === 'kurang' 
                    ? 'bg-[#963F71] text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <MinusIcon /> Kurang
              </button>
            </div>

            {/* Input Nominal */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Nominal<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <NumberIcon />
                </div>
                <input
                  type="text"
                  placeholder="Rp5.000.000"
                  value={nominal === 0 ? '' : formatRupiah(nominal)}
                  onChange={handleNominalChange}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFAD2D] font-medium text-gray-700"
                />
              </div>
            </div>

            {/* Input Keterangan */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Keterangan<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <TextIcon />
                </div>
                <input
                  type="text"
                  placeholder="Habis Gajian"
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFAD2D] font-medium text-gray-700"
                />
              </div>
            </div>

            {/* Catatan Bawah */}
            <div className="mb-8 space-y-1">
              <p className="text-xs text-gray-700 font-medium">
                • Wajib diisi<span className="text-red-500">*</span>
              </p>
              <p className="text-xs text-gray-700 font-medium">
                • Saat ditarik (kurang), dana akan kembali ke <span className="font-bold">Total Saldo Tabungan</span>
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
                className={`px-8 py-2.5 rounded-xl text-white font-bold border-2 border-gray-900 shadow-[2px_2px_0px_0px_rgba(17,24,39,1)] transition-transform active:translate-y-0.5 active:shadow-none ${
                  isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#963F71] hover:bg-[#7a325b]'
                }`}
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

export default CatatTabunganPage;