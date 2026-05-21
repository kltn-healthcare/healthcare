#!/usr/bin/env bash
set -euo pipefail

: "${GITEA_TOKEN:?GITEA_TOKEN is required}"
: "${GITEA_API_URL:?GITEA_API_URL is required}"
: "${GITEA_OWNER:?GITEA_OWNER is required}"
: "${GITEA_REPO:?GITEA_REPO is required}"
: "${RELEASE_TAG:?RELEASE_TAG is required}"

release_name=${RELEASE_NAME:-"Release ${RELEASE_TAG}"}
release_body=${RELEASE_BODY:-"Production release ${RELEASE_TAG} automatically promoted by Jenkins."}

target_commitish=${TARGET_COMMITISH:-""}

payload=$(python - <<'PY'
import json
import os

data = {
    "tag_name": os.environ["RELEASE_TAG"],
    "name": os.environ.get("RELEASE_NAME", f"Release {os.environ['RELEASE_TAG']}") ,
    "body": os.environ.get(
        "RELEASE_BODY",
        f"Production release {os.environ['RELEASE_TAG']} automatically promoted by Jenkins.",
    ),
}

commitish = os.environ.get("TARGET_COMMITISH", "").strip()
if commitish:
    data["target_commitish"] = commitish

print(json.dumps(data))
PY
)

curl --silent --show-error --fail-with-body \
  -X POST "${GITEA_API_URL}/repos/${GITEA_OWNER}/${GITEA_REPO}/releases" \
  -H "accept: application/json" \
  -H "Authorization: token ${GITEA_TOKEN}" \
  -H "Content-Type: application/json" \
  --data "${payload}"

printf '%s\n' "Gitea release created for ${RELEASE_TAG}"
