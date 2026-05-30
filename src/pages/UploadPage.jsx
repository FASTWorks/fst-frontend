import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { financeApi } from '@/api/finance';

// --- Mock Icons ---
const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
);
const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
);
const MenuIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
);
const CloudUploadIcon = () => (
  <svg className="w-8 h-8 text-[#FFAD2D]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
);
const TrashIcon = () => (
  <svg className="w-5 h-5 text-[#963F71] hover:text-red-600 transition-colors cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
);

const UploadPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [isUploaded, setIsUploaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState('');
  const [receiptId, setReceiptId] = useState(null);

  // State untuk data ekstraksi
  const [storeName, setStoreName] = useState('Baji Cafe Store');
  const [date, setDate] = useState('01/01/2026');
  const [items, setItems] = useState([
    { id: 1, name: 'Avocado Toast', qty: 1, price: 10000, category: 'kebutuhan_primer' },
    { id: 2, name: 'Baji Creamy Latte', qty: 1, price: 10000, category: 'kebutuhan_sekunder' },
    { id: 3, name: 'Baji Avocado', qty: 1, price: 10000, category: 'kebutuhan_sekunder' },
  ]);

  // [TAMBAHKAN KODE INI] - Fungsi untuk menambah baris item baru
  const handleAddItem = () => {
    const newItem = {
      id: Date.now(), // Generate ID unik
      name: '',
      qty: 1,
      price: 0,
      category: 'kebutuhan_sekunder'
    };
    setItems([...items, newItem]);
  };

  // [TAMBAHKAN KODE INI] - Fungsi untuk menghapus item
  const handleDeleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // [TAMBAHKAN KODE INI] - Hitung total secara otomatis setiap ada perubahan
  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.qty * item.price), 0);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // OCR Upload handler
  const handleFileUpload = async (file) => {
    if (!file) return;
    setIsUploading(true);
    setUploadError('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // 1. Submit for OCR (Async)
      const { data } = await financeApi.createReceiptOCR(formData);
      const { receiptId: newReceiptId } = data.data;

      // 2. Polling for results
      let receiptData = null;
      for (let i = 0; i < 30; i++) { // Max 60 seconds
        await new Promise(resolve => setTimeout(resolve, 2000));
        const res = await financeApi.getReceipt(newReceiptId);
        if (res.data.data.status !== 'processing') {
          receiptData = res.data.data;
          break;
        }
      }

      if (!receiptData) {
        throw new Error('Waktu pemrosesan struk habis. Silakan coba lagi.');
      }
      
      if (receiptData.status === 'failed' || receiptData.status === 'rejected') {
        throw new Error(receiptData.categorySummary || 'AI gagal membaca struk ini. Coba foto ulang dengan lebih jelas.');
      }

      setReceiptId(receiptData.id);
      setStoreName(receiptData.storeName || 'Unknown Store');
      setDate(receiptData.receiptDate ? receiptData.receiptDate.split('T')[0] : new Date().toISOString().split('T')[0]);
      setItems(
        (receiptData.items || []).map((item, idx) => ({
          id: item.id || idx + 1,
          name: item.itemName || '',
          qty: item.qty || 1,
          price: item.unitPrice || 0,
          category: item.overrideParentCategory || item.aiParentCategory || 'kebutuhan_sekunder',
        }))
      );
      setIsUploaded(true);
    } catch (err) {
      setUploadError(err.response?.data?.message || err.message || 'Gagal mengupload struk. Coba lagi.');
    } finally {
      setIsUploading(false);
    }
  };

  // Save receipt handler
  const handleSaveReceipt = async () => {
    setSaveError('');
    setSaveSuccess('');
    setIsSaving(true);

    try {
      if (receiptId) {
        await financeApi.confirmReceipt(receiptId, {
          store_name: storeName,
          receipt_date: new Date(date).toISOString(),
          total: calculateTotal(),
          items: items.map((item) => ({
            id: typeof item.id === 'string' ? item.id : undefined,
            item_name: item.name,
            qty: item.qty,
            unit_price: item.price,
            total_price: item.qty * item.price,
            override_parent_category: item.category,
          })),
        });
      }
      setSaveSuccess('Struk berhasil disimpan!');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setSaveError(err.response?.data?.message || 'Gagal menyimpan struk.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleItemChange = (id, field, value) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  // Data Navigasi Sidebar
  const navLinks = [
    { id: 1, label: 'Dashboard', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>, active: false },
    { id: 2, label: 'Pemasukan', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>, active: false },
    { id: 3, label: 'Upload', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>, active: true },
    { id: 4, label: 'Pengeluaran', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"></path></svg>, active: false },
    { id: 5, label: 'Tabungan', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>, active: false },
    { id: 6, label: 'Profile', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>, active: false },
  ];

  return (
    <div className="flex h-screen bg-[#FFFDF9] font-sans text-gray-800 overflow-hidden">
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 flex flex-col justify-between px-4 py-6 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div>
          <div className="flex flex-col items-center mb-10 relative">
            <button className="md:hidden absolute -right-2 -top-2 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100" onClick={toggleSidebar}>
              <CloseIcon />
            </button>
            <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-2">
              <img src="/assets/logo/logo-fast-v1-bg-white.svg" alt="FAST Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          <nav className="space-y-2">
            {navLinks.map((link) => (
              <a key={link.id} href={link.label.toLowerCase()} className={`flex items-center px-4 py-3 rounded-xl transition-colors ${link.active ? 'bg-[#FFF8ED] text-[#963F71] font-bold border-l-4 border-[#FFAD2D]' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium'}`}>
                <span className="mr-3">{link.icon}</span>{link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="space-y-4">
          <Link to="/pengeluaran" className="">
            <button className="w-full bg-[#FFAD2D] hover:bg-[#F29F25] text-white font-bold py-3 px-4 rounded-xl shadow-sm transition-colors">
              New Transaction
            </button>
          </Link>
          <button onClick={handleLogout} className="flex items-center text-gray-500 hover:text-gray-900 px-4 py-2 w-full transition-colors">
            <LogoutIcon /><span className="ml-3 font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        <header className="bg-white px-4 md:px-8 py-4 md:py-5 flex justify-between items-center border-b border-gray-100 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={toggleSidebar} className="md:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg"><MenuIcon /></button>

            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              Halo, {user?.name || 'User'} <span className="text-xl md:text-2xl">👋</span>
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border-2 border-[#FFAD2D]">
              <Link to="/profile" className="w-full h-full block">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Baji" 
                  alt="Profile Avatar" 
                  className="w-full h-full object-cover bg-gray-100"
                />
              </Link>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8 flex-1">
          <div className="max-w-6xl mx-auto h-full flex flex-col">
            
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Upload</h2>
              <p className="text-gray-600 text-sm md:text-base">
                {isUploaded ? "Upload struk Anda di sini dan nikmati fitur MVP kami" : "Upload your digital receipts or photos. Our AI will automatically extract merchant data, items, and taxes with high precision."}
              </p>
            </div>

            {!isUploaded ? (
              <div className="flex-1 flex items-center justify-center p-6 bg-[#FCFBFA] border-2 border-dashed border-gray-300 rounded-3xl min-h-100">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[#FFF8ED] rounded-full flex items-center justify-center mb-4">
                    <CloudUploadIcon />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{isUploading ? 'Mengupload...' : 'Drag and drop files here'}</h3>
                  <p className="text-gray-500 mb-8 font-medium">Support for PDF, JPG, PNG (Max 10MB)</p>
                  {uploadError && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-medium">
                      {uploadError}
                    </div>
                  )}
                  <label className="px-8 py-2.5 rounded-lg bg-[#963F71] hover:bg-[#7a325b] text-white font-bold border-2 border-gray-900 shadow-sm transition-colors cursor-pointer">
                    {isUploading ? 'Mengupload...' : 'Pilih File'}
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      className="hidden"
                      disabled={isUploading}
                      onChange={(e) => handleFileUpload(e.target.files?.[0])}
                    />
                  </label>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
                <div className="px-6 py-4 border-b border-gray-200 bg-white">
                  <h3 className="text-xl font-bold text-gray-900">Review Extraction</h3>
                </div>

                <div className="flex flex-col md:flex-row flex-1">
                  
                  {/* Left Side: Receipt Preview */}
                  <div className="w-full md:w-1/2 bg-[#F4F5F6] p-8 flex items-center justify-center border-r border-gray-200 min-h-100">
                    <div className="bg-white p-6 shadow-md w-64 text-xs font-mono text-gray-800">
                      <h4 className="text-center font-bold text-sm mb-1">BAJI CAFE STORE</h4>
                      <p className="text-center text-[10px] text-gray-500 mb-4">Jl. Gacor No. 40 Hehew</p>
                      <div className="border-b border-dashed border-gray-300 mb-4"></div>
                      <div className="space-y-3 mb-4">
                        <div className="flex justify-between"><span className="w-24">Avocado Toast</span><span>Rp 10.000</span></div>
                        <div className="flex justify-between"><span className="w-24">Baji Creamy Latte</span><span>Rp 10.000</span></div>
                        <div className="flex justify-between"><span className="w-24">Baji Avocado</span><span>Rp 10.000</span></div>
                      </div>
                      <div className="border-b border-dashed border-gray-300 mb-4"></div>
                      <div className="flex justify-between font-bold text-sm mb-6">
                        <span>TOTAL</span><span>Rp 30.000</span>
                        </div>
                      <div className="bg-gray-100 h-8 rounded mb-2"></div>
                      <p className="text-center text-[8px] text-gray-400">01/01/2026 - 12:00 AM</p>
                    </div>
                  </div>

                  {/* Right Side: Form Data */}
                  <div className="w-full md:w-1/2 flex flex-col relative">
                    <form className="p-6 flex-1 overflow-y-auto" onSubmit={(e) => e.preventDefault()}>
                      
                      {/* Store & Date Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-8">
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                            Store Name
                          </label>
                          <input 
                            type="text" 
                            value={storeName}
                            onChange={(e) => setStoreName(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFAD2D] text-sm font-medium"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                            Date
                          </label>
                          {/* Diubah menjadi type="date" */}
                          <input 
                            type="date" 
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FFAD2D] text-sm font-medium"
                          />
                        </div>
                      </div>

                      {/* Items List Section */}
                      <div className="mb-4 flex justify-between items-end">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                          Items List
                        </label>
                        <div className="flex gap-8 pr-10 text-xs font-bold text-gray-500 uppercase tracking-wider">
                          <span>Qty</span>
                        </div>
                        <button type="button" onClick={handleAddItem} className="text-[#FFAD2D] text-xs font-bold hover:text-orange-500">
                          + ADD ITEM
                        </button>
                      </div>

                      {/* Dynamic Editable Items Array */}
                      <div className="space-y-3">
                        {items.map((item) => (
                          <div key={item.id} className="flex flex-col gap-2 p-3 bg-[#F9FAFB] rounded-xl border border-gray-100 shadow-sm">
                            <div className="flex gap-3 items-center">
                              {/* Input Nama Item */}
                              <input 
                                type="text" 
                                value={item.name}
                                onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                                placeholder="Nama Item"
                                className="flex-1 px-3 py-2 bg-white rounded-lg border border-gray-300 text-sm font-medium focus:outline-none focus:border-[#FFAD2D] focus:ring-1 focus:ring-[#FFAD2D]"
                              />
                              {/* Input Quantity (Menggunakan type="number") */}
                              <input 
                                type="number" 
                                value={item.qty}
                                onChange={(e) => handleItemChange(item.id, 'qty', e.target.value)}
                                min="1"
                                className="w-16 text-center bg-white px-3 py-2 rounded-lg border border-gray-300 text-sm font-medium focus:outline-none focus:border-[#FFAD2D] focus:ring-1 focus:ring-[#FFAD2D]"
                              />
                              {/* Input Harga */}
                              <div className="relative w-32">
                                  <span className="absolute left-3 top-2 text-sm font-medium text-gray-500">
                                    Rp
                                  </span>
                                  <input 
                                    type="text" 
                                    value={item.price === 0 ? '' : new Intl.NumberFormat('id-ID').format(item.price)}
                                    onChange={(e) => {
                                      // Hapus semua karakter selain angka agar murni numerik
                                      const rawValue = e.target.value.replace(/[^0-9]/g, '');
                                      handleItemChange(item.id, 'price', Number(rawValue));
                                    }}
                                    placeholder="0"
                                    className="w-full pl-8 bg-white pr-3 py-2 rounded-lg border border-gray-300 text-sm font-medium focus:outline-none focus:border-[#FFAD2D] focus:ring-1 focus:ring-[#FFAD2D]"
                                  />
                                </div>

                                {/* Tombol Hapus */}
                                <button 
                                  type="button" 
                                  onClick={() => handleDeleteItem(item.id)} 
                                  className="p-1"
                                >
                                  <TrashIcon />
                                </button>
                            </div>
                            
                            {/* Baris Kategori Item */}
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                                Kategori:
                              </span>
                              <select
                                value={item.category}
                                onChange={(e) => handleItemChange(item.id, 'category', e.target.value)}
                                className="flex-1 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-lg focus:ring-[#FFAD2D] focus:border-[#FFAD2D] block p-2 cursor-pointer"
                              >
                                <option value="kebutuhan_primer">Kebutuhan Primer</option>
                                <option value="kebutuhan_sekunder">Kebutuhan Sekunder</option>
                                <option value="dana_darurat">Dana Darurat</option>
                                <option value="tabungan">Kantong Tabungan Utama</option>
                              </select>
                            </div>
                          </div>
                        ))}
                      </div>

                    </form>

                    {/* Bottom Floating Action Area */}
                    <div className="p-6 bg-white">
                      <div className="bg-[#FFFDF4] border border-[#FDE0B5] rounded-2xl p-5 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                          <span className="text-xl font-bold text-gray-900">TOTAL</span>
                          <span className="text-3xl font-bold text-[#E58C17]">
                            Rp {new Intl.NumberFormat('id-ID').format(calculateTotal())}
                          </span>
                        </div>
                        <div className="flex gap-4">
                          <button 
                            onClick={() => setIsUploaded(false)}
                            className="flex-1 py-3 rounded-xl border border-gray-900 text-gray-900 font-bold hover:bg-gray-50 transition-colors bg-white shadow-sm"
                          >
                            DISCARD
                          </button>
                          <button 
                            onClick={handleSaveReceipt}
                            disabled={isSaving}
                            className="flex-1 py-3 rounded-xl bg-[#F59E0B] hover:bg-[#d98205] text-white font-bold shadow-sm transition-colors disabled:opacity-60"
                          >
                            {isSaving ? 'Menyimpan...' : 'SAVE RECEIPT'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UploadPage;