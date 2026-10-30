import { useMonitoring } from "../hooks/useMonitoring";
import { StatusBadge } from "../components/StatusBadge";
import { FillBar } from "../components/FillBar";
import { Switch } from "../components/Switch";
import { formatDateTime } from "../lib/format";

const card = "rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900";
const sub = "text-xs text-slate-500 dark:text-slate-400";

export function Alerts() {
  const { state, setAutoMode, sendRequest } = useMonitoring();

  const needs = state.bins
    .filter((b) => b.status === "warning" || b.status === "full")
    .sort((a, b) => b.fillLevel - a.fillLevel);
  const pendingIds = new Set(state.records.filter((r) => r.status === "pending").map((r) => r.binId));
  const nameOf = (id: string) => state.bins.find((b) => b.id === id)?.name ?? id;
  const companyOf = (id: string) => state.companies.find((c) => c.id === id)?.name ?? id;

  return (
    <div>
      <h1 className="text-xl font-medium">Alerts</h1>

      <div className={`${card} mb-4 flex items-center justify-between gap-4`}>
        <div>
          <p className="font-medium">Automatic mode</p>
        </div>
        <Switch checked={state.autoMode} onChange={setAutoMode} label="Automatic mode" />
      </div>

      <div className={`${card} mb-4`}>
        <p className="mb-2 text-sm font-medium">            Full Bins </p>
        {needs.length === 0 ? (
          <p className={sub}>No bin needs collection right now.</p>
        ) : (
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {needs.map((b) => (
              <li key={b.id} className="grid grid-cols-1 items-center gap-2 py-2 text-sm sm:grid-cols-[1.2fr_1fr_auto_auto]">
                <div>
                  <p>{b.name}</p>
                  <p className={sub}>{companyOf(b.companyId)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <FillBar value={b.fillLevel} status={b.status} />
                  <span className="w-9 text-right text-xs">{b.fillLevel}%</span>
                </div>
                <StatusBadge status={b.status} />
                <button
                  onClick={() => sendRequest(b.id, "manual")}
                  disabled={pendingIds.has(b.id)}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  {pendingIds.has(b.id) ? "Request sent" : b.openRequest ? "Send again" : "Send request"}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={card}>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium">Alert log</p>
          <p className={sub}>{state.alerts.length} sent</p>
        </div>
        {state.alerts.length === 0 ? (
          <p className={sub}>No requests yet. Send one above or turn on automatic mode.</p>
        ) : (
          <div className="max-h-80 overflow-auto">
            <table className="w-full text-left text-sm">
              <thead className={sub}>
                <tr>
                  {["Time", "Bin", "Company", "Mode", "Message"].map((h) => (
                    <th key={h} className="px-2 py-1.5 font-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {state.alerts.map((a) => (
                  <tr key={a.id} className="border-t border-slate-100 align-top dark:border-slate-800">
                    <td className="whitespace-nowrap px-2 py-2">{formatDateTime(a.sentAt)}</td>
                    <td className="px-2 py-2">{nameOf(a.binId)}</td>
                    <td className="px-2 py-2">{companyOf(a.companyId)}</td>
                    <td className="px-2 py-2">
                      <span className={`rounded px-2 py-0.5 text-xs ${a.mode === "auto" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200" : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200"}`}>
                        {a.mode}
                      </span>
                    </td>
                    <td className="min-w-[14rem] px-2 py-2 text-slate-600 dark:text-slate-300">{a.message}</td>
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
