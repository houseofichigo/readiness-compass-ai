import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  robots?: string;
  jsonLd?: Record<string, any> | Record<string, any>[];
}

// Lightweight head manager for Vite apps without extra deps
export function SEO({ title, description, canonical, robots, jsonLd }: SEOProps) {
  useEffect(() => {
    if (typeof document === 'undefined') return;

    // Title
    if (title) document.title = title;

    // Description
    if (description) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }

    // Robots
    if (robots) {
      let meta = document.querySelector('meta[name="robots"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'robots');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', robots);
    }

    // Canonical
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }

    // JSON-LD
    const scriptId = 'page-structured-data';
    const old = document.getElementById(scriptId);
    if (old) old.remove();

    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = scriptId;
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, canonical, robots, JSON.stringify(jsonLd)]);

  return null;
}
