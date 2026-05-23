resource "cloudflare_ruleset" "marketing_redirects" {
  zone_id = var.zone_id
  name    = "marketing-redirects"
  kind    = "zone"
  phase   = "http_request_dynamic_redirect"
}

resource "cloudflare_ruleset" "traffic_integrity" {
  zone_id = var.zone_id
  name    = "traffic-integrity"
  kind    = "zone"
  phase   = "http_request_firewall_custom"
}
