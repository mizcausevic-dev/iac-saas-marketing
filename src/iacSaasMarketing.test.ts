import { describe, expect, it } from "vitest";

import { artifacts, deployLane, environmentTopology, payload, summary } from "./services/iacMarketingService";

describe("iac-saas-marketing", () => {
  it("summary exposes environment posture", () => {
    const result = summary();

    expect(result.environmentCount).toBeGreaterThan(0);
    expect(result.artifactCount).toBeGreaterThan(0);
    expect(result.recommendation).toContain("attribution");
  });

  it("topology and deploy lane stay concrete", () => {
    expect(environmentTopology().some((node) => node.layer.includes("Edge"))).toBe(true);
    expect(deployLane().some((stage) => stage.stage.toLowerCase().includes("preview"))).toBe(true);
    expect(artifacts().some((artifact) => artifact.path.includes("terraform"))).toBe(true);
  });

  it("payload bundles the full operating surface", () => {
    const result = payload();

    expect(result.dashboard.environmentCount).toBe(result.topology.length);
    expect(result.deployLane.length).toBeGreaterThan(0);
    expect(result.artifacts.length).toBeGreaterThan(0);
    expect(result.verification.length).toBe(3);
  });
});
