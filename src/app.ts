import express from "express";

import { artifacts, deployLane, environmentTopology, payload, summary, verification } from "./services/iacMarketingService";
import {
  renderDeployLane,
  renderDocs,
  renderEnvironmentTopology,
  renderOverview,
  renderVerification
} from "./services/render";

const app = express();
const port = Number(process.env.PORT ?? 5396);

app.get("/", (_req, res) => res.type("html").send(renderOverview()));
app.get("/environment-topology", (_req, res) => res.type("html").send(renderEnvironmentTopology()));
app.get("/deploy-lane", (_req, res) => res.type("html").send(renderDeployLane()));
app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
app.get("/api/environment-topology", (_req, res) => res.json(environmentTopology()));
app.get("/api/deploy-lane", (_req, res) => res.json(deployLane()));
app.get("/api/infrastructure-artifacts", (_req, res) => res.json(artifacts()));
app.get("/api/verification", (_req, res) => res.json(verification()));
app.get("/api/sample", (_req, res) => res.json(payload()));

if (require.main === module) {
  app.listen(port, "127.0.0.1", () => {
    console.log(`IaC SaaS Marketing listening on http://127.0.0.1:${port}`);
  });
}

export default app;
