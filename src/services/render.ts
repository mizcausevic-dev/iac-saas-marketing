import { artifacts, deployLane, environmentTopology, summary, verification } from "./iacMarketingService";

function pageShell(title: string, activeRoute: string, body: string) {
  const nav = [
    { href: "/", label: "Overview & Export" },
    { href: "/environment-topology", label: "Environment Topology" },
    { href: "/deploy-lane", label: "Deploy Lane" },
    { href: "/verification", label: "Operator Verification" },
    { href: "/docs", label: "Integration Docs" }
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <style>
    :root {
      --bg: #08101f;
      --surface: #0f172a;
      --surface-2: #111b32;
      --surface-3: #17233f;
      --border: rgba(148, 163, 184, 0.18);
      --text: #e5eefb;
      --muted: #9fb0cc;
      --blue: #3b82f6;
      --cyan: #22d3ee;
      --emerald: #10b981;
      --amber: #fbbf24;
      --rose: #fb7185;
      --mono: "IBM Plex Mono", "SFMono-Regular", Consolas, monospace;
      --sans: "IBM Plex Sans", "Segoe UI", sans-serif;
      --serif: "IBM Plex Serif", Georgia, serif;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: var(--sans);
      background:
        radial-gradient(circle at top left, rgba(59, 130, 246, 0.18), transparent 26%),
        radial-gradient(circle at top right, rgba(34, 211, 238, 0.16), transparent 22%),
        var(--bg);
      color: var(--text);
    }
    a { color: inherit; text-decoration: none; }
    .wrap { width: min(1380px, calc(100% - 48px)); margin: 24px auto 48px; }
    .hero {
      display: grid;
      grid-template-columns: 1fr 260px;
      gap: 24px;
      padding: 26px 32px;
      border: 1px solid var(--border);
      border-radius: 28px;
      background: rgba(8, 16, 31, 0.8);
      box-shadow: 0 24px 70px rgba(0, 0, 0, 0.32);
    }
    .eyebrow, .panel-label, .kicker, .pill, .tab, .status-pill, .mini {
      font-family: var(--mono);
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .eyebrow {
      display: inline-flex;
      gap: 16px;
      align-items: center;
      margin-bottom: 18px;
      color: var(--muted);
      font-size: 13px;
    }
    .eyebrow strong {
      color: #7db5ff;
      border: 1px solid rgba(59,130,246,0.35);
      padding: 9px 14px;
      border-radius: 8px;
    }
    h1 {
      margin: 0 0 10px;
      font-family: var(--serif);
      font-size: clamp(50px, 5vw, 72px);
      line-height: 0.98;
    }
    h1 span {
      background: linear-gradient(90deg, #60a5fa, #22d3ee);
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    .lede {
      margin: 0;
      max-width: 980px;
      color: var(--muted);
      font-size: 18px;
      line-height: 1.6;
    }
    .posture {
      border: 1px solid var(--border);
      border-radius: 20px;
      background: rgba(15, 23, 42, 0.9);
      padding: 28px 24px;
      align-self: start;
    }
    .posture .panel-label { color: #91a3c6; font-size: 12px; margin-bottom: 14px; }
    .posture .status-line { font-size: 15px; font-family: var(--mono); font-weight: 600; }
    .tabs { display: flex; flex-wrap: wrap; gap: 16px; margin: 22px 0 34px; }
    .tab {
      display: inline-flex;
      align-items: center;
      padding: 17px 28px;
      border: 1px solid var(--border);
      border-radius: 999px;
      color: #93a7c7;
      background: rgba(15, 23, 42, 0.8);
      font-size: 14px;
    }
    .tab.active {
      color: white;
      background: linear-gradient(135deg, #2563eb, #3b82f6);
      border-color: rgba(59,130,246,0.55);
      box-shadow: 0 18px 36px rgba(37, 99, 235, 0.3);
    }
    .section { margin-top: 28px; }
    .section-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px; }
    .card {
      background: rgba(15, 23, 42, 0.88);
      border: 1px solid var(--border);
      border-radius: 26px;
      padding: 28px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.2);
    }
    .metric { grid-column: span 3; min-height: 170px; }
    .metric .value { font-size: 62px; font-weight: 700; line-height: 1; margin: 22px 0 8px; }
    .metric .panel-label { color: #6ea6ff; font-size: 12px; }
    .metric p { margin: 0; color: var(--muted); font-size: 15px; line-height: 1.5; }
    .highlight { grid-column: 1 / -1; border-color: rgba(251, 191, 36, 0.2); }
    .highlight .kicker { color: var(--amber); font-size: 13px; }
    .highlight h2 { margin: 12px 0 10px; font-size: 26px; line-height: 1.35; }
    .highlight p { margin: 0; color: var(--muted); font-size: 16px; }
    .split-left { grid-column: span 7; }
    .split-right { grid-column: span 5; }
    .section-title { margin: 10px 0 10px; font-size: 24px; }
    .section-copy { margin: 0 0 22px; color: var(--muted); font-size: 17px; }
    .topology-grid { display: grid; gap: 16px; }
    .topology-node {
      border: 1px solid var(--border);
      border-radius: 22px;
      padding: 22px;
      background: rgba(17, 27, 50, 0.65);
    }
    .node-top { display: flex; justify-content: space-between; gap: 18px; align-items: start; }
    .topology-node h3, .lane-item h3, .artifact h3 { margin: 10px 0 10px; font-size: 26px; }
    .topology-node p, .lane-item p, .artifact p { margin: 0; color: var(--muted); font-size: 15px; line-height: 1.6; }
    .status-pill {
      padding: 8px 12px;
      border-radius: 999px;
      font-size: 12px;
      border: 1px solid var(--border);
    }
    .healthy { color: #34d399; border-color: rgba(16,185,129,0.32); background: rgba(16,185,129,0.12); }
    .watch { color: #fbbf24; border-color: rgba(251,191,36,0.26); background: rgba(251,191,36,0.1); }
    .critical { color: #fb7185; border-color: rgba(251,113,133,0.24); background: rgba(251,113,133,0.1); }
    .mini { font-size: 12px; color: #78a8ff; margin-bottom: 12px; }
    .lane-list, .artifact-list, .verify-list { display: grid; gap: 16px; }
    .lane-item, .artifact {
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 22px;
      background: rgba(17, 27, 50, 0.62);
    }
    .artifact pre {
      margin: 16px 0 0;
      padding: 18px;
      border-radius: 16px;
      overflow: auto;
      background: #0a1327;
      color: #c4d6f5;
      border: 1px solid rgba(148, 163, 184, 0.12);
      font-family: var(--mono);
      font-size: 14px;
      line-height: 1.6;
    }
    .verify-list li {
      list-style: none;
      padding: 16px 18px;
      border-radius: 16px;
      background: rgba(17, 27, 50, 0.62);
      border: 1px solid var(--border);
      color: var(--muted);
    }
    .docs-note {
      display: grid;
      grid-template-columns: 1.25fr 0.85fr;
      gap: 24px;
    }
    .spec-box {
      border: 1px solid var(--border);
      border-radius: 22px;
      padding: 24px;
      background: rgba(17, 27, 50, 0.6);
    }
    .spec-box strong { display: block; margin-bottom: 12px; font-size: 16px; }
    @media (max-width: 1100px) {
      .hero, .docs-note { grid-template-columns: 1fr; }
      .metric { grid-column: span 6; }
      .split-left, .split-right { grid-column: 1 / -1; }
    }
    @media (max-width: 720px) {
      .wrap { width: min(100% - 24px, 100%); }
      .hero, .card { padding: 22px; }
      .metric { grid-column: 1 / -1; }
      .tabs { gap: 12px; }
      .tab { width: 100%; justify-content: center; }
    }
  </style>
</head>
<body>
  <div class="wrap">
    <section class="hero">
      <div>
        <div class="eyebrow"><strong>Kinetic Gain</strong><span>• Revenue Infrastructure Control Plane</span></div>
        <h1>IaC SaaS <span>Marketing</span></h1>
        <p class="lede">Scalable marketing infrastructure modeling environment topology, deployment promotion, analytics-safe routing, and operator-ready edge posture for revenue systems that cannot afford dirty traffic or fragile releases.</p>
      </div>
      <aside class="posture">
        <div class="panel-label">Environment Posture</div>
        <div class="status-line">● Live Delivery Console</div>
      </aside>
    </section>

    <nav class="tabs">
      ${nav
        .map(
          (item) =>
            `<a class="tab ${item.href === activeRoute ? "active" : ""}" href="${item.href}">${item.label}</a>`
        )
        .join("")}
    </nav>

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

export function renderOverview() {
  const dashboard = summary();
  const samples = artifacts().slice(0, 2);

  return pageShell(
    "IaC SaaS Marketing",
    "/",
    `<section class="section">
      <div class="section-grid">
        <article class="card metric"><div class="panel-label">Active Layers</div><div class="value">${dashboard.environmentCount}</div><p>Environment layers modeled from edge request through warehouse and observability lanes.</p></article>
        <article class="card metric"><div class="panel-label">Security & Health</div><div class="value">${dashboard.healthy}<span style="font-size:28px;color:#fbbf24;"> / ${dashboard.attention}</span></div><p>Healthy vs attention-required infrastructure domains in the current operating surface.</p></article>
        <article class="card metric"><div class="panel-label">Flow Performance</div><div class="value">${dashboard.avgPromotion}<span style="font-size:28px;">m</span></div><p>Average promotion time across branch, preview, staging, and production release lanes.</p></article>
        <article class="card metric"><div class="panel-label">Starter Files</div><div class="value">${dashboard.artifactCount}</div><p>Infrastructure artifacts framing CDN, application, analytics, and secrets posture.</p></article>

        <article class="card highlight">
          <div class="kicker">Critical delivery recommendation</div>
          <h2>"${dashboard.recommendation}"</h2>
          <p>Best use case: enterprise SaaS marketing sites where web performance, campaign routing, analytics trust, and deployment confidence all need to move together.</p>
        </article>

        <article class="card split-left">
          <div class="panel-label">Environment Taxonomy</div>
          <h2 class="section-title">Revenue-safe infrastructure layers.</h2>
          <p class="section-copy">This control plane treats growth delivery as a stack: edge defenses, runtime safety, attribution integrity, secrets discipline, and route-level observability.</p>
          <div class="topology-grid">
            ${environmentTopology()
              .map(
                (node) => `<div class="topology-node">
                    <div class="node-top">
                      <div>
                        <div class="mini">${node.id}</div>
                        <h3>${node.layer}</h3>
                      </div>
                      <span class="status-pill ${statusClass(node.health)}">${node.health}</span>
                    </div>
                    <p>${node.responsibility}</p>
                  </div>`
              )
              .join("")}
          </div>
        </article>

        <article class="card split-right">
          <div class="panel-label">Artifact Explorer</div>
          <h2 class="section-title">IaC building blocks.</h2>
          <p class="section-copy">Representative infrastructure files that make the environment legible to web, growth, analytics, and platform owners.</p>
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
      </div>
    </section>`
  );
}

export function renderEnvironmentTopology() {
  return pageShell(
    "IaC SaaS Marketing · Environment Topology",
    "/environment-topology",
    `<section class="section">
      <div class="section-grid">
        <article class="card split-left">
          <div class="panel-label">System Taxonomy</div>
          <h2 class="section-title">Environment topology from edge to warehouse.</h2>
          <p class="section-copy">A SaaS marketing property only scales cleanly when request routing, app delivery, conversion events, secrets, and observability are all governed together.</p>
          <div class="topology-grid">
            ${environmentTopology()
              .map(
                (node) => `<div class="topology-node">
                    <div class="node-top">
                      <div>
                        <div class="mini">${node.owner}</div>
                        <h3>${node.layer}</h3>
                      </div>
                      <span class="status-pill ${statusClass(node.health)}">${node.health}</span>
                    </div>
                    <p><strong style="display:block;color:#d9e6fb;margin-bottom:10px;">Primary responsibility</strong>${node.responsibility}</p>
                    <p style="margin-top:16px;"><strong style="display:block;color:#d9e6fb;margin-bottom:10px;">Risk statement</strong>${node.risk}</p>
                  </div>`
              )
              .join("")}
          </div>
        </article>

        <article class="card split-right">
          <div class="panel-label">Topology Reading Guide</div>
          <h2 class="section-title">What operators should watch.</h2>
          <p class="section-copy">Traffic integrity problems usually show up first at the edge or in analytics quality, while release failures surface at preview, staging, or secrets boundaries.</p>
          <ul class="verify-list">
            <li><strong style="color:#e5eefb;">Edge CDN</strong><br/>Keep redirects, WAF rules, and cache keys aligned so campaigns do not corrupt attribution or lose index posture.</li>
            <li><strong style="color:#e5eefb;">Marketing Runtime</strong><br/>Protect preview deploys and signed routes so stakeholders can review campaigns without exposing unstable builds publicly.</li>
            <li><strong style="color:#e5eefb;">Attribution Pipeline</strong><br/>Treat event drift as an infrastructure concern, not just an analytics concern, because revenue dashboards collapse when contracts degrade.</li>
            <li><strong style="color:#e5eefb;">Observability</strong><br/>Couple web vitals, route regressions, and bot pressure so operators can decide whether a launch is fast, clean, and trustworthy.</li>
          </ul>
        </article>
      </div>
    </section>`
  );
}

export function renderDeployLane() {
  return pageShell(
    "IaC SaaS Marketing · Deploy Lane",
    "/deploy-lane",
    `<section class="section">
      <div class="section-grid">
        <article class="card split-left">
          <div class="panel-label">Promotion Sequence</div>
          <h2 class="section-title">Branch-to-production deploy lane.</h2>
          <p class="section-copy">Each stage exists to prevent traffic or attribution contamination from reaching production under the disguise of a successful deployment.</p>
          <div class="lane-list">
            ${deployLane()
              .map(
                (stage) => `<div class="lane-item">
                    <div class="node-top">
                      <div>
                        <div class="mini">${stage.latencyMinutes} minutes avg</div>
                        <h3>${stage.stage}</h3>
                      </div>
                      <span class="status-pill ${statusClass(stage.status)}">${stage.status}</span>
                    </div>
                    <p><strong style="display:block;color:#d9e6fb;margin-bottom:10px;">Control surface</strong>${stage.control}</p>
                    <p style="margin-top:16px;"><strong style="display:block;color:#d9e6fb;margin-bottom:10px;">Exit criteria</strong>${stage.exitCriteria}</p>
                  </div>`
              )
              .join("")}
          </div>
        </article>

        <article class="card split-right">
          <div class="panel-label">Infrastructure Artifacts</div>
          <h2 class="section-title">Promotion-aware IaC specimens.</h2>
          <p class="section-copy">These artifacts show where environment behavior is defined, enforced, and observed before a marketing release hits revenue traffic.</p>
          <div class="artifact-list">
            ${artifacts()
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
      </div>
    </section>`
  );
}

export function renderVerification() {
  return pageShell(
    "IaC SaaS Marketing · Verification",
    "/verification",
    `<section class="section">
      <div class="section-grid">
        <article class="card split-left">
          <div class="panel-label">Operator Verification</div>
          <h2 class="section-title">What this repo proves.</h2>
          <p class="section-copy">This is not generic Terraform theater. It is a revenue-infrastructure framing exercise showing how web platform, analytics, and traffic safety depend on the same deployment system.</p>
          <ul class="verify-list">
            ${verification().map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </article>
        <article class="card split-right">
          <div class="panel-label">Readiness Snapshot</div>
          <h2 class="section-title">Release gate summary.</h2>
          <div class="artifact-list">
            <div class="artifact"><div class="mini">Build</div><h3>TypeScript app</h3><p>Express-backed control plane with route and API surfaces for topology, promotion, docs, and verification.</p></div>
            <div class="artifact"><div class="mini">Artifacts</div><h3>Terraform specimens</h3><p>Environment topology files included to make edge, runtime, analytics, and secrets posture concrete.</p></div>
            <div class="artifact"><div class="mini">Proof</div><h3>Browser-rendered screenshots</h3><p>README assets come from the shipped app surface, not synthetic SVG placeholders.</p></div>
          </div>
        </article>
      </div>
    </section>`
  );
}

export function renderDocs() {
  return pageShell(
    "IaC SaaS Marketing · Docs",
    "/docs",
    `<section class="section">
      <div class="docs-note">
        <article class="card">
          <div class="panel-label">System Artifact / Principal Technical Spec</div>
          <h2 class="section-title">SaaS marketing infrastructure as a delivery system.</h2>
          <p class="section-copy">How to keep campaign routing, deployment safety, and digital intelligence aligned without treating revenue traffic like an afterthought.</p>
          <div class="artifact-list">
            ${artifacts()
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
        <aside class="card">
          <div class="panel-label">Spec Classification</div>
          <div class="spec-box">
            <strong>Target platform</strong>
            <p>Node.js web runtime + Terraform-managed delivery plane.</p>
          </div>
          <div class="spec-box" style="margin-top:18px;">
            <strong>Architecture role</strong>
            <p>Principal platform engineer operating at the boundary of growth, infrastructure, and analytics quality.</p>
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
      </div>
    </section>`
  );
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
