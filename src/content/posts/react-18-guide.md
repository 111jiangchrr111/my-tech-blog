---
title: "使用 React 18 构建现代前端应用"
date: "2026-04-10"
tags: ["React", "JavaScript", "前端"]
summary: "深入探讨 React 18 的新特性，包括 Concurrent Mode、Suspense 改进、自动批处理等，帮助你构建高性能的现代前端应用。"
---

## React 18 有什么新东西？

React 18 带来了许多令人兴奋的新特性，让我们一起来看看这些改进如何提升开发体验和应用性能。

### 1. Concurrent Mode（并发模式）

并发模式是 React 18 最重要的更新之一。它允许 React **中断**和**恢复**渲染工作，确保高优先级的更新不会被低优先级的更新阻塞。

```tsx
import { startTransition } from 'react';

function SearchResults() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    // 紧急更新：输入框响应
    setQuery(e.target.value);

    // 非紧急更新：搜索结果
    startTransition(() => {
      setResults(searchResults(e.target.value));
    });
  };

  return (
    <div>
      <input value={query} onChange={handleChange} />
      <ResultList results={results} />
    </div>
  );
}
```

### 2. 自动批处理（Automatic Batching）

在 React 18 之前，只有在 React 事件处理函数中才会自动批处理更新。现在，**所有更新**都会自动批处理，包括 Promise、setTimeout 和原生事件处理。

```tsx
// React 18 中，这些更新会被合并为一次重新渲染
function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  // 只触发一次重新渲染 ✅
}
```

### 3. Suspense 改进

Suspense 现在支持在服务端渲染中使用，配合 `React.lazy` 实现更好的代码分割。

```tsx
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### 4. 新的 Hooks

- **`useId`**: 生成唯一 ID，适用于无障碍访问
- **`useTransition`**: 管理过渡状态的 Hook
- **`useDeferredValue`**: 延迟更新部分 UI
- **`useSyncExternalStore`**: 与外部数据源同步

### 性能优化建议

| 优化手段 | 适用场景 | 效果 |
|---------|---------|------|
| `React.memo` | 纯展示组件 | 减少不必要的重渲染 |
| `useMemo` | 昂贵计算 | 避免重复计算 |
| `useCallback` | 回调函数传递 | 稳定函数引用 |
| `Suspense` | 代码分割 | 按需加载组件 |

### 总结

React 18 是一个里程碑式的版本更新，它引入的并发特性让 React 应用在面对复杂 UI 交互时依然能保持流畅的用户体验。建议所有项目都尽快升级到 React 18。

> 💡 **提示**：升级到 React 18 只需要修改 `react-dom` 的渲染调用方式，使用 `createRoot` 替代 `render` 即可。
