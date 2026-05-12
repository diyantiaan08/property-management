import { createFileRoute } from "@tanstack/react-router";
import { rooms, formatRupiah } from "@/lib/data";
import { Plus, Edit2, Trash2, Image as ImageIcon } from "lucide-react";

export const Route = createFileRoute("/admin/tipe-kamar")({
  head: () => ({ meta: [{ title: "Master Tipe Kamar" }] }),
  component: TipeKamarPage,
});

function TipeKamarPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Master Tipe Kamar" desc="Kelola tipe kamar, harga, dan fasilitas">
        <button className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground"><Plus className="h-4 w-4" />Tambah Tipe Kamar</button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rooms.map((r) => (
          <div key={r.id} className="overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)]">
            <div className="relative aspect-[16/10]">
              <img src={r.image} alt="" className="h-full w-full object-cover" />
              <div className="absolute right-2 top-2 flex gap-1">
                <button className="rounded-lg bg-white/90 p-2 text-primary"><ImageIcon className="h-3.5 w-3.5" /></button>
                <button className="rounded-lg bg-white/90 p-2 text-primary"><Edit2 className="h-3.5 w-3.5" /></button>
                <button className="rounded-lg bg-white/90 p-2 text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold">{r.name}</h3>
                  <div className="mt-1 text-xs text-muted-foreground">{r.capacity} tamu · {r.size}m² · {r.bed}</div>
                </div>
                {r.breakfast && <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">Sarapan</span>}
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {r.mainFacilities.slice(0, 4).map((f) => (
                  <span key={f} className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground">{f}</span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                <div>
                  <div className="text-base font-bold">{formatRupiah(r.price)}</div>
                  <div className="text-[10px] text-muted-foreground">per malam</div>
                </div>
                <span className="text-xs font-medium text-accent">{r.available} kamar tersedia</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PageHeader({ title, desc, children }: { title: string; desc?: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
        {desc && <p className="mt-1 text-sm text-muted-foreground">{desc}</p>}
      </div>
      {children && <div className="flex gap-2">{children}</div>}
    </div>
  );
}
