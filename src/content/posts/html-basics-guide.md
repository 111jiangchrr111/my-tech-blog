---
title: "HTML 入门：从零开始构建网页结构"
date: "2026-04-14"
tags: ["HTML", "Web", "前端"]
summary: "详细介绍 HTML 的基础语法、常用标签以及如何构建一个完整的网页结构，适合零基础小白入门学习。"
---

## 什么是 HTML？

HTML（HyperText Markup Language）是网页的基础语言。它不是编程语言，而是一种**标记语言**，用来描述网页的结构和内容。

## HTML 基础结构

每个 HTML 页面都有固定的基本结构：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的第一个网页</title>
</head>
<body>
    <h1>欢迎来到我的网站</h1>
    <p>这是我的第一个网页！</p>
</body>
</html>
```

### 各部分解释：

| 标签 | 作用 |
|------|------|
| `<!DOCTYPE html>` | 告诉浏览器使用 HTML5 标准 |
| `<html>` | 根元素，包含整个网页 |
| `<head>` | 头部信息，不显示在页面上 |
| `<body>` | 页面内容，用户能看到的所有东西 |

## 常用 HTML 标签

### 1. 标题标签 `<h1>` 到 `<h6>`

```html
<h1>这是一级标题</h1>
<h2>这是二级标题</h2>
<h3>这是三级标题</h3>
```

### 2. 段落和文本

```html
<p>这是一个段落，用于包含大段文字。</p>
<strong>这是加粗的文本</strong>
<em>这是斜体的文本</em>
```

### 3. 链接

```html
<a href="https://example.com">点击访问示例网站</a>
```

### 4. 图片

```html
<img src="图片地址" alt="图片描述" width="300">
```

### 5. 列表

**无序列表：**
```html
<ul>
    <li>苹果</li>
    <li>香蕉</li>
    <li>橙子</li>
</ul>
```

**有序列表：**
```html
<ol>
    <li>第一步</li>
    <li>第二步</li>
    <li>第三步</li>
</ol>
```

### 6. 容器标签

```html
<div>这是一个块级容器，用于分组元素</div>
<span>这是一个行内容器，用于行内分组</span>
```

## HTML5 语义化标签

现代 HTML 强调语义化，使用有意义的标签：

```html
<header>网站头部</header>
<nav>导航栏</nav>
<main>主要内容区域</main>
<article>文章内容</article>
<section>章节/区块</section>
<aside>侧边栏</aside>
<footer>页脚</footer>
```

**为什么语义化重要？**
- 提高 SEO（搜索引擎优化）
- 让代码更容易理解和维护
- 对屏幕阅读器更友好

## 完整示例

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>个人介绍</title>
</head>
<body>
    <header>
        <h1>张三的个人网站</h1>
        <nav>
            <a href="#about">关于我</a> |
            <a href="#skills">技能</a> |
            <a href="#contact">联系方式</a>
        </nav>
    </header>
    
    <main>
        <section id="about">
            <h2>关于我</h2>
            <p>你好！我是一名热爱技术的前端开发者。</p>
        </section>
        
        <section id="skills">
            <h2>我的技能</h2>
            <ul>
                <li>HTML/CSS</li>
                <li>JavaScript</li>
                <li>React</li>
            </ul>
        </section>
    </main>
    
    <footer>
        <p>&copy; 2026 张三. All rights reserved.</p>
    </footer>
</body>
</html>
```

## 总结

- HTML 是网页的骨架，定义内容和结构
- 掌握基础标签就能构建简单网页
- 使用语义化标签是好习惯
- HTML 配合 CSS 和 JavaScript 就能创建完整的网站

下一篇文章我们将学习 **CSS**，让网页变得更好看！
