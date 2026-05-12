import { createFileRoute } from "@tanstack/react-router";
import { QrCode, ScanLine, ArrowRight } from "lucide-react";
import { PageHeader } from "./admin.tipe-kamar";

export const Route = createFileRoute("/admin/check-in")({
  head: () => ({ meta: [{ title: "Check-in" }] }),
  component: CheckInPage,
});

function CheckInPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Check-in" desc="Scan QR atau input booking code untuk check-in tamu" />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]">
          <h3 className="text-base font-bold">Scan QR Booking</h3>
          <div className="mt-4 flex aspect-square w-full items-center justify-center rounded-2xl border-2 border-dashed border-border bg-secondary/40">
            <div className="text-center">
              <ScanLine className="mx-auto h-16 w-16 text-muted-foreground" />
              <div className="mt-3 text-sm font-medium">Arahkan kamera ke QR</div>
              <button className="mt-3 rounded-xl bg-accent px-4 py-2 text-xs font-semibold text-accent-foreground">Aktifkan Kamera</button>
            </div>
          </div>
        </div>
        <div className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]">
          <h3 className="text-base font-bold">Input Booking Code</h3>
          <div className="mt-4">
            <label className="text-sm font-medium">Booking Code</label>
            <input placeholder="STY-2026-XXX-0000" className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 font-mono text-sm uppercase outline-none focus:border-accent" />
          </div>
          <button className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground">
            Cek Booking <ArrowRight className="h-4 w-4" />
          </button>

          <div className="mt-6 rounded-xl border border-border p-4">
            <div className="flex items-center justify-between">
              <div className="text-xs text-muted-foreground">STY-28604 · Anisa Putri</div>
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold text-accent">Siap Check-in</span>
            </div>
            <div className="mt-2 text-sm font-bold">Deluxe Room — Kamar 201</div>
            <div className="mt-1 text-xs text-muted-foreground">12 → 15 Mei 2026 · 2 tamu</div>
            <button className="mt-4 w-full rounded-xl bg-accent py-2.5 text-xs font-semibold text-accent-foreground">
              Konfirmasi Check-in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
