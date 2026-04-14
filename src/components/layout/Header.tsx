import { Link, useLocation } from 'react-router-dom';
import { Terminal, Moon, Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

const navLinks = [
  { path: '/', label: '首页' },
  { path: '/tags', label: '标签' },
  { path: '/about', label: '关于' },
];

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-border/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Terminal className="h-6 w-6 text-cyan-400 transition-transform group-hover:scale-110" />
            <span className="text-lg font-bold gradient-text hidden sm:inline">DevBlog</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                  location.pathname === link.path
                    ? 'text-cyan-400 bg-cyan-400/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 border-t border-border/50 mt-2 pt-3 flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200',
                  location.pathname === link.path
                    ? 'text-cyan-400 bg-cyan-400/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
