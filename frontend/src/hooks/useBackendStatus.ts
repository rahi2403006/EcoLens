import { useEffect, useState } from "react";
import { checkHealth } from "../services/api";

export function useBackendStatus(intervalMs = 15000) {
  const [online, setOnline] = useState<boolean | null>(null);

  useEffect(() => {
    let active = true;
    const run = async () => {
      const ok = await checkHealth();
      if (active) setOnline(ok);
    };
    run();
    const id = setInterval(run, intervalMs);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, [intervalMs]);

  return online;
}
