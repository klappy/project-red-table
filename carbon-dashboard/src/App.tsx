import React, { useMemo, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import * as XLSX from "xlsx";

// Carbon imports
import {
  Theme,
  Content,
  Grid,
  Column,
  Button,
  TextInput,
  FileUploaderDropContainer,
  FileUploaderItem,
  Loading,
  InlineLoading,
  Accordion,
  AccordionItem,
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Tile,
  Tag,
  Link,
  IconButton,
} from "@carbon/react";
import {
  Add,
  Upload,
  DocumentDownload,
  DataTable as DataTableIcon,
  ChartBar,
  Warning,
  Information,
} from "@carbon/icons-react";

// ---------- Configuration ----------
const DEFAULT_DATA_URL =
  "https://raw.githubusercontent.com/klappy/project-red-table/refs/heads/main/AAG_Languages_extracted.csv";

// ---------- Utilities ----------
const normalizeHeader = (h: unknown) => String(h).trim();
const toNumber = (x: unknown) => {
  const n = Number(String(x).replace(/[\,\s]/g, ""));
  return Number.isFinite(n) ? n : undefined;
};

// ---------- Derivation Rules ----------
const RULES = {
  goalNotMet: (row: any) =>
    String(row["All Access Status"]).toLowerCase() !== "goal met in the language".toLowerCase(),
  isPortion: (row: any) => toNumber(row["All Access Chapter Goal"]) === 25,
  isNT: (row: any) => toNumber(row["All Access Chapter Goal"]) === 260,
  isFB: (row: any) => toNumber(row["All Access Chapter Goal"]) === 1189,
  isTwoFB: (row: any) => toNumber(row["All Access Chapter Goal"]) >= 2000,
  activeTranslation: (row: any) =>
    String(row["Translation Status"] || "")
      .toLowerCase()
      .includes("work in progress"),
  activeLDSE: (row: any) =>
    ["expressed need", "potential need", "limited or old scripture"].some((k) =>
      String(row["Translation Status"] || "")
        .toLowerCase()
        .includes(k)
    ),
  noActivity: (row: any) =>
    String(row["All Access Status"] || "")
      .toLowerCase()
      .includes("translation not started"),
  inRedSet: (row: any) =>
    !RULES.isPortion(row) &&
    RULES.goalNotMet(row) &&
    (RULES.noActivity(row) || RULES.activeLDSE(row) || RULES.activeTranslation(row)),
};

// ---------- Summary Derivation ----------
function deriveSummary(rows: any[]) {
  const noActivity = rows.filter(RULES.noActivity);
  const activeLDSE = rows.filter(RULES.activeLDSE);
  const activeTx = rows.filter(RULES.activeTranslation);
  const risk = rows.filter(RULES.inRedSet);

  function groupByScope(set: any[]) {
    const counts: Record<string, number> = { Portion: 0, NT: 0, FB: 0, "Two FB": 0 };
    set.forEach((r) => {
      if (RULES.isPortion(r)) counts.Portion++;
      else if (RULES.isNT(r)) counts.NT++;
      else if (RULES.isFB(r)) counts.FB++;
      else if (RULES.isTwoFB(r)) counts["Two FB"]++;
    });
    return counts;
  }

  const allCounts = groupByScope(rows);

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

// ---------- Collapsed Importer Component ----------
function CollapsedImporter({ onRows }: { onRows: (rows: any[]) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function parseCsvText(text: string): Promise<any[]> {
    return new Promise((resolve) => {
      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        transformHeader: normalizeHeader,
        complete: (res) => resolve(res.data as any[]),
      });
    });
  }

  async function loadFromUrl() {
    if (!url) return;
    setLoading(true);
    setError("");
    try {
      const resp = await fetch(url);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const contentType = resp.headers.get("content-type") || "";
      if (
        contentType.includes("sheet") ||
        contentType.includes("excel") ||
        url.match(/\.xlsx?$|^https?:.*[?&]format=xlsx/i)
      ) {
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
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        transformHeader: normalizeHeader,
        complete: (res) => onRows(res.data as any[]),
      });
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
      <Button
        kind='ghost'
        size='sm'
        onClick={() => setExpanded((v) => !v)}
        renderIcon={expanded ? DocumentDownload : Add}
      >
        {expanded ? "Hide importer" : "Import data"}
      </Button>

      {expanded && (
        <Tile className='mt-4'>
          <Grid>
            <Column sm={4} md={8} lg={16}>
              <div className='mb-4'>
                <TextInput
                  id='url-input'
                  labelText='Load from public URL'
                  placeholder={DEFAULT_DATA_URL}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <p className='mt-2 text-sm text-gray-600'>
                  CSV or Excel; Google Sheets (Publish CSV), GitHub raw, Dropbox (?dl=1), or S3 with
                  CORS.
                </p>
                <div className='mt-3'>
                  <Button
                    onClick={loadFromUrl}
                    disabled={loading || !url}
                    renderIcon={loading ? Loading : Upload}
                    size='sm'
                  >
                    {loading ? "Loading..." : "Load"}
                  </Button>
                </div>
              </div>

              <div className='mb-4'>
                <p className='mb-2 text-sm font-medium'>…or drag & drop a file</p>
                <div {...getRootProps()}>
                  <FileUploaderDropContainer
                    {...getInputProps()}
                    accept={[".csv", ".xlsx", ".xls"]}
                    labelText={
                      isDragActive ? "Drop it here…" : "Drop CSV/XLSX here or click to browse"
                    }
                    multiple={false}
                    size='sm'
                  />
                </div>
              </div>

              {error && (
                <div className='mt-3'>
                  <Tag type='red' size='sm'>
                    {error}
                  </Tag>
                </div>
              )}
            </Column>
          </Grid>
        </Tile>
      )}
    </div>
  );
}

// ---------- Data Table Component ----------
function DataTableView({
  title,
  data,
  description,
  highlightRed = false,
}: {
  title: string;
  data: Record<string, number>;
  description?: string;
  highlightRed?: boolean;
}) {
  const rows = Object.entries(data).map(([scope, count]) => ({ id: scope, scope, count }));

  const headers = [
    { key: "scope", header: "Scope" },
    { key: "count", header: "Count" },
  ];

  const totalRow = {
    id: "total",
    scope: "Total",
    count: rows.reduce((a, r) => a + r.count, 0),
  };

  return (
    <Tile className={highlightRed ? "border-red-500 bg-red-50" : ""}>
      <div className='mb-4'>
        <h3 className={`text-lg font-semibold ${highlightRed ? "text-red-700" : ""}`}>
          {highlightRed && <Warning className='inline mr-2' size={20} />}
          {title}
        </h3>
        {description && (
          <p className={`mt-2 text-sm ${highlightRed ? "text-red-600" : "text-gray-600"}`}>
            {description}
          </p>
        )}
      </div>

      <DataTable rows={[...rows, totalRow]} headers={headers} size='sm'>
        {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
          <TableContainer>
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader {...getHeaderProps({ header })}>{header.header}</TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    {...getRowProps({ row })}
                    className={row.id === "total" ? "font-semibold border-t-2" : ""}
                  >
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>
    </Tile>
  );
}

// ---------- Chart Placeholder Component (Carbon Charts integration would go here) ----------
function ChartView({
  title,
  data,
  totals,
  description,
  highlightRed = false,
}: {
  title: string;
  data: Record<string, number>;
  totals: Record<string, number>;
  description?: string;
  highlightRed?: boolean;
}) {
  const rows = Object.entries(data).map(([scope, count]) => {
    const total = totals[scope] || 1;
    return { scope, percent: (count / total) * 100 };
  });

  return (
    <Tile className={highlightRed ? "border-red-500 bg-red-50" : ""}>
      <div className='mb-4'>
        <h3 className={`text-lg font-semibold ${highlightRed ? "text-red-700" : ""}`}>
          {highlightRed && <Warning className='inline mr-2' size={20} />}
          {title}
        </h3>
        {description && (
          <p className={`mt-2 text-sm ${highlightRed ? "text-red-600" : "text-gray-600"}`}>
            {description}
          </p>
        )}
      </div>

      <div className='p-8 text-center border-2 border-dashed border-gray-300 rounded'>
        <ChartBar size={48} className='mx-auto mb-4 text-gray-400' />
        <p className='text-gray-500'>Chart visualization</p>
        <p className='text-sm text-gray-400 mt-2'>Carbon Charts integration pending</p>
      </div>

      {/* Simple text representation for now */}
      <div className='mt-4 space-y-2'>
        {rows.map(({ scope, percent }) => (
          <div key={scope} className='flex justify-between items-center'>
            <span className='text-sm'>{scope}</span>
            <div className='flex items-center gap-2'>
              <div className='w-24 bg-gray-200 rounded-full h-2'>
                <div
                  className={`h-2 rounded-full ${highlightRed ? "bg-red-500" : "bg-blue-500"}`}
                  style={{ width: `${Math.min(percent, 100)}%` }}
                ></div>
              </div>
              <span className='text-sm font-medium'>{percent.toFixed(1)}%</span>
            </div>
          </div>
        ))}
      </div>
    </Tile>
  );
}

// ---------- Box Wrapper Component ----------
function Box({
  title,
  data,
  totals,
  highlightRed,
  mode,
  onToggle,
  description,
}: {
  title: string;
  data: Record<string, number>;
  totals: Record<string, number>;
  highlightRed?: boolean;
  mode: "table" | "chart";
  onToggle: () => void;
  description?: string;
}) {
  return (
    <div className='relative'>
      <div className='absolute right-2 top-2 z-10'>
        <Button
          kind='ghost'
          size='sm'
          onClick={onToggle}
          renderIcon={mode === "table" ? ChartBar : DataTableIcon}
          iconDescription={mode === "table" ? "Show chart" : "Show table"}
        />
      </div>
      {mode === "table" ? (
        <DataTableView
          title={title}
          data={data}
          description={description}
          highlightRed={!!highlightRed}
        />
      ) : (
        <ChartView
          title={title}
          data={data}
          totals={totals}
          description={description}
          highlightRed={!!highlightRed}
        />
      )}
    </div>
  );
}

// ---------- Self-tests ----------
function runSelfTests() {
  try {
    const rows = [
      { "All Access Status": "Translation Not Started", "All Access Chapter Goal": 260 },
      {
        "All Access Status": "Translation in Progress",
        "Translation Status": "Expressed Need",
        "All Access Chapter Goal": 1189,
      },
      {
        "All Access Status": "Translation in Progress",
        "Translation Status": "Work In Progress",
        "All Access Chapter Goal": 260,
      },
      {
        "All Access Status": "Translation in Progress",
        "Translation Status": "Work In Progress",
        "All Access Chapter Goal": 25,
      },
      { "All Access Status": "Goal Met in the Language", "All Access Chapter Goal": 1189 },
      {
        "All Access Status": "Translation in Progress",
        "Translation Status": "Work In Progress",
        "All Access Chapter Goal": 2001,
      },
    ];
    const s = deriveSummary(rows);

    console.assert(s.noActivity.NT === 1, "Expected 1 NT with no activity");
    console.assert(s.activeLDSE.FB === 1, "Expected 1 FB in LD/SE");
    console.assert(s.activeTx.NT === 1, "Expected 1 NT active translation");
    console.assert((s.risk.Portion || 0) === 0, "Portions should not appear in risk set");
    console.assert(
      s.totals.all.NT === 2 && s.totals.all.FB >= 1,
      "Totals by scope should be computed"
    );
    console.assert(s.totals.all["Two FB"] === 1, "Two FB total should be counted");
  } catch (e) {
    console.error("Self-tests failed:", e);
  }
}

// ---------- Main App Component ----------
export default function App() {
  const [rows, setRows] = useState<any[]>([]);
  const summary = useMemo(() => deriveSummary(rows), [rows]);

  const [riskMode, setRiskMode] = useState<"table" | "chart">("table");
  const [noActMode, setNoActMode] = useState<"table" | "chart">("table");
  const [ldseMode, setLdseMode] = useState<"table" | "chart">("table");
  const [txMode, setTxMode] = useState<"table" | "chart">("table");

  const allModes = [riskMode, noActMode, ldseMode, txMode];
  const everyChart = allModes.every((m) => m === "chart");
  const setAll = (mode: "table" | "chart") => {
    setRiskMode(mode);
    setNoActMode(mode);
    setLdseMode(mode);
    setTxMode(mode);
  };

  // Boot: self-tests + try auto-loading DEFAULT_DATA_URL
  useEffect(() => {
    runSelfTests();
    async function boot() {
      if (!DEFAULT_DATA_URL) return;
      try {
        const resp = await fetch(DEFAULT_DATA_URL);
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const contentType = resp.headers.get("content-type") || "";
        if (
          contentType.includes("sheet") ||
          contentType.includes("excel") ||
          DEFAULT_DATA_URL.match(/\.xlsx?$|^https?:.*[?&]format=xlsx/i)
        ) {
          const ab = await resp.arrayBuffer();
          const wb = XLSX.read(ab, { type: "array" });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json(ws, { raw: false }) as any[];
          setRows(json);
        } else {
          const text = await resp.text();
          const parsed = await new Promise<any[]>((resolve) => {
            Papa.parse(text, {
              header: true,
              skipEmptyLines: true,
              transformHeader: normalizeHeader,
              complete: (res) => resolve(res.data as any[]),
            });
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
    <Theme theme='g100'>
      <Content className='min-h-screen'>
        <Grid className='py-8'>
          <Column sm={4} md={8} lg={16}>
            <div className='flex items-center justify-between mb-8'>
              <div>
                <h1 className='text-3xl font-bold text-gray-900'>Project Red Table — Stats</h1>
                <p className='text-gray-600 mt-2'>
                  All Access Goals Analysis Dashboard • Toggle any box; use the header toggle to
                  switch all.
                </p>
              </div>
              <div className='flex items-center gap-4'>
                <Button
                  kind='secondary'
                  size='sm'
                  onClick={() => setAll(everyChart ? "table" : "chart")}
                  renderIcon={everyChart ? DataTableIcon : ChartBar}
                >
                  {everyChart ? "Show tables" : "Show charts"}
                </Button>
                <CollapsedImporter onRows={setRows} />
              </div>
            </div>

            {isEmpty && (
              <Tile className='text-center py-12'>
                <Information size={48} className='mx-auto mb-4 text-gray-400' />
                <h3 className='text-lg font-medium text-gray-900 mb-2'>No dataset loaded yet</h3>
                <p className='text-gray-600 mb-4'>
                  Click <strong>Import data</strong> to paste a URL or drop a CSV/XLSX file.
                </p>
                {!DEFAULT_DATA_URL && (
                  <p className='text-sm text-gray-500'>
                    Tip: Set DEFAULT_DATA_URL in code to auto-load a public snapshot.
                  </p>
                )}
              </Tile>
            )}

            {!isEmpty && (
              <div className='space-y-6'>
                <Grid>
                  <Column sm={4} md={8} lg={16}>
                    <Box
                      title='AAG Risk of Incompletion'
                      data={summary.risk}
                      totals={summary.totals.all}
                      highlightRed
                      mode={riskMode}
                      onToggle={() => setRiskMode(riskMode === "table" ? "chart" : "table")}
                      description='Languages most at risk of not finishing by 2033 — no activity, only LangDev/Scripture Engagement, or translation underway but uncertain pace.'
                    />
                  </Column>
                </Grid>

                <Grid>
                  <Column sm={4} md={8} lg={16}>
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                      <Box
                        title='AAG No Activity'
                        data={summary.noActivity}
                        totals={summary.totals.all}
                        highlightRed={false}
                        mode={noActMode}
                        onToggle={() => setNoActMode(noActMode === "table" ? "chart" : "table")}
                        description='Languages with an All Access Goal but no reported translation activity started.'
                      />
                      <Box
                        title='AAG Active Lang Dev or Engagement ONLY'
                        data={summary.activeLDSE}
                        totals={summary.totals.all}
                        highlightRed={false}
                        mode={ldseMode}
                        onToggle={() => setLdseMode(ldseMode === "table" ? "chart" : "table")}
                        description='Languages showing work, but only in language development or scripture engagement — no translation has begun.'
                      />
                      <Box
                        title='AAG Active Translation'
                        data={summary.activeTx}
                        totals={summary.totals.all}
                        highlightRed={false}
                        mode={txMode}
                        onToggle={() => setTxMode(txMode === "table" ? "chart" : "table")}
                        description='Languages with active translation recorded, but progress rate and likelihood of completion remain unknown.'
                      />
                    </div>
                  </Column>
                </Grid>
              </div>
            )}
          </Column>
        </Grid>
      </Content>
    </Theme>
  );
}
