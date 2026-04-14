---
title: "CSS 入门：让网页焕然一新"
date: "2026-04-14"
tags: ["CSS", "Web", "前端"]
summary: "学习 CSS 的基础语法、选择器、盒模型以及常见布局方式，让你掌握网页美化的核心技术。"
---

## 什么是 CSS？

CSS（Cascading Style Sheets，层叠样式表）用于控制网页的**外观和布局**。如果说 HTML 是网页的骨架，那么 CSS 就是网页的外衣。

## CSS 基本语法

```css
选择器 {
    属性: 值;
    属性: 值;
}
```

### 示例：

```css
h1 {
    color: blue;
    font-size: 24px;
}
```

这表示：**所有 `<h1>` 标题的文字颜色变成蓝色，字体大小变成 24 像素**。

## CSS 的三种引入方式

### 1. 内联样式（不推荐）

```html
<h1 style="color: red;">红色标题</h1>
```

### 2. 内部样式表

```html
<head>
    <style>
        h1 { color: red; }
    </style>
</head>
```

### 3. 外部样式表（推荐）

```html
<head>
    <link rel="stylesheet" href="styles.css">
</head>
```

## CSS 选择器

### 1. 元素选择器

```css
p {
    color: #333;
}
```

### 2. 类选择器

```css
.highlight {
    background-color: yellow;
}
```

使用方式：
```html
<p class="highlight">这段文字有黄色背景</p>
```

### 3. ID 选择器

```css
#header {
    background-color: #2c3e50;
}
```

使用方式：
```html
<div id="header">这是头部</div>
```

### 4. 组合选择器

```css
/* 后代选择器：所有 div 内的 p */
div p { }

/* 子选择器：div 的直接子元素 p */
div > p { }

/* 并列选择器 */
h1, h2, h3 { }
```

## 常用 CSS 属性

### 文字样式

```css
.text {
    color: #333;              /* 文字颜色 */
    font-size: 16px;          /* 字体大小 */
    font-family: Arial, sans-serif;  /* 字体 */
    font-weight: bold;         /* 字重：normal/bold */
    text-align: center;        /* 文字对齐：left/center/right */
    line-height: 1.6;          /* 行高 */
}
```

### 背景

```css
.box {
    background-color: #f0f0f0;
    background-image: url('bg.jpg');
    background-size: cover;
}
```

### 边框

```css
.card {
    border: 1px solid #ddd;
    border-radius: 8px;
}
```

## 盒模型

每个 HTML 元素都可以看作一个"盒子"：

```
┌─────────────────────────────────┐
│           Margin (外边距)        │
│  ┌───────────────────────────┐  │
│  │        Border (边框)       │  │
│  │  ┌─────────────────────┐  │  │
│  │  │   Padding (内边距)   │  │  │
│  │  │  ┌───────────────┐  │  │  │
│  │  │  │   Content     │  │  │  │
│  │  │  │   (内容)       │  │  │  │
│  │  │  └───────────────┘  │  │  │  │
│  │  └─────────────────────┘  │  │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

```css
.box {
    width: 300px;
    padding: 20px;
    border: 1px solid black;
    margin: 10px;
}
```

**现代盒模型**（默认）：
```css
* {
    box-sizing: border-box;
}
```

## Flexbox 弹性布局

Flexbox 是目前最常用的布局方式：

```css
.container {
    display: flex;
    justify-content: space-between;  /* 水平对齐 */
    align-items: center;            /* 垂直对齐 */
    gap: 20px;                     /* 元素间距 */
}
```

### 常用属性：

| 属性 | 作用 |
|------|------|
| `flex-direction` | 主轴方向（row/column） |
| `justify-content` | 主轴对齐方式 |
| `align-items` | 交叉轴对齐方式 |
| `flex-wrap` | 是否换行 |

## 响应式设计

让网页适配不同屏幕尺寸：

```css
/* 移动端优先 */
.container {
    width: 100%;
    padding: 10px;
}

/* 平板 */
@media (min-width: 768px) {
    .container {
        width: 750px;
        margin: 0 auto;
    }
}

/* 桌面 */
@media (min-width: 1024px) {
    .container {
        width: 980px;
    }
}
```

## 完整示例

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
        }
        
        .card {
            max-width: 400px;
            margin: 50px auto;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .card img {
            width: 100%;
            height: 200px;
            object-fit: cover;
        }
        
        .card-content {
            padding: 20px;
        }
        
        .card h2 {
            color: #333;
            margin-bottom: 10px;
        }
        
        .card p {
            color: #666;
            line-height: 1.6;
        }
        
        .btn {
            display: inline-block;
            margin-top: 15px;
            padding: 10px 20px;
            background: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="card">
        <img src="photo.jpg" alt="照片">
        <div class="card-content">
            <h2>标题</h2>
            <p>这是一段描述文字，使用 CSS 美化后的卡片效果。</p>
            <a href="#" class="btn">了解更多</a>
        </div>
    </div>
</body>
</html>
```

## 总结

- CSS 控制网页的外观和布局
- 选择器是 CSS 的核心，要熟练掌握
- Flexbox 是现代布局的首选方案
- 响应式设计让网页适配所有设备

学会了 HTML 和 CSS，下一步就是学习 **JavaScript**，让网页真正"动"起来！
