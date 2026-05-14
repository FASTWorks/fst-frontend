// src/App.jsx
import React from "react";
import { LoginPage, RegisterPage, NotFound } from "./pages/index.js";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/" element={<NotFound/>}/>
    </Routes>
  );
};

export default App;