import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./admin.tipe-kamar";
import { Download } from "lucide-react";

export const Route = createFileRoute("/admin/laporan-booking")({
  head: () => ({ meta: [{ title: "Laporan Booking" }] }),
  component: Lap,
});

function Lap() {
  return (
    <div className="space-y-6">
      <PageHeader title="Laporan Booking" desc="Statistik & tren reservasi">
        <button className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium"><Download className="h-4 w-4" />Export</button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { l: "Total Booking", v: "284" },
          { l: "Sukses", v: "256" },
          { l: "Dibatalkan", v: "18" },
          { l: "Avg. Length", v: "2.8 mlm" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl bg-card p-5 shadow-[var(--shadow-card)]">
            <div className="text-xs text-muted-foreground">{s.l}</div>
            <div className="mt-2 text-2xl font-bold">{s.v}</div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]">
        <h3 className="text-base font-bold">Tren Booking 30 Hari</h3>
        <div className="mt-5 flex h-48 items-end gap-1.5">
          {Array.from({ length: 30 }).map((_, i) => {
            const h = 30 + Math.abs(Math.sin(i * 0.5) * 60) + (i % 5 === 0 ? 20 : 0);
            return <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-primary/30 to-primary" style={{ height: `${h}%` }} />;
          })}
        </div>
      </div>
    </div>
  );
}
