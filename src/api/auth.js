// src/api/auth.js
// ─────────────────────────────────────────────────────────────
// Auth API Service — Semua endpoint autentikasi via Gateway
// ─────────────────────────────────────────────────────────────
import api from '@/lib/axios';

export const authApi = {
  // ─── Public Endpoints ───
  login: (credentials) =>
    api.post('/api/auth/login', credentials),

  register: (userData) =>
    api.post('/api/auth/register', userData),

  verifyEmail: (token) =>
    api.get('/api/auth/verify-email', { params: { token } }),

  resendVerification: (email) =>
    api.post('/api/auth/resend-verification', { email }),

  forgotPassword: (email) =>
    api.post('/api/auth/forgot-password', { email }),

  resetPassword: ({ token, email, password }) =>
    api.post('/api/auth/reset-password', { token, email, password }),

  refreshToken: (refreshToken) =>
    api.post('/api/auth/refresh', { refreshToken }),

  googleAuth: (code, auth_type) =>
    api.post('/api/auth/google', { code, auth_type }),

  // ─── Protected Endpoints (Require JWT) ───
  getProfile: () =>
    api.get('/api/auth/profile'),

  changePassword: ({ currentPassword, newPassword }) =>
    api.put('/api/auth/profile/password', { currentPassword, newPassword }),

  deleteAccount: (password) =>
    api.delete('/api/auth/profile', { data: { password } }),

  logout: ({ refreshToken }) =>
    api.post('/api/auth/logout', { refreshToken }),
};
