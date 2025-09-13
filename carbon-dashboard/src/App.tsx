import React, { useMemo, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import * as XLSX from "xlsx";

// Carbon imports
import {
  Grid,
  Column,
  Button,
  TextInput,
  FileUploaderDropContainer,
  Loading,
  Tile,
  Tag,
  Modal,
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableContainer,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Pagination,
} from "@carbon/react";
import {
  Add,
  Upload,
  DataTable as DataTableIcon,
  ChartBar,
  WarningFilled,
  Time,
  View,
  ViewOff,
  Information,
  List,
} from "@carbon/icons-react";

// Carbon Charts imports
import { SimpleBarChart } from "@carbon/charts-react";
import "@carbon/charts/styles.css";

// ---------- Configuration ----------
const DEFAULT_DATA_URL =
  "https://raw.githubusercontent.com/klappy/project-red-table/refs/heads/main/AAG_Languages_extracted.csv";

// ---------- Language List Modal Component ----------
function LanguageListModal({
  isOpen,
  onClose,
  title,
  languages,
  color = "#0f62fe",
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  languages: any[];
  color?: string;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

  // Filter languages based on search
  const filteredLanguages = useMemo(() => {
    if (!searchTerm) return languages;

    const term = searchTerm.toLowerCase();
    return languages.filter((lang) => {
      // Search across multiple fields
      return Object.values(lang).some((value) => String(value).toLowerCase().includes(term));
    });
  }, [languages, searchTerm]);

  // Sort the filtered results
  const sortedLanguages = useMemo(() => {
    if (!sortKey) return filteredLanguages;
    
    const sorted = [...filteredLanguages].sort((a, b) => {
      let aVal: any;
      let bVal: any;
      
      // Map sort keys to data fields
      switch(sortKey) {
        case "language":
          aVal = a["Language Name"] || a["Language"] || "";
          bVal = b["Language Name"] || b["Language"] || "";
          break;
        case "country":
          aVal = a["Country"] || "";
          bVal = b["Country"] || "";
          break;
        case "population":
          aVal = toNumber(a["First Language Population"]) || 0;
          bVal = toNumber(b["First Language Population"]) || 0;
          break;
        case "completed":
          aVal = toNumber(a["Text Chapters Completed"]) || 0;
          bVal = toNumber(b["Text Chapters Completed"]) || 0;
          break;
        case "goal":
          aVal = toNumber(a["All Access Chapter Goal"]) || 0;
          bVal = toNumber(b["All Access Chapter Goal"]) || 0;
          break;
        case "progress":
          const aCompleted = toNumber(a["Text Chapters Completed"]) || 0;
          const aGoal = toNumber(a["All Access Chapter Goal"]) || 1;
          aVal = (aCompleted / aGoal) * 100;
          
          const bCompleted = toNumber(b["Text Chapters Completed"]) || 0;
          const bGoal = toNumber(b["All Access Chapter Goal"]) || 1;
          bVal = (bCompleted / bGoal) * 100;
          break;
        case "status":
          aVal = a["All Access Status"] || "";
          bVal = b["All Access Status"] || "";
          break;
        case "translationStatus":
          aVal = a["Translation Status"] || "";
          bVal = b["Translation Status"] || "";
          break;
        default:
          return 0;
      }
      
      // Compare values
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "ASC" 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      
      if (aVal < bVal) return sortDirection === "ASC" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "ASC" ? 1 : -1;
      return 0;
    });
    
    return sorted;
  }, [filteredLanguages, sortKey, sortDirection]);

  // Paginate the sorted results
  const paginatedLanguages = useMemo(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return sortedLanguages.slice(start, end);
  }, [sortedLanguages, page, pageSize]);

  // Prepare data for Carbon DataTable
  const rows = paginatedLanguages.map((lang, index) => ({
    id: `${page}-${index}`,
    language: lang["Language"] || lang["Language Name"] || "Unknown",
    country: lang["Country"] || "—",
    population: toNumber(lang["First Language Population"]) || 0,
    completed: toNumber(lang["Text Chapters Completed"]) || 0,
    goal: lang["All Access Chapter Goal"] || "—",
    progress: (() => {
      const completed = toNumber(lang["Text Chapters Completed"]) || 0;
      const goal = toNumber(lang["All Access Chapter Goal"]) || 0;
      if (goal > 0) {
        const percent = ((completed / goal) * 100).toFixed(1);
        return `${percent}%`;
      }
      return "—";
    })(),
    status: lang["All Access Status"] || "—",
    translationStatus: lang["Translation Status"] || "—",
    raw: lang, // Keep raw data for potential expansion
  }));

  const headers = [
    { key: "language", header: "Language" },
    { key: "country", header: "Country" },
    { key: "population", header: "Population" },
    { key: "completed", header: "Chapters Done" },
    { key: "goal", header: "Chapter Goal" },
    { key: "progress", header: "Progress" },
    { key: "status", header: "Access Status" },
    { key: "translationStatus", header: "Translation Status" },
  ];

  // Reset page when search or sort changes
  useEffect(() => {
    setPage(1);
  }, [searchTerm, sortKey, sortDirection]);

  return (
    <Modal
      open={isOpen}
      onRequestClose={onClose}
      modalHeading={
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              width: "4px",
              height: "24px",
              background: color,
              borderRadius: "2px",
            }}
          />
          <span>{title}</span>
          <Tag type='blue' size='md'>
            {languages.length.toLocaleString()} languages
          </Tag>
        </div>
      }
      primaryButtonText='Close'
      onRequestSubmit={onClose}
      size='lg'
      hasScrollingContent
    >
      <DataTable 
        rows={rows} 
        headers={headers} 
        isSortable
        sortRow={(_rowA: any, _rowB: any, _info: any) => {
          // We handle sorting ourselves, just return 0
          // The actual sorting happens in sortedLanguages
          return 0;
        }}
      >
        {({
          rows,
          headers,
          getHeaderProps,
          getRowProps,
          getTableProps,
          getTableContainerProps,
        }) => (
          <TableContainer title='' description='' {...getTableContainerProps()}>
            <TableToolbar>
              <TableToolbarContent>
                <TableToolbarSearch
                  placeholder='Search languages...'
                  persistent
                  onChange={(e: any) => setSearchTerm(e.target.value)}
                />
              </TableToolbarContent>
            </TableToolbar>
            <Table {...getTableProps()} aria-label='Language list'>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader 
                      {...getHeaderProps({ 
                        header,
                        onClick: () => {
                          // Handle our custom sorting
                          if (sortKey === header.key) {
                            // Toggle direction if same column
                            setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
                          } else {
                            // New column, default to ASC
                            setSortKey(header.key);
                            setSortDirection("ASC");
                          }
                          setPage(1); // Reset to first page when sorting
                        }
                      })} 
                      key={header.key}
                      isSortHeader={sortKey === header.key}
                      sortDirection={sortKey === header.key ? sortDirection : "NONE"}
                    >
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow {...getRowProps({ row })} key={row.id}>
                    {row.cells.map((cell: any) => (
                      <TableCell key={cell.id}>
                        {cell.info.header === "population" || cell.info.header === "completed"
                          ? cell.value.toLocaleString()
                          : cell.value}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredLanguages.length > pageSize && (
              <Pagination
                backwardText='Previous page'
                forwardText='Next page'
                itemsPerPageText='Items per page:'
                page={page}
                pageNumberText='Page Number'
                pageSize={pageSize}
                pageSizes={[10, 25, 50, 100]}
                totalItems={filteredLanguages.length}
                onChange={({ page, pageSize }) => {
                  setPage(page);
                  setPageSize(pageSize);
                }}
              />
            )}
            {filteredLanguages.length === 0 && (
              <div
                style={{
                  padding: "2rem",
                  textAlign: "center",
                  color: "#525252",
                }}
              >
                No languages found matching "{searchTerm}"
              </div>
            )}
          </TableContainer>
        )}
      </DataTable>
    </Modal>
  );
}

// ---------- Utilities ----------
const normalizeHeader = (h: unknown) => String(h).trim();
const toNumber = (x: unknown) => {
  const n = Number(String(x).replace(/[\,\s]/g, ""));
  return Number.isFinite(n) ? n : undefined;
};

// ---------- Derivation Rules ----------
const RULES = {
  goalNotMet: (row: any) => !String(row["All Access Status"]).toLowerCase().includes("goal met"),
  isPortion: (row: any) => toNumber(row["All Access Chapter Goal"]) === 25,
  isNT: (row: any) => toNumber(row["All Access Chapter Goal"]) === 260,
  isFB: (row: any) => toNumber(row["All Access Chapter Goal"]) === 1189,
  isTwoFB: (row: any) => (toNumber(row["All Access Chapter Goal"]) ?? 0) >= 2000,
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

  // Get ALL languages that have goals NOT YET MET (includes in-progress)
  const goalNotMet = rows.filter(RULES.goalNotMet);

  // Get languages where goal IS ACTUALLY COMPLETED (Goal Met status)
  // This is NOT the inverse of "at risk" - many languages are on track but not complete
  const goalMet = rows.filter((row) =>
    String(row["All Access Status"] || "")
      .toLowerCase()
      .includes("goal met")
  );

  function groupByScope(set: any[]) {
    const counts: Record<string, number> = { Portion: 0, NT: 0, FB: 0, "Two FB": 0 };
    const byScope: Record<string, any[]> = { Portion: [], NT: [], FB: [], "Two FB": [] };

    set.forEach((r) => {
      if (RULES.isPortion(r)) {
        counts.Portion++;
        byScope.Portion.push(r);
      } else if (RULES.isNT(r)) {
        counts.NT++;
        byScope.NT.push(r);
      } else if (RULES.isFB(r)) {
        counts.FB++;
        byScope.FB.push(r);
      } else if (RULES.isTwoFB(r)) {
        counts["Two FB"]++;
        byScope["Two FB"].push(r);
      }
    });
    return { counts, byScope };
  }

  const allGrouped = groupByScope(rows);
  const goalNotMetGrouped = groupByScope(goalNotMet);
  const riskGrouped = groupByScope(risk);
  const noActivityGrouped = groupByScope(noActivity);
  const activeLDSEGrouped = groupByScope(activeLDSE);
  const activeTxGrouped = groupByScope(activeTx);

  return {
    noActivity: noActivityGrouped.counts,
    activeLDSE: activeLDSEGrouped.counts,
    activeTx: activeTxGrouped.counts,
    risk: riskGrouped.counts,
    // Store the actual language lists
    languages: {
      noActivity: noActivity,
      activeLDSE: activeLDSE,
      activeTx: activeTx,
      risk: risk,
      goalMet: goalMet,
      goalNotMet: goalNotMet,
      // By scope
      riskByScope: riskGrouped.byScope,
      noActivityByScope: noActivityGrouped.byScope,
      activeLDSEByScope: activeLDSEGrouped.byScope,
      activeTxByScope: activeTxGrouped.byScope,
    },
    totals: {
      noActivity: noActivity.length,
      activeLDSE: activeLDSE.length,
      activeTx: activeTx.length,
      risk: risk.length,
      goalMet: goalMet.length,
      all: allGrouped.counts,
      goalNotMet: goalNotMetGrouped.counts,
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

  const { getRootProps, isDragActive } = useDropzone({ onDrop, multiple: false });

  return (
    <div style={{ position: "absolute", top: "1rem", right: "1rem", zIndex: 1000 }}>
      <Button
        kind={expanded ? "secondary" : "primary"}
        size='sm'
        onClick={() => setExpanded((v) => !v)}
        renderIcon={expanded ? ViewOff : Add}
      >
        {expanded ? "Hide" : "Import Data"}
      </Button>

      {expanded && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "3rem",
            width: "400px",
            background: "white",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            padding: "1rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <TextInput
              id='url-input'
              labelText='Load from URL'
              placeholder='CSV or Excel URL'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              size='sm'
            />
            <Button
              onClick={loadFromUrl}
              disabled={loading || !url}
              renderIcon={loading ? Loading : Upload}
              size='sm'
              style={{ marginTop: "0.5rem" }}
            >
              {loading ? "Loading..." : "Load"}
            </Button>
          </div>

          <div {...getRootProps()}>
            <FileUploaderDropContainer
              accept={[".csv", ".xlsx", ".xls"]}
              labelText={isDragActive ? "Drop it here…" : "Drop file or click to browse"}
              multiple={false}
              onClick={() => {}}
            />
          </div>

          {error && (
            <Tag type='red' size='sm' style={{ marginTop: "0.5rem" }}>
              {error}
            </Tag>
          )}
        </div>
      )}
    </div>
  );
}

// ---------- Footer Component ----------
function AllAccessGoalsFooter({ rows }: { rows: any[] }) {
  // IMPORTANT: This shows ACTUAL COMPLETION (Goal Met), not just "not at risk"
  // Many languages are on track but not yet complete
  const goalMet = rows.filter((row) =>
    String(row["All Access Status"] || "")
      .toLowerCase()
      .includes("goal met")
  );
  const total = rows.length;

  // Calculate COMPLETED languages for each goal type
  // Note: Uses language counts, not population-weighted percentages
  const fbGoalMet = goalMet.filter(
    (row: any) =>
      toNumber(row["All Access Chapter Goal"]) === 1189 ||
      (toNumber(row["All Access Chapter Goal"]) ?? 0) >= 2000
  ).length;

  const ntGoalMet = goalMet.filter(
    (row: any) =>
      toNumber(row["All Access Chapter Goal"]) === 260 ||
      toNumber(row["All Access Chapter Goal"]) === 1189 ||
      (toNumber(row["All Access Chapter Goal"]) ?? 0) >= 2000
  ).length;

  // Portions are specifically languages with 25-chapter goals that are complete
  const portionGoalMet = goalMet.filter(
    (row: any) => toNumber(row["All Access Chapter Goal"]) === 25
  ).length;

  // Get total counts for each goal type
  const fbTotal = rows.filter(
    (row: any) =>
      toNumber(row["All Access Chapter Goal"]) === 1189 ||
      (toNumber(row["All Access Chapter Goal"]) ?? 0) >= 2000
  ).length;

  const ntTotal = rows.filter(
    (row: any) =>
      toNumber(row["All Access Chapter Goal"]) === 260 ||
      toNumber(row["All Access Chapter Goal"]) === 1189 ||
      (toNumber(row["All Access Chapter Goal"]) ?? 0) >= 2000
  ).length;

  const portionTotal = rows.filter(
    (row: any) => toNumber(row["All Access Chapter Goal"]) === 25
  ).length;

  // Calculate percentages based on goal-specific totals
  const fbPercent = fbTotal > 0 ? ((fbGoalMet / fbTotal) * 100).toFixed(1) : "0.0";
  const ntPercent = ntTotal > 0 ? ((ntGoalMet / ntTotal) * 100).toFixed(1) : "0.0";
  const portionPercent =
    portionTotal > 0 ? ((portionGoalMet / portionTotal) * 100).toFixed(1) : "0.0";

  // Calculate time until Pentecost 2033 (June 5, 2033)
  const pentecost2033 = new Date("2033-06-05");
  const today = new Date();

  let years = pentecost2033.getFullYear() - today.getFullYear();
  let months = pentecost2033.getMonth() - today.getMonth();
  let days = pentecost2033.getDate() - today.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(pentecost2033.getFullYear(), pentecost2033.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const timeRemaining =
    years > 0 || months > 0 || days > 0 ? `${years}Y ${months}M ${days}D` : "TIME'S UP";

  return (
    <div
      style={{
        marginTop: "4rem",
        padding: "3rem 2rem",
        background: "linear-gradient(135deg, #1c1c1c 0%, #2d2d2d 100%)",
        color: "white",
        borderRadius: "16px 16px 0 0",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header Section */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: 400,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
              color: "#e0e0e0",
            }}
          >
            Collective Impact Alliance
          </h2>

          <p
            style={{
              fontSize: "1.125rem",
              fontWeight: 300,
              lineHeight: 1.6,
              maxWidth: "800px",
              margin: "0 auto 2rem",
              color: "rgba(255,255,255,0.85)",
            }}
          >
            Generosity, humility, and integrity create unity of vision, mission, and purpose.
          </p>

          <p
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.8,
              maxWidth: "900px",
              margin: "0 auto",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Shared strategy, technology, training, operating principles, and funding work together
            to accelerate the process of better quality, faster, and cheaper Scripture translation
            like never before. ETEN envisions all people having access to God's Word by 2033.
          </p>
        </div>

        {/* All Access Goals Section */}
        <div
          style={{
            padding: "2rem",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "12px",
            marginBottom: "2rem",
          }}
        >
          <h3
            style={{
              fontSize: "1.25rem",
              fontWeight: 600,
              marginBottom: "1.5rem",
              textAlign: "center",
              color: "#f0f0f0",
            }}
          >
            The All Access Goals by 2033
          </h3>

          <div
            className='footer-goals-grid'
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {/* Full Bible Goal */}
            <div
              style={{
                padding: "1.5rem",
                background: "rgba(255,255,255,0.03)",
                borderRadius: "8px",
                borderLeft: "3px solid #0f62fe",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "1rem",
                  marginBottom: "0.75rem",
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>📖</span>
                <div>
                  <div style={{ fontSize: "2rem", fontWeight: 700, color: "#0f62fe" }}>
                    {fbPercent}%
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>
                    {fbGoalMet.toLocaleString()}/{fbTotal.toLocaleString()} Complete
                  </div>
                </div>
              </div>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "rgba(255,255,255,0.8)" }}>
                <strong>95%</strong> of the global population will have access to a Full Bible
              </p>
              <div
                style={{
                  marginTop: "0.75rem",
                  height: "4px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${(parseFloat(fbPercent) / 95) * 100}%`,
                    background: "#0f62fe",
                  }}
                />
              </div>
            </div>

            {/* New Testament Goal */}
            <div
              style={{
                padding: "1.5rem",
                background: "rgba(255,255,255,0.03)",
                borderRadius: "8px",
                borderLeft: "3px solid #c1d72e",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "1rem",
                  marginBottom: "0.75rem",
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>📘</span>
                <div>
                  <div style={{ fontSize: "2rem", fontWeight: 700, color: "#c1d72e" }}>
                    {ntPercent}%
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>
                    {ntGoalMet.toLocaleString()}/{ntTotal.toLocaleString()} Complete
                  </div>
                </div>
              </div>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "rgba(255,255,255,0.8)" }}>
                <strong>99.96%</strong> of the global population will have access to a New Testament
              </p>
              <div
                style={{
                  marginTop: "0.75rem",
                  height: "4px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${(parseFloat(ntPercent) / 99.96) * 100}%`,
                    background: "#c1d72e",
                  }}
                />
              </div>
            </div>

            {/* Scripture Portions Goal */}
            <div
              style={{
                padding: "1.5rem",
                background: "rgba(255,255,255,0.03)",
                borderRadius: "8px",
                borderLeft: "3px solid #8a3ffc",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "1rem",
                  marginBottom: "0.75rem",
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>✨</span>
                <div>
                  <div style={{ fontSize: "2rem", fontWeight: 700, color: "#8a3ffc" }}>
                    {portionPercent}%
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>
                    {portionGoalMet.toLocaleString()}/{portionTotal.toLocaleString()} Complete
                  </div>
                </div>
              </div>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "rgba(255,255,255,0.8)" }}>
                <strong>100%</strong> of the world's population will have access to Scripture
                Portions (25 chapters)
              </p>
              <div
                style={{
                  marginTop: "0.75rem",
                  height: "4px",
                  background: "rgba(255,255,255,0.1)",
                  borderRadius: "2px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    width: `${parseFloat(portionPercent)}%`,
                    background: "#8a3ffc",
                  }}
                />
              </div>
            </div>

            {/* Second Translation Goal */}
            <div
              style={{
                padding: "1.5rem",
                background: "rgba(255,255,255,0.03)",
                borderRadius: "8px",
                borderLeft: "3px solid #ff832b",
                gridColumn: "span 1",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "1rem",
                  marginBottom: "0.75rem",
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>🌍</span>
                <div>
                  <div style={{ fontSize: "2rem", fontWeight: 700, color: "#ff832b" }}>100</div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>
                    Strategic Languages
                  </div>
                </div>
              </div>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "rgba(255,255,255,0.8)" }}>
                Access to a <strong>second translation</strong> will be available in the world's
                most strategic 100 written languages
              </p>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "3rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            flexWrap: "wrap",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: 700, color: "#da1e28" }}>
              {(total - goalMet.length).toLocaleString()}
            </div>
            <div style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)" }}>
              Languages Remaining
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: 700, color: "#c1d72e" }}>
              {goalMet.length.toLocaleString()}
            </div>
            <div style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)" }}>
              Languages Completed
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2rem", fontWeight: 700, color: "#0f62fe" }}>
              {timeRemaining}
            </div>
            <div style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)" }}>
              Until Pentecost 2033
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- The Hero Red Table Component ----------
function HeroRedTable({
  data,
  total,
  totalsByScope,
  languages = [],
  languagesByScope = {},
}: {
  data: Record<string, number>;
  total: number;
  totalsByScope: Record<string, number>;
  languages?: any[];
  languagesByScope?: Record<string, any[]>;
}) {
  const [showDetail, setShowDetail] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalScope, setModalScope] = useState<string | null>(null);

  // Check if mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 480;

  // Calculate time until Pentecost 2033 (June 5, 2033)
  const pentecost2033 = new Date("2033-06-05");
  const today = new Date();

  // Calculate years, months, days until Pentecost
  let years = pentecost2033.getFullYear() - today.getFullYear();
  let months = pentecost2033.getMonth() - today.getMonth();
  let days = pentecost2033.getDate() - today.getDate();

  // Adjust for negative days
  if (days < 0) {
    months--;
    const lastMonth = new Date(pentecost2033.getFullYear(), pentecost2033.getMonth(), 0);
    days += lastMonth.getDate();
  }

  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12;
  }

  const timeRemaining =
    years > 0 || months > 0 || days > 0
      ? `${years} ${years === 1 ? "YEAR" : "YEARS"} ${months} ${
          months === 1 ? "MONTH" : "MONTHS"
        } ${days} ${days === 1 ? "DAY" : "DAYS"}`
      : "TIME'S UP";

  return (
    <div
      className='hero-red-table'
      style={{
        background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
        borderRadius: "16px",
        padding: isMobile ? "0.75rem" : "3rem",
        marginBottom: isMobile ? "1rem" : "3rem",
        boxShadow: "0 20px 40px rgba(185, 28, 28, 0.3)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px)`,
          pointerEvents: "none",
        }}
      />

      <Grid style={{ position: "relative" }}>
        <Column lg={8} md={8} sm={4}>
          <div style={{ color: "white" }}>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
              <WarningFilled size={32} style={{ marginRight: "0.5rem" }} />
              <h1
                style={{
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  margin: 0,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                THE RED TABLE
              </h1>
            </div>

            <p
              style={{
                fontSize: "1.25rem",
                marginBottom: "0.5rem",
                opacity: 0.95,
                fontWeight: 300,
              }}
            >
              Languages at Critical Risk of Incompletion by 2033
            </p>

            <div
              style={{
                fontSize: "0.875rem",
                marginBottom: "1.5rem",
                opacity: 0.8,
                fontWeight: 300,
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span style={{ fontStyle: "italic" }}>
                * Excludes languages with access through second language
              </span>
              <button
                onClick={() => setShowInfo(!showInfo)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  color: "rgba(255,255,255,0.8)",
                  display: "inline-flex",
                  alignItems: "center",
                }}
                aria-label='More information about filtering'
              >
                <Information size={16} />
              </button>
            </div>

            {showInfo && (
              <div
                style={{
                  background: "rgba(0,0,0,0.3)",
                  borderRadius: "8px",
                  padding: "1rem",
                  marginBottom: "1.5rem",
                  fontSize: "0.875rem",
                  color: "rgba(255,255,255,0.9)",
                  lineHeight: 1.5,
                }}
              >
                <strong>Why are some languages excluded?</strong>
                <br />
                26 languages show "Goal Met - Scripture accessed via second language" status. These
                communities have Scripture access through another language they understand, so they
                are not at critical risk of having no Scripture by 2033.
                <br />
                <br />
                This ensures we focus on the 1,788 languages that truly lack any Scripture access.
              </div>
            )}

            <div
              style={{
                fontSize: isMobile ? "3.5rem" : "5rem",
                fontWeight: 800,
                lineHeight: 1,
                marginBottom: "0.5rem",
                textShadow: "0 4px 8px rgba(0,0,0,0.2)",
              }}
            >
              {total.toLocaleString()}
            </div>

            <p
              style={{
                fontSize: "1.5rem",
                marginBottom: "2rem",
                fontWeight: 500,
              }}
            >
              LANGUAGES AT RISK
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: isMobile ? "1.5rem" : "2rem",
                padding: "1rem",
                background: "rgba(0,0,0,0.2)",
                borderRadius: "8px",
              }}
            >
              <Time size={24} />
              <div>
                <div style={{ fontSize: isMobile ? "1.5rem" : "2rem", fontWeight: 700 }}>
                  <span className='countdown-long'>{timeRemaining}</span>
                  <span className='countdown-short' style={{ display: "none" }}>
                    {`${years}Y ${months}M ${days}D`}
                  </span>
                </div>
                <div style={{ fontSize: "0.875rem", opacity: 0.9 }}>Until Pentecost 2033</div>
              </div>
            </div>
          </div>
        </Column>

        <Column lg={8} md={8} sm={4}>
          {/* Risk breakdown cards */}
          <div
            className='risk-breakdown-grid'
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
              gap: isMobile ? "0.5rem" : "1rem",
            }}
          >
            {Object.entries(data).map(([scope, count]) => (
              <div
                key={scope}
                onClick={() => {
                  setModalScope(scope);
                  setModalOpen(true);
                }}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                  padding: isMobile ? "0.75rem" : "1.5rem",
                  border: "1px solid rgba(255,255,255,0.2)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.25)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div
                  style={{
                    fontSize: isMobile ? "1.75rem" : "2.5rem",
                    fontWeight: 700,
                    color: "white",
                    marginBottom: "0.25rem",
                    pointerEvents: "none",
                  }}
                >
                  {count.toLocaleString()}
                </div>
                <div
                  style={{
                    fontSize: isMobile ? "0.75rem" : "0.875rem",
                    color: "rgba(255,255,255,0.9)",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    pointerEvents: "none",
                  }}
                >
                  {scope}
                </div>
                <div
                  style={{
                    fontSize: "0.65rem",
                    color: "rgba(255,255,255,0.7)",
                    marginTop: "0.5rem",
                    pointerEvents: "none",
                  }}
                >
                  Click to view languages
                </div>
              </div>
            ))}
          </div>

          {/* Buttons below the stats - always render, let CSS handle responsive */}
          <div
            className='show-breakdown-button'
            style={{
              marginTop: "1.5rem",
              display: "flex",
              gap: "1rem",
              justifyContent: "flex-end",
              flexWrap: "wrap",
            }}
          >
            <Button
              kind='ghost'
              size='lg'
              onClick={() => {
                setModalScope(null);
                setModalOpen(true);
              }}
              renderIcon={List}
              style={{
                color: "white",
                borderColor: "white",
              }}
            >
              View All {total.toLocaleString()} Languages
            </Button>
            <Button
              kind='ghost'
              size='lg'
              onClick={() => setShowDetail(!showDetail)}
              renderIcon={showDetail ? ViewOff : View}
              style={{
                color: "white",
                borderColor: "white",
              }}
            >
              {showDetail ? "Hide Details" : "Show Breakdown"}
            </Button>
          </div>
        </Column>
      </Grid>

      {showDetail && (
        <div
          style={{
            marginTop: "2rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <div
            style={{
              background: "rgba(0,0,0,0.3)",
              borderRadius: "8px",
              padding: "1rem",
              overflowX: "auto",
            }}
          >
            <table
              style={{
                width: "100%",
                minWidth: "400px",
                borderCollapse: "collapse",
                color: "white",
                fontSize: "1rem",
              }}
            >
              <thead>
                <tr style={{ borderBottom: "2px solid rgba(255,255,255,0.3)" }}>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "0.75rem",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.95)",
                    }}
                  >
                    Translation Scope
                  </th>
                  <th
                    style={{
                      textAlign: "right",
                      padding: "0.75rem",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.95)",
                    }}
                  >
                    At Risk / Total w/ Goal
                  </th>
                  <th
                    style={{
                      textAlign: "right",
                      padding: "0.75rem",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.95)",
                    }}
                  >
                    % At Risk
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data).map(([scope, count]) => {
                  const scopeTotal = totalsByScope[scope] || 1;
                  const percentage = ((count / scopeTotal) * 100).toFixed(1);
                  return (
                    <tr key={scope} style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
                      <td
                        style={{
                          padding: "0.75rem",
                          color: "rgba(255,255,255,0.9)",
                        }}
                      >
                        {scope}
                      </td>
                      <td
                        style={{
                          padding: "0.75rem",
                          textAlign: "right",
                          fontWeight: 600,
                          color: "white",
                        }}
                      >
                        {count.toLocaleString()} / {scopeTotal.toLocaleString()}
                      </td>
                      <td
                        style={{
                          padding: "0.75rem",
                          textAlign: "right",
                          color: "rgba(255,255,255,0.9)",
                        }}
                      >
                        {percentage}%
                      </td>
                    </tr>
                  );
                })}
                <tr style={{ borderTop: "2px solid rgba(255,255,255,0.3)" }}>
                  <td
                    style={{
                      padding: "0.75rem",
                      fontWeight: 700,
                      color: "white",
                    }}
                  >
                    TOTAL AT RISK
                  </td>
                  <td
                    style={{
                      padding: "0.75rem",
                      textAlign: "right",
                      fontWeight: 700,
                      fontSize: "1.125rem",
                      color: "white",
                    }}
                  >
                    {total.toLocaleString()} /{" "}
                    {Object.values(totalsByScope)
                      .reduce((a, b) => a + b, 0)
                      .toLocaleString()}
                  </td>
                  <td
                    style={{
                      padding: "0.75rem",
                      textAlign: "right",
                      fontWeight: 700,
                      color: "white",
                    }}
                  >
                    {(
                      (total / Object.values(totalsByScope).reduce((a, b) => a + b, 0)) *
                      100
                    ).toFixed(1)}
                    %
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Language List Modal */}
      <LanguageListModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={
          modalScope ? `At Risk Languages - ${modalScope} Goal` : "All Languages at Critical Risk"
        }
        languages={
          modalScope && languagesByScope[modalScope] ? languagesByScope[modalScope] : languages
        }
        color='#dc2626'
      />
    </div>
  );
}

