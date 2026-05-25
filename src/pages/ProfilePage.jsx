import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// --- Icons ---
const ArrowLeftIcon = () => (
  <svg className="w-6 h-6 text-gray-800 hover:text-gray-600 transition-colors cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
);
const PencilIcon = () => (
  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
);
const DeleteAccountIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);

const ProfilePage = () => {
  // State form
  const [nama, setNama] = useState('Tom Lend Bonk');
  const [email] = useState('tomlendbonk@gmail.com'); // Email biasanya read-only
  const [kataSandiLama, setKataSandiLama] = useState('');
  const [kataSandiBaru, setKataSandiBaru] = useState('');

  return (
    <div className="min-h-screen bg-[#FFFDF9] font-sans text-gray-800 relative flex items-center justify-center p-4">
      
      {/* Back Button (Bisa dibungkus dengan <Link to="/dashboard"> jika pakai react-router) */}
      <div className="absolute top-6 left-6 md:top-10 md:left-10">
        <button onClick={() => window.history.back()} className="p-2 rounded-full hover:bg-gray-100 transition-colors">
          <ArrowLeftIcon />
        </button>
      </div>

      {/* Main Profile Card (Dashed Border) */}
      <div className="w-full max-w-2xl border-2 border-dashed border-gray-400 rounded-3xl p-8 md:p-12 flex flex-col bg-transparent">
        
        {/* Avatar Section */}
        <div className="flex justify-center mb-10">
          <div className="relative">
            {/* Wrapper for the orange border gap effect */}
            <div className="w-32 h-32 rounded-full border-4 border-[#F59E0B] p-1">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=TomLendBonk" 
                alt="Profile Avatar" 
                className="w-full h-full rounded-full object-cover bg-gray-200"
              />
            </div>
            {/* Edit Badge */}
            <button className="absolute bottom-0 right-0 bg-[#F59E0B] hover:bg-[#d98205] p-2 rounded-full border-2 border-white shadow-sm transition-colors">
              <PencilIcon />
            </button>
          </div>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="w-full flex flex-col gap-6">
          
          {/* Nama Input */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Nama</label>
            <input 
              type="text" 
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] font-medium text-gray-700 bg-white"
            />
          </div>

          {/* Email Input (Disabled/Read-only Styling) */}
          <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              readOnly
              className="w-full px-4 py-3 rounded-lg border border-gray-700 font-medium text-gray-700 bg-[#C4C4C4] cursor-not-allowed"
            />
          </div>

          {/* Ubah Kata Sandi Header */}
          <div className="text-center mt-4 mb-2">
            <h4 className="font-bold text-gray-900">Ubah Kata Sandi</h4>
          </div>

          {/* Password Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">Kata Sandi Lama</label>
              <input 
                type="password" 
                placeholder="tomlendbonk@gmail.com" // Placeholder sesuai gambar
                value={kataSandiLama}
                onChange={(e) => setKataSandiLama(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] font-medium text-gray-700 bg-white"
              />
              <div className="mt-2">
                <Link to="#" className="text-sm font-bold text-[#0284C7] hover:text-[#0369A1] transition-colors">
                  Lupa Kata Sandi?
                </Link>
              </div>
            </div>
            
            <div className="flex flex-col">
              <label className="block text-sm font-bold text-gray-900 mb-2">Kata Sandi Baru</label>
              <input 
                type="password" 
                placeholder="tomlendbonk@gmail.com" // Placeholder sesuai gambar
                value={kataSandiBaru}
                onChange={(e) => setKataSandiBaru(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] font-medium text-gray-700 bg-white"
              />
              
              {/* Save Button (Aligned to bottom right of this column) */}
              <div className="mt-4 flex justify-end">
                <button 
                  type="submit"
                  className="bg-[#FDBA3B] hover:bg-[#e5a633] text-white font-bold py-2 px-8 rounded-lg shadow-sm transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          </div>

        </form>

        {/* Hapus Akun Button */}
        <div className="mt-12 flex justify-center">
          <button 
            type="button"
            className="flex items-center gap-2 text-[#EF4444] font-medium border border-[#FECDD3] bg-white hover:bg-red-50 px-6 py-2.5 rounded-full transition-colors"
          >
            <DeleteAccountIcon />
            Hapus Akun
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;