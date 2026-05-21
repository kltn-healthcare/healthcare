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
    // stage('Detect Changes') {
    //   steps {
    //     checkout scm
    //     script {
    //       env.SHORT_SHA = sh(script: 'git rev-parse --short=8 HEAD', returnStdout: true).trim()
    //       def changedServices = detectMonorepoChanges(
    //         allServices: ['frontend', 'auth', 'backend', 'admin'],
    //         baseCommit: env.GIT_PREVIOUS_SUCCESSFUL_COMMIT ?: env.GIT_PREVIOUS_COMMIT,
    //         currentCommit: env.GIT_COMMIT
    //       )
    //       env.CHANGED_SERVICES = changedServices.join(',')
    //       env.COMMIT_TAG = env.SHORT_SHA

    //       echo "Changed services: ${env.CHANGED_SERVICES ?: 'none'}"
    //       echo "Commit tag: ${env.COMMIT_TAG}"
    //     }
    //   }
    // }

    // stage('Security Scan') {
    //   steps {
    //     scanSecurity(
    //       sonarServer: env.SONAR_SERVER,
    //       sonarScanner: env.SONAR_SCANNER,
    //       sonarProjectKey: env.JOB_BASE_NAME
    //     )
    //   }
    // }

    // stage('Build & Push Images') {
    //   when {
    //     expression { return env.CHANGED_SERVICES?.trim() }
    //   }
    //   steps {
    //     script {
    //       buildAndPush(
    //         services: env.CHANGED_SERVICES,
    //         imageTag: env.COMMIT_TAG,
    //         registry: env.GITEA_REGISTRY,
    //         owner: env.GITEA_OWNER,
    //         credsId: env.GITEA_CREDS_ID
    //       )
    //     }
    //   }
    // }

    // stage('Deploy to Staging') {
    //   when {
    //     allOf {
    //       branch 'main'
    //       expression { return env.CHANGED_SERVICES?.trim() }
    //     }
    //   }
    //   steps {
    //     script {
    //       withCredentials([string(credentialsId: env.GITEA_CREDS_ID, variable: 'TOKEN')]) {
    //         sh '''
    //           set -e
    //           GIT_AUTH_URL="https://${GIT_USER_NAME}:${TOKEN}@${MANIFEST_REPO_URL#https://}" \
    //           ENVIRONMENT="staging" \
    //           SERVICES="${CHANGED_SERVICES}" \
    //           IMAGE_TAG="${COMMIT_TAG}" \
    //           MANIFEST_REPO_BRANCH="${MANIFEST_REPO_BRANCH}" \
    //           GIT_USER_NAME="${GIT_USER_NAME}" \
    //           GIT_USER_EMAIL="${GIT_USER_EMAIL}" \
    //           GITEA_REGISTRY="${GITEA_REGISTRY}" \
    //           GITEA_OWNER="${GITEA_OWNER}" \
    //           COMMIT_MESSAGE="ci(staging): update healthcare images to ${COMMIT_TAG}" \
    //           bash scripts/update-k8s-manifest.sh
    //         '''
    //       }
    //     }
    //   }
    // }

    // stage('Manual Approval & Retag') {
    //   when {
    //     allOf {
    //       branch 'main'
    //       expression { return env.CHANGED_SERVICES?.trim() }
    //     }
    //   }
    //   steps {
    //     script {
    //       env.RELEASE_TAG = approveAndRetag(
    //         services: env.CHANGED_SERVICES,
    //         commitTag: env.COMMIT_TAG,
    //         registry: env.GITEA_REGISTRY,
    //         owner: env.GITEA_OWNER,
    //         credsId: env.GITEA_CREDS_ID,
    //         giteaApiUrl: env.GITEA_API_URL,
    //         giteaOwner: env.GITEA_OWNER,
    //         giteaRepo: env.GITEA_REPO,
    //         gitCommit: env.GIT_COMMIT
    //       )
    //     }
    //   }
    // }

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
