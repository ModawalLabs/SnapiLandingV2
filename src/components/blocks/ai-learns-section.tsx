"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export function AILearnsSection() {
  return (
    <motion.section
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
      {/* ── Bottom-left ambient glow ── */}
      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "-25%",
          width: "60%",
          height: "60%",
          background:
            "radial-gradient(ellipse at center, rgba(220,38,38,0.25) 0%, rgba(220,38,38,0.11) 45%, transparent 72%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <h2
        style={{
          fontFamily: "var(--font-oranienbaum), Georgia, serif",
          fontSize: "clamp(1.1rem, 2.2vw, 2rem)",
          fontWeight: 400,
          color: "#ffffff",
          letterSpacing: "-0.01em",
          lineHeight: 1.05,
          textAlign: "center",
          margin: "0 0 0.4em",
        }}
      >
        AI That Learns
      </h2>

      <p
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "clamp(2.2rem, 5.5vw, 5.5rem)",
          fontWeight: 700,
          letterSpacing: "0.01em",
          textAlign: "center",
          margin: "0 0 56px",
          backgroundImage: "url('/images/0_Wind_Flowing_1280x720-ezgif.com-video-to-gif-converter.gif')",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        What You Crave For.
      </p>

      {/* ── Cards row ── */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "stretch",
          width: "100%",
          maxWidth: "1118px",
          padding: "0 24px",
        }}
      >
        {/* Left column — 2 rectangle cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", flex: 1 }}>
          {[
            { heading: "Shop With Purpose", desc: "Style that feels good. Sourcing you can trust.", image: "/images/purpose.png" },
            { heading: "Stay Ahead", desc: "Track trending styles and balance what matters. Avoid unnecessary hype and focus on what lasts.", image: "/images/stayahead.png" },
          ].map((card) => (
            <div
              key={card.heading}
              style={{
                flex: 1,
                minHeight: "234px",
                borderRadius: "16px",
                background: `url(${card.image}) center/cover no-repeat`,
                border: "1px solid rgba(212,175,100,0.3)",
                boxShadow: "0 0 24px 4px rgba(212,175,100,0.07), inset 0 1px 0 rgba(255,255,255,0.06)",
                padding: "28px 32px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)", pointerEvents: "none" }} />
              <div style={{ position: "relative", zIndex: 1 }}>
                <p style={{
                  fontFamily: "var(--font-oranienbaum), Georgia, serif",
                  fontSize: "clamp(1.2rem, 1.8vw, 1.7rem)",
                  fontWeight: 400,
                  color: "#ffffff",
                  letterSpacing: "0.01em",
                  margin: "0 0 10px",
                  lineHeight: 1.1,
                }}>
                  {card.heading}
                </p>
                <p style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "clamp(0.78rem, 1vw, 0.95rem)",
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.65,
                  margin: 0,
                }}>
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right column — 1 square card */}
        <div
          style={{
            aspectRatio: "1 / 1",
            width: "494px",
            flexShrink: 0,
            borderRadius: "16px",
            background: "url(/images/luxurycurated.png) center/cover no-repeat",
            border: "1px solid rgba(212,175,100,0.3)",
            boxShadow: "0 0 24px 4px rgba(212,175,100,0.07), inset 0 1px 0 rgba(255,255,255,0.06)",
            padding: "36px 40px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.2) 55%, transparent 100%)", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{
              fontFamily: "var(--font-oranienbaum), Georgia, serif",
              fontSize: "clamp(1.6rem, 2.6vw, 2.6rem)",
              fontWeight: 400,
              color: "#ffffff",
              letterSpacing: "0.01em",
              margin: "0 0 14px",
              lineHeight: 1.1,
            }}>
              Luxury, curated.
            </p>
            <p style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "clamp(0.82rem, 1.05vw, 1rem)",
              fontWeight: 400,
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.7,
              margin: "0 0 24px",
            }}>
              Premium brands and pieces with a focus on design and exclusivity. No clutter—only elevated choices.
            </p>

            {/* CTA button */}
            <div style={{ position: "relative", display: "inline-flex" }}>
              <div style={{
                position: "absolute",
                inset: "-18px -28px",
                background: "radial-gradient(ellipse at center, rgba(255,195,80,0.37) 0%, rgba(255,165,40,0.18) 45%, transparent 70%)",
                pointerEvents: "none",
                borderRadius: "999px",
              }} />
              <button style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                background: "transparent",
                border: "none",
                borderRadius: "999px",
                padding: "5px 5px 5px 28px",
                cursor: "pointer",
                width: "180px",
                boxShadow: "0 0 28px 10px rgba(255,190,60,0.29), 0 0 56px 20px rgba(255,160,30,0.13)",
              }}>
                <span style={{
                  flex: 1,
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#ffffff",
                  letterSpacing: "0.01em",
                  whiteSpace: "nowrap",
                }}>
                  Explore Snapi
                </span>
                <span style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  background: "#000000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <ArrowRight size={16} color="#ffffff" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
