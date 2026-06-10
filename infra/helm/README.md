# Kubernetes Deployment — AI Travel Planner

Deploys the full project to the AET cluster using Helm.

## Prerequisites

- `kubectl` configured with access to the AET cluster (`~/.kube/config`)
- `helm` v3 installed
- The repository cloned locally

## Deploy (one command)

From the **repository root**:

```bash
helm upgrade --install coffeelovers ./infra/helm/coffeelovers \
  --namespace team-coffeelovers-devops26 \
  --create-namespace \
  --set-string secrets.postgresPassword="<postgres-password>" \
  --set-string secrets.jwtSecret="<jwt-secret>" \
  --set-string secrets.openaiApiKey="<openai-api-key>" \
  --wait --timeout 5m
```

This single command deploys the entire stack: PostgreSQL, auth-service, genai-service, React client, and Ingress.

## Verify

```bash
kubectl get pods -n team-coffeelovers-devops26
```

All pods should show `Running`. The app is then available at:

```
https://team-coffeelovers-devops26.stud.k8s.aet.cit.tum.de
```

## Uninstall

```bash
helm uninstall coffeelovers --namespace team-coffeelovers-devops26
```

## Notes

- Secrets are never committed to the repository — they must always be passed at deploy time via `--set-string`.
- The CD pipeline (`/.github/workflows/cd.yml`) runs this command automatically on every push to `main`, using secrets stored in GitHub Actions.
- Image tags are pinned to the Git commit SHA in CI/CD. For a manual deploy, `latest` is used by default (set in `values.yaml`).