// ---------- Secondary Analysis Component ----------
function SecondaryAnalysis({
  title,
  data,
  total,
  icon,
  color = "#0f62fe",
  languages = [],
}: {
  title: string;
  data: Record<string, number>;
  total: number;
  icon?: React.ReactNode;
  color?: string;
  languages?: any[];
}) {
  const [mode, setMode] = useState<"table" | "chart">("chart");
  const [modalOpen, setModalOpen] = useState(false);

  const chartData = Object.entries(data).map(([scope, count]) => ({
    group: scope,
    value: count,
  }));

  const chartOptions: any = {
    title: "",
    axes: {
      left: { mapsTo: "value" },
      bottom: { mapsTo: "group", scaleType: "labels" },
    },
    height: "250px",
    color: { scale: { [title]: color } },
    legend: { enabled: false },
  };

  return (
    <Tile style={{ height: "100%", position: "relative" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "1rem",
        }}
      >
        <div>
          {icon && <span style={{ marginRight: "0.5rem" }}>{icon}</span>}
          <h3 style={{ fontSize: "1.125rem", fontWeight: 600, display: "inline" }}>{title}</h3>
          <div
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              color,
              marginTop: "0.5rem",
            }}
          >
            {total.toLocaleString()}
          </div>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <Button
            kind='ghost'
            size='sm'
            onClick={() => setModalOpen(true)}
            renderIcon={List}
            hasIconOnly
            iconDescription={`View all ${total} languages`}
          />
          <Button
            kind='ghost'
            size='sm'
            onClick={() => setMode(mode === "table" ? "chart" : "table")}
            renderIcon={mode === "table" ? ChartBar : DataTableIcon}
            hasIconOnly
            iconDescription={mode === "table" ? "Show chart" : "Show table"}
          />
        </div>
      </div>

      {mode === "chart" ? (
        <SimpleBarChart data={chartData} options={chartOptions} />
      ) : (
        <div style={{ maxHeight: "250px", overflow: "auto" }}>
          <table style={{ width: "100%", fontSize: "0.875rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e0e0e0" }}>
                <th style={{ textAlign: "left", padding: "0.5rem" }}>Scope</th>
                <th style={{ textAlign: "right", padding: "0.5rem" }}>Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data).map(([scope, count]) => (
                <tr key={scope} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td style={{ padding: "0.5rem" }}>{scope}</td>
                  <td style={{ padding: "0.5rem", textAlign: "right" }}>{count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Language List Modal */}
      <LanguageListModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={title}
        languages={languages}
        color={color}
      />
    </Tile>
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

  // Check if mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 480;

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
              complete: (res: any) => resolve(res.data as any[]),
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
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f5f5f5, #e0e0e0)",
        position: "relative",
      }}
    >
      <CollapsedImporter onRows={setRows} />

      <div
        className='main-container'
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: isMobile ? "0.5rem" : "2rem",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h1
            style={{
              fontSize: "3rem",
              fontWeight: 300,
              marginBottom: "0.5rem",
              color: "#161616",
            }}
          >
            PROJECT RED TABLE
          </h1>
          <p
            style={{
              fontSize: "1.125rem",
              color: "#525252",
              fontWeight: 400,
            }}
          >
            All Access Goals Critical Risk Assessment Dashboard
          </p>
        </div>

        {isEmpty ? (
          <div
            style={{
              background: "white",
              borderRadius: "16px",
              padding: "4rem",
              textAlign: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <WarningFilled size={64} style={{ color: "#da1e28", marginBottom: "1rem" }} />
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>No Data Loaded</h2>
            <p style={{ color: "#525252", marginBottom: "2rem" }}>
              Import your language data to view the risk assessment.
              <br />
              Click "Import Data" in the top right to get started.
            </p>
          </div>
        ) : (
          <>
            {/* THE HERO RED TABLE */}
            <HeroRedTable
              data={summary.risk}
              total={summary.totals.risk}
              totalsByScope={summary.totals.all}
              languages={summary.languages.risk}
              languagesByScope={summary.languages.riskByScope}
            />

            {/* Secondary Analysis Grid */}
            <div style={{ marginTop: "3rem" }}>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  marginBottom: "1.5rem",
                  color: "#161616",
                }}
              >
                Detailed Activity Analysis
              </h2>

              <Grid>
                <Column lg={5} md={8} sm={4} style={{ marginBottom: "1.5rem" }}>
                  <SecondaryAnalysis
                    title='No Translation Activity'
                    data={summary.noActivity}
                    total={summary.totals.noActivity}
                    color='#fa4d56'
                    languages={summary.languages.noActivity}
                  />
                </Column>
                <Column lg={5} md={8} sm={4} style={{ marginBottom: "1.5rem" }}>
                  <SecondaryAnalysis
                    title='Language Development Only'
                    data={summary.activeLDSE}
                    total={summary.totals.activeLDSE}
                    color='#ff832b'
                    languages={summary.languages.activeLDSE}
                  />
                </Column>
                <Column lg={6} md={8} sm={4} style={{ marginBottom: "1.5rem" }}>
                  <SecondaryAnalysis
                    title='Active Translation (Pace Unknown)'
                    data={summary.activeTx}
                    total={summary.totals.activeTx}
                    color='#0f62fe'
                    languages={summary.languages.activeTx}
                  />
                </Column>
              </Grid>
            </div>

            {/* Summary Statistics */}
            <div
              style={{
                marginTop: "3rem",
                padding: "2rem",
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
              }}
            >
              <Grid style={{ display: "flex", justifyContent: "center" }}>
                <Column lg={4} md={6} sm={4}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "#161616" }}>
                      {rows.length.toLocaleString()}
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#525252" }}>
                      Total Languages Analyzed
                    </div>
                  </div>
                </Column>
                <Column lg={4} md={6} sm={4}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "#c1d72e" }}>
                      {summary.totals.goalMet.toLocaleString()}
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#525252" }}>
                      Languages Completed (
                      {((summary.totals.goalMet / rows.length) * 100).toFixed(1)}%)
                    </div>
                  </div>
                </Column>
                <Column lg={4} md={6} sm={4}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "#da1e28" }}>
                      {summary.totals.risk.toLocaleString()}
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#525252" }}>
                      At Risk ({((summary.totals.risk / rows.length) * 100).toFixed(1)}%)
                    </div>
                  </div>
                </Column>
                <Column lg={4} md={6} sm={4}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "2.5rem", fontWeight: 700, color: "#0f62fe" }}>
                      2033
                    </div>
                    <div style={{ fontSize: "0.875rem", color: "#525252" }}>
                      Target Completion Year
                    </div>
                  </div>
                </Column>
              </Grid>
            </div>
          </>
        )}

        {/* Footer with All Access Goals */}
        {!isEmpty && <AllAccessGoalsFooter rows={rows} />}
      </div>
    </div>
  );
}
