export type Language = 'zh' | 'en';

export interface Translations {
  // Navigation
  nav: {
    home: string;
    tags: string;
    about: string;
  };
  // Home page
  home: {
    title: string;
    subtitle: string;
    search: string;
    searchPlaceholder: string;
    allPosts: string;
    allTags: string;
    noResults: string;
    readingTime: string;
  };
  // Article page
  article: {
    back: string;
    tableOfContents: string;
    tags: string;
    readingTime: string;
    copyCode: string;
    copied: string;
  };
  // Tags page
  tags: {
    title: string;
    allTags: string;
    posts: string;
  };
  // About page
  about: {
    title: string;
    subtitle: string;
    description: string;
  };
  // Footer
  footer: {
    copyright: string;
    poweredBy: string;
  };
  // Error boundary
  error: {
    title: string;
    reload: string;
  };
  // Common
  common: {
    minRead: string;
  };
}

export const translations: Record<Language, Translations> = {
  zh: {
    nav: {
      home: '首页',
      tags: '标签',
      about: '关于',
    },
    home: {
      title: '技术博客',
      subtitle: '探索代码的无限可能',
      search: '搜索',
      searchPlaceholder: '搜索文章...',
      allPosts: '全部文章',
      allTags: '所有标签',
      noResults: '未找到相关文章',
      readingTime: '阅读',
    },
    article: {
      back: '返回',
      tableOfContents: '目录',
      tags: '标签',
      readingTime: '阅读时长',
      copyCode: '复制代码',
      copied: '已复制',
    },
    tags: {
      title: '标签',
      allTags: '所有标签',
      posts: '篇文章',
    },
    about: {
      title: '关于',
      subtitle: '一个技术爱好者的博客',
      description: '这里分享前端开发、技术栈、工具使用等相关的技术文章。希望能对你有所帮助！',
    },
    footer: {
      copyright: '版权所有',
      poweredBy: '由',
    },
    error: {
      title: '渲染错误',
      reload: '重新加载',
    },
    common: {
      minRead: '分钟阅读',
    },
  },
  en: {
    nav: {
      home: 'Home',
      tags: 'Tags',
      about: 'About',
    },
    home: {
      title: 'Tech Blog',
      subtitle: 'Explore the endless possibilities of code',
      search: 'Search',
      searchPlaceholder: 'Search posts...',
      allPosts: 'All Posts',
      allTags: 'All Tags',
      noResults: 'No posts found',
      readingTime: 'Read',
    },
    article: {
      back: 'Back',
      tableOfContents: 'Table of Contents',
      tags: 'Tags',
      readingTime: 'Reading Time',
      copyCode: 'Copy Code',
      copied: 'Copied',
    },
    tags: {
      title: 'Tags',
      allTags: 'All Tags',
      posts: 'posts',
    },
    about: {
      title: 'About',
      subtitle: 'A tech enthusiast\'s blog',
      description: 'Sharing technical articles about frontend development, tech stacks, and tools. Hope you find it helpful!',
    },
    footer: {
      copyright: 'All rights reserved',
      poweredBy: 'Powered by',
    },
    error: {
      title: 'Render Error',
      reload: 'Reload',
    },
    common: {
      minRead: 'min read',
    },
  },
};
