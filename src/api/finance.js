// src/api/finance.js
// ─────────────────────────────────────────────────────────────
// Finance API Service — Income, Transaction, Receipt, Budget, Saving
// ─────────────────────────────────────────────────────────────
import api from '@/lib/axios';

export const financeApi = {
  // ─── Income (Pemasukan) ───
  createIncome: (incomeData) =>
    api.post('/api/finance/incomes', incomeData),

  listIncomes: (params) =>
    api.get('/api/finance/incomes', { params }),

  updateIncome: (id, incomeData) =>
    api.put(`/api/finance/incomes/${id}`, incomeData),

  deleteIncome: (id) =>
    api.delete(`/api/finance/incomes/${id}`),

  // ─── Transaction (Pengeluaran) ───
  createTransaction: (transactionData) =>
    api.post('/api/finance/transactions', transactionData),

  listTransactions: (params) =>
    api.get('/api/finance/transactions', { params }),

  updateTransaction: (id, transactionData) =>
    api.put(`/api/finance/transactions/${id}`, transactionData),

  deleteTransaction: (id) =>
    api.delete(`/api/finance/transactions/${id}`),

  // ─── Receipt (Bukti Transaksi / Struk) ───
  createReceiptManual: (receiptData) =>
    api.post('/api/finance/receipts/manual', receiptData),

  createReceiptOCR: (formData) =>
    api.post('/api/finance/receipts/ocr', formData, {
      timeout: 60000,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }),

  getReceipt: (id) =>
    api.get(`/api/finance/receipts/${id}`),

  confirmReceipt: (id, confirmData) =>
    api.post(`/api/finance/receipts/${id}/confirm`, confirmData),

  rejectReceipt: (id) =>
    api.post(`/api/finance/receipts/${id}/reject`),

  // ─── Budget (Anggaran) ───
  getBudgetSummary: () =>
    api.get('/api/finance/budget/summary'),

  updateBudget: (period, budgetData) =>
    api.put(`/api/finance/budget/${period}`, budgetData),

  // ─── Saving Goals (Tabungan) ───
  createSavingGoal: (savingData) =>
    api.post('/api/finance/saving-goals', savingData),

  listSavingGoals: () =>
    api.get('/api/finance/saving-goals'),

  updateSavingGoal: (id, savingData) =>
    api.put(`/api/finance/saving-goals/${id}`, savingData),

  deleteSavingGoal: (id) =>
    api.delete(`/api/finance/saving-goals/${id}`),

  addMoney: (id, amount, note) =>
    api.post(`/api/finance/saving-goals/${id}/add-money`, { amount, note }),

  // ─── Analytics ───
  getRecentTransactions: () =>
    api.get('/api/analytics/recent'),
    
  getInsights: () =>
    api.get('/api/analytics/insight'),
};
