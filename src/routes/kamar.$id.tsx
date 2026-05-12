import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { TopBar } from "@/components/customer/Nav";
import { rooms, formatRupiah } from "@/lib/data";
import { Users, Maximize, Bed, Coffee, Star, Check, ArrowLeft, Clock, ShieldCheck, RefreshCcw } from "lucide-react";

export const Route = createFileRoute("/kamar/$id")({
  head: ({ params }) => ({ meta: [{ title: `${rooms.find(r => r.id === params.id)?.name ?? "Kamar"} — Stayly` }] }),
  component: RoomDetail,
  loader: ({ params }) => {
    const room = rooms.find((r) => r.id === params.id);
    if (!room) throw notFound();
    return { room };
  },
  notFoundComponent: () => <div className="p-10">Kamar tidak ditemukan</div>,
  errorComponent: ({ error }) => <div className="p-10">{error.message}</div>,
});

function RoomDetail() {
  const { room } = Route.useLoaderData();
  return (
    <div className="min-h-screen pb-28 md:pb-12">
      <TopBar />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <Link to="/kamar" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Semua kamar
        </Link>

        {/* Gallery */}
        <div className="mt-4 grid gap-2 md:grid-cols-4 md:grid-rows-2 md:h-[480px]">
          <div className="md:col-span-2 md:row-span-2 overflow-hidden rounded-2xl">
            <img src={room.gallery[0]} alt={room.name} className="h-full w-full object-cover" />
          </div>
          {room.gallery.slice(1, 5).map((g: string, i: number) => (
            <div key={i} className="hidden md:block overflow-hidden rounded-2xl">
              <img src={g} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="text-3xl font-bold">{room.name}</h1>
                <p className="mt-1 text-sm text-muted-foreground">{room.bed} · Lantai 5–8 · Stayly Resort & Villa</p>
              </div>
              <div className="flex items-center gap-1.5 rounded-xl bg-accent/10 px-3 py-2 text-sm font-semibold text-accent">
                <Star className="h-4 w-4 fill-current" /> 4.9 · 248 ulasan
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { i: Users, l: "Kapasitas", v: `${room.capacity} tamu` },
                { i: Maximize, l: "Ukuran", v: `${room.size} m²` },
                { i: Bed, l: "Tipe Kasur", v: room.bed },
                { i: Coffee, l: "Sarapan", v: room.breakfast ? "Termasuk" : "Tidak termasuk" },
              ].map((s) => (
                <div key={s.l} className="rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]">
                  <s.i className="h-5 w-5 text-accent" />
                  <div className="mt-2 text-xs text-muted-foreground">{s.l}</div>
                  <div className="text-sm font-semibold">{s.v}</div>
                </div>
              ))}
            </div>

            <section className="mt-8">
              <h2 className="text-lg font-bold">Tentang Kamar</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{room.description}</p>
            </section>

            <FacilitySection title="Fasilitas Utama" items={room.mainFacilities} />
            <FacilitySection title="Fasilitas Kamar" items={room.roomFacilities} />
            <FacilitySection title="Fasilitas Kamar Mandi" items={room.bathroomFacilities} />

            <section className="mt-8 rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]">
              <h2 className="text-lg font-bold">Kebijakan</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Policy icon={Clock} title="Check-in / Check-out" desc="14:00 / 12:00" />
                <Policy icon={RefreshCcw} title="Reschedule" desc="Gratis hingga 3 hari sebelum check-in" />
                <Policy icon={ShieldCheck} title="Refund" desc="Refund 100% pembatalan H-7" />
                <Policy icon={ShieldCheck} title="Deposit" desc={formatRupiah(300000) + " (refundable)"} />
              </div>
            </section>
          </div>

          {/* Booking card */}
          <aside className="lg:sticky lg:top-20 lg:self-start hidden md:block">
            <div className="rounded-2xl bg-card p-6 shadow-[var(--shadow-soft)]">
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold">{formatRupiah(room.price)}</div>
                  <div className="text-xs text-muted-foreground">per malam</div>
                </div>
                <span className="rounded-full bg-accent/10 px-2.5 py-1 text-[11px] font-semibold text-accent">{room.available} tersisa</span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-2 rounded-xl border border-border p-2">
                <div className="rounded-lg p-2">
                  <div className="text-[10px] font-bold uppercase text-muted-foreground">Check-in</div>
                  <div className="text-sm font-semibold">12 Mei 2026</div>
                </div>
                <div className="rounded-lg p-2 border-l border-border">
                  <div className="text-[10px] font-bold uppercase text-muted-foreground">Check-out</div>
                  <div className="text-sm font-semibold">15 Mei 2026</div>
                </div>
              </div>
              <div className="mt-3 rounded-xl border border-border p-3">
                <div className="text-[10px] font-bold uppercase text-muted-foreground">Tamu</div>
                <div className="text-sm font-semibold">2 dewasa</div>
              </div>
              <Link to="/booking/$id" params={{ id: room.id }} className="mt-5 block w-full rounded-xl bg-accent py-3.5 text-center text-sm font-semibold text-accent-foreground hover:opacity-90">
                Booking Sekarang
              </Link>
              <p className="mt-3 text-center text-xs text-muted-foreground">Belum ada biaya yang dikenakan</p>
            </div>
          </aside>
        </div>
      </div>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card px-4 py-3 md:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-lg font-bold">{formatRupiah(room.price)}</div>
            <div className="text-[11px] text-muted-foreground">per malam</div>
          </div>
          <Link to="/booking/$id" params={{ id: room.id }} className="flex-1 rounded-xl bg-accent py-3.5 text-center text-sm font-semibold text-accent-foreground">
            Booking Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
}

function FacilitySection({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {items.map((it) => (
          <div key={it} className="flex items-center gap-2 rounded-xl bg-card px-3 py-2.5 text-sm shadow-[var(--shadow-card)]">
            <Check className="h-4 w-4 text-accent" /> {it}
          </div>
        ))}
      </div>
    </section>
  );
}

function Policy({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) {
  return (
    <div className="flex gap-3">
      <Icon className="h-5 w-5 shrink-0 text-accent" />
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
    </div>
  );
}
