'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { AdminHeader } from '@/components/admin/admin-header';
import { Card } from '@/components/ui/card';
import { Building, Search, Plus, CheckCircle2, Home } from 'lucide-react';

export default function AdminPropertiesPage() {
  const [search, setSearch] = useState('');

  const [properties, setProperties] = useState([
    { id: '1', title: 'Sea View 3BHK Penthouse Villa', location: 'Kozhikode Beach Front', price: '₹1.85 Cr', agent: 'Malabar Realty', status: 'verified' },
    { id: '2', title: 'Commercial Office Space 2400 sq.ft', location: 'Mavoor Road Junction', price: '₹95,000 / mo', agent: 'City Estates', status: 'verified' },
    { id: '3', title: '12 Cents Residential Land Plot', location: 'Chevayur, Calicut', price: '₹68 Lakhs', agent: 'Direct Owner', status: 'pending' },
  ]);

  const toggleStatus = (id: string) => {
    setProperties(properties.map((p) => (p.id === id ? { ...p, status: p.status === 'verified' ? 'pending' : 'verified' } : p)));
  };

  const filteredProperties = properties.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#111827]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Real Estate Listings' }]} />

        <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight font-sans flex items-center gap-2">
                <Building className="w-7 h-7 text-[#2563EB]" />
                <span>Real Estate & Property Governance</span>
              </h1>
              <p className="text-sm text-[#6B7280]">Verify land title plots, commercial office rentals, and residential villas across Kozhikode</p>
            </div>

            <button className="h-[40px] px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 shrink-0">
              <Plus className="w-4 h-4" /> Add Property Listing
            </button>
          </div>

          {/* Search Card */}
          <Card className="p-4 border border-[#E5E7EB] bg-white rounded-2xl shadow-xs flex items-center justify-between">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#6B7280] pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search location or title..."
                className="w-full pl-10 pr-4 h-[38px] rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] text-xs text-[#111827] focus:bg-white focus:border-[#2563EB] focus:outline-none"
              />
            </div>
            <span className="text-xs font-bold text-[#6B7280]">Listings: {filteredProperties.length}</span>
          </Card>

          {/* Table */}
          <Card className="p-0 border border-[#E5E7EB] bg-white rounded-3xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E7EB] bg-[#F8FAFC] text-[11px] font-extrabold text-[#6B7280] uppercase tracking-wider">
                    <th className="py-3.5 px-6">Property Title / Location</th>
                    <th className="py-3.5 px-4">Price Value</th>
                    <th className="py-3.5 px-4">Agent / Seller</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-6 text-right">Moderation Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB] text-xs">
                  {filteredProperties.map((p) => (
                    <tr key={p.id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-4 px-6 font-semibold">
                        <p className="font-bold text-[#111827] font-sans">{p.title}</p>
                        <p className="text-[11px] text-[#6B7280] flex items-center gap-1">
                          <Home className="w-3 h-3 text-[#2563EB]" /> {p.location}
                        </p>
                      </td>
                      <td className="py-4 px-4 font-black text-[#111827]">{p.price}</td>
                      <td className="py-4 px-4 text-[#4B5563] font-medium">{p.agent}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            p.status === 'verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {p.status === 'verified' ? 'Title Verified' : 'Pending Verification'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => toggleStatus(p.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                            p.status === 'verified'
                              ? 'border-rose-200 text-rose-600 bg-rose-50 hover:bg-rose-100'
                              : 'border-emerald-200 text-emerald-600 bg-emerald-50 hover:bg-emerald-100'
                          }`}
                        >
                          {p.status === 'verified' ? 'Revoke Status' : 'Approve & Verify'}
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
