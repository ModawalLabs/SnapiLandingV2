"use client";

import { motion } from "motion/react";

export function OnePlatformSection() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.85, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#080808",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* ── Red glow — bottom right ── */}
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          right: "-10%",
          width: "60%",
          height: "60%",
          background: "radial-gradient(ellipse at center, rgba(220,38,38,0.25) 0%, rgba(220,38,38,0.11) 45%, transparent 72%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Purple glow — bottom left ── */}
      <div
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "-10%",
          width: "60%",
          height: "60%",
          background: "radial-gradient(ellipse at center, rgba(109,40,217,0.25) 0%, rgba(124,58,237,0.11) 45%, transparent 72%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <h2
        style={{
          position: "relative",
          zIndex: 1,
          fontFamily: "var(--font-oranienbaum), Georgia, serif",
          fontSize: "clamp(2.4rem, 6.4vw, 7.2rem)",
          fontWeight: 400,
          letterSpacing: "-0.01em",
          lineHeight: 1.05,
          textAlign: "center",
          margin: 0,
          background: "linear-gradient(135deg, #F59E0B 0%, #F8D594 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        One Shopping Platform
      </h2>

      <p
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "clamp(1.2rem, 2.4vw, 1.92rem)",
          fontWeight: 300,
          color: "rgba(255,255,255,0.7)",
          letterSpacing: "0.02em",
          textAlign: "center",
          margin: "20px 0 56px",
        }}
      >
        Powerful Personas
      </p>

      {/* ── Cards row ── */}
      <div
        style={{
          display: "flex",
          gap: "32px",
          width: "100%",
          maxWidth: "1430px",
          padding: "0 24px",
        }}
      >
        {[
          {
            glow: "rgba(34,197,94,0.42)", glowFar: "rgba(34,197,94,0.14)", image: "/images/p1.png",
            heading: (
              <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "clamp(1.14rem, 1.68vw, 1.44rem)", fontWeight: 700, color: "#fff", margin: "0 0 6px", lineHeight: 1.2 }}>
                The <span style={{ color: "#22c55e" }}>Best Deals</span><br />All In One Place
              </p>
            ),
            tagline: <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.94rem", fontWeight: 400, color: "#ffffff", margin: 0, opacity: 0.85 }}>Discover Hot offers and daily discounts !</p>,
          },
          {
            glow: "rgba(212,175,100,0.48)", glowFar: "rgba(212,175,100,0.17)", image: "/images/p2.png",
            heading: (
              <p style={{ fontFamily: "var(--font-oranienbaum), Georgia, serif", fontSize: "clamp(1.32rem, 1.92vw, 1.74rem)", fontWeight: 400, color: "#ffffff", margin: "0 0 6px", lineHeight: 1.2, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Snapi Signature
              </p>
            ),
            tagline: <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.14rem", fontWeight: 400, fontStyle: "italic", color: "rgba(212,175,100,0.9)", margin: 0 }}>Curated luxury, tailored to you</p>,
          },
          {
            glow: "rgba(0,200,255,0.46)", glowFar: "rgba(0,200,255,0.14)", image: "/images/p3.png",
            heading: (
              <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "clamp(1.14rem, 1.68vw, 1.44rem)", fontWeight: 700, color: "#fff", margin: "0 0 6px", lineHeight: 1.2 }}>
                One <span style={{ color: "#00e5ff" }}>Platform.</span><br /><span style={{ color: "#00e5ff" }}>Infinite</span> Choices !
              </p>
            ),
            tagline: <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.94rem", fontWeight: 400, color: "#ffffff", margin: 0, opacity: 0.85 }}>If it exists, it&apos;s here.</p>,
          },
        ].map((card, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              height: "208px",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.18)",
              boxShadow: `inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.15), inset 1px 0 0 rgba(255,255,255,0.12), inset -1px 0 0 rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.2), 0 0 18px 4px ${card.glow}, 0 0 48px 12px ${card.glowFar}`,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img src={card.image} alt={`card ${i + 1}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            {/* Bottom gradient overlay */}
            <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", pointerEvents: "none" }} />
            {/* Text */}
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", padding: "0 18px", textAlign: "left" }}>
              {card.heading}
              {card.tagline}
            </div>
          </div>
        ))}
      </div>

      <p
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
          fontWeight: 400,
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "0.01em",
          lineHeight: 1.75,
          textAlign: "center",
          maxWidth: "560px",
          margin: "64px 0 0",
          padding: "0 24px",
        }}
      >
        Snapi's AI analyzes your shopping pattern, preferences, and lifestyle to create your unique shopping persona.
      </p>
    </motion.section>
  );
}
