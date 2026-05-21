#!/usr/bin/env bash
set -euo pipefail

: "${ENVIRONMENT:?ENVIRONMENT is required}"
: "${SERVICES:?SERVICES is required}"
: "${IMAGE_TAG:?IMAGE_TAG is required}"
: "${GIT_AUTH_URL:?GIT_AUTH_URL is required}"
: "${MANIFEST_REPO_BRANCH:?MANIFEST_REPO_BRANCH is required}"
: "${COMMIT_MESSAGE:?COMMIT_MESSAGE is required}"
: "${GIT_USER_NAME:?GIT_USER_NAME is required}"
: "${GIT_USER_EMAIL:?GIT_USER_EMAIL is required}"
: "${GITEA_REGISTRY:?GITEA_REGISTRY is required}"
: "${GITEA_OWNER:?GITEA_OWNER is required}"

workdir=${WORKDIR:-manifests-workspace}

rm -rf "${workdir}"

git clone "${GIT_AUTH_URL}" "${workdir}"
cd "${workdir}"

git checkout "${MANIFEST_REPO_BRANCH}"

IFS=',' read -r -a service_list <<< "${SERVICES}"

for service in "${service_list[@]}"; do
  service="$(echo "${service}" | xargs)"
  if [[ -z "${service}" ]]; then
    continue
  fi

  case "${service}" in
    frontend)
      overlay_path="apps/overlays/${ENVIRONMENT}/frontend/kustomization.yaml"
      ;;
    auth)
      overlay_path="apps/overlays/${ENVIRONMENT}/auth-service/kustomization.yaml"
      ;;
    backend)
      overlay_path="apps/overlays/${ENVIRONMENT}/backend-service/kustomization.yaml"
      ;;
    admin)
      overlay_path="apps/overlays/${ENVIRONMENT}/admin-service/kustomization.yaml"
      ;;
    *)
      echo "No manifest mapping for service: ${service}"
      continue
      ;;
  esac

  if [[ ! -f "${overlay_path}" ]]; then
    echo "Missing manifest file: ${overlay_path}" >&2
    continue
  fi

  image_name="${GITEA_REGISTRY}/${GITEA_OWNER}/healthcare-${service}"
  perl -pi -e "s|^(\\s*newName:\\s*).*|\$1${image_name}|m" "${overlay_path}"
  perl -pi -e "s|^(\\s*newTag:\\s*).*|\$1\"${IMAGE_TAG}\"|m" "${overlay_path}"
done

git add .

if git diff --cached --quiet; then
  echo "No manifest updates to commit."
  exit 0
fi

git -c user.name="${GIT_USER_NAME}" -c user.email="${GIT_USER_EMAIL}" \
  commit -m "${COMMIT_MESSAGE}"

git -c http.sslVerify=false push origin "${MANIFEST_REPO_BRANCH}"
