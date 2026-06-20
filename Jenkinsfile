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
        checkout([
          $class: 'GitSCM',
          branches: scm.branches,
          userRemoteConfigs: scm.userRemoteConfigs,
          extensions: [
            [$class: 'CloneOption', depth: 100, shallow: true, noTags: false]
          ]
        ])
        script {
          env.SHORT_SHA     = sh(script: 'git rev-parse --short=8 HEAD', returnStdout: true).trim()
          env.DEPLOY_TAG    = env.SHORT_SHA
          def currentCommit = 'HEAD'
          def baseCommit    = null

          if (env.CHANGE_ID) {
            echo "PR #${env.CHANGE_ID} -> target: ${env.CHANGE_TARGET}"
            sh "git fetch --no-tags origin ${env.CHANGE_TARGET}"
            baseCommit = sh(
              script: "git merge-base HEAD origin/${env.CHANGE_TARGET}",
              returnStdout: true
            ).trim()
            echo "Base commit (merge-base): ${baseCommit}"

          } else {
            // Normal branch push.
            baseCommit = env.GIT_PREVIOUS_SUCCESSFUL_COMMIT ?: env.GIT_PREVIOUS_COMMIT
            if (!baseCommit) {
              try {
                baseCommit = sh(script: 'git rev-parse HEAD~1', returnStdout: true).trim()
              } catch (ignored) {
                baseCommit = null
              }
            }
          }

          if (baseCommit) {
            echo "git diff: [${baseCommit}] -> [${currentCommit}]"
            env.CHANGED_SERVICES = detectMonorepoChanges(baseCommit, currentCommit)
          } else {
            echo "Unable to determine base commit."
            env.CHANGED_SERVICES = ""
          }

          echo "Changed services detected: ${env.CHANGED_SERVICES ?: 'none'}"
        }
      }
    }

    stage('Security Scan') {
      when {
        // Jenkins skips this stage when no services change.
        expression { return env.CHANGED_SERVICES != null && env.CHANGED_SERVICES != '' }
      }
      steps {
        script {
          echo "Starting security scan (SonarQube, Hadolint, Trivy) for: ${env.CHANGED_SERVICES}"
          scanSecurity(env.CHANGED_SERVICES, "healthcare")
        }
      }
    }

    stage('Build & Push') {
      when {
          not { branch 'main' }
          expression { return env.CHANGED_SERVICES != null && env.CHANGED_SERVICES != '' }
      }
      steps {
        script {
          echo "Starting build and push of Docker images for: ${env.CHANGED_SERVICES}"
          echo "Using immutable tag: ${env.DEPLOY_TAG}"
          
          // Call the shared library helper with the required parameters.
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
          def subject = "Ready to release: [${env.CHANGED_SERVICES}] @ ${env.SHORT_SHA}"
          def body = """The following services have changes merged to main and are ready for production release:

          - Services  : ${env.CHANGED_SERVICES}
          - Commit SHA: ${env.SHORT_SHA}
          - Build URL : ${env.BUILD_URL ?: 'N/A'}

          No image was built at this step.
          To trigger production deployment, create a tag on commit ${env.SHORT_SHA}:

            git tag v<X.Y.Z> ${env.SHORT_SHA}
            git push origin v<X.Y.Z>

          The tag pipeline will run Security Scan, Build & Push, Deploy Production, and Create Release automatically."""

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
          echo "Preparing to update staging manifests..."
          
          withCredentials([string(credentialsId: env.GITEA_CREDS_ID, variable: 'TOKEN')]) {
            deployManifest(
              environment: 'staging', // Specify the staging environment.
              changedServices: env.CHANGED_SERVICES,
              
              // In staging, pass the DEPLOY_TAG (short SHA) directly.
              // The helper applies this tag to all changed services.
              imageTag: env.DEPLOY_TAG, 
              
              // Keep the same folder mapping as production.
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
              commitMessage: "Deploy staging: update [${env.CHANGED_SERVICES}] with tag [${env.DEPLOY_TAG}]"
            )
          }
          
          echo "Staging manifests pushed to Gitea. ArgoCD will sync automatically."
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
