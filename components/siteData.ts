export interface MachineSpec {
  label: string;
  value: string;
}

export interface Machine {
  id: string;
  model: string;
  make: string;
  category: string;
  units?: string;
  image: string;
  specs: MachineSpec[];
}

export const MACHINES: Machine[] = [
  {
    id: "dmu-210p",
    model: "DMU 210 P",
    make: "DMG — Germany",
    category: "5-Axis Milling Center",
    image: "/machines/dmu-210p.webp",
    specs: [
      { label: "X / Y / Z Axis", value: "1800 / 2100 / 1250 mm" },
      { label: "B-Axis", value: "-7° to 180°" },
      { label: "C-Axis", value: "360° (0.001° movement)" },
      { label: "Table Size", value: "Dia. 1700 mm" },
      { label: "Max. RPM", value: "12,000 rpm @ 32/44 kW" },
      { label: "Max. Table Load", value: "8,000 kg" },
      { label: "Taper", value: "SK50" },
    ],
  },
  {
    id: "dmc-125-fd",
    model: "DMC 125 FD duoBLOCK",
    make: "DMG — Germany",
    category: "5-Axis Mill Turn Center",
    image: "/machines/dmc-125-fd.webp",
    specs: [
      { label: "X / Y / Z Axis", value: "1250 / 1000 / 1000 mm" },
      { label: "B-Axis", value: "-7° to +180.5°" },
      { label: "C-Axis", value: "10–500 rpm @ 5700/6400 Nm" },
      { label: "Table Size", value: "Dia. 1100 mm" },
      { label: "Max. RPM", value: "10,000 rpm @ 32/44 kW" },
      { label: "Max. Table Load", value: "1,500 kg" },
      { label: "Taper", value: "HSK 100" },
    ],
  },
  {
    id: "dmu-80-fd",
    model: "DMU 80 FD",
    make: "DMG MORI",
    category: "5-Axis Mill Turn Center",
    image: "/machines/dmu-80-fd.webp",
    specs: [
      { label: "X / Y / Z Axis", value: "800 / 800 / 800 mm" },
      { label: "B-Axis", value: "-7° to 180° × 0.001°" },
      { label: "C-Axis", value: "360° × 0.001° · 1–800 rpm" },
      { label: "Table Size", value: "800 × 630 mm" },
      { label: "Max. Turning Diameter", value: "800 mm" },
      { label: "Max. Spindle Power", value: "38 kW · 10,000 rpm" },
      { label: "Taper", value: "HSK 100" },
    ],
  },
  {
    id: "dmu-60t",
    model: "DMU 60 T monoBLOCK",
    make: "DMG — Germany",
    category: "5-Axis Milling Center",
    units: "2 machines",
    image: "/machines/dmu-60t.webp",
    specs: [
      { label: "X / Y / Z Axis", value: "780 / 560 / 560 mm" },
      { label: "B-Axis", value: "+30.1° to -120.1°" },
      { label: "C-Axis", value: "360°" },
      { label: "Table Size", value: "630 × 500 mm" },
      { label: "Max. RPM", value: "12,000 rpm @ 19/39 kW" },
      { label: "Max. Table Load", value: "400 kg" },
      { label: "Taper", value: "SK40" },
    ],
  },
  {
    id: "ctx-beta-1250-tc",
    model: "CTX BETA 1250 TC",
    make: "DMG MORI",
    category: "5-Axis Turn Mill Center · Subspindle",
    image: "/machines/ctx-beta-1250-tc.webp",
    specs: [
      { label: "Max. Turning Diameter", value: "500 mm" },
      { label: "X / Y / Z Axis", value: "450 / 100 / 1300 mm" },
      { label: "B-Axis", value: "220° · 12,000 rpm" },
      { label: "Main Spindle — Chuck", value: "6,000 rpm" },
      { label: "Sub Spindle — Chuck", value: "4,000 rpm" },
      { label: "Main Spindle Power", value: "34 kW" },
      { label: "Tool Holder", value: "HSK 63" },
    ],
  },
  {
    id: "mazak-integrex-400",
    model: "INTEGREX 400 IV ST",
    make: "MAZAK",
    category: "5-Axis Turn Mill Center · Subspindle",
    image: "/machines/mazak-integrex-400.webp",
    specs: [
      { label: "Max. Turning Diameter", value: "650 mm" },
      { label: "X / Y / Z Axis", value: "615 / 260 / 1500 mm" },
      { label: "B-Axis", value: "30° – 210° · 12,000 rpm" },
      { label: "Main Spindle — Chuck", value: "6,000 rpm" },
      { label: "Sub Spindle — Chuck", value: "4,000 rpm" },
      { label: "Main Spindle Power", value: "29.8 kW" },
      { label: "Tool Holder", value: "HSK 63" },
    ],
  },
  {
    id: "hueller-bluestar-5",
    model: "Bluestar 5",
    make: "Hüller Hille",
    category: "Horizontal Machining Center",
    units: "2 machines",
    image: "/machines/hueller-bluestar-5.webp",
    specs: [
      { label: "X / Y / Z Axis", value: "700 / 630 / 700 mm" },
      { label: "C-Axis", value: "Yes (Pitch: 0.001°)" },
      { label: "Table Size", value: "500 × 500 mm" },
      { label: "Spindle Speed", value: "10,000 rpm" },
      { label: "Spindle Power", value: "18 kW" },
    ],
  },
  {
    id: "ibarmia-zv45",
    model: "ZV 45 / L3000",
    make: "IBARMIA — Germany",
    category: "4-Axis Vertical Machining Center",
    image: "/machines/ibarmia-zv45.webp",
    specs: [
      { label: "X / Y / Z Axis", value: "3000 / 800 / 800 mm" },
      { label: "B-Axis", value: "Yes" },
      { label: "Table Size", value: "3000 × 850 mm" },
      { label: "Spindle Speed", value: "8,000 rpm" },
      { label: "Spindle Power", value: "45 kW" },
    ],
  },
  {
    id: "chiron-dz18",
    model: "Chiron DZ 18",
    make: "Chiron — Germany",
    category: "4-Axis Twin Spindle VMC",
    image: "/machines/chiron-dz18.webp",
    specs: [
      { label: "X / Y / Z Axis", value: "830 / 550 / 600 mm" },
      { label: "B-Axis", value: "Yes" },
      { label: "Table Size", value: "950 × 660 mm" },
      { label: "Spindle Speed", value: "10,000 rpm" },
      { label: "Spindle Power", value: "2 × 18 kW" },
    ],
  },
  {
    id: "stankoimport-53a80h",
    model: "STANKOIMPORT 53A80H",
    make: "Stankoimport",
    category: "Gear Hobbing Machine",
    image: "/machines/stankoimport-53a80h.webp",
    specs: [
      { label: "Max. Gear Diameter", value: "800 mm" },
      { label: "Module Range", value: "8 – 10" },
      { label: "Max. Helix Angle", value: "±45°" },
      { label: "Hob Dimensions", value: "200 × 200 mm (L × D)" },
      { label: "Milling Spindle Range", value: "40 – 405 rpm" },
      { label: "Vertical Support Travel", value: "400 mm" },
    ],
  },
];

