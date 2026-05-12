import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./admin.tipe-kamar";
import { Check, X, Eye } from "lucide-react";
import { formatRupiah } from "@/lib/data";

export const Route = createFileRoute("/admin/pembayaran")({
  head: () => ({ meta: [{ title: "Pembayaran" }] }),
  component: Pembayaran,
});

const data = [
  { id: "INV-2860", tamu: "Anisa P.", method: "Transfer BCA", amount: 2805000, status: "Terverifikasi" },
  { id: "INV-2859", tamu: "Rizki H.", method: "QRIS", amount: 4950000, status: "Terverifikasi" },
  { id: "INV-2858", tamu: "Maya S.", method: "Transfer Mandiri", amount: 1815000, status: "Menunggu" },
  { id: "INV-2857", tamu: "Doni P.", method: "Cash", amount: 605000, status: "Terverifikasi" },
  { id: "INV-2856", tamu: "Tania W.", method: "Transfer BNI", amount: 3300000, status: "Ditolak" },
];
const sc: Record<string, string> = {
  "Terverifikasi": "bg-accent/10 text-accent",
  "Menunggu": "bg-warning/15 text-warning",
  "Ditolak": "bg-destructive/10 text-destructive",
};

function Pembayaran() {
  return (
    <div className="space-y-6">
      <PageHeader title="Pembayaran" desc="Verifikasi & kelola pembayaran tamu" />
      <div className="rounded-2xl bg-card p-5 shadow-[var(--shadow-card)] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase text-muted-foreground">
              <th className="pb-3 font-semibold">Invoice</th>
              <th className="pb-3 font-semibold">Tamu</th>
              <th className="pb-3 font-semibold">Metode</th>
              <th className="pb-3 font-semibold">Jumlah</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((d) => (
              <tr key={d.id} className="hover:bg-secondary/40">
                <td className="py-3.5 font-mono text-xs font-bold">{d.id}</td>
                <td className="py-3.5 font-medium">{d.tamu}</td>
                <td className="py-3.5 text-muted-foreground">{d.method}</td>
                <td className="py-3.5 font-semibold">{formatRupiah(d.amount)}</td>
                <td className="py-3.5"><span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${sc[d.status]}`}>{d.status}</span></td>
                <td className="py-3.5">
                  <div className="flex justify-end gap-1.5">
                    <button className="rounded-lg border border-border p-1.5"><Eye className="h-3.5 w-3.5" /></button>
                    {d.status === "Menunggu" && (
                      <>
                        <button className="rounded-lg bg-accent p-1.5 text-accent-foreground"><Check className="h-3.5 w-3.5" /></button>
                        <button className="rounded-lg bg-destructive/10 p-1.5 text-destructive"><X className="h-3.5 w-3.5" /></button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
