import React, { useState } from 'react';

// --- Icons ---
const ArrowLeftIcon = () => (
  <svg className="w-6 h-6 text-[#9A3412] hover:text-[#7C2D12] transition-colors cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
  </svg>
);

const LockResetIcon = () => (
  <svg className="w-8 h-8 text-[#FFAD2D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const CheckIcon = ({ active }) => (
  <svg className={`w-4 h-4 ${active ? 'text-[#FFAD2D]' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
  </svg>
);

const AturUlangKataSandiPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Logika Validasi Sederhana
  const hasMinChar = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    <div className="min-h-screen flex flex-col relative bg-[#FAFAF8] font-sans">
      
      {/* Back Button */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8">
        <button 
          onClick={() => window.history.back()} 
          className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
        >
          <ArrowLeftIcon />
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md flex flex-col items-center">
          
          {/* Icon Header */}
          <div className="w-16 h-16 bg-[#FFEDD5] rounded-2xl flex items-center justify-center mb-6 shadow-sm">
            <LockResetIcon />
          </div>

          {/* Title & Subtitle */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 text-center">
            Buat Kata Sandi Baru
          </h2>
          <p className="text-gray-500 text-sm md:text-base text-center mb-10 px-6 leading-relaxed">
            Masukkan kata sandi baru untuk akun kamu agar transaksi tetap aman dan nyaman.
          </p>

          {/* Form */}
          <form className="w-full space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            {/* Input Kata Sandi Baru */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Kata Sandi Baru
              </label>
              <div className="relative">
                <input 
                  type={showPass ? "text" : "password"}
                  placeholder="Kata sandi baru"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFAD2D] font-medium text-gray-700 bg-white transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 focus:outline-none"
                >
                  <EyeIcon />
                </button>
              </div>
            </div>

            {/* Input Konfirmasi Kata Sandi Baru */}
            <div>
              <label className="block text-sm font-bold text-gray-900 mb-2">
                Konfirmasi Kata Sandi Baru
              </label>
              <div className="relative">
                <input 
                  type={showConfirmPass ? "text" : "password"}
                  placeholder="Ulangi kata sandi"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFAD2D] font-medium text-gray-700 bg-white transition-all"
                />
                <button 
                  type="button"
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 focus:outline-none"
                >
                  <EyeIcon />
                </button>
              </div>
            </div>

            {/* Password Checklist Area */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-3 shadow-sm">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                Keamanan kata sandi:
              </p>
              <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                <CheckIcon active={hasMinChar} />
                <span className={hasMinChar ? 'text-gray-900' : ''}>Minimal 8 karakter</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                <CheckIcon active={hasNumber} />
                <span className={hasNumber ? 'text-gray-900' : ''}>Mengandung angka</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                <CheckIcon active={hasSymbol} />
                <span className={hasSymbol ? 'text-gray-900' : ''}>Mengandung simbol (!@#$%)</span>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-[#FFAD2D] hover:bg-[#F29F25] text-white font-bold py-4 rounded-xl shadow-[0_4px_14px_0_rgba(255,173,45,0.39)] transition-all active:scale-[0.98]"
            >
              Simpan Kata Sandi
            </button>
            
          </form>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center">
        <p className="text-xs text-gray-400 font-medium">
          © 2026 FAST. Berizin dan diawasi oleh FASTWorks.
        </p>
      </footer>

    </div>
  );
};

export default AturUlangKataSandiPage;