import { deployStages, environmentNodes, fileSamples, infrastructureArtifacts } from "../data/sampleInfrastructure";

export function summary() {
  const healthy = environmentNodes.filter((node) => node.health === "healthy").length;
  const attention = environmentNodes.filter((node) => node.health !== "healthy").length;
  const avgPromotion = Math.round(deployStages.reduce((total, stage) => total + stage.latencyMinutes, 0) / deployStages.length);

  return {
    environmentCount: environmentNodes.length,
    healthy,
    attention,
    avgPromotion,
    artifactCount: infrastructureArtifacts.length,
    recommendation:
      "Keep attribution and preview integrity as first-class infrastructure concerns, because marketing environments fail hardest when the release path looks healthy but the signal path is silently degrading."
  };
}

export function environmentTopology() {
  return environmentNodes;
}

export function deployLane() {
  return deployStages;
}

export function artifacts() {
  return infrastructureArtifacts.map((artifact) => ({
    ...artifact,
    sample: fileSamples[artifact.path]
  }));
}

export function verification() {
  return [
    "The stack models edge, runtime, analytics, secrets, and observability as one operating surface instead of separate ownership silos.",
    "Preview and production are treated as different trust lanes, which is critical for real marketing release quality.",
    "The deploy lane ties infrastructure controls directly to traffic integrity and attribution confidence."
  ];
}

export function payload() {
  return {
    dashboard: summary(),
    topology: environmentTopology(),
    deployLane: deployLane(),
    artifacts: artifacts(),
    verification: verification()
  };
}
