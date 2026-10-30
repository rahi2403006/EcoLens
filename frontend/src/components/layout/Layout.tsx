import { NavLink, Outlet } from "react-router-dom";
import { Activity, Bell, Info, Leaf, MapPin, Moon, ScanLine, Sun, Truck } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";
import { useBackendStatus } from "../../hooks/useBackendStatus";

const NAV = [
  { to: "/", label: "Detect", icon: ScanLine, end: true },
  { to: "/bins", label: "Bins", icon: MapPin, end: false },
  { to: "/alerts", label: "Alerts", icon: Bell, end: false },
  { to: "/collections", label: "Collections", icon: Truck, end: false },
  { to: "/analytics", label: "Analytics", icon: Activity, end: false },
  { to: "/about", label: "About", icon: Info, end: false },
];

export function Layout() {
  const { theme, toggle } = useTheme();
  const online = useBackendStatus();

  const sideLink = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
      isActive
        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
    }`;
  const bottomLink = ({ isActive }: { isActive: boolean }) =>
    `flex flex-1 flex-col items-center gap-0.5 py-2 text-[10px] ${
      isActive ? "text-emerald-700 dark:text-emerald-300" : "text-slate-500 dark:text-slate-400"
    }`;

  const status = (
    <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
      <span className={`h-2 w-2 rounded-full ${online === null ? "bg-slate-400" : online ? "bg-emerald-500" : "bg-red-500"}`} />
      {online === null ? "Checking..." : online ? "Backend online" : "Backend offline"}
    </span>
  );
  const themeBtn = (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
    >
      {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
      {theme === "dark" ? "Light theme" : "Dark theme"}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 md:flex">
      <aside className="sticky top-0 hidden h-screen w-56 shrink-0 flex-col border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 md:flex">
        <div className="mb-6 flex items-center gap-2 px-2 text-lg font-medium">
          <Leaf size={20} className="text-emerald-600" /> EcoLens
        </div>
        <nav className="flex flex-col gap-1">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} className={sideLink}>
              <Icon size={16} /> {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2 px-1">
          {status}
          {themeBtn}
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900 md:hidden">
          <span className="flex items-center gap-2 font-medium"><Leaf size={18} className="text-emerald-600" /> EcoLens</span>
          <div className="flex items-center gap-2">{status}{themeBtn}</div>
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 p-4 pb-24 md:p-8 md:pb-8">
          <Outlet />
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-[1100] flex border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 md:hidden">
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={bottomLink}>
            <Icon size={18} /> {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
