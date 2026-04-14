import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { ArticlePage } from '@/pages/ArticlePage';
import { TagsPage } from '@/pages/TagsPage';
import { AboutPage } from '@/pages/AboutPage';
import { Component, type ErrorInfo, type ReactNode } from 'react';

class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean; error: Error | null }
> {
  state = { hasError: false, error: null as Error | null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('React Error:', error);
    console.error('Error Info:', info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px',
          margin: '40px auto',
          maxWidth: '600px',
          background: '#1a1a2e',
          borderRadius: '12px',
          border: '1px solid #a855f7',
          color: '#fff',
          fontFamily: 'monospace',
        }}>
          <h2 style={{ color: '#ff4444', marginBottom: '16px' }}>⚠️ 渲染错误</h2>
          <pre style={{
            whiteSpace: 'pre-wrap',
            background: '#0d0d1a',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '13px',
            overflow: 'auto',
          }}>
            {this.state.error?.message}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: '16px',
              padding: '8px 20px',
              background: '#a855f7',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          >
            重新加载
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/article/:slug" element={<ArticlePage />} />
              <Route path="/tags" element={<TagsPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
