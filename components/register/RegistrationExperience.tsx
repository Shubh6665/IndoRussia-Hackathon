"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import confetti from "canvas-confetti";
import { CheckCircle2 } from "lucide-react";

type ParticipationMode = "solo" | "team" | "";
type AttendanceMode = "online" | "offline" | "";
type Gender = "male" | "female" | "non-binary" | "prefer-not" | "";
type Track = "fintech" | "ai-ml" | "blockchain" | "edtech" | "open" | "space" | "";
type Skill =
  | "frontend"
  | "backend"
  | "fullstack"
  | "designer"
  | "mobile"
  | "aiml"
  | "";
type Dietary = "veg" | "non-veg" | "jain" | "vegan" | "";

type FormState = {
  // Section 1
  fullName: string;
  email: string;
  phone: string;
  whatsapp: string;
  whatsappSameAsPhone: boolean;
  gender: Gender;

  // Section 2
  university: string;
  degree: string;
  graduationYear: "2025" | "2026" | "2027" | "2028" | "";
  rollId: string;
  collegeIdFilename: string;
  resumeFilename: string;
  linkedin: string;
  github: string;
  portfolio: string;

  // Section 3
  participationMode: ParticipationMode;
  teamName: string;
  teamSize: 2 | 3 | 4 | "";
  teamMemberEmails: string[];

  // Section 4
  preferredTrack: Track;
  primarySkill: Skill;
  techStack: string[];
  hasIdea: boolean | null;

  // Section 5
  attendanceMode: AttendanceMode;
  city: string;
  dietary: Dietary;
  needsAccommodation: boolean | null;

  // Section 6
  agreeTerms: boolean;
  agreeConduct: boolean;
  consentResumeShare: boolean;
  captcha: boolean;
};

const STORAGE_KEY = "irh:register:v1";

function safeParseJSON<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function loadSavedForm(): Partial<FormState> {
  if (typeof window === "undefined") return {};
  const saved = safeParseJSON<Partial<FormState>>(localStorage.getItem(STORAGE_KEY));
  return saved ?? {};
}

function saveFormPatch(patch: Partial<FormState>) {
  if (typeof window === "undefined") return;
  const current = loadSavedForm();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...patch }));
}

function clampEmails(emails: string[], count: number) {
  const next = emails.slice(0, count);
  while (next.length < count) next.push("");
  return next;
}

function defaultValueForKey(key: keyof FormState): FormState[keyof FormState] {
  switch (key) {
    case "whatsappSameAsPhone":
    case "agreeTerms":
    case "agreeConduct":
    case "consentResumeShare":
    case "captcha":
      return false;
    case "needsAccommodation":
    case "hasIdea":
      return null;
    case "teamMemberEmails":
      return ["", "", ""];
    case "techStack":
      return [];
    case "teamSize":
    case "participationMode":
    case "attendanceMode":
    case "gender":
    case "preferredTrack":
    case "primarySkill":
    case "dietary":
    case "graduationYear":
      return "";
    default:
      return "";
  }
}

function SectionTitle({ step, title }: { step: number; title: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <div className="font-serif text-3xl tracking-tight text-white/90">
        {step}
      </div>
      <div className="font-sans text-xs uppercase tracking-[0.25em] text-white/60">
        {title}
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between gap-6">
        <label className="font-sans text-xs uppercase tracking-[0.25em] text-white/80">
          {label}
        </label>
        {hint ? (
          <p className="max-w-[28rem] text-right font-sans text-xs text-white/55">
            {hint}
          </p>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={
        "w-full rounded-none border border-white/10 bg-white/[0.03] px-4 py-4 font-sans text-sm text-white/90 outline-none transition-all placeholder:text-white/20 focus:border-white/30 focus:bg-white/[0.06] focus:ring-0"
      }
    />
  );
}

function ToggleTag({
  label,
  selected,
  onToggle,
}: {
  label: string;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={
        "border px-4 py-2 font-sans text-[10px] uppercase tracking-[0.25em] transition-colors " +
        (selected
          ? "border-white/45 bg-white/10 text-white/90"
          : "border-white/15 bg-transparent text-white/65 hover:border-white/30")
      }
    >
      {label}
    </button>
  );
}

function SelectInput(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={
        "w-full rounded-none border border-white/10 bg-white/[0.03] px-4 py-4 font-sans text-sm text-white/90 outline-none transition-all focus:border-white/30 focus:bg-white/[0.06] focus:ring-0 appearance-none"
      }
    />
  );
}

function FileInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      type="file"
      className={
        "block w-full rounded-none border border-white/15 bg-black/15 px-4 py-3 font-sans text-sm text-white/75 file:mr-4 file:rounded-none file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-[0.25em] file:text-white/80 hover:file:bg-white/15"
      }
    />
  );
}

function PrimaryButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group relative inline-flex items-center justify-center overflow-hidden border border-white/20 bg-white/5 px-8 py-4 font-sans text-[10px] uppercase tracking-[0.3em] text-white transition-all hover:border-white/40 focus:outline-none"
      type="button"
    >
      <div className="absolute inset-0 -translate-x-full bg-white transition-transform duration-500 ease-out group-hover:translate-x-0" />
      <span className="relative z-10 flex items-center transition-colors duration-500 group-hover:text-black">
        {children}
        <span className="ml-4 inline-block h-[1px] w-8 bg-current transition-all group-hover:w-12" />
      </span>
    </button>
  );
}

function SecondaryButton({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center justify-center border border-white/10 bg-transparent px-8 py-4 font-sans text-[10px] uppercase tracking-[0.3em] text-white/60 transition-all hover:border-white/20 hover:text-white focus:outline-none"
      type="button"
    >
      {children}
    </button>
  );
}

function SerialPage({
  steps,
  active,
}: {
  steps: Array<{ id: string; serial: number; label: string }>;
  active: number;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!trackRef.current) return;
    gsap.to(trackRef.current, {
      yPercent: -100 * active,
      duration: 0.75,
      ease: "power3.out",
    });
  }, [active]);

  return (
    <div className="pointer-events-none absolute -left-20 top-1/2 z-0 h-[74svh] w-44 -translate-y-1/2 overflow-hidden border border-white/10 bg-black/40 backdrop-blur-xl text-white">
      <div ref={trackRef} className="h-full w-full">
        {steps.map((s) => (
          <div key={s.id} className="flex h-[74svh] w-full flex-col justify-between p-8">
            <div className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/40">
              Step
            </div>
            <div className="font-serif text-8xl leading-none tracking-tighter text-white/90">
              {s.serial}
            </div>
            <div className="font-sans text-[10px] uppercase tracking-[0.3em] text-white/40">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RightOrangeStrip() {
  return (
    <div className="pointer-events-none absolute -right-16 top-1/2 z-0 h-[74svh] w-24 -translate-y-1/2 border border-white/5 bg-orange-600/20 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-3 flex flex-col items-center justify-between py-8">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-orange-500/40"
            aria-hidden
          />
        ))}
      </div>
    </div>
  );
}

export default function RegistrationExperience() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const sectionsRef = useRef<Array<HTMLElement | null>>([]);

  const steps = useMemo(
    () => [
      { id: "guidelines", serial: 0, label: "Guidelines" },
      { id: "personal", serial: 1, label: "Personal" },
      { id: "academic", serial: 2, label: "Academic" },
      { id: "team", serial: 3, label: "Team" },
      { id: "skills", serial: 4, label: "Domain" },
      { id: "logistics", serial: 5, label: "Logistics" },
      { id: "submit", serial: 6, label: "Submit" },
    ],
    []
  );

  const [activeStep, setActiveStep] = useState(0);
  const [savedSnapshot, setSavedSnapshot] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState<FormState>(() => {
    const saved = loadSavedForm();
    return {
      fullName: saved.fullName ?? "",
      email: saved.email ?? "",
      phone: saved.phone ?? "",
      whatsapp: saved.whatsapp ?? "",
      whatsappSameAsPhone: saved.whatsappSameAsPhone ?? false,
      gender: saved.gender ?? "",

      university: saved.university ?? "",
      degree: saved.degree ?? "",
      graduationYear: saved.graduationYear ?? "",
      rollId: saved.rollId ?? "",
      collegeIdFilename: saved.collegeIdFilename ?? "",
      resumeFilename: saved.resumeFilename ?? "",
      linkedin: saved.linkedin ?? "",
      github: saved.github ?? "",
      portfolio: saved.portfolio ?? "",

      participationMode: saved.participationMode ?? "",
      teamName: saved.teamName ?? "",
      teamSize: saved.teamSize ?? "",
      teamMemberEmails: saved.teamMemberEmails ?? ["", "", ""],

      preferredTrack: saved.preferredTrack ?? "",
      primarySkill: saved.primarySkill ?? "",
      techStack: saved.techStack ?? [],
      hasIdea: saved.hasIdea ?? null,

      attendanceMode: saved.attendanceMode ?? "",
      city: saved.city ?? "",
      dietary: saved.dietary ?? "",
      needsAccommodation: saved.needsAccommodation ?? null,

      agreeTerms: saved.agreeTerms ?? false,
      agreeConduct: saved.agreeConduct ?? false,
      consentResumeShare: saved.consentResumeShare ?? false,
      captcha: saved.captcha ?? false,
    };
  });

  useEffect(() => {
    setSavedSnapshot(loadSavedForm());
  }, []);

  useEffect(() => {
    // Keep WhatsApp value aligned when toggle is on
    if (!form.whatsappSameAsPhone) return;
    setForm((prev) => ({ ...prev, whatsapp: prev.phone }));
  }, [form.phone, form.whatsappSameAsPhone]);

  useEffect(() => {
    // Clamp team member inputs based on size
    if (form.participationMode !== "team") return;
    const count = form.teamSize === "" ? 0 : Math.max(0, (form.teamSize as number) - 1);
    setForm((prev) => ({
      ...prev,
      teamMemberEmails: clampEmails(prev.teamMemberEmails, count),
    }));
  }, [form.participationMode, form.teamSize]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const triggers: ScrollTrigger[] = [];

    sectionsRef.current.forEach((el, index) => {
      if (!el) return;
      const t = ScrollTrigger.create({
        trigger: el,
        start: "top 55%",
        end: "bottom 55%",
        onEnter: () => setActiveStep(index),
        onEnterBack: () => setActiveStep(index),
      });
      triggers.push(t);

      // Add entrance animation for section content
      gsap.fromTo(
        el.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    const parallax = gsap.to("[data-register-parallax]", {
      y: -20,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    const layoutAnim = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "+=150",
        scrub: 1,
      },
    });

    layoutAnim
      .to("#registration-container", { paddingTop: 0, duration: 1 }, 0)
      .to("#registration-sidebar", { top: 0, height: "100vh", duration: 1 }, 0)
      .to("nav", { yPercent: -100, duration: 1 }, 0);

    ScrollTrigger.refresh();

    return () => {
      parallax.scrollTrigger?.kill();
      parallax.kill();
      triggers.forEach((t) => t.kill());
      layoutAnim.kill();
    };
  }, []);

  const scrollToStep = (index: number) => {
    const el = sectionsRef.current[index];
    if (!el) return;

    gsap.to(window, {
      scrollTo: { y: el, offsetY: 50 },
      duration: 0.9,
      ease: "power3.inOut",
    });
  };

  const saveSection = (patch: Partial<FormState>) => {
    saveFormPatch(patch);
    setSavedSnapshot((prev) => ({ ...prev, ...patch }));
  };

  const cancelSection = (keys: Array<keyof FormState>) => {
    setForm((prev) => {
      const next = { ...prev };
      keys.forEach((k) => {
        const saved = savedSnapshot[k];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (next as any)[k] = saved ?? (defaultValueForKey(k) as any);
      });
      return next;
    });
  };

  const handleSubmit = () => {
    // Minimal gating: require agreements + captcha checkbox
    if (!form.agreeTerms || !form.agreeConduct || !form.captcha) {
      scrollToStep(6);
      return;
    }

    saveFormPatch(form);
    setSavedSnapshot(loadSavedForm());
    setSubmitted(true);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.65 },
    });
  };

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground">
      <div className="noise-bg fixed inset-0 pointer-events-none" aria-hidden />

      <div
        id="registration-container"
        className="flex min-h-screen pt-32 transition-all duration-700 ease-out"
      >
        {/* Left rail */}
        <aside
          id="registration-sidebar"
          className="hidden sticky top-32 h-[calc(100vh-8rem)] w-[18rem] shrink-0 border-r border-white/10 md:flex"
        >
          <div className="flex h-full w-full flex-col justify-between p-8">
            <div className="space-y-7" data-register-parallax>
              <div className="space-y-2">
                <div className="font-sans text-xs uppercase tracking-[0.25em] text-white/60">
                  Registration
                </div>
                <div className="font-serif text-3xl tracking-tight text-white/90">
                  Flow
                </div>
              </div>

              <div className="space-y-6">
                {steps.map((s, i) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => scrollToStep(i)}
                    className="group w-full text-left"
                  >
                    <div
                      className={
                        "rounded-none border px-4 py-3 transition-colors " +
                        (i === activeStep
                          ? "border-white/40 bg-white/5"
                          : "border-white/10 bg-transparent hover:border-white/25")
                      }
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-sans text-[10px] uppercase tracking-[0.25em] text-white/55">
                          Step
                        </div>
                        <div className="font-serif text-lg text-white/85">
                          {s.serial}
                        </div>
                      </div>
                      <div className="mt-2 font-sans text-xs uppercase tracking-[0.25em] text-white/70">
                        {s.label}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            
          </div>
        </aside>

        {/* Center stage */}
        <div className="relative flex flex-1 justify-center">
          <div className="relative mx-auto w-full max-w-6xl px-6 pb-32">
            <div className="absolute inset-0 pointer-events-none z-0">
              <div className="sticky top-0 h-screen w-full">
                <SerialPage steps={steps} active={activeStep} />
                <RightOrangeStrip />
              </div>
            </div>

            <div className="relative z-10 mx-auto w-full max-w-4xl border border-white/10 bg-white/8">
              <div ref={scrollerRef} className="w-full px-8 py-10">
                {/* Step 0 */}
                <section
                  ref={(el) => {
                    sectionsRef.current[0] = el;
                  }}
                  className="space-y-8"
                >
                  <SectionTitle step={0} title="Registration Guidelines" />

                  <div className="space-y-5 font-sans text-sm text-white/75">
                    <p className="text-white/85">
                      <span className="font-semibold text-white">
                        Welcome, Innovator!
                      </span>{" "}
                      Before you embark on this journey, please ensure the following:
                    </p>

                    <div className="space-y-3">
                      <p>
                        <span className="text-white/90">Accuracy is Key:</span>{" "}
                        Please fill in your details exactly as they appear on your Government
                        or College ID. Mismatched information may lead to disqualification.
                      </p>
                      <p>
                        <span className="text-white/90">Team Leader Protocol:</span>{" "}
                        If participating as a team, only the Team Leader should fill out the
                        initial registration and invite members.
                      </p>
                      <p>
                        <span className="text-white/90">One Entry Per Person:</span> Duplicate
                        registrations will be rejected.
                      </p>
                      <p>
                        <span className="text-white/90">Documents Ready:</span> Keep your
                        Resume and College ID (PDF/JPG) handy for upload.
                      </p>
                    </div>

                    <div className="pt-2">
                      <PrimaryButton onClick={() => scrollToStep(1)}>
                        I Understand, Let’s Start
                      </PrimaryButton>
                    </div>
                  </div>

                  <div className="h-px w-full bg-white/10" />
                </section>

                {/* Step 1 */}
                <section
                  ref={(el) => {
                    sectionsRef.current[1] = el;
                  }}
                  className="mt-12 space-y-8"
                >
                  <SectionTitle step={1} title="Personal Information (The basics)" />

                  <div className="grid gap-6">
                    <Field label="Full Name">
                      <TextInput
                        placeholder="John Doe"
                        autoComplete="name"
                        value={form.fullName}
                        onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
                      />
                    </Field>

                    <Field
                      label="Email Address"
                      hint="Please use an active email. All OTPs and confirmations will be sent here."
                    >
                      <TextInput
                        placeholder="john@example.com"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                      />
                    </Field>

                    <Field label="Phone Number" hint="With Country Code +91 / +7 for Russia">
                      <TextInput
                        placeholder="+91 9876543210"
                        inputMode="tel"
                        value={form.phone}
                        onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                      />
                    </Field>

                    <Field label="WhatsApp Number">
                      <div className="space-y-3">
                        <TextInput
                          placeholder={
                            form.whatsappSameAsPhone
                              ? "Same as Phone Number"
                              : "+91 9876543210"
                          }
                          inputMode="tel"
                          disabled={form.whatsappSameAsPhone}
                          value={form.whatsapp}
                          onChange={(e) => setForm((p) => ({ ...p, whatsapp: e.target.value }))}
                        />
                        <label className="flex items-center gap-3 font-sans text-xs text-white/70">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded-none border border-white/30 bg-transparent"
                            checked={form.whatsappSameAsPhone}
                            onChange={(e) =>
                              setForm((p) => ({
                                ...p,
                                whatsappSameAsPhone: e.target.checked,
                                whatsapp: e.target.checked ? p.phone : p.whatsapp,
                              }))
                            }
                          />
                          Same as Phone Number
                        </label>
                      </div>
                    </Field>

                    <Field label="Gender">
                      <SelectInput
                        value={form.gender}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, gender: e.target.value as Gender }))
                        }
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="non-binary">Non-binary</option>
                        <option value="prefer-not">Prefer not to say</option>
                      </SelectInput>
                    </Field>

                    <div className="pt-2 flex flex-wrap gap-3">
                      <PrimaryButton
                        onClick={() =>
                          saveSection({
                            fullName: form.fullName,
                            email: form.email,
                            phone: form.phone,
                            whatsapp: form.whatsapp,
                            whatsappSameAsPhone: form.whatsappSameAsPhone,
                            gender: form.gender,
                          })
                        }
                      >
                        Save
                      </PrimaryButton>
                      <SecondaryButton
                        onClick={() =>
                          cancelSection([
                            "fullName",
                            "email",
                            "phone",
                            "whatsapp",
                            "whatsappSameAsPhone",
                            "gender",
                          ])
                        }
                      >
                        Cancel
                      </SecondaryButton>
                    </div>
                  </div>

                  <div className="h-px w-full bg-white/10" />
                </section>

                {/* Step 2 */}
                <section
                  ref={(el) => {
                    sectionsRef.current[2] = el;
                  }}
                  className="mt-12 space-y-8"
                >
                  <SectionTitle step={2} title="Academic & Professional Details" />

                  <div className="grid gap-6">
                    <Field label="University / College Name">
                      <TextInput
                        placeholder="Your University / College"
                        value={form.university}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, university: e.target.value }))
                        }
                      />
                    </Field>

                    <Field label="Course / Degree" hint="Example: B.Tech, B.E, B.Sc, BCA">
                      <TextInput
                        placeholder="B.Tech"
                        value={form.degree}
                        onChange={(e) => setForm((p) => ({ ...p, degree: e.target.value }))}
                      />
                    </Field>

                    <Field label="Graduation Year">
                      <SelectInput
                        value={form.graduationYear}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            graduationYear: e.target.value as FormState["graduationYear"],
                          }))
                        }
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                      </SelectInput>
                    </Field>

                    <Field label="University Roll Number / ID">
                      <TextInput
                        placeholder="Roll Number / ID"
                        value={form.rollId}
                        onChange={(e) => setForm((p) => ({ ...p, rollId: e.target.value }))}
                      />
                    </Field>

                    <Field
                      label="Upload College ID Card"
                      hint="Formats: JPG, PNG, PDF (Max 2MB)"
                    >
                      <div className="space-y-2">
                        <FileInput
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(e) =>
                            setForm((p) => ({
                              ...p,
                              collegeIdFilename: e.target.files?.[0]?.name ?? "",
                            }))
                          }
                        />
                        {form.collegeIdFilename ? (
                          <p className="font-sans text-xs text-white/55">
                            Selected: {form.collegeIdFilename}
                          </p>
                        ) : null}
                      </div>
                    </Field>

                    <Field label="Resume / CV" hint="Formats: PDF (Max 5MB) - Sponsors hire from here!">
                      <div className="space-y-2">
                        <FileInput
                          accept=".pdf"
                          onChange={(e) =>
                            setForm((p) => ({
                              ...p,
                              resumeFilename: e.target.files?.[0]?.name ?? "",
                            }))
                          }
                        />
                        {form.resumeFilename ? (
                          <p className="font-sans text-xs text-white/55">
                            Selected: {form.resumeFilename}
                          </p>
                        ) : null}
                      </div>
                    </Field>

                    <div className="space-y-5">
                      <div className="font-sans text-xs uppercase tracking-[0.25em] text-white/60">
                        Social Profiles (Optional but Recommended)
                      </div>
                      <div className="grid gap-6">
                        <Field label="LinkedIn URL">
                          <TextInput
                            placeholder="https://linkedin.com/in/…"
                            value={form.linkedin}
                            onChange={(e) =>
                              setForm((p) => ({ ...p, linkedin: e.target.value }))
                            }
                          />
                        </Field>
                        <Field label="GitHub URL">
                          <TextInput
                            placeholder="https://github.com/…"
                            value={form.github}
                            onChange={(e) => setForm((p) => ({ ...p, github: e.target.value }))}
                          />
                        </Field>
                        <Field label="Portfolio / Website URL">
                          <TextInput
                            placeholder="https://…"
                            value={form.portfolio}
                            onChange={(e) =>
                              setForm((p) => ({ ...p, portfolio: e.target.value }))
                            }
                          />
                        </Field>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap gap-3">
                      <PrimaryButton
                        onClick={() =>
                          saveSection({
                            university: form.university,
                            degree: form.degree,
                            graduationYear: form.graduationYear,
                            rollId: form.rollId,
                            collegeIdFilename: form.collegeIdFilename,
                            resumeFilename: form.resumeFilename,
                            linkedin: form.linkedin,
                            github: form.github,
                            portfolio: form.portfolio,
                          })
                        }
                      >
                        Save
                      </PrimaryButton>
                      <SecondaryButton
                        onClick={() =>
                          cancelSection([
                            "university",
                            "degree",
                            "graduationYear",
                            "rollId",
                            "collegeIdFilename",
                            "resumeFilename",
                            "linkedin",
                            "github",
                            "portfolio",
                          ])
                        }
                      >
                        Cancel
                      </SecondaryButton>
                    </div>
                  </div>

                  <div className="mt-12 h-px w-full bg-white/10" />
                </section>

                {/* Step 3 */}
                <section
                  ref={(el) => {
                    sectionsRef.current[3] = el;
                  }}
                  className="mt-12 space-y-8"
                >
                  <SectionTitle step={3} title="Team Participation Mode" />

                  <div className="grid gap-6">
                    <Field label="How are you participating?">
                      <div className="grid gap-3">
                        {(
                          [
                            { value: "solo", label: "Solo (Lone Wolf)" },
                            { value: "team", label: "Team (Squad)" },
                          ] as const
                        ).map((opt) => (
                          <label
                            key={opt.value}
                            className="flex items-center justify-between gap-4 border border-white/15 bg-black/10 px-4 py-3 font-sans text-sm text-white/80"
                          >
                            <span>{opt.label}</span>
                            <input
                              type="radio"
                              name="participation"
                              value={opt.value}
                              checked={form.participationMode === opt.value}
                              onChange={() =>
                                setForm((p) => ({
                                  ...p,
                                  participationMode: opt.value,
                                  ...(opt.value === "solo"
                                    ? {
                                        teamName: "",
                                        teamSize: "",
                                        teamMemberEmails: ["", "", ""],
                                      }
                                    : null),
                                }))
                              }
                            />
                          </label>
                        ))}
                      </div>
                    </Field>

                    {form.participationMode === "team" ? (
                      <>
                        <Field label="Team Name" hint="Make it cool!">
                          <TextInput
                            placeholder="Team Name"
                            value={form.teamName}
                            onChange={(e) =>
                              setForm((p) => ({ ...p, teamName: e.target.value }))
                            }
                          />
                        </Field>

                        <Field label="Team Size">
                          <SelectInput
                            value={form.teamSize === "" ? "" : String(form.teamSize)}
                            onChange={(e) =>
                              setForm((p) => ({
                                ...p,
                                teamSize:
                                  e.target.value === ""
                                    ? ""
                                    : (Number(e.target.value) as 2 | 3 | 4),
                              }))
                            }
                          >
                            <option value="" disabled>
                              Select
                            </option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                          </SelectInput>
                        </Field>

                        <div className="space-y-2">
                          <div className="font-sans text-xs uppercase tracking-[0.25em] text-white/80">
                            Invite Team Members
                          </div>
                          <p className="font-sans text-xs text-white/55">
                            System will send them an invite link automatically. You don’t need
                            to fill their details.
                          </p>

                          <div className="grid gap-4">
                            {(form.teamSize === "" ? [] : Array.from({ length: form.teamSize - 1 })).map(
                              (_, idx) => (
                                <Field
                                  key={idx}
                                  label={`Member ${idx + 2} Email ID`}
                                >
                                  <TextInput
                                    placeholder="member@example.com"
                                    type="email"
                                    value={form.teamMemberEmails[idx] ?? ""}
                                    onChange={(e) =>
                                      setForm((p) => {
                                        const next = [...p.teamMemberEmails];
                                        next[idx] = e.target.value;
                                        return { ...p, teamMemberEmails: next };
                                      })
                                    }
                                  />
                                </Field>
                              )
                            )}
                          </div>
                        </div>
                      </>
                    ) : null}

                    <div className="pt-2 flex flex-wrap gap-3">
                      <PrimaryButton
                        onClick={() =>
                          saveSection({
                            participationMode: form.participationMode,
                            teamName: form.teamName,
                            teamSize: form.teamSize,
                            teamMemberEmails: form.teamMemberEmails,
                          })
                        }
                      >
                        Save
                      </PrimaryButton>
                      <SecondaryButton
                        onClick={() =>
                          cancelSection([
                            "participationMode",
                            "teamName",
                            "teamSize",
                            "teamMemberEmails",
                          ])
                        }
                      >
                        Cancel
                      </SecondaryButton>
                    </div>
                  </div>

                  <div className="mt-12 h-px w-full bg-white/10" />
                </section>

                {/* Step 4 */}
                <section
                  ref={(el) => {
                    sectionsRef.current[4] = el;
                  }}
                  className="mt-12 space-y-8"
                >
                  <SectionTitle step={4} title="Domain & Skills (The Meat)" />

                  <div className="grid gap-6">
                    <Field label="Preferred Track / Theme" hint="Select the problem statement you are interested in">
                      <SelectInput
                        value={form.preferredTrack}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, preferredTrack: e.target.value as Track }))
                        }
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="fintech">FinTech</option>
                        <option value="ai-ml">AI/ML</option>
                        <option value="blockchain">Blockchain</option>
                        <option value="edtech">EdTech</option>
                        <option value="open">Open Innovation</option>
                        <option value="space">SpaceTech</option>
                      </SelectInput>
                    </Field>

                    <Field label="Primary Skill" hint="What is your main role?">
                      <SelectInput
                        value={form.primarySkill}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, primarySkill: e.target.value as Skill }))
                        }
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="frontend">Frontend Dev</option>
                        <option value="backend">Backend Dev</option>
                        <option value="fullstack">Full Stack</option>
                        <option value="designer">Designer (UI/UX)</option>
                        <option value="mobile">Mobile Dev</option>
                        <option value="aiml">AI/ML Engineer</option>
                      </SelectInput>
                    </Field>

                    <Field label="Tech Stack Familiarity" hint="Select all that apply">
                      <div className="flex flex-wrap gap-2">
                        {[
                          "React",
                          "Python",
                          "Node.js",
                          "Rust",
                          "Solidity",
                          "Flutter",
                          "AWS",
                          "Docker",
                          "Figma",
                        ].map((label) => (
                          <ToggleTag
                            key={label}
                            label={label}
                            selected={form.techStack.includes(label)}
                            onToggle={() =>
                              setForm((p) => {
                                const has = p.techStack.includes(label);
                                return {
                                  ...p,
                                  techStack: has
                                    ? p.techStack.filter((t) => t !== label)
                                    : [...p.techStack, label],
                                };
                              })
                            }
                          />
                        ))}
                      </div>
                    </Field>

                    <Field label="Do you have a project idea in mind?" hint="Just for survey, not mandatory">
                      <div className="grid gap-3">
                        {(
                          [
                            { value: true, label: "Yes" },
                            { value: false, label: "No" },
                          ] as const
                        ).map((opt) => (
                          <label
                            key={String(opt.value)}
                            className="flex items-center justify-between gap-4 border border-white/15 bg-black/10 px-4 py-3 font-sans text-sm text-white/80"
                          >
                            <span>{opt.label}</span>
                            <input
                              type="radio"
                              name="hasIdea"
                              checked={form.hasIdea === opt.value}
                              onChange={() => setForm((p) => ({ ...p, hasIdea: opt.value }))}
                            />
                          </label>
                        ))}
                        <button
                          type="button"
                          className="text-left font-sans text-xs text-white/55 underline underline-offset-4"
                          onClick={() => setForm((p) => ({ ...p, hasIdea: null }))}
                        >
                          Clear selection
                        </button>
                      </div>
                    </Field>

                    <div className="pt-2 flex flex-wrap gap-3">
                      <PrimaryButton
                        onClick={() =>
                          saveSection({
                            preferredTrack: form.preferredTrack,
                            primarySkill: form.primarySkill,
                            techStack: form.techStack,
                            hasIdea: form.hasIdea,
                          })
                        }
                      >
                        Save
                      </PrimaryButton>
                      <SecondaryButton
                        onClick={() =>
                          cancelSection([
                            "preferredTrack",
                            "primarySkill",
                            "techStack",
                            "hasIdea",
                          ])
                        }
                      >
                        Cancel
                      </SecondaryButton>
                    </div>
                  </div>

                  <div className="mt-12 h-px w-full bg-white/10" />
                </section>

                {/* Step 5 */}
                <section
                  ref={(el) => {
                    sectionsRef.current[5] = el;
                  }}
                  className="mt-12 space-y-8"
                >
                  <SectionTitle step={5} title="Logistics & Travel" />

                  <div className="grid gap-6">
                    <Field label="Mode of Attendance">
                      <SelectInput
                        value={form.attendanceMode}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            attendanceMode: e.target.value as AttendanceMode,
                            ...(e.target.value === "online"
                              ? { dietary: "", needsAccommodation: null }
                              : null),
                          }))
                        }
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="online">Online</option>
                        <option value="offline">Offline (In-person)</option>
                      </SelectInput>
                    </Field>

                    <Field label="City of Residence">
                      <TextInput
                        placeholder="City"
                        value={form.city}
                        onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
                      />
                    </Field>

                    {form.attendanceMode === "offline" ? (
                      <>
                        <Field label="Dietary Preferences">
                          <SelectInput
                            value={form.dietary}
                            onChange={(e) =>
                              setForm((p) => ({
                                ...p,
                                dietary: e.target.value as Dietary,
                              }))
                            }
                          >
                            <option value="" disabled>
                              Select
                            </option>
                            <option value="veg">Veg</option>
                            <option value="non-veg">Non-Veg</option>
                            <option value="jain">Jain</option>
                            <option value="vegan">Vegan</option>
                          </SelectInput>
                        </Field>

                        <Field label="Do you need accommodation?">
                          <div className="grid gap-3">
                            {(
                              [
                                { value: true, label: "Yes" },
                                { value: false, label: "No" },
                              ] as const
                            ).map((opt) => (
                              <label
                                key={String(opt.value)}
                                className="flex items-center justify-between gap-4 border border-white/15 bg-black/10 px-4 py-3 font-sans text-sm text-white/80"
                              >
                                <span>{opt.label}</span>
                                <input
                                  type="radio"
                                  name="accommodation"
                                  checked={form.needsAccommodation === opt.value}
                                  onChange={() =>
                                    setForm((p) => ({
                                      ...p,
                                      needsAccommodation: opt.value,
                                    }))
                                  }
                                />
                              </label>
                            ))}
                          </div>
                        </Field>
                      </>
                    ) : null}

                    <div className="pt-2 flex flex-wrap gap-3">
                      <PrimaryButton
                        onClick={() =>
                          saveSection({
                            attendanceMode: form.attendanceMode,
                            city: form.city,
                            dietary: form.dietary,
                            needsAccommodation: form.needsAccommodation,
                          })
                        }
                      >
                        Save
                      </PrimaryButton>
                      <SecondaryButton
                        onClick={() =>
                          cancelSection([
                            "attendanceMode",
                            "city",
                            "dietary",
                            "needsAccommodation",
                          ])
                        }
                      >
                        Cancel
                      </SecondaryButton>
                    </div>
                  </div>

                  <div className="mt-12 h-px w-full bg-white/10" />
                </section>

                {/* Step 6 */}
                <section
                  ref={(el) => {
                    sectionsRef.current[6] = el;
                  }}
                  className="mt-12 space-y-8"
                >
                  <SectionTitle step={6} title="Agreements & Submit" />

                  {!submitted ? (
                    <div className="grid gap-8">
                      <div className="space-y-4">
                        <label className="flex items-start gap-3 font-sans text-sm text-white/75">
                          <input
                            type="checkbox"
                            className="mt-1 h-4 w-4 rounded-none border border-white/30 bg-transparent"
                            checked={form.agreeTerms}
                            onChange={(e) =>
                              setForm((p) => ({ ...p, agreeTerms: e.target.checked }))
                            }
                          />
                          <span>
                            I agree to the Terms &amp; Conditions and Privacy Policy of the
                            Indo-Russian Hackathon 2025.
                          </span>
                        </label>

                        <label className="flex items-start gap-3 font-sans text-sm text-white/75">
                          <input
                            type="checkbox"
                            className="mt-1 h-4 w-4 rounded-none border border-white/30 bg-transparent"
                            checked={form.agreeConduct}
                            onChange={(e) =>
                              setForm((p) => ({ ...p, agreeConduct: e.target.checked }))
                            }
                          />
                          <span>
                            I agree to abide by the Code of Conduct (No harassment, original
                            code policy).
                          </span>
                        </label>

                        <label className="flex items-start gap-3 font-sans text-sm text-white/75">
                          <input
                            type="checkbox"
                            className="mt-1 h-4 w-4 rounded-none border border-white/30 bg-transparent"
                            checked={form.consentResumeShare}
                            onChange={(e) =>
                              setForm((p) => ({
                                ...p,
                                consentResumeShare: e.target.checked,
                              }))
                            }
                          />
                          <span>
                            I consent to share my resume with the event sponsors for hiring
                            opportunities.
                          </span>
                        </label>
                      </div>

                      <div className="space-y-2">
                        <div className="font-sans text-xs uppercase tracking-[0.25em] text-white/60">
                          Captcha
                        </div>
                        <label className="flex items-center justify-between gap-4 border border-white/15 bg-black/10 px-4 py-3 font-sans text-sm text-white/80">
                          <span>I am not a robot</span>
                          <input
                            type="checkbox"
                            checked={form.captcha}
                            onChange={(e) =>
                              setForm((p) => ({ ...p, captcha: e.target.checked }))
                            }
                          />
                        </label>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <PrimaryButton onClick={handleSubmit}>
                          COMPLETE REGISTRATION
                        </PrimaryButton>
                        <SecondaryButton
                          onClick={() =>
                            saveSection({
                              agreeTerms: form.agreeTerms,
                              agreeConduct: form.agreeConduct,
                              consentResumeShare: form.consentResumeShare,
                              captcha: form.captcha,
                            })
                          }
                        >
                          Save
                        </SecondaryButton>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-8 py-10">
                      <div className="flex items-center gap-4">
                        <CheckCircle2 className="h-10 w-10 text-white/90" />
                        <div>
                          <div className="font-serif text-4xl tracking-tight text-white/95">
                            Mission Initiated!
                          </div>
                          <p className="mt-2 font-sans text-sm text-white/70">
                            Check your email for the verification link and join our Discord
                            Server.
                          </p>
                        </div>
                      </div>

                      <div className="font-sans text-[10px] uppercase tracking-[0.25em] text-white/55">
                        You can still scroll and review your entries.
                      </div>
                    </div>
                  )}

                  <div className="mt-12 h-px w-full bg-white/10" />
                </section>

                <div className="h-16" />
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-3 font-sans text-[10px] uppercase tracking-[0.25em] text-white/45">
              <span className="inline-block h-[1px] w-10 bg-white/15" />
              <span>Scroll inside the sheet</span>
              <span className="inline-block h-[1px] w-10 bg-white/15" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
