"use client";

import { useState, useEffect, useRef } from "react";
import PricingCard from "@/components/ui/pricing-card";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [navShadow, setNavShadow] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", service: "", message: "" });
  const successRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setNavShadow(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Move focus to the success message when the form is submitted
  useEffect(() => {
    if (formSubmitted && successRef.current) {
      successRef.current.focus();
    }
  }, [formSubmitted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const serviceLabel = formData.service === "personal"
      ? "1-on-1 Financial Planning (Rp 550.000/sesi)"
      : formData.service === "portfolio"
      ? "Portofolio Investing (Rp 250.000/sesi)"
      : "Family Package (Rp 1.500.000/paket)";

    const text = [
      `Halo, saya ingin book konsultasi gratis dengan AMR Funds.`,
      ``,
      `*Nama:* ${formData.name}`,
      `*Email:* ${formData.email}`,
      `*Layanan:* ${serviceLabel}`,
      formData.message ? `*Goals/Pesan:* ${formData.message}` : "",
    ].filter(Boolean).join("\n");

    const waUrl = `https://wa.me/6285320636948?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
    setFormSubmitted(true);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Skip link — visible on keyboard focus */}
      <a href="#main" className="skip-link">Skip to main content</a>

      {/* ===== NAVIGATION ===== */}
      <nav
        aria-label="Primary"
        className="fixed top-0 left-0 right-0 z-50 nav-blur bg-white/80 border-b border-brand-green/10 transition-shadow duration-300"
        style={{ boxShadow: navShadow ? "0 1px 8px rgba(26,43,18,0.06)" : "none" }}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2 spring-transition hover:opacity-80 active:scale-95">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Brand_assets/just logo amrfund.png" alt="AMR Funds Logo" className="h-10 sm:h-12 w-auto" />
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#services" className="text-sm font-medium text-brand-dark-muted hover:text-brand-green-deeper spring-transition">Services</a>
              <a href="#about" className="text-sm font-medium text-brand-dark-muted hover:text-brand-green-deeper spring-transition">About</a>
              <a href="#how-it-works" className="text-sm font-medium text-brand-dark-muted hover:text-brand-green-deeper spring-transition">How It Works</a>
              <a href="#pricing" className="text-sm font-medium text-brand-dark-muted hover:text-brand-green-deeper spring-transition">Pricing</a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-green text-white text-sm font-semibold spring-transition hover:bg-brand-green-dark hover:scale-105 active:scale-95"
                style={{ boxShadow: "0 2px 8px rgba(126,217,87,0.3), 0 4px 16px rgba(126,217,87,0.15)" }}
              >
                Book a Session
              </a>
            </div>

            {/* Hamburger — 44px min target */}
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="md:hidden p-3 -mr-1 rounded-lg spring-transition hover:bg-surface-muted active:scale-90"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? (
                <svg aria-hidden="true" className="w-6 h-6 text-brand-dark" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg aria-hidden="true" className="w-6 h-6 text-brand-dark" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          role="dialog"
          aria-label="Site navigation"
          aria-hidden={!mobileMenuOpen}
          className={`fixed top-16 right-0 bottom-0 w-72 bg-white/95 nav-blur border-l border-brand-green/10 p-6 md:hidden transition-transform duration-[350ms] ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.34,1.56,0.64,1)" }}
        >
          <div className="flex flex-col gap-2">
            <a href="#services"     onClick={closeMobileMenu} className="text-base font-medium text-brand-dark-muted hover:text-brand-green-deeper py-3 px-2 -mx-2 rounded-lg spring-transition hover:bg-surface-muted">Services</a>
            <a href="#about"        onClick={closeMobileMenu} className="text-base font-medium text-brand-dark-muted hover:text-brand-green-deeper py-3 px-2 -mx-2 rounded-lg spring-transition hover:bg-surface-muted">About</a>
            <a href="#how-it-works" onClick={closeMobileMenu} className="text-base font-medium text-brand-dark-muted hover:text-brand-green-deeper py-3 px-2 -mx-2 rounded-lg spring-transition hover:bg-surface-muted">How It Works</a>
            <a href="#pricing"      onClick={closeMobileMenu} className="text-base font-medium text-brand-dark-muted hover:text-brand-green-deeper py-3 px-2 -mx-2 rounded-lg spring-transition hover:bg-surface-muted">Pricing</a>
            <a
              href="#contact"
              onClick={closeMobileMenu}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-brand-green-dark text-white text-sm font-semibold spring-transition hover:bg-brand-green-deeper active:scale-95 mt-3"
              style={{ boxShadow: "0 2px 8px rgba(126,217,87,0.3)" }}
            >
              Book a Session
            </a>
          </div>
        </div>
      </nav>

      <main id="main">


      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden grain pt-24 sm:pt-36 pb-16 sm:pb-24">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.07]"
               style={{ background: "radial-gradient(circle, #7ED957 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.05]"
               style={{ background: "radial-gradient(circle, #F4B183 0%, transparent 70%)" }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="animate-fade-in-up">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-green/10 text-brand-green-deeper text-xs sm:text-sm font-semibold tracking-wide mb-6">
                  <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                  Financial Planning Made Simple
                </span>
              </div>

              <h1 className="animate-fade-in-up delay-100 font-display text-[2.25rem] sm:text-5xl lg:text-6xl font-bold tracking-display leading-[1.1] mb-6 [text-wrap:balance]">
                Take Control of<br />
                <span className="text-gradient">Your Financial</span><br />
                Future
              </h1>

              <p className="animate-fade-in-up delay-200 text-[0.935rem] sm:text-lg text-brand-dark-muted max-w-lg mx-auto lg:mx-0 mb-8 leading-body">
                Helping you plan your budget with an easy and fun process. Whether you&apos;re managing personal finances or building family wealth, I&apos;m here to guide you every step of the way.
              </p>

              <div className="animate-fade-in-up delay-300 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand-green-dark text-white font-semibold spring-transition hover:bg-brand-green-deeper hover:scale-105 active:scale-95"
                  style={{ boxShadow: "0 4px 12px rgba(58,138,31,0.35), 0 8px 24px rgba(58,138,31,0.18)" }}
                >
                  Book a Free Consultation
                  <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a href="#services" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-brand-dark/20 text-brand-dark font-semibold spring-transition hover:border-brand-green-deeper hover:text-brand-green-deeper hover:scale-105 active:scale-95">
                  Explore Services
                </a>
              </div>

              <div className="animate-fade-in-up delay-400 mt-10 flex flex-wrap items-center gap-4 sm:gap-6 justify-center lg:justify-start text-xs sm:text-sm text-brand-dark-muted">
                <div className="flex items-center gap-2">
                  <svg aria-hidden="true" className="w-5 h-5 text-brand-green-deeper shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>5+ Years Financial Market Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg aria-hidden="true" className="w-5 h-5 text-brand-green-deeper shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>+250 Million IDR Portfolio Value Managed</span>
                </div>
              </div>
            </div>

            {/* Photo */}
            <div className="animate-fade-in-up delay-300 flex-shrink-0">
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-brand-peach/20 blur-xl" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-brand-green/15 blur-xl" />
                <div className="absolute -top-6 -left-2 grid grid-cols-3 gap-1.5 opacity-30">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="w-2 h-2 rounded-full bg-brand-green" />
                  ))}
                </div>
                <div className="relative w-56 h-72 sm:w-72 sm:h-[360px] lg:w-80 lg:h-[400px] rounded-2xl overflow-hidden photo-frame">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/Brand_assets/AMR Founder.png" alt="AMR Funds Founder" className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-brand-green/5 mix-blend-multiply" />
                </div>
                <div
                  className="absolute -bottom-3 -right-3 bg-white rounded-xl px-4 py-2.5 spring-transition"
                  style={{ boxShadow: "0 4px 16px rgba(26,43,18,0.1), 0 1px 4px rgba(26,43,18,0.06)" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand-peach-light flex items-center justify-center" aria-hidden="true">
                      <svg className="w-4 h-4 text-brand-peach-dark" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-brand-dark">Personalized Portfolio Advisor</div>
                      <div className="text-[10px] text-brand-dark-muted">Banking &amp; Investment</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ===== SERVICES ===== */}
      <section id="services" className="relative py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14 sm:mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-peach/15 text-brand-peach-dark text-xs sm:text-sm font-semibold tracking-wide mb-4">What I Offer</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-display mb-4">
              Services Tailored<br className="hidden sm:block" /> <span className="text-gradient">For You</span>
            </h2>
            <p className="text-brand-dark-muted max-w-xl mx-auto">
              Every financial journey is unique. Choose the service that fits your needs, and let&apos;s build a plan together.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1 */}
            <article className="service-card group relative bg-white rounded-2xl p-7 sm:p-8 spring-transition hover:-translate-y-1">
              <div aria-hidden="true" className="w-14 h-14 rounded-xl bg-brand-green/10 flex items-center justify-center mb-6 spring-transition group-hover:bg-brand-green/20 group-hover:scale-110">
                <svg className="w-7 h-7 text-brand-green-deeper" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold mb-3 tracking-tight">1-on-1 Financial Planning</h3>
              <p className="text-brand-dark-muted text-sm leading-relaxed mb-6">
                Personalized sessions designed around your unique financial situation. We&apos;ll map out your goals, optimize your budget, and create a clear path forward.
              </p>
              <a href="#contact" aria-label="Get started with 1-on-1 Financial Planning" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green-deeper spring-transition hover:gap-3 hover:text-brand-green-dark underline-offset-4 hover:underline">
                Get Started
                <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </article>

            {/* Card 2 */}
            <article className="service-card group relative bg-white rounded-2xl p-7 sm:p-8 spring-transition hover:-translate-y-1">
              <div
                className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-brand-peach-dark text-white text-xs font-bold"
                style={{ boxShadow: "0 2px 8px rgba(232,155,94,0.45)" }}
              >
                <span aria-label="Most popular option">Popular</span>
              </div>
              <div aria-hidden="true" className="w-14 h-14 rounded-xl bg-brand-peach/15 flex items-center justify-center mb-6 spring-transition group-hover:bg-brand-peach/25 group-hover:scale-110">
                <svg className="w-7 h-7 text-brand-peach-dark" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold mb-3 tracking-tight">Family Financial Planning</h3>
              <p className="text-brand-dark-muted text-sm leading-relaxed mb-6">
                Bring the whole family on the same page. From household budgets to education funds, we&apos;ll create a plan that works for everyone.
              </p>
              <a href="#contact" aria-label="Get started with Family Financial Planning" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green-deeper spring-transition hover:gap-3 hover:text-brand-green-dark underline-offset-4 hover:underline">
                Get Started
                <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </article>

            {/* Card 3 */}
            <article className="service-card group relative bg-white rounded-2xl p-7 sm:p-8 spring-transition hover:-translate-y-1">
              <div aria-hidden="true" className="w-14 h-14 rounded-xl bg-brand-green/10 flex items-center justify-center mb-6 spring-transition group-hover:bg-brand-green/20 group-hover:scale-110">
                <svg className="w-7 h-7 text-brand-green-deeper" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold mb-3 tracking-tight">Investment Portfolio Planning</h3>
              <p className="text-brand-dark-muted text-sm leading-relaxed mb-6">
                Ready to grow your wealth? I&apos;ll help you understand investment options and build a diversified portfolio matched to your risk profile.
              </p>
              <a href="#contact" aria-label="Get started with Investment Portfolio Planning" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green-deeper spring-transition hover:gap-3 hover:text-brand-green-dark underline-offset-4 hover:underline">
                Get Started
                <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </article>
          </div>
        </div>
      </section>


      {/* ===== ABOUT ===== */}
      <section id="about" className="relative py-20 sm:py-28 bg-surface-muted grain">
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-shrink-0 relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-green/10 to-brand-peach/10 blur-2xl" />
              <div className="relative w-72 h-80 sm:w-80 sm:h-[420px] rounded-2xl overflow-hidden photo-frame">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/Brand_assets/AMR Founder.png" alt="Bani — AMR Funds Founder" className="w-full h-full object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/50 via-transparent to-transparent" />
                <div className="absolute inset-0 bg-brand-green/5 mix-blend-multiply" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-display text-xl font-bold text-white">Bani</p>
                  <p className="text-white/80 text-sm">Founder, AMR Funds</p>
                </div>
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-green/10 text-brand-green-deeper text-xs sm:text-sm font-semibold tracking-wide mb-4">Meet Your Advisor</span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-display mb-6">
                Budgeting Doesn&apos;t Have<br />to Be <span className="text-gradient">Complicated</span>
              </h2>
              <p className="text-brand-dark-muted leading-body mb-5">
                Hi, I&apos;m Bani — a financial advisor with a background in both banking and management. With over 5 years of experience in financial markets, I&apos;ve seen firsthand how the right guidance can transform someone&apos;s relationship with money.
              </p>
              <p className="text-brand-dark-muted leading-body mb-8">
                I started AMR Funds because I believe everyone deserves access to clear, practical financial advice — not just textbook lectures. Whether you&apos;re a young professional trying to save your first million, or a family looking to get your budget on track, I&apos;m here to make the process easy and, yes, even fun.
              </p>

              <div className="flex items-center gap-8 justify-center lg:justify-start">
                <div>
                  <div className="font-display text-3xl font-bold text-gradient">5+</div>
                  <div className="text-xs text-brand-dark-muted mt-1">Years in Finance Markets</div>
                </div>
                <div aria-hidden="true" className="w-px h-12 bg-brand-dark/20" />
                <div>
                  <div className="font-display text-3xl font-bold text-gradient">250+</div>
                  <div className="text-xs text-brand-dark-muted mt-1">Million IDR Portfolio Managed</div>
                </div>
                <div aria-hidden="true" className="w-px h-12 bg-brand-dark/20" />
                <div>
                  <div className="font-display text-3xl font-bold text-gradient">3</div>
                  <div className="text-xs text-brand-dark-muted mt-1">Core Services</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14 sm:mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-peach/15 text-brand-peach-dark text-xs sm:text-sm font-semibold tracking-wide mb-4">Simple Process</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-display mb-4">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-brand-dark-muted max-w-xl mx-auto">
              Getting started is easy. Here&apos;s how we&apos;ll work together to build your financial plan.
            </p>
          </div>

          <ol className="grid md:grid-cols-3 gap-8 lg:gap-12 list-none">
            <li className="relative text-center">
              <div className="step-connector hidden md:block">
                <div aria-hidden="true" className="w-14 h-14 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-6 relative z-10 ring-1 ring-brand-green/20">
                  <span className="font-display text-xl font-bold text-brand-green-deeper">1</span>
                </div>
              </div>
              <div aria-hidden="true" className="md:hidden w-14 h-14 rounded-full bg-brand-green/10 flex items-center justify-center mx-auto mb-6 ring-1 ring-brand-green/20">
                <span className="font-display text-xl font-bold text-brand-green-deeper">1</span>
              </div>
              <h3 className="font-display text-lg font-bold mb-2"><span className="sr-only">Step 1: </span>Book a Session</h3>
              <p className="text-brand-dark-muted text-sm leading-relaxed">Reach out through the form below or send me a message. We&apos;ll find a time that works for you.</p>
            </li>
            <li className="relative text-center">
              <div className="step-connector hidden md:block">
                <div aria-hidden="true" className="w-14 h-14 rounded-full bg-brand-green/15 flex items-center justify-center mx-auto mb-6 relative z-10 ring-1 ring-brand-green/30">
                  <span className="font-display text-xl font-bold text-brand-green-deeper">2</span>
                </div>
              </div>
              <div aria-hidden="true" className="md:hidden w-14 h-14 rounded-full bg-brand-green/15 flex items-center justify-center mx-auto mb-6 ring-1 ring-brand-green/30">
                <span className="font-display text-xl font-bold text-brand-green-deeper">2</span>
              </div>
              <h3 className="font-display text-lg font-bold mb-2"><span className="sr-only">Step 2: </span>We Talk</h3>
              <p className="text-brand-dark-muted text-sm leading-relaxed">In a relaxed conversation, I&apos;ll learn about your financial situation, goals, and concerns. No judgement, just clarity.</p>
            </li>
            <li className="text-center">
              <div aria-hidden="true" className="w-14 h-14 rounded-full bg-brand-green/20 flex items-center justify-center mx-auto mb-6 ring-1 ring-brand-green/40">
                <span className="font-display text-xl font-bold text-brand-green-deeper">3</span>
              </div>
              <h3 className="font-display text-lg font-bold mb-2"><span className="sr-only">Step 3: </span>Get Your Plan</h3>
              <p className="text-brand-dark-muted text-sm leading-relaxed">You&apos;ll receive a clear, actionable financial plan tailored to your life — plus ongoing support as you put it into action.</p>
            </li>
          </ol>
        </div>
      </section>


      {/* ===== TESTIMONIAL ===== */}
      <section className="py-20 sm:py-28 bg-surface-muted grain">
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14 sm:mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-green/10 text-brand-green-deeper text-xs sm:text-sm font-semibold tracking-wide mb-4">Client Stories</span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-display mb-4">
              What Clients <span className="text-gradient">Say</span>
            </h2>
          </div>

          <div
            className="max-w-5xl mx-auto bg-white rounded-3xl overflow-hidden"
            style={{ boxShadow: "0 2px 8px rgba(126,217,87,0.05), 0 8px 32px rgba(26,43,18,0.08), 0 0 0 1px rgba(126,217,87,0.08)" }}
          >
            <div className="flex flex-col lg:flex-row">
              <div className="relative lg:w-[45%] flex-shrink-0">
                <div className="relative h-64 sm:h-80 lg:h-full min-h-[320px] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/Brand_assets/testimoni.jpg" alt="Consultation session with Arben" className="w-full h-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/30 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-white/10" />
                  <div className="absolute inset-0 bg-brand-green/5 mix-blend-multiply" />
                  <div
                    className="absolute top-4 left-4 sm:top-5 sm:left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 nav-blur"
                    style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
                  >
                    <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
                    <span className="text-xs font-semibold text-brand-dark">Live Session</span>
                  </div>
                </div>
              </div>

              <figure className="flex-1 p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
                <div aria-hidden="true" className="w-10 h-10 rounded-full bg-brand-green/10 flex items-center justify-center mb-6">
                  <svg className="w-5 h-5 text-brand-green-deeper" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
                  </svg>
                </div>
                <blockquote lang="id" className="font-display text-xl sm:text-2xl font-medium tracking-display leading-snug mb-8 text-brand-dark">
                  <p>&ldquo;Mas Bani provide rekomendasi dan insight yang fit untuk budgeting kami dari yang awalnya tidak paham sama sekali, ditambah mas Bani provide insight untuk portofolio investasi saya sesuai risk management dari basicnya yang sudah berpengalaman.&rdquo;</p>
                </blockquote>
                <figcaption>
                  <div className="flex items-center gap-3">
                    <div aria-hidden="true" className="w-11 h-11 rounded-full bg-brand-peach-light flex items-center justify-center ring-2 ring-brand-peach/40">
                      <span className="font-bold text-brand-peach-dark text-sm">A</span>
                    </div>
                    <div>
                      <cite className="not-italic font-semibold text-sm text-brand-dark block">Arben</cite>
                      <span className="text-xs text-brand-dark-muted">Financial Planning Client</span>
                    </div>
                  </div>
                  <div role="img" aria-label="Rated 5 out of 5 stars" className="flex items-center gap-1 mt-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} aria-hidden="true" className="w-4 h-4 text-brand-peach-dark" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>


      {/* ===== PRICING ===== */}
      <section id="pricing" className="py-20 sm:py-28" lang="id">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14 sm:mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-green/10 text-brand-green-deeper text-xs sm:text-sm font-semibold tracking-wide mb-4">
              Transparansi Harga
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-display mb-4">
              Investasi <span className="text-gradient">Terbaik</span> Untukmu
            </h2>
            <p className="text-brand-dark-muted max-w-xl mx-auto">
              Pilih layanan yang paling sesuai dengan kebutuhanmu. Tidak ada biaya tersembunyi, tidak ada komitmen jangka panjang.
            </p>
          </div>

          <div className="flex justify-center">
            <PricingCard />
          </div>
        </div>
      </section>


      {/* ===== CTA / CONTACT ===== */}
      <section id="contact" className="relative py-20 sm:py-28 overflow-hidden grain">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.04]"
            style={{ background: "radial-gradient(circle, #7ED957 0%, transparent 60%)" }}
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-green/10 text-brand-green-deeper text-xs sm:text-sm font-semibold tracking-wide mb-4">Let&apos;s Get Started</span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-display mb-4">
            Ready to Take the<br /><span className="text-gradient">First Step?</span>
          </h2>
          <p className="text-brand-dark-muted max-w-xl mx-auto mb-10">
            Book a free consultation session. No pressure, no obligations — just a friendly conversation about your financial goals.
          </p>

          {!formSubmitted ? (
            <form className="max-w-lg mx-auto text-left" onSubmit={handleSubmit} aria-describedby="form-note">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-brand-dark mb-1.5">Your Name</label>
                  <input
                    type="text" id="name" name="name" required autoComplete="name" placeholder="e.g. John Doe"
                    value={formData.name} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-brand-dark/15 text-brand-dark placeholder:text-brand-dark-muted/70 spring-transition focus:border-brand-green-deeper focus:ring-2 focus:ring-brand-green/30 focus:outline-none"
                    style={{ boxShadow: "0 1px 3px rgba(26,43,18,0.04)" }}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-brand-dark mb-1.5">Email Address</label>
                  <input
                    type="email" id="email" name="email" required autoComplete="email" placeholder="john@example.com"
                    value={formData.email} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-brand-dark/15 text-brand-dark placeholder:text-brand-dark-muted/70 spring-transition focus:border-brand-green-deeper focus:ring-2 focus:ring-brand-green/30 focus:outline-none"
                    style={{ boxShadow: "0 1px 3px rgba(26,43,18,0.04)" }}
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-brand-dark mb-1.5">Service Interested In</label>
                  <div className="relative">
                    <select
                      id="service" name="service" required
                      value={formData.service} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-brand-dark/15 text-brand-dark spring-transition focus:border-brand-green-deeper focus:ring-2 focus:ring-brand-green/30 focus:outline-none appearance-none pr-10"
                      style={{ boxShadow: "0 1px 3px rgba(26,43,18,0.04)" }}
                    >
                      <option value="" disabled>Choose a service</option>
                      <option value="personal" lang="id">1-on-1 Financial Planning — Rp 550.000/sesi</option>
                      <option value="portfolio" lang="id">Portofolio Investing — Rp 250.000/sesi</option>
                      <option value="family" lang="id">Family Package — Rp 1.500.000/paket</option>
                    </select>
                    <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                      <svg className="w-5 h-5 text-brand-dark-muted" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 20 20">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 8l4 4 4-4" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-brand-dark mb-1.5">Tell Me About Your Goals <span className="text-brand-dark-muted font-normal">(optional)</span></label>
                  <textarea
                    id="message" name="message" rows={4} placeholder="What would you like to achieve with your finances?"
                    value={formData.message} onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-brand-dark/15 text-brand-dark placeholder:text-brand-dark-muted/70 spring-transition focus:border-brand-green-deeper focus:ring-2 focus:ring-brand-green/30 focus:outline-none resize-none"
                    style={{ boxShadow: "0 1px 3px rgba(26,43,18,0.04)" }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-brand-green-dark text-white font-semibold spring-transition hover:bg-brand-green-deeper hover:scale-[1.02] active:scale-[0.98]"
                style={{ boxShadow: "0 4px 12px rgba(58,138,31,0.35), 0 8px 24px rgba(58,138,31,0.18)" }}
              >
                {/* WhatsApp glyph so the destination is telegraphed */}
                <svg aria-hidden="true" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.58-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Book My Free Consultation
              </button>
              <p id="form-note" className="text-center text-xs text-brand-dark-muted mt-3 leading-relaxed">
                Free 25-minute discovery session. Submitting opens WhatsApp with your details pre-filled — no commitment required.
              </p>
            </form>
          ) : (
            <div
              ref={successRef}
              tabIndex={-1}
              role="status"
              aria-live="polite"
              className="mt-8 p-6 rounded-2xl bg-brand-green/10 border border-brand-green/30"
            >
              <svg aria-hidden="true" className="w-10 h-10 text-brand-green-deeper mx-auto mb-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="font-display text-lg font-bold text-brand-dark">Thank you!</p>
              <p className="text-sm text-brand-dark-muted mt-1">
                A WhatsApp chat should have opened with your details. If it didn&apos;t,{" "}
                <a href="https://wa.me/6285320636948" target="_blank" rel="noreferrer" className="font-semibold text-brand-green-deeper underline underline-offset-2">
                  open it manually here
                </a>. I&apos;ll reply within 24 hours.
              </p>
            </div>
          )}
        </div>
      </section>


      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-brand-dark text-white/85 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="flex flex-col items-center sm:items-start gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Brand_assets/with caption amrfund.png" alt="AMR Funds" className="h-16 w-auto brightness-0 invert" />
              <p className="text-sm text-white/70 max-w-xs text-center sm:text-left">
                Making financial planning accessible, easy, and enjoyable for everyone.
              </p>
            </div>
            <nav aria-label="Footer" className="flex flex-col items-center sm:items-end gap-4">
              <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm list-none">
                <li><a href="#services"     className="inline-block py-1 spring-transition hover:text-brand-green underline-offset-4 hover:underline">Services</a></li>
                <li><a href="#about"        className="inline-block py-1 spring-transition hover:text-brand-green underline-offset-4 hover:underline">About</a></li>
                <li><a href="#how-it-works" className="inline-block py-1 spring-transition hover:text-brand-green underline-offset-4 hover:underline">How It Works</a></li>
                <li><a href="#pricing"      className="inline-block py-1 spring-transition hover:text-brand-green underline-offset-4 hover:underline">Pricing</a></li>
                <li><a href="#contact"      className="inline-block py-1 spring-transition hover:text-brand-green underline-offset-4 hover:underline">Contact</a></li>
              </ul>
              <p className="text-xs text-white/65">&copy; 2026 AMR Funds. All rights reserved.</p>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
