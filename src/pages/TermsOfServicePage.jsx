import React from 'react';

const TermsOfServicePage = () => {
  return (
    <div className="min-h-screen bg-[#FAFAF8] p-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Syarat dan Ketentuan (Terms of Service)</h1>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
          <p>
            Dengan menggunakan layanan FASTWorks, Anda menyetujui untuk terikat dengan Syarat dan Ketentuan berikut. 
            Silakan baca dengan saksama sebelum menggunakan aplikasi kami.
          </p>
          <h2 className="text-xl font-semibold text-gray-800 mt-6">1. Penggunaan Layanan</h2>
          <p>Aplikasi ini disediakan untuk membantu Anda mencatat keuangan pribadi. Anda setuju untuk menggunakan aplikasi ini hanya untuk tujuan yang sah dan sesuai dengan hukum yang berlaku di Indonesia.</p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-6">2. Akun Pengguna</h2>
          <p>Anda bertanggung jawab untuk menjaga kerahasiaan kata sandi dan akun Anda. Setiap aktivitas yang terjadi di bawah akun Anda adalah tanggung jawab Anda sepenuhnya.</p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-6">3. Batasan Tanggung Jawab</h2>
          <p>FASTWorks tidak bertanggung jawab atas kerugian finansial langsung maupun tidak langsung yang diakibatkan oleh keputusan yang Anda buat berdasarkan data di dalam aplikasi ini.</p>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-100">
          <button onClick={() => window.history.back()} className="text-[#FFAD2D] font-bold hover:underline">
            &larr; Kembali
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
