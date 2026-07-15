'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { AdminHeader } from '@/components/admin/admin-header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FolderTree, Plus, Search, Layers } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [search, setSearch] = useState('');

  const [categories, setCategories] = useState([
    { id: '1', module: 'Commercial Outlets', name: 'Restaurants & Malabar Dining', count: 1240, slug: 'dining-malabar' },
    { id: '2', module: 'Cyberpark Jobs', name: 'Software Engineering & IT', count: 5200, slug: 'software-it' },
    { id: '3', module: 'Classifieds Market', name: 'Electronics & Gadgets', count: 480, slug: 'electronics' },
    { id: '4', module: 'Real Estate', name: 'Villas & Residential Plots', count: 840, slug: 'villas-plots' },
    { id: '5', module: 'Commercial Outlets', name: 'Healthcare & 24/7 Labs', count: 850, slug: 'healthcare' },
  ]);

  const filteredCategories = categories.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.module.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#111827]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'Categories Taxonomy' }]} />

        <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight font-sans flex items-center gap-2">
                <FolderTree className="w-7 h-7 text-[#2563EB]" />
                <span>Categories & Taxonomy Tree Manager</span>
              </h1>
              <p className="text-sm text-[#6B7280]">Manage primary categories, subcategory structures, display ordering & icon taxonomy</p>
            </div>

            <button className="h-[40px] px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 shrink-0">
              <Plus className="w-4 h-4" /> Create Category Node
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
                placeholder="Search category node..."
                className="w-full pl-10 pr-4 h-[38px] rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] text-xs text-[#111827] focus:bg-white focus:border-[#2563EB] focus:outline-none"
              />
            </div>
            <span className="text-xs font-bold text-[#6B7280]">Taxonomy Nodes: {filteredCategories.length}</span>
          </Card>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCategories.map((c) => (
              <Card key={c.id} className="p-5 border border-[#E5E7EB] bg-white rounded-2xl shadow-xs space-y-3 hover:border-blue-200 transition-all flex flex-col justify-between">
                <div className="space-y-2">
                  <Badge variant="outline" className="text-[10px] text-[#2563EB] border-blue-200 bg-blue-50 font-bold uppercase">
                    {c.module}
                  </Badge>
                  <h4 className="text-base font-bold text-[#111827] font-sans">{c.name}</h4>
                  <p className="text-[11px] text-[#6B7280] font-mono">slug: /{c.slug}</p>
                </div>

                <div className="pt-2 border-t border-[#E5E7EB] flex items-center justify-between text-xs">
                  <span className="font-bold text-[#2563EB]">{c.count.toLocaleString()} Active Listings</span>
                  <button className="text-[#6B7280] hover:text-[#111827] font-bold">Edit Node</button>
                </div>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
