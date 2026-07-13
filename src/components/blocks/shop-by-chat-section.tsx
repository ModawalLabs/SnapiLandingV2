"use client";

import { FadeIn } from "@/components/ui/fade-in";

export function ShopByChatSection() {
  return (
    <section
      style={{
        background: "#000000",
        padding: "140px 24px",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>

        {/* <FadeIn>
          <p
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "rgba(212,175,100,0.85)",
              margin: "0 0 20px",
            }}
          >
            See Snapi in action
          </p>
        </FadeIn> */}

        <FadeIn delay={0.1}>
          <h2
            style={{
              fontFamily: "var(--font-oranienbaum), Georgia, serif",
              fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)",
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: "-0.01em",
              color: "#ffffff",
              margin: "0 0 24px",
            }}
          >
            Ask anything.<br />Shop everything.
          </h2>
        </FadeIn>

        <FadeIn delay={0.3}>
          {/* Placeholder product still — swap the <img> for a <video> element once the clip is ready. */}
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "1440 / 1024",
              boxSizing: "border-box",
              padding: "16px",
              borderRadius: "20px",
              overflow: "hidden",
              border: "1.5px solid rgba(212,175,100,0.5)",
              boxShadow: "0 0 40px 6px rgba(212,175,100,0.08), 0 30px 80px rgba(0,0,0,0.55)",
            }}
          >
            <img
              src="/images/Desktop1.png"
              alt="Snapi product preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                borderRadius: "10px",
                maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
              }}
            />
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
