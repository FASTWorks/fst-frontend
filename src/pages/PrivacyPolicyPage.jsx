import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-[#FAFAF8] p-8 font-sans">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Kebijakan Privasi (Privacy Policy)</h1>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}</p>
          <p>
            Selamat datang di FASTWorks. Kami menghargai privasi Anda dan berkomitmen untuk melindungi data pribadi Anda. 
            Kebijakan privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan menjaga informasi Anda saat menggunakan aplikasi kami.
          </p>
          <h2 className="text-xl font-semibold text-gray-800 mt-6">1. Informasi yang Kami Kumpulkan</h2>
          <p>Kami mengumpulkan informasi yang Anda berikan secara langsung kepada kami, seperti nama, alamat email, dan data transaksi keuangan yang Anda catat di dalam aplikasi.</p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-6">2. Penggunaan Informasi</h2>
          <p>Informasi yang dikumpulkan digunakan semata-mata untuk menyediakan fitur aplikasi, mengelola akun Anda, dan meningkatkan pengalaman pengguna. Kami tidak menjual data Anda kepada pihak ketiga.</p>
          
          <h2 className="text-xl font-semibold text-gray-800 mt-6">3. Keamanan Data</h2>
          <p>Kami mengambil langkah-langkah keamanan yang wajar untuk melindungi informasi pribadi Anda dari akses, pengungkapan, atau modifikasi yang tidak sah.</p>
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

export default PrivacyPolicyPage;
