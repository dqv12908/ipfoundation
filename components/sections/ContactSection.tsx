"use client";

import { useState, type FormEvent } from "react";
import { Phone, Mail, Globe, User } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { getContent } from "@/lib/constants";
import SectionTitle from "@/components/ui/SectionTitle";
import SharpButton from "@/components/ui/GlowButton";
import { FadeInUp } from "@/components/ui/MotionWrappers";

interface FormData {
  name: string;
  email: string;
  organization: string;
  partnershipType: string;
  message: string;
}

export default function ContactSection() {
  const { locale } = useLang();
  const CONTACT = getContent(locale).CONTACT;
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    organization: "",
    partnershipType: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Partial<FormData>>({});

  function validate(): boolean {
    const errs: Partial<FormData> = {};
    if (!form.name.trim()) errs.name = CONTACT.validation.nameRequired;
    if (!form.email.trim()) errs.email = CONTACT.validation.emailRequired;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = CONTACT.validation.emailInvalid;
    if (!form.message.trim()) errs.message = CONTACT.validation.messageRequired;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", organization: "", partnershipType: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full bg-transparent border border-white/10 px-4 py-3 text-white placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-blue transition-colors text-sm";

  return (
    <section id="lien-he" className="relative py-20 md:py-28 bg-black">
      {/* Ambient glow behind form area (right side) */}
      <div className="absolute top-1/4 right-[10%] w-[600px] h-[500px] bg-glow-blue pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={CONTACT.sectionTitle}
          subtitle={CONTACT.sectionSubtitle}
        />

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Left: Info */}
          <FadeInUp>
            <div>
              <h3 className="font-heading text-2xl font-black text-white mb-8">
                {CONTACT.infoTitle}
              </h3>
              <div className="space-y-6">
                {[
                  { icon: User, text: CONTACT.info.name },
                  { icon: Phone, text: CONTACT.info.phone, href: `tel:+84${CONTACT.info.phone.replace(/\s/g, "").slice(1)}` },
                  { icon: Mail, text: CONTACT.info.email, href: `mailto:${CONTACT.info.email}` },
                  { icon: Globe, text: CONTACT.info.website },
                ].map(({ icon: Icon, text, href }) => (
                  <div key={text} className="border-b border-white/5 pb-5">
                    <Icon size={20} className="text-accent-blue mb-2" />
                    {href ? (
                      <a href={href} className="text-white hover:text-accent-blue transition-colors block">
                        {text}
                      </a>
                    ) : (
                      <span className="text-white">{text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </FadeInUp>

          {/* Right: Form */}
          <FadeInUp delay={0.2}>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder={CONTACT.form.name}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder={CONTACT.form.email}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <input
                type="text"
                placeholder={CONTACT.form.organization}
                value={form.organization}
                onChange={(e) => setForm({ ...form, organization: e.target.value })}
                className={inputClass}
              />

              <select
                value={form.partnershipType}
                onChange={(e) => setForm({ ...form, partnershipType: e.target.value })}
                className={inputClass}
              >
                <option value="" className="bg-black text-white">
                  {CONTACT.form.partnershipType}
                </option>
                {CONTACT.form.partnershipOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-black text-white">
                    {opt}
                  </option>
                ))}
              </select>

              <div>
                <textarea
                  placeholder={CONTACT.form.message}
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={inputClass + " resize-none"}
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              <SharpButton
                type="submit"
                variant="primary"
                disabled={status === "sending"}
                className="w-full"
              >
                {status === "sending"
                  ? CONTACT.form.sending
                  : CONTACT.form.submit}
              </SharpButton>

              {status === "success" && (
                <p className="text-green-400 text-sm text-center">
                  {CONTACT.form.success}
                </p>
              )}
              {status === "error" && (
                <p className="text-red-400 text-sm text-center">
                  {CONTACT.form.error}
                </p>
              )}
            </form>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
}
