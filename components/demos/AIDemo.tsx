"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Step = {
  title: string;
  subtitle: string;
};

const steps: Step[] = [
  { title: "Ingest", subtitle: "Collect signals" },
  { title: "Train", subtitle: "Tune model" },
  { title: "Infer", subtitle: "Run pipeline" },
  { title: "Deliver", subtitle: "Stream output" },
];

const demoPrompt =
  "Build a multilingual assistant for Indo–Russia teams: summarize tasks, translate updates, and suggest next actions.";

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export default function AIDemo() {
  const reducedMotion = usePrefersReducedMotion();

  const rootRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  const [prompt, setPrompt] = useState(demoPrompt);
  const [busy, setBusy] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [output, setOutput] = useState<string>(
    "Type a prompt and run the pipeline to see a live demo."
  );

  const [idleDemoEnabled, setIdleDemoEnabled] = useState(true);
  const lastInteractionRef = useRef<number>(Date.now());

  const outputText = useMemo(() => {
    return (
      "Draft plan:\n" +
      "1) Ingest updates from tasks/issues\n" +
      "2) Translate EN ⇄ HI ⇄ RU\n" +
      "3) Summarize daily progress + risks\n" +
      "4) Recommend next actions + owners\n\n" +
      "Example output:\n" +
      "• Status: On track\n" +
      "• Risks: payment gateway integration blockers\n" +
      "• Next: schedule RU/IN mentor review, finalize dataset, run eval"
    );
  }, []);

  const russianOutputText = useMemo(() => {
    return (
      "Проект плана:\n" +
      "1) Получение обновлений из задач\n" +
      "2) Перевод EN ⇄ HI ⇄ RU\n" +
      "3) Сводка ежедневного прогресса и рисков\n" +
      "4) Рекомендации по следующим шагам\n\n" +
      "Пример вывода:\n" +
      "• Статус: В графике\n" +
      "• Риски: блокировка интеграции платежного шлюза\n" +
      "• Далее: запланировать обзор с ментором RU/IN"
    );
  }, []);

  useEffect(() => {
    if (!lineRef.current) return;
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });
  }, []);

  useEffect(() => {
    const onAny = () => {
      lastInteractionRef.current = Date.now();
      setIdleDemoEnabled(false);
    };
    window.addEventListener("pointerdown", onAny, { passive: true });
    window.addEventListener("keydown", onAny);
    return () => {
      window.removeEventListener("pointerdown", onAny);
      window.removeEventListener("keydown", onAny);
    };
  }, []);

  async function animateRun() {
    if (busy) return;
    setBusy(true);
    setOutput("Initializing pipeline…");
    setActiveStep(-1);

    if (!reducedMotion) {
      gsap.killTweensOf([lineRef.current, cardsRef.current]);
      gsap.to(cardsRef.current, {
        y: -6,
        duration: 0.6,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      });
      gsap.to(lineRef.current, {
        scaleX: 1,
        duration: 1.2,
        ease: "power2.inOut",
      });
    }

    for (let i = 0; i < steps.length; i++) {
      setActiveStep(i);
      setOutput(`${steps[i].title}: ${steps[i].subtitle}…`);

      const el = stepRefs.current[i];
      if (el && !reducedMotion) {
        gsap.fromTo(
          el,
          { scale: 0.98, opacity: 0.6 },
          { scale: 1.5, opacity: 1, duration: 0.35, ease: "power3.out" }
        );
        gsap.to(el, { scale: 1, duration: 0.35, delay: 0.35, ease: "power3.in" });
      }

      await sleep(520);
    }

    // Stream output text
    const isRussian = prompt.toLowerCase().includes("russian") || prompt.toLowerCase().includes("translate");
    const final = isRussian ? russianOutputText : outputText;
    setOutput("");

    if (reducedMotion) {
      setOutput(final);
      setBusy(false);
      return;
    }

    let idx = 0;
    const tick = () => {
      idx += Math.max(2, Math.floor(final.length / 120));
      setOutput(final.slice(0, idx));
      if (idx < final.length) requestAnimationFrame(tick);
      else setBusy(false);
    };

    requestAnimationFrame(tick);
  }

  useEffect(() => {
    if (reducedMotion) return;
    if (!idleDemoEnabled) return;

    const timer = window.setInterval(() => {
      const idleFor = Date.now() - lastInteractionRef.current;
      if (idleFor < 2800) return;

      // Subtle idle shimmer on cards
      gsap.to(cardsRef.current, {
        rotateZ: 0.35,
        duration: 0.8,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      });
    }, 1200);

    return () => window.clearInterval(timer);
  }, [idleDemoEnabled, reducedMotion]);

  function onMouseMove(e: React.MouseEvent) {
    const el = rootRef.current;
    if (!el || reducedMotion) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const rx = (py - 0.5) * -6;
    const ry = (px - 0.5) * 8;

    gsap.to(cardsRef.current, {
      rotateX: rx,
      rotateY: ry,
      transformPerspective: 800,
      transformOrigin: "center",
      duration: 0.35,
      ease: "power2.out",
    });
  }

  function onMouseLeave() {
    if (reducedMotion) return;
    gsap.to(cardsRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  }

  return (
    <div
      ref={rootRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative w-full max-w-[720px]"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-14 -left-14 h-56 w-56 rounded-full bg-orange-500/10 blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-14 -right-14 h-56 w-56 rounded-full bg-blue-500/10 blur-[80px]" />

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />

        <div className="relative p-5 md:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/50">
                AI Field Demo
              </p>
              <p className="mt-1 font-serif text-xl text-white/90">
                Live pipeline preview
              </p>
            </div>

            <button
              onClick={animateRun}
              disabled={busy}
              className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs uppercase tracking-[0.22em] text-white/90 transition hover:bg-white/10 disabled:opacity-50"
            >
              {busy ? "Running" : "Run"}
            </button>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
            {/* Prompt */}
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <div className="flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/50">
                  Prompt
                </p>
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">
                  Interactive
                </p>
              </div>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onFocus={() => setIdleDemoEnabled(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    animateRun();
                  }
                }}
                placeholder="Ask the model…"
                className="mt-3 h-28 w-full resize-none bg-transparent font-sans text-sm leading-6 text-white/85 outline-none placeholder:text-white/25"
              />
              <div className="mt-3 flex items-center justify-between">
                <p className="text-xs text-white/35">
                  Tip: Try “translate this update to Russian”.
                </p>
                <button
                  onClick={() => setPrompt(demoPrompt)}
                  className="text-xs text-white/60 hover:text-white"
                  type="button"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Flow */}
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/50">
                Pipeline
              </p>
              <div className="relative mt-4">
                <div className="absolute left-0 right-0 top-[11px] h-px bg-white/10" />
                <div
                  ref={lineRef}
                  className="absolute left-0 top-[11px] h-px w-full bg-gradient-to-r from-orange-300/80 via-white/60 to-blue-300/80"
                />

                <div className="grid grid-cols-4 gap-2">
                  {steps.map((s, idx) => (
                    <div key={s.title} className="flex flex-col items-center">
                      <div
                        ref={(el) => {
                          stepRefs.current[idx] = el;
                        }}
                        className={
                          "h-6 w-6 rounded-full border border-white/15 bg-black/60 " +
                          (activeStep >= idx
                            ? "shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_0_32px_rgba(255,255,255,0.12)]"
                            : "opacity-60")
                        }
                      >
                        <div
                          className={
                            "h-full w-full rounded-full transition-colors duration-300 " +
                            (activeStep >= idx
                              ? idx === 0
                                ? "bg-orange-400 shadow-[0_0_15px_rgba(251,146,60,0.6)]"
                                : idx === 3
                                  ? "bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.6)]"
                                  : "bg-white shadow-[0_0_15px_rgba(255,255,255,0.6)]"
                              : "bg-transparent")
                          }
                        />
                      </div>
                      <div className="mt-3 text-center">
                        <p className="text-[10px] uppercase tracking-[0.22em] text-white/70">
                          {s.title}
                        </p>
                        <p className="mt-1 text-[11px] text-white/35">
                          {s.subtitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating “working” cards */}
          <div className="mt-4 grid gap-4 md:grid-cols-[0.95fr_1.05fr]">
            <div
              ref={cardsRef}
              className="relative rounded-2xl border border-white/10 bg-black/25 p-4 [transform-style:preserve-3d]"
            >
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/50">
                Working View
              </p>

              <div className="mt-4 space-y-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white/85">Improve keyboard shortcuts</p>
                    <span className="rounded-full bg-orange-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.22em] text-orange-200">
                      Urgent
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-white/45">
                    Suggested: add RU/HI quick actions + hover preview.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-white/80">Update payment gateway integration</p>
                    <span className="rounded-full bg-blue-500/10 px-2 py-1 text-[10px] uppercase tracking-[0.22em] text-blue-200">
                      On track
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-white/45">
                    Model finds blockers and proposes owners.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 max-h-[150px] overflow-y-auto custom-scrollbar">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/50 sticky top-0 bg-black/20 backdrop-blur-sm py-1">
                    Output
                  </p>
                  <pre className="mt-2 whitespace-pre-wrap font-sans text-xs leading-5 text-white/70">
                    {output}
                  </pre>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/50">
                What this shows
              </p>
              <p className="mt-3 font-serif text-2xl text-white/90">
                Real interaction, not a screenshot.
              </p>
              <p className="mt-3 text-sm leading-7 text-white/55">
                This panel is a live demo area: your prompt drives a staged pipeline
                animation, then streams a formatted result. It’s the same “working
                product” vibe you saw on premium landing pages.
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                    Smooth
                  </p>
                  <p className="mt-2 text-sm text-white/75">Scroll + micro motion</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                  <p className="text-[11px] uppercase tracking-[0.22em] text-white/55">
                    Premium
                  </p>
                  <p className="mt-2 text-sm text-white/75">Glass, depth, glow</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-white/35">
              {reducedMotion
                ? "Reduced motion enabled. Animations are simplified."
                : "Hover the demo for depth. Click Run for animation."}
            </p>
            <button
              className="text-xs text-white/60 hover:text-white"
              type="button"
              onClick={() => {
                setIdleDemoEnabled(true);
                lastInteractionRef.current = Date.now();
              }}
            >
              Enable idle sparkle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
