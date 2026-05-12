import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, ArrowDownRight, Calendar, LogIn, LogOut, BedDouble, DollarSign, Wrench } from "lucide-react";
import { formatRupiah, rooms } from "@/lib/data";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "Dashboard — Stayly Admin" }] }),
  component: Dashboard,
});

const stats = [
  { label: "Total Booking", value: "284", change: "+12.5%", up: true, icon: Calendar },
  { label: "Check-in Hari Ini", value: "18", change: "+3", up: true, icon: LogIn },
  { label: "Check-out Hari Ini", value: "12", change: "-2", up: false, icon: LogOut },
  { label: "Kamar Tersedia", value: "24/40", change: "60%", up: true, icon: BedDouble },
];

function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Selamat datang kembali 👋</h1>
          <p className="mt-1 text-sm text-muted-foreground">Ringkasan operasional Stayly Resort hari ini</p>
        </div>
        <div className="rounded-xl border border-border bg-card px-4 py-2 text-sm">
          <span className="text-muted-foreground">Hari ini, </span>
          <span className="font-semibold">12 Mei 2026</span>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-card p-5 shadow-[var(--shadow-card)]">
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <s.icon className="h-5 w-5" />
              </div>
              <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${s.up ? "text-accent" : "text-destructive"}`}>
                {s.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {s.change}
              </span>
            </div>
            <div className="mt-4 text-2xl font-bold">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Revenue + activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)] lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold">Pendapatan</h3>
              <p className="text-xs text-muted-foreground">Mei 2026</p>
            </div>
            <div className="flex gap-1 rounded-lg bg-secondary p-1 text-xs">
              {["7H", "30H", "12B"].map((t, i) => (
                <button key={t} className={`rounded-md px-3 py-1 font-medium ${i === 1 ? "bg-card shadow-sm" : "text-muted-foreground"}`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="mt-4 flex items-end gap-6">
            <div>
              <div className="text-3xl font-bold">{formatRupiah(186400000)}</div>
              <div className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-accent">
                <ArrowUpRight className="h-3 w-3" /> +18.2% vs bulan lalu
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              Hari ini: <span className="font-semibold text-foreground">{formatRupiah(8420000)}</span>
            </div>
          </div>
          {/* Mini chart */}
          <div className="mt-6 flex h-44 items-end gap-2">
            {[42, 68, 55, 78, 90, 72, 85, 95, 60, 88, 100, 76, 92, 70].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-lg bg-gradient-to-t from-accent/30 to-accent" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]">
          <h3 className="text-base font-bold">Aktivitas Terbaru</h3>
          <ul className="mt-4 space-y-4">
            {[
              { i: LogIn, t: "Check-in Budi S.", s: "Deluxe Room · 12:30", c: "text-accent" },
              { i: DollarSign, t: "Pembayaran diterima", s: "STY-002 · Rp 3.6jt", c: "text-accent" },
              { i: Wrench, t: "Lapor kerusakan", s: "Kamar 204 · AC", c: "text-warning" },
              { i: LogOut, t: "Check-out selesai", s: "STY-008 · 10:15", c: "text-muted-foreground" },
            ].map((a, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-secondary ${a.c}`}>
                  <a.i className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{a.t}</div>
                  <div className="text-xs text-muted-foreground">{a.s}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent bookings */}
      <div className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold">Booking Terbaru</h3>
          <button className="text-xs font-semibold text-accent">Lihat semua</button>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase text-muted-foreground">
                <th className="pb-3 font-semibold">Booking</th>
                <th className="pb-3 font-semibold">Tamu</th>
                <th className="pb-3 font-semibold">Kamar</th>
                <th className="pb-3 font-semibold">Tanggal</th>
                <th className="pb-3 font-semibold">Total</th>
                <th className="pb-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[
                { id: "STY-284", tamu: "Anisa Putri", roomI: 0, date: "12 Mei", status: "Check-in", color: "bg-accent/10 text-accent" },
                { id: "STY-283", tamu: "Rizki Hadi", roomI: 1, date: "12 Mei", status: "Dikonfirmasi", color: "bg-blue-100 text-blue-700" },
                { id: "STY-282", tamu: "Maya Sari", roomI: 3, date: "13 Mei", status: "Menunggu Bayar", color: "bg-warning/15 text-warning" },
                { id: "STY-281", tamu: "Doni Pratama", roomI: 2, date: "11 Mei", status: "Check-out", color: "bg-secondary text-muted-foreground" },
              ].map((b) => (
                <tr key={b.id} className="hover:bg-secondary/40">
                  <td className="py-4 font-mono text-xs font-semibold">{b.id}</td>
                  <td className="py-4 font-medium">{b.tamu}</td>
                  <td className="py-4 text-muted-foreground">{rooms[b.roomI].name}</td>
                  <td className="py-4 text-muted-foreground">{b.date}</td>
                  <td className="py-4 font-semibold">{formatRupiah(rooms[b.roomI].price * 2)}</td>
                  <td className="py-4">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${b.color}`}>{b.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
