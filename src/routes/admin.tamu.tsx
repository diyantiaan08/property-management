import { createFileRoute } from "@tanstack/react-router";
import { Search, Plus } from "lucide-react";
import { PageHeader } from "./admin.tipe-kamar";

export const Route = createFileRoute("/admin/tamu")({
  head: () => ({ meta: [{ title: "Master Tamu" }] }),
  component: TamuPage,
});

const tamu = [
  { nama: "Budi Santoso", email: "budi@email.com", hp: "0812 3456 7890", booking: 5 },
  { nama: "Anisa Putri", email: "anisa@email.com", hp: "0813 2222 3333", booking: 3 },
  { nama: "Rizki Hadi", email: "rizki@email.com", hp: "0852 4444 5555", booking: 8 },
  { nama: "Maya Sari", email: "maya@email.com", hp: "0878 6666 7777", booking: 2 },
  { nama: "Doni Pratama", email: "doni@email.com", hp: "0822 1111 2222", booking: 1 },
];

function TamuPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Master Tamu" desc="Daftar tamu terdaftar">
        <button className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground"><Plus className="h-4 w-4" />Tambah Tamu</button>
      </PageHeader>

      <div className="rounded-2xl bg-card p-5 shadow-[var(--shadow-card)]">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input placeholder="Cari nama atau email..." className="w-full rounded-xl border border-border bg-background pl-10 pr-4 py-2.5 text-sm outline-none focus:border-accent" />
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase text-muted-foreground">
                <th className="pb-3 font-semibold">Nama</th>
                <th className="pb-3 font-semibold">Email</th>
                <th className="pb-3 font-semibold">No. HP</th>
                <th className="pb-3 font-semibold">Total Booking</th>
                <th className="pb-3 font-semibold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tamu.map((t) => (
                <tr key={t.email} className="hover:bg-secondary/40">
                  <td className="py-3.5 font-semibold flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">{t.nama[0]}</div>
                    {t.nama}
                  </td>
                  <td className="py-3.5 text-muted-foreground">{t.email}</td>
                  <td className="py-3.5 text-muted-foreground">{t.hp}</td>
                  <td className="py-3.5"><span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent">{t.booking}</span></td>
                  <td className="py-3.5 text-right"><button className="text-xs font-semibold text-accent">Detail</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
