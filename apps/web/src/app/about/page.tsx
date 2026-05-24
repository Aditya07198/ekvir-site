import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@ekvir/config/site";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "About",
  description:
    "EKVIR is a Vadodara-based recruitment and staffing agency built for Gujarat's MSMEs, startups, and founder-led businesses. Our story, mission, and values.",
};

export default function AboutPage() {
  const { about } = site;

  return (
    <>
      {/* Hero */}
      <Section className="border-b border-[#C2A96A]/10">
        <Container>
          <p className="font-body text-xs uppercase tracking-widest text-[#8A8375] mb-4">
            About EKVIR
          </p>
          <h1 className="font-heading text-5xl font-light text-[#2B2B2B] md:text-6xl max-w-3xl">
            Built for businesses that<br />
            <span className="text-[#C2A96A]">can&apos;t afford the wrong hire.</span>
          </h1>
        </Container>
      </Section>

      {/* Story */}
      <Section>
        <Container>
          <div className="grid gap-16 md:grid-cols-2 items-start">
            <div>
              <p className="font-body text-xs uppercase tracking-widest text-[#8A8375] mb-4">
                Our story
              </p>
              <p className="font-body text-lg leading-relaxed text-[#2B2B2B]">
                {about.story}
              </p>
            </div>
            <div className="space-y-6">
              <div className="rounded-2xl border border-[#C2A96A]/20 bg-white/60 p-8">
                <p className="font-body text-xs uppercase tracking-widest text-[#8A8375] mb-2">
                  Our mission
                </p>
                <p className="font-heading text-2xl font-light text-[#2B2B2B] leading-snug">
                  {about.mission}
                </p>
              </div>
              <div className="flex gap-8">
                <div>
                  <p className="font-heading text-4xl font-light text-[#C2A96A]">
                    {about.founded}
                  </p>
                  <p className="font-body text-xs uppercase tracking-widest text-[#8A8375] mt-1">
                    Founded
                  </p>
                </div>
                <div>
                  <p className="font-heading text-4xl font-light text-[#C2A96A]">
                    {site.industries.length}+
                  </p>
                  <p className="font-body text-xs uppercase tracking-widest text-[#8A8375] mt-1">
                    Sectors served
                  </p>
                </div>
                <div>
                  <p className="font-heading text-4xl font-light text-[#C2A96A]">
                    {site.services.length}
                  </p>
                  <p className="font-body text-xs uppercase tracking-widest text-[#8A8375] mt-1">
                    Service lines
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Values */}
      <Section className="bg-white/40">
        <Container>
          <p className="font-body text-xs uppercase tracking-widest text-[#8A8375] mb-10">
            How we work
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            {about.values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-[#C2A96A]/20 bg-white/80 p-8"
              >
                <h3 className="font-heading text-2xl font-light text-[#C2A96A] mb-3">
                  {value.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-[#8A8375]">{value.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section dark>
        <Container>
          <div className="flex flex-col items-center text-center gap-6">
            <h2 className="font-heading text-4xl font-light text-white">
              Ready to hire differently?
            </h2>
            <p className="font-body text-[#8A8375] max-w-md">
              Share your requirement and we will get back within one business day.
            </p>
            <Link
              href="/contact"
              className="rounded-full bg-[#C2A96A] px-8 py-4 font-body font-medium text-white transition-colors hover:bg-[#b8983a]"
            >
              Start a conversation
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
