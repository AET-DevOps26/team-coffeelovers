{{/*
Expand the name of the chart.
*/}}
{{- define "coffeelovers.name" -}}
{{- .Chart.Name }}
{{- end }}

{{/*
Common labels applied to all resources.
*/}}
{{- define "coffeelovers.labels" -}}
helm.sh/chart: {{ .Chart.Name }}-{{ .Chart.Version }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Name of the Kubernetes Secret holding the postgres password.
*/}}
{{- define "coffeelovers.postgresSecretName" -}}
postgres-credentials
{{- end }}

{{/*
Full image reference for a service.
Usage: {{ include "coffeelovers.image" (dict "registry" .Values.global.image.registry "repository" .Values.services.client.image.repository "tag" .Values.global.image.tag) }}
*/}}
{{- define "coffeelovers.image" -}}
{{ .registry }}/{{ .repository }}:{{ .tag }}
{{- end }}
