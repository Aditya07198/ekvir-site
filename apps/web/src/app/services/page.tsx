import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@ekvir/config/site";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Permanent staffing, contract staffing, executive search, and payroll management — EKVIR's full suite of recruitment and workforce solutions.",
};

export default function ServicesPage() {
  return (
    <>
      <Section className="border-b border-[#C2A96A]/10">
        <Container>
          <p className="font-body text-xs uppercase tracking-widest text-[#8A8375] mb-4">
            What we do
          </p>
          <h1 className="font-heading text-5xl font-light text-[#2B2B2B] md:text-6xl">
            Our Services
          </h1>
          <p className="mt-5 font-body text-lg leading-relaxed text-[#8A8375] max-w-2xl">
            End-to-end talent solutions for businesses that value quality over speed — from your
            first hire to your executive team.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            {site.services.map((service, i) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative rounded-2xl border border-[#C2A96A]/20 bg-white/60 p-10 transition-all hover:border-[#C2A96A]/50 hover:shadow-lg"
              >
                <span className="absolute top-8 right-8 font-heading text-4xl font-light text-[#C2A96A]/20 group-hover:text-[#C2A96A]/40 transition-colors select-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-heading text-3xl font-light text-[#2B2B2B] mb-4 group-hover:text-[#C2A96A] transition-colors">
                  {service.name}
                </h2>
                <p className="font-body text-sm leading-relaxed text-[#8A8375] mb-6">
                  {service.description}
                </p>
                <span className="font-body text-xs font-medium uppercase tracking-widest text-[#C2A96A] group-hover:underline">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section dark>
        <Container>
          <div className="flex flex-col items-center text-center gap-6">
            <h2 className="font-heading text-4xl font-light text-white">
              Not sure which service fits?
            </h2>
            <p className="font-body text-[#8A8375] max-w-lg">
              Tell us about your hiring challenge and we will recommend the right engagement model.
            </p>
            <Link
              href="/contact"
              className="rounded-full bg-[#C2A96A] px-8 py-4 font-body font-medium text-white transition-colors hover:bg-[#b8983a]"
            >
              Talk to us
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
