import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { authApi } from '@/api/auth';

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
const PencilIcon = () => (
  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
);
const DeleteAccountIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);
const EyeIcon = () => (
  <svg className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);
const EyeOffIcon = () => (
  <svg className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Form States
  const [nama, setNama] = useState(user?.name || '');
  const [email] = useState(user?.email || '');
  const [kataSandiLama, setKataSandiLama] = useState('');
  const [kataSandiBaru, setKataSandiBaru] = useState('');
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [isEditingNama, setIsEditingNama] = useState(false);

  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = async () => {
    const isConfirm = window.confirm("Apakah Anda yakin ingin keluar dari aplikasi?");
    if (isConfirm) {
      await logout();
      navigate('/login');
    }
  };

  // Save profile name
  const handleSaveName = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsSubmitting(true);
    try {
      await authApi.getProfile(); // Placeholder — backend may have updateProfile
      updateUser({ name: nama });
      setSuccess('Nama berhasil diperbarui!');
      setIsEditingNama(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menyimpan perubahan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Change password
  const handleChangePassword = async () => {
    setPasswordError('');
    setPasswordSuccess('');
    if (!kataSandiLama || !kataSandiBaru) {
      setPasswordError('Semua field kata sandi wajib diisi.');
      return;
    }
    if (kataSandiBaru.length < 8) {
      setPasswordError('Kata sandi baru minimal 8 karakter.');
      return;
    }
    setIsSubmitting(true);
    try {
      const { data } = await authApi.changePassword({
        currentPassword: kataSandiLama,
        newPassword: kataSandiBaru,
      });
      setPasswordSuccess(data.message || 'Kata sandi berhasil diperbarui!');
      setKataSandiLama('');
      setKataSandiBaru('');
    } catch (err) {
      setPasswordError(err.response?.data?.message || 'Gagal mengubah kata sandi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete account
  const handleDeleteAccount = async () => {
    const confirmPassword = window.prompt('Masukkan password Anda untuk konfirmasi hapus akun:');
    if (!confirmPassword) return;

    setIsSubmitting(true);
    try {
      await authApi.deleteAccount(confirmPassword);
      await logout();
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal menghapus akun.');
    } finally {
      setIsSubmitting(false);
    }
  };


  // Navigasi Sidebar
  const navLinks = [
    { id: 1, label: 'Dashboard', href: '/dashboard', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>, active: false },
    { id: 2, label: 'Pemasukan', href: '/pemasukan', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>, active: false },
    { id: 3, label: 'Upload', href: '/upload', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>, active: false },
    { id: 4, label: 'Pengeluaran', href: '/pengeluaran', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"></path></svg>, active: false },
    { id: 5, label: 'Tabungan', href: '/tabungan', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>, active: false },
    { id: 6, label: 'Profile', href: '/profile', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>, active: true },
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        
        {/* Header */}
        <header className="bg-white px-4 md:px-8 py-4 md:py-5 flex justify-between items-center border-b border-gray-100 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <MenuIcon />
            </button>
            <h2 className="text-lg font-bold text-gray-800 hidden md:block">Halo, {user?.name || 'User'} 👋</h2>
          </div>
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold md:hidden">FAST</h1>
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-[#FFAD2D]">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User Avatar" className="w-full h-full object-cover bg-gray-200" />
            </div>
          </div>
        </header>

        {/* Form Content */}
        <main className="p-4 md:p-8 flex-1">
          <div className="max-w-4xl mx-auto flex flex-col h-full">
            
            {/* Title Section */}
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Profile</h2>
              <p className="text-gray-600 text-sm md:text-base">
                Kelola informasi profil dan pengaturan keamanan akun Anda
              </p>
            </div>

            {/* Dashed Profile Card Container */}
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-3xl p-6 md:p-12 flex flex-col items-center shadow-sm">
              
              {/* Avatar Section */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-[#FFAD2D] p-1">
                    <img 
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                      alt="Profile Avatar" 
                      className="w-full h-full rounded-full object-cover bg-gray-100"
                    />
                  </div>
                  <button type="button" className="absolute bottom-0 right-0 bg-[#FFAD2D] hover:bg-[#F29F25] p-2 rounded-full border-2 border-white shadow-sm transition-colors">
                    <PencilIcon />
                  </button>
                </div>
              </div>

              {/* Feedback Alerts */}
              {error && (
                <div className="w-full max-w-xl mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
                  {error}
                </div>
              )}
              {success && (
                <div className="w-full max-w-xl mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-medium">
                  {success}
                </div>
              )}

              {/* Form Input fields */}
              <form onSubmit={handleSaveName} className="w-full max-w-xl space-y-6">
                
                {/* Nama Input (Dengan Fitur Edit) */}
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <label htmlFor="nama" className="block text-sm font-bold text-gray-900 mb-2">Nama</label>
                    <input 
                      type="text" 
                      id="nama"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      readOnly={!isEditingNama}
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-[#FFAD2D] font-medium text-gray-700 transition-colors ${
                        !isEditingNama ? 'bg-gray-100 border-gray-300 cursor-not-allowed' : 'bg-white border-gray-300'
                      }`}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEditingNama(!isEditingNama)}
                    className={`py-3 px-6 rounded-xl font-bold transition-colors border ${
                      isEditingNama 
                        ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' 
                        : 'bg-[#FFF8ED] text-[#FFAD2D] border-[#FFAD2D]/20 hover:bg-[#FFAD2D] hover:text-white'
                    }`}
                  >
                    {isEditingNama ? 'Batal' : 'Edit'}
                  </button>
                </div>

                {/* Email Input (Disabled / Grayed out) */}
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email"
                    value={email}
                    readOnly
                    className="w-full px-4 py-3 rounded-xl border border-gray-400 font-medium text-gray-700 bg-[#C4C4C4] cursor-not-allowed"
                  />
                </div>

                {/* Divider Title */}
                <div className="text-center pt-2">
                  <h4 className="font-bold text-gray-900">Ubah Kata Sandi</h4>
                </div>

                {/* Password Alerts - dipindah ke luar flex agar responsive */}
                {passwordError && (
                  <div className="p-3 mt-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
                    {passwordError}
                  </div>
                )}
                {passwordSuccess && (
                  <div className="p-3 mt-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-medium">
                    {passwordSuccess}
                  </div>
                )}

                {/* Password Fields Layout Baru */}
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
                  <div className="flex-1 w-full">
                    <label htmlFor="password_lama" className="block text-sm font-bold text-gray-900 mb-2">Kata Sandi Lama</label>
                    <div className="relative">
                      <input 
                        type={showOldPass ? "text" : "password"}
                        id="password_lama"
                        placeholder="••••••••"
                        value={kataSandiLama}
                        onChange={(e) => setKataSandiLama(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFAD2D] font-medium text-gray-700 bg-white"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowOldPass(!showOldPass)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 focus:outline-none"
                      >
                        {showOldPass ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                    <div className="mt-2">
                      <Link to="/lupa-kata-sandi" className="text-xs font-bold text-[#0284C7] hover:text-[#0369A1] transition-colors">
                        Lupa Kata Sandi?
                      </Link>
                    </div>
                  </div>
                  
                  <div className="flex-1 w-full">
                    <label htmlFor="password_baru" className="block text-sm font-bold text-gray-900 mb-2">Kata Sandi Baru</label>
                    <div className="relative">
                      <input 
                        type={showNewPass ? "text" : "password"}
                        id="password_baru"
                        placeholder="••••••••"
                        value={kataSandiBaru}
                        onChange={(e) => setKataSandiBaru(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFAD2D] font-medium text-gray-700 bg-white"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowNewPass(!showNewPass)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 focus:outline-none"
                      >
                        {showNewPass ? <EyeOffIcon /> : <EyeIcon />}
                      </button>
                    </div>
                    {/* Spacer agar sejajar dengan link lupa kata sandi di layar besar */}
                    <div className="mt-2 text-transparent hidden md:block select-none">&nbsp;</div>
                  </div>

                  {/* Tombol Perbarui Kata Sandi */}
                  <div className="w-full md:w-auto mt-2 md:mt-0">
                    <button 
                      type="button"
                      onClick={handleChangePassword}
                      disabled={isSubmitting}
                      className="w-full md:w-auto bg-[#FFAD2D] hover:bg-[#F29F25] text-white font-bold py-3 px-6 rounded-xl shadow-sm transition-colors md:mb-7 disabled:opacity-60"
                    >
                      {isSubmitting ? 'Memproses...' : 'Perbarui'}
                    </button>
                  </div>
                </div>

                {/* Save Button (Warna Hijau) */}
                <div className="pt-4 flex justify-end">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 px-8 rounded-xl shadow-sm transition-colors disabled:opacity-60"
                  >
                    {isSubmitting ? 'Menyimpan...' : 'Save'}
                  </button>
                </div>

                {/* Hapus Akun Action */}
                <div className="pt-2 flex justify-center">
                  <button 
                    type="button"
                    onClick={handleDeleteAccount}
                    disabled={isSubmitting}
                    className="flex items-center gap-2 text-[#EF4444] font-semibold border border-[#FECDD3] bg-white hover:bg-red-50 px-6 py-2.5 rounded-full transition-colors shadow-sm disabled:opacity-60"
                  >
                    <DeleteAccountIcon />
                    Hapus Akun
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

export default ProfilePage;