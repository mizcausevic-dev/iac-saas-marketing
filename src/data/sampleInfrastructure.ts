export type Health = "healthy" | "watch" | "critical";

export const environmentNodes = [
  {
    id: "env-01",
    layer: "Edge CDN",
    health: "healthy" as Health,
    owner: "web-platform",
    responsibility: "Own request filtering, cache rules, geo routing, and migration-safe redirect behavior.",
    risk: "WAF posture is green, but campaign cache segmentation should stay under active review during launch weeks."
  },
  {
    id: "env-02",
    layer: "Marketing Runtime",
    health: "healthy" as Health,
    owner: "growth-engineering",
    responsibility: "Serve the marketing application, preview builds, and route-level release controls.",
    risk: "Build promotion is stable as long as environment secrets and preview domains remain isolated."
  },
  {
    id: "env-03",
    layer: "Attribution Pipeline",
    health: "watch" as Health,
    owner: "revops-analytics",
    responsibility: "Move conversion events and lifecycle data into the warehouse for attribution and reporting.",
    risk: "Warehouse freshness is acceptable, but session stitching and event contract drift can quietly erode signal quality."
  },
  {
    id: "env-04",
    layer: "Secrets & Config",
    health: "healthy" as Health,
    owner: "platform-security",
    responsibility: "Manage environment variables, signed preview tokens, and provider credentials.",
    risk: "Rotation posture is good, but campaign-specific webhook credentials should be kept on shorter windows."
  },
  {
    id: "env-05",
    layer: "Observability",
    health: "watch" as Health,
    owner: "sre-growth",
    responsibility: "Track web vitals, bot pressure, deployment regressions, and route-level failure signals.",
    risk: "Alert coverage is broad, though route-specific SEO regressions still need tighter Slack routing."
  }
];

export const deployStages = [
  {
    stage: "Feature Branch",
    status: "healthy" as Health,
    control: "Terraform fmt/check, environment lint, and template validation.",
    latencyMinutes: 7,
    exitCriteria: "No secret drift, no invalid redirects, no broken event contracts."
  },
  {
    stage: "Preview",
    status: "healthy" as Health,
    control: "Preview URL with signed token bridge and UTM-safe test harness.",
    latencyMinutes: 14,
    exitCriteria: "Design review, form validation, and preview analytics sanity complete."
  },
  {
    stage: "Staging",
    status: "watch" as Health,
    control: "Synthetic checks, Lighthouse budget checks, and campaign redirect sampling.",
    latencyMinutes: 18,
    exitCriteria: "Web vitals green, event payloads match spec, origin rules stable."
  },
  {
    stage: "Production",
    status: "healthy" as Health,
    control: "Incremental rollout, cache purge controls, and operator rollback lane.",
    latencyMinutes: 11,
    exitCriteria: "Traffic integrity gates stay clean and attribution deltas remain inside guardrails."
  }
];

export const infrastructureArtifacts = [
  {
    path: "terraform/main.tf",
    category: "Root module",
    summary: "Composition root that wires CDN, app runtime, analytics, and secrets modules together."
  },
  {
    path: "terraform/variables.tf",
    category: "Input contract",
    summary: "Typed variables for environments, domains, analytics IDs, and promotion posture."
  },
  {
    path: "terraform/edge.tf",
    category: "Edge posture",
    summary: "Rules for redirects, WAF policy, cache keys, and campaign-safe edge rewrites."
  },
  {
    path: "terraform/analytics.tf",
    category: "Digital intelligence",
    summary: "Monitoring and event-routing primitives supporting attribution and route-regression visibility."
  }
];

export const fileSamples: Record<string, string> = {
  "terraform/main.tf": `module "edge" {\n  source            = "./modules/edge"\n  environment       = var.environment\n  apex_domain       = var.apex_domain\n  marketing_domains = var.marketing_domains\n}\n\nmodule "app_runtime" {\n  source            = "./modules/app_runtime"\n  environment       = var.environment\n  preview_hostnames = var.preview_hostnames\n  deploy_branch     = var.deploy_branch\n}\n`,
  "terraform/variables.tf": `variable "environment" {\n  type        = string\n  description = "Deployment lane: preview, staging, or production."\n}\n\nvariable "marketing_domains" {\n  type        = list(string)\n  description = "Primary campaign and property domains served by the stack."\n}\n`,
  "terraform/edge.tf": `resource "cloudflare_ruleset" "marketing_redirects" {\n  zone_id = var.zone_id\n  name    = "marketing-redirects"\n  kind    = "zone"\n  phase   = "http_request_dynamic_redirect"\n}\n`,
  "terraform/analytics.tf": `resource "datadog_monitor" "seo_regression" {\n  name  = "seo-vitals-regression"\n  type  = "query alert"\n  query = "avg(last_15m):anomalies(avg:web.vitals.lcp{env:\${var.environment}}, 'basic', 2) >= 1"\n}\n`
};
