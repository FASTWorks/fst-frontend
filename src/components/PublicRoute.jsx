import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

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

  // Jika sudah login, redirect ke dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Jika belum login, render komponen (login, register, home, dll)
  return children;
};

export default PublicRoute;
