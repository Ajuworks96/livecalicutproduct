'use client';

import React, { useState } from 'react';
import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { AdminHeader } from '@/components/admin/admin-header';
import { Card } from '@/components/ui/card';
import { Newspaper, Plus, Search, Trash2, Edit3, Newspaper as NewsIcon } from 'lucide-react';

export default function AdminNewsPage() {
  const [search, setSearch] = useState('');

  const [newsArticles, setNewsArticles] = useState([
    { id: '1', title: 'Calicut Beach Waterfront Renovation Project Approved by Municipal Corporation', category: 'Civic Infrastructure', author: 'LiveCalicut Editorial', publishedAt: 'Today, 09:30 AM', status: 'published' },
    { id: '2', title: 'Cyberpark Phase 2 Hiring Drive: 500+ Tech Vacancies Open', category: 'IT & Economy', author: 'Cyberpark Desk', publishedAt: 'Yesterday', status: 'published' },
    { id: '3', title: 'Heritage SM Street Merchant Cultural Fest Scheduled for Next Weekend', category: 'Culture & Tourism', author: 'Civic Editor', publishedAt: 'Draft', status: 'draft' },
  ]);

  const archiveArticle = (id: string) => {
    setNewsArticles(newsArticles.filter((n) => n.id !== id));
  };

  const filteredNews = newsArticles.filter((n) => n.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-[#111827]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader breadcrumbs={[{ label: 'Admin', href: '/admin' }, { label: 'News & Editorial' }]} />

        <main className="flex-1 p-6 lg:p-8 space-y-6 overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight font-sans flex items-center gap-2">
                <Newspaper className="w-7 h-7 text-[#2563EB]" />
                <span>Kozhikode News & Editorial Desk</span>
              </h1>
              <p className="text-sm text-[#6B7280]">Publish civic announcements, manage local breaking news, and curate editorial features</p>
            </div>

            <button className="h-[40px] px-4 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 shrink-0">
              <Plus className="w-4 h-4" /> Write New Article
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
                placeholder="Search headline..."
                className="w-full pl-10 pr-4 h-[38px] rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] text-xs text-[#111827] focus:bg-white focus:border-[#2563EB] focus:outline-none"
              />
            </div>
            <span className="text-xs font-bold text-[#6B7280]">Articles: {filteredNews.length}</span>
          </Card>

          {/* News Table Card */}
          <Card className="p-0 border border-[#E5E7EB] bg-white rounded-3xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E7EB] bg-[#F8FAFC] text-[11px] font-extrabold text-[#6B7280] uppercase tracking-wider">
                    <th className="py-3.5 px-6">Headline / Category</th>
                    <th className="py-3.5 px-4">Author</th>
                    <th className="py-3.5 px-4">Published Date</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-6 text-right">Editorial Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB] text-xs">
                  {filteredNews.map((n) => (
                    <tr key={n.id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-4 px-6 font-semibold">
                        <p className="font-bold text-[#111827] font-sans">{n.title}</p>
                        <p className="text-[11px] text-[#6B7280]">{n.category}</p>
                      </td>
                      <td className="py-4 px-4 text-[#4B5563] font-medium">{n.author}</td>
                      <td className="py-4 px-4 text-[#6B7280] font-medium">{n.publishedAt}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            n.status === 'published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {n.status === 'published' ? 'Live Story' : 'Draft'}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-2">
                        <button
                          onClick={() => archiveArticle(n.id)}
                          className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 bg-rose-50 hover:bg-rose-100 text-xs font-bold transition-all inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Archive Story
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
