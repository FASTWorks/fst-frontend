// src/App.jsx
import React from "react";
import { DashboardPage, LoginPage, RegisterPage, NotFound, HomePage, PemasukanPage } from "./pages/index.js";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/dashboard" element={<DashboardPage/>}/>
      <Route path="/pemasukan" element={<PemasukanPage/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
};

export default App;