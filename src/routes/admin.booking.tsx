import { createFileRoute } from "@tanstack/react-router";
import { Plus, FileText, QrCode, Filter } from "lucide-react";
import { PageHeader } from "./admin.tipe-kamar";
import { rooms, formatRupiah } from "@/lib/data";

export const Route = createFileRoute("/admin/booking")({
  head: () => ({ meta: [{ title: "Booking — Admin" }] }),
  component: BookingPage,
});

const tabs = ["Semua", "Menunggu", "Dikonfirmasi", "Check-in", "Check-out", "Dibatalkan"];
const data = Array.from({ length: 8 }).map((_, i) => ({
  id: `STY-2860${i}`,
  tamu: ["Budi S.", "Anisa P.", "Rizki H.", "Maya S.", "Doni P.", "Tania W.", "Reza A.", "Putri N."][i],
  room: rooms[i % rooms.length],
  date: `${10 + i} – ${13 + i} Mei`,
  status: ["Menunggu", "Dikonfirmasi", "Check-in", "Check-out", "Dikonfirmasi", "Menunggu", "Check-in", "Dikonfirmasi"][i],
}));
const statusColor: Record<string, string> = {
  "Menunggu": "bg-warning/15 text-warning",
  "Dikonfirmasi": "bg-blue-100 text-blue-700",
  "Check-in": "bg-accent/10 text-accent",
  "Check-out": "bg-secondary text-muted-foreground",
};

function BookingPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Booking" desc="Kelola semua reservasi">
        <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium"><Filter className="h-4 w-4" />Filter</button>
        <button className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground"><Plus className="h-4 w-4" />Booking Walk-in</button>
      </PageHeader>

      <div className="rounded-2xl bg-card p-5 shadow-[var(--shadow-card)]">
        <div className="flex flex-wrap gap-2 border-b border-border pb-4">
          {tabs.map((t, i) => (
            <button key={t} className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${i === 0 ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>{t}</button>
          ))}
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase text-muted-foreground">
                <th className="pb-3 font-semibold">Booking ID</th>
                <th className="pb-3 font-semibold">Tamu</th>
                <th className="pb-3 font-semibold">Tipe Kamar</th>
                <th className="pb-3 font-semibold">Tanggal</th>
                <th className="pb-3 font-semibold">Total</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.map((b) => (
                <tr key={b.id} className="hover:bg-secondary/40">
                  <td className="py-3.5 font-mono text-xs font-bold">{b.id}</td>
                  <td className="py-3.5 font-medium">{b.tamu}</td>
                  <td className="py-3.5 text-muted-foreground">{b.room.name}</td>
                  <td className="py-3.5 text-muted-foreground">{b.date}</td>
                  <td className="py-3.5 font-semibold">{formatRupiah(b.room.price * 3)}</td>
                  <td className="py-3.5"><span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusColor[b.status]}`}>{b.status}</span></td>
                  <td className="py-3.5">
                    <div className="flex justify-end gap-1.5">
                      <button className="rounded-lg border border-border p-1.5"><QrCode className="h-3.5 w-3.5" /></button>
                      <button className="rounded-lg border border-border p-1.5"><FileText className="h-3.5 w-3.5" /></button>
                    </div>
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
