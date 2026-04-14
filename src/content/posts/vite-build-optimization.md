---
title: "Vite 构建优化实战指南"
date: "2026-04-05"
tags: ["Vite", "前端工程化", "性能优化"]
summary: "从实际项目出发，深入分析 Vite 的构建流程，分享分包策略、依赖预构建、CSS 优化等实用技巧，显著提升构建和加载速度。"
---

## 为什么选择 Vite？

Vite 以其**极速的开发体验**和**高效的构建输出**成为现代前端项目的首选构建工具。但开箱即用的配置往往不够，本文将分享一些实战中的优化策略。

### 开发体验优化

#### 1. 依赖预构建优化

```typescript
// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    // 强制预构建这些依赖
    include: ['react', 'react-dom', 'react-router-dom', 'lodash-es'],
    // 排除不需要预构建的依赖
    exclude: ['your-local-package'],
  },
});
```

#### 2. 开发服务器配置

```typescript
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
    // 开启本地 HTTPS
    // https: true,
    // 配置代理，解决跨域
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
```

### 构建产物优化

#### 1. 分包策略

合理的分包策略可以充分利用浏览器缓存：

```typescript
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React 相关
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // UI 库
          'vendor-ui': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          // 工具库
          'vendor-utils': ['date-fns', 'clsx', 'zod'],
        },
      },
    },
  },
});
```

#### 2. 代码分割

使用动态 `import()` 实现按需加载：

```tsx
import { lazy, Suspense } from 'react';

const Editor = lazy(() => import('./components/Editor'));
const Charts = lazy(() => import('./components/Charts'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/editor"
        element={
          <Suspense fallback={<Skeleton />}>
            <Editor />
          </Suspense>
        }
      />
      <Route
        path="/charts"
        element={
          <Suspense fallback={<Skeleton />}>
            <Charts />
          </Suspense>
        }
      />
    </Routes>
  );
}
```

#### 3. CSS 优化

```typescript
export default defineConfig({
  build: {
    cssCodeSplit: true,
    cssMinify: 'lightningcss',
  },
  css: {
    preprocessorOptions: {
      scss: {
        // SCSS 全局变量
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },
});
```

### 性能分析

使用 `rollup-plugin-visualizer` 分析构建产物：

```typescript
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    visualizer({
      filename: './dist/stats.html',
      open: true,
      gzipSize: true,
    }),
  ],
});
```

### 优化效果对比

| 指标 | 优化前 | 优化后 | 提升 |
|------|--------|--------|------|
| 首次构建时间 | 45s | 12s | 73% |
| 热更新速度 | 500ms | 50ms | 90% |
| JS 产物体积 | 1.2MB | 380KB | 68% |
| 首屏加载时间 | 3.2s | 1.1s | 66% |

### 总结

Vite 的优化是一个持续迭代的过程，建议：

1. 定期分析构建产物，找出体积异常的包
2. 合理使用动态导入，避免加载不必要的代码
3. 利用浏览器缓存，对第三方依赖进行长期缓存
4. 关注 CSS 体积，避免引入未使用的样式

> ⚡ **核心原则**：优化不是一次性的工作，而是需要在开发过程中持续关注和维护的。
