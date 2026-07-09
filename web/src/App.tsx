import {
  CSSProperties,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowUpRight,
  Check,
  Code2,
  Gauge,
  Globe,
  Instagram,
  Languages,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Palette,
  Play,
  QrCode,
  ShieldCheck,
  Wrench,
  X,
} from "lucide-react";

const HERO_VIDEO =
  "https://videos.pexels.com/video-files/3129957/3129957-hd_1920_1080_25fps.mp4";
const HERO_POSTER =
  "https://images.pexels.com/videos/3129957/free-video-3129957.jpg?auto=compress&cs=tinysrgb&w=1600";
const CAP_VIDEO =
  "https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4";
const CAP_POSTER =
  "https://images.pexels.com/videos/3129671/free-video-3129671.jpg?auto=compress&cs=tinysrgb&w=1600";

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#pricing", label: "Pricing" },
  { href: "#studio", label: "Studio" },
  { href: "#contact", label: "Contact" },
];

const VERTICALS = ["Education", "Wellness", "Dining", "Beauty", "Retail"];

const WORK = [
  {
    name: "Meng Wei Yue Opera Studio",
    badge: "Real client",
    real: true,
    vertical: "Music & arts education · Ottawa",
    languages: "EN / 中文",
    description:
      "Bilingual site for a Chinese opera studio — classes, performances, and a simple way for parents and students to get in touch.",
    image:
      "https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=1200&q=80",
  },
  {
    name: "Brightpath Tutoring",
    badge: "Concept",
    real: false,
    vertical: "Tutoring & education",
    languages: "EN / FR",
    description:
      "Sample concept for a tutoring centre — program pages, tutor profiles, and a booking-first layout that turns parents into enquiries.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80",
  },
  {
    name: "Stillpoint Wellness Clinic",
    badge: "Concept",
    real: false,
    vertical: "TCM & wellness",
    languages: "EN / FR / 中文",
    description:
      "Sample concept for an acupuncture and massage clinic — services, practitioners, and trust signals that make first-time patients comfortable.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80",
  },
];

const CAPABILITIES = [
  {
    icon: Gauge,
    title: "Loads fast",
    tags: ["No bloat", "Lean code", "PageSpeed proof", "Mobile-first"],
    body: "Slow sites lose customers. We ship lean, no-bloat pages and prove it with PageSpeed Insights scores you can check yourself.",
  },
  {
    icon: ShieldCheck,
    title: "Stays secure",
    tags: ["Reviews", "Updates", "Data safety", "Monitoring"],
    body: "Regular security reviews and updates protect your customers' data — and your reputation — long after launch day.",
  },
  {
    icon: Code2,
    title: "Fully custom",
    tags: ["No templates", "Clean code", "You own it", "Bilingual"],
    body: "No Wix, no Squarespace. Every site is designed and coded around your business — and we handle all of it, so you never log in.",
  },
];

const SERVICES = [
  {
    icon: Code2,
    title: "Web design & development",
    description:
      "A fully custom site designed and coded for your business — no Wix, no Squarespace, no page builders. Clean code you own.",
  },
  {
    icon: Wrench,
    title: "Ongoing care plan",
    description:
      "A monthly subscription that covers maintenance, security updates, content edits, and continuous SEO — so you never touch your site.",
  },
  {
    icon: Palette,
    title: "Branding & graphic design",
    description:
      "Logos, visual identity, and the graphics your site and social channels need to look like one consistent brand.",
  },
  {
    icon: Languages,
    title: "Bilingual builds",
    description:
      "Full sites in English, French, and Chinese (EN / FR / 中文) — genuinely written and maintained, not machine-translated.",
  },
];

const PROCESS = [
  {
    step: "01",
    title: "Discover",
    description:
      "A short conversation about your business, your customers, and what the site needs to do.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "We design the site around your goals and brand, and refine it with you before a line of code is written.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Fully custom development — fast, secure, and tested on real phones and real connections.",
  },
  {
    step: "04",
    title: "Care",
    description:
      "After launch, the care plan keeps everything updated, secure, and improving — without you lifting a finger.",
  },
];

const BUILD_INCLUDES = [
  "Custom design & fully custom code",
  "Mobile-first, fast-loading pages",
  "On-page SEO foundations",
  "Bilingual options (EN / FR / 中文)",
  "Launch on your own domain",
];

const CARE_INCLUDES = [
  "Hosting, maintenance & monitoring",
  "Security reviews & updates",
  "Edits to your existing content",
  "Continuous SEO improvements",
  "Priority support",
];

