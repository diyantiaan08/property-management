import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, MapPin, Star, Wifi, Coffee, Waves, Utensils, Dumbbell, Car, ShieldCheck, ArrowRight } from "lucide-react";
import { TopBar, MobileNav } from "@/components/customer/Nav";
import { rooms, formatRupiah } from "@/lib/data";
import heroImg from "@/assets/hero-villa.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stayly — Booking Villa & Hotel Mewah" },
      { name: "description", content: "Pesan villa, hotel, dan homestay terbaik dengan harga transparan dan konfirmasi instan." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <TopBar />

      {/* Hero */}
      <section className="relative">
        <div className="relative h-[68vh] min-h-[460px] w-full overflow-hidden md:h-[78vh] md:min-h-[560px]">
          <img src={heroImg} alt="Villa mewah dengan kolam renang menghadap laut" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary/25 to-primary/85" />
          <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-end px-4 pb-40 md:pb-40">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium text-white backdrop-blur md:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> 1.200+ properti pilihan di Indonesia
            </span>
            <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight text-white md:mt-4 md:text-6xl text-balance">
              Temukan tempat menginap yang sempurna.
            </h1>
            <p className="mt-2 max-w-xl text-sm text-white/85 md:mt-3 md:text-lg">
              Villa pribadi, hotel butik, dan homestay nyaman — pesan dalam hitungan detik.
            </p>
          </div>
        </div>

        {/* Search card */}
        <div className="relative z-20 mx-auto -mt-28 max-w-5xl px-4 md:-mt-20">
          <div className="rounded-3xl bg-card p-3 shadow-[var(--shadow-elevated)] md:p-2">
            <div className="grid grid-cols-2 gap-2 md:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
              <Field className="col-span-2 md:col-span-1" label="Lokasi" placeholder="Bali, Jakarta..." icon={<MapPin className="h-4 w-4" />} />
              <Field label="Check-in" placeholder="12 Mei 2026" />
              <Field label="Check-out" placeholder="15 Mei 2026" />
              <Field className="col-span-2 md:col-span-1" label="Tamu" placeholder="2 dewasa" />
              <Link to="/kamar" className="col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-4 text-sm font-semibold text-accent-foreground shadow-[var(--shadow-soft)] hover:opacity-95 md:col-span-1">
                <Search className="h-4 w-4" /> Cari Kamar
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Promo */}
      <section className="mx-auto max-w-6xl px-4 pt-16">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { tag: "FLASH SALE", title: "Diskon hingga 35%", desc: "Untuk booking 3 malam atau lebih.", color: "bg-accent" },
            { tag: "EARLY BIRD", title: "Hemat 20%", desc: "Pesan 30 hari sebelum check-in.", color: "bg-primary" },
            { tag: "WEEKEND", title: "Free Sarapan", desc: "Setiap akhir pekan untuk 2 orang.", color: "bg-warning" },
          ].map((p) => (
            <div key={p.title} className="group relative overflow-hidden rounded-2xl bg-card p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-soft)] transition">
              <span className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider ${p.color === "bg-warning" ? "text-primary" : "text-white"} ${p.color}`}>{p.tag}</span>
              <h3 className="mt-3 text-xl font-bold">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
              <ArrowRight className="absolute right-5 bottom-5 h-5 w-5 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-accent" />
            </div>
          ))}
        </div>
      </section>

      {/* Recommended rooms */}
      <section className="mx-auto max-w-6xl px-4 pt-16">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Rekomendasi Tipe Kamar</h2>
            <p className="mt-1 text-sm text-muted-foreground">Pilihan terbaik untuk perjalanan Anda</p>
          </div>
          <Link to="/kamar" className="hidden md:inline-flex text-sm font-semibold text-accent">Lihat semua →</Link>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.slice(0, 3).map((r) => (
            <RoomCard key={r.id} room={r} />
          ))}
        </div>
      </section>

      {/* Facilities */}
      <section className="mx-auto max-w-6xl px-4 pt-20">
        <h2 className="text-2xl font-bold md:text-3xl">Fasilitas Properti</h2>
        <p className="mt-1 text-sm text-muted-foreground">Semua yang Anda butuhkan untuk pengalaman menginap terbaik</p>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { i: Wifi, t: "WiFi Cepat" },
            { i: Waves, t: "Kolam Renang" },
            { i: Utensils, t: "Restoran" },
            { i: Coffee, t: "Sarapan" },
            { i: Dumbbell, t: "Gym" },
            { i: Car, t: "Parkir" },
            { i: ShieldCheck, t: "Keamanan 24/7" },
            { i: Star, t: "Layanan Premium" },
          ].map((f) => (
            <div key={f.t} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <f.i className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">{f.t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-2xl font-bold md:text-3xl">Apa kata tamu kami</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            { n: "Anisa P.", c: "Pemandangan villa luar biasa, pelayanan ramah. Pasti balik lagi!", r: 5 },
            { n: "Rizki H.", c: "Booking gampang, check-in cepat. Kamarnya bersih dan nyaman.", r: 5 },
            { n: "Maya S.", c: "Sarapan enak, kolam renang infinity bikin betah. Recommended!", r: 5 },
          ].map((rev) => (
            <div key={rev.n} className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="flex gap-0.5 text-warning">
                {Array.from({ length: rev.r }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-3 text-sm leading-relaxed">"{rev.c}"</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {rev.n[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold">{rev.n}</div>
                  <div className="text-xs text-muted-foreground">Tamu terverifikasi</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-muted-foreground">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground font-bold">S</div>
              <span className="font-bold text-foreground">Stayly</span>
            </div>
            <p>© 2026 Stayly. Semua hak dilindungi.</p>
          </div>
        </div>
      </footer>

      <MobileNav />
    </div>
  );
}

function Field({ label, placeholder, icon, className = "" }: { label: string; placeholder: string; icon?: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl px-4 py-3 hover:bg-secondary/60 transition ${className}`}>
      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 flex items-center gap-2 text-sm font-medium text-foreground">
        {icon}{placeholder}
      </div>
    </div>
  );
}

function RoomCard({ room }: { room: typeof rooms[0] }) {
  return (
    <Link to="/kamar/$id" params={{ id: room.id }} className="group block overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)] transition hover:shadow-[var(--shadow-soft)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={room.image} alt={room.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        {room.breakfast && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-primary">Termasuk Sarapan</span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-accent px-2.5 py-1 text-[11px] font-semibold text-accent-foreground">Tersedia</span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold leading-tight">{room.name}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{room.capacity} tamu · {room.size}m² · {room.bed}</p>
          </div>
          <div className="flex items-center gap-1 rounded-lg bg-accent/10 px-2 py-1 text-xs font-semibold text-accent">
            <Star className="h-3 w-3 fill-current" /> 4.9
          </div>
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <div className="text-lg font-bold text-foreground">{formatRupiah(room.price)}</div>
            <div className="text-xs text-muted-foreground">per malam</div>
          </div>
          <span className="rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">Detail</span>
        </div>
      </div>
    </Link>
  );
}
