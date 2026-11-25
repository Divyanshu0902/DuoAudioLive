import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_ORIGIN = 'https://getduoaudio.pages.dev';

const ROUTE_SEO = {
  '/': {
    canonical: `${SITE_ORIGIN}/`,
    robots: 'index, follow',
    title: 'DuoAudio — Share Windows Audio to Multiple Bluetooth Devices',
  },
  '/architecture': {
    canonical: `${SITE_ORIGIN}/architecture`,
    robots: 'index, follow',
    title: 'Architecture & Documentation — DuoAudio',
  },
  '/troubleshooting': {
    canonical: `${SITE_ORIGIN}/troubleshooting`,
    robots: 'index, follow',
    title: 'Troubleshooting Guide — DuoAudio',
  },
  '/download': {
    canonical: null,
    robots: 'noindex, nofollow',
    title: 'Download DuoAudio — Next Steps',
  },
  '/download/next-steps': {
    canonical: null,
    robots: 'noindex, nofollow',
    title: 'Download DuoAudio — Next Steps',
  },
};

const NOT_FOUND_SEO = {
  canonical: null,
  robots: 'noindex, nofollow',
  title: 'Page Not Found — DuoAudio',
};

function normalizePathname(pathname) {
  if (!pathname || pathname === '/') return '/';
  return pathname.replace(/\/+$/, '') || '/';
}

function syncCanonicalTag(href) {
  const existing = Array.from(document.querySelectorAll('link[rel="canonical"]'));

  if (!href) {
    existing.forEach((el) => el.remove());
    return;
  }

  let link = existing[0];
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);

  for (let i = 1; i < existing.length; i += 1) {
    existing[i].remove();
  }
}

function syncRobotsMeta(content) {
  const existing = Array.from(document.querySelectorAll('meta[name="robots"]'));

  let meta = existing[0];
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'robots');
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);

  for (let i = 1; i < existing.length; i += 1) {
    existing[i].remove();
  }
}

/**
 * Synchronizes document title, robots meta, and route-specific canonical URL
 * across client-side navigations while preventing duplicate head tags.
 */
export default function RouteSeo() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const normalizedPath = normalizePathname(pathname);
    const seo = ROUTE_SEO[normalizedPath] || NOT_FOUND_SEO;

    document.title = seo.title;
    syncCanonicalTag(seo.canonical);
    syncRobotsMeta(seo.robots);
  }, [pathname]);

  return null;
}
