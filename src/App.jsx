// src/App.jsx
import React from "react";

import { DashboardPage, LoginPage, RegisterPage, NotFound, HomePage, PemasukanPage, UploadPage, PengeluaranPage, TabunganPage, CatatTabunganPage, BuatTabunganPage, EditTabunganPage, ProfilePage, LupaKataSandiPage, KonfirmasiPage, AturUlangKataSandiPage} from "./pages/index.js";

import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import ProtectedRoute from "@/components/ProtectedRoute";
import PublicRoute from "@/components/PublicRoute";

import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "mock-client-id";

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <Routes>
          {/* ─── Public Routes ─── */}
          <Route path="/" element={<PublicRoute><HomePage/></PublicRoute>}/>
          <Route path="/login" element={<PublicRoute><LoginPage/></PublicRoute>}/>
          <Route path="/register" element={<PublicRoute><RegisterPage/></PublicRoute>}/>
          <Route path="/lupa-kata-sandi" element={<PublicRoute><LupaKataSandiPage/></PublicRoute>}/>
          <Route path="/konfirmasi" element={<PublicRoute><KonfirmasiPage/></PublicRoute>}/>
          <Route path="/atur-ulang-kata-sandi" element={<PublicRoute><AturUlangKataSandiPage/></PublicRoute>}/>

          {/* ─── Protected Routes ─── */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage/></ProtectedRoute>}/>
          <Route path="/pemasukan" element={<ProtectedRoute><PemasukanPage/></ProtectedRoute>}/>
          <Route path="/upload" element={<ProtectedRoute><UploadPage/></ProtectedRoute>}/>
          <Route path="/pengeluaran" element={<ProtectedRoute><PengeluaranPage/></ProtectedRoute>}/>
          <Route path="/tabungan" element={<ProtectedRoute><TabunganPage/></ProtectedRoute>}/>
          <Route path="/tabungan/buat" element={<ProtectedRoute><BuatTabunganPage/></ProtectedRoute>}/>
          <Route path="/tabungan/catat/:id" element={<ProtectedRoute><CatatTabunganPage/></ProtectedRoute>}/>
          <Route path="/tabungan/edit/:id" element={<ProtectedRoute><EditTabunganPage/></ProtectedRoute>}/>
          <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
          
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;