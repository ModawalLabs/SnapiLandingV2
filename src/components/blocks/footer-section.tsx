"use client";

import { useState } from "react";
import { motion } from "motion/react";

type Modal = "terms" | "privacy" | null;

const MODAL_CONTENT: Record<"terms" | "privacy", { title: string; body: string }> = {
  terms: {
    title: "Terms & Conditions",
    body: `Welcome to Snapi. By accessing or using our platform, you agree to be bound by these Terms & Conditions.

1. Use of Service
Snapi grants you a limited, non-exclusive, non-transferable license to use the platform for personal, non-commercial purposes.

2. Account Responsibility
You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.

3. Intellectual Property
All content, features, and functionality on Snapi — including text, graphics, logos, and software — are the exclusive property of Snapi and protected by applicable intellectual property laws.

4. Prohibited Conduct
You agree not to misuse the platform, attempt unauthorized access, or engage in any activity that disrupts or interferes with the service.

5. Limitation of Liability
Snapi shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform.

6. Changes to Terms
We reserve the right to modify these Terms at any time. Continued use of the platform constitutes acceptance of the updated Terms.`,
  },
  privacy: {
    title: "Privacy Policy",
    body: `At Snapi, your privacy matters. This policy explains how we collect, use, and protect your personal information.

1. Information We Collect
We collect information you provide directly (name, email, preferences) and data generated through your use of the platform (browsing behavior, purchase history).

2. How We Use Your Information
Your data is used to personalize your shopping experience, improve our AI recommendations, send updates, and provide customer support.

3. Data Sharing
We do not sell your personal information. We may share data with trusted partners who assist in operating the platform, subject to strict confidentiality agreements.

4. Cookies
Snapi uses cookies and similar technologies to enhance your experience and analyze platform performance. You may adjust cookie preferences in your browser settings.

5. Data Security
We implement industry-standard security measures to protect your information against unauthorized access, alteration, or disclosure.

6. Your Rights
You have the right to access, correct, or delete your personal data at any time by contacting us.

7. Contact
For privacy-related questions, reach out to us at privacy@snapi.com.`,
  },
};

export function FooterSection() {
  const [activeModal, setActiveModal] = useState<Modal>(null);

  return (
    <>
      <motion.footer
        id="contact"
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.85, ease: [0.21, 0.47, 0.32, 0.98] }}
        style={{
          position: "relative",
          width: "100%",
          background: "#080808",
          overflow: "hidden",
        }}
      >
        {/* ── Footer image ── */}
        <img
          src="/images/footer.png"
          alt="Footer"
          style={{ display: "block", width: "100%", height: "auto" }}
        />

        {/* ── Footer content ── */}
        <div
          style={{
            width: "100%",
            padding: "64px 40px 0",
            display: "flex",
            flexDirection: "row",
            alignItems: "stretch",
            justifyContent: "space-between",
            gap: "80px",
          }}
        >
          {/* ── Left block: branding ── */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            {/* SNAPI Signature */}
            <img
              src="/images/logo-tagline.png"
              alt="Snapi — Signature"
              style={{ height: "50%", width: "auto", display: "block" }}
            />
          </div>

          {/* ── Our Story ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginTop: "2%" }}>
            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              Our Story
            </p>
            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.92rem",
                fontWeight: 400,
                color: "rgba(255,255,255,0.6)",
                lineHeight: 1.75,
                letterSpacing: "0.01em",
                margin: 0,
              }}
            >
              Snapi began with a simple idea: shopping should feel like a
              conversation, not a search. We built an AI that understands
              taste from a weekend budget find to a rare designer piece
              so every request becomes a curated discovery, not a scroll.
            </p>
          </div>
        </div>

        {/* ── Bottom legal links ── */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "32px",
            padding: "0 24px 40px",
          }}
        >
          {(["Terms & Conditions", "Privacy Policy"] as const).map((item) => (
            <button
              key={item}
              onClick={() => setActiveModal(item === "Terms & Conditions" ? "terms" : "privacy")}
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.8rem",
                fontWeight: 400,
                color: "rgba(255,255,255,0.35)",
                background: "none",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.02em",
                padding: 0,
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </motion.footer>

      {/* ── Modal ── */}
      {activeModal && (
        <div
          onClick={() => setActiveModal(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.72)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#111113",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "20px",
              padding: "40px 48px",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "80vh",
              overflowY: "auto",
              boxShadow: "0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
              position: "relative",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveModal(null)}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                color: "rgba(255,255,255,0.6)",
                cursor: "pointer",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
              }}
            >
              ×
            </button>

            <h2
              style={{
                fontFamily: "var(--font-oranienbaum), Georgia, serif",
                fontSize: "1.8rem",
                fontWeight: 400,
                color: "#ffffff",
                margin: "0 0 24px",
                letterSpacing: "0.01em",
              }}
            >
              {MODAL_CONTENT[activeModal].title}
            </h2>

            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.9rem",
                fontWeight: 400,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.85,
                margin: 0,
                whiteSpace: "pre-line",
              }}
            >
              {MODAL_CONTENT[activeModal].body}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
