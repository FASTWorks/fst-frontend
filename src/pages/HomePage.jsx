import React from 'react';
import { TeamCard } from '../components/ui';

// --- DATA DUMMY UNTUK MODULARITAS ---
const teamMembers = [
  {
    name: 'Bagus Aji Fernando (Baji)',
    role: 'Full-Stack Web Developer',
    desc: 'Membangun arsitektur web yang responsif, aman, dan user-friendly dan Gacor.',
    img: '/assets/our-team/fs-baji.svg',
    socials: {linkedin: "https://www.linkedin.com/in/bagus-aji-fernando-466347286", github: "https://github.com/bajiff", instagram: "https://instagram.com/_bajif"}
  },
  {
    name: 'Abdurrahman Abdul Hamid',
    role: 'Full-Stack Web Developer',
    desc: 'Membangun arsitektur web yang responsif, aman, dan user-friendly.',
    img: '/assets/our-team/dummy.svg',
    socials: {linkedin: "https://www.linkedin.com/in/abdurrahmanhamid", github: "https://github.com/abdhaamed", instagram: "https://www.instagram.com/abdhaamed/"}
  },
  {
    name: 'Ahmad Raja Fadhil',
    role: 'AI Engineer',
    desc: 'Merancang model kecerdasan buatan untuk fitur Scan Struk dan Insight AI.',
    img: '/assets/our-team/ai-ahmad-raja-fadhil.svg',
    socials: {linkedin: "https://www.linkedin.com/in/ahmadrajaf/", github: "https://github.com/rajafadhil", instagram: "https://www.instagram.com/raja.f_007/"}
  },

  {
    name: 'Putri Maharani Fetra',
    role: 'AI Engineer',
    desc: 'Merancang model kecerdasan buatan untuk fitur Scan Struk dan Insight AI.',
    img: '/assets/our-team/ai-putri-maharani-fetra.svg',
    socials: {linkedin: "https://www.linkedin.com/in/putri-maharani-fetra-5131a7243/", github: "https://github.com/Ranran0703", instagram: "https://www.instagram.com/raniii_fetra/"}
  },
  {
    name: 'Devia',
    role: 'Data Scientist',
    desc: 'Mengolah data histori keuangan pengguna untuk menghasilkan prediksi pengeluaran dan grafik analitik yang akurat.',
    img: '/assets/our-team/ds-devia.svg',
    socials: {linkedin: "https://www.linkedin.com/in/devia-az-06a7392b2/", github: "https://github.com/dytinbadeviaazzahro-commits", instagram: "https://www.instagram.com/dv_zzr/"}
  },
  {
    name: 'Nalitha',
    role: 'Data Scientist',
    desc: 'Merancang model kecerdasan buatan untuk fitur Scan Struk dan Insight AI.',
    img: '/assets/our-team/ds-nalitha.svg',
    socials: {linkedin: "https://www.linkedin.com/in/nalithaeka/", github: "https://github.com/nalithaeka-n", instagram: "https://www.instagram.com/naalitha/"}
  }
];

