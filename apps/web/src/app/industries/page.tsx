import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@ekvir/config/site";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "EKVIR serves manufacturing, solar & renewables, real estate, finance, operations, and sales — recruitment built around each sector's unique talent needs.",
};

export default function IndustriesPage() {
  return (
    <>
      <Section className="border-b border-[#C2A96A]/10">
        <Container>
          <p className="font-body text-xs uppercase tracking-widest text-[#8A8375] mb-4">
            Where we work
          </p>
          <h1 className="font-heading text-5xl font-light text-[#2B2B2B] md:text-6xl">
            Industries We Serve
          </h1>
          <p className="mt-5 font-body text-lg leading-relaxed text-[#8A8375] max-w-2xl">
            Deep sector knowledge means we know what good looks like in your domain — and where to
            find it.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {site.industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className="group rounded-2xl border border-[#C2A96A]/20 bg-white/60 p-8 transition-all hover:border-[#C2A96A]/50 hover:shadow-md"
              >
                <h2 className="font-heading text-2xl font-light text-[#2B2B2B] mb-3 group-hover:text-[#C2A96A] transition-colors">
                  {industry.name}
                </h2>
                <p className="font-body text-sm leading-relaxed text-[#8A8375] mb-5">
                  {industry.description}
                </p>
                <span className="font-body text-xs font-medium uppercase tracking-widest text-[#C2A96A] group-hover:underline">
                  Explore →
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
              Don&apos;t see your sector?
            </h2>
            <p className="font-body text-[#8A8375] max-w-lg">
              We have placed talent across many more domains. Reach out and tell us what you need.
            </p>
            <Link
              href="/contact"
              className="rounded-full bg-[#C2A96A] px-8 py-4 font-body font-medium text-white transition-colors hover:bg-[#b8983a]"
            >
              Get in touch
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
