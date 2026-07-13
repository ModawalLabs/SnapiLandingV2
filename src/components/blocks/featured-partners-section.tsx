"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

// All values are fractions of the headline's measured bounding box.
// offset.top/left: position from headline top-left corner (proportion of hl.height / hl.width)
// size.w/h:        card dimensions as proportion of hl.height (keeps cards proportional to text)
// Tuned at 1440×900 — scale automatically at any viewport.
const CARDS = {
  hermes: {
    offset: { top: -0.228, left: 0.232 },
    size:   { w: 0.325,   h: 0.368  },
    rotate: "rotate(-13deg)",
    zIndex: 0,
    img:    { src: "/images/hermes.png", alt: "Hermes", style: {} },
  },
  gucci: {
    offset: { top: 0.366, left: 0.450 },
    size:   { w: 0.295,   h: 0.295  },
    rotate: "rotate(45deg)",
    zIndex: 10,
    img:    { src: "/images/gucci.png", alt: "Gucci", style: { transform: "rotate(-45deg)" } },
  },
  versace: {
    offset: { top: 0.85, left: 0.566 },
    size:   { w: 0.27378,   h: 0.30294  },
    rotate: "rotate(7deg)",
    zIndex: 0,
    img:    { src: "/images/versace.png", alt: "Versace", style: {} },
  },
} as const;

interface HLRect { top: number; left: number; width: number; height: number }

export function FeaturedPartnersSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const [hl, setHl] = useState<HLRect | null>(null);

  const measure = useCallback(() => {
    const section  = sectionRef.current;
    const headline = headlineRef.current;
    if (!section || !headline) return;
    const sr = section.getBoundingClientRect();
    const hr = headline.getBoundingClientRect();
    setHl({
      top:    hr.top    - sr.top,
      left:   hr.left   - sr.left,
      width:  hr.width,
      height: hr.height,
    });
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    const section  = sectionRef.current;
    const headline = headlineRef.current;
    if (section)  ro.observe(section);
    if (headline) ro.observe(headline);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, [measure]);

  const cardGeometry = (key: keyof typeof CARDS) => {
    const { offset, size } = CARDS[key];
    if (!hl) return { top: "28%", left: "34%", width: "129px", height: "146px" };
    return {
      top:    `${hl.top    + offset.top  * hl.height}px`,
      left:   `${hl.left   + offset.left * hl.width}px`,
      width:  `${size.w * hl.height}px`,
      height: `${size.h * hl.height}px`,
    };
  };

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.85, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "#080808",
        overflow: "hidden",
      }}
    >
      {/* ── Purple ambient glow ── */}
      <div
        style={{
          position: "absolute",
          bottom: "-5%",
          right: "-10%",
          width: "60%",
          height: "60%",
          background:
            "radial-gradient(ellipse at center, rgba(109,40,217,0.25) 0%, rgba(124,58,237,0.11) 45%, transparent 72%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Watermark + headline stacked in one centered column ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 1,
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <p
          aria-hidden
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "clamp(4rem, 11vw, 12rem)",
            fontWeight: 800,
            color: "rgba(255,255,255,0.045)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            lineHeight: 1,
            margin: "0 0 0.1em",
            whiteSpace: "nowrap",
            transform: "translateY(50px)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "destination-in",
          }}
        >
          THE BEST LUXURY
        </p>

        <h2
          ref={headlineRef}
          style={{
            fontFamily: "var(--font-oranienbaum), Georgia, serif",
            fontSize: "clamp(5.5rem, 13.5vw, 15rem)",
            fontWeight: 400,
            lineHeight: 0.92,
            letterSpacing: "-0.01em",
            textAlign: "center",
            background:
              "linear-gradient(125deg, #f97316 0%, #dc2626 28%, #a855f7 62%, #7c3aed 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            margin: 0,
          }}
        >
          FEATURED<br />PARTNERS
        </h2>

        <p
          aria-hidden
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "clamp(4rem, 11vw, 12rem)",
            fontWeight: 800,
            color: "rgba(255,255,255,0.045)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            lineHeight: 1,
            margin: "0.1em 0 0",
            whiteSpace: "nowrap",
            transform: "translateY(-50px)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "destination-in",
          }}
        >
          EXPERIENCE
        </p>
      </div>

      {/* ── Floating brand cards ── */}
      {(Object.keys(CARDS) as (keyof typeof CARDS)[]).map((key) => {
        const card = CARDS[key];
        const geom = cardGeometry(key);
        return (
          <div
            key={key}
            style={{
              position: "absolute",
              ...geom,
              borderRadius: "12%",
              transform: card.rotate,
              background: "#FFFFFF",
              border: "1.5px solid rgba(212,175,100,0.65)",
              boxShadow:
                "0 0 20px 5px rgba(212,175,100,0.2), 0 0 50px 10px rgba(212,175,100,0.08), 0 12px 40px rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: card.zIndex,
              overflow: "hidden",
            }}
          >
            <img
              src={card.img.src}
              alt={card.img.alt}
              style={{ width: "100%", height: "100%", objectFit: "cover", ...card.img.style }}
            />
          </div>
        );
      })}

      {/* ── Bottom: description + CTA  ── */}
      <div
        style={{
          position: "absolute",
          bottom: "60px",
          left: "50%",
          transform: "translateX(-50%)",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
          alignItems: "center",
          zIndex: 10,
        }}
      >
        <p
          style={{
            color: "rgba(229,231,235,0.75)",
            fontSize: "0.95rem",
            lineHeight: 1.75,
            margin: "0 0 22px",
          }}
        >
          <span style={{ color: "#f97316", fontWeight: 600 }}>AI</span>{" "}
          that understands style, exclusivity &amp; craftsmanship.
          Style-first recommendations that match your Signature profile.
        </p>

        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            margin: "0 auto",
            background: "linear-gradient(180deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.01) 100%)",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: "999px",
            padding: "8px 22px 8px 8px",
            color: "#fff",
            cursor: "pointer",
            fontSize: "0.88rem",
            letterSpacing: "0.01em",
            boxShadow:
              "0 0 18px 4px rgba(168,85,247,0.18), 0 0 36px 8px rgba(249,115,22,0.08), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.35)",
          }}
        >
          <span
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #f97316 0%, #a855f7 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <ArrowUpRight size={15} color="#fff" />
          </span>
          The Future of Smart Shopping
        </button>
      </div>
    </motion.section>
  );
}
