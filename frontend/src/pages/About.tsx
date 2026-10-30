import { useEffect, useState } from "react";
import { RotateCcw } from "lucide-react";
import { fetchRecommendations } from "../services/api";
import { ADVICE_FALLBACK, CLASS_ORDER, type AdviceRow } from "../data/advice";
import { useMonitoring } from "../hooks/useMonitoring";
import { useToast } from "../hooks/useToast";

const card = "rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900";
const sub = "text-xs text-slate-500 dark:text-slate-400";

const CATEGORY_STYLE: Record<string, string> = {
  recyclable: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200",
  biodegradable: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200",
  general: "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200",
};

const STACK = [
  ["AI model", "YOLOv8n (Ultralytics, PyTorch), six classes"],
  ["Backend", "FastAPI, Pydantic, Uvicorn"],
  ["Frontend", "React, TypeScript, Vite, Tailwind CSS, React Router"],
  ["Charts and map", "Recharts, Leaflet with OpenStreetMap"],
];

export function About() {
  const [advice, setAdvice] = useState<Record<string, AdviceRow>>(ADVICE_FALLBACK);
  const [live, setLive] = useState<boolean | null>(null);
  const { reset } = useMonitoring();
  const { show } = useToast();

  useEffect(() => {
    let active = true;
    fetchRecommendations().then((data) => {
      if (!active) return;
      if (data) setAdvice(data);
      setLive(data !== null);
    });
    return () => {
      active = false;
    };
  }, []);

  function handleReset() {
    if (window.confirm("Reset the bins, alerts and collection records to the starting demo data?")) {
      reset();
      show("Demo data reset");
    }
  }

  return (
    <div className="max-w-3xl">
      <h1 className="mb-4 text-xl font-medium">About EcoLens</h1>

      <div className={`${card} mb-4`}>
        <p className="leading-relaxed">
          EcoLens identifies a waste item from a photo and tells you how to dispose of it. A separate bin monitoring module shows bin
          condition, collection requests and pickup history using simulated data.
        </p>
        <ol className="mt-3 list-inside list-decimal space-y-1 text-sm text-slate-600 dark:text-slate-300">
          <li>Open <b>Detect</b>, upload a photo or use the webcam, then press Detect waste.</li>
          <li>Read the category, bin and instruction. If the app is not sure, it says so and gives no advice.</li>
          <li>Open <b>Bins</b> to see where the bins are and how full they are.</li>
          <li>Use <b>Alerts</b> to request a pickup, and <b>Collections</b> to record Collected or Missed.</li>
        </ol>
      </div>

      <div className={`${card} mb-4`}>
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-medium">Classes and advice</p>
          <p className={sub}>{live === null ? "Loading..." : live ? "From the backend" : "Backend offline, showing built-in copy"}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className={sub}>
              <tr>{["Class", "Category", "Bin", "Instruction"].map((h) => <th key={h} className="px-2 py-1.5 font-normal">{h}</th>)}</tr>
            </thead>
            <tbody>
              {CLASS_ORDER.map((c) => {
                const a = advice[c];
                if (!a) return null;
                return (
                  <tr key={c} className="border-t border-slate-100 align-top dark:border-slate-800">
                    <td className="px-2 py-2 capitalize">{c}</td>
                    <td className="px-2 py-2"><span className={`rounded px-2 py-0.5 text-xs ${CATEGORY_STYLE[a.category] ?? CATEGORY_STYLE.general}`}>{a.category}</span></td>
                    <td className="px-2 py-2">{a.bin}</td>
                    <td className="min-w-[12rem] px-2 py-2 text-slate-600 dark:text-slate-300">{a.instruction}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`${card} mb-4`}>
        <p className="mb-2 text-sm font-medium">Built with</p>
        <dl className="grid gap-x-4 gap-y-1.5 text-sm sm:grid-cols-[8rem_1fr]">
          {STACK.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className={sub}>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>

      </div>

      <button
        onClick={handleReset}
        className="flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
      >
        <RotateCcw size={14} /> Reset
      </button>
    </div>
  );
}
