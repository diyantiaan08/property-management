import { createFileRoute } from "@tanstack/react-router";
import { rooms as initialRooms, formatRupiah, type RoomType } from "@/lib/data";
import { Plus, Edit2, Trash2, Image as ImageIcon, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/tipe-kamar")({
  head: () => ({ meta: [{ title: "Master Tipe Kamar" }] }),
  component: TipeKamarPage,
});

type FormState = {
  name: string;
  price: string;
  capacity: string;
  size: string;
  bed: string;
  breakfast: boolean;
  available: string;
  description: string;
  facilities: string;
};

const emptyForm: FormState = {
  name: "", price: "", capacity: "2", size: "", bed: "1 King Bed",
  breakfast: true, available: "1", description: "", facilities: "AC, WiFi Gratis, TV LED",
};

function TipeKamarPage() {
  const [list, setList] = useState<RoomType[]>(initialRooms);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<RoomType | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);

  function openAdd() {
    setEditing(null);
    setForm(emptyForm);
    setOpen(true);
  }

  function openEdit(r: RoomType) {
    setEditing(r);
    setForm({
      name: r.name, price: String(r.price), capacity: String(r.capacity),
      size: String(r.size), bed: r.bed, breakfast: r.breakfast,
      available: String(r.available), description: r.description,
      facilities: r.mainFacilities.join(", "),
    });
    setOpen(true);
  }

  function handleDelete(id: string) {
    setList((l) => l.filter((x) => x.id !== id));
    toast.success("Tipe kamar dihapus");
  }

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.price) {
      toast.error("Nama dan harga wajib diisi");
      return;
    }
    const payload: RoomType = {
      id: editing?.id ?? form.name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now().toString(36),
      name: form.name,
      price: Number(form.price),
      capacity: Number(form.capacity),
      size: Number(form.size) || 20,
      bed: form.bed,
      breakfast: form.breakfast,
      available: Number(form.available),
      image: editing?.image ?? initialRooms[0].image,
      gallery: editing?.gallery ?? [initialRooms[0].image],
      description: form.description,
      mainFacilities: form.facilities.split(",").map((s) => s.trim()).filter(Boolean),
      roomFacilities: editing?.roomFacilities ?? ["Lemari", "Meja Kerja"],
      bathroomFacilities: editing?.bathroomFacilities ?? ["Shower", "Water Heater"],
    };
    setList((l) => editing ? l.map((x) => x.id === editing.id ? payload : x) : [...l, payload]);
    toast.success(editing ? "Tipe kamar diperbarui" : "Tipe kamar ditambahkan");
    setOpen(false);
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Master Tipe Kamar" desc="Kelola tipe kamar, harga, dan fasilitas">
        <button onClick={openAdd} className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90">
          <Plus className="h-4 w-4" />Tambah Tipe Kamar
        </button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {list.map((r) => (
          <div key={r.id} className="overflow-hidden rounded-2xl bg-card shadow-[var(--shadow-card)]">
            <div className="relative aspect-[16/10]">
              <img src={r.image} alt="" className="h-full w-full object-cover" />
              <div className="absolute right-2 top-2 flex gap-1">
                <button className="rounded-lg bg-white/90 p-2 text-primary hover:bg-white"><ImageIcon className="h-3.5 w-3.5" /></button>
                <button onClick={() => openEdit(r)} className="rounded-lg bg-white/90 p-2 text-primary hover:bg-white"><Edit2 className="h-3.5 w-3.5" /></button>
                <button onClick={() => handleDelete(r.id)} className="rounded-lg bg-white/90 p-2 text-destructive hover:bg-white"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold">{r.name}</h3>
                  <div className="mt-1 text-xs text-muted-foreground">{r.capacity} tamu · {r.size}m² · {r.bed}</div>
                </div>
                {r.breakfast && <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">Sarapan</span>}
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {r.mainFacilities.slice(0, 4).map((f) => (
                  <span key={f} className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground">{f}</span>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                <div>
                  <div className="text-base font-bold">{formatRupiah(r.price)}</div>
                  <div className="text-[10px] text-muted-foreground">per malam</div>
                </div>
                <span className="text-xs font-medium text-accent-foreground/80">{r.available} kamar tersedia</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <Modal title={editing ? "Edit Tipe Kamar" : "Tambah Tipe Kamar"} onClose={() => setOpen(false)}>
          <form onSubmit={handleSave} className="space-y-4">
            <Input label="Nama Tipe Kamar" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Deluxe Room" />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Harga / malam (Rp)" type="number" value={form.price} onChange={(v) => setForm({ ...form, price: v })} placeholder="850000" />
              <Input label="Kamar Tersedia" type="number" value={form.available} onChange={(v) => setForm({ ...form, available: v })} />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Input label="Kapasitas" type="number" value={form.capacity} onChange={(v) => setForm({ ...form, capacity: v })} />
              <Input label="Luas (m²)" type="number" value={form.size} onChange={(v) => setForm({ ...form, size: v })} />
              <Input label="Tempat Tidur" value={form.bed} onChange={(v) => setForm({ ...form, bed: v })} />
            </div>
            <Input label="Deskripsi" value={form.description} onChange={(v) => setForm({ ...form, description: v })} placeholder="Kamar nyaman dengan..." />
            <Input label="Fasilitas Utama (pisah koma)" value={form.facilities} onChange={(v) => setForm({ ...form, facilities: v })} />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.breakfast} onChange={(e) => setForm({ ...form, breakfast: e.target.checked })} className="h-4 w-4 accent-[oklch(0.74_0.10_78)]" />
              Termasuk sarapan
            </label>
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

export function PageHeader({ title, desc, children }: { title: string; desc?: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
        {desc && <p className="mt-1 text-sm text-muted-foreground">{desc}</p>}
      </div>
      {children && <div className="flex gap-2">{children}</div>}
    </div>
  );
}

export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-t-3xl bg-card p-6 shadow-[var(--shadow-elevated)] sm:rounded-3xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">{title}</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 hover:bg-secondary"><X className="h-4 w-4" /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Input({ label, value, onChange, type = "text", placeholder }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-muted-foreground">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-accent" />
    </label>
  );
}
