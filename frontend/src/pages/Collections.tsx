import { useState } from "react";
import { useMonitoring } from "../hooks/useMonitoring";
import { useToast } from "../hooks/useToast";
import { RecordBadge } from "../components/RecordBadge";
import { formatDate, formatDateTime } from "../lib/format";

const card = "rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900";
const sub = "text-xs text-slate-500 dark:text-slate-400";
const select =
  "rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-900";
const btn =
  "rounded-lg border px-2.5 py-1 text-xs";

export function Collections() {
  const { state, resolveRecord } = useMonitoring();
  const { show } = useToast();
  const [company, setCompany] = useState("all");
  const [bin, setBin] = useState("all");
  const [status, setStatus] = useState("all");

  const binName = (id: string) => state.bins.find((b) => b.id === id)?.name ?? id;
  const companyName = (id: string) => state.companies.find((c) => c.id === id)?.name ?? id;

  const all = state.records;
  const collected = all.filter((r) => r.status === "collected").length;
  const missed = all.filter((r) => r.status === "missed").length;
  const pending = all.filter((r) => r.status === "pending");

  const filtered = all
    .filter((r) => (company === "all" || r.companyId === company) && (bin === "all" || r.binId === bin) && (status === "all" || r.status === status))
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));

  const filtersOn = company !== "all" || bin !== "all" || status !== "all";

  function resolve(id: string, binId: string, result: "collected" | "missed") {
    resolveRecord(id, result);
    show(result === "collected" ? `${binName(binId)} collected, fill reset to 0%` : `${binName(binId)} pickup missed, bin stays full`);
  }

  function actions(id: string, binId: string) {
    return (
      <div className="flex gap-1.5">
        <button onClick={() => resolve(id, binId, "collected")} className={`${btn} border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-900/30`}>
          Collected
        </button>
        <button onClick={() => resolve(id, binId, "missed")} className={`${btn} border-red-300 text-red-700 hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-900/30`}>
          Missed
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-xl font-medium">Collections</h1>
      <p className={`mb-4 mt-1 ${sub}`}>Pickup results are recorded by hand here to simulate the company&rsquo;s response.</p>

      <div className="mb-4 grid grid-cols-3 gap-3">
        {[
          ["Collected", collected, "text-emerald-600"],
          ["Missed", missed, "text-red-600"],
          ["Pending", pending.length, "text-amber-600"],
        ].map(([label, value, color]) => (
          <div key={label as string} className={card}>
            <p className={sub}>{label}</p>
            <p className={`text-2xl font-medium ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className={`${card} mb-4`}>
        <p className="mb-2 text-sm font-medium">Waiting for pickup</p>
        {pending.length === 0 ? (
          <p className={sub}>No open requests. Send one from the Bins or Alerts page.</p>
        ) : (
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {pending.map((r) => {
              const b = state.bins.find((x) => x.id === r.binId);
              return (
                <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
                  <div>
                    <p>{binName(r.binId)} <span className={sub}>({b ? `${b.fillLevel}%` : "-"} full now)</span></p>
                    <p className={sub}>{companyName(r.companyId)} · requested {formatDateTime(r.date)}</p>
                  </div>
                  {actions(r.id, r.binId)}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <div className={card}>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <select value={company} onChange={(e) => setCompany(e.target.value)} className={select} aria-label="Company filter">
            <option value="all">All companies</option>
            {state.companies.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select value={bin} onChange={(e) => setBin(e.target.value)} className={select} aria-label="Bin filter">
            <option value="all">All bins</option>
            {state.bins.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={select} aria-label="Status filter">
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="collected">Collected</option>
            <option value="missed">Missed</option>
          </select>
          {filtersOn && (
            <button onClick={() => { setCompany("all"); setBin("all"); setStatus("all"); }} className="text-xs text-emerald-700 underline dark:text-emerald-300">
              Clear filters
            </button>
          )}
          <span className={`ml-auto ${sub}`}>{filtered.length} of {all.length} records</span>
        </div>

        {filtered.length === 0 ? (
          <p className={sub}>No records match these filters.</p>
        ) : (
          <div className="max-h-[28rem] overflow-auto">
            <table className="w-full text-left text-sm">
              <thead className={sub}>
                <tr>
                  {["Date", "Bin", "Company", "Status", ""].map((h) => <th key={h} className="px-2 py-1.5 font-normal">{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id} className="border-t border-slate-100 dark:border-slate-800">
                    <td className="whitespace-nowrap px-2 py-2">{formatDate(r.date)}</td>
                    <td className="px-2 py-2">{binName(r.binId)}</td>
                    <td className="px-2 py-2">{companyName(r.companyId)}</td>
                    <td className="px-2 py-2"><RecordBadge status={r.status} /></td>
                    <td className="px-2 py-2">{r.status === "pending" ? actions(r.id, r.binId) : null}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
