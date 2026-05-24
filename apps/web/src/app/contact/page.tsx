import type { Metadata } from "next";
import { site } from "@ekvir/config/site";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { LeadForm } from "@/components/forms/LeadForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with EKVIR for recruitment and staffing enquiries. We are based in Vadodara, Gujarat and serve businesses across India.",
};

const contactItems = [
  {
    label: "Email",
    value: site.contact.email,
    href: `mailto:${site.contact.email}`,
  },
  {
    label: "WhatsApp",
    value: `+91 ${site.contact.whatsapp}`,
    href: `https://wa.me/91${site.contact.whatsapp}`,
  },
  {
    label: "Location",
    value: site.contact.location,
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      <Section className="border-b border-[#C2A96A]/10">
        <Container>
          <p className="font-body text-xs uppercase tracking-widest text-[#8A8375] mb-4">
            Get in touch
          </p>
          <h1 className="font-heading text-5xl font-light text-[#2B2B2B] md:text-6xl">
            Let&apos;s talk hiring.
          </h1>
          <p className="mt-5 font-body text-lg leading-relaxed text-[#8A8375] max-w-xl">
            Share your requirement below or reach us directly. We respond within one business day.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1fr_380px] items-start">
            {/* Form */}
            <LeadForm />

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-[#C2A96A]/20 bg-white/60 p-8 space-y-6">
                <p className="font-body text-xs uppercase tracking-widest text-[#8A8375]">
                  Contact details
                </p>
                {contactItems.map((item) => (
                  <div key={item.label}>
                    <p className="font-body text-xs text-[#8A8375] mb-1">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-body text-sm text-[#2B2B2B] hover:text-[#C2A96A] transition-colors"
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-body text-sm text-[#2B2B2B]">{item.value}</p>
                    )}
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-[#C2A96A]/10 border border-[#C2A96A]/20 p-8">
                <p className="font-heading text-xl font-light text-[#2B2B2B] mb-2">
                  Prefer WhatsApp?
                </p>
                <p className="font-body text-sm text-[#8A8375] mb-4">
                  Message us directly for a faster response.
                </p>
                <a
                  href={`https://wa.me/91${site.contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-full bg-[#C2A96A] px-6 py-3 font-body text-sm font-medium text-white transition-colors hover:bg-[#b8983a]"
                >
                  Open WhatsApp →
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
