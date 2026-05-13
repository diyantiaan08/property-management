import { createFileRoute } from "@tanstack/react-router";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { PageHeader, Modal, Input } from "./admin.tipe-kamar";

export const Route = createFileRoute("/admin/kamar")({
  head: () => ({ meta: [{ title: "Master Kamar" }] }),
  component: KamarPage,
});

const status = {
  tersedia: "bg-success/15 text-success",
  dipesan: "bg-blue-100 text-blue-700",
  terisi: "bg-warning/20 text-warning-foreground",
  perbaikan: "bg-destructive/10 text-destructive",
} as const;

type Status = keyof typeof status;
type Kamar = { no: string; tipe: string; lantai: number; st: Status };

const initial: Kamar[] = [
  { no: "101", tipe: "Standard", lantai: 1, st: "tersedia" },
  { no: "102", tipe: "Standard", lantai: 1, st: "terisi" },
  { no: "103", tipe: "Standard", lantai: 1, st: "perbaikan" },
  { no: "201", tipe: "Deluxe", lantai: 2, st: "dipesan" },
  { no: "202", tipe: "Deluxe", lantai: 2, st: "tersedia" },
  { no: "203", tipe: "Deluxe", lantai: 2, st: "terisi" },
  { no: "301", tipe: "Suite", lantai: 3, st: "tersedia" },
  { no: "302", tipe: "Suite", lantai: 3, st: "dipesan" },
  { no: "V01", tipe: "Villa", lantai: 0, st: "terisi" },
  { no: "V02", tipe: "Villa", lantai: 0, st: "tersedia" },
];

const TIPES = ["Standard", "Deluxe", "Suite", "Villa"];
const STATUSES: Status[] = ["tersedia", "dipesan", "terisi", "perbaikan"];

function KamarPage() {
  const [list, setList] = useState<Kamar[]>(initial);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Kamar | null>(null);
  const [form, setForm] = useState({ no: "", tipe: "Standard", lantai: "1", st: "tersedia" as Status });

  function openAdd() {
    setEditing(null);
    setForm({ no: "", tipe: "Standard", lantai: "1", st: "tersedia" });
    setOpen(true);
  }

  function openEdit(k: Kamar) {
    setEditing(k);
    setForm({ no: k.no, tipe: k.tipe, lantai: String(k.lantai), st: k.st });
    setOpen(true);
  }

  function handleDelete(no: string) {
    setList((l) => l.filter((x) => x.no !== no));
    toast.success("Kamar dihapus");
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.no) { toast.error("Nomor kamar wajib"); return; }
    if (!editing && list.some((k) => k.no === form.no)) { toast.error("Nomor kamar sudah ada"); return; }
    const k: Kamar = { no: form.no, tipe: form.tipe, lantai: Number(form.lantai), st: form.st };
    setList((l) => editing ? l.map((x) => x.no === editing.no ? k : x) : [...l, k]);
    toast.success(editing ? "Kamar diperbarui" : "Kamar ditambahkan");
    setOpen(false);
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Master Kamar" desc="Daftar kamar fisik per lantai">
        <button onClick={openAdd} className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90">
          <Plus className="h-4 w-4" />Tambah Kamar
        </button>
      </PageHeader>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-5">
        {list.map((k) => (
          <div key={k.no} className="group rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs text-muted-foreground">Kamar</div>
                <div className="text-xl font-bold">{k.no}</div>
              </div>
              <div className="flex gap-1 opacity-0 transition group-hover:opacity-100">
                <button onClick={() => openEdit(k)} className="text-muted-foreground hover:text-foreground"><Edit2 className="h-3.5 w-3.5" /></button>
                <button onClick={() => handleDelete(k.no)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">{k.tipe} · Lt. {k.lantai}</div>
            <span className={`mt-3 inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold capitalize ${status[k.st]}`}>{k.st}</span>
          </div>
        ))}
      </div>

      {open && (
        <Modal title={editing ? "Edit Kamar" : "Tambah Kamar"} onClose={() => setOpen(false)}>
          <form onSubmit={handleSave} className="space-y-4">
            <Input label="Nomor Kamar" value={form.no} onChange={(v) => setForm({ ...form, no: v })} placeholder="101" />
            <div className="grid grid-cols-2 gap-3">
              <Select label="Tipe Kamar" value={form.tipe} onChange={(v) => setForm({ ...form, tipe: v })} options={TIPES} />
              <Input label="Lantai" type="number" value={form.lantai} onChange={(v) => setForm({ ...form, lantai: v })} />
            </div>
            <Select label="Status" value={form.st} onChange={(v) => setForm({ ...form, st: v as Status })} options={STATUSES} />
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" onClick={() => setOpen(false)} className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium">Batal</button>
              <button type="submit" className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90">{editing ? "Simpan" : "Tambah"}</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: readonly string[] }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-muted-foreground">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm capitalize outline-none focus:border-accent">
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}