export interface Part {
  id: string;
  name: string;
  sector: string;
  image: string;
}

export const PARTS: Part[] = [
  { id: "impeller-hub", name: "Impeller Hub", sector: "Turbomachinery", image: "/parts/impeller-hub.webp" },
  { id: "machine-bed", name: "Machine Bed", sector: "Machine Tools", image: "/parts/machine-bed.webp" },
  { id: "aero-parts", name: "Aero Parts", sector: "Aerospace", image: "/parts/aero-parts.webp" },
  { id: "gear-case", name: "Gear Case", sector: "Power Transmission", image: "/parts/gear-case.webp" },
  { id: "turbocharger-housing", name: "Turbocharger Housing", sector: "Automotive", image: "/parts/turbocharger-housing.webp" },
  { id: "compressor-parts", name: "Compressor Parts", sector: "Oil & Gas", image: "/parts/compressor-parts.webp" },
  { id: "diesel-engine-parts", name: "Diesel Engine Parts", sector: "Heavy Engines", image: "/parts/diesel-engine-parts.webp" },
  { id: "engine-casing", name: "Engine Casing", sector: "Commercial Vehicles", image: "/parts/engine-casing.webp" },
];

export interface QualityAsset {
  id: string;
  name: string;
  role: string;
  image: string;
  specs: MachineSpec[];
}

export const QUALITY_ASSETS: QualityAsset[] = [
  {
    id: "hexagon-cmm",
    name: "Hexagon Global CMM",
    role: "3-Axis Coordinate Measuring Machine",
    image: "/quality/hexagon-cmm.webp",
    specs: [
      { label: "Working Area (X/Y/Z)", value: "900 / 1500 / 800 mm" },
      { label: "E0, MPE", value: "2.2 + 3L/1000 µm" },
      { label: "R0, MPL", value: "2.2 µm" },
      { label: "Probe Head", value: "Indexable Renishaw PH10T" },
      { label: "Software", value: "CMM Manager" },
    ],
  },
  {
    id: "faro-arm",
    name: "FARO Arm Prime 2.4 m",
    role: "6-Axis Portable Measuring Arm",
    image: "/quality/faro-arm.webp",
    specs: [
      { label: "Measuring Radius", value: "2.4 m" },
      { label: "Resolution", value: "24 µm" },
    ],
  },
  {
    id: "zoller-presetter",
    name: "Zoller Smile 420",
    role: "Tool Presetter & Measurement",
    image: "/quality/zoller-presetter.webp",
    specs: [
      { label: "Max. Tool Diameter", value: "420 mm" },
      { label: "Max. Tool Length", value: "420 mm" },
      { label: "Focusing", value: "Autofokus · Pilot 4.0" },
      { label: "Spindle Types", value: "HSK 100/53 · SK 50/40 · BT 40" },
    ],
  },
  {
    id: "mahr-digimar",
    name: "MAHR Digimar 816 CL",
    role: "Digital Height Gauge",
    image: "/quality/mahr-digimar.webp",
    specs: [{ label: "Application", value: "Precision height measurement" }],
  },
  {
    id: "haimer-shrink-fit",
    name: "Haimer Power Clamp",
    role: "Shrink Fit Tool Clamping",
    image: "/quality/haimer-shrink-fit.webp",
    specs: [{ label: "Application", value: "Induction shrink-fit tooling" }],
  },
];

export const INSTRUMENTS: { description: string; range: string; make: string }[] = [
  { description: "Dial Vernier", range: "0–300 mm", make: "Mitutoyo" },
  { description: "Digital Vernier", range: "0–300 mm", make: "Kency" },
  { description: "Depth Vernier", range: "0–300 mm", make: "Mitutoyo" },
  { description: "Analog Vernier", range: "0–600 mm", make: "Mitutoyo" },
  { description: "Analog Vernier", range: "0–1000 mm", make: "Mitutoyo" },
  { description: "Bore Dial", range: "0–350 mm", make: "Mitutoyo" },
  { description: "Outside Micrometer", range: "0–150 mm", make: "Mitutoyo" },
  { description: "Outside Micrometer", range: "150–300 mm", make: "Mitutoyo" },
  { description: "Vernier Height Gauge", range: "0–2000 mm", make: "Mitutoyo" },
];
