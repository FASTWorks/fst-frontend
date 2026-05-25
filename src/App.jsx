// src/App.jsx
import React from "react";

import { DashboardPage, LoginPage, RegisterPage, NotFound, HomePage, PemasukanPage, UploadPage, PengeluaranPage, TabunganPage, CatatTabunganPage, BuatTabunganPage, EditTabunganPage, ProfilePage } from "./pages/index.js";

import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/dashboard" element={<DashboardPage/>}/>
      <Route path="/pemasukan" element={<PemasukanPage/>}/>
      <Route path="/lupa-kata-sandi" element={<NotFound/>}/>
      <Route path="/upload" element={<UploadPage/>}/>
      <Route path="/pengeluaran" element={<PengeluaranPage/>}/>
      <Route path="/tabungan" element={<TabunganPage/>}/>
      <Route path="/tabungan/catat" element={<CatatTabunganPage/>}/>
      <Route path="/tabungan/buat" element={<BuatTabunganPage/>}/>
      <Route path="/tabungan/edit" element={<EditTabunganPage/>}/>
      <Route path="/profile" element={<ProfilePage/>}/>


      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
};

export default App;