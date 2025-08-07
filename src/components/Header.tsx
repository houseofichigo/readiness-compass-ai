// src/components/Header.tsx
import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();
  if (location.pathname.startsWith('/admin')) return null;

  return (
    <header className="bg-background border-b">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3" aria-label="House of Ichigo Home">
          <img
            src="/lovable-uploads/a93805f9-8a6c-4213-b356-e210216b5510.png"
            alt="House of Ichigo logo"
            className="h-8 w-auto"
            loading="lazy"
            width="128"
            height="64"
          />
          <span className="sr-only">House of Ichigo</span>
        </Link>
      </div>
    </header>
  );
}
