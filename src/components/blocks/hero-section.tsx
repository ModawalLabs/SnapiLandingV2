"use client";

import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useScroll, useTransform, motion, AnimatePresence } from "motion/react";

const CATEGORY_LABELS = ["Clothing", "Beauty", "Bags", "Accessories", "Shoes", "Jewelry & watches"] as const;

const SHOPPING_PROMPTS = [
  "Find me a good budget wedding dress",
  "Show me this week's deals on Gucci bags",
  "I need a luxury watch under $2,000",
  "What's trending in designer sneakers right now",
  "Find affordable dupes for Chanel jewelry",
] as const;

const ARROW_BUTTON_SIZE = 34;
const ARROW_BUTTON_GAP = 10;

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const snapiRef = useRef<HTMLHeadingElement>(null);
  const pillRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const chatInputRef = useRef<HTMLInputElement>(null);
  const [vp, setVp] = useState({ w: 1440, h: 900 });
  const [snapiSize, setSnapiSize] = useState({ width: 0, height: 0 });
  const [visiblePillCount, setVisiblePillCount] = useState<number>(CATEGORY_LABELS.length);
  const [promptIndex, setPromptIndex] = useState(0);
  const [typedLength, setTypedLength] = useState(0);
  const [typePhase, setTypePhase] = useState<"typing" | "deleting">("typing");
  const [isCardFocused, setIsCardFocused] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [chatValue, setChatValue] = useState("");

  // Typewriter loop through the shopping prompts — type out, hold, delete, move to next.
  // Paused entirely while the card is focused, so the user can type without the demo text fighting them.
  useEffect(() => {
    if (isCardFocused) return;
    const current = SHOPPING_PROMPTS[promptIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (typePhase === "typing") {
      if (typedLength < current.length) {
        timeout = setTimeout(() => setTypedLength((l) => l + 1), 45);
      } else {
        timeout = setTimeout(() => setTypePhase("deleting"), 1600);
      }
    } else {
      if (typedLength > 0) {
        timeout = setTimeout(() => setTypedLength((l) => l - 1), 22);
      } else {
        timeout = setTimeout(() => {
          setPromptIndex((i) => (i + 1) % SHOPPING_PROMPTS.length);
          setTypePhase("typing");
        }, 300);
      }
    }

    return () => clearTimeout(timeout);
  }, [typePhase, typedLength, promptIndex, isCardFocused]);

  useEffect(() => {
    const update = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Autofocus the real input as soon as the card becomes focused.
  useEffect(() => {
    if (isCardFocused) chatInputRef.current?.focus();
  }, [isCardFocused]);

  // Measure the rendered "Snapi" heading so the glass panel below it can be
  // sized relative to the actual text box (clamp() makes the font fluid).
  useEffect(() => {
    const measure = () => {
      if (snapiRef.current) {
        setSnapiSize({ width: snapiRef.current.offsetWidth, height: snapiRef.current.offsetHeight });
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [vp]);

  // Decide how many category pills actually fit inside the card's inner content
  // width. All pills stay mounted (so they're always measurable, even once
  // hidden) — the ones that don't fit are hidden whole rather than clipped.
  const showSendArrow = isCardFocused && chatValue.length > 0;

  useLayoutEffect(() => {
    const BOX_BORDER = 1.5;
    const BOX_PADDING = 16;
    const boxWidth = snapiSize.width * 1.15;
    let available = boxWidth - BOX_BORDER * 2 - BOX_PADDING * 2;
    if (showSendArrow) available -= ARROW_BUTTON_SIZE + ARROW_BUTTON_GAP;
    const gap = Math.min(7, Math.max(4, vp.w * 0.006)); // matches gap: clamp(4px, 0.6vw, 7px)

    let used = 0;
    let count = 0;
    for (let i = 0; i < CATEGORY_LABELS.length; i++) {
      const w = pillRefs.current[i]?.offsetWidth ?? 0;
      const next = used + w + (i > 0 ? gap : 0);
      if (next > available) break;
      used = next;
      count = i + 1;
    }
    setVisiblePillCount(count);
  }, [vp, snapiSize, showSendArrow]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const BOX_W = 374;
  const BOX_H = vp.h * 0.6;
  const boxLeft = Math.max(24, (vp.w - 1100) / 2);
  const boxTop  = (vp.h - BOX_H) / 2;

  const videoW      = useTransform(scrollYProgress, [0.22, 0.82], [vp.w, BOX_W]);
  const videoH      = useTransform(scrollYProgress, [0.22, 0.82], [vp.h, BOX_H]);
  const videoRadius = useTransform(scrollYProgress, [0.22, 0.82], [0, 20]);
  const videoX      = useTransform(scrollYProgress, [0.22, 0.82], [0, boxLeft]);
  const videoY      = useTransform(scrollYProgress, [0.22, 0.82], [0, boxTop]);
  const overlayOp   = useTransform(scrollYProgress, [0.22, 0.55], [0.45, 0]);

  const newTextOp = useTransform(scrollYProgress, (v) => {
    if (v < 0.84) return 0;
    if (v > 0.97) return 1;
    return (v - 0.84) / (0.97 - 0.84);
  });
  const newTextY = useTransform(scrollYProgress, (v) => {
    if (v < 0.82) return 28;
    if (v > 0.97) return 0;
    return 28 - 28 * ((v - 0.82) / (0.97 - 0.82));
  });

  // Signature label — last to appear
  const signatureOp = useTransform(scrollYProgress, (v) => {
    if (v < 0.93) return 0;
    if (v > 1) return 1;
    return (v - 0.93) / (1 - 0.93);
  });
  const signatureY = useTransform(scrollYProgress, (v) => {
    if (v < 0.91) return 24;
    if (v > 1) return 0;
    return 24 - 24 * ((v - 0.91) / (1 - 0.91));
  });

  // Cards row — staggered slightly after the heading
  const cardsOp = useTransform(scrollYProgress, (v) => {
    if (v < 0.89) return 0;
    if (v > 0.99) return 1;
    return (v - 0.89) / (0.99 - 0.89);
  });
  const cardsY = useTransform(scrollYProgress, (v) => {
    if (v < 0.87) return 32;
    if (v > 0.99) return 0;
    return 32 - 32 * ((v - 0.87) / (0.99 - 0.87));
  });

  const textOp = useTransform(scrollYProgress, (v) => {
    if (v <= 0) return 1;
    if (v >= 0.22) return 0;
    return 1 - v / 0.22;
  });
  const textY = useTransform(scrollYProgress, (v) => {
    if (v <= 0) return 0;
    if (v >= 0.22) return -36;
    return -36 * (v / 0.22);
  });

  return (
    <div id="home" ref={containerRef} style={{ height: "300vh", background: "#000" }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          overflow: "hidden",
          background: "#000",
        }}
      >
        {/* ── Animated video ── */}
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: videoW,
            height: videoH,
            x: videoX,
            y: videoY,
            borderRadius: videoRadius,
            overflow: "hidden",
          }}
        >
          <video
            autoPlay muted loop playsInline
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          >
            <source src="/images/herovid.mov" type="video/mp4" />
          </video>

          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.45)",
              opacity: overlayOp,
            }}
          />
        </motion.div>

        {/* ── Text + cards revealed after video settles ── */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: boxLeft + BOX_W + 60,
            right: 24,
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            paddingTop: boxTop,
            gap: "28px",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          {/* Heading */}
          <motion.h2
            style={{
              fontFamily: "var(--font-oranienbaum), Georgia, serif",
              fontSize: "clamp(1.8rem, 3.2vw, 3.2rem)",
              fontWeight: 400,
              color: "#ffffff",
              letterSpacing: "-0.01em",
              lineHeight: 1.18,
              margin: 0,
              opacity: newTextOp,
              y: newTextY,
            }}
          >
            The more you use it,<br />the smarter it gets.
          </motion.h2>

          {/* Cards row */}
          <motion.div
            style={{
              display: "flex",
              gap: "12px",
              opacity: cardsOp,
              y: cardsY,
              flexWrap: "nowrap",
            }}
          >
            {[
              { brand: "Ralph Lauren", price: "177.00 USD",    image: "/images/card1.png" },
              { brand: "Gucci",        price: "899.00 USD",    image: "/images/card2.png" },
              { brand: "Balenciaga",   price: "1,297.99 USD",  image: "/images/card3.png" },
            ].map((card) => (
              <div
                key={card.brand}
                style={{
                  width: "270px",
                  maxWidth: "270px",
                  height: "360px",
                  maxHeight: "360px",
                  borderRadius: "12px",
                  background: `url(${card.image}) center/cover no-repeat`,
                  border: "1px solid rgba(212,175,100,0.45)",
                  boxShadow: "0 0 22px 6px rgba(212,175,100,0.12), 0 0 60px 12px rgba(212,175,100,0.06), inset 0 1px 0 rgba(212,175,100,0.15)",
                  flexShrink: 0,
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                {/* Bottom gradient for text legibility over future images */}
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)",
                  pointerEvents: "none",
                }} />

                {/* Card info */}
                <div style={{
                  position: "relative",
                  padding: "0 16px 18px",
                }}>
                  <p style={{
                    fontFamily: "var(--font-oranienbaum), Georgia, serif",
                    fontSize: "1.15rem",
                    fontWeight: 400,
                    color: "#ffffff",
                    letterSpacing: "0.04em",
                    margin: "0 0 4px",
                    lineHeight: 1,
                  }}>
                    {card.brand}
                  </p>
                  <p style={{
                    fontSize: "0.78rem",
                    fontWeight: 500,
                    color: "rgba(212,175,100,0.85)",
                    letterSpacing: "0.1em",
                    margin: 0,
                    textTransform: "uppercase",
                  }}>
                    {card.price}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Signature */}
          <motion.div style={{ opacity: signatureOp, y: signatureY }}>
            <p
              style={{
                fontFamily: "var(--font-oranienbaum), Georgia, serif",
                fontSize: "clamp(2.76rem, 4.6vw, 4.83rem)",
                fontWeight: 400,
                color: "transparent",
                background: "linear-gradient(110deg, rgba(212,175,100,0.55) 0%, #fff 40%, rgba(212,175,100,0.45) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                margin: 0,
                lineHeight: 1,
              }}
            >
              Snapi
            </p>
            <p
              style={{
                fontFamily: "var(--font-oranienbaum), Georgia, serif",
                fontSize: "clamp(0.98rem, 1.27vw, 1.27rem)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "rgba(212,175,100,0.6)",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                margin: "6px 0 0 3px",
              }}
            >
              Signature
            </p>
          </motion.div>
        </div>

        {/* ── Hero text ── */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: textOp,
            y: textY,
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <h1
            ref={snapiRef}
            style={{
              fontFamily: "var(--font-oranienbaum), Georgia, serif",
              fontSize: "clamp(5rem, 16vw, 14rem)",
              fontWeight: 400,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#ffffff",
              lineHeight: 1,
              margin: 0,
              textShadow: "0 2px 24px rgba(0,0,0,0.7), 0 8px 48px rgba(0,0,0,0.5)",
            }}
          >
            Snapi
          </h1>

          {/* Glassmorphism panel — sized relative to the measured "Snapi" text box.
              Lives inside the same motion.div as the heading, so it inherits the
              same scroll-linked fade/translate (textOp / textY) as the rest of the hero text.
              The gold ring is a slowly rotating conic-gradient sitting behind an inset glass
              panel — the 1.5px padding on the outer wrapper is what reveals it as a border. */}
          <AnimatePresence>
            {isCardFocused && (
              <motion.div
                key="chat-card-backdrop"
                onClick={() => setIsCardFocused(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  position: "fixed",
                  inset: 0,
                  background: "rgba(0,0,0,0.65)",
                  zIndex: 900,
                  pointerEvents: "auto",
                }}
              />
            )}
          </AnimatePresence>

          {snapiSize.width > 0 && (
            <motion.div
              onClick={() => setIsCardFocused(true)}
              onMouseEnter={() => setIsCardHovered(true)}
              onMouseLeave={() => setIsCardHovered(false)}
              animate={{ scale: isCardFocused ? 1.04 : isCardHovered ? 1.015 : 1 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              style={{
                position: "relative",
                width: snapiSize.width * 1.15,
                marginTop: "1.5rem",
                padding: "1.5px",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: isCardFocused
                  ? "0 0 40px 8px rgba(212,175,100,0.22), 0 0 90px 16px rgba(212,175,100,0.10), 0 20px 60px rgba(0,0,0,0.5)"
                  : isCardHovered
                  ? "0 0 30px 5px rgba(212,175,100,0.18), 0 0 70px 12px rgba(212,175,100,0.08)"
                  : "0 0 24px 4px rgba(212,175,100,0.10), 0 0 60px 10px rgba(212,175,100,0.05)",
                transition: "box-shadow 0.3s ease",
                zIndex: isCardFocused ? 950 : "auto",
                pointerEvents: "auto",
                cursor: isCardFocused ? "default" : "text",
              }}
            >
              <motion.div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "220%",
                  height: "220%",
                  marginTop: "-110%",
                  marginLeft: "-110%",
                  background: "conic-gradient(from 0deg, rgba(212,175,100,0) 0deg, rgba(212,175,100,0) 210deg, rgba(212,175,100,0.25) 265deg, rgba(255,241,214,0.475) 290deg, rgba(212,175,100,0.25) 315deg, rgba(212,175,100,0) 360deg)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
              />
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  padding: "16px",
                  boxSizing: "border-box",
                  borderRadius: "18.5px",
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(28px) saturate(180%)",
                  WebkitBackdropFilter: "blur(28px) saturate(180%)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(255,255,255,0.04)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  gap: "40px",
                }}
              >
                {isCardFocused ? (
                  /* Real input — swapped in once the card is focused, so the user can actually type. */
                  <input
                    ref={chatInputRef}
                    value={chatValue}
                    onChange={(e) => setChatValue(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    placeholder="Ask Snapi anything..."
                    style={{
                      width: "100%",
                      fontSize: "clamp(0.9rem, 2.1vw, 1.2rem)",
                      fontFamily: "inherit",
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.95)",
                      letterSpacing: "0.01em",
                      margin: 0,
                      minHeight: "1.4em",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                    }}
                  />
                ) : (
                  /* Typewriter prompt — cycles through sample AI shopping prompts */
                  <p
                    style={{
                      fontSize: "clamp(0.9rem, 2.1vw, 1.2rem)",
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.85)",
                      letterSpacing: "0.01em",
                      margin: 0,
                      minHeight: "1.4em",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ color: "rgba(212,175,100,0.9)", marginRight: "6px" }}>✦</span>
                    {SHOPPING_PROMPTS[promptIndex].slice(0, typedLength)}
                    <motion.span
                      style={{
                        display: "inline-block",
                        width: "2px",
                        height: "0.95em",
                        background: "rgba(212,175,100,0.9)",
                        marginLeft: "2px",
                      }}
                      animate={{ opacity: [1, 1, 0, 0] }}
                      transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1], ease: "linear" }}
                    />
                  </p>
                )}

                {/* Row holding the category pills (left) and, once the user starts
                    typing, the gold send-arrow button (right margin). */}
                <div style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexWrap: "nowrap", gap: "clamp(4px, 0.6vw, 7px)", pointerEvents: "auto" }}>
                  {CATEGORY_LABELS.map((label, i) => (
                    <a
                      key={label}
                      ref={(el) => { pillRefs.current[i] = el; }}
                      href="#"
                      style={{
                        fontSize: "clamp(0.55rem, 1.4vw, 0.78rem)",
                        fontWeight: 500,
                        color: "rgba(255,255,255,0.75)",
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: "999px",
                        padding: "clamp(4px, 0.5vw, 6px) clamp(8px, 1vw, 12px)",
                        whiteSpace: "nowrap",
                        textDecoration: "none",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        transition: "background 0.2s ease, border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
                        ...(i >= visiblePillCount
                          ? { visibility: "hidden" as const, position: "absolute" as const, pointerEvents: "none" as const }
                          : {}),
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.14)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 6px 14px rgba(0,0,0,0.25)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {label}
                    </a>
                  ))}
                </div>

                <AnimatePresence>
                  {showSendArrow && (
                    <motion.button
                      key="send-arrow"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        width: `${ARROW_BUTTON_SIZE}px`,
                        height: `${ARROW_BUTTON_SIZE}px`,
                        borderRadius: "50%",
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "none",
                        cursor: "pointer",
                        pointerEvents: "auto",
                        background: "linear-gradient(135deg, #f3dfa8, #d4af64 55%, #b8903f)",
                        boxShadow: "0 0 16px 3px rgba(212,175,100,0.45), 0 2px 6px rgba(0,0,0,0.3)",
                        transition: "box-shadow 0.2s ease, transform 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = "0 0 22px 5px rgba(212,175,100,0.65), 0 2px 8px rgba(0,0,0,0.35)";
                        e.currentTarget.style.transform = "scale(1.06)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = "0 0 16px 3px rgba(212,175,100,0.45), 0 2px 6px rgba(0,0,0,0.3)";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </motion.button>
                  )}
                </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}

          <p
            style={{
              fontFamily: "var(--font-oranienbaum), Georgia, serif",
              fontSize: "clamp(1.1rem, 2.4vw, 1.75rem)",
              fontWeight: 400,
              color: "rgba(255,255,255,0.6)",
              textShadow: "0 2px 16px rgba(0,0,0,0.6)",
              letterSpacing: "0.04em",
              marginTop: "1.25rem",
              marginBottom: 0,
            }}
          >
            Curated, effortlessly.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
