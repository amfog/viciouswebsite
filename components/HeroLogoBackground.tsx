"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Ambient background mark for the hero. Two image layers extracted from
 * the same source canvas (public/images/logo/wordmark.png and
 * eyes-glow.png), so they overlay pixel-perfectly:
 *   - wings: static, ~6% opacity, never animates
 *   - eyes: independently animated (breathe / flicker / periodic pulse /
 *     occasional scan sweep), all pure CSS keyframes — see globals.css
 *
 * Cursor parallax is the only piece that needs JS: it lerps toward the
 * pointer position via requestAnimationFrame and writes directly to
 * refs' style.transform, so it never triggers a React re-render.
 *
 * Fully inert under prefers-reduced-motion: the parallax loop doesn't
 * start, and the CSS keyframes are gated behind
 * `@media (prefers-reduced-motion: no-preference)` in globals.css.
 */
export function HeroLogoBackground() {
  const stageRef = useRef<HTMLDivElement>(null);
  const eyesRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let targetX = 0;
    let targetY = 0;
    let stageX = 0;
    let stageY = 0;
    let eyesX = 0;
    let eyesY = 0;
    let raf = 0;

    const STAGE_RANGE = 13; // px — logo parallax travel
    const EYES_EXTRA = 2.5; // px — additional independent eye travel

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2; // -1..1
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      targetX = nx * STAGE_RANGE;
      targetY = ny * STAGE_RANGE;
    };

    const loop = () => {
      stageX += (targetX - stageX) * 0.06;
      stageY += (targetY - stageY) * 0.06;
      eyesX += (targetX * (EYES_EXTRA / STAGE_RANGE) - eyesX) * 0.08;
      eyesY += (targetY * (EYES_EXTRA / STAGE_RANGE) - eyesY) * 0.08;

      if (stageRef.current) {
        stageRef.current.style.transform = `translate3d(${stageX}px, ${stageY}px, 0)`;
      }
      if (eyesRef.current) {
        eyesRef.current.style.transform = `translate3d(${eyesX}px, ${eyesY}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [prefersReducedMotion]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden"
      aria-hidden="true"
    >
      <div
        ref={stageRef}
        className="relative"
        style={{ width: "clamp(440px, 62vw, 920px)", aspectRatio: "1 / 1" }}
      >
        {/* Static wings — never animates */}
        <img
          src="/images/logo/wordmark.png"
          alt=""
          draggable={false}
          className="logo-wings absolute inset-0 h-full w-full select-none object-contain"
        />

        {/* Independently animated eyes layer */}
        <div ref={eyesRef} className="absolute inset-0">
          <div className="eyes-flicker absolute inset-0">
            <img
              src="/images/logo/eyes-glow.png"
              alt=""
              draggable={false}
              className="eyes-breathe absolute inset-0 h-full w-full select-none object-contain"
            />
          </div>

          {/* Periodic energy pulse — separate layer so it doesn't fight the breathing animation */}
          <img
            src="/images/logo/eyes-glow.png"
            alt=""
            draggable={false}
            className="eyes-pulse absolute inset-0 h-full w-full select-none object-contain"
          />

          {/* Occasional scan sweep, clipped to the logo silhouette via mask */}
          <div
            className="scan-sweep absolute inset-0"
            style={{
              maskImage: "url(/images/logo/wordmark.png)",
              WebkitMaskImage: "url(/images/logo/wordmark.png)",
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
