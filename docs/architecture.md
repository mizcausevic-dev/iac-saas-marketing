# Architecture

`iac-saas-marketing` models the environment layer that sits behind a revenue-facing SaaS marketing site.

## Core layers

1. `Edge CDN`
   - WAF posture
   - caching
   - redirects
   - geo routing
2. `Application Runtime`
   - frontend host
   - server routes
   - preview-safe deploy flow
3. `Data & Analytics`
   - warehouse sync
   - attribution inputs
   - event contracts
4. `Observability`
   - web vitals
   - bot pressure
   - deployment regressions

## Promotion model

- feature branch
- preview
- staging
- production

The goal is not to show every cloud primitive. The goal is to make marketing infrastructure legible to operators who own both traffic quality and release confidence.
