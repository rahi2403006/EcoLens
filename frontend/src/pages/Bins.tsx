import { useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useMonitoring } from "../hooks/useMonitoring";
import { BinMap } from "../components/BinMap";
import { BinList } from "../components/BinList";
import { BinDetail } from "../components/BinDetail";
import { StatusBadge } from "../components/StatusBadge";
import type { BinStatus, Speed } from "../types/monitoring";

const ORDER: BinStatus[] = ["normal", "warning", "full", "faulty"];
const SPEEDS: Speed[] = ["slow", "normal", "fast"];

export function Bins() {
  const { state, paused, setPaused, speed, setSpeed, sendRequest, reset } = useMonitoring();
  const [selectedId, setSelectedId] = useState<string>(
    () => state.bins.find((b) => b.status === "full")?.id ?? state.bins[0]?.id ?? "",
  );

  const selected = state.bins.find((b) => b.id === selectedId) ?? state.bins[0];
  const company = state.companies.find((c) => c.id === selected?.companyId);
  const count = (s: BinStatus) => state.bins.filter((b) => b.status === s).length;

  if (!selected) return <p className="text-sm text-slate-500">No bins to show.</p>;

  const btn = "flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800";

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-medium">Bins</h1>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          {ORDER.map((s) => (
            <span key={s} className="flex items-center gap-1.5">
              <StatusBadge status={s} /> {count(s)}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3 text-sm">
        <button onClick={() => setPaused(!paused)} className={btn}>
          {paused ? <Play size={14} /> : <Pause size={14} />}
          {paused ? "Resume simulator" : "Pause simulator"}
        </button>
        <div className="flex items-center gap-1 rounded-lg border border-slate-300 p-0.5 dark:border-slate-700">
          {SPEEDS.map((s) => (
            <button
              key={s}
              onClick={() => setSpeed(s)}
              className={`rounded-md px-2.5 py-1 text-xs capitalize ${speed === s ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900" : "text-slate-600 dark:text-slate-300"
                }`}
            >
              {s}
            </button>
          ))}
        </div>
        <button onClick={reset} className={btn}>
          <RotateCcw size={14} /> Reset
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <BinMap bins={state.bins} selectedId={selected.id} onSelect={setSelectedId} />
        <div className="flex flex-col gap-4">
          <BinList bins={state.bins} selectedId={selected.id} onSelect={setSelectedId} />
        </div>
      </div>

      <div className="mt-4 max-w-xl">
        <BinDetail bin={selected} company={company} pending={state.records.some((r) => r.binId === selected.id && r.status === "pending")} onSend={() => sendRequest(selected.id, "manual")} />
      </div>
    </div>
  );
}
