import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./admin.tipe-kamar";
import { Plus, Zap, Droplet, Wifi, Sparkles, Wrench, Shirt, Users } from "lucide-react";
import { formatRupiah } from "@/lib/data";

export const Route = createFileRoute("/admin/biaya")({
  head: () => ({ meta: [{ title: "Biaya Operasional" }] }),
  component: Biaya,
});

const cats = [
  { i: Zap, l: "Listrik", v: 8500000, c: "bg-warning/15 text-warning" },
  { i: Droplet, l: "Air", v: 2200000, c: "bg-blue-100 text-blue-700" },
  { i: Wifi, l: "Internet", v: 1500000, c: "bg-blue-100 text-blue-700" },
  { i: Sparkles, l: "Kebersihan", v: 3200000, c: "bg-accent/15 text-accent" },
  { i: Wrench, l: "Perbaikan", v: 4500000, c: "bg-destructive/10 text-destructive" },
  { i: Shirt, l: "Laundry", v: 2800000, c: "bg-accent/15 text-accent" },
  { i: Users, l: "Gaji Staff", v: 28000000, c: "bg-secondary text-muted-foreground" },
];

function Biaya() {
  const total = cats.reduce((a, b) => a + b.v, 0);
  return (
    <div className="space-y-6">
      <PageHeader title="Biaya Operasional" desc="Mei 2026">
        <button className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground"><Plus className="h-4 w-4" />Tambah Pengeluaran</button>
      </PageHeader>

      <div className="rounded-2xl bg-primary p-6 text-primary-foreground shadow-[var(--shadow-soft)]">
        <div className="text-sm opacity-80">Total Pengeluaran Bulan Ini</div>
        <div className="mt-2 text-3xl font-bold">{formatRupiah(total)}</div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cats.map((c) => (
          <div key={c.l} className="rounded-2xl bg-card p-5 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${c.c}`}>
                  <c.i className="h-5 w-5" />
                </div>
                <div className="text-sm font-semibold">{c.l}</div>
              </div>
              <button className="text-xs font-semibold text-accent">Detail</button>
            </div>
            <div className="mt-4 text-xl font-bold">{formatRupiah(c.v)}</div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
              <div className="h-full bg-accent" style={{ width: `${(c.v / total) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
