import React from "react";
import { FaCheck, FaBuilding, FaCrown, FaBook } from "react-icons/fa";
import MagneticButton from "@/components/ui/MagneticButton";
import { TextMotion } from "@/components/ui/TextMotion";
import { WHATSAPP_URL } from "@/lib/contacts";

import pricingData from "../../../content/home/pricing.json";

interface PricingSectionProps {
  onNavigate?: (index: number) => void;
}

const planIcons: Record<string, React.ComponentType<any>> = {
  "Kit Completo": FaCrown,
  "Manual Impresso": FaBook,
  Empresarial: FaBuilding,
};

export const PricingSection = (_props: PricingSectionProps) => {
  const content = pricingData.pricingSection;

  return (
    <section
      id="planos"
      className="relative w-full h-full bg-[#09090b] text-white py-16 lg:py-20"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[60px_60px] pointer-events-none" />
      <div className="absolute left-[5%] top-1/3 h-80 w-80 rounded-full bg-[#ffd400]/10 blur-3xl pointer-events-none" />
      <div className="absolute right-[5%] bottom-1/4 h-80 w-80 rounded-full bg-[#00bcd4]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-block px-4 py-1.5 bg-zinc-900 rounded-full border border-zinc-800 mb-4 shadow-sm">
            <span className="text-xs font-bold text-[#ffd400] tracking-widest uppercase">
              {content.badge}
            </span>
          </div>

          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "Federo, serif" }}
          >
            <TextMotion trigger={true} stagger={0.05}>
              {content.title}
            </TextMotion>
          </h2>
          <p className="text-sm md:text-base text-zinc-300 font-sans max-w-2xl mx-auto leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {content.plans.map((plan: any, index: number) => {
            const IconComp = planIcons[plan.name] || FaBook;
            return (
              <div
                key={plan.name}
                className={`relative flex flex-col rounded-3xl border transition-all duration-300 ${
                  plan.highlight
                    ? "border-[#ffd400]/60 bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-900/90 lg:scale-[1.03] lg:-translate-y-2 shadow-[0_0_60px_rgba(255,212,0,0.12)]"
                    : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-700 hover:shadow-xl"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#ffd400] via-[#ffb700] to-[#ffd400]" />
                )}

                <div className="p-7 lg:p-8 pb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                        plan.highlight
                          ? "bg-[#ffd400]/15 border border-[#ffd400]/30"
                          : "bg-zinc-800 border border-zinc-700"
                      }`}
                    >
                      <IconComp
                        className={`text-xl ${
                          plan.highlight ? "text-[#ffd400]" : "text-zinc-300"
                        }`}
                      />
                    </div>
                    <h3
                      className={`text-2xl font-bold ${
                        plan.highlight ? "text-white" : "text-zinc-100"
                      }`}
                      style={{ fontFamily: "Federo, serif" }}
                    >
                      {plan.name}
                    </h3>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                    {plan.tagline}
                  </p>
                </div>

                <div
                  className={`relative border-t ${
                    plan.highlight ? "border-[#ffd400]/20" : "border-zinc-800"
                  }`}
                >
                  <span
                    className={`absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full whitespace-nowrap ${
                      plan.highlight
                        ? "bg-[#09090b] text-[#ffd400] border border-[#ffd400]/30"
                        : plan.business
                          ? "bg-[#09090b] text-[#00bcd4] border border-[#00bcd4]/20"
                          : "bg-[#09090b] text-zinc-400 border border-zinc-700"
                    }`}
                  >
                    {plan.priceLabel}
                  </span>
                </div>

                <div className="flex-1 p-7 lg:p-8 pt-8 flex flex-col gap-5">
                  <ul className="space-y-3 flex-1">
                    {plan.items.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                            plan.highlight
                              ? "bg-[#ffd400]/15 text-[#ffd400]"
                              : "bg-zinc-800 text-zinc-300"
                          }`}
                        >
                          <FaCheck size={10} />
                        </span>
                        <span className="text-sm text-zinc-300 leading-relaxed font-sans">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2">
                    <MagneticButton
                      href={WHATSAPP_URL}
                      target="_blank"
                      className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full font-bold uppercase tracking-widest text-[11px] transition-all duration-300 ${
                        plan.highlight
                          ? "bg-[#ffd400] text-black hover:bg-[#ffe566] shadow-lg hover:shadow-yellow-500/25"
                          : plan.business
                            ? "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-zinc-600"
                            : "bg-transparent text-white border border-zinc-700 hover:border-zinc-500 hover:bg-zinc-800/50"
                      }`}
                    >
                      <span>{plan.ctaLabel}</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </MagneticButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
