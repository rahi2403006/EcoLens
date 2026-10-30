import { useEffect, useRef } from "react";
import { useMonitoring } from "../hooks/useMonitoring";
import { useToast } from "../hooks/useToast";

// Shows a toast whenever a new collection request appears (manual or automatic, on any page).
export function AlertToaster() {
  const { state } = useMonitoring();
  const { show } = useToast();
  const lastId = useRef<string | undefined>(state.alerts[0]?.id);

  useEffect(() => {
    const latest = state.alerts[0];
    if (!latest || latest.id === lastId.current) {
      lastId.current = latest?.id;
      return;
    }
    lastId.current = latest.id;
    const bin = state.bins.find((b) => b.id === latest.binId);
    const company = state.companies.find((c) => c.id === latest.companyId);
    show(`${latest.mode === "auto" ? "Auto request" : "Request"} sent: ${bin?.name ?? "bin"} to ${company?.name ?? "company"}`);
  }, [state.alerts, state.bins, state.companies, show]);

  return null;
}
