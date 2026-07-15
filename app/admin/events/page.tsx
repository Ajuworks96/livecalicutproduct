'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { AdminHeader } from '@/components/admin/admin-header';
import { Card } from '@/components/ui/card';
import { Calendar, Plus, Search, MapPin, CheckCircle2, Clock } from 'lucide-react';

export default function AdminEventsPage() {
  const [search, setSearch] = useState('');

  const [eventsList, setEventsList] = useState([
    { id: '1', title: 'Malabar Literature & Cultural Fest 2026', venue: 'Calicut Beach Freedom Square', date: 'Jul 28 - Jul 30, 2026', organizer: 'Kozhikode Cultural Society', status: 'published' },
    { id: '2', title: 'Cyberpark Tech Innovation Summit', venue: 'Cyberpark Convention Hall', date: 'Aug 05, 2026', organizer: 'Malabar IT Association', status: 'published' },
    { id: '3', title: 'Beypore Water Fest & Boat Race', venue: 'Beypore Marina Harbour', date: 'Aug 14, 2026', organizer: 'Tourism Promotion Council', status: 'pending' },
  ]);

  const toggleStatus = (id: string) => {
    setEventsList(eventsList.map((e) => (e.id === id ? { ...e, status: e.status === 'published' ? 'pending' : 'published' } : e)));
  };

  const filteredEvents = eventsList.filter((e) => e.title.toLowerCase().includes(search.toLowerCase()) || e.venue.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#111827]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Cultural Events' }]} />

        <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight font-sans flex items-center gap-2">
                <Calendar className="w-7 h-7 text-[#2563EB]" />
                <span>Kozhikode Cultural Events Desk</span>
              </h1>
              <p className="text-sm text-[#6B7280]">Approve cultural programs, literary fests, and community schedules across Calicut</p>
            </div>

            <button className="h-[40px] px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 shrink-0">
              <Plus className="w-4 h-4" /> Create City Event
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
                placeholder="Search event title or venue..."
                className="w-full pl-10 pr-4 h-[38px] rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] text-xs text-[#111827] focus:bg-white focus:border-[#2563EB] focus:outline-none"
              />
            </div>
            <span className="text-xs font-bold text-[#6B7280]">Total Events: {filteredEvents.length}</span>
          </Card>

          {/* Events Table Card */}
          <Card className="p-0 border border-[#E5E7EB] bg-white rounded-3xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E7EB] bg-[#F8FAFC] text-[11px] font-extrabold text-[#6B7280] uppercase tracking-wider">
                    <th className="py-3.5 px-6">Event Name / Organizer</th>
                    <th className="py-3.5 px-4">Venue</th>
                    <th className="py-3.5 px-4">Schedule Dates</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-6 text-right">Moderation Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB] text-xs">
                  {filteredEvents.map((e) => (
                    <tr key={e.id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-4 px-6 font-semibold">
                        <p className="font-bold text-[#111827] font-sans">{e.title}</p>
                        <p className="text-[11px] text-[#6B7280]">{e.organizer}</p>
                      </td>
                      <td className="py-4 px-4 text-[#4B5563] font-medium">{e.venue}</td>
                      <td className="py-4 px-4 font-bold text-[#2563EB]">{e.date}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            e.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {e.status === 'published' ? 'Live Published' : 'Pending Review'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => toggleStatus(e.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                            e.status === 'published'
                              ? 'border-rose-200 text-rose-600 bg-rose-50 hover:bg-rose-100'
                              : 'border-emerald-200 text-emerald-600 bg-emerald-50 hover:bg-emerald-100'
                          }`}
                        >
                          {e.status === 'published' ? 'Unpublish' : 'Approve & Publish'}
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
