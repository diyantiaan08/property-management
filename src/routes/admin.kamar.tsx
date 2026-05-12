import { createFileRoute } from "@tanstack/react-router";
import { Plus, Edit2 } from "lucide-react";
import { PageHeader } from "./admin.tipe-kamar";

export const Route = createFileRoute("/admin/kamar")({
  head: () => ({ meta: [{ title: "Master Kamar" }] }),
  component: KamarPage,
});

const status = {
  tersedia: "bg-accent/10 text-accent",
  dipesan: "bg-blue-100 text-blue-700",
  terisi: "bg-warning/15 text-warning",
  perbaikan: "bg-destructive/10 text-destructive",
} as const;

const data = [
  { no: "101", tipe: "Standard", lantai: 1, st: "tersedia" },
  { no: "102", tipe: "Standard", lantai: 1, st: "terisi" },
  { no: "103", tipe: "Standard", lantai: 1, st: "perbaikan" },
  { no: "201", tipe: "Deluxe", lantai: 2, st: "dipesan" },
  { no: "202", tipe: "Deluxe", lantai: 2, st: "tersedia" },
  { no: "203", tipe: "Deluxe", lantai: 2, st: "terisi" },
  { no: "301", tipe: "Suite", lantai: 3, st: "tersedia" },
  { no: "302", tipe: "Suite", lantai: 3, st: "dipesan" },
  { no: "V01", tipe: "Villa", lantai: 0, st: "terisi" },
  { no: "V02", tipe: "Villa", lantai: 0, st: "tersedia" },
] as const;

function KamarPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Master Kamar" desc="Daftar kamar fisik per lantai">
        <button className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground"><Plus className="h-4 w-4" />Tambah Kamar</button>
      </PageHeader>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
        {data.map((k) => (
          <div key={k.no} className="rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-muted-foreground">Kamar</div>
                <div className="text-xl font-bold">{k.no}</div>
              </div>
              <button className="text-muted-foreground hover:text-foreground"><Edit2 className="h-3.5 w-3.5" /></button>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">{k.tipe} · Lt. {k.lantai}</div>
            <span className={`mt-3 inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${status[k.st]}`}>{k.st}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
