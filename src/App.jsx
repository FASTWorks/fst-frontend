// src/App.jsx
import React from "react";

import { DashboardPage, LoginPage, RegisterPage, NotFound, HomePage, PemasukanPage, UploadPage, PengeluaranPage, TabunganPage, CatatTabunganPage, BuatTabunganPage, EditTabunganPage, ProfilePage, LupaKataSandiPage, KonfirmasiPage, AturUlangKataSandiPage} from "./pages/index.js";

import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth";
import ProtectedRoute from "@/components/ProtectedRoute";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* ─── Public Routes ─── */}
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/lupa-kata-sandi" element={<LupaKataSandiPage/>}/>
        <Route path="/konfirmasi" element={<KonfirmasiPage/>}/>
        <Route path="/atur-ulang-kata-sandi" element={<AturUlangKataSandiPage/>}/>

        {/* ─── Protected Routes ─── */}
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage/></ProtectedRoute>}/>
        <Route path="/pemasukan" element={<ProtectedRoute><PemasukanPage/></ProtectedRoute>}/>
        <Route path="/upload" element={<ProtectedRoute><UploadPage/></ProtectedRoute>}/>
        <Route path="/pengeluaran" element={<ProtectedRoute><PengeluaranPage/></ProtectedRoute>}/>
        <Route path="/tabungan" element={<ProtectedRoute><TabunganPage/></ProtectedRoute>}/>
        <Route path="/tabungan/buat" element={<ProtectedRoute><BuatTabunganPage/></ProtectedRoute>}/>
        <Route path="/tabungan/catat" element={<ProtectedRoute><CatatTabunganPage/></ProtectedRoute>}/>
        <Route path="/tabungan/edit" element={<ProtectedRoute><EditTabunganPage/></ProtectedRoute>}/>
        <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
        
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </AuthProvider>
  );
};

export default App;