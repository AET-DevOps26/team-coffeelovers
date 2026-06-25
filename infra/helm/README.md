# Kubernetes Deployment — AI Travel Planner

Deploys the full project to the AET cluster using Helm.

## Prerequisites

- `kubectl` configured with access to the AET cluster (`~/.kube/config`)
- `helm` v3 installed
- The repository cloned locally

## Verify the deployment (one command, no setup needed)

The app is **already continuously deployed** by the CD pipeline (`.github/workflows/cd.yml`) on every push to `main` — there is a live `coffeelovers` Helm release on the cluster right now, with its secrets already stored there from that pipeline.

To re-run the deployment yourself (e.g. to confirm it's reproducible) without needing any passwords, from the **repository root**:

```bash
helm upgrade coffeelovers ./infra/helm/coffeelovers \
  --namespace team-coffeelovers-devops26 \
  --reuse-values
```

`--reuse-values` tells Helm to reuse the secrets/config already stored on the cluster from the last deploy — no `--set-string` flags, no env vars, nothing to type in. This is the command to use for grading/verification.

## First-time install (new cluster only)

If you're setting this up on a **brand new** cluster for the first time (no existing release), the secrets need to be supplied once. From `infra/helm/`:

```bash
POSTGRES_PASSWORD=<postgres-password> \
JWT_SECRET=<jwt-secret> \
OPENAI_API_KEY=<openai-api-key> \
./deploy.sh
```

This deploys the entire stack: PostgreSQL, auth-service, trip-service, genai-service, React client, and Ingress.

### Equivalent manual command

If you'd rather run Helm directly instead of the script, from the **repository root**:

```bash
helm upgrade --install coffeelovers ./infra/helm/coffeelovers \
  --namespace team-coffeelovers-devops26 \
  --create-namespace \
  --set-string secrets.postgresPassword="<postgres-password>" \
  --set-string secrets.jwtSecret="<jwt-secret>" \
  --set-string secrets.openaiApiKey="<openai-api-key>" \
  --wait --timeout 5m
```

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

- Secrets are never committed to the repository. They're supplied once (via GitHub Actions secrets, automatically) and persist on the cluster from then on — that's what makes the `--reuse-values` command above possible.
- **`deploy.sh` and the manual first-time-install command are for setting up a new cluster only, or local manual testing.** The actual project workflow is: feature branch → PR into `develop` → PR into `main`. The CD pipeline deploys automatically on every push to `main` — that's the deployment path used day-to-day.
- Image tags are pinned to the Git commit SHA in CI/CD. For a manual deploy, `latest` is used by default (set in `values.yaml`).
