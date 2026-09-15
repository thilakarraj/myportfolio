import type { ProjectMotif as MotifKind } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Original abstract system diagrams — conceptual visuals, not product screenshots.
 * All shapes are drawn in a 320x200 coordinate space and scale with the container.
 */
export function ProjectMotif({
  kind,
  className,
}: {
  kind: MotifKind;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 320 200"
      className={cn("size-full", className)}
      aria-hidden
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      {kind === "orchestrator" && <Orchestrator />}
      {kind === "ble" && <Ble />}
      {kind === "pipeline" && <Pipeline />}
      {kind === "etl" && <Etl />}
      {kind === "carriers" && <Carriers />}
    </svg>
  );
}

const box = "fill-[var(--surface-2)] stroke-[var(--border-strong)]";
const label = "fill-[var(--text-muted)] stroke-none font-mono text-[9px] tracking-wider";
const accent = "stroke-[var(--accent)]";
const secondary = "stroke-[var(--secondary)]";

function Orchestrator() {
  const providers = [
    { y: 40, t: "OpenAI" },
    { y: 100, t: "Claude" },
    { y: 160, t: "Gemini" },
  ];
  return (
    <>
      <rect x="20" y="78" width="70" height="44" rx="8" className={box} />
      <text x="55" y="97" textAnchor="middle" className={label}>
        WORKFLOW
      </text>
      <text x="55" y="110" textAnchor="middle" className={label}>
        REQUEST
      </text>

      <rect x="125" y="62" width="80" height="76" rx="10" className={box} />
      <text x="165" y="92" textAnchor="middle" className={label}>
        ORCHESTRATOR
      </text>
      <text x="165" y="106" textAnchor="middle" className={`${label} fill-[var(--accent)]`}>
        RAG · MCP
      </text>
      <text x="165" y="119" textAnchor="middle" className={label}>
        AGENTS
      </text>

      <path d="M90 100 H125" className={`flow-line ${accent}`} />
      {providers.map((p) => (
        <g key={p.t}>
          <path d={`M205 100 C 235 100, 235 ${p.y}, 260 ${p.y}`} className={`flow-line ${secondary}`} />
          <rect x="260" y={p.y - 14} width="46" height="28" rx="6" className={box} />
          <text x="283" y={p.y + 3} textAnchor="middle" className={label}>
            {p.t.toUpperCase()}
          </text>
        </g>
      ))}
    </>
  );
}

