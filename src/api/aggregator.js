// src/api/aggregator.js
// ─────────────────────────────────────────────────────────────
// Aggregator API Service — Orchestrated multi-service data
// ─────────────────────────────────────────────────────────────
import api from '@/lib/axios';

export const aggregatorApi = {
  getDashboardData: (filter = '') => {
    const url = filter 
      ? `/api/aggregator/dashboard?filter=${filter}&_t=${Date.now()}`
      : `/api/aggregator/dashboard?_t=${Date.now()}`;
    return api.get(url);
  },
};
