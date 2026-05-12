// src/components/layouts/Login.jsx
import React from 'react';

// Fungsi kecil yang reusable untuk elemen input
const inputField = ({ label, type, placeholder, icon }) => (
  <div className="mb-5">
    <label className="block text-sm font-bold text-gray-900 mb-2">
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        className="w-full px-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FBA919] focus:border-transparent text-sm placeholder-gray-400 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] transition-all"
        placeholder={placeholder}
      />
      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
        {icon}
      </div>
    </div>
  </div>
);

export default function Login() {
  // SVG Icons sesuai dengan desain
  const iconUser = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
    </svg>
  );

  const iconLock = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-[#FCF9F6] flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      
      {/* Wrapper Utama */}
      <div className="w-full max-w-[420px]">
        
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-[#FBA919] text-2xl font-bold mb-6 tracking-wide">FASTWorks</h1>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome back!</h2>
          <p className="text-gray-600 text-sm">Manage your money with optimism and clarity.</p>
        </div>

        {/* Form Login */}
        <form onSubmit={(e) => e.preventDefault()}>
          
          {inputField({
            label: "Email",
            type: "email",
            placeholder: "youremail@email.com",
            icon: iconUser
          })}
          
          {inputField({
            label: "Kata Sandi",
            type: "password",
            placeholder: "********",
            icon: iconLock
          })}

          {/* Ingat Saya & Lupa Kata Sandi */}
          <div className="flex items-center justify-between mt-2 mb-6">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 border-gray-300 rounded text-[#FBA919] focus:ring-[#FBA919]"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                Ingat Saya
              </label>
            </div>
            <a href="#" className="text-sm font-bold text-[#146C83] hover:underline">
              Lupa Kata Sandi?
            </a>
          </div>

          {/* Tombol Login */}
          <button
            type="submit"
            className="w-full bg-[#FBA919] hover:bg-[#e59a15] text-black font-bold py-3.5 rounded-xl shadow-md transition-colors duration-200"
          >
            LOGIN
          </button>
        </form>

        {/* Garis Pemisah (OR) */}
        <div className="flex items-center my-8">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-xs font-bold text-gray-400 tracking-widest">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Tombol Social Login */}
        <button
          type="button"
          className="w-full flex items-center justify-center bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-semibold py-3 px-4 rounded-full shadow-sm transition-colors duration-200 mb-10"
        >
          <img 
            src="https://www.svgrepo.com/show/475656/google-color.svg" 
            alt="Google Icon" 
            className="w-5 h-5 mr-3"
          />
          Sign in with Google
        </button>

        {/* Footer Link */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="#" className="text-[#146C83] font-bold hover:underline">
            Create Account
          </a>
        </p>

      </div>
    </div>
  );
}