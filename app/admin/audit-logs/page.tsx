'use client';

import React from 'react';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { AdminHeader } from '@/components/admin/admin-header';
import { Card } from '@/components/ui/card';
import { ShieldCheck, Clock, Shield } from 'lucide-react';

export default function AdminAuditLogsPage() {
  const auditLogs = [
    { id: '1', timestamp: '2026-07-14 15:30:12', actor: 'Arjun K. Varma (Super Admin)', action: 'ROLE_UPDATE', target: 'Assigned Merchant Role to User #102', ip: '192.168.20.4' },
    { id: '2', timestamp: '2026-07-14 14:12:00', actor: 'K. V. Moideenkutty (Moderator)', action: 'OUTLET_VERIFIED', target: 'Physical check verified: Paragon Restaurant', ip: '117.204.12.8' },
    { id: '3', timestamp: '2026-07-14 11:45:33', actor: 'Dr. Faisal Rahman (City Admin)', action: 'NEWS_PUBLISHED', target: 'Published: Cyberpark Expansion Phase 2', ip: '117.204.88.19' },
    { id: '4', timestamp: '2026-07-14 09:20:05', actor: 'System Engine', action: 'SNAPSHOT_GENERATE', target: 'Database automated WAL snapshot completed in 18ms', ip: '10.0.0.1' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#111827]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Audit Trail Logs' }]} />

        <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight font-sans flex items-center gap-2">
              <ShieldCheck className="w-7 h-7 text-[#2563EB]" />
              <span>Platform Administrative Audit Trail</span>
            </h1>
            <p className="text-sm text-[#6B7280]">Immutable system activity logs tracking role changes, approvals, and security events</p>
          </div>

          <Card className="p-0 border border-[#E5E7EB] bg-white rounded-3xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E7EB] bg-[#F8FAFC] text-[11px] font-extrabold text-[#6B7280] uppercase tracking-wider">
                    <th className="py-3.5 px-6">Timestamp</th>
                    <th className="py-3.5 px-4">Administrative Actor</th>
                    <th className="py-3.5 px-4">Event Code</th>
                    <th className="py-3.5 px-6">Target Activity / Detail</th>
                    <th className="py-3.5 px-4">IP Address</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB] text-xs">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-4 px-6 text-[#6B7280] font-mono">{log.timestamp}</td>
                      <td className="py-4 px-4 font-bold text-[#111827]">{log.actor}</td>
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563EB] text-[10px] font-mono font-bold border border-blue-200">
                          {log.action}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-[#4B5563] font-medium">{log.target}</td>
                      <td className="py-4 px-4 text-[#6B7280] font-mono text-[11px]">{log.ip}</td>
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
