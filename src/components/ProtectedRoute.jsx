// src/components/ProtectedRoute.jsx
// ─────────────────────────────────────────────────────────────
// Route Guard — Redirect ke /login jika belum terautentikasi
// ─────────────────────────────────────────────────────────────
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/auth';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Tampilkan branded spinner saat cek auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFFDF9] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#FFAD2D] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm font-medium">Memuat...</p>
        </div>
      </div>
    );
  }

  // Belum login → redirect, simpan intended path
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
