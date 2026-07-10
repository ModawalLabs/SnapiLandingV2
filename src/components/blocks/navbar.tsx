"use client";

import { useState, useEffect } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex justify-end"
      style={{ paddingTop: '14px', paddingRight: '5%' }}
    >
      <nav
        style={{
          height: '54px',
          borderRadius: '999px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 10px',
          backdropFilter: 'blur(28px) saturate(180%)',
          WebkitBackdropFilter: 'blur(28px) saturate(180%)',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: scrolled
            ? '0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(255,255,255,0.04)'
            : '0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(255,255,255,0.04)',
          transition: 'background 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
          <a
            href="#"
            style={{
              fontSize: '0.875rem',
              fontWeight: 450,
              color: 'rgba(255,255,255,0.65)',
              textDecoration: 'none',
              padding: '0 14px',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
          >
            Sign in
          </a>
          <a
            href="#"
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#ffffff',
              background: '#0a0a0a',
              textDecoration: 'none',
              padding: '8px 18px',
              borderRadius: '999px',
              letterSpacing: '-0.01em',
              border: '1px solid rgba(212, 175, 100, 0.45)',
              boxShadow: '0 0 24px 8px rgba(212, 175, 100, 0.45), 0 0 48px 16px rgba(212, 175, 100, 0.2)',
              transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.boxShadow = '0 0 32px 12px rgba(212, 175, 100, 0.6), 0 0 64px 24px rgba(212, 175, 100, 0.28)';
              e.currentTarget.style.borderColor = 'rgba(212, 175, 100, 0.65)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = '0 0 24px 8px rgba(212, 175, 100, 0.45), 0 0 48px 16px rgba(212, 175, 100, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(212, 175, 100, 0.45)';
            }}
          >
            <img
              src="/images/logo-dark.png"
              alt="Snapi logo"
              style={{ height: '1.1rem', width: 'auto', display: 'block' }}
            />
            Get started
          </a>
        </div>
      </nav>
    </div>
  );
}
