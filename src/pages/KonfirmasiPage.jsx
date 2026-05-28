import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { authApi } from '@/api/auth';

// --- Icons ---
const ArrowLeftIcon = () => (
  <svg className="w-6 h-6 text-[#9A3412] hover:text-[#7C2D12] transition-colors cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
  </svg>
);

const EnvelopeIcon = () => (
  <svg className="w-16 h-16 text-[#FFAD2D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const KonfirmasiEmailPage = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const userEmail = location.state?.email || 'youremail@gmail.com';
  const tokenFromUrl = searchParams.get('token');

  const [isResending, setIsResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const [verifyMessage, setVerifyMessage] = useState('');

  // Auto-verify jika ada token di URL
  useEffect(() => {
    if (tokenFromUrl) {
      const verify = async () => {
        try {
          const { data } = await authApi.verifyEmail(tokenFromUrl);
          setVerifyMessage(data.message || 'Email berhasil diverifikasi!');
        } catch (err) {
          setVerifyMessage(err.response?.data?.message || 'Token verifikasi tidak valid.');
        }
      };
      verify();
    }
  }, [tokenFromUrl]);

  const handleResend = async () => {
    setIsResending(true);
    setResendMessage('');
    try {
      const { data } = await authApi.resendVerification(userEmail);
      setResendMessage(data.message || 'Email verifikasi berhasil dikirim ulang!');
    } catch (err) {
      setResendMessage(err.response?.data?.message || 'Gagal mengirim ulang.');
    } finally {
      setIsResending(false);
    }
  };

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
        <div className="w-full max-w-md flex flex-col items-center mt-8">
          
          {/* Card untuk Icon Email */}
          <div className="w-full h-48 md:h-56 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] flex items-center justify-center mb-8">
            <div className="p-4 bg-[#FFFDF9] rounded-2xl shadow-sm border border-gray-50">
               <EnvelopeIcon />
            </div>
          </div>

          {/* Title & Subtitle */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 text-center">
            Cek Email Kamu
          </h2>
          <p className="text-gray-500 text-sm md:text-base text-center mb-8 px-4 leading-relaxed max-w-sm">
            Kami telah mengirimkan link verifikasi pengaturan ulang kata sandi ke <span className="font-bold text-gray-800">{userEmail}</span>. Silakan cek kotak masuk atau folder spam kamu.
          </p>

          {/* Action Button */}
          {/* Catatan: Di gambar teksnya terlihat seperti 'Simpan Kata Sandi', namun untuk UX biasanya ini adalah 'Buka Aplikasi Email' atau 'Kembali ke Login'. Anda bisa menyesuaikannya. */}

          <button 
            type="button"
            className="w-full max-w-sm bg-[#FFAD2D] hover:bg-[#F29F25] text-white font-bold py-3.5 rounded-xl shadow-[0_4px_14px_0_rgba(255,173,45,0.39)] transition-all active:scale-[0.98] mb-6"
          >
            Buka Aplikasi Email
          </button>

          {/* Status Messages */}
          {verifyMessage && (
            <div className="w-full max-w-sm mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm font-medium text-center">
              {verifyMessage}
            </div>
          )}
          {resendMessage && (
            <div className="w-full max-w-sm mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm font-medium text-center">
              {resendMessage}
            </div>
          )}

          {/* Resend Code Link */}
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500">
              Belum menerima kode?{' '}
              <button 
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="font-bold text-[#FFAD2D] hover:text-[#F29F25] transition-colors focus:outline-none disabled:opacity-60"
              >
                {isResending ? 'Mengirim...' : 'Kirim ulang'}
              </button>
            </p>
          </div>

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

export default KonfirmasiEmailPage;