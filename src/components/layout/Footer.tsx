import { Github, Mail, Rss } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/80 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="text-cyan-400 font-mono">&gt;_</span>
            <span>© {new Date().getFullYear()} DevBlog. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md text-muted-foreground hover:text-cyan-400 hover:bg-cyan-400/10 transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="mailto:hello@example.com"
              className="p-2 rounded-md text-muted-foreground hover:text-cyan-400 hover:bg-cyan-400/10 transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
            <button
              className="p-2 rounded-md text-muted-foreground hover:text-cyan-400 hover:bg-cyan-400/10 transition-colors cursor-pointer"
              aria-label="RSS"
            >
              <Rss className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
