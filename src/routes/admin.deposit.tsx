import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./admin.tipe-kamar";
import { formatRupiah } from "@/lib/data";

export const Route = createFileRoute("/admin/deposit")({
  head: () => ({ meta: [{ title: "Deposit" }] }),
  component: Deposit,
});

const data = [
  { id: "DEP-001", tamu: "Anisa P.", booking: "STY-28604", jumlah: 300000, status: "Ditahan" },
  { id: "DEP-002", tamu: "Rizki H.", booking: "STY-28603", jumlah: 500000, status: "Dikembalikan" },
  { id: "DEP-003", tamu: "Maya S.", booking: "STY-28602", jumlah: 300000, status: "Dipotong" },
];
const sc: Record<string, string> = {
  "Ditahan": "bg-warning/15 text-warning",
  "Dikembalikan": "bg-accent/10 text-accent",
  "Dipotong": "bg-destructive/10 text-destructive",
};

function Deposit() {
  return (
    <div className="space-y-6">
      <PageHeader title="Deposit" desc="Pengelolaan deposit tamu" />
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { l: "Total Ditahan", v: formatRupiah(8400000), c: "text-warning" },
          { l: "Dikembalikan Bulan Ini", v: formatRupiah(12500000), c: "text-accent" },
          { l: "Total Potongan", v: formatRupiah(1850000), c: "text-destructive" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl bg-card p-5 shadow-[var(--shadow-card)]">
            <div className="text-xs text-muted-foreground">{s.l}</div>
            <div className={`mt-2 text-2xl font-bold ${s.c}`}>{s.v}</div>
          </div>
        ))}
      </div>
      <div className="rounded-2xl bg-card p-5 shadow-[var(--shadow-card)] overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase text-muted-foreground">
              <th className="pb-3 font-semibold">ID</th><th className="pb-3 font-semibold">Tamu</th>
              <th className="pb-3 font-semibold">Booking</th><th className="pb-3 font-semibold">Jumlah</th>
              <th className="pb-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {data.map((d) => (
              <tr key={d.id}>
                <td className="py-3.5 font-mono text-xs font-bold">{d.id}</td>
                <td className="py-3.5 font-medium">{d.tamu}</td>
                <td className="py-3.5 text-muted-foreground">{d.booking}</td>
                <td className="py-3.5 font-semibold">{formatRupiah(d.jumlah)}</td>
                <td className="py-3.5"><span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${sc[d.status]}`}>{d.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
