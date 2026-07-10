"use client";

import { FadeIn } from "@/components/ui/fade-in";

export function SmartSection() {
  return (
    <section
      style={{
        background: '#000000',
        height: '100vh',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          width: '100%',
          margin: '0 auto',
          height: '60%',
          display: 'flex',
          alignItems: 'stretch',
        }}
      >
        <FadeIn style={{ height: '100%' }}>
          <div
            style={{
              width: '374px',
              height: '100%',
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          />
        </FadeIn>
      </div>
    </section>
  );
}
