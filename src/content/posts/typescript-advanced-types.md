---
title: "TypeScript 高级类型技巧"
date: "2026-04-08"
tags: ["TypeScript", "JavaScript", "编程"]
summary: "掌握 TypeScript 的高级类型系统，包括条件类型、映射类型、模板字面量类型等，让你的代码更加类型安全和可维护。"
---

## TypeScript 高级类型系统

TypeScript 的类型系统非常强大，远不止基本的类型注解。掌握这些高级特性，可以让你的代码更安全、更优雅。

### 1. 条件类型（Conditional Types）

条件类型让你可以根据类型关系进行类型推断：

```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false

// 实用示例：提取 Promise 内部类型
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

type Result = UnwrapPromise<Promise<string>>; // string
```

### 2. 映射类型（Mapped Types）

映射类型可以基于已有类型创建新类型：

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Optional<T> = {
  [P in keyof T]?: T[P];
};

// 实用示例：将所有属性变为可空
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

interface User {
  name: string;
  age: number;
  email: string;
}

type NullableUser = Nullable<User>;
// { name: string | null; age: number | null; email: string | null }
```

### 3. 模板字面量类型（Template Literal Types）

TypeScript 4.1 引入了模板字面量类型，可以操作字符串类型：

```typescript
type EventName = 'click' | 'focus' | 'blur';
type EventHandler = `on${Capitalize<EventName>}`;
// "onClick" | "onFocus" | "onBlur"

// 生成 CSS 属性类型
type CSSDirection = 'top' | 'right' | 'bottom' | 'left';
type CSSPadding = `padding-${CSSDirection}`;
// "padding-top" | "padding-right" | "padding-bottom" | "padding-left"
```

### 4. 递归类型

TypeScript 支持递归类型定义，适合处理嵌套数据结构：

```typescript
type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object
    ? T[P] extends Function
      ? T[P]
      : DeepReadonly<T[P]>
    : T[P];
};

interface Config {
  db: {
    host: string;
    port: number;
    credentials: {
      user: string;
      password: string;
    };
  };
}

type ReadonlyConfig = DeepReadonly<Config>;
// 所有嵌套属性都是 readonly
```

### 5. 工具类型组合

结合内置工具类型，构建复杂类型：

```typescript
// 提取对象中所有函数属性的名称
type FunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

// 将数组类型展开为联合类型
type ArrayElement<T> = T extends (infer U)[] ? U : never;
type StringOrNumber = ArrayElement<(string | number)[]>;
// string | number
```

### 最佳实践

1. **优先使用 `interface`**：对象类型首选 interface，联合类型和工具类型用 type
2. **善用泛型约束**：使用 `extends` 约束泛型参数
3. **避免过度类型化**：TypeScript 的类型系统是图灵完备的，但不是所有事情都需要在类型层面解决
4. **利用 `satisfies` 操作符**：TypeScript 4.9 新增，可以在不拓宽类型的情况下验证类型

> 🔑 **核心理念**：类型系统的目标是提高开发体验和代码质量，而不是为了类型而类型。
