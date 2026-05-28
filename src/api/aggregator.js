// src/api/aggregator.js
// ─────────────────────────────────────────────────────────────
// Aggregator API Service — Orchestrated multi-service data
// ─────────────────────────────────────────────────────────────
import api from '@/lib/axios';

export const aggregatorApi = {
  getDashboardData: () =>
    api.get('/api/aggregator/dashboard'),
};
