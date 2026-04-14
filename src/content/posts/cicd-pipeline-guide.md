---
title: "从零搭建 CI/CD 流水线"
date: "2026-04-01"
tags: ["DevOps", "CI/CD", "Docker"]
summary: "详细介绍如何使用 GitHub Actions 搭建完整的 CI/CD 流水线，包括自动化测试、Docker 镜像构建、自动化部署到云服务器的全流程。"
---

## 什么是 CI/CD？

CI/CD（持续集成/持续部署）是现代软件开发的核心实践。它能帮助我们：

- **自动检测代码问题**：每次提交自动运行测试和代码检查
- **快速交付**：合并代码后自动构建和部署
- **减少人为错误**：消除手动部署的风险

## 使用 GitHub Actions 搭建流水线

### 1. 基础 CI 配置

创建 `.github/workflows/ci.yml`：

```yaml
name: CI Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [18, 20]

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linting
        run: npm run lint

      - name: Run tests
        run: npm run test:coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          token: ${{ secrets.CODECOV_TOKEN }}
```

### 2. Docker 镜像构建

```yaml
jobs:
  build-docker:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to Registry
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: |
            ghcr.io/${{ github.repository }}:latest
            ghcr.io/${{ github.repository }}:${{ github.sha }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
```

### 3. 自动部署

```yaml
jobs:
  deploy:
    needs: build-docker
    runs-on: ubuntu-latest

    steps:
      - name: Deploy to server
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            docker pull ghcr.io/${{ github.repository }}:latest
            docker-compose up -d
            docker image prune -f
```

### Docker Compose 配置

```yaml
version: '3.8'

services:
  app:
    image: ghcr.io/your-org/your-app:latest
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

## 最佳实践

- **流水线要快**：并行运行独立的任务，合理利用缓存
- **安全第一**：敏感信息使用 Secrets 管理，不要硬编码
- **渐进式部署**：先部署到预发环境，验证通过后再上生产
- **监控告警**：部署后自动运行冒烟测试

> 🚀 **核心理念**：好的 CI/CD 流水线应该是透明的——任何团队成员都能理解每一步在做什么以及为什么这样做。
