import React, { useState } from 'react';

// --- Icons ---
const ArrowLeftIcon = () => (
  <svg className="w-6 h-6 text-[#9A3412] hover:text-[#7C2D12] transition-colors cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
  </svg>
);

const ResetLockIcon = () => (
  <svg className="w-8 h-8 text-[#FFAD2D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const LupaKataSandiPage = () => {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen flex flex-col relative bg-[#FAFAF8] font-sans">
      
      {/* Back Button (Absolute Top Left) */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8">
        <button 
          onClick={() => window.history.back()} 
          className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
        >
          <ArrowLeftIcon />
        </button>
      </div>

      {/* Main Content (Centered) */}
      <main className="flex-1 flex flex-col justify-center items-center p-4">
        <div className="w-full max-w-md bg-white rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center">
          
          {/* Icon Header */}
          <div className="w-16 h-16 bg-[#FFEDD5] rounded-full flex items-center justify-center mb-6">
            <ResetLockIcon />
          </div>

          {/* Title & Subtitle */}
          <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">
            Lupa Kata Sandi?
          </h2>
          <p className="text-gray-500 text-sm text-center mb-8 px-4 leading-relaxed">
            Masukkan email yang terdaftar untuk menerima instruksi pengaturan ulang kata sandi.
          </p>

          {/* Form */}
          <form className="w-full" onSubmit={(e) => e.preventDefault()}>
            
            {/* Input Email */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                Email
              </label>
              <input 
                type="email" 
                id="email"
                placeholder="youremail@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFAD2D] font-medium text-gray-700 bg-white transition-shadow"
                required
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-[#FFAD2D] hover:bg-[#F29F25] text-white font-bold py-3.5 rounded-xl shadow-[0_4px_14px_0_rgba(255,173,45,0.39)] transition-all active:scale-[0.98] mb-6"
            >
              Kirim Link Reset
            </button>

            {/* Back to Login Link */}
            <div className="text-center">
              <button 
                type="button" 
                onClick={() => window.history.back()}
                className="text-sm font-bold text-[#FFAD2D] hover:text-[#F29F25] transition-colors focus:outline-none"
              >
                Kembali ke Login
              </button>
            </div>
            
          </form>

        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center">
        <p className="text-xs text-gray-500 font-medium">
          © 2026 FAST. Berizin dan diawasi oleh FASTWorks.
        </p>
      </footer>

    </div>
  );
};

export default LupaKataSandiPage;