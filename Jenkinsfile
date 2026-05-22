@Library('healthcare-shared-lib@main') _

pipeline {
  agent any

  options {
    timestamps()
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '10'))
  }

  environment {
    GITEA_REGISTRY = "gitea.healthcare.com"
    GITEA_OWNER = "kltn"
    GITEA_CREDS_ID = "gitea-token-admin"

    SONAR_SERVER = "sonar-server"
    SONAR_SCANNER = "sonar-scanner"

    GIT_USER_NAME = "thanhdc"
    GIT_USER_EMAIL = "chithanh040804@gmail.com"
    MANIFEST_REPO_URL = "https://gitea.healthcare.com/KLTN/healthcare-manifests.git"
    MANIFEST_REPO_BRANCH = "main"

    GITEA_API_URL = "https://gitea.healthcare.com/api/v1"
    GITEA_REPO = "healthcare"
  }

  stages {
    stage('System Information') {
      steps {
        script {
          printSystemInfo()
        }
      }
    }

    stage('Detect Changes') {
      steps {
        checkout scm
        script {
          // 1. Lấy mã short SHA của commit hiện tại làm mã định danh Image Tag duy nhất (Immutable Tag)
          env.SHORT_SHA = sh(script: 'git rev-parse --short=8 HEAD', returnStdout: true).trim()
          env.DEPLOY_TAG = env.SHORT_SHA
          
          echo "Branch: ${env.BRANCH_NAME ?: 'N/A'} | Commit Tag: ${env.DEPLOY_TAG}"

          // 2. Xác định Base Commit (Commit thành công trước đó) để so sánh git diff
          def baseCommit = env.GIT_PREVIOUS_SUCCESSFUL_COMMIT ?: env.GIT_PREVIOUS_COMMIT
          if (!baseCommit) {
              try {
                  baseCommit = sh(script: 'git rev-parse HEAD~1', returnStdout: true).trim()
              } catch (ignored) {
                  baseCommit = null
              }
          }

          // 3. Gọi hàm từ Shared Library để phân tích Monorepo
          // Hàm này nhận vào baseCommit, currentCommit và trả về chuỗi (VD: "frontend,auth")
          env.CHANGED_SERVICES = detectMonorepoChanges(baseCommit, env.GIT_COMMIT)
          
          echo "Changed services detected: ${env.CHANGED_SERVICES ?: 'none'}"
        }
      }
    }

    stage('Security Scan') {
    // Jenkins sẽ tự động BỎ QUA stage này nếu không có service nào thay đổi
      when {
          expression { return env.CHANGED_SERVICES != null && env.CHANGED_SERVICES != '' }
      }
      steps {
          script {
              echo "🔍 Bắt đầu quét bảo mật (SonarQube, Hadolint, Trivy) cho: ${env.CHANGED_SERVICES}"
              
              // Truyền danh sách service (VD: "admin,frontend") và tên project gốc ("healthcare") vào
              scanSecurity(env.CHANGED_SERVICES, "healthcare")
          }
      }
    }

    stage('Build & Push') {
      // Vẫn câu thần chú: Không có code đổi thì tự động Skip bước này
      when {
          expression { return env.CHANGED_SERVICES != null && env.CHANGED_SERVICES != '' }
      }
      steps {
        script {
          echo "🚀 Bắt đầu Build & Push Docker Image cho: ${env.CHANGED_SERVICES}"
          echo "🏷️ Sử dụng Immutable Tag: ${env.DEPLOY_TAG}"
          
          // Gọi hàm từ Shared Library và truyền 4 tham số vào
          buildAndPush(env.CHANGED_SERVICES, env.DEPLOY_TAG)
        }
      }
    }

    stage('Deploy Staging') {
      when {
          expression { return env.CHANGED_SERVICES != null && env.CHANGED_SERVICES != '' }
      }
      steps {
        script {
          echo "🚢 Đang chuẩn bị cập nhật cấu hình cho STAGING..."
          
          withCredentials([string(credentialsId: env.GITEA_CREDS_ID, variable: 'TOKEN')]) {
            deployManifest(
              environment: 'staging', // Chỉ định môi trường Staging
              changedServices: env.CHANGED_SERVICES,
              
              // Ở Staging, ta truyền thẳng mã DEPLOY_TAG (Short SHA) vào.
              // Hàm sẽ tự hiểu và áp dụng Tag này cho toàn bộ service thay đổi.
              imageTag: env.DEPLOY_TAG, 
              
              // Giữ nguyên mapping thư mục giống như Production
              serviceFolderMap: [
                 'frontend': 'frontend',
                 'auth': 'auth-service',
                 'backend': 'backend-service',
                 'admin': 'admin-service'
              ],
              
              manifestRepoUrl: env.MANIFEST_REPO_URL,
              manifestRepoBranch: env.MANIFEST_REPO_BRANCH,
              gitUserName: env.GIT_USER_NAME,
              gitUserEmail: env.GIT_USER_EMAIL,
              giteaRegistry: env.GITEA_REGISTRY,
              giteaOwner: env.GITEA_OWNER,
              giteaRepo: env.GITEA_REPO,
              token: TOKEN,
              commitMessage: "Deploy Staging: Cập nhật [${env.CHANGED_SERVICES}] với tag [${env.DEPLOY_TAG}]"
            )
          }
          
          echo "✅ Đã đẩy cấu hình Staging lên Gitea! ArgoCD sẽ tự động đồng bộ."
        }
      }
    }

    stage('Manual Approval & Retag') {
      when {
        allOf {
          branch 'main'
          expression { return env.CHANGED_SERVICES?.trim() }
        }
      }
      steps {
        script {
          echo "⏳ Chờ phê duyệt từ quản trị viên..."
          
          // 1. Gọi Shared Library và hứng kết quả (Map) trả về vào một biến
          def approvalResult = approveAndRetag(
            services: env.CHANGED_SERVICES,
            commitTag: env.DEPLOY_TAG,
            adminEmail: env.GIT_USER_EMAIL ?: '', // Thêm ?: '' để tránh lỗi nếu biến email bị null
            credsId: env.GITEA_CREDS_ID,
            giteaApiUrl: env.GITEA_API_URL,
            giteaOwner: env.GITEA_OWNER,
            giteaRepo: env.GITEA_REPO,
            giteaRegistry: env.GITEA_REGISTRY, // Đã bổ sung biến này
            gitCommit: env.GIT_COMMIT
          )

          // 2. Lấy dữ liệu từ Map gán vào environment để các Stage sau sử dụng
          env.RELEASE_TAG = approvalResult.mainReleaseTag
          env.SERVICE_TAGS_MAPPING = approvalResult.serviceTags

          // 3. In log ra cho đẹp và dễ debug
          echo "✅ Phê duyệt hoàn tất!"
          echo "🏷️ Release Tag chung: ${env.RELEASE_TAG ? env.RELEASE_TAG : 'Bỏ qua (Không tạo Release)'}"
          echo "📦 Chi tiết Tag các service: ${env.SERVICE_TAGS_MAPPING}"
        }
      }
    }

  stage('Deploy to Production') {
      when {
        allOf {
          branch 'main'
          // Chỉ chạy khi quản trị viên có nhập Tag Release chung
          expression { return env.SERVICE_TAGS_MAPPING?.trim() } 
        }
      }
      steps {
        script {
          echo "🚀 Cập nhật Kustomize Production với các Tag: ${env.SERVICE_TAGS_MAPPING}"
          
          withCredentials([string(credentialsId: env.GITEA_CREDS_ID, variable: 'TOKEN')]) {
            deployManifest(
              environment: 'production',
              changedServices: env.CHANGED_SERVICES,
              
              // ĐÂY LÀ ĐIỂM ĂN TIỀN: Truyền nguyên chuỗi mapping vào đây
              imageTag: env.SERVICE_TAGS_MAPPING, 
              
              // Mapping thư mục (giữ nguyên như Staging)
              serviceFolderMap: [
                 'frontend': 'frontend',
                 'auth': 'auth-service',
                 'backend': 'backend-service',
                 'admin': 'admin-service'
              ],
              
              manifestRepoUrl: env.MANIFEST_REPO_URL,
              manifestRepoBranch: env.MANIFEST_REPO_BRANCH,
              gitUserName: env.GIT_USER_NAME,
              gitUserEmail: env.GIT_USER_EMAIL,
              giteaRegistry: env.GITEA_REGISTRY,
              giteaOwner: env.GITEA_OWNER,
              giteaRepo: env.GITEA_REPO,
              token: TOKEN,
              
              // Ghi rõ Release Tag chung vào câu lệnh commit
              commitMessage: "🚀 release(production): cập nhật lên phiên bản ${env.RELEASE_TAG}"
            )
          }
          
          echo "🎉 Đã đẩy cấu hình Production lên Gitea! ArgoCD sẽ tiếp quản công việc ngay bây giờ."
        }
      }
    }
    // stage('Deploy to Production') {
    //   when {
    //     allOf {
    //       branch 'main'
    //       expression { return env.RELEASE_TAG?.trim() }
    //     }
    //   }
    //   steps {
    //     script {
    //       withCredentials([string(credentialsId: env.GITEA_CREDS_ID, variable: 'TOKEN')]) {
    //         sh '''
    //           set -e
    //           GIT_AUTH_URL="https://${GIT_USER_NAME}:${TOKEN}@${MANIFEST_REPO_URL#https://}" \
    //           ENVIRONMENT="production" \
    //           SERVICES="${CHANGED_SERVICES}" \
    //           IMAGE_TAG="${RELEASE_TAG}" \
    //           MANIFEST_REPO_BRANCH="${MANIFEST_REPO_BRANCH}" \
    //           GIT_USER_NAME="${GIT_USER_NAME}" \
    //           GIT_USER_EMAIL="${GIT_USER_EMAIL}" \
    //           GITEA_REGISTRY="${GITEA_REGISTRY}" \
    //           GITEA_OWNER="${GITEA_OWNER}" \
    //           COMMIT_MESSAGE="ci(prod): update healthcare images to ${RELEASE_TAG}" \
    //           bash scripts/update-k8s-manifest.sh
    //         '''
    //       }
    //     }
    //   }
    // }
  }

  post {
    always {
      script {
        echo 'Post-build cleanup'
        sh "docker logout ${GITEA_REGISTRY} || true"
        sh "docker image prune -f || true"
        sh "docker builder prune -f || true"
        cleanWs()
      }
    }

    success {
      echo 'Pipeline completed successfully'
    }

    failure {
      echo 'Pipeline failed - review stage logs for details'
    }
  }
}
