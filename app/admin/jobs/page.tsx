'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { AdminHeader } from '@/components/admin/admin-header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Plus, Search, CheckCircle2, XCircle, Building2, MapPin } from 'lucide-react';

export default function AdminJobsPage() {
  const [search, setSearch] = useState('');

  const [jobsList, setJobsList] = useState([
    { id: '1', title: 'Senior React & Fullstack Engineer', company: 'Cyberpark Software Solutions', location: 'Cyberpark Phase 1', salary: '₹65k - ₹95k / mo', status: 'published', type: 'Full Time' },
    { id: '2', title: 'Retail Operations Store Manager', company: 'Hilite Mall Outlets', location: 'Thondayad Bypass', salary: '₹28k - ₹38k / mo', status: 'published', type: 'Walk-In' },
    { id: '3', title: 'Lead DevOps Cloud Specialist', company: 'TechPark Innovations', location: 'Cyberpark Phase 2', salary: '₹80k - ₹120k / mo', status: 'pending', type: 'Full Time' },
  ]);

  const toggleJobStatus = (id: string) => {
    setJobsList(jobsList.map((j) => (j.id === id ? { ...j, status: j.status === 'published' ? 'closed' : 'published' } : j)));
  };

  const filteredJobs = jobsList.filter((j) => j.title.toLowerCase().includes(search.toLowerCase()) || j.company.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#111827]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Cyberpark Jobs' }]} />

        <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight font-sans flex items-center gap-2">
                <Briefcase className="w-7 h-7 text-[#2563EB]" />
                <span>Cyberpark & Local IT Jobs Desk</span>
              </h1>
              <p className="text-sm text-[#6B7280]">Approve tech vacancies, verify Cyberpark corporate listings, and manage walk-in drives</p>
            </div>

            <button className="h-[40px] px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 shrink-0">
              <Plus className="w-4 h-4" /> Post New Job Opening
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
                placeholder="Search job title or IT company..."
                className="w-full pl-10 pr-4 h-[38px] rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] text-xs text-[#111827] focus:bg-white focus:border-[#2563EB] focus:outline-none"
              />
            </div>
            <span className="text-xs font-bold text-[#6B7280]">Showing {filteredJobs.length} Vacancies</span>
          </Card>

          {/* Jobs Table Card */}
          <Card className="p-0 border border-[#E5E7EB] bg-white rounded-3xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E7EB] bg-[#F8FAFC] text-[11px] font-extrabold text-[#6B7280] uppercase tracking-wider">
                    <th className="py-3.5 px-6">Position / Company</th>
                    <th className="py-3.5 px-4">Location</th>
                    <th className="py-3.5 px-4">Compensation</th>
                    <th className="py-3.5 px-4">Job Type</th>
                    <th className="py-3.5 px-6 text-right">Moderation Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB] text-xs">
                  {filteredJobs.map((j) => (
                    <tr key={j.id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-4 px-6 font-semibold">
                        <p className="font-bold text-[#111827] font-sans">{j.title}</p>
                        <p className="text-[11px] text-[#6B7280] flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-[#2563EB]" /> {j.company}
                        </p>
                      </td>
                      <td className="py-4 px-4 text-[#4B5563] font-medium">{j.location}</td>
                      <td className="py-4 px-4 text-emerald-600 font-extrabold">{j.salary}</td>
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] text-[11px] font-bold border border-blue-200">
                          {j.type}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => toggleJobStatus(j.id)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                            j.status === 'published'
                              ? 'border-rose-200 text-rose-600 bg-rose-50 hover:bg-rose-100'
                              : 'border-emerald-200 text-emerald-600 bg-emerald-50 hover:bg-emerald-100'
                          }`}
                        >
                          {j.status === 'published' ? 'Close Opening' : 'Publish Opening'}
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
