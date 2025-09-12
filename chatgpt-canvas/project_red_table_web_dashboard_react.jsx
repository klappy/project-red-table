import React, { useMemo, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

// ---------- Configuration ----------
// Default public dataset to auto-load on first visit (CSV or XLSX with CORS enabled)
const DEFAULT_DATA_URL = "https://raw.githubusercontent.com/klappy/project-red-table/refs/heads/main/AAG_Languages_extracted.csv";

// ---------- Utilities ----------
const CARD_MIN_HEIGHT = 300; // keep tables & charts visually equal
const CHART_INNER_HEIGHT = 220; // inner plotting area height so the whole card ≈ CARD_MIN_HEIGHT
function normalizeHeader(h: unknown) { return String(h).trim(); }
function toNumber(x: unknown) { const n = Number(String(x).replace(/[\,\s]/g, "")); return Number.isFinite(n) ? n : undefined; }

// ---------- Derivation Rules ----------
const RULES = {
  goalNotMet: (row: any) => String(row["All Access Status"]).toLowerCase() !== "goal met in the language".toLowerCase(),
  isPortion: (row: any) => toNumber(row["All Access Chapter Goal"]) === 25,
  isNT: (row: any) => toNumber(row["All Access Chapter Goal"]) === 260,
  isFB: (row: any) => toNumber(row["All Access Chapter Goal"]) === 1189,
  isTwoFB: (row: any) => toNumber(row["All Access Chapter Goal"]) >= 2000,
  activeTranslation: (row: any) => String(row["Translation Status"] || "").toLowerCase().includes("work in progress"),
  activeLDSE: (row: any) => ["expressed need", "potential need", "limited or old scripture"].some((k) => String(row["Translation Status"] || "").toLowerCase().includes(k)),
  noActivity: (row: any) => String(row["All Access Status"] || "").toLowerCase().includes("translation not started"),
  inRedSet: (row: any) => !RULES.isPortion(row) && RULES.goalNotMet(row) && (RULES.noActivity(row) || RULES.activeLDSE(row) || RULES.activeTranslation(row)),
};

// ---------- Summary Derivation ----------
function deriveSummary(rows: any[]) {
  const noActivity = rows.filter(RULES.noActivity);
  const activeLDSE = rows.filter(RULES.activeLDSE);
  const activeTx = rows.filter(RULES.activeTranslation);
  const risk = rows.filter(RULES.inRedSet);

  function groupByScope(set: any[]) {
    const counts: Record<string, number> = { Portion: 0, NT: 0, FB: 0, "Two FB": 0 };
    set.forEach(r => {
      if (RULES.isPortion(r)) counts.Portion++;
      else if (RULES.isNT(r)) counts.NT++;
      else if (RULES.isFB(r)) counts.FB++;
      else if (RULES.isTwoFB(r)) counts["Two FB"]++;
    });
    return counts;
  }

  const allCounts = groupByScope(rows); // denominators for % charts

  return {
    noActivity: groupByScope(noActivity),
    activeLDSE: groupByScope(activeLDSE),
    activeTx: groupByScope(activeTx),
    risk: groupByScope(risk),
    totals: {
      noActivity: noActivity.length,
      activeLDSE: activeLDSE.length,
      activeTx: activeTx.length,
      risk: risk.length,
      all: allCounts,
    },
  };
}

// ---------- Collapsed Importer (URL + Drag&Drop) ----------
function CollapsedImporter({ onRows }: { onRows: (rows: any[]) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function parseCsvText(text: string): Promise<any[]> {
    return new Promise((resolve) => {
      Papa.parse(text, { header: true, skipEmptyLines: true, transformHeader: normalizeHeader as any, complete: (res) => resolve(res.data as any[]) });
    });
  }

  async function loadFromUrl() {
    if (!url) return;
    setLoading(true); setError("");
    try {
      const resp = await fetch(url);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const contentType = resp.headers.get("content-type") || "";
      if (contentType.includes("sheet") || contentType.includes("excel") || url.match(/\.xlsx?$|^https?:.*[?&]format=xlsx/i)) {
        const ab = await resp.arrayBuffer();
        const wb = XLSX.read(ab, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(ws, { raw: false }) as any[];
        onRows(json);
      } else {
        const text = await resp.text();
        const json = await parseCsvText(text);
        onRows(json);
      }
    } catch (e) {
      console.error(e);
      setError("Couldn't load that URL. Ensure public access + CORS.");
    } finally {
      setLoading(false);
    }
  }

  const onDrop = async (accepted: File[]) => {
    if (!accepted?.length) return;
    setError("");
    const file = accepted[0];
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (ext === "csv") {
      Papa.parse(file, { header: true, skipEmptyLines: true, transformHeader: normalizeHeader as any, complete: (res) => onRows(res.data as any[]) });
    } else if (["xlsx", "xls"].includes(ext || "")) {
      const ab = await file.arrayBuffer();
      const wb = XLSX.read(ab, { type: "array" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(ws, { raw: false }) as any[];
      onRows(json);
    } else {
      setError("Unsupported file type. Use CSV or Excel (.xlsx)");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false });

  return (
    <div>
      <button
        onClick={() => setExpanded(v => !v)}
        className="px-3 py-1.5 rounded-xl border border-dashed text-sm"
        aria-expanded={expanded}
      >
        {expanded ? "— Hide importer" : "+ Import data"}
      </button>

      {expanded && (
        <div className="mt-3 rounded-2xl border bg-white p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Load from public URL</label>
              <div className="flex gap-2">
                <input value={url} onChange={(e)=>setUrl(e.target.value)} placeholder="https://raw.githubusercontent.com/klappy/project-red-table/refs/heads/main/AAG_Languages_extracted.csv" className="w-full px-3 py-2 rounded-xl border" />
                <button onClick={loadFromUrl} disabled={loading || !url} className="px-3 py-2 rounded-xl border shadow-sm bg-gray-900 text-white disabled:opacity-50">{loading ? "Loading…" : "Load"}</button>
              </div>
              <p className="text-xs text-gray-500 mt-1">CSV or Excel; Google Sheets (Publish CSV), GitHub raw, Dropbox (?dl=1), or S3 with CORS.</p>
            </div>
            <div className="w-px bg-gray-200 hidden lg:block" />
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">…or drag & drop a file</label>
              <div {...getRootProps()} className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer ${isDragActive ? "bg-gray-50" : ""}`}>
                <input {...getInputProps()} />
                <div className="text-sm">{isDragActive ? "Drop it here…" : "Drop CSV/XLSX here or click to browse"}</div>
              </div>
            </div>
          </div>
          {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
        </div>
      )}
    </div>
  );
}

// ---------- Shared Button (single definition) ----------
function IconButton({ label, icon, onClick, active }: { label: string; icon: string; onClick: () => void; active?: boolean }) {
  return (
    <button
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-sm bg-white hover:bg-gray-50` }
    >
      <span>{icon}</span>
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

// ---------- Views ----------
function TableView({ title, data, description, highlightRed = false }: { title: string; data: Record<string, number>; description?: string; highlightRed?: boolean; }) {
  const rows = Object.entries(data).map(([scope, count]) => ({ scope, count }));
  return (
    <div className={`rounded-2xl border flex flex-col justify-between ${highlightRed ? "bg-red-50 border-red-300 text-red-700" : "bg-white"}`} style={{ minHeight: CARD_MIN_HEIGHT }}>
      <div>
        <div className={`px-4 pt-3 pb-2 font-semibold ${highlightRed ? "text-red-700" : ""}`}>{title}</div>
        <div className="px-4 pb-4">
          <table className="w-full text-sm border">
            <thead>
              <tr className={`${highlightRed ? "bg-red-100" : "bg-gray-100"}`}><th className="text-left p-2">Scope</th><th className="text-right p-2">Count</th></tr>
            </thead>
            <tbody>
              {rows.map(r => <tr key={r.scope}><td className="p-2">{r.scope}</td><td className="p-2 text-right">{r.count}</td></tr>)}
              <tr className={`font-semibold border-t ${highlightRed ? "text-red-700" : ""}`}><td className="p-2">Total</td><td className="p-2 text-right">{rows.reduce((a,r)=>a+r.count,0)}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      {description && <div className={`px-4 pb-2 text-xs ${highlightRed ? "text-red-600" : "text-gray-500"}`}>{description}</div>}
    </div>
  );
}

function ChartView({ title, data, totals, description, highlightRed = false }: { title: string; data: Record<string, number>; totals: Record<string, number>; description?: string; highlightRed?: boolean; }) {
  const rows = Object.entries(data).map(([scope, count]) => {
    const total = totals[scope] || 1; // avoid divide-by-zero
    return { scope, percent: (count / total) * 100 };
  });
  return (
    <div className={`rounded-2xl border flex flex-col justify-between ${highlightRed ? "bg-red-50 border-red-300 text-red-700" : "bg-white"}`} style={{ minHeight: CARD_MIN_HEIGHT }}>
      <div>
        <div className={`px-4 pt-3 pb-2 font-semibold ${highlightRed ? "text-red-700" : ""}`}>{title}</div>
        <div className="px-2 pb-4" style={{ width: "100%", height: CHART_INNER_HEIGHT }}>
          <ResponsiveContainer>
            <BarChart data={rows} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={highlightRed ? "#fecaca" : undefined} />
              <XAxis dataKey="scope" tick={{ fill: highlightRed ? "#b91c1c" : undefined }} />
              <YAxis unit="%" tick={{ fill: highlightRed ? "#b91c1c" : undefined }} domain={[0, 100]} />
              <Tooltip formatter={(val: number) => `${val.toFixed(1)}%`} />
              <Legend />
              <Bar dataKey="percent" name="% of total" fill={highlightRed ? "#dc2626" : "#8884d8"} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {description && <div className={`px-4 pb-2 text-xs ${highlightRed ? "text-red-600" : "text-gray-500"}`}>{description}</div>}
    </div>
  );
}

// ---------- Box Wrapper (toggle inside box) ----------
function Box({ title, data, totals, highlightRed, mode, onToggle, description }:
  { title: string; data: Record<string, number>; totals: Record<string, number>; highlightRed?: boolean; mode: 'table'|'chart'; onToggle: () => void; description?: string; }) {
  return (
    <div className="relative">
      {/* Per-box toggle INSIDE the box (top-right) */}
      <div className="absolute right-3 top-3 z-10">
        <IconButton
          label={mode === 'table' ? 'Show chart' : 'Show table'}
          icon={mode === 'table' ? '📊' : '🧮'}
          onClick={onToggle}
          active={mode === 'chart'}
        />
      </div>
      {mode === 'table' ? (
        <TableView title={title} data={data} description={description} highlightRed={!!highlightRed} />
      ) : (
        <ChartView title={title} data={data} totals={totals} description={description} highlightRed={!!highlightRed} />
      )}
    </div>
  );
}

// ---------- Self-tests (unchanged + one extra) ----------
function runSelfTests() {
  try {
    const rows = [
      { "All Access Status": "Translation Not Started", "All Access Chapter Goal": 260 }, // NT no activity
      { "All Access Status": "Translation in Progress", "Translation Status": "Expressed Need", "All Access Chapter Goal": 1189 }, // FB LDSE
      { "All Access Status": "Translation in Progress", "Translation Status": "Work In Progress", "All Access Chapter Goal": 260 }, // NT active translation
      { "All Access Status": "Translation in Progress", "Translation Status": "Work In Progress", "All Access Chapter Goal": 25 }, // portion (should be excluded from risk)
      { "All Access Status": "Goal Met in the Language", "All Access Chapter Goal": 1189 }, // goal met (should not be in red set)
      { "All Access Status": "Translation in Progress", "Translation Status": "Work In Progress", "All Access Chapter Goal": 2001 }, // Two FB active translation
    ];
    const s = deriveSummary(rows);

    console.assert(s.noActivity.NT === 1, "Expected 1 NT with no activity");
    console.assert(s.activeLDSE.FB === 1, "Expected 1 FB in LD/SE");
    console.assert(s.activeTx.NT === 1, "Expected 1 NT active translation");
    console.assert((s.risk.Portion || 0) === 0, "Portions should not appear in risk set");
    console.assert(s.totals.all.NT === 2 && s.totals.all.FB >= 1, "Totals by scope should be computed");
    console.assert(s.totals.all["Two FB"] === 1, "Two FB total should be counted");
  } catch (e) {
    console.error("Self-tests failed:", e);
  }
}

// ---------- App ----------
export default function App() {
  const [rows, setRows] = useState<any[]>([]); // start empty until default URL or user import
  const summary = useMemo(() => deriveSummary(rows), [rows]);

  const [riskMode, setRiskMode] = useState<'table'|'chart'>('table');
  const [noActMode, setNoActMode] = useState<'table'|'chart'>('table');
  const [ldseMode, setLdseMode] = useState<'table'|'chart'>('table');
  const [txMode, setTxMode] = useState<'table'|'chart'>('table');

  const allModes = [riskMode, noActMode, ldseMode, txMode];
  const everyChart = allModes.every(m => m === 'chart');
  const setAll = (mode: 'table'|'chart') => { setRiskMode(mode); setNoActMode(mode); setLdseMode(mode); setTxMode(mode); };

  // Boot: self-tests + try auto-loading DEFAULT_DATA_URL safely
  useEffect(() => {
    runSelfTests();
    async function boot() {
      if (!DEFAULT_DATA_URL) return;
      try {
        const resp = await fetch(DEFAULT_DATA_URL);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const contentType = resp.headers.get("content-type") || "";
        if (contentType.includes("sheet") || contentType.includes("excel") || DEFAULT_DATA_URL.match(/\.xlsx?$|^https?:.*[?&]format=xlsx/i)) {
          const ab = await resp.arrayBuffer();
          const wb = XLSX.read(ab, { type: "array" });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json(ws, { raw: false }) as any[];
          setRows(json);
        } else {
          const text = await resp.text();
          const parsed = await new Promise<any[]>((resolve) => {
            Papa.parse(text, { header: true, skipEmptyLines: true, transformHeader: normalizeHeader as any, complete: (res) => resolve(res.data as any[]) });
          });
          setRows(parsed);
        }
      } catch (e) {
        console.error("Default data load failed:", e);
      }
    }
    boot();
  }, []);

  const isEmpty = !rows || rows.length === 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Project Red Table — Stats</h1>
            <p className="text-sm text-gray-500">Hero = Red Table. Toggle any box; use the header toggle to switch all.</p>
          </div>
          <div className="flex items-center gap-2">
            <IconButton label={everyChart ? 'Show tables' : 'Show charts'} icon={everyChart ? '🧮' : '📊'} onClick={() => setAll(everyChart ? 'table' : 'chart')} />
            <CollapsedImporter onRows={setRows} />
          </div>
        </div>

        {isEmpty && (
          <div className="rounded-2xl border bg-white p-4 text-sm text-gray-600">
            No dataset loaded yet. Click <strong>+ Import data</strong> to paste a URL or drop a CSV/XLSX.
            {DEFAULT_DATA_URL ? null : <span className="block mt-1 text-xs text-gray-400">Tip: set DEFAULT_DATA_URL in code to auto-load a public snapshot.</span>}
          </div>
        )}

        {!isEmpty && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-3">
              <Box
                title="AAG Risk of Incompletion"
                data={summary.risk}
                totals={summary.totals.all}
                highlightRed
                mode={riskMode}
                onToggle={() => setRiskMode(riskMode === 'table' ? 'chart' : 'table')}
                description="Languages most at risk of not finishing by 2033 — no activity, only LangDev/Scripture Engagement, or translation underway but uncertain pace."
              />
            </div>

            <Box
              title="AAG No Activity"
              data={summary.noActivity}
              totals={summary.totals.all}
              highlightRed={false}
              mode={noActMode}
              onToggle={() => setNoActMode(noActMode === 'table' ? 'chart' : 'table')}
              description="Languages with an All Access Goal but no reported translation activity started."
            />
            <Box
              title="AAG Active Lang Dev or Engagement ONLY"
              data={summary.activeLDSE}
              totals={summary.totals.all}
              highlightRed={false}
              mode={ldseMode}
              onToggle={() => setLdseMode(ldseMode === 'table' ? 'chart' : 'table')}
              description="Languages showing work, but only in language development or scripture engagement — no translation has begun."
            />
            <Box
              title="AAG Active Translation"
              data={summary.activeTx}
              totals={summary.totals.all}
              highlightRed={false}
              mode={txMode}
              onToggle={() => setTxMode(txMode === 'table' ? 'chart' : 'table')}
              description="Languages with active translation recorded, but progress rate and likelihood of completion remain unknown."
            />
          </div>
        )}
      </div>
    </div>
  );
}
