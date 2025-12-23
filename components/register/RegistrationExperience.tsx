"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import confetti from "canvas-confetti";
import { CheckCircle2, Cloud, CloudOff } from "lucide-react";

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
  collegeIdUrl: string;
  resumeUrl: string;
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
  required = false,
  error = false,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  error?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between gap-6">
        <label className="font-sans text-xs uppercase tracking-[0.25em] text-white/80">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
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

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  const { error, ...rest } = props;
  return (
    <input
      {...rest}
      className={
        "w-full rounded-none border " +
        (error 
          ? "border-red-500 bg-red-500/10" 
          : "border-white/10 bg-white/[0.03]"
        ) +
        " px-4 py-4 font-sans text-sm text-white/90 outline-none transition-all placeholder:text-white/20 focus:border-white/30 focus:bg-white/[0.06] focus:ring-0"
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

function SelectInput(props: React.SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }) {
  const { error, ...rest } = props;
  return (
    <select
      {...rest}
      className={
        "w-full rounded-none border " +
        (error 
          ? "border-red-500 bg-red-500/10" 
          : "border-white/10 bg-white/[0.03]"
        ) +
        " px-4 py-4 font-sans text-sm text-white/90 outline-none transition-all focus:border-white/30 focus:bg-white/[0.06] focus:ring-0 appearance-none"
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
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`group relative inline-flex items-center justify-center overflow-hidden border border-white/20 bg-white/5 px-8 py-4 font-sans text-[10px] uppercase tracking-[0.3em] text-white transition-all focus:outline-none ${
        disabled 
          ? 'opacity-50 cursor-not-allowed' 
          : 'hover:border-white/40'
      }`}
      type="button"
    >
      <div className={`absolute inset-0 -translate-x-full bg-white transition-transform duration-500 ease-out ${
        !disabled ? 'group-hover:translate-x-0' : ''
      }`} />
      <span className={`relative z-10 flex items-center transition-colors duration-500 ${
        !disabled ? 'group-hover:text-black' : ''
      }`}>
        {children}
        <span className={`ml-4 inline-block h-[1px] w-8 bg-current transition-all ${
          !disabled ? 'group-hover:w-12' : ''
        }`} />
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

  const [form, setForm] = useState<FormState>(() => ({
    fullName: "",
    email: "",
    phone: "",
    whatsapp: "",
    whatsappSameAsPhone: false,
    gender: "",

    university: "",
    degree: "",
    graduationYear: "",
    rollId: "",
    collegeIdUrl: "",
    resumeUrl: "",
    linkedin: "",
    github: "",
    portfolio: "",

    participationMode: "",
    teamName: "",
    teamSize: "",
    teamMemberEmails: ["", "", ""],

    preferredTrack: "",
    primarySkill: "",
    techStack: [],
    hasIdea: null,

    attendanceMode: "",
    city: "",
    dietary: "",
    needsAccommodation: null,

    agreeTerms: false,
    agreeConduct: false,
    consentResumeShare: false,
    captcha: false,
  }));

  function SaveButton({
    keys,
    className,
  }: {
    keys: Array<keyof FormState>;
    className?: string;
  }) {
    const isSaved = keys.every((k) => {
      const saved = savedSnapshot[k];
      const current = form[k];
      // simple deep-equality for arrays/objects via JSON
      if (Array.isArray(current) || Array.isArray(saved) || (typeof current === 'object' && current !== null) || (typeof saved === 'object' && saved !== null)) {
        try {
          return JSON.stringify(saved) === JSON.stringify(current);
        } catch {
          return saved === current;
        }
      }
      return saved === current;
    });

    return (
      <PrimaryButton
        onClick={() => {
          // Validate current section before saving
          const currentStepIndex = activeStep;
          if (!validateSection(currentStepIndex)) {
            return; // Don't save if validation fails
          }
          
          const patch: Partial<FormState> = {};
          keys.forEach((k) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (patch as any)[k] = form[k];
          });
          saveSection(patch);
        }}
      >
        <span className="mr-3 inline-flex">
          {isSaved ? <Cloud className="h-4 w-4" /> : <CloudOff className="h-4 w-4" />}
        </span>
        {isSaved ? "Saved" : "Save"}
      </PrimaryButton>
    );
  }

  useEffect(() => {
    // Merge saved form from localStorage after mount to avoid hydration mismatch
    if (typeof window === "undefined") return;
    const saved = loadSavedForm();
    if (saved) {
      setForm((prev) => ({ ...prev, ...saved }));
      setSavedSnapshot(saved);
    }
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

  const validateField = (fieldName: string, value: any): boolean => {
    if (!value || value === "") {
      setFieldErrors(prev => ({ ...prev, [fieldName]: true }));
      return false;
    } else {
      setFieldErrors(prev => ({ ...prev, [fieldName]: false }));
      return true;
    }
  };

  const validateSection = (stepIndex: number): boolean => {
    const errors: Record<string, boolean> = {};
    
    switch (stepIndex) {
      case 1: // Personal Information
        const personalFields = ['fullName', 'email', 'phone'];
        personalFields.forEach(field => {
          if (!form[field as keyof FormState] || (form[field as keyof FormState] as string) === "") {
            errors[field] = true;
          }
        });
        break;
        
      case 2: // Academic Details
        const academicFields = ['university', 'degree', 'graduationYear', 'rollId'];
        academicFields.forEach(field => {
          if (!form[field as keyof FormState] || (form[field as keyof FormState] as string) === "") {
            errors[field] = true;
          }
        });
        break;
        
      case 3: // Team Participation
        if (!form.participationMode) errors['participationMode'] = true;
        if (form.participationMode === 'team') {
          if (!form.teamName || form.teamName === "") errors['teamName'] = true;
          if (!form.teamSize) errors['teamSize'] = true;
        }
        break;
        
      case 4: // Domain & Skills
        if (!form.preferredTrack) errors['preferredTrack'] = true;
        break;
        
      case 5: // Logistics
        if (!form.attendanceMode) errors['attendanceMode'] = true;
        if (!form.city || form.city === "") errors['city'] = true;
        break;
    }
    
    setFieldErrors(prev => ({ ...prev, ...errors }));
    return Object.keys(errors).length === 0;
  };

  const validateRequiredFields = () => {
    const errors: Record<string, boolean> = {};
    
    // Always required fields
    const alwaysRequired = ['fullName', 'email', 'phone', 'university', 'degree', 'graduationYear', 'rollId'];
    
    alwaysRequired.forEach(field => {
      if (!form[field as keyof FormState] || (form[field as keyof FormState] as string) === "") {
        errors[field] = true;
      }
    });
    
    // Participation mode required
    if (!form.participationMode) errors['participationMode'] = true;
    
    // Team-specific required fields
    if (form.participationMode === 'team') {
      if (!form.teamName || form.teamName === "") errors['teamName'] = true;
      if (!form.teamSize) errors['teamSize'] = true;
      form.teamMemberEmails.forEach((email, idx) => {
        if (email && email !== "" && !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
          errors[`teamMemberEmail${idx}`] = true;
        }
      });
    }
    
    // Skills and preferences required
    if (!form.preferredTrack) errors['preferredTrack'] = true;
    
    // Logistics required
    if (!form.attendanceMode) errors['attendanceMode'] = true;
    if (!form.city || form.city === "") errors['city'] = true;
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

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
    
    // Scroll to next step after saving
    const currentStepIndex = activeStep;
    if (currentStepIndex < steps.length - 1) {
      setTimeout(() => {
        scrollToStep(currentStepIndex + 1);
      }, 300);
    }
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

  const handleSubmit = async () => {
    // Validate all required fields first
    if (!validateRequiredFields()) {
      // Find first section with errors and scroll to it
      const sectionsWithError = [
        { step: 1, fields: ['fullName', 'email', 'phone'] },
        { step: 2, fields: ['university', 'degree', 'graduationYear'] },
        { step: 3, fields: form.participationMode === 'team' ? ['teamName', 'teamSize'] : [] },
      ];
      
      for (const section of sectionsWithError) {
        if (section.fields.some(field => fieldErrors[field])) {
          scrollToStep(section.step);
          break;
        }
      }
      return;
    }

    // Require all agreements + captcha checkbox
    if (!form.agreeTerms || !form.agreeConduct || !form.consentResumeShare || !form.captcha) {
      scrollToStep(6);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Save form data locally first
      saveFormPatch(form);
      setSavedSnapshot(loadSavedForm());

      // Submit to API
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit registration');
      }

      const result = await response.json();
      console.log('Registration submitted successfully:', result);

      setSubmitted(true);
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.65 },
      });

      // Clear saved form data after successful submission
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
      }
      
    } catch (error) {
      console.error('Registration submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit registration');
    } finally {
      setIsSubmitting(false);
    }
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
                        <span className="text-white/90 font-bold">Accuracy is Key:</span>{" "}
                        Please fill in your details exactly as they appear on your Government
                        or College ID. Mismatched information may lead to disqualification.
                      </p>
                      <p>
                        <span className="text-white/90 font-bold">Team Leader Protocol:</span>{" "}
                        If participating as a team, only the Team Leader should fill out the
                        initial registration and invite members.
                      </p>
                      <p>
                        <span className="text-white/90 font-bold">One Entry Per Person:</span> Duplicate
                        registrations will be rejected.
                      </p>
                      <p>
                        <span className="text-white/90 font-bold">Documents Ready:</span> Keep your
                        Upload your Resume and College ID to Google Drive/Dropbox and have the shareable links ready.
                      </p>
                      <p>
                        <span className="text-white/90 font-bold">Auto-Save Feature:</span> Your progress is automatically saved when you click the "Save" button in each section.<br></br>Required fields are marked with a red asterisk (*).
                      </p>
                    </div>

                    <div className="pt-2">
                      <PrimaryButton onClick={() => scrollToStep(1)}>
                        I Understand, Let's Start
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
                    <Field label="Full Name" required error={fieldErrors.fullName}>
                      <TextInput
                        placeholder="John Doe"
                        autoComplete="name"
                        value={form.fullName}
                        error={fieldErrors.fullName}
                        onChange={(e) => {
                          setForm((p) => ({ ...p, fullName: e.target.value }));
                          validateField('fullName', e.target.value);
                        }}
                      />
                    </Field>

                    <Field
                      label="Email Address"
                      hint="Please use an active email. All OTPs and confirmations will be sent here."
                      required
                      error={fieldErrors.email}
                    >
                      <TextInput
                        placeholder="john@example.com"
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        error={fieldErrors.email}
                        onChange={(e) => {
                          setForm((p) => ({ ...p, email: e.target.value }));
                          validateField('email', e.target.value);
                        }}
                      />
                    </Field>

                    <Field label="Phone Number" hint="With Country Code +91 / +7 for Russia" required error={fieldErrors.phone}>
                      <TextInput
                        placeholder="+91 9876543210"
                        inputMode="tel"
                        value={form.phone}
                        error={fieldErrors.phone}
                        onChange={(e) => {
                          setForm((p) => ({ ...p, phone: e.target.value }));
                          validateField('phone', e.target.value);
                        }}
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
                      <SaveButton
                        keys={[
                          "fullName",
                          "email",
                          "phone",
                          "whatsapp",
                          "whatsappSameAsPhone",
                          "gender",
                        ]}
                      />
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
                    <Field label="University / College Name" required error={fieldErrors.university}>
                      <TextInput
                        placeholder="Your University / College"
                        value={form.university}
                        error={fieldErrors.university}
                        onChange={(e) => {
                          setForm((p) => ({ ...p, university: e.target.value }));
                          validateField('university', e.target.value);
                        }}
                      />
                    </Field>

                    <Field label="Course / Degree" hint="Example: B.Tech, B.E, B.Sc, BCA" required error={fieldErrors.degree}>
                      <TextInput
                        placeholder="B.Tech"
                        value={form.degree}
                        error={fieldErrors.degree}
                        onChange={(e) => {
                          setForm((p) => ({ ...p, degree: e.target.value }));
                          validateField('degree', e.target.value);
                        }}
                      />
                    </Field>

                    <Field label="Graduation Year" required error={fieldErrors.graduationYear}>
                      <SelectInput
                        value={form.graduationYear}
                        error={fieldErrors.graduationYear}
                        onChange={(e) => {
                          setForm((p) => ({
                            ...p,
                            graduationYear: e.target.value as FormState["graduationYear"],
                          }));
                          validateField('graduationYear', e.target.value);
                        }}
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

                    <Field label="University Roll Number / ID" required error={fieldErrors.rollId}>
                      <TextInput
                        placeholder="Roll Number / ID"
                        value={form.rollId}
                        error={fieldErrors.rollId}
                        onChange={(e) => {
                          setForm((p) => ({ ...p, rollId: e.target.value }));
                          validateField('rollId', e.target.value);
                        }}
                      />
                    </Field>

                    <Field
                      label="College ID Card URL"
                      hint="Upload to Google Drive/Dropbox and share the link"
                    >
                      <TextInput
                        placeholder="https://drive.google.com/file/d/..."
                        value={form.collegeIdUrl}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, collegeIdUrl: e.target.value }))
                        }
                      />
                    </Field>

                    <Field label="Resume / CV URL" hint="Upload PDF to Google Drive/Dropbox and share the link - Sponsors hire from here!">
                      <TextInput
                        placeholder="https://drive.google.com/file/d/..."
                        value={form.resumeUrl}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, resumeUrl: e.target.value }))
                        }
                      />
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
                      <SaveButton
                        keys={[
                          "university",
                          "degree",
                          "graduationYear",
                          "rollId",
                          "collegeIdUrl",
                          "resumeUrl",
                          "linkedin",
                          "github",
                          "portfolio",
                        ]}
                      />
                      <SecondaryButton
                        onClick={() =>
                          cancelSection([
                            "university",
                            "degree",
                            "graduationYear",
                            "rollId",
                            "collegeIdUrl",
                            "resumeUrl",
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
                    <Field label="How are you participating?" required error={fieldErrors.participationMode}>
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
                        <Field label="Team Name" hint="Make it cool!" required error={fieldErrors.teamName}>
                          <TextInput
                            placeholder="Team Name"
                            value={form.teamName}
                            error={fieldErrors.teamName}
                            onChange={(e) => {
                              setForm((p) => ({ ...p, teamName: e.target.value }));
                              validateField('teamName', e.target.value);
                            }}
                          />
                        </Field>

                        <Field label="Team Size" required error={fieldErrors.teamSize}>
                          <SelectInput
                            value={form.teamSize === "" ? "" : String(form.teamSize)}
                            error={fieldErrors.teamSize}
                            onChange={(e) => {
                              setForm((p) => ({
                                ...p,
                                teamSize:
                                  e.target.value === ""
                                    ? ""
                                    : (Number(e.target.value) as 2 | 3 | 4),
                              }));
                              validateField('teamSize', e.target.value);
                            }}
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
                                  required
                                  error={fieldErrors[`teamMemberEmail${idx}`]}
                                >
                                  <TextInput
                                    placeholder="member@example.com"
                                    type="email"
                                    value={form.teamMemberEmails[idx] ?? ""}
                                    error={fieldErrors[`teamMemberEmail${idx}`]}
                                    onChange={(e) => {
                                      setForm((p) => {
                                        const next = [...p.teamMemberEmails];
                                        next[idx] = e.target.value;
                                        return { ...p, teamMemberEmails: next };
                                      });
                                      // Validate email format if not empty
                                      if (e.target.value && e.target.value !== "") {
                                        const isValid = e.target.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
                                        setFieldErrors(prev => ({ 
                                          ...prev, 
                                          [`teamMemberEmail${idx}`]: !isValid 
                                        }));
                                      } else {
                                        setFieldErrors(prev => ({ 
                                          ...prev, 
                                          [`teamMemberEmail${idx}`]: false 
                                        }));
                                      }
                                    }}
                                  />
                                </Field>
                              )
                            )}
                          </div>
                        </div>
                      </>
                    ) : null}

                    <div className="pt-2 flex flex-wrap gap-3">
                      <SaveButton
                        keys={[
                          "participationMode",
                          "teamName",
                          "teamSize",
                          "teamMemberEmails",
                        ]}
                      />
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
                    <Field label="Preferred Track / Theme" hint="Select the problem statement you are interested in" required error={fieldErrors.preferredTrack}>
                      <SelectInput
                        value={form.preferredTrack}
                        error={fieldErrors.preferredTrack}
                        onChange={(e) => {
                          setForm((p) => ({ ...p, preferredTrack: e.target.value as Track }));
                          validateField('preferredTrack', e.target.value);
                        }}
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
                      <SaveButton
                        keys={[
                          "preferredTrack",
                          "primarySkill",
                          "techStack",
                          "hasIdea",
                        ]}
                      />
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
                    <Field label="Mode of Attendance" required error={fieldErrors.attendanceMode}>
                      <SelectInput
                        value={form.attendanceMode}
                        error={fieldErrors.attendanceMode}
                        onChange={(e) => {
                          setForm((p) => ({
                            ...p,
                            attendanceMode: e.target.value as AttendanceMode,
                            ...(e.target.value === "online"
                              ? { dietary: "", needsAccommodation: null }
                              : null),
                          }));
                          validateField('attendanceMode', e.target.value);
                        }}
                      >
                        <option value="" disabled>
                          Select
                        </option>
                        <option value="online">Online</option>
                        <option value="offline">Offline (In-person)</option>
                      </SelectInput>
                    </Field>

                    <Field label="City of Residence" required error={fieldErrors.city}>
                      <TextInput
                        placeholder="City"
                        value={form.city}
                        error={fieldErrors.city}
                        onChange={(e) => {
                          setForm((p) => ({ ...p, city: e.target.value }));
                          validateField('city', e.target.value);
                        }}
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
                      <SaveButton
                        keys={[
                          "attendanceMode",
                          "city",
                          "dietary",
                          "needsAccommodation",
                        ]}
                      />
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
                            Indo-Russian Hackathon 2025. <span className="text-red-500">*</span>
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
                            code policy). <span className="text-red-500">*</span>
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
                            opportunities. <span className="text-red-500">*</span>
                          </span>
                        </label>
                      </div>

                      <div className="space-y-2">
                        <div className="font-sans text-xs uppercase tracking-[0.25em] text-white/60">
                          Captcha
                        </div>
                        <label className="flex items-center justify-between gap-4 border border-white/15 bg-black/10 px-4 py-3 font-sans text-sm text-white/80">
                          <span>I am not a robot <span className="text-red-500">*</span></span>
                          <input
                            type="checkbox"
                            checked={form.captcha}
                            onChange={(e) =>
                              setForm((p) => ({ ...p, captcha: e.target.checked }))
                            }
                          />
                        </label>
                      </div>

                      {submitError && (
                        <div className="rounded border border-red-500/30 bg-red-500/10 px-4 py-3">
                          <div className="font-sans text-sm text-red-400">
                            Error: {submitError}
                          </div>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-3">
                        <PrimaryButton 
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'SUBMITTING...' : 'COMPLETE REGISTRATION'}
                        </PrimaryButton>
                        <SaveButton
                          keys={["agreeTerms", "agreeConduct", "consentResumeShare", "captcha"]}
                        />
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
