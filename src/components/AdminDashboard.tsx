"use client";
import { TrendingUp, Users, XCircle, DollarSign } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "1", income: 4000, clients: 24 },
  { name: "2", income: 3000, clients: 18 },
  { name: "3", income: 2000, clients: 12 },
  { name: "4", income: 2780, clients: 16 },
  { name: "5", income: 1890, clients: 10 },
  { name: "6", income: 6390, clients: 38 },
  { name: "7", income: 5490, clients: 32 },
];

export default function AdminDashboard({ t }: { t: any }) {
  return (
    <div className="flex flex-col h-full w-full p-6 animate-in slide-in-from-bottom-4 duration-500 overflow-y-auto hide-scrollbar">
      <div className="mb-6 mt-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {t.adminTitle}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t.adminSubtitle}
          </p>
        </div>
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
          <TrendingUp className="w-5 h-5 text-primary" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-card border border-border p-4 rounded-2xl shadow-sm">
          <div className="flex items-center text-muted-foreground mb-2">
            <Users className="w-4 h-4 mr-2" />
            <span className="text-xs font-medium">{t.adminClients}</span>
          </div>
          <p className="text-2xl font-bold text-foreground">150</p>
          <p className="text-[10px] text-green-500 mt-1 font-medium">{t.adminGrowth}</p>
        </div>
        
        <div className="bg-card border border-border p-4 rounded-2xl shadow-sm">
          <div className="flex items-center text-muted-foreground mb-2">
            <XCircle className="w-4 h-4 mr-2 text-destructive" />
            <span className="text-xs font-medium">{t.adminCancel}</span>
          </div>
          <p className="text-2xl font-bold text-foreground">3</p>
          <p className="text-[10px] text-destructive mt-1 font-medium">{t.adminDrop}</p>
        </div>
        
        <div className="bg-primary/10 border border-primary/20 p-4 rounded-2xl shadow-sm col-span-2">
          <div className="flex items-center text-primary mb-2">
            <DollarSign className="w-4 h-4 mr-2" />
            <span className="text-xs font-medium uppercase tracking-wider">{t.adminIncome}</span>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-3xl font-bold text-foreground">$2,450</p>
            <p className="text-sm text-primary font-medium mb-1">+24%</p>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-bold text-foreground mb-4">{t.adminChartTitle}</h3>
        <div className="h-64 bg-card border border-border rounded-2xl p-4 pt-6 shadow-sm relative">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#8A8F98" }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#8A8F98" }} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#121212", borderColor: "rgba(255,255,255,0.08)", borderRadius: "12px", fontSize: "12px" }}
                itemStyle={{ color: "#D4AF37", fontWeight: "bold" }}
                labelStyle={{ color: "#8A8F98", marginBottom: "4px" }}
              />
              <Area type="monotone" dataKey="income" stroke="#D4AF37" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
