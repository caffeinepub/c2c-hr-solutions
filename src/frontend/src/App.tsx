import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Check,
  ChevronDown,
  FileSearch,
  Loader2,
  Mail,
  MapPin,
  Menu,
  MonitorSmartphone,
  Phone,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { AnimatePresence, type Variants, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useSubmitInquiry } from "./hooks/useQueries";

/* ─── Data ─────────────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    icon: MonitorSmartphone,
    title: "IT Recruitment",
    description:
      "Sourcing top-tier tech talent for software engineering, infrastructure, cloud architecture, and IT leadership roles across all experience levels.",
    color: "from-blue-500/10 to-blue-600/5",
    iconColor: "text-blue-600",
  },
  {
    icon: Users,
    title: "Non-IT Recruitment",
    description:
      "Finding skilled professionals across finance, operations, marketing, sales, and administration to strengthen your non-technical teams.",
    color: "from-emerald-500/10 to-emerald-600/5",
    iconColor: "text-emerald-600",
  },
  {
    icon: Briefcase,
    title: "Permanent Hiring",
    description:
      "End-to-end talent acquisition support to place the right candidates in permanent, full-time positions that align with your culture and goals.",
    color: "from-violet-500/10 to-violet-600/5",
    iconColor: "text-violet-600",
  },
  {
    icon: UserCheck,
    title: "Contract Staffing",
    description:
      "Flexible staffing solutions for short-term projects, seasonal demands, or specialized roles — scale your workforce on your terms.",
    color: "from-amber-500/10 to-amber-600/5",
    iconColor: "text-amber-600",
  },
  {
    icon: FileSearch,
    title: "Candidate Screening",
    description:
      "Thorough vetting, skills assessment, background verification, and cultural fit evaluation to ensure every hire meets your high standards.",
    color: "from-rose-500/10 to-rose-600/5",
    iconColor: "text-rose-600",
  },
];

const STATS = [
  { value: "500+", label: "Placements Made" },
  { value: "200+", label: "Client Companies" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "15+", label: "Industry Verticals" },
];

/* ─── Fade-up animation variant ─────────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── Components ──────────────────────────────────────────────────────── */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["home", "services", "about", "contact"];
      for (const id of sections.reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const ocidMap: Record<string, string> = {
    home: "nav.home_link",
    services: "nav.services_link",
    about: "nav.about_link",
    contact: "nav.contact_link",
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy shadow-navy-lg border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick("#home")}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-lg bg-gold flex items-center justify-center shadow-gold group-hover:scale-105 transition-transform duration-200">
              <Building2 className="w-5 h-5 text-navy-deep" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-white text-base tracking-tight">
                C2C HR
              </span>
              <span className="font-body text-gold text-[10px] font-medium tracking-widest uppercase">
                Solutions
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              return (
                <button
                  type="button"
                  key={link.href}
                  data-ocid={ocidMap[id]}
                  onClick={() => handleNavClick(link.href)}
                  className={`font-body text-sm font-medium nav-link-underline transition-colors duration-200 ${
                    activeSection === id
                      ? "text-gold active"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <Button
              onClick={() => handleNavClick("#contact")}
              size="sm"
              className="bg-gold hover:bg-gold-light text-navy-deep font-semibold shadow-gold border-0 ml-2"
            >
              Hire Now
            </Button>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition-colors"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden bg-navy border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const id = link.href.replace("#", "");
                return (
                  <button
                    type="button"
                    key={link.href}
                    data-ocid={ocidMap[id]}
                    onClick={() => handleNavClick(link.href)}
                    className="text-left px-3 py-2.5 rounded-md text-white/80 hover:text-white hover:bg-white/10 font-body text-sm font-medium transition-colors"
                  >
                    {link.label}
                  </button>
                );
              })}
              <div className="pt-2">
                <Button
                  onClick={() => handleNavClick("#contact")}
                  className="w-full bg-gold hover:bg-gold-light text-navy-deep font-semibold border-0"
                >
                  Hire Now
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection() {
  const handleScroll = () => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };
  const handleLearnMore = () => {
    const el = document.getElementById("services");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center gradient-hero overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url('/assets/generated/hero-bg-pattern.dim_1920x1080.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Geometric accent shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-gold/5 blur-3xl" />
        <div className="absolute bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-400/5 blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-1 h-32 bg-gold/20 rotate-45" />
        <div className="absolute top-1/3 right-1/3 w-0.5 h-20 bg-white/10 rotate-12" />
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="white"
                strokeWidth="0.3"
                strokeOpacity="0.06"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40">
        <div className="max-w-3xl">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-medium tracking-widest uppercase mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              Recruitment & Staffing Consultancy
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={0.1}
              className="font-display font-extrabold text-white leading-[1.1] tracking-tight mb-6"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4rem)" }}
            >
              Connecting the <span className="text-gold">Right Talent</span>
              <br />
              with the{" "}
              <span className="relative inline-block">
                Right Opportunity
                <svg
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 w-full"
                  height="4"
                  viewBox="0 0 100 4"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,2 Q25,0 50,2 Q75,4 100,2"
                    stroke="oklch(0.72 0.16 70)"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="font-body text-white/70 text-lg leading-relaxed max-w-2xl mb-10"
            >
              C2C HR Solutions is a dedicated recruitment and staffing
              consultancy that helps companies of all sizes hire the right
              talent quickly and efficiently. We reduce time-to-hire and improve
              workforce quality through expert sourcing, screening, and
              placement.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={0.3}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                onClick={handleScroll}
                data-ocid="hero.primary_button"
                size="lg"
                className="bg-gold hover:bg-gold-light text-navy-deep font-bold shadow-gold border-0 px-8 text-base group"
              >
                Get in Touch
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                onClick={handleLearnMore}
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 bg-transparent px-8 text-base"
              >
                Our Services
                <ChevronDown className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="border border-white/10 rounded-xl p-4 bg-white/5 backdrop-blur-sm"
              >
                <div className="font-display font-extrabold text-2xl text-gold leading-none mb-1">
                  {stat.value}
                </div>
                <div className="font-body text-white/60 text-xs leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          aria-hidden="true"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-16 md:h-20"
        >
          <path
            d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
            fill="oklch(0.98 0 0)"
          />
        </svg>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/15 text-navy font-body text-xs font-semibold tracking-widest uppercase mb-4"
          >
            What We Do
          </motion.div>
          <motion.h2
            variants={fadeUp}
            custom={0.1}
            className="font-display font-extrabold text-navy-deep text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4"
          >
            Our Services
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={0.2}
            className="font-body text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Comprehensive recruitment and staffing solutions tailored to meet
            your hiring needs across every function and industry.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={fadeUp}
                custom={i * 0.08}
                data-ocid={`services.item.${i + 1}`}
                className="glass-card rounded-2xl p-6 card-hover cursor-default group"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-6 h-6 ${service.iconColor}`} />
                </div>
                <h3 className="font-display font-bold text-navy-deep text-lg mb-2.5 tracking-tight">
                  {service.title}
                </h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-5 flex items-center gap-1.5 text-gold font-body text-xs font-semibold group-hover:gap-2.5 transition-all duration-200">
                  Learn more <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.div>
            );
          })}

          {/* CTA card (6th cell to fill the 3-col grid) */}
          <motion.div
            variants={fadeUp}
            custom={0.45}
            className="rounded-2xl p-6 gradient-hero flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" aria-hidden="true">
                <defs>
                  <pattern
                    id="grid2"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="white"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid2)" />
              </svg>
            </div>
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center mb-4">
                <Building2 className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-display font-bold text-white text-lg mb-2">
                Ready to hire?
              </h3>
              <p className="font-body text-white/70 text-sm leading-relaxed">
                Tell us your staffing needs and we'll get started right away.
              </p>
            </div>
            <Button
              onClick={() => {
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="relative mt-6 bg-gold hover:bg-gold-light text-navy-deep font-semibold border-0 w-full"
            >
              Start Hiring Today
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function AboutSection() {
  const benefits = [
    "Deep industry expertise across 15+ verticals",
    "Dedicated account managers for every client",
    "Average time-to-fill under 2 weeks",
    "Rigorous multi-stage candidate screening",
    "Post-placement support & replacement guarantee",
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-navy-lg">
              <img
                src="/assets/generated/about-illustration.dim_600x500.png"
                alt="C2C HR Solutions — Connecting talent with opportunity"
                className="w-full h-auto object-cover"
              />
              {/* Overlay stats badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-navy/90 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div className="grid grid-cols-3 gap-2 text-center">
                  {STATS.slice(0, 3).map((s) => (
                    <div key={s.label}>
                      <div className="font-display font-extrabold text-gold text-xl leading-none">
                        {s.value}
                      </div>
                      <div className="font-body text-white/60 text-[10px] mt-0.5 leading-tight">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating accent card */}
            <div className="absolute -top-5 -right-5 bg-white rounded-xl shadow-navy p-4 border border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center">
                  <Check className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <div className="font-display font-bold text-navy-deep text-sm">
                    Trusted Partner
                  </div>
                  <div className="font-body text-muted-foreground text-xs">
                    200+ companies served
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="order-1 lg:order-2"
          >
            <motion.div
              variants={fadeUp}
              custom={0}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/12 border border-gold/25 text-amber-700 font-body text-xs font-semibold tracking-widest uppercase mb-5"
            >
              Who We Are
            </motion.div>

            <motion.h2
              variants={fadeUp}
              custom={0.1}
              className="font-display font-extrabold text-navy-deep text-3xl md:text-4xl tracking-tight mb-5 leading-tight"
            >
              About <span className="text-gold">C2C HR</span> Solutions
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="font-body text-muted-foreground text-base leading-relaxed mb-4"
            >
              C2C HR Solutions is a dedicated recruitment and staffing
              consultancy that bridges the gap between talented professionals
              and forward-thinking companies. We help organizations of all sizes
              find skilled candidates efficiently, reducing time-to-hire and
              improving workforce quality.
            </motion.p>

            <motion.p
              variants={fadeUp}
              custom={0.3}
              className="font-body text-muted-foreground text-base leading-relaxed mb-8"
            >
              Our experienced team brings deep industry knowledge to every
              search — understanding not just the role requirements, but the
              culture, vision, and long-term goals of both our clients and
              candidates.
            </motion.p>

            <motion.ul variants={stagger} className="space-y-3 mb-8">
              {benefits.map((benefit, i) => (
                <motion.li
                  key={benefit}
                  variants={fadeUp}
                  custom={0.4 + i * 0.07}
                  className="flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-gold" />
                  </div>
                  <span className="font-body text-foreground text-sm">
                    {benefit}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} custom={0.8}>
              <Button
                onClick={() => {
                  const el = document.getElementById("contact");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                size="lg"
                className="bg-navy hover:bg-navy-mid text-white font-semibold border-0 group"
              >
                Partner With Us
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const submitMutation = useSubmitInquiry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      await submitMutation.mutateAsync({ name, email, message });
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
      toast.success("Your inquiry has been sent successfully!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28 gradient-hero relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" aria-hidden="true">
          <defs>
            <pattern
              id="grid3"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid3)" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.div
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold font-body text-xs font-semibold tracking-widest uppercase mb-4"
          >
            Let's Talk
          </motion.div>
          <motion.h2
            variants={fadeUp}
            custom={0.1}
            className="font-display font-extrabold text-white text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4"
          >
            Get in Touch
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={0.2}
            className="font-body text-white/70 text-base md:text-lg max-w-xl mx-auto"
          >
            Ready to find the perfect candidate? Send us your hiring inquiry and
            our team will respond within 24 hours.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl p-6">
              <h3 className="font-display font-bold text-white text-lg mb-5">
                Contact Information
              </h3>
              <div className="space-y-4">
                <a
                  href="mailto:c2chrsolution9@gmail.com"
                  data-ocid="contact.email_link"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold/15 border border-gold/25 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/25 transition-colors">
                    <Mail className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <div className="font-body text-white/50 text-xs mb-0.5">
                      Email Us
                    </div>
                    <div className="font-body text-white text-sm font-medium group-hover:text-gold transition-colors break-all">
                      c2chrsolution9@gmail.com
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/8 border border-white/15 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white/60" />
                  </div>
                  <div>
                    <div className="font-body text-white/50 text-xs mb-0.5">
                      Availability
                    </div>
                    <div className="font-body text-white text-sm font-medium">
                      Mon–Sat, 9 AM – 7 PM
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/8 border border-white/15 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white/60" />
                  </div>
                  <div>
                    <div className="font-body text-white/50 text-xs mb-0.5">
                      Response Time
                    </div>
                    <div className="font-body text-white text-sm font-medium">
                      Within 24 hours
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gold/10 border border-gold/25 rounded-2xl p-5">
              <div className="font-display font-bold text-white text-base mb-2">
                Why Choose C2C HR?
              </div>
              <ul className="space-y-2">
                {[
                  "Fast & reliable placements",
                  "Industry-specialized recruiters",
                  "No placement, no fee policy",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 font-body text-white/70 text-sm"
                  >
                    <Check className="w-4 h-4 text-gold flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="bg-white rounded-2xl shadow-navy-lg p-7 md:p-8">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    data-ocid="contact.success_state"
                    className="text-center py-10"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-5">
                      <Check className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="font-display font-bold text-navy-deep text-xl mb-2">
                      Inquiry Sent!
                    </h3>
                    <p className="font-body text-muted-foreground text-sm mb-6">
                      Thank you for reaching out. Our team will get back to you
                      within 24 hours.
                    </p>
                    <Button
                      onClick={() => setSubmitted(false)}
                      variant="outline"
                      className="border-navy text-navy hover:bg-navy hover:text-white"
                    >
                      Send Another Inquiry
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <div>
                      <h3 className="font-display font-bold text-navy-deep text-xl mb-1">
                        Send a Hiring Inquiry
                      </h3>
                      <p className="font-body text-muted-foreground text-sm">
                        Fill out the form and we'll be in touch soon.
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="name"
                        className="font-body text-foreground font-medium text-sm"
                      >
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        data-ocid="contact.input"
                        placeholder="Your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border-border focus:ring-ring focus:border-ring font-body text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="email"
                        className="font-body text-foreground font-medium text-sm"
                      >
                        Email Address{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        data-ocid="contact.email_input"
                        placeholder="your@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border-border focus:ring-ring focus:border-ring font-body text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="message"
                        className="font-body text-foreground font-medium text-sm"
                      >
                        Message / Inquiry{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        data-ocid="contact.textarea"
                        placeholder="Describe your hiring requirements, role(s), timeline, and any other relevant details..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                        rows={5}
                        className="border-border focus:ring-ring focus:border-ring font-body text-sm resize-none"
                      />
                    </div>

                    {submitMutation.isError && (
                      <div
                        data-ocid="contact.error_state"
                        className="rounded-lg bg-destructive/10 border border-destructive/25 p-3"
                      >
                        <p className="font-body text-destructive text-sm">
                          Something went wrong. Please try again or email us
                          directly at{" "}
                          <a
                            href="mailto:c2chrsolution9@gmail.com"
                            className="underline"
                          >
                            c2chrsolution9@gmail.com
                          </a>
                          .
                        </p>
                      </div>
                    )}

                    <Button
                      type="submit"
                      data-ocid="contact.submit_button"
                      disabled={submitMutation.isPending}
                      size="lg"
                      className="w-full bg-navy hover:bg-navy-mid text-white font-semibold border-0 text-base"
                    >
                      {submitMutation.isPending ? (
                        <>
                          <Loader2
                            data-ocid="contact.loading_state"
                            className="mr-2 w-4 h-4 animate-spin"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Inquiry
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer className="bg-navy-deep border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center">
              <Building2 className="w-4 h-4 text-navy-deep" />
            </div>
            <div>
              <span className="font-display font-bold text-white text-sm">
                C2C HR Solutions
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-5">
            <a
              href="mailto:c2chrsolution9@gmail.com"
              className="font-body text-white/60 hover:text-gold text-sm flex items-center gap-1.5 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              c2chrsolution9@gmail.com
            </a>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="font-body text-white/40 text-sm">
              Recruitment & Staffing Consultancy
            </span>
          </div>

          <div className="font-body text-white/40 text-xs text-center md:text-right">
            © {year}. Built with <span className="text-red-400">♥</span> using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-gold transition-colors"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Root ──────────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen font-body bg-background">
      <Toaster richColors position="top-right" />
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
