---
title: "深入理解 JavaScript 异步编程"
date: "2026-03-28"
tags: ["JavaScript", "异步编程", "前端"]
summary: "从回调地狱到 async/await，全面梳理 JavaScript 异步编程的演进历程，理解 Event Loop 机制，掌握现代异步编程模式。"
---

## JavaScript 异步编程演进

JavaScript 是单线程语言，但通过异步编程可以处理大量并发操作。让我们一起回顾异步编程的演进历程。

### 1. 回调函数（Callback）

最原始的异步处理方式：

```javascript
function fetchData(callback) {
  setTimeout(() => {
    callback({ id: 1, name: '张三' });
  }, 1000);
}

// 回调地狱 😱
fetchData((user) => {
  fetchPosts(user.id, (posts) => {
    fetchComments(posts[0].id, (comments) => {
      fetchLikes(comments[0].id, (likes) => {
        // 越来越深的嵌套...
      });
    });
  });
});
```

### 2. Promise

ES6 引入的 Promise 解决了回调地狱问题：

```javascript
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id: 1, name: '张三' });
    }, 1000);
  });
}

// Promise 链式调用
fetchData()
  .then(user => fetchPosts(user.id))
  .then(posts => fetchComments(posts[0].id))
  .then(comments => fetchLikes(comments[0].id))
  .catch(error => console.error('出错了:', error));
```

### 3. async/await

ES2017 引入的语法糖，让异步代码看起来像同步代码：

```javascript
async function loadDashboard() {
  try {
    const user = await fetchData();
    const posts = await fetchPosts(user.id);
    const comments = await fetchComments(posts[0].id);
    const likes = await fetchLikes(comments[0].id);
    return { user, posts, comments, likes };
  } catch (error) {
    console.error('出错了:', error);
  }
}
```

### 4. 并发控制

#### Promise.all — 全部完成后执行

```javascript
const [users, posts, tags] = await Promise.all([
  fetchUsers(),
  fetchPosts(),
  fetchTags(),
]);
```

#### Promise.allSettled — 不因失败而中断

```javascript
const results = await Promise.allSettled([
  fetchUsers(),
  fetchPosts(),   // 即使这个失败
  fetchTags(),
]);

results.forEach(result => {
  if (result.status === 'fulfilled') {
    console.log('成功:', result.value);
  } else {
    console.error('失败:', result.reason);
  }
});
```

#### Promise.race — 取最快的

```javascript
// 超时控制
const result = await Promise.race([
  fetchData(),
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('请求超时')), 5000)
  ),
]);
```

### Event Loop 机制

理解 Event Loop 是掌握异步编程的关键：

```
   ┌──────────────────────┐
   │     调用栈 (Stack)     │
   └──────────┬───────────┘
              │
   ┌──────────▼───────────┐
   │   Web APIs (浏览器)   │  ← setTimeout, fetch, DOM
   └──────────┬───────────┘
              │
   ┌──────────▼───────────┐
   │   任务队列 (Queue)     │
   └──────────┬───────────┘
              │
   ┌──────────▼───────────┐
   │    Event Loop        │  ← 不断检查队列，执行回调
   └──────────────────────┘
```

**执行顺序**：
1. 执行同步代码（调用栈）
2. 微任务（Promise.then, queueMicrotask）
3. 宏任务（setTimeout, setInterval, I/O）

### 实用模式

#### 并发限流

```javascript
async function asyncPool(limit, tasks) {
  const results = [];
  const executing = new Set();

  for (const task of tasks) {
    const p = task().then(result => {
      executing.delete(p);
      return result;
    });
    executing.add(p);
    results.push(p);

    if (executing.size >= limit) {
      await Promise.race(executing);
    }
  }

  return Promise.all(results);
}

// 最多同时 3 个请求
const results = await asyncPool(3, urls.map(url => () => fetch(url)));
```

#### 重试机制

```javascript
async function retry(fn, retries = 3, delay = 1000) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, delay * (i + 1)));
    }
  }
}
```

### 总结

掌握异步编程是成为优秀 JavaScript 开发者的必经之路。记住：

- 优先使用 `async/await`，代码更清晰
- 善用并发控制，提升性能
- 理解 Event Loop，写出可预测的代码
- 永远处理错误，不要忽略 Promise rejection

> 🎯 **核心要点**：异步编程的本质是**非阻塞**。理解这一点，你就能在设计系统架构时做出更好的决策。
