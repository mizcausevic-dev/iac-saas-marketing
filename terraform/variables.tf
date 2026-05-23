variable "environment" {
  type        = string
  description = "Deployment lane: preview, staging, or production."
}

variable "zone_id" {
  type        = string
  description = "Cloudflare zone identifier for the marketing property."
}

variable "marketing_domains" {
  type        = list(string)
  description = "Primary campaign and property domains served by the stack."
}

variable "preview_hostnames" {
  type        = list(string)
  description = "Preview hostnames allowed to bypass production cache behavior."
}

variable "deploy_branch" {
  type        = string
  description = "Branch currently being promoted through the deploy lane."
}