// --- KOMPONEN UTAMA ---
const FastLandingPage = () => {
  return (
    <div className="min-h-screen bg-[#fdfaf6] text-gray-800 font-sans">
      
      {/* NAVBAR */}
      <nav className="flex justify-between items-center py-4 px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center">
            <a href="#">
            <img src="/assets/logo/logo-fast-v1-bg-white.svg" alt="Logo FAST" />
            </a>
          </div>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-600">
          <a href="#" className="hover:text-gray-900">Home</a>
          <a href="#features" className="hover:text-gray-900">Features</a>
          <a href="#about" className="hover:text-gray-900">About</a>
          <a href="#our-team" className="hover:text-gray-900">Our Team</a>
          <a href="#contact-us" className="hover:text-gray-900">Contact Us</a>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <a href="/login" className="text-gray-600 hover:text-gray-900">Login</a>
          <a href="/register" className="bg-[#ffb320] hover:bg-amber-500 text-gray-900 px-5 py-2 rounded-md transition-colors">Sign Up</a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="max-w-7xl mx-auto px-8 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-block text-xs font-semibold text-gray-600 border border-gray-300 rounded-full px-3 py-1 mb-2">
            <span className="text-pink-500 mr-2">●</span> Introducing FAST v1.0
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Financial Analysis & <br/> System Tracking
          </h1>
          <p className="text-gray-600 leading-relaxed max-w-md">
            Gain absolute clarity over your personal finances. Reduce cognitive load with real-time tracking, AI insights, and intelligent receipt scanning designed for millennial professionals.
          </p>
          <a href="/login" className="bg-[#ffb320] hover:bg-amber-500 text-gray-900 font-medium px-6 py-3 rounded-md transition-colors">
            Get Started
          </a>
        </div>
        <div className="rounded-xl overflow-hidden shadow-2xl bg-white border">
          {/* Placeholder untuk gambar laptop/dashboard */}
          <img 
            src="/assets/logo/logo-fast-v1.svg" 
            alt="Dashboard Preview" 

            className="w-full h-auto object-cover"
          />
        </div>
      </header>

      {/* FEATURES SECTION */}
      <section id="features" className="max-w-6xl mx-auto px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Features</h2>
          <p className="text-gray-500">Everything you need to track, analyze, and optimize your spending.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Feature 1 */}
          <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
             <div className="w-10 h-10 bg-orange-200 rounded-lg flex items-center justify-center mb-6">
               <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
             </div>
             <h3 className="text-lg font-bold mb-3 text-gray-900">Smart Receipt Scanner (OCR)</h3>
             <p className="text-sm text-gray-600 leading-relaxed">Instantly digitize your physical receipts. Our advanced OCR technology extracts vendor data, dates, and amounts with pinpoint accuracy, automatically categorizing your expenses.</p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
             <div className="w-10 h-10 bg-pink-200 rounded-lg flex items-center justify-center mb-6">
               <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
             </div>
             <h3 className="text-lg font-bold mb-3 text-gray-900">AI-Powered Insights</h3>
             <p className="text-sm text-gray-600 leading-relaxed">Discover hidden spending patterns. Our AI analyzes your transaction history to provide actionable advice on reducing unnecessary subscriptions and optimizing cash flow.</p>
          </div>
        </div>

        {/* Feature 3 (Wide) */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row items-center overflow-hidden">
          <div className="p-8 md:w-1/2">
             <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
               <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
             </div>
             <h3 className="text-lg font-bold mb-3 text-gray-900">Dynamic Budgeting & Savings</h3>
             <p className="text-sm text-gray-600 leading-relaxed">Create flexible budgets that adapt to your lifestyle. Set custom saving goals, track your progress visually, and receive alerts before you overspend in specific categories.</p>
          </div>
          <div className="md:w-1/2 bg-gray-50 h-full p-4 flex justify-end">
             <img src="/assets/logo/logo-fast-v1-bg-white.svg" alt="Charts preview" className="rounded-l-lg shadow-sm w-full object-cover max-h-64" />
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="bg-white py-20 border-y border-gray-100">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
          </div>
          <h2 className="text-2xl font-bold mb-6 tracking-wide text-gray-900">ABOUT</h2>
          <p className="text-gray-600 leading-relaxed">
            We built FAST to solve millennial financial distress through intelligent technology. By automating the mundane aspects of budgeting and expense tracking, we empower you to focus on building wealth rather than managing spreadsheets. Clarity, precision, and ease of use are at the core of everything we do.
          </p>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section id="our-team" className="max-w-6xl mx-auto px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Meet Our Team</h2>
          <p className="text-gray-500 text-sm">Kenali para inovator di balik teknologi finansial masa depan Anda.</p>
        </div>

        <div className="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact-us" className="max-w-3xl mx-auto px-8 py-16 mb-16">
        <div className="bg-white border border-gray-100 rounded-2xl p-10 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
          <p className="text-sm text-gray-500 mb-8">Have questions? Send us a message.</p>
          
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">Name</label>
              <input type="text" placeholder="John Doe" className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">Email</label>
              <input type="email" placeholder="john@example.com" className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">Message</label>
              <textarea placeholder="How can we help you?" rows="4" className="w-full border border-gray-200 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"></textarea>
            </div>
            <div className="flex justify-center pt-2">
              <button type="submit" className="bg-[#ffb320] hover:bg-amber-500 text-gray-900 font-medium px-8 py-2.5 rounded-md text-sm transition-colors">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 py-8 px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500">
            <span className="font-bold text-gray-900 mr-2">FAST</span> 
            © 2026 Financial Analysis and System Tracking.
          </div>
          <div className="flex gap-6 text-xs text-gray-500 font-medium">
            <a href="#" className="hover:text-gray-900">Privacy Policy</a>
            <a href="#" className="hover:text-gray-900">Terms of Service</a>
            <a href="#" className="hover:text-gray-900">Security Whitepaper</a>
            <a href="#" className="hover:text-gray-900">Affiliates</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FastLandingPage;