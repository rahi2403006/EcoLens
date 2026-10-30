import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Bin, BinStatus } from "../types/monitoring";
import { STATUS_COLOR } from "../lib/binStatus";

const iconCache = new Map<string, L.DivIcon>();
function getIcon(status: BinStatus, selected: boolean): L.DivIcon {
  const key = `${status}-${selected}`;
  let icon = iconCache.get(key);
  if (!icon) {
    icon = L.divIcon({
      className: "",
      html: `<div class="ec-pin${selected ? " ec-pin-sel" : ""}" style="background:${STATUS_COLOR[status]}"></div>`,
      iconSize: [22, 22],
      iconAnchor: [11, 11],
    });
    iconCache.set(key, icon);
  }
  return icon;
}

function FlyToSelected({ bin }: { bin: Bin | undefined }) {
  const map = useMap();
  const id = bin?.id;
  const lat = bin?.lat;
  const lng = bin?.lng;
  useEffect(() => {
    if (lat !== undefined && lng !== undefined) {
      map.flyTo([lat, lng], Math.max(map.getZoom(), 16), { duration: 0.6 });
    }
  }, [map, id, lat, lng]);
  return null;
}

interface BinMapProps {
  bins: Bin[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function BinMap({ bins, selectedId, onSelect }: BinMapProps) {
  const center: [number, number] = [
    bins.reduce((s, b) => s + b.lat, 0) / bins.length,
    bins.reduce((s, b) => s + b.lng, 0) / bins.length,
  ];

  return (
    <MapContainer center={center} zoom={16} scrollWheelZoom className="z-0 h-[380px] w-full rounded-lg md:h-[440px]">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {bins.map((b) => (
        <Marker
          key={b.id}
          position={[b.lat, b.lng]}
          icon={getIcon(b.status, b.id === selectedId)}
          eventHandlers={{ click: () => onSelect(b.id) }}
        >
          <Tooltip direction="top" offset={[0, -10]}>{b.name} ({b.fillLevel}%)</Tooltip>
        </Marker>
      ))}
      <FlyToSelected bin={bins.find((b) => b.id === selectedId)} />
    </MapContainer>
  );
}
