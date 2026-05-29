# Healthcare Booking System

A cloud-native healthcare appointment platform built with a microservices architecture, Kubernetes, GitOps, and modern DevOps practices.

The project demonstrates the migration from a traditional monolithic system to a scalable cloud-native ecosystem, combining containerized services, serverless components, automated CI/CD pipelines, and GitOps-based deployments.

---

## Related Repositories

| Repository | Purpose |
|------------|---------|
| [healthcare](https://github.com/kltn-healthcare/healthcare) | Main healthcare application (Frontend, Backend, Microservices) |
| [healthcare-shared-library](https://github.com/kltn-healthcare/healthcare-shared-library) | Jenkins Shared Library for CI/CD automation |
| [healthcare-manifests](https://github.com/kltn-healthcare/healthcare-manifests) | GitOps repository containing Kubernetes deployment manifests |

## Architecture Overview

### Frontend
- Next.js

### Backend
- NestJS Microservices
- API Gateway
- REST APIs

### Databases
- PostgreSQL
- Redis

### Cloud Services (AWS)
- Lambda
- DynamoDB
- EventBridge
- S3

### DevOps & Platform
- Docker
- Kubernetes
- Jenkins
- ArgoCD
- GitOps
- SonarQube
- Trivy
- Hadolint

---

## Repository Structure

The system is divided into three repositories:

### healthcare

Main application repository containing:

- Next.js frontend
- NestJS microservices
- API Gateway
- Business logic
- Database integrations

### healthcare-shared-library

Reusable Jenkins Shared Library that provides:

- Monorepo-aware change detection
- Print system information
- Security scanning
- Build and push docker images
- Deployment workflows
- Release management

### healthcare-manifests

GitOps repository containing:

- Kubernetes manifests
- Kustomize overlays
- Environment configurations
- Deployment definitions

ArgoCD continuously monitors this repository and synchronizes changes to Kubernetes clusters.

---

## System Architecture

```text
Developer
    │
    ▼
Gitea Repository
    │
    ▼
Jenkins Pipeline
    ├── Change Detection
    ├── Security Scan
    ├── Docker Build
    ├── Push Container Images
    └── Update GitOps Manifests
             │
             ▼
      ArgoCD GitOps
             │
             ▼
      Kubernetes Cluster
             │
             ▼
        Microservices   
```

---

## CI/CD Workflow

### Feature Development

1. Developer pushes code to a feature branch.
2. Jenkins detects modified services within the monorepo.
3. Security checks are executed:
   - SonarQube
   - Hadolint
   - Trivy
4. Only changed services are built.
5. Docker images are tagged using immutable Git commit SHAs.
6. No deployment is performed for feature branches.
7. A Pull Request is created for review.

### Staging Deployment

1. Pull Request is merged into the `develop` branch.
2. Jenkins rebuilds only affected services.
3. New Docker images are pushed to the registry.
4. Jenkins updates Kubernetes manifests in the GitOps repository.
5. ArgoCD automatically synchronizes changes to the staging cluster.
6. QA performs validation and testing.

### Production Release

1. Approved changes are merged into the `main` branch.
2. Jenkins executes the production build pipeline.
3. A release candidate is prepared.
4. Production deployment requires creating a Git release tag (e.g. `v1.2.3`).
5. Tag creation triggers the release pipeline.
6. Jenkins updates production manifests.
7. ArgoCD deploys changes to the production cluster.
8. Release notes are automatically generated.

---

## Key DevOps Features

### Monorepo-Aware CI/CD

Only modified services are:

- Scanned
- Built
- Containerized
- Deployed

This significantly reduces pipeline execution time.

### GitOps Deployment Model

- Git serves as the single source of truth.
- Infrastructure and application deployments are fully version-controlled.
- ArgoCD continuously reconciles cluster state.

### Immutable Deployments

Container images are tagged using Git commit SHAs.

Example:

```text
healthcare-auth:abc12345
healthcare-frontend:def67890
```

This ensures:

- Traceability
- Reproducibility
- Easy rollback capability

### Security-First Pipeline

Every deployment passes through:

- SonarQube code analysis
- Hadolint Dockerfile validation
- Trivy vulnerability scanning

---

## Engineering Highlights

This project demonstrates practical experience with:

- Microservices Architecture
- Cloud-Native Application Development
- Kubernetes Administration
- GitOps using ArgoCD
- Jenkins Shared Libraries
- Docker Containerization
- AWS Serverless Services
- Infrastructure as Code
- Automated CI/CD Pipelines
- Production Release Management
- Monorepo Engineering

---

## Author

Bachelor Thesis Project

**Topic:** Migrating a Monolithic Healthcare Booking System to a Cloud-Native Microservices Architecture with DevOps Automation and GitOps Deployment.