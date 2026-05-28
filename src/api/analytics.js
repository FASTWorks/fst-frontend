// src/api/analytics.js
// ─────────────────────────────────────────────────────────────
// Analytics API Service — Dashboard statistics & AI insight
// ─────────────────────────────────────────────────────────────
import api from '@/lib/axios';

export const analyticsApi = {
  getSummary: (params) =>
    api.get('/api/analytics/summary', { params }),

  getHealth: () =>
    api.get('/api/analytics/health'),

  getRecent: (params) =>
    api.get('/api/analytics/recent', { params }),

  getInsight: () =>
    api.get('/api/analytics/insight'),
};
