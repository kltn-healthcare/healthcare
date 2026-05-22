#!/usr/bin/env bash
set -euo pipefail

# Các biến này được Jenkins tự động truyền vào qua withEnv và global environment
# GITEA_REGISTRY="gitea.healthcare.com"
# GITEA_OWNER="kltn"
# SERVICE="frontend" (Ví dụ)
# COMMIT_TAG="8b4e1e" (Mã commit ngắn)
# RELEASE_TAG="v1.0.0"

IMAGE_PATH="${GITEA_REGISTRY}/${GITEA_OWNER}/healthcare-${SERVICE}"

echo "=================================================="
echo "📦 Đang xử lý Docker Image cho: ${SERVICE}"
echo "=================================================="

# 1. Kéo image cũ (phiên bản đang chạy ở Staging) về
echo "⬇️ Pulling: ${IMAGE_PATH}:${COMMIT_TAG}"
docker pull "${IMAGE_PATH}:${COMMIT_TAG}"

# 2. Gắn nhãn mới (Retag) cho image đó
echo "🏷️ Retagging: ${COMMIT_TAG} ➡️ ${RELEASE_TAG}"
docker tag "${IMAGE_PATH}:${COMMIT_TAG}" "${IMAGE_PATH}:${RELEASE_TAG}"

# 3. Đẩy image với nhãn mới lên Registry
echo "⬆️ Pushing: ${IMAGE_PATH}:${RELEASE_TAG}"
docker push "${IMAGE_PATH}:${RELEASE_TAG}"

echo "✅ Hoàn tất Retag cho ${SERVICE}!"