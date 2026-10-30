import { Link } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useMonitoring } from "../hooks/useMonitoring";
import { useHistory } from "../hooks/useHistory";
import { StatCard } from "../components/StatCard";
import { ChartCard } from "../components/ChartCard";
import { STATUS_COLOR, STATUS_LABEL } from "../lib/binStatus";
import { CLASS_ORDER } from "../data/advice";
import type { BinStatus } from "../types/monitoring";

const tooltipStyle = {
  background: "var(--tt-bg)",
  color: "var(--tt-fg)",
  border: "1px solid var(--tt-bd)",
  borderRadius: 8,
  fontSize: 12,
};
const tick = { fill: "currentColor", fontSize: 12 };
const STATUSES: BinStatus[] = ["normal", "warning", "full", "faulty"];

export function Analytics() {
  const { state } = useMonitoring();
  const { history } = useHistory();

  const total = history.length;
  const avgConf = total ? Math.round((history.reduce((s, h) => s + h.confidence, 0) / total) * 100) : 0;
  const recyclable = total ? Math.round((history.filter((h) => h.category === "recyclable").length / total) * 100) : 0;
  const fullBins = state.bins.filter((b) => b.status === "full").length;
  const missed = state.records.filter((r) => r.status === "missed").length;

  const byClass = CLASS_ORDER.map((c) => ({ name: c, count: history.filter((h) => h.object === c).length }));
  const byStatus = STATUSES.map((s) => ({ name: STATUS_LABEL[s], value: state.bins.filter((b) => b.status === s).length, color: STATUS_COLOR[s] }));
  const byCompany = state.companies.map((c) => ({
    name: c.name,
    collected: state.records.filter((r) => r.companyId === c.id && r.status === "collected").length,
    missed: state.records.filter((r) => r.companyId === c.id && r.status === "missed").length,
  }));

  return (
    <div>
      <h1 className="mb-1 text-xl font-medium">Analytics</h1>
      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-3">
        <StatCard label="Detections" value={total} hint="saved in history (max 20)" />
        <StatCard label="Average confidence" value={total ? `${avgConf}%` : "-"} />
        <StatCard label="Recyclable" value={total ? `${recyclable}%` : "-"} hint="of detected items" />
        <StatCard label="Full bins now" value={fullBins} />
        <StatCard label="Requests sent" value={state.alerts.length} />
        <StatCard label="Missed pickups" value={missed} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard title="Detections by category" className="lg:col-span-2">
          {total === 0 ? (
            <p className="py-16 text-center text-sm">
              No detections yet. <Link to="/" className="text-emerald-700 underline dark:text-emerald-300">Detect an item</Link> first.
            </p>
          ) : (
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={byClass}>
                  <CartesianGrid stroke="currentColor" strokeOpacity={0.15} vertical={false} />
                  <XAxis dataKey="name" tick={tick} />
                  <YAxis allowDecimals={false} tick={tick} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "currentColor", fillOpacity: 0.08 }} />
                  <Bar dataKey="count" name="Detections" fill="#1D9E75" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </ChartCard>

        <ChartCard title="Bins by condition">
          <div className="relative h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={byStatus} dataKey="value" nameKey="name" innerRadius="55%" outerRadius="80%" paddingAngle={2} stroke="none">
                  {byStatus.map((d) => <Cell key={d.name} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-x-0 top-[38%] text-center">
              <p className="text-2xl font-medium text-slate-800 dark:text-slate-100">{state.bins.length}</p>
              <p className="text-[11px]">bins</p>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Collected vs missed, by company" className="lg:col-span-3">
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byCompany} layout="vertical" margin={{ left: 10 }}>
                <CartesianGrid stroke="currentColor" strokeOpacity={0.15} horizontal={false} />
                <XAxis type="number" allowDecimals={false} tick={tick} />
                <YAxis type="category" dataKey="name" width={150} tick={tick} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "currentColor", fillOpacity: 0.08 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="collected" name="Collected" stackId="a" fill="#1D9E75" />
                <Bar dataKey="missed" name="Missed" stackId="a" fill="#E24B4A" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
