import { createFileRoute, Link } from "@tanstack/react-router";
import { TopBar, MobileNav } from "@/components/customer/Nav";
import { rooms, formatRupiah } from "@/lib/data";
import { Star, Users, Maximize, Coffee, SlidersHorizontal } from "lucide-react";

export const Route = createFileRoute("/kamar/")({
  head: () => ({ meta: [{ title: "Pilih Kamar — Stayly" }] }),
  component: RoomList,
});

function RoomList() {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <TopBar />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">Pilih Tipe Kamar</h1>
            <p className="mt-1 text-sm text-muted-foreground">{rooms.length} tipe kamar tersedia · 12 Mei – 15 Mei 2026</p>
          </div>
          <button className="hidden md:inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium">
            <SlidersHorizontal className="h-4 w-4" /> Filter
          </button>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          {rooms.map((r) => (
            <Link key={r.id} to="/kamar/$id" params={{ id: r.id }} className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-soft)] sm:flex-row">
              <div className="relative aspect-[4/3] sm:aspect-auto sm:w-2/5 overflow-hidden">
                <img src={r.image} alt={r.name} loading="lazy" className="h-full w-full object-cover transition group-hover:scale-105" />
                <span className="absolute right-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">{r.available} tersedia</span>
              </div>
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-bold">{r.name}</h3>
                    <div className="flex items-center gap-1 rounded-lg bg-accent/10 px-2 py-1 text-xs font-semibold text-accent">
                      <Star className="h-3 w-3 fill-current" /> 4.9
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" />{r.capacity} tamu</span>
                    <span className="inline-flex items-center gap-1"><Maximize className="h-3.5 w-3.5" />{r.size}m²</span>
                    {r.breakfast && <span className="inline-flex items-center gap-1 text-accent"><Coffee className="h-3.5 w-3.5" />Sarapan</span>}
                  </div>
                  <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{r.description}</p>
                </div>
                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <div className="text-xl font-bold">{formatRupiah(r.price)}</div>
                    <div className="text-xs text-muted-foreground">per malam · sudah termasuk pajak</div>
                  </div>
                  <span className="rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground">Lihat Detail</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
