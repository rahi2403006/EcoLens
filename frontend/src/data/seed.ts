import type { Bin, Company, CollectionRecord, MonitoringState } from "../types/monitoring";
import { statusFromFill } from "../lib/binStatus";

const daysAgo = (d: number, hour = 10) => {
  const x = new Date();
  x.setDate(x.getDate() - d);
  x.setHours(hour, 0, 0, 0);
  return x.toISOString();
};

const COMPANIES: Company[] = [
  { id: "c1", name: "GreenCity Ltd.", contact: "+880 1700-000001", area: "Campus North" },
  { id: "c2", name: "CleanRaj Co.", contact: "+880 1700-000002", area: "Campus South" },
  { id: "c3", name: "EcoTrans", contact: "+880 1700-000003", area: "Academic Zone" },
  { id: "c4", name: "Rajshahi Waste Services", contact: "+880 1700-000004", area: "Central" },
];

const mk = (
  id: string, name: string, location: string, lat: number, lng: number,
  fill: number, online: boolean, companyId: string,
): Bin => ({
  id, name, location, lat, lng, fillLevel: fill, sensorOnline: online,
  status: statusFromFill(fill, online), companyId,
  lastUpdated: new Date().toISOString(), openRequest: false,
});

// function makeBins(): Bin[] {
//   return [
//     mk("b1", "Cafeteria", "Cafeteria Side", 24.3652, 88.6282, 91, true, "c1"),
//     mk("b2", "CSE Building", "Academic Area", 24.3644, 88.6269, 87, true, "c1"),
//     mk("b3", "Central Library", "Library Front", 24.3633, 88.6275, 68, true, "c3"),
//     mk("b4", "RUET Main Gate", "Main Gate Road", 24.3629, 88.629, 61, true, "c2"),
//     mk("b5", "Hall Gate", "Residential Hall", 24.366, 88.6295, 24, true, "c2"),
//     mk("b6", "Sports Field", "Field Entrance", 24.3622, 88.6265, 40, false, "c4"),
//     mk("b7", "Admin Building", "Admin Block", 24.3648, 88.63, 35, true, "c3"),
//     mk("b8", "Medical Centre", "Medical Road", 24.3638, 88.6258, 72, true, "c4"),
//   ];
// }

function makeRecords(): CollectionRecord[] {
  const r = (id: string, binId: string, companyId: string, d: number, status: "collected" | "missed"): CollectionRecord =>
    ({ id, binId, companyId, date: daysAgo(d), status });
  return [
    r("r1", "b1", "c1", 2, "collected"), r("r2", "b2", "c1", 4, "collected"),
    r("r3", "b3", "c3", 6, "missed"), r("r4", "b4", "c2", 7, "collected"),
    r("r5", "b5", "c2", 9, "collected"), r("r6", "b7", "c3", 11, "collected"),
    r("r7", "b4", "c2", 13, "missed"), r("r8", "b8", "c4", 15, "collected"),
    r("r9", "b1", "c1", 17, "collected"), r("r10", "b6", "c4", 19, "missed"),
    r("r11", "b2", "c1", 21, "collected"),
  ];
}

export function createSeed(): MonitoringState {
  return { bins: makeBins(), companies: COMPANIES, alerts: [], records: makeRecords(), autoMode: false };
}
