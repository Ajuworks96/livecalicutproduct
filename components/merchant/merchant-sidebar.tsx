'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LiveCalicutLogo } from '@/components/shared/live-calicut-logo';
import {
  LayoutDashboard,
  Store,
  Briefcase,
  ShoppingBag,
  Building,
  Calendar,
  MessageSquare,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  ArrowLeft,
  Sparkles,
  Tag,
} from 'lucide-react';

export const MerchantSidebar: React.FC = () => {
  const pathname = usePathname();

  const navGroups = [
    {
      group: 'WORKSPACE',
      items: [
        { label: 'Merchant Dashboard', href: '/merchant', icon: LayoutDashboard },
        { label: 'Store Analytics', href: '/merchant/analytics', icon: BarChart3 },
        { label: 'Customer Leads CRM', href: '/merchant/leads', icon: Users },
      ],
    },
    {
      group: 'STOREFRONT & MODULES',
      items: [
        { label: 'Business Profile', href: '/merchant/profile', icon: Store },
        { label: 'Post IT/Local Jobs', href: '/merchant/jobs', icon: Briefcase },
        { label: 'Classifieds Items', href: '/merchant/marketplace', icon: ShoppingBag },
        { label: 'Real Estate Listings', href: '/merchant/properties', icon: Building },
        { label: 'Events & Sales', href: '/merchant/events', icon: Calendar },
        { label: 'Special Offers & Deals', href: '/merchant/offers', icon: Tag },
      ],
    },
    {
      group: 'ENGAGEMENT & BILLING',
      items: [
        { label: 'Customer Reviews', href: '/merchant/reviews', icon: MessageSquare },
        { label: 'Subscription Plan', href: '/merchant/subscription', icon: CreditCard },
        { label: 'Merchant Settings', href: '/merchant/settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside className="w-64 shrink-0 bg-white border-r border-[#E5E7EB] min-h-screen p-4 space-y-6 flex flex-col justify-between shadow-xs">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="px-2 py-2 border-b border-[#E5E7EB] pb-4">
          <div className="flex items-center gap-2">
            <LiveCalicutLogo showSubtitle={false} />
          </div>
          <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-extrabold text-emerald-700 tracking-wide uppercase font-sans">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>Verified Merchant OS</span>
          </div>
        </div>

        {/* Grouped Sidebar Navigation */}
        <div className="space-y-6">
          {navGroups.map((group) => (
            <div key={group.group} className="space-y-1.5">
              <h5 className="px-3 text-[10px] font-extrabold text-[#9CA3AF] tracking-widest uppercase font-sans">
                {group.group}
              </h5>
              <nav className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-[#2563EB] text-white shadow-md shadow-blue-500/20'
                          : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F8FAFC]'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Exit Control Center Shortcut */}
      <div className="pt-4 border-t border-[#E5E7EB]">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 text-xs text-[#6B7280] hover:text-[#111827] font-bold hover:bg-[#F8FAFC] rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-[#2563EB]" />
          <span>Exit to Public Portal</span>
        </Link>
      </div>
    </aside>
  );
};
