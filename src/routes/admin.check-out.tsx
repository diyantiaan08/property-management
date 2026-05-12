import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./admin.tipe-kamar";
import { formatRupiah } from "@/lib/data";

export const Route = createFileRoute("/admin/check-out")({
  head: () => ({ meta: [{ title: "Check-out" }] }),
  component: CheckOut,
});

function CheckOut() {
  return (
    <div className="space-y-6">
      <PageHeader title="Check-out" desc="Selesaikan masa tinggal & deposit" />
      <div className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <div className="text-xs text-muted-foreground">STY-28602 · Budi Santoso</div>
            <div className="text-lg font-bold">Deluxe Room — Kamar 201</div>
            <div className="mt-1 text-xs text-muted-foreground">Check-in: 12 Mei · Check-out hari ini</div>

            <div className="mt-5 space-y-3 text-sm">
              <Row label="Subtotal kamar (3 malam)" value={formatRupiah(2550000)} />
              <Row label="Pajak & layanan" value={formatRupiah(255000)} />
              <Row label="Mini bar" value={formatRupiah(85000)} />
              <Row label="Deposit ditahan" value={formatRupiah(300000)} />
            </div>
          </div>

          <div className="rounded-2xl border border-border p-5">
            <h4 className="text-sm font-bold">Pengembalian Deposit</h4>
            <div className="mt-3 space-y-3">
              <div>
                <label className="text-xs font-medium">Potongan deposit (jika ada)</label>
                <input defaultValue="0" className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:border-accent outline-none" />
              </div>
              <div>
                <label className="text-xs font-medium">Catatan</label>
                <textarea rows={3} className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm focus:border-accent outline-none" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
              <span className="text-sm font-bold">Refund Deposit</span>
              <span className="text-lg font-bold text-accent">{formatRupiah(300000)}</span>
            </div>
            <button className="mt-4 w-full rounded-xl bg-accent py-3 text-sm font-semibold text-accent-foreground">Selesaikan Check-out</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