function Ble() {
  return (
    <>
      {/* device */}
      <rect x="28" y="70" width="54" height="60" rx="10" className={box} />
      <circle cx="55" cy="100" r="10" className={accent} />
      <circle cx="55" cy="100" r="3" className="fill-[var(--accent)] stroke-none" />
      <text x="55" y="146" textAnchor="middle" className={label}>
        DEVICE
      </text>

      {/* BLE waves */}
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${96 + i * 10} 86 q ${8 + i * 3} 14 0 28`}
          className={secondary}
          opacity={1 - i * 0.28}
        />
      ))}
      <text x="112" y="70" textAnchor="middle" className={label}>
        BLE
      </text>

      {/* phone */}
      <rect x="140" y="46" width="60" height="108" rx="12" className={box} />
      <rect x="150" y="62" width="40" height="70" rx="4" className="stroke-[var(--border)]" />
      <text x="170" y="92" textAnchor="middle" className={label}>
        SQLITE
      </text>
      <text x="170" y="106" textAnchor="middle" className={`${label} fill-[var(--accent)]`}>
        OFFLINE
      </text>

      {/* sync */}
      <path d="M200 100 H 240" className={`flow-line ${accent}`} />
      <text x="220" y="90" textAnchor="middle" className={label}>
        SYNC
      </text>

      {/* cloud */}
      <rect x="240" y="76" width="60" height="48" rx="10" className={box} />
      <text x="270" y="96" textAnchor="middle" className={label}>
        API · JWT
      </text>
      <text x="270" y="110" textAnchor="middle" className={label}>
        AUDIT · RBAC
      </text>
    </>
  );
}

function Pipeline() {
  const steps = ["PR", "REVIEW", "TESTS", "SAST", "RELEASE"];
  return (
    <>
      {steps.map((s, i) => {
        const x = 20 + i * 60;
        const highlight = s === "SAST" || s === "TESTS";
        return (
          <g key={s}>
            <rect
              x={x}
              y="80"
              width="44"
              height="40"
              rx="8"
              className={cn(box, highlight && "stroke-[var(--accent)]")}
            />
            <text x={x + 22} y="104" textAnchor="middle" className={label}>
              {s}
            </text>
            {i < steps.length - 1 ? (
              <path d={`M${x + 44} 100 H ${x + 60}`} className={`flow-line ${accent}`} />
            ) : null}
          </g>
        );
      })}
      <path d="M200 80 V 50 H 42 V 80" className={`${secondary}`} strokeDasharray="3 3" />
      <text x="120" y="44" textAnchor="middle" className={label}>
        QUALITY GATE · GITHUB ACTIONS
      </text>
      <text x="160" y="150" textAnchor="middle" className={label}>
        PLAYWRIGHT · SEMGREP · SECRET SCAN
      </text>
    </>
  );
}

function Etl() {
  const inputs = ["CONFIG", "INSTRUMENT", "DEMOGRAPHIC"];
  return (
    <>
      {inputs.map((t, i) => {
        const y = 44 + i * 56;
        return (
          <g key={t}>
            <rect x="20" y={y - 14} width="80" height="28" rx="6" className={box} />
            <text x="60" y={y + 3} textAnchor="middle" className={label}>
              {t}
            </text>
            <path d={`M100 ${y} C 125 ${y}, 125 100, 150 100`} className={`flow-line ${secondary}`} />
          </g>
        );
      })}
      <rect x="150" y="70" width="70" height="60" rx="10" className={cn(box, "stroke-[var(--accent)]")} />
      <text x="185" y="94" textAnchor="middle" className={label}>
        ETL · ASYNC
      </text>
      <text x="185" y="108" textAnchor="middle" className={`${label} fill-[var(--accent)]`}>
        CALC ENGINE
      </text>
      <path d="M220 100 H 250" className={`flow-line ${accent}`} />
      <rect x="250" y="82" width="52" height="36" rx="6" className={box} />
      <text x="276" y="97" textAnchor="middle" className={label}>
        PDF
      </text>
      <text x="276" y="109" textAnchor="middle" className={label}>
        REPORT
      </text>
      <path d="M185 130 V 156" className={`flow-line ${accent}`} />
      <rect x="150" y="156" width="70" height="26" rx="6" className={box} />
      <text x="185" y="173" textAnchor="middle" className={label}>
        MYSQL · BATCH
      </text>
    </>
  );
}

function Carriers() {
  const carriers = ["UPS", "DHL", "FEDEX", "PUROLATOR"];
  return (
    <>
      <rect x="20" y="30" width="70" height="140" rx="10" className={box} />
      <text x="55" y="58" textAnchor="middle" className={label}>
        TENANT A
      </text>
      <text x="55" y="100" textAnchor="middle" className={label}>
        TENANT B
      </text>
      <text x="55" y="142" textAnchor="middle" className={label}>
        TENANT C
      </text>

      <path d="M90 100 H 120" className={`flow-line ${accent}`} />
      <rect x="120" y="60" width="80" height="80" rx="10" className={cn(box, "stroke-[var(--accent)]")} />
      <text x="160" y="88" textAnchor="middle" className={label}>
        SHIPMENTS
      </text>
      <text x="160" y="102" textAnchor="middle" className={label}>
        QUOTES · INVOICES
      </text>
      <text x="160" y="116" textAnchor="middle" className={`${label} fill-[var(--accent)]`}>
        REST · SOLR
      </text>

      {carriers.map((c, i) => {
        const y = 40 + i * 40;
        return (
          <g key={c}>
            <path d={`M200 100 C 230 100, 230 ${y}, 250 ${y}`} className={`flow-line ${secondary}`} />
            <rect x="250" y={y - 12} width="56" height="24" rx="6" className={box} />
            <text x="278" y={y + 3} textAnchor="middle" className={label}>
              {c}
            </text>
          </g>
        );
      })}
    </>
  );
}
