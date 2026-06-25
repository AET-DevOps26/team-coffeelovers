#!/usr/bin/env bash
# Manual Helm deployment helper for the AI Travel Planner (team-coffeelovers).
#
# NOTE: this is a manual/verification tool only. The real deployment process
# is: PR into develop -> PR into main -> CD pipeline (.github/workflows/cd.yml)
# deploys automatically on push to main. Use this script for local testing,
# manual redeploys, or tutor verification — not as a replacement for that flow.
#
# Usage:
#   POSTGRES_PASSWORD=... JWT_SECRET=... OPENAI_API_KEY=... ./deploy.sh
#
# Required environment variables:
#   POSTGRES_PASSWORD
#   JWT_SECRET
#   OPENAI_API_KEY

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CHART_PATH="$SCRIPT_DIR/coffeelovers"
NAMESPACE="team-coffeelovers-devops26"
RELEASE_NAME="coffeelovers"

missing=()
[ -z "${POSTGRES_PASSWORD:-}" ] && missing+=("POSTGRES_PASSWORD")
[ -z "${JWT_SECRET:-}" ] && missing+=("JWT_SECRET")
[ -z "${OPENAI_API_KEY:-}" ] && missing+=("OPENAI_API_KEY")

if [ ${#missing[@]} -gt 0 ]; then
  echo "Missing required environment variable(s): ${missing[*]}"
  echo
  echo "Usage:"
  echo "  POSTGRES_PASSWORD=... JWT_SECRET=... OPENAI_API_KEY=... ./deploy.sh"
  exit 1
fi

echo "Deploying $RELEASE_NAME to namespace $NAMESPACE ..."

helm upgrade --install "$RELEASE_NAME" "$CHART_PATH" \
  --namespace "$NAMESPACE" \
  --create-namespace \
  --set-string secrets.postgresPassword="$POSTGRES_PASSWORD" \
  --set-string secrets.jwtSecret="$JWT_SECRET" \
  --set-string secrets.openaiApiKey="$OPENAI_API_KEY" \
  --wait --timeout 5m

echo
echo "Deployment complete. Check status with:"
echo "  kubectl get pods -n $NAMESPACE"
