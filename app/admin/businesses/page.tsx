'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { AdminHeader } from '@/components/admin/admin-header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Store, ShieldCheck, Star, Search, Plus, Filter, CheckCircle2, XCircle } from 'lucide-react';

export default function AdminBusinessesPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [outlets, setOutlets] = useState([
    { id: '1', name: 'Paragon Restaurant', category: 'Dining & Malabar Cuisine', location: 'Mavoor Road Junction', status: 'verified', featured: true, physicalCheck: true },
    { id: '2', name: 'Aster MIMS Hospital', category: 'Healthcare & Multispecialty', location: 'Govindapuram', status: 'verified', featured: true, physicalCheck: true },
    { id: '3', name: 'Malabar Culinary Hub', category: 'Dining & Sweets', location: 'SM Street Mittai Theruvu', status: 'pending', featured: false, physicalCheck: false },
    { id: '4', name: 'Cyberpark Tech Studios', category: 'IT Software Solutions', location: 'Cyberpark Phase 1', status: 'verified', featured: false, physicalCheck: true },
    { id: '5', name: 'Jayalakshmi Silks', category: 'Textiles & Bridal Wear', location: 'Kallai Road, Palayam', status: 'verified', featured: true, physicalCheck: true },
  ]);

  const toggleFeatured = (id: string) => {
    setOutlets(outlets.map((o) => (o.id === id ? { ...o, featured: !o.featured } : o)));
  };

  const updateStatus = (id: string, newStatus: string) => {
    setOutlets(outlets.map((o) => (o.id === id ? { ...o, status: newStatus, physicalCheck: newStatus === 'verified' } : o)));
  };

  const filteredOutlets = outlets.filter((o) => {
    const matchesSearch = o.name.toLowerCase().includes(search.toLowerCase()) || o.location.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#111827]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Commercial Outlets' }]} />

        <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight font-sans flex items-center gap-2">
                <Store className="w-7 h-7 text-[#2563EB]" />
                <span>Commercial Directory Governance</span>
              </h1>
              <p className="text-sm text-[#6B7280]">Verify physical ward locations, approve merchant claims, and manage featured store listings</p>
            </div>

            <button className="h-[40px] px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 shrink-0">
              <Plus className="w-4 h-4" /> Add Verified Outlet
            </button>
          </div>

          {/* Search & Status Filter */}
          <Card className="p-4 border border-[#E5E7EB] bg-white rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#6B7280] pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search commercial outlet by name..."
                className="w-full pl-10 pr-4 h-[38px] rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] text-xs text-[#111827] focus:bg-white focus:border-[#2563EB] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <Filter className="w-4 h-4 text-[#6B7280]" />
              <span className="font-bold text-[#111827]">Verification Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-[38px] px-3 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] text-xs font-semibold text-[#111827] focus:outline-none"
              >
                <option value="All">All Outlets</option>
                <option value="verified">Verified Outlets</option>
                <option value="pending">Pending Review</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </Card>

          {/* Outlets Table Card */}
          <Card className="p-0 border border-[#E5E7EB] bg-white rounded-3xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E7EB] bg-[#F8FAFC] text-[11px] font-extrabold text-[#6B7280] uppercase tracking-wider">
                    <th className="py-3.5 px-6">Business Name / Category</th>
                    <th className="py-3.5 px-4">Ward Location</th>
                    <th className="py-3.5 px-4">Verification Check</th>
                    <th className="py-3.5 px-4">Featured Status</th>
                    <th className="py-3.5 px-6 text-right">Moderation Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB] text-xs">
                  {filteredOutlets.map((o) => (
                    <tr key={o.id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-4 px-6 font-semibold">
                        <p className="font-bold text-[#111827] font-sans">{o.name}</p>
                        <p className="text-[11px] text-[#6B7280]">{o.category}</p>
                      </td>
                      <td className="py-4 px-4 text-[#4B5563] font-medium">{o.location}</td>
                      <td className="py-4 px-4">
                        {o.status === 'verified' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[11px] font-bold">
                            <ShieldCheck className="w-3.5 h-3.5" /> 100% Ward Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
                            Pending Physical Check
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <button
                          onClick={() => toggleFeatured(o.id)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all border ${
                            o.featured
                              ? 'bg-blue-50 border-blue-200 text-[#2563EB]'
                              : 'bg-slate-50 border-[#E5E7EB] text-[#6B7280] hover:text-[#111827]'
                          }`}
                        >
                          <Star className={`w-3.5 h-3.5 ${o.featured ? 'fill-[#2563EB]' : ''}`} />
                          <span>{o.featured ? 'Featured Store' : 'Standard Listing'}</span>
                        </button>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        {o.status === 'pending' ? (
                          <button
                            onClick={() => updateStatus(o.id, 'verified')}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all inline-flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Approve & Verify
                          </button>
                        ) : (
                          <button
                            onClick={() => updateStatus(o.id, 'pending')}
                            className="px-3 py-1.5 rounded-xl border border-[#E5E7EB] bg-white hover:bg-slate-50 text-[#6B7280] text-xs font-bold transition-all"
                          >
                            Revoke Badge
                          </button>
                        )}
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
