---
title: "JavaScript 入门：让网页动起来"
date: "2026-04-14"
tags: ["JavaScript", "Web", "前端"]
summary: "从变量、数据类型到函数和 DOM 操作，系统学习 JavaScript 的基础知识，让你能够为网页添加交互功能。"
---

## 什么是 JavaScript？

JavaScript 是一种**编程语言**，用于为网页添加交互功能。HTML 负责结构，CSS 负责样式，而 JavaScript 负责**行为**。

## JavaScript 基本语法

### 1. 变量声明

```javascript
// 声明变量
let name = "张三";
const age = 25;  // 常量，不能重新赋值

// 输出到控制台
console.log("姓名:", name);
console.log("年龄:", age);
```

### 2. 数据类型

```javascript
// 字符串
let greeting = "你好";

// 数字
let score = 95;
let price = 19.99;

// 布尔值
let isStudent = true;

// 数组
let fruits = ["苹果", "香蕉", "橙子"];

// 对象
let person = {
    name: "李四",
    age: 30,
    city: "北京"
};
```

## 运算符

```javascript
// 算术运算符
let sum = 10 + 5;    // 15
let diff = 10 - 3;   // 7
let product = 4 * 2; // 8
let quotient = 15 / 3; // 5

// 比较运算符
5 > 3   // true
5 === 5 // true (严格相等)
5 !== 3 // true

// 逻辑运算符
true && false  // false (与)
true || false  // true  (或)
!true          // false (非)
```

## 条件语句

```javascript
let score = 85;

if (score >= 90) {
    console.log("优秀");
} else if (score >= 60) {
    console.log("及格");
} else {
    console.log("需要努力");
}

// 三元运算符
let result = score >= 60 ? "及格" : "不及格";
```

## 循环

### for 循环
```javascript
// 打印 1 到 5
for (let i = 1; i <= 5; i++) {
    console.log(i);
}

// 遍历数组
let colors = ["红", "绿", "蓝"];
for (let i = 0; i < colors.length; i++) {
    console.log(colors[i]);
}
```

### for...of 循环（遍历数组）
```javascript
let fruits = ["苹果", "香蕉", "橙子"];

for (let fruit of fruits) {
    console.log(fruit);
}
```

### while 循环
```javascript
let count = 0;
while (count < 3) {
    console.log("计数:", count);
    count++;
}
```

## 函数

### 函数声明
```javascript
function greet(name) {
    return "你好, " + name + "!";
}

let message = greet("小明");
console.log(message); // "你好, 小明!"
```

### 箭头函数（ES6）
```javascript
// 完整写法
const add = (a, b) => {
    return a + b;
};

// 简写（单行函数）
const multiply = (a, b) => a * b;

console.log(add(2, 3));      // 5
console.log(multiply(4, 5)); // 20
```

## 数组操作

```javascript
let numbers = [1, 2, 3, 4, 5];

// map - 遍历并返回新数组
let doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

// filter - 过滤
let evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

// reduce - 累计计算
let sum = numbers.reduce((acc, n) => acc + n, 0);
// 15

// find - 查找第一个匹配项
let found = numbers.find(n => n > 3);
// 4
```

## DOM 操作

DOM（Document Object Model）是 JavaScript 操作网页的接口。

### 选择元素
```javascript
// 通过 ID
let title = document.getElementById("title");

// 通过类名（返回数组）
let cards = document.getElementsByClassName("card");

// 现代方法（推荐）
let header = document.querySelector("header");      // 第一个匹配
let allButtons = document.querySelectorAll(".btn"); // 所有匹配
```

### 修改内容
```javascript
// 修改文字
let element = document.querySelector("#title");
element.textContent = "新标题";
element.innerHTML = "<strong>加粗的新标题</strong>";
```

### 修改样式
```javascript
let box = document.querySelector(".box");
box.style.backgroundColor = "blue";
box.style.transform = "rotate(45deg)";
```

### 添加/删除类
```javascript
let element = document.querySelector(".card");

// 添加类
element.classList.add("active");

// 删除类
element.classList.remove("active");

// 切换类（有就删，没有就加）
element.classList.toggle("highlight");
```

## 事件处理

### 常用事件
- `click` - 点击
- `mouseenter` / `mouseleave` - 鼠标进入/离开
- `submit` - 表单提交
- `keydown` - 键盘按下
- `load` - 页面加载完成

### 事件监听
```javascript
let button = document.querySelector("#myButton");

button.addEventListener("click", function() {
    alert("按钮被点击了！");
});

// 使用箭头函数
button.addEventListener("click", () => {
    console.log("点击事件触发");
});
```

## 完整示例：计数器

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        .counter {
            text-align: center;
            margin: 50px;
        }
        .count {
            font-size: 48px;
            font-weight: bold;
        }
        button {
            padding: 10px 20px;
            font-size: 16px;
            margin: 5px;
            cursor: pointer;
        }
        .plus { background: #4CAF50; color: white; }
        .minus { background: #f44336; color: white; }
        .reset { background: #555; color: white; }
    </style>
</head>
<body>
    <div class="counter">
        <h1>计数器</h1>
        <p class="count" id="display">0</p>
        <button class="plus" id="increase">+1</button>
        <button class="minus" id="decrease">-1</button>
        <button class="reset" id="reset">重置</button>
    </div>

    <script>
        let count = 0;
        const display = document.getElementById("display");
        const increaseBtn = document.getElementById("increase");
        const decreaseBtn = document.getElementById("decrease");
        const resetBtn = document.getElementById("reset");

        // 更新显示
        function updateDisplay() {
            display.textContent = count;
            // 数字变色
            if (count > 0) {
                display.style.color = "green";
            } else if (count < 0) {
                display.style.color = "red";
            } else {
                display.style.color = "black";
            }
        }

        // 绑定事件
        increaseBtn.addEventListener("click", () => {
            count++;
            updateDisplay();
        });

        decreaseBtn.addEventListener("click", () => {
            count--;
            updateDisplay();
        });

        resetBtn.addEventListener("click", () => {
            count = 0;
            updateDisplay();
        });
    </script>
</body>
</html>
```

## 总结

- JavaScript 为网页添加交互和动态功能
- 掌握变量、函数、数组是基础
- DOM 操作让你能控制网页元素
- 事件监听让网页响应用户操作
- 多练习，多动手写代码！

## 下一步

恭喜你完成了 HTML、CSS、JavaScript 三件套的学习！现在你可以：
- 创建静态网页
- 美化网页样式
- 添加交互功能

推荐继续学习：
- **React/Vue** - 现代前端框架
- **Node.js** - 服务端 JavaScript
- **TypeScript** - 类型安全的 JavaScript

祝你学习愉快！ 🚀
