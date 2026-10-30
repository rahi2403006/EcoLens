export interface AdviceRow {
  category: string;
  bin: string;
  instruction: string;
}

export const ADVICE_FALLBACK: Record<string, AdviceRow> = {
  plastic: { category: "recyclable", bin: "Plastic Bin", instruction: "Empty and rinse the bottle before recycling." },
  paper: { category: "recyclable", bin: "Paper Bin", instruction: "Keep paper dry and free from food contamination." },
  metal: { category: "recyclable", bin: "Metal Bin", instruction: "Clean containers before recycling." },
  glass: { category: "recyclable", bin: "Glass Bin", instruction: "Handle broken glass carefully." },
  organic: { category: "biodegradable", bin: "Organic Bin", instruction: "Place food and plant waste in the organic waste stream." },
  other: { category: "general", bin: "General Bin", instruction: "Dispose according to local waste-management guidance." },
};

export const CLASS_ORDER = ["plastic", "paper", "metal", "glass", "organic", "other"] as const;
