'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { AdminHeader } from '@/components/admin/admin-header';
import { Card } from '@/components/ui/card';
import { RoleBadge } from '@/components/auth/role-badge';
import { UserRole } from '@/src/store/useAuthStore';
import { Users, Search, UserCheck, UserX, Shield, UserPlus, Filter, KeyRound } from 'lucide-react';

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const [usersList, setUsersList] = useState([
    { id: '1', name: 'Arjun K. Varma', email: 'arjun@livecalicut.in', role: 'Super Admin' as UserRole, status: 'active', ward: 'Ward 12 (Beach)', joined: 'July 2026' },
    { id: '2', name: 'Rashid Parakkal', email: 'rashid@cyberpark.in', role: 'Merchant' as UserRole, status: 'active', ward: 'Ward 8 (Cyberpark)', joined: 'July 2026' },
    { id: '3', name: 'Dr. Faisal Rahman', email: 'faisal@astermims.in', role: 'City Admin' as UserRole, status: 'active', ward: 'Ward 14 (Govindapuram)', joined: 'July 2026' },
    { id: '4', name: 'Anjali Nambiar', email: 'anjali@software.in', role: 'User' as UserRole, status: 'active', ward: 'Ward 3 (Palayam)', joined: 'July 2026' },
    { id: '5', name: 'K. V. Moideenkutty', email: 'moideen@smstreet.in', role: 'Moderator' as UserRole, status: 'active', ward: 'Ward 1 (SM Street)', joined: 'July 2026' },
  ]);

  const toggleStatus = (id: string) => {
    setUsersList(usersList.map((u) => u.id === id ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u));
  };

  const updateRole = (id: string, newRole: UserRole) => {
    setUsersList(usersList.map((u) => u.id === id ? { ...u, role: newRole } : u));
  };

  const filteredUsers = usersList.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#111827]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Users & Roles' }]} />

        <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight font-sans flex items-center gap-2">
                <Users className="w-7 h-7 text-[#2563EB]" />
                <span>User Directory & RBAC Governance</span>
              </h1>
              <p className="text-sm text-[#6B7280]">Manage platform accounts, assign merchant & admin roles, or handle account suspensions</p>
            </div>

            <button className="h-[40px] px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 shrink-0">
              <UserPlus className="w-4 h-4" /> Create User Account
            </button>
          </div>

          {/* Controls Bar: Search & Role Filter */}
          <Card className="p-4 border border-[#E5E7EB] bg-white rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#6B7280] pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search user by name or email..."
                className="w-full pl-10 pr-4 h-[38px] rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] text-xs text-[#111827] focus:bg-white focus:border-[#2563EB] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <Filter className="w-4 h-4 text-[#6B7280]" />
              <span className="font-bold text-[#111827]">Role Filter:</span>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="h-[38px] px-3 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] text-xs font-semibold text-[#111827] focus:outline-none"
              >
                <option value="All">All Roles</option>
                <option value="Super Admin">Super Admin</option>
                <option value="City Admin">City Admin</option>
                <option value="Moderator">Moderator</option>
                <option value="Merchant">Merchant</option>
                <option value="User">User</option>
              </select>
            </div>
          </Card>

          {/* User Table Card */}
          <Card className="p-0 border border-[#E5E7EB] bg-white rounded-3xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E7EB] bg-[#F8FAFC] text-[11px] font-extrabold text-[#6B7280] uppercase tracking-wider">
                    <th className="py-3.5 px-6">User / Email</th>
                    <th className="py-3.5 px-4">Location / Ward</th>
                    <th className="py-3.5 px-4">Assigned Role</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB] text-xs">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-4 px-6 font-semibold">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 text-[#2563EB] font-extrabold flex items-center justify-center">
                            {u.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-bold text-[#111827] font-sans">{u.name}</p>
                            <p className="text-[11px] text-[#6B7280]">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-[#4B5563] font-medium">{u.ward}</td>
                      <td className="py-4 px-4">
                        <select
                          value={u.role}
                          onChange={(e) => updateRole(u.id, e.target.value as UserRole)}
                          className="h-[32px] px-2.5 rounded-lg border border-[#E5E7EB] bg-white text-xs font-bold text-[#111827] focus:border-[#2563EB]"
                        >
                          <option value="User">User</option>
                          <option value="Merchant">Merchant</option>
                          <option value="Moderator">Moderator</option>
                          <option value="City Admin">City Admin</option>
                          <option value="Super Admin">Super Admin</option>
                        </select>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            u.status === 'active'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-rose-100 text-rose-700'
                          }`}
                        >
                          {u.status === 'active' ? 'Active' : 'Suspended'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => toggleStatus(u.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                            u.status === 'active'
                              ? 'border-rose-200 text-rose-600 bg-rose-50 hover:bg-rose-100'
                              : 'border-emerald-200 text-emerald-600 bg-emerald-50 hover:bg-emerald-100'
                          }`}
                        >
                          {u.status === 'active' ? 'Suspend' : 'Activate'}
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
