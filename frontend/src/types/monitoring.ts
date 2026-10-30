export type BinStatus = "normal" | "warning" | "full" | "faulty";
export type AlertMode = "manual" | "auto";
export type CollectionStatus = "pending" | "collected" | "missed";

export interface Bin {
  id: string;
  name: string;
  location: string;
  lat: number;
  lng: number;
  fillLevel: number; // 0-100
  status: BinStatus;
  sensorOnline: boolean;
  companyId: string;
  lastUpdated: string; // ISO
  openRequest: boolean; // a request was sent this full cycle; cleared only when collected
}

export interface Company {
  id: string;
  name: string;
  contact: string;
  area: string;
}

export interface AlertLog {
  id: string;
  binId: string;
  companyId: string;
  mode: AlertMode;
  message: string;
  sentAt: string;
}

export interface CollectionRecord {
  id: string;
  binId: string;
  companyId: string;
  date: string;
  status: CollectionStatus;
  alertId?: string;
}

export interface MonitoringState {
  bins: Bin[];
  companies: Company[];
  alerts: AlertLog[];
  records: CollectionRecord[];
  autoMode: boolean;
}

export type Speed = "slow" | "normal" | "fast";
