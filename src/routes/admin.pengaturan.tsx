import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./admin.tipe-kamar";
import { Image as ImageIcon } from "lucide-react";

export const Route = createFileRoute("/admin/pengaturan")({
  head: () => ({ meta: [{ title: "Pengaturan" }] }),
  component: Pengaturan,
});

function Pengaturan() {
  return (
    <div className="space-y-6">
      <PageHeader title="Pengaturan Properti" desc="Atur informasi & template komunikasi" />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)] lg:col-span-2">
          <h3 className="text-base font-bold">Informasi Properti</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field label="Nama Properti" defaultValue="Stayly Resort & Villa" />
            <Field label="Email Kontak" defaultValue="hello@stayly.id" />
            <Field label="No. Telepon" defaultValue="0361 234 5678" />
            <Field label="Website" defaultValue="stayly.id" />
            <Field label="Jam Check-in" defaultValue="14:00" />
            <Field label="Jam Check-out" defaultValue="12:00" />
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium">Alamat</label>
            <textarea rows={3} defaultValue="Jl. Pantai Berawa No. 88, Canggu, Bali" className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm focus:border-accent outline-none" />
          </div>
        </div>

        <div className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]">
          <h3 className="text-base font-bold">Logo Properti</h3>
          <label className="mt-4 flex aspect-square cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-secondary/40">
            <ImageIcon className="h-10 w-10 text-muted-foreground" />
            <div className="mt-2 text-xs font-medium">Upload Logo</div>
            <input type="file" className="hidden" />
          </label>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]">
          <h3 className="text-base font-bold">Template Invoice</h3>
          <textarea rows={6} className="mt-3 w-full rounded-xl border border-input bg-background px-4 py-3 font-mono text-xs outline-none focus:border-accent" defaultValue={"Terima kasih telah menginap di {{property}}.\nInvoice: {{invoice_no}}\nTotal: {{total}}"} />
        </div>
        <div className="rounded-2xl bg-card p-6 shadow-[var(--shadow-card)]">
          <h3 className="text-base font-bold">Template WhatsApp</h3>
          <textarea rows={6} className="mt-3 w-full rounded-xl border border-input bg-background px-4 py-3 font-mono text-xs outline-none focus:border-accent" defaultValue={"Halo {{guest_name}},\nBooking {{booking_code}} dikonfirmasi.\nCheck-in: {{checkin_date}}"} />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium">Batal</button>
        <button className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground">Simpan Perubahan</button>
      </div>
    </div>
  );
}

function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="text-sm font-medium">{label}</label>
      <input {...rest} className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-accent" />
    </div>
  );
}
