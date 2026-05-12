import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "./admin.tipe-kamar";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/admin/kalender")({
  head: () => ({ meta: [{ title: "Kalender" }] }),
  component: Kalender,
});

const days = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
const events: Record<number, { l: string; c: string }[]> = {
  3: [{ l: "Check-in 4", c: "bg-accent/15 text-accent" }],
  5: [{ l: "Check-out 2", c: "bg-secondary text-muted-foreground" }, { l: "Check-in 3", c: "bg-accent/15 text-accent" }],
  8: [{ l: "Booking 6", c: "bg-blue-100 text-blue-700" }],
  12: [{ l: "Check-in 8", c: "bg-accent/15 text-accent" }],
  15: [{ l: "Check-out 5", c: "bg-secondary text-muted-foreground" }],
  20: [{ l: "Full booked", c: "bg-warning/20 text-warning" }],
  22: [{ l: "Booking 4", c: "bg-blue-100 text-blue-700" }],
};

function Kalender() {
  return (
    <div className="space-y-6">
      <PageHeader title="Kalender Booking" desc="Okupansi & jadwal check-in/check-out" />
      <div className="rounded-2xl bg-card p-5 shadow-[var(--shadow-card)]">
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold">Mei 2026</div>
          <div className="flex gap-1">
            <button className="rounded-lg border border-border p-2"><ChevronLeft className="h-4 w-4" /></button>
            <button className="rounded-lg border border-border p-2"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-7 gap-1 text-xs">
          {days.map((d) => <div key={d} className="pb-2 text-center font-bold text-muted-foreground">{d}</div>)}
          {Array.from({ length: 35 }).map((_, i) => {
            const day = i - 3;
            const valid = day > 0 && day <= 31;
            const ev = valid ? events[day] : undefined;
            const today = day === 12;
            return (
              <div key={i} className={`aspect-square rounded-xl border p-1.5 ${valid ? "bg-background" : "bg-transparent border-transparent"} ${today ? "border-accent ring-2 ring-accent/30" : "border-border"}`}>
                {valid && (
                  <>
                    <div className={`text-xs font-bold ${today ? "text-accent" : ""}`}>{day}</div>
                    <div className="mt-1 space-y-0.5">
                      {ev?.map((e, j) => (
                        <div key={j} className={`truncate rounded px-1 py-0.5 text-[9px] font-semibold ${e.c}`}>{e.l}</div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-5 flex flex-wrap gap-3 text-xs">
          {[
            { l: "Check-in", c: "bg-accent" },
            { l: "Check-out", c: "bg-muted-foreground" },
            { l: "Booking baru", c: "bg-blue-500" },
            { l: "Full", c: "bg-warning" },
          ].map((l) => (
            <div key={l.l} className="flex items-center gap-1.5"><div className={`h-3 w-3 rounded ${l.c}`} />{l.l}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
