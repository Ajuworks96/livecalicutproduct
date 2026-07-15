import { AdminSidebar } from '@/components/admin/admin-sidebar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Plus } from 'lucide-react';

export default function AdminCitiesPage() {
  const cities = [
    { id: '1', name: 'Kozhikode (Calicut)', state: 'Kerala', status: 'Active Operating City', wards: 18 },
    { id: '2', name: 'Kochi (Cochin)', state: 'Kerala', status: 'Expansion Prepared', wards: 0 },
    { id: '3', name: 'Trivandrum', state: 'Kerala', status: 'Expansion Prepared', wards: 0 },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <AdminSidebar />
      <main className="flex-1 p-8 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-black text-white">Cities & Regional Bounds</h1>
            <p className="text-xs text-slate-400">Configure multi-city tenant structures and municipal ward zones.</p>
          </div>

          <button className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all flex items-center gap-1.5">
            <Plus className="w-4 h-4" /> Add New City Tenant
          </button>
        </div>

        <div className="space-y-3">
          {cities.map((c) => (
            <Card key={c.id} className="p-4 border border-slate-800 bg-slate-900 flex items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white">{c.name}, {c.state}</h4>
                <p className="text-xs text-slate-400">{c.wards > 0 ? `${c.wards} Municipal Areas Configured` : 'Target Expansion Node'}</p>
              </div>

              <Badge variant={c.status.includes('Active') ? 'success' : 'purple'}>
                {c.status}
              </Badge>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
