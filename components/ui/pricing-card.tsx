"use client";

import { Clock01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const plans = [
  {
    id: "personal",
    name: "Personal Finance",
    description: "Coaching 1-on-1",
    price: 550000,
    unit: "/ sesi",
    duration: "50 menit per sesi",
    badge: null as string | null,
    features: [
      "Sesi mendalam 1-on-1 bersama advisor",
      "Strategi budgeting & tabungan personal",
      "Perencanaan manajemen utang",
      "Roadmap keuangan berbasis tujuan",
      "Discovery session 25 menit GRATIS untuk klien baru",
    ],
  },
  {
    id: "portfolio",
    name: "Portofolio Investing",
    description: "Panduan investasi",
    price: 250000,
    unit: "/ sesi",
    duration: "50 menit per sesi",
    badge: null as string | null,
    features: [
      "Review & alokasi portofolio investasi",
      "Penilaian risiko & profil investor",
      "Panduan saham & reksa dana",
      "Market insight & briefing terkini",
    ],
  },
  {
    id: "family",
    name: "Family Package",
    description: "Paket lengkap keluarga",
    price: 1500000,
    unit: "/ paket",
    duration: "3 sesi bundel",
    badge: "BEST VALUE",
    features: [
      "1 sesi discovery (25 menit)",
      "2 fase personalized coaching (50 menit)",
      "Penetapan tujuan keuangan keluarga",
      "Rencana budget & tabungan keluarga",
      "Priority support antar sesi",
    ],
  },
];

const SPRING = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

export default function PricingCard() {
  const [selectedPlan, setSelectedPlan] = useState("personal");

  return (
    <div className="w-full max-w-[500px] flex flex-col gap-5 p-5 sm:p-6 rounded-2xl border border-border bg-background shadow-sm not-prose">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold text-foreground tracking-tight font-display">
          Pilih Layanan
        </h2>
        <p className="text-sm text-muted-foreground">
          Semua sesi dilakukan secara online · 50 menit per sesi
        </p>
      </div>

      {/* Free discovery promo banner */}
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-primary/10 border border-primary/20">
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
        <p className="text-xs sm:text-sm font-medium text-foreground leading-snug">
          <span className="font-bold text-primary">Khusus saat ini:</span>{" "}
          Discovery session 25 menit{" "}
          <span className="font-bold">GRATIS</span>{" "}
          <span className="text-muted-foreground line-through text-xs">
            Rp&nbsp;200.000
          </span>
        </p>
      </div>

      {/* Plan list */}
      <div className="flex flex-col gap-3">
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;

          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className="relative cursor-pointer"
            >
              <div
                className={`relative rounded-xl bg-card transition-colors duration-300 ${
                  isSelected
                    ? "border-2 border-primary"
                    : "border border-foreground/10"
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <span
                    className="absolute -top-3 right-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold tracking-wide"
                    style={{ boxShadow: "0 2px 8px rgba(126,217,87,0.4)" }}
                  >
                    {plan.badge}
                  </span>
                )}

                <div className="p-5">
                  {/* Plan header row */}
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex gap-3">
                      {/* Radio dot */}
                      <div className="mt-0.5 shrink-0">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                            isSelected
                              ? "border-primary"
                              : "border-muted-foreground/25"
                          }`}
                        >
                          <AnimatePresence mode="wait" initial={false}>
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="w-3 h-3 rounded-full bg-primary"
                                transition={{
                                  type: "spring",
                                  stiffness: 300,
                                  damping: 25,
                                }}
                              />
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      {/* Name + description */}
                      <div>
                        <h3 className="text-base font-semibold text-foreground leading-tight">
                          {plan.name}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {plan.description}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right shrink-0">
                      <div className="text-xl font-semibold text-foreground flex items-baseline justify-end gap-0.5">
                        <span className="text-sm font-medium">Rp</span>
                        <NumberFlow
                          value={plan.price}
                          format={{
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                            useGrouping: true,
                          }}
                          locales="id-ID"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground/60">
                        {plan.unit}
                      </p>
                    </div>
                  </div>

                  {/* Expanded content */}
                  <AnimatePresence initial={false}>
                    {isSelected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-5 flex flex-col gap-5">
                          {/* Features */}
                          <div className="flex flex-col gap-3">
                            {plan.features.map((feature, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  delay: idx * 0.05,
                                  duration: 0.3,
                                }}
                                className="flex items-start gap-2.5 text-sm text-foreground/80"
                              >
                                <HugeiconsIcon
                                  icon={Tick02Icon}
                                  size={15}
                                  className="text-primary shrink-0 mt-0.5"
                                />
                                {feature}
                              </motion.div>
                            ))}
                          </div>

                          <div className="h-px bg-muted" />

                          {/* Duration info */}
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center shrink-0">
                              <HugeiconsIcon
                                icon={Clock01Icon}
                                size={18}
                                className="text-muted-foreground"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {plan.duration}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Online via Zoom / Google Meet
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <a
        href="#contact"
        className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-center text-sm transition-opacity duration-200 hover:opacity-90 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        style={{
          boxShadow:
            "0 4px 12px rgba(126,217,87,0.3), 0 8px 24px rgba(126,217,87,0.15)",
        }}
      >
        Book Sesi Sekarang
      </a>
      <p className="text-center text-xs text-muted-foreground -mt-2">
        Bayar setelah booking dikonfirmasi · Tidak ada biaya tersembunyi
      </p>
    </div>
  );
}