/* ============ Custom rAF video crossfade (seamless manual loop) ============ */
function FadingVideo({
  src,
  poster,
  className,
  style,
}: {
  src: string;
  poster?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);
  const fadingOutRef = useRef(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const FADE_MS = 500;
    const FADE_OUT_LEAD = 0.55;

    const fadeTo = (target: number, duration = FADE_MS) => {
      cancelAnimationFrame(rafRef.current);
      const start = performance.now();
      const from = parseFloat(video.style.opacity || "0");
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        video.style.opacity = String(from + (target - from) * t);
        if (t < 1) rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    };

    const onLoaded = () => {
      video.style.opacity = "0";
      void video.play().catch(() => {});
      fadeTo(1);
    };
    const onTime = () => {
      if (!fadingOutRef.current && video.duration) {
        const remaining = video.duration - video.currentTime;
        if (remaining <= FADE_OUT_LEAD && remaining > 0) {
          fadingOutRef.current = true;
          fadeTo(0);
        }
      }
    };
    const onEnded = () => {
      video.style.opacity = "0";
      setTimeout(() => {
        video.currentTime = 0;
        void video.play().catch(() => {});
        fadingOutRef.current = false;
        fadeTo(1);
      }, 100);
    };

    video.addEventListener("loadeddata", onLoaded);
    video.addEventListener("timeupdate", onTime);
    video.addEventListener("ended", onEnded);

    return () => {
      cancelAnimationFrame(rafRef.current);
      video.removeEventListener("loadeddata", onLoaded);
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("ended", onEnded);
    };
  }, [src]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      className={className}
      style={{ opacity: 0, ...style }}
      autoPlay
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
    />
  );
}

