@Library('healthcare-shared-lib@main') _

pipeline {
  agent { label 'worker-2' }

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

    stage('Notify Admin') {
      when {
        allOf {
          branch 'main'
          expression { return env.CHANGED_SERVICES?.trim() }
        }
      }
      steps {
        script {
          def subject = "Release ready: ${env.CHANGED_SERVICES} (${env.DEPLOY_TAG})"
          def body = "Services ready for production release:\n" +
            "- Services: ${env.CHANGED_SERVICES}\n" +
            "- Commit SHA: ${env.DEPLOY_TAG}\n" +
            "- Build URL: ${env.BUILD_URL ?: 'N/A'}\n" +
            "\nCreate a tag vX.Y.Z on this commit to trigger production release."

          if (!env.GIT_USER_EMAIL?.trim()) {
            echo "No admin email configured."
            echo body
            return
          }

          try {
            mail(
              to: env.GIT_USER_EMAIL,
              subject: subject,
              body: body
            )
            echo "Notification sent to admin: ${env.GIT_USER_EMAIL}"
          } catch (Exception e) {
            echo "Notification failed: ${e.message}"
            echo body
          }
        }
      }
    }

    stage('Deploy Staging') {
      when {
          allOf {
            branch 'develop'
            expression { return env.CHANGED_SERVICES?.trim() }
          }
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
  }

  post {
    always {
      script {
        echo 'Post-build cleanup'
        sh "docker image prune -a -f || true"
        sh "docker logout ${GITEA_REGISTRY} || true"
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
