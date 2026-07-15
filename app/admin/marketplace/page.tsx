'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { AdminHeader } from '@/components/admin/admin-header';
import { Card } from '@/components/ui/card';
import { ShoppingBag, Search, CheckCircle2, AlertTriangle, Tag } from 'lucide-react';

export default function AdminMarketplacePage() {
  const [search, setSearch] = useState('');

  const [items, setItems] = useState([
    { id: '1', title: 'Apple iPhone 14 Pro Max 256GB', price: '₹72,000', seller: 'Rahul V.', category: 'Electronics & Mobiles', status: 'approved' },
    { id: '2', title: 'Yamaha FZ-S V3 2022 Model', price: '₹85,000', seller: 'Vipin Das', category: 'Bikes & Vehicles', status: 'pending' },
    { id: '3', title: 'Solid Teak Wood Dining Set 6-Seater', price: '₹34,000', seller: 'Latha K.', category: 'Furniture & Home', status: 'approved' },
  ]);

  const toggleStatus = (id: string) => {
    setItems(items.map((it) => (it.id === id ? { ...it, status: it.status === 'approved' ? 'flagged' : 'approved' } : it)));
  };

  const filteredItems = items.filter((it) => it.title.toLowerCase().includes(search.toLowerCase()) || it.seller.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#111827]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Classifieds Market' }]} />

        <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight font-sans flex items-center gap-2">
                <ShoppingBag className="w-7 h-7 text-[#2563EB]" />
                <span>Buy & Sell Classifieds Moderation</span>
              </h1>
              <p className="text-sm text-[#6B7280]">Review citizen listings, moderate reported pre-owned items, and verify prices</p>
            </div>
          </div>

          {/* Search Card */}
          <Card className="p-4 border border-[#E5E7EB] bg-white rounded-2xl shadow-xs flex items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#6B7280] pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search listing or seller..."
                className="w-full pl-10 pr-4 h-[38px] rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] text-xs text-[#111827] focus:bg-white focus:border-[#2563EB] focus:outline-none"
              />
            </div>
            <span className="text-xs font-bold text-[#6B7280]">Total Items: {filteredItems.length}</span>
          </Card>

          {/* Table */}
          <Card className="p-0 border border-[#E5E7EB] bg-white rounded-3xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E7EB] bg-[#F8FAFC] text-[11px] font-extrabold text-[#6B7280] uppercase tracking-wider">
                    <th className="py-3.5 px-6">Item Title / Category</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">Seller Account</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-6 text-right">Moderation Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB] text-xs">
                  {filteredItems.map((it) => (
                    <tr key={it.id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-4 px-6 font-semibold">
                        <p className="font-bold text-[#111827] font-sans">{it.title}</p>
                        <p className="text-[11px] text-[#6B7280] flex items-center gap-1">
                          <Tag className="w-3 h-3 text-[#2563EB]" /> {it.category}
                        </p>
                      </td>
                      <td className="py-4 px-4 font-black text-[#111827]">{it.price}</td>
                      <td className="py-4 px-4 text-[#4B5563] font-medium">{it.seller}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            it.status === 'approved'
                              ? 'bg-emerald-100 text-emerald-700'
                              : it.status === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          {it.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => toggleStatus(it.id)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                            it.status === 'approved'
                              ? 'border-rose-200 text-rose-600 bg-rose-50 hover:bg-rose-100'
                              : 'border-emerald-200 text-emerald-600 bg-emerald-50 hover:bg-emerald-100'
                          }`}
                        >
                          {it.status === 'approved' ? 'Flag & Take Down' : 'Approve Item'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