/* ============ Word-by-word blur-in headline ============ */
function BlurText({
  text,
  className,
  delay = 0,
  justify = "center",
  trigger = "mount",
  style,
}: {
  text: string;
  className?: string;
  delay?: number;
  justify?: CSSProperties["justifyContent"];
  trigger?: "mount" | "view";
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [playing, setPlaying] = useState(trigger === "mount");

  useEffect(() => {
    if (trigger !== "view") return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPlaying(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [trigger]);

  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: justify,
        rowGap: "0.1em",
        ...style,
      }}
    >
      {text.split(" ").map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="blur-word"
          style={{
            animationDelay: `${delay + i * 0.1}s`,
            animationPlayState: playing ? "running" : "paused",
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function SectionHeading({
  eyebrow,
  line1,
  line2,
}: {
  eyebrow: string;
  line1: string;
  line2?: string;
}) {
  return (
    <div className="reveal">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-4">
        {eyebrow}
      </p>
      <h2 className="text-white text-4xl sm:text-5xl md:text-6xl leading-[1.02]">
        <span className="font-display italic" style={{ letterSpacing: "-0.02em" }}>
          {line1}
        </span>
        {line2 && (
          <span className="block" style={{ letterSpacing: "-0.03em" }}>
            {line2}
          </span>
        )}
      </h2>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);

  useReveal();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen bg-black tracking-[-0.01em]">
      {/* ============ NAV ============ */}
      <nav className="fixed top-4 left-0 right-0 z-[100] flex items-center justify-between px-4 sm:px-8">
        <a
          href="#"
          className="liquid-glass w-12 h-12 rounded-full flex items-center justify-center"
          aria-label="MiviaLab home"
        >
          <span className="font-display italic text-white text-2xl leading-none lowercase">
            m
          </span>
        </a>

        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 liquid-glass rounded-full px-1.5 py-1.5 items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-white/90 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-1 flex items-center gap-1 bg-white text-black text-sm font-semibold px-4 py-2 rounded-full hover:bg-white/90 transition-colors whitespace-nowrap"
          >
            Start your project
            <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
          </a>
        </div>

        <a
          href="#contact"
          className="hidden md:flex lg:hidden items-center gap-1 bg-white text-black text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-white/90 transition-colors"
        >
          Start your project
          <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
        </a>

        <button
          type="button"
          className="md:hidden liquid-glass relative w-12 h-12 rounded-full flex items-center justify-center text-white"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Menu
            className={`absolute w-5 h-5 transition-all duration-300 ${
              menuOpen
                ? "opacity-0 rotate-90 scale-75"
                : "opacity-100 rotate-0 scale-100"
            }`}
          />
          <X
            className={`absolute w-5 h-5 transition-all duration-300 ${
              menuOpen
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 -rotate-90 scale-75"
            }`}
          />
        </button>

        <div className="hidden lg:block w-12 h-12" aria-hidden="true" />
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-sm md:hidden flex flex-col items-center justify-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white text-2xl font-display italic"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-4 flex items-center gap-1 bg-white text-black text-sm font-semibold px-8 py-3 rounded-full"
            onClick={() => setMenuOpen(false)}
          >
            Start your project
            <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
          </a>
        </div>
      )}

      {/* ============ HERO ============ */}
      <section
        className="relative w-full overflow-hidden bg-black flex flex-col"
        style={{ minHeight: "100dvh" }}
      >
        <FadingVideo
          src={HERO_VIDEO}
          poster={HERO_POSTER}
          className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-center z-0"
          style={{ width: "120%", height: "120%" }}
        />
        {/* subtle legibility wash — video stays the star */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 30%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.8) 100%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex-1 flex flex-col">
          {/* Hero content */}
          <div className="flex-1 flex flex-col items-center justify-center text-center pt-28 px-4">
            <div
              className="hero-anim hero-fade liquid-glass rounded-full flex items-center gap-2 pr-4 pl-1.5 py-1.5"
              style={{ animationDelay: "0.4s" }}
            >
              <span className="bg-white text-black px-3 py-1 rounded-full text-xs font-semibold">
                New
              </span>
              <span className="text-sm text-white/90">
                Now booking small-business sites for 2026
              </span>
            </div>

            <h1
              className="mt-6 font-display italic text-white text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.85] max-w-3xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              <BlurText text="Custom websites built to earn trust." delay={0.3} />
            </h1>

            <p
              className="hero-anim hero-fade mt-5 text-sm md:text-base text-white/90 max-w-xl font-light leading-relaxed"
              style={{ animationDelay: "0.8s" }}
            >
              Fast, secure, fully custom sites for small businesses across the
              Ottawa&ndash;Toronto corridor. No templates, no bloat — we handle
              everything so you never have to touch your site.
            </p>

            <div
              className="hero-anim hero-fade flex items-center gap-6 mt-7"
              style={{ animationDelay: "1.1s" }}
            >
              <a
                href="#contact"
                className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white flex items-center gap-2 transition-transform hover:scale-[1.03] active:scale-95"
              >
                Start your project
                <ArrowUpRight className="h-5 w-5" strokeWidth={2} />
              </a>
              <a
                href="#work"
                className="flex items-center gap-2 text-sm font-medium text-white/90 hover:text-white transition-colors"
              >
                See our work
                <Play className="h-4 w-4" fill="currentColor" strokeWidth={0} />
              </a>
            </div>

            <div
              className="hero-anim hero-fade flex items-stretch gap-4 mt-10"
              style={{ animationDelay: "1.3s" }}
            >
              <div className="liquid-glass p-5 w-[200px] sm:w-[220px] rounded-[1.25rem] text-left">
                <Globe className="w-7 h-7 text-white" strokeWidth={1.25} />
                <p
                  className="font-display italic text-white text-3xl leading-none mt-4"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  EN·FR·中文
                </p>
                <p className="text-xs text-white font-light mt-2">
                  Languages we build in
                </p>
              </div>
              <div className="liquid-glass p-5 w-[200px] sm:w-[220px] rounded-[1.25rem] text-left">
                <Code2 className="w-7 h-7 text-white" strokeWidth={1.25} />
                <p
                  className="font-display italic text-white text-4xl leading-none mt-4"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  100%
                </p>
                <p className="text-xs text-white font-light mt-2">
                  Custom-coded — no templates
                </p>
              </div>
            </div>
          </div>

          {/* Verticals / trust row */}
          <div
            className="hero-anim hero-fade flex flex-col items-center gap-4 pb-8 px-4"
            style={{ animationDelay: "1.4s" }}
          >
            <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white">
              Built for local small businesses
            </span>
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 sm:gap-x-12 md:gap-x-16">
              {VERTICALS.map((name) => (
                <span
                  key={name}
                  className="font-display italic text-white/90 text-xl md:text-2xl tracking-tight"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ WORK ============ */}
      <section
        id="work"
        className="scroll-mt-16 px-5 sm:px-10 md:px-14 py-24 sm:py-32"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <SectionHeading eyebrow="Work" line1="Real work," line2="honest labels." />
            <p className="reveal max-w-sm text-sm text-white/60 leading-relaxed">
              One real client so far — and concept sites that show where we're
              headed. Concepts are always labeled as concepts, never passed off
              as clients.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {WORK.map((project) => (
              <article
                key={project.name}
                className="liquid-glass reveal group rounded-2xl overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span
                    className={`absolute top-3 left-3 text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-md ${
                      project.real
                        ? "bg-white text-black"
                        : "bg-black/60 text-white/80 border border-white/25"
                    }`}
                  >
                    {project.badge}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-xs text-white/40 mb-2">
                    {project.vertical} · {project.languages}
                  </p>
                  <h3 className="text-white text-xl font-medium mb-2">
                    {project.name}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CAPABILITIES (video-backed) ============ */}
      <section className="relative min-h-screen overflow-hidden bg-black">
        <FadingVideo
          src={CAP_VIDEO}
          poster={CAP_POSTER}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.7) 100%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 px-5 sm:px-10 md:px-14 pt-28 pb-16 flex flex-col min-h-screen">
          <div className="mb-auto max-w-6xl mx-auto w-full">
            <p className="text-sm font-body text-white/80 mb-6">// Why MiviaLab</p>
            <h2
              className="font-display italic text-white text-5xl md:text-6xl lg:text-[5.5rem] leading-[0.9] max-w-3xl"
              style={{ letterSpacing: "-0.03em" }}
            >
              <BlurText
                text="Outcomes you can feel."
                justify="flex-start"
                trigger="view"
              />
            </h2>
            <p className="reveal mt-6 max-w-xl text-sm md:text-base text-white/80 font-light leading-relaxed">
              Not engineering jargon — the things a business owner actually
              notices. Fast, secure, fully custom, and fully handled.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              {CAPABILITIES.map((card) => (
                <div
                  key={card.title}
                  className="liquid-glass reveal rounded-[1.25rem] p-6 min-h-[360px] flex flex-col"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="liquid-glass w-11 h-11 rounded-[0.75rem] flex items-center justify-center shrink-0">
                      <card.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="liquid-glass rounded-full px-3 py-1 text-[11px] text-white/90 whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1" />

                  <div className="mt-6">
                    <h3
                      className="font-display italic text-white text-3xl leading-none"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm text-white/90 font-light leading-snug max-w-[32ch]">
                      {card.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section
        id="services"
        className="scroll-mt-16 px-5 sm:px-10 md:px-14 py-24 sm:py-32"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <SectionHeading eyebrow="Services" line1="Everything your site" line2="needs, handled." />
            <p className="reveal max-w-sm text-sm text-white/60 leading-relaxed">
              From first design to years of upkeep — one studio, one point of
              contact, in English, French, or Chinese.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="liquid-glass reveal flex gap-5 rounded-2xl p-7"
              >
                <div className="liquid-glass w-11 h-11 rounded-[0.75rem] flex items-center justify-center shrink-0">
                  <service.icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-white text-lg font-medium mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="px-5 sm:px-10 md:px-14 py-24 sm:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <SectionHeading eyebrow="Process" line1="Simple from" line2="day one." />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PROCESS.map((phase) => (
              <div key={phase.step} className="reveal">
                <p className="font-display italic text-4xl text-white/25 mb-4">
                  {phase.step}
                </p>
                <h3 className="text-white text-lg font-medium mb-2">
                  {phase.title}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {phase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section
        id="pricing"
        className="scroll-mt-16 px-5 sm:px-10 md:px-14 py-24 sm:py-32"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <SectionHeading eyebrow="Pricing" line1="One build," line2="one simple plan." />
            <p className="reveal max-w-sm text-sm text-white/60 leading-relaxed">
              Every project is quoted individually — no hidden tiers. New
              features, pages, or integrations after launch are quoted
              separately, even on the care plan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="liquid-glass reveal rounded-2xl p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-3">
                The build
              </p>
              <h3 className="text-white text-2xl font-medium mb-1">
                Your custom site
              </h3>
              <p className="font-display italic text-white/50 mb-7">
                quoted per project
              </p>
              <ul className="space-y-3">
                {BUILD_INCLUDES.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-white/70">
                    <Check className="w-4 h-4 text-white shrink-0 mt-0.5" strokeWidth={2} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="liquid-glass-strong reveal rounded-2xl p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 mb-3">
                The care plan
              </p>
              <h3 className="text-white text-2xl font-medium mb-1">
                Monthly subscription
              </h3>
              <p className="font-display italic text-white/60 mb-7">
                so you never touch your site
              </p>
              <ul className="space-y-3">
                {CARE_INCLUDES.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-white/80">
                    <Check className="w-4 h-4 text-white shrink-0 mt-0.5" strokeWidth={2} />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-7 text-xs text-white/50 leading-relaxed">
                Content edits and upkeep are included. New features, pages, and
                integrations are quoted separately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STUDIO ============ */}
      <section
        id="studio"
        className="scroll-mt-16 px-5 sm:px-10 md:px-14 py-24 sm:py-32"
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading eyebrow="Studio" line1="A small studio" line2="that sweats details." />
            <div className="reveal mt-8 space-y-5 text-sm text-white/60 leading-relaxed max-w-md">
              <p>
                MiviaLab is a web design &amp; development studio based in the
                Ottawa&ndash;Toronto corridor. We help small businesses succeed
                online with websites that are modern, professional, and built
                around real business needs — not around a template.
              </p>
              <p>
                We work in English, French, and Chinese, which means your site
                can genuinely speak to every customer you serve — a rare thing
                even among much bigger agencies.
              </p>
            </div>
            <dl className="reveal mt-10 grid grid-cols-3 gap-6 max-w-md">
              <div>
                <dt className="text-xs text-white/40 mb-1">Based in</dt>
                <dd className="text-white text-sm font-medium">
                  Ottawa&ndash;Toronto
                </dd>
              </div>
              <div>
                <dt className="text-xs text-white/40 mb-1">Languages</dt>
                <dd className="text-white text-sm font-medium">EN / FR / 中文</dd>
              </div>
              <div>
                <dt className="text-xs text-white/40 mb-1">Code</dt>
                <dd className="text-white text-sm font-medium">100% custom</dd>
              </div>
            </dl>
          </div>
          <div className="liquid-glass reveal rounded-2xl overflow-hidden aspect-[4/5] md:aspect-auto md:h-[480px]">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80"
              alt="Studio workspace"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section
        id="contact"
        className="scroll-mt-16 px-5 sm:px-10 md:px-14 py-24 sm:py-32"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <SectionHeading eyebrow="Contact" line1="Tell us about" line2="your project." />
          </div>

          <div className="grid md:grid-cols-5 gap-10">
            <div className="md:col-span-3">
              {formSent ? (
                <div className="liquid-glass rounded-2xl p-10 text-center">
                  <p className="font-display italic text-white text-3xl mb-3">
                    Thank you.
                  </p>
                  <p className="text-sm text-white/60 leading-relaxed max-w-sm mx-auto">
                    We'll get back to you within one business day.
                    <span className="block mt-2 text-white/40">
                      (Demo site — this form doesn't actually send anything.)
                    </span>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="reveal space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs text-white/50 mb-2">
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your name"
                        className="w-full rounded-xl bg-white/[0.05] border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs text-white/50 mb-2">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@business.com"
                        className="w-full rounded-xl bg-white/[0.05] border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs text-white/50 mb-2">
                      What do you need?
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="A few sentences about your business and what you're looking for."
                      className="w-full rounded-xl bg-white/[0.05] border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/40 transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="liquid-glass-strong text-white text-sm font-medium px-7 py-3 rounded-full flex items-center gap-2 transition-transform hover:scale-[1.03] active:scale-95"
                  >
                    Send message
                    <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                  </button>
                </form>
              )}
            </div>

            <div className="md:col-span-2 reveal">
              <div className="liquid-glass rounded-2xl p-7 mb-5">
                <div className="flex items-center gap-4 mb-5">
                  <div className="liquid-glass w-20 h-20 rounded-xl flex items-center justify-center shrink-0">
                    <QrCode className="w-10 h-10 text-white/60" strokeWidth={1.25} />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium mb-1">
                      Prefer WeChat?
                    </p>
                    <p className="text-xs text-white/50 leading-relaxed">
                      Scan to chat with us directly — we reply in English or 中文.
                    </p>
                  </div>
                </div>
                <p className="text-[11px] text-white/30">
                  QR code placeholder — demo site.
                </p>
              </div>

              <ul className="space-y-1 text-sm">
                {[
                  { icon: Mail, label: "hello@mivialab.ca" },
                  { icon: Instagram, label: "Instagram" },
                  { icon: Linkedin, label: "LinkedIn" },
                  { icon: MessageCircle, label: "RedNote 小红书" },
                ].map((channel) => (
                  <li key={channel.label}>
                    <a
                      href="#contact"
                      className="flex items-center gap-3 text-white/50 hover:text-white transition-colors py-2"
                    >
                      <channel.icon className="w-4 h-4" strokeWidth={1.5} />
                      {channel.label}
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="px-5 sm:px-10 md:px-14 py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-white text-xl font-display italic">MiviaLab</span>
          <div className="flex items-center gap-6 text-sm text-white/50">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-xs text-white/30">
            © 2026 MiviaLab · Ottawa&ndash;Toronto · EN / FR / 中文
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
