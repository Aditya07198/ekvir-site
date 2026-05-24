import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { site } from "@ekvir/config/site";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return site.industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = site.industries.find((i) => i.slug === slug);
  if (!industry) return {};
  return {
    title: industry.name,
    description: industry.description,
  };
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = site.industries.find((i) => i.slug === slug);
  if (!industry) notFound();

  const others = site.industries.filter((i) => i.slug !== slug);

  return (
    <>
      {/* Breadcrumb */}
      <Section className="pb-0 pt-10">
        <Container>
          <p className="font-body text-sm text-[#8A8375]">
            <Link href="/industries" className="hover:text-[#C2A96A] transition-colors">
              Industries
            </Link>{" "}
            / {industry.name}
          </p>
        </Container>
      </Section>

      {/* Hero */}
      <Section className="border-b border-[#C2A96A]/10">
        <Container>
          <p className="font-body text-xs uppercase tracking-widest text-[#8A8375] mb-4">
            Sector expertise
          </p>
          <h1 className="font-heading text-5xl font-light text-[#2B2B2B] md:text-6xl max-w-2xl">
            {industry.name}
          </h1>
          <p className="mt-6 font-body text-lg leading-relaxed text-[#8A8375] max-w-2xl">
            {industry.description}
          </p>
        </Container>
      </Section>

      {/* How we help */}
      <Section>
        <Container>
          <div className="grid gap-12 md:grid-cols-2 items-start">
            <div>
              <p className="font-body text-xs uppercase tracking-widest text-[#8A8375] mb-6">
                How EKVIR helps
              </p>
              <div className="space-y-6">
                {site.services.map((service) => (
                  <div key={service.slug} className="flex gap-4">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#C2A96A] flex-shrink-0" />
                    <div>
                      <p className="font-body text-sm font-medium text-[#2B2B2B]">
                        {service.name}
                      </p>
                      <p className="font-body text-xs leading-relaxed text-[#8A8375] mt-0.5">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#C2A96A]/20 bg-white/60 p-8 space-y-4">
              <p className="font-heading text-2xl font-light text-[#2B2B2B]">
                Hiring in {industry.name}?
              </p>
              <p className="font-body text-sm leading-relaxed text-[#8A8375]">
                Tell us about the role. We will get back within one business day with a plan.
              </p>
              <Link
                href="/contact"
                className="inline-block rounded-full bg-[#C2A96A] px-6 py-3 font-body text-sm font-medium text-white transition-colors hover:bg-[#b8983a]"
              >
                Start hiring →
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Other industries */}
      {others.length > 0 && (
        <Section className="bg-white/40">
          <Container>
            <p className="font-body text-xs uppercase tracking-widest text-[#8A8375] mb-8">
              Other sectors
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/industries/${other.slug}`}
                  className="group rounded-xl border border-[#C2A96A]/20 bg-white/60 px-6 py-4 transition-all hover:border-[#C2A96A]/50 hover:shadow-sm"
                >
                  <span className="font-body text-sm font-medium text-[#2B2B2B] group-hover:text-[#C2A96A] transition-colors">
                    {other.name} →
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
