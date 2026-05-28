// src/components/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';

const InputField = ({ label, type, placeholder, id, icon, onIconClick, value, onChange, disabled }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-bold text-gray-900 mb-2">
      {label}
    </label>
    <div className="relative">
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FBA919] focus:border-transparent text-sm placeholder-gray-400 shadow-sm transition-all"
        placeholder={placeholder}
        disabled={disabled}
      />
      {icon && (
        <button
          type="button"
          onClick={onIconClick}
          className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700"
        >
          {icon}
        </button>
      )}
    </div>
  </div>
);

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  // State untuk toggle visibilitas password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Kata sandi dan konfirmasi kata sandi tidak cocok.');
      return;
    }
    if (password.length < 8) {
      setError('Kata sandi minimal 8 karakter.');
      return;
    }
    if (!agreedToTerms) {
      setError('Anda harus menyetujui Syarat dan Ketentuan.');
      return;
    }

    setIsLoading(true);

    try {
      await register(name, email, password);
      setSuccess('Registrasi berhasil! Silakan cek email Anda untuk verifikasi.');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      const message = err.response?.data?.message
        || err.response?.data?.errors?.email?.[0]
        || 'Registrasi gagal. Silakan coba lagi.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Icon SVG sederhana untuk UI
  const EyeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>
  );

  const UserIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );

  return (
    // Wrapper utama dengan background off-white dan min-height layar penuh
    <div className="min-h-screen bg-[#FCF9F6] flex flex-col items-center justify-center p-6 font-sans">
      
      {/* Container Form Utama */}
      <div className="w-full max-w-105">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[#FBA919] text-2xl font-black mb-4 tracking-wide">FASTWorks</h1>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Buat Akun baru</h2>
          <p className="text-gray-500 text-sm">Lengkapi data di bawah untuk memulai perjalananmu.</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
            {error}
          </div>
        )}
        {/* Success Alert */}
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-medium">
            {success}
          </div>
        )}

        {/* Form Inputs */}
        <form className="space-y-1" onSubmit={handleSubmit}>
          <InputField 
            label="Nama Lengkap" 
            id="name" 
            type="text" 
            placeholder="Masukan Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
          />
          
          <InputField 
            label="Email" 
            id="email" 
            type="email" 
            placeholder="email@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
          
          <InputField 
            label="Kata sandi" 
            id="password" 
            type={showPassword ? "text" : "password"} 
            placeholder="Minimal 8 karakter" 
            icon={EyeIcon}
            onIconClick={() => setShowPassword(!showPassword)}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          
          <InputField 
            label="Ulangi kata sandi" 
            id="confirmPassword" 
            type={showConfirmPassword ? "text" : "password"} 
            placeholder="Ulangi kata sandi" 
            icon={UserIcon}
            onIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
          />

          {/* Checkbox Syarat & Ketentuan */}
          <div className="flex items-start mt-6 mb-6">
            <div className="flex items-center h-5">
              <input
                id="terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-5 h-5 bg-white border-gray-300 rounded focus:ring-[#FBA919] text-[#FBA919]"
                disabled={isLoading}
              />
            </div>
            <label htmlFor="terms" className="ml-3 text-sm text-gray-700 leading-snug">
              Saya menyetujui <a href="#" className="text-[#32829E] hover:underline">Syarat</a> dan <a href="#" className="text-[#32829E] hover:underline">Ketentuan</a> serta <a href="#" className="text-[#32829E] hover:underline">Kebijakan Privasi</a> FastWorks
            </label>
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#FBA919] hover:bg-[#e59815] text-black font-bold py-3.5 px-4 rounded-lg shadow-sm transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses...
              </span>
            ) : (
              'Daftar Sekarang'
            )}
          </button>
        </form>

        {/* Divider OR */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500 font-semibold tracking-wider">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Tombol Google */}
        <button
          type="button"
          className="w-full flex items-center justify-center bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-4 rounded-full shadow-sm transition-colors duration-200 mb-8"
        >
          <img 
            src="https://www.svgrepo.com/show/475656/google-color.svg" 
            alt="Google logo" 
            className="w-5 h-5 mr-3"
          />
          Sign up with Google
        </button>

        {/* Footer Links */}
        <p className="text-center text-sm text-gray-700 mb-12">
          Sudah punya akun? <Link to="/login" className="text-[#32829E] font-semibold hover:underline">Login di sini</Link>
        </p>

        {/* Copyright */}
        <p className="text-center text-xs text-gray-400">
          © 2026 FASTWorks. Berlisensi dan diawasi oleh FAST Team.
        </p>

      </div>
    </div>
  );
}