# 个人技术博客 / Personal Tech Blog

> A modern tech blog built with React, TypeScript, and Tailwind CSS.
> 使用 React、TypeScript 和 Tailwind CSS 构建的现代技术博客。

---

## 功能特点 / Features

- ⚡ **React 18 + TypeScript** - Modern frontend stack
- 🎨 **Tailwind CSS + shadcn/ui** - Beautiful dark theme
- 📝 **Markdown Support** - Write posts in Markdown
- 🌐 **Bilingual** - Chinese and English UI
- 📱 **Responsive Design** - Works on all devices

---

## 开始使用 / Getting Started

### 安装依赖 / Install Dependencies

```bash
npm install
```

### 开发模式 / Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### 构建生产版本 / Build for Production

```bash
npm run build
```

### 预览生产版本 / Preview Production Build

```bash
npm run preview
```

---

## 写作文章 / Writing Posts

在 `src/content/posts/` 目录下创建 Markdown 文件。

Create Markdown files in `src/content/posts/` directory.

**Example / 示例：**

```markdown
---
title: 我的第一篇文章
date: 2024-01-01
tags: [React, TypeScript]
summary: 这是文章的简短描述
---

# 文章标题

这里是文章内容...
```

然后在 `src/lib/posts.ts` 中注册文章。

Then register the post in `src/lib/posts.ts`.

---

## 部署 / Deployment

本项目支持两种部署方式：

This project supports two deployment methods:

### GitHub Pages

Push to `main` branch, GitHub Actions will auto-deploy.

推送到 `main` 分支，GitHub Actions 会自动部署。

访问 / Visit: https://111jiangchrr111.github.io/my-tech-blog/

### Vercel

Connect your GitHub repo to Vercel for automatic deployment.

将 GitHub 仓库连接到 Vercel 实现自动部署。

---

## 技术栈 / Tech Stack

| 技术 / Tech | 用途 / Purpose |
|-------------|----------------|
| React 18 | UI 框架 / UI Framework |
| TypeScript | 类型安全 / Type Safety |
| Vite | 构建工具 / Build Tool |
| Tailwind CSS | 样式 / Styling |
| shadcn/ui | 组件库 / Component Library |
| React Router | 路由 / Routing |
| Lucide React | 图标 / Icons |

---

## 项目结构 / Project Structure

```
src/
├── components/     # React 组件 / React components
├── content/        # Markdown 文章 / Markdown posts
├── lib/            # 工具函数 / Utilities
├── hooks/          # 自定义 Hooks
├── pages/          # 页面组件 / Page components
└── types/          # TypeScript 类型定义 / Type definitions
```

---

## License

MIT
