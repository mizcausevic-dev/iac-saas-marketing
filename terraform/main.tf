terraform {
  required_version = ">= 1.7.0"
}

locals {
  marketing_stack = {
    edge        = "cloudflare"
    runtime     = "vercel"
    analytics   = "warehouse + product analytics"
    observabity = "web vitals + route monitoring"
  }
}
