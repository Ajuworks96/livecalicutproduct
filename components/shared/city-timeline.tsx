import React from 'react';
import { Newspaper, Calendar, MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const CityTimeline: React.FC = () => {
  const highlights = [
    {
      time: '09:30 AM Today',
      type: 'News Editorial',
      icon: Newspaper,
      title: 'Kozhikode Beach Promenade Renovation Completed',
      summary: ' eco-friendly lighting & expanded seating installed along the main beach stretch for evening visitors.',
      badge: 'Infrastructure',
      href: '/news',
    },
    {
      time: '11:15 AM Today',
      type: 'Cyberpark Expansion',
      icon: Calendar,
      title: 'Cyberpark Phase 2 Hiring Drive Announced',
      summary: 'Over 2,000 new software development and AI engineering positions opening in Hilite IT tower.',
      badge: 'Cyberpark IT',
      href: '/jobs',
    },
    {
      time: '04:00 PM Today',
      type: 'Cultural Festival',
      icon: MapPin,
      title: 'Malabar Literature & Heritage Fest Passes Live',
      summary: 'Annual gathering of authors, poets, and cultural experts scheduled at Mananchira Square.',
      badge: 'City Events',
      href: '/events',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="relative border-l-2 border-blue-200 ml-4 lg:ml-8 pl-6 lg:pl-10 space-y-8">
        {highlights.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="relative group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[31px] lg:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-[#2563EB] flex items-center justify-center shadow-xs">
                <div className="w-2 h-2 rounded-full bg-[#2563EB]" />
              </div>

              <div className="surface-card p-6 space-y-3 transition-all duration-200 group-hover:-translate-y-1">
                <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                  <span className="font-bold text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                    {item.time}
                  </span>
                  <span className="text-[11px] font-extrabold text-[#6B7280] uppercase tracking-wider">
                    {item.type}
                  </span>
                </div>

                <h4 className="text-[20px] font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors font-sans">
                  {item.title}
                </h4>

                <p className="text-[15px] text-[#6B7280] leading-relaxed font-normal">
                  {item.summary}
                </p>

                <div className="pt-2 flex items-center justify-end">
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 text-[13px] font-bold text-[#2563EB] hover:underline"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
