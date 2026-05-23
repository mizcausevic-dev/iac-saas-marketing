resource "datadog_monitor" "seo_regression" {
  name  = "seo-vitals-regression"
  type  = "query alert"
  query = "avg(last_15m):anomalies(avg:web.vitals.lcp{env:${var.environment}}, 'basic', 2) >= 1"
}

resource "datadog_monitor" "event_drift" {
  name  = "marketing-event-drift"
  type  = "query alert"
  query = "avg(last_15m):anomalies(avg:events.contract_mismatch{env:${var.environment}}, 'basic', 2) >= 1"
}
