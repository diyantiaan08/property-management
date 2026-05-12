import { createFileRoute, Link } from "@tanstack/react-router";
import { TopBar, MobileNav } from "@/components/customer/Nav";
import { rooms, formatRupiah } from "@/lib/data";
import { Calendar, QrCode, FileText, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/booking-saya")({
  head: () => ({ meta: [{ title: "Booking Saya — Stayly" }] }),
  component: MyBookings,
});

const bookings = [
  { id: "STY-001", roomId: "deluxe", date: "12–15 Mei 2026", status: "Dikonfirmasi", total: 2805000 },
  { id: "STY-002", roomId: "suite", date: "20–22 Mei 2026", status: "Menunggu Pembayaran", total: 3630000 },
  { id: "STY-003", roomId: "villa", date: "01–05 Apr 2026", status: "Check-out", total: 12540000 },
  { id: "STY-004", roomId: "standard", date: "10 Mar 2026", status: "Dibatalkan", total: 605000 },
];

const statusStyle: Record<string, string> = {
  "Dikonfirmasi": "bg-accent/10 text-accent",
  "Menunggu Pembayaran": "bg-warning/15 text-warning",
  "Menunggu Konfirmasi": "bg-blue-100 text-blue-700",
  "Check-in": "bg-accent/10 text-accent",
  "Check-out": "bg-secondary text-muted-foreground",
  "Dibatalkan": "bg-destructive/10 text-destructive",
};

const tabs = ["Semua", "Aktif", "Selesai", "Dibatalkan"];

function MyBookings() {
  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <TopBar />
      <div className="mx-auto max-w-4xl px-4 py-6">
        <h1 className="text-2xl font-bold md:text-3xl">Booking Saya</h1>
        <p className="mt-1 text-sm text-muted-foreground">Semua booking dan riwayat menginap Anda</p>

        <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
          {tabs.map((t, i) => (
            <button key={t} className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium ${i === 0 ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground"}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="mt-5 space-y-3">
          {bookings.map((b) => {
            const room = rooms.find((r) => r.id === b.roomId)!;
            return (
              <div key={b.id} className="rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]">
                <div className="flex gap-4">
                  <img src={room.image} alt="" className="h-20 w-24 shrink-0 rounded-xl object-cover sm:h-24 sm:w-28" />
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <div className="text-xs text-muted-foreground">{b.id}</div>
                        <div className="mt-0.5 truncate text-base font-bold">{room.name}</div>
                        <div className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />{b.date}
                        </div>
                      </div>
                      <span className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyle[b.status]}`}>{b.status}</span>
                    </div>
                    <div className="mt-3 flex items-end justify-between">
                      <div className="text-base font-bold">{formatRupiah(b.total)}</div>
                      <div className="flex gap-1.5">
                        <button className="rounded-lg border border-border p-2"><QrCode className="h-4 w-4" /></button>
                        <button className="rounded-lg border border-border p-2"><FileText className="h-4 w-4" /></button>
                        <Link to="/kamar/$id" params={{ id: room.id }} className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">
                          Detail <ChevronRight className="h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
