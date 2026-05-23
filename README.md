# iac-saas-marketing

Infrastructure-as-code control plane for scalable SaaS marketing environments: environment topology, edge posture, deployment promotion, and delivery-readiness modeling.

## What it shows

- environment topology across edge, app, data, and observability layers
- deploy-lane posture for branch-to-production promotion
- modeled Terraform artifacts for CDN, app platform, analytics, and secrets
- operator verification for growth-safe releases

## Routes

- `/`
- `/environment-topology`
- `/deploy-lane`
- `/verification`
- `/docs`

## API

- `/api/dashboard/summary`
- `/api/environment-topology`
- `/api/deploy-lane`
- `/api/infrastructure-artifacts`
- `/api/verification`
- `/api/sample`

## Local development

```powershell
cd iac-saas-marketing
npm install
npm run dev
```

Then open:

- `http://127.0.0.1:5396/`
- `http://127.0.0.1:5396/environment-topology`
- `http://127.0.0.1:5396/deploy-lane`
- `http://127.0.0.1:5396/verification`
- `http://127.0.0.1:5396/docs`

## Validation

```powershell
npm run verify
npm run render:assets
```

## Documentation

- [docs/architecture.md](./docs/architecture.md)
- [docs/ORIGIN.md](./docs/ORIGIN.md)
