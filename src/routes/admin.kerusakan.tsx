import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./admin.tipe-kamar";
import { Plus, Upload, Wrench } from "lucide-react";

export const Route = createFileRoute("/admin/kerusakan")({
  head: () => ({ meta: [{ title: "Kerusakan" }] }),
  component: Kerusakan,
});

const items = [
  { id: "K-014", room: "201", item: "AC tidak dingin", reporter: "Housekeeping", status: "Diproses", date: "12 Mei" },
  { id: "K-013", room: "108", item: "Shower bocor", reporter: "Tamu", status: "Selesai", date: "11 Mei" },
  { id: "K-012", room: "V01", item: "Lampu taman mati", reporter: "Maintenance", status: "Pending", date: "10 Mei" },
];
const sc: Record<string, string> = {
  "Pending": "bg-destructive/10 text-destructive",
  "Diproses": "bg-warning/15 text-warning",
  "Selesai": "bg-accent/10 text-accent",
};

function Kerusakan() {
  return (
    <div className="space-y-6">
      <PageHeader title="Laporan Kerusakan" desc="Tracking maintenance properti">
        <button className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground"><Plus className="h-4 w-4" />Lapor Kerusakan</button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((k) => (
          <div key={k.id} className="rounded-2xl bg-card p-5 shadow-[var(--shadow-card)]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-warning/15 text-warning"><Wrench className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs text-muted-foreground">{k.id} · Kamar {k.room}</div>
                  <div className="text-sm font-bold">{k.item}</div>
                </div>
              </div>
              <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${sc[k.status]}`}>{k.status}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <span>Pelapor: {k.reporter}</span>
              <span>{k.date}</span>
            </div>
            <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border py-2 text-xs font-medium text-muted-foreground">
              <Upload className="h-3.5 w-3.5" />Upload Foto
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
