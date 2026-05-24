import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@ekvir/config/site";
import { Badge } from "@ekvir/ui";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: `${site.brand.name} — ${site.brand.tagline}`,
  description:
    "EKVIR delivers precision talent for Gujarat's MSMEs, startups, and founder-led businesses. Recruitment agency in Vadodara specialising in permanent and contract staffing.",
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <Section className="flex min-h-[calc(100vh-4rem)] items-center">
        <Container>
          <div className="max-w-3xl">
            <Badge variant="accent" className="mb-6">
              Recruitment &amp; Staffing — Gujarat
            </Badge>
            <h1 className="font-heading text-5xl font-light leading-tight text-[#2B2B2B] md:text-7xl">
              Precision Talent.<br />
              <span className="text-[#C2A96A]">Real Results.</span>
            </h1>
            <p className="mt-6 font-body text-lg leading-relaxed text-[#8A8375] max-w-xl">
              End-to-end hiring and contract staffing for MSMEs, startups, and
              founder-led businesses across Gujarat — and beyond.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-full bg-[#C2A96A] px-8 py-4 font-body font-medium text-white transition-colors hover:bg-[#b8983a]"
              >
                Start Hiring
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-[#2B2B2B]/20 px-8 py-4 font-body font-medium text-[#2B2B2B] transition-colors hover:border-[#C2A96A] hover:text-[#C2A96A]"
              >
                Our Services
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Services snapshot */}
      <Section>
        <Container>
          <p className="font-body text-xs uppercase tracking-widest text-[#8A8375] mb-10">
            What we do
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {site.services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group rounded-2xl border border-[#C2A96A]/20 bg-white/60 p-8 transition-all hover:border-[#C2A96A]/50 hover:shadow-md"
              >
                <h2 className="font-heading text-2xl font-light text-[#2B2B2B] mb-3 group-hover:text-[#C2A96A] transition-colors">
                  {service.name}
                </h2>
                <p className="font-body text-sm leading-relaxed text-[#8A8375]">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
