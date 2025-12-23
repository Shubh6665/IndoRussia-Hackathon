"use client";

import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // if (pathname?.startsWith("/register")) return;

    gsap.registerPlugin(ScrollTrigger);

    // Always start new routes from the top.
    // (usePathname doesn't change for hash navigation, so in-page anchors still work.)
    try {
      if (typeof window !== "undefined") {
        window.scrollTo(0, 0);
        if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
      }
    } catch {
      // ignore
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    // Ensure Lenis internal state matches the forced top position.
    try {
      lenis.scrollTo(0, { immediate: true });
    } catch {
      // ignore
    }

    lenis.on("scroll", ScrollTrigger.update);

    // Ensure ScrollTrigger measures the final layout (fonts/images/Lenis settle).
    // Without this, pin start/end can be calculated too early and sections appear to “jump”.
    const refresh = () => ScrollTrigger.refresh();
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(refresh);
      // store raf2 in closure for cleanup via cancelAnimationFrame below
      (refresh as any).__raf2 = raf2;
    });

    window.addEventListener("load", refresh, { once: true });
    window.addEventListener("resize", refresh, { passive: true });

    const tickerFn = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerFn);

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerFn);

      window.removeEventListener("resize", refresh);
      window.removeEventListener("load", refresh as any);
      cancelAnimationFrame(raf1);
      const raf2 = (refresh as any).__raf2;
      if (typeof raf2 === "number") cancelAnimationFrame(raf2);
    };
  }, [pathname]);

  return <>{children}</>;
}
