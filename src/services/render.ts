import { artifacts, deployLane, environmentTopology, summary, verification } from "./iacMarketingService";

type EnvironmentNode = ReturnType<typeof environmentTopology>[number];
type DeployStage = ReturnType<typeof deployLane>[number];
type Artifact = ReturnType<typeof artifacts>[number];

const topologyCoordinates: Record<string, { x: number; y: number }> = {
  "env-01": { x: 120, y: 220 },
  "env-04": { x: 320, y: 92 },
  "env-02": { x: 420, y: 220 },
  "env-05": { x: 520, y: 344 },
  "env-03": { x: 720, y: 220 }
};

const topologyLinks = [
  { source: "env-01", target: "env-02", label: "Traffic route" },
  { source: "env-04", target: "env-01", label: "Security policy" },
  { source: "env-04", target: "env-02", label: "Credentials" },
  { source: "env-02", target: "env-03", label: "Event funnel" },
  { source: "env-05", target: "env-01", label: "CDN logs" },
  { source: "env-05", target: "env-02", label: "Perf alerts" },
  { source: "env-05", target: "env-03", label: "Drift alarms" }
];

function pageShell(title: string, activeRoute: string, body: string) {
  const nav = [
    { href: "/", label: "Overview & Export" },
    { href: "/environment-topology", label: "Environment Topology" },
    { href: "/deploy-lane", label: "Deploy Lane Pipeline" },
    { href: "/verification", label: "Operator Verification" },
    { href: "/docs", label: "Terraform Specimens / Docs" }
  ];

  const dashboard = summary();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    :root {
      --bg: #030816;
      --surface: rgba(12, 18, 36, 0.88);
      --surface-2: rgba(17, 27, 50, 0.72);
      --surface-3: rgba(9, 16, 31, 0.82);
      --border: rgba(148, 163, 184, 0.18);
      --border-strong: rgba(96, 165, 250, 0.26);
      --text: #eef3fb;
      --muted: #9fb0cc;
      --blue: #3b82f6;
      --cyan: #22d3ee;
      --emerald: #34d399;
      --amber: #fbbf24;
      --rose: #fb7185;
      --violet: #8b5cf6;
      --mono: "IBM Plex Mono", Consolas, monospace;
      --sans: "IBM Plex Sans", "Segoe UI", sans-serif;
      --serif: "IBM Plex Serif", Georgia, serif;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      color: var(--text);
      font-family: var(--sans);
      background:
        radial-gradient(circle at top left, rgba(59, 130, 246, 0.18), transparent 26%),
        radial-gradient(circle at top right, rgba(34, 211, 238, 0.12), transparent 20%),
        radial-gradient(circle at 70% 18%, rgba(139, 92, 246, 0.12), transparent 18%),
        var(--bg);
      overflow-x: hidden;
    }
    a { color: inherit; text-decoration: none; }
    .wrap { width: min(1500px, calc(100% - 40px)); margin: 22px auto 44px; }
    .hero {
      padding: 24px 28px 30px;
      border-radius: 28px;
      border: 1px solid var(--border);
      background: linear-gradient(180deg, rgba(10, 16, 31, 0.95), rgba(7, 12, 25, 0.88));
      box-shadow: 0 24px 70px rgba(0, 0, 0, 0.35);
    }
    .hero-grid {
      display: grid;
      grid-template-columns: minmax(0, 1fr) 300px;
      gap: 22px;
      align-items: start;
    }
    .eyebrow, .panel-label, .mini, .kicker, .status-pill, .tab, .metric-label {
      font-family: var(--mono);
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 14px;
      color: var(--muted);
      font-size: 13px;
      margin-bottom: 16px;
    }
    .eyebrow strong {
      color: #86b8ff;
      border: 1px solid rgba(59, 130, 246, 0.34);
      padding: 10px 14px;
      border-radius: 8px;
      background: rgba(59, 130, 246, 0.08);
    }
    h1 {
      margin: 0 0 12px;
      font-family: var(--serif);
      font-size: clamp(50px, 5vw, 76px);
      line-height: 0.96;
      letter-spacing: -0.03em;
    }
    h1 span {
      background: linear-gradient(90deg, #60a5fa, #22d3ee);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    .lede {
      margin: 0;
      max-width: 1020px;
      color: var(--muted);
      font-size: 18px;
      line-height: 1.64;
    }
    .posture {
      border: 1px solid var(--border);
      border-radius: 22px;
      background: rgba(14, 22, 42, 0.88);
      padding: 22px 22px 18px;
      min-height: 118px;
    }
    .panel-label {
      color: #8da4c6;
      font-size: 12px;
      margin-bottom: 14px;
    }
    .status-line {
      font-family: var(--mono);
      font-size: 15px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .status-line::before {
      content: "";
      width: 12px;
      height: 12px;
      border-radius: 999px;
      background: #60a5fa;
      box-shadow: 0 0 0 5px rgba(59, 130, 246, 0.14);
    }
    .tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      margin: 28px 0 18px;
    }
    .tab {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 16px 24px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: rgba(17, 27, 50, 0.7);
      color: #95a7c6;
      font-size: 14px;
    }
    .tab.active {
      color: white;
      background: linear-gradient(135deg, #2563eb, #3b82f6);
      border-color: rgba(59, 130, 246, 0.55);
      box-shadow: 0 18px 36px rgba(37, 99, 235, 0.3);
    }
    .kpi-row {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 18px;
      margin-top: 8px;
    }
    .kpi {
      border: 1px solid var(--border);
      border-radius: 22px;
      padding: 18px 20px;
      background: rgba(15, 23, 42, 0.84);
      min-height: 120px;
    }
    .metric-label {
      color: #7ea9e7;
      font-size: 12px;
      margin-bottom: 18px;
    }
    .metric-value {
      font-size: 58px;
      line-height: 1;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .metric-copy {
      color: var(--muted);
      font-size: 15px;
      line-height: 1.48;
    }
    .section {
      margin-top: 26px;
      display: grid;
      grid-template-columns: repeat(12, minmax(0, 1fr));
      gap: 24px;
    }
    .card {
      border: 1px solid var(--border);
      border-radius: 28px;
      background: var(--surface);
      padding: 28px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.24);
    }
    .wide { grid-column: span 8; }
    .narrow { grid-column: span 4; }
    .full { grid-column: 1 / -1; }
    .section-title {
      margin: 8px 0 12px;
      font-size: 25px;
      line-height: 1.22;
    }
    .section-copy {
      margin: 0 0 22px;
      color: var(--muted);
      font-size: 17px;
      line-height: 1.7;
    }
    .kicker { color: var(--amber); font-size: 13px; }
    .recommendation {
      border-color: rgba(251, 191, 36, 0.22);
      background: linear-gradient(180deg, rgba(21, 24, 34, 0.92), rgba(18, 25, 42, 0.86));
    }
    .recommendation h2 {
      margin: 12px 0 10px;
      font-size: 28px;
      line-height: 1.35;
    }
    .recommendation p {
      margin: 0;
      color: var(--muted);
      font-size: 16px;
    }
    .artifact-list, .lane-list, .verify-list {
      display: grid;
      gap: 16px;
    }
    .artifact, .lane-item, .verify-item {
      border: 1px solid var(--border);
      border-radius: 22px;
      background: var(--surface-2);
      padding: 22px;
    }
    .artifact h3, .lane-item h3 { margin: 10px 0 10px; font-size: 24px; }
    .artifact p, .lane-item p, .verify-item { margin: 0; color: var(--muted); font-size: 15px; line-height: 1.65; }
    .artifact pre {
      margin: 16px 0 0;
      padding: 18px;
      border-radius: 16px;
      border: 1px solid rgba(148, 163, 184, 0.12);
      background: rgba(5, 10, 22, 0.92);
      color: #c6d5f5;
      overflow: auto;
      font-family: var(--mono);
      font-size: 14px;
      line-height: 1.62;
    }
    .mini { color: #7ea9e7; font-size: 12px; margin-bottom: 12px; }
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      border-radius: 999px;
      font-size: 12px;
      border: 1px solid var(--border);
    }
    .healthy { color: var(--emerald); border-color: rgba(52, 211, 153, 0.3); background: rgba(52, 211, 153, 0.12); }
    .watch { color: var(--amber); border-color: rgba(251, 191, 36, 0.26); background: rgba(251, 191, 36, 0.1); }
    .critical { color: var(--rose); border-color: rgba(251, 113, 133, 0.24); background: rgba(251, 113, 133, 0.1); }
    .topology-layout {
      display: grid;
      grid-template-columns: minmax(0, 1.55fr) 360px;
      gap: 24px;
      align-items: start;
    }
    .topology-board {
      border: 1px solid var(--border);
      border-radius: 28px;
      background: linear-gradient(180deg, rgba(10, 16, 31, 0.92), rgba(13, 20, 39, 0.9));
      padding: 18px 18px 20px;
      position: relative;
      overflow: hidden;
    }
    .topology-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 14px;
    }
    .legend {
      display: inline-flex;
      gap: 18px;
      align-items: center;
      color: var(--muted);
      font-family: var(--mono);
      font-size: 12px;
    }
    .legend span::before {
      content: "";
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 999px;
      margin-right: 8px;
      vertical-align: middle;
    }
    .legend .healthy-dot::before { background: var(--emerald); }
    .legend .watch-dot::before { background: var(--amber); }
    .legend .critical-dot::before { background: var(--rose); }
    .topology-canvas {
      width: 100%;
      border-radius: 22px;
      background:
        radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.08), transparent 52%),
        rgba(7, 12, 25, 0.88);
      border: 1px solid rgba(148, 163, 184, 0.12);
      padding: 12px;
    }
    .topology-note {
      margin-top: 12px;
      color: var(--muted);
      font-size: 14px;
    }
    .topology-note strong { color: #e5eefb; }
    .inspector {
      border: 1px solid var(--border);
      border-radius: 28px;
      background: linear-gradient(180deg, rgba(15, 23, 42, 0.92), rgba(10, 17, 33, 0.92));
      padding: 26px;
      min-height: 100%;
    }
    .inspector hr {
      border: 0;
      border-top: 1px solid var(--border);
      margin: 22px 0;
    }
    .inspector h3 {
      margin: 10px 0 18px;
      font-size: 26px;
      line-height: 1.22;
    }
    .inspector-copy {
      color: var(--muted);
      font-size: 15px;
      line-height: 1.72;
    }
    .inspector-actions {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
      margin-top: 18px;
    }
    .tone-button, .reset-button {
      border: 1px solid var(--border);
      background: rgba(9, 16, 31, 0.82);
      color: #b8c6de;
      border-radius: 14px;
      padding: 14px 12px;
      font-family: var(--mono);
      font-size: 12px;
      text-transform: uppercase;
    }
    .reset-button {
      padding-inline: 18px;
      color: #e5eefb;
      background: rgba(17, 27, 50, 0.74);
    }
    .docs-layout {
      display: grid;
      grid-template-columns: minmax(0, 1.15fr) 340px;
      gap: 24px;
    }
    .spec-box {
      border: 1px solid var(--border);
      border-radius: 22px;
      background: var(--surface-2);
      padding: 22px;
    }
    .spec-box strong {
      display: block;
      margin-bottom: 12px;
      font-size: 16px;
    }
    .spec-box p {
      margin: 0;
      color: var(--muted);
      font-size: 15px;
      line-height: 1.7;
    }
    @media (max-width: 1180px) {
      .hero-grid, .topology-layout, .docs-layout { grid-template-columns: 1fr; }
      .kpi-row { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .wide, .narrow { grid-column: 1 / -1; }
    }
    @media (max-width: 760px) {
      .wrap { width: min(100% - 20px, 100%); }
      .hero, .card, .inspector, .topology-board { padding: 20px; }
      .tabs { gap: 10px; }
      .tab { width: 100%; }
      .kpi-row { grid-template-columns: 1fr; }
      .inspector-actions { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
  <div class="wrap">
    <section class="hero">
      <div class="hero-grid">
        <div>
          <div class="eyebrow"><strong>Kinetic Gain</strong><span>• System Control Plane</span></div>
          <h1>IaC SaaS <span>Marketing</span></h1>
          <p class="lede">Scalable marketing infrastructure modeling environment topology, deployment promotion, analytics-safe routing, and operator-ready edge posture guidelines for revenue systems that cannot afford dirty traffic or fragile releases.</p>
        </div>
        <aside class="posture">
          <div class="panel-label">Environment Posture</div>
          <div class="status-line">Live Operator Console</div>
        </aside>
      </div>

      <nav class="tabs">
        ${nav.map((item) => `<a class="tab ${item.href === activeRoute ? "active" : ""}" href="${item.href}">${item.label}</a>`).join("")}
      </nav>

      <div class="kpi-row">
        <article class="kpi"><div class="metric-label">Active Layers</div><div class="metric-value">${dashboard.environmentCount}</div><div class="metric-copy">Operational infrastructure layers mapped across edge, runtime, analytics, and observability.</div></article>
        <article class="kpi"><div class="metric-label">Security & Health</div><div class="metric-value">${dashboard.healthy}<span style="font-size:28px;color:#fbbf24;"> / ${dashboard.attention}</span></div><div class="metric-copy">Healthy and attention-required domains under the current release posture.</div></article>
        <article class="kpi"><div class="metric-label">Flow Performance</div><div class="metric-value">${dashboard.avgPromotion}<span style="font-size:28px;">m</span></div><div class="metric-copy">Average branch-to-production promotion time through the gated delivery lane.</div></article>
        <article class="kpi"><div class="metric-label">Starter Files</div><div class="metric-value">${dashboard.artifactCount}</div><div class="metric-copy">Representative Terraform and platform specimens supporting delivery and analytics integrity.</div></article>
      </div>
    </section>

    ${body}
  </div>
</body>
</html>`;
}

function statusClass(status: string) {
  if (status === "healthy") return "healthy";
  if (status === "watch") return "watch";
  return "critical";
}

function nodeTone(status: string) {
  if (status === "healthy") return { stroke: "#34d399", fill: "rgba(52, 211, 153, 0.16)", halo: "rgba(52, 211, 153, 0.24)" };
  if (status === "watch") return { stroke: "#fbbf24", fill: "rgba(251, 191, 36, 0.14)", halo: "rgba(251, 191, 36, 0.2)" };
  return { stroke: "#fb7185", fill: "rgba(251, 113, 133, 0.14)", halo: "rgba(251, 113, 133, 0.22)" };
}

function topologySvg(nodes: EnvironmentNode[]) {
  const links = topologyLinks
    .map((link) => {
      const source = topologyCoordinates[link.source];
      const target = topologyCoordinates[link.target];
      if (!source || !target) return "";
      const mx = (source.x + target.x) / 2;
      const my = (source.y + target.y) / 2 - (source.y === target.y ? 26 : 0);
      return `<g class="topology-link">
        <line x1="${source.x}" y1="${source.y}" x2="${target.x}" y2="${target.y}" stroke="rgba(251,191,36,0.8)" stroke-width="3" stroke-dasharray="8 8" />
        <text x="${mx}" y="${my}" fill="#c8d4ea" font-family="IBM Plex Mono, monospace" font-size="13" text-anchor="middle">${link.label}</text>
      </g>`;
    })
    .join("");

  const nodeMarkup = nodes
    .map((node) => {
      const position = topologyCoordinates[node.id];
      if (!position) return "";
      const tone = nodeTone(node.health);
      return `<g class="topology-node-svg" data-node-id="${node.id}" style="cursor:pointer">
        <circle cx="${position.x}" cy="${position.y}" r="44" fill="${tone.halo}" />
        <circle cx="${position.x}" cy="${position.y}" r="34" fill="${tone.fill}" stroke="${tone.stroke}" stroke-width="2.5" />
        <circle cx="${position.x}" cy="${position.y}" r="8" fill="${tone.stroke}" />
        <text x="${position.x}" y="${position.y + 66}" fill="#eef3fb" font-family="IBM Plex Sans, sans-serif" font-size="18" font-weight="700" text-anchor="middle">${escapeHtml(node.layer)}</text>
        <text x="${position.x}" y="${position.y + 88}" fill="${tone.stroke}" font-family="IBM Plex Mono, monospace" font-size="13" text-anchor="middle">${escapeHtml(node.id.toUpperCase())} • ${escapeHtml(node.health.toUpperCase())}</text>
      </g>`;
    })
    .join("");

  return `<svg class="topology-canvas" viewBox="0 0 840 440" aria-label="Interactive environment topology diagram">
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
        <polygon points="0 0, 10 5, 0 10" fill="#34d399"></polygon>
      </marker>
    </defs>
    <line x1="454" y1="220" x2="676" y2="220" stroke="#34d399" stroke-width="3" marker-end="url(#arrowhead)" />
    <text x="562" y="205" fill="#c8d4ea" font-family="IBM Plex Mono, monospace" font-size="13" text-anchor="middle">Delivery stream</text>
    ${links}
    ${nodeMarkup}
  </svg>`;
}

function inspectorScript(nodes: EnvironmentNode[]) {
  const payload = JSON.stringify(nodes);
  return `<script>
    (() => {
      const nodes = ${payload};
      const defaultNode = nodes.find((node) => node.id === "env-01") || nodes[0];
      const inspector = document.getElementById("layer-inspector");
      const resetButton = document.getElementById("reset-topology");
      const svgNodes = Array.from(document.querySelectorAll("[data-node-id]"));

      function render(node) {
        if (!inspector || !node) return;
        inspector.innerHTML = [
          '<div class="mini">Layer inspector</div>',
          '<div class="status-pill ' + node.health + '">' + node.id.toUpperCase() + '</div>',
          '<h3>' + node.layer + '</h3>',
          '<div class="status-pill ' + node.health + '" style="margin-bottom:18px; display:inline-flex;">' + node.health.toUpperCase() + '</div>',
          '<div class="panel-label">Primary responsibility</div>',
          '<p class="inspector-copy">' + node.responsibility + '</p>',
          '<hr />',
          '<div class="panel-label">Deployment posture / risk statement</div>',
          '<p class="inspector-copy">' + node.risk + '</p>',
          '<hr />',
          '<div class="panel-label">Simulated override controller</div>',
          '<p class="inspector-copy">Toggle health parameters conceptually to evaluate how release confidence shifts across the full stack.</p>',
          '<div class="inspector-actions">',
            '<button class="tone-button healthy" type="button">HEALTHY</button>',
            '<button class="tone-button watch" type="button">WATCH</button>',
            '<button class="tone-button critical" type="button">CRITICAL</button>',
          '</div>'
        ].join('');

        svgNodes.forEach((element) => {
          element.style.filter = element.getAttribute("data-node-id") === node.id ? "drop-shadow(0 0 18px rgba(96,165,250,0.42))" : "none";
          element.style.opacity = element.getAttribute("data-node-id") === node.id ? "1" : "0.9";
        });
      }

      svgNodes.forEach((element) => {
        element.addEventListener("click", () => {
          const node = nodes.find((item) => item.id === element.getAttribute("data-node-id"));
          if (node) render(node);
        });
      });

      if (resetButton) {
        resetButton.addEventListener("click", () => render(defaultNode));
      }

      render(defaultNode);
    })();
  </script>`;
}

export function renderOverview() {
  const dashboard = summary();
  const samples = artifacts().slice(0, 2);

  return `<section class="section">
    <article class="card full recommendation">
      <div class="kicker">Critical architectural recommendation</div>
      <h2>"${dashboard.recommendation}"</h2>
      <p>Best use case: enterprise marketing systems where campaign launch speed, traffic quality, analytics trust, and release confidence have to move together instead of being owned in isolated silos.</p>
    </article>

    <article class="card wide">
      <div class="panel-label">Decoupled posture files</div>
      <h2 class="section-title">Starter template explorer.</h2>
      <p class="section-copy">Representative Terraform specimens showing how the marketing environment is wired across edge, runtime, analytics, and release posture. This keeps the repo grounded in actual infrastructure artifacts rather than abstract dashboard copy.</p>
      <div class="artifact-list">
        ${samples
          .map(
            (artifact) => `<div class="artifact">
              <div class="mini">${artifact.category}</div>
              <h3>${artifact.path}</h3>
              <p>${artifact.summary}</p>
              <pre>${escapeHtml(artifact.sample)}</pre>
            </div>`
          )
          .join("")}
      </div>
    </article>

    <article class="card narrow">
      <div class="panel-label">Flow verification</div>
      <h2 class="section-title">Why this architecture exists.</h2>
      <p class="section-copy">The point is not generic IaC. The point is to make revenue infrastructure visible and operable.</p>
      <div class="verify-list">
        ${verification().map((item) => `<div class="verify-item">${item}</div>`).join("")}
      </div>
    </article>
  </section>`;
}

export function renderEnvironmentTopology() {
  const nodes = environmentTopology();

  return `<section class="section">
    <article class="card full">
      <div class="panel-label">System taxonomy</div>
      <h2 class="section-title">Decoupled multi-layer topology.</h2>
      <p class="section-copy">Review responsibilities from request routing and secrets posture through runtime delivery, analytics flow, and route-regression monitoring. The topology is interactive so the mental model is visual, not just textual.</p>

      <div class="topology-layout">
        <div class="topology-board">
          <div class="topology-header">
            <div>
              <div class="mini">Interactive topology diagram</div>
              <div style="font-size:17px;font-weight:700;">Kinetic decoupled data flow & mesh health</div>
            </div>
            <div class="legend">
              <span class="healthy-dot">Healthy</span>
              <span class="watch-dot">Watch</span>
              <span class="critical-dot">Critical</span>
            </div>
          </div>
          ${topologySvg(nodes)}
          <div class="topology-note"><strong>Interactive:</strong> click any node in the diagram to inspect its responsibility and risk posture in the side panel.</div>
        </div>

        <aside class="inspector">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
            <div class="panel-label" style="margin-bottom:0;">Layer inspector</div>
            <button id="reset-topology" class="reset-button" type="button">Reset Health Schema</button>
          </div>
          <div id="layer-inspector"></div>
        </aside>
      </div>
      ${inspectorScript(nodes)}
    </article>
  </section>`;
}

export function renderDeployLane() {
  const stages = deployLane();
  const artifactItems = artifacts();

  return `<section class="section">
    <article class="card wide">
      <div class="panel-label">Promotion sequence</div>
      <h2 class="section-title">Branch-to-production deploy lane.</h2>
      <p class="section-copy">Each stage exists to stop traffic contamination, analytics drift, or fragile campaign routing from reaching production under the disguise of a “successful deploy.”</p>
      <div class="lane-list">
        ${stages
          .map(
            (stage: DeployStage) => `<div class="lane-item">
              <div style="display:flex;justify-content:space-between;gap:18px;align-items:start;">
                <div>
                  <div class="mini">${stage.latencyMinutes} minutes avg</div>
                  <h3>${stage.stage}</h3>
                </div>
                <span class="status-pill ${statusClass(stage.status)}">${stage.status}</span>
              </div>
              <p><strong style="display:block;color:#e6eefb;margin-bottom:10px;">Control surface</strong>${stage.control}</p>
              <p style="margin-top:16px;"><strong style="display:block;color:#e6eefb;margin-bottom:10px;">Exit criteria</strong>${stage.exitCriteria}</p>
            </div>`
          )
          .join("")}
      </div>
    </article>

    <article class="card narrow">
      <div class="panel-label">Supporting artifacts</div>
      <h2 class="section-title">Promotion-aware specimens.</h2>
      <p class="section-copy">Files that define how environment behavior is promoted, defended, and observed.</p>
      <div class="artifact-list">
        ${artifactItems
          .map(
            (artifact) => `<div class="artifact">
              <div class="mini">${artifact.category}</div>
              <h3>${artifact.path}</h3>
              <p>${artifact.summary}</p>
            </div>`
          )
          .join("")}
      </div>
    </article>
  </section>`;
}

export function renderVerification() {
  return `<section class="section">
    <article class="card wide">
      <div class="panel-label">Operator verification</div>
      <h2 class="section-title">What this repo proves.</h2>
      <p class="section-copy">This is not generic Terraform theater. It is a revenue-infrastructure framing exercise showing how web platform, analytics, and traffic safety depend on the same deploy system.</p>
      <div class="verify-list">
        ${verification().map((item) => `<div class="verify-item">${item}</div>`).join("")}
      </div>
    </article>

    <article class="card narrow">
      <div class="panel-label">Readiness snapshot</div>
      <h2 class="section-title">Release gate summary.</h2>
      <div class="artifact-list">
        <div class="artifact"><div class="mini">Build</div><h3>TypeScript app</h3><p>Express-backed control plane with route and API surfaces for topology, promotion, docs, and verification.</p></div>
        <div class="artifact"><div class="mini">Artifacts</div><h3>Terraform specimens</h3><p>Environment topology files make edge, runtime, analytics, and secrets posture concrete and inspectable.</p></div>
        <div class="artifact"><div class="mini">Proof</div><h3>Browser-rendered screenshots</h3><p>README assets now come from the upgraded real app instead of synthetic placeholders.</p></div>
      </div>
    </article>
  </section>`;
}

export function renderDocs() {
  const artifactItems = artifacts();

  return `<section class="section">
    <article class="card wide">
      <div class="panel-label">System artifact / principal technical spec</div>
      <h2 class="section-title">Headless-grade SaaS marketing infrastructure.</h2>
      <p class="section-copy">How to align campaign routing, deploy safety, edge controls, and digital intelligence without treating revenue traffic like an afterthought.</p>
      <div class="artifact-list">
        ${artifactItems
          .map(
            (artifact: Artifact) => `<div class="artifact">
              <div class="mini">${artifact.category}</div>
              <h3>${artifact.path}</h3>
              <p>${artifact.summary}</p>
              <pre>${escapeHtml(artifact.sample)}</pre>
            </div>`
          )
          .join("")}
      </div>
    </article>

    <aside class="card narrow">
      <div class="panel-label">Spec classification</div>
      <div class="spec-box">
        <strong>Target platform</strong>
        <p>Node.js web runtime with Terraform-managed delivery and observability posture.</p>
      </div>
      <div class="spec-box" style="margin-top:18px;">
        <strong>Architecture role</strong>
        <p>Principal platform engineer operating at the boundary of growth, infrastructure, analytics trust, and edge safety.</p>
      </div>
      <div class="spec-box" style="margin-top:18px;">
        <strong>Signal metric target</strong>
        <p style="color:#34d399;font-family:var(--mono);">96% Uptime / Scale Ready</p>
      </div>
      <div class="spec-box" style="margin-top:18px;">
        <strong>Active focus</strong>
        <p>Headless delivery, deploy safety, edge controls, attribution trust, and route-level performance posture.</p>
      </div>
    </aside>
  </section>`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
