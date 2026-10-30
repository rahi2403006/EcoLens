import type { Bin, Company } from "../types/monitoring";
import { StatusBadge } from "./StatusBadge";
import { FillBar } from "./FillBar";

interface BinDetailProps {
  bin: Bin;
  company: Company | undefined;
  pending: boolean;
  onSend: () => void;
}

export function BinDetail({ bin, company, pending, onSend }: BinDetailProps) {
  const canSend = (bin.status === "warning" || bin.status === "full") && !pending;

  let hint = "";
  if (pending) hint = "A request is already open for this bin.";
  else if (bin.status === "faulty") hint = "Sensor offline, so the fill level cannot be trusted.";
  else if (bin.status === "normal") hint = "Requests are possible once the bin reaches Warning (60%).";
  else if (bin.openRequest) hint = "The last pickup was missed. You can send a new request.";

  const requestText = pending ? "Sent, waiting for pickup" : bin.openRequest ? "Last pickup missed" : "None";
  const label = "text-xs text-slate-500 dark:text-slate-400";

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-3 flex items-start justify-between gap-2">
        <div>
          <h2 className="font-medium">{bin.name}</h2>
          <p className={label}>{bin.location}</p>
        </div>
        <StatusBadge status={bin.status} />
      </div>

      <div className="mb-3 flex items-center gap-3">
        <FillBar value={bin.fillLevel} status={bin.status} />
        <span className="text-sm font-medium">{bin.fillLevel}%</span>
      </div>

      <dl className="mb-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div><dt className={label}>Sensor</dt><dd>{bin.sensorOnline ? "Online" : "Offline"}</dd></div>
        <div><dt className={label}>Last reading</dt><dd>{new Date(bin.lastUpdated).toLocaleTimeString()}</dd></div>
        <div><dt className={label}>Company</dt><dd>{company?.name ?? "-"}</dd></div>
        <div><dt className={label}>Contact (sample)</dt><dd>{company?.contact ?? "-"}</dd></div>
        <div><dt className={label}>Request</dt><dd>{requestText}</dd></div>
        <div><dt className={label}>Position</dt><dd>{bin.lat.toFixed(4)}, {bin.lng.toFixed(4)}</dd></div>
      </dl>

      <button
        onClick={onSend}
        disabled={!canSend}
        className="w-full rounded-lg bg-slate-900 py-2 text-sm text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
      >
        Send collection request
      </button>
      {hint && <p className={`mt-2 ${label}`}>{hint}</p>}
    </div>
  );
}
