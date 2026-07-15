'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { AdminHeader } from '@/components/admin/admin-header';
import { Card } from '@/components/ui/card';
import { Flag, CheckCircle2, Trash2, ShieldAlert } from 'lucide-react';

export default function AdminReportsPage() {
  const [reports, setReports] = useState([
    { id: '1', itemType: 'Review', title: 'Inaccurate rating on Zamorin Heritage Resort', reporter: 'Citizen #402', reason: 'Spam / Off-topic content', status: 'Pending' },
    { id: '2', itemType: 'Classifieds Item', title: 'Suspicious motor bike listing price', reporter: 'Citizen #108', reason: 'Unverified seller details', status: 'Pending' },
  ]);

  const dismissReport = (id: string) => {
    setReports(reports.filter((r) => r.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#111827]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Moderation Flags' }]} />

        <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight font-sans flex items-center gap-2">
              <Flag className="w-7 h-7 text-rose-600" />
              <span>Moderation & Content Safety Queue</span>
            </h1>
            <p className="text-sm text-[#6B7280]">Review user report flags, moderate inappropriate reviews, or issue account warnings</p>
          </div>

          <div className="space-y-4">
            {reports.map((rep) => (
              <Card key={rep.id} className="p-6 border border-rose-200 bg-white rounded-3xl shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider">
                    {rep.itemType} Flag
                  </span>
                  <span className="text-xs text-[#6B7280]">Reported by {rep.reporter}</span>
                </div>

                <div className="space-y-1">
                  <h4 className="text-base font-bold text-[#111827] font-sans">{rep.title}</h4>
                  <p className="text-xs font-medium text-rose-600">Reason: {rep.reason}</p>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    onClick={() => dismissReport(rep.id)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Approve & Dismiss Flag
                  </button>
                  <button
                    onClick={() => dismissReport(rep.id)}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <Trash2 className="w-4 h-4" /> Delete Content
                  </button>
                </div>
              </Card>
            ))}

            {reports.length === 0 && (
              <Card className="p-12 text-center space-y-3 border border-[#E5E7EB] bg-white rounded-3xl">
                <ShieldAlert className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-[#111827]">Zero Pending Moderation Flags</h3>
                <p className="text-xs text-[#6B7280]">All citizen reports across Kozhikode wards have been resolved!</p>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
