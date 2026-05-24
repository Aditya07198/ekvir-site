import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { site } from "@ekvir/config/site";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return site.services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = site.services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.longDescription,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = site.services.find((s) => s.slug === slug);
  if (!service) notFound();

  const others = site.services.filter((s) => s.slug !== slug);

  return (
    <>
      {/* Breadcrumb */}
      <Section className="pb-0 pt-10">
        <Container>
          <p className="font-body text-sm text-[#8A8375]">
            <Link href="/services" className="hover:text-[#C2A96A] transition-colors">
              Services
            </Link>{" "}
            / {service.name}
          </p>
        </Container>
      </Section>

      {/* Hero */}
      <Section className="border-b border-[#C2A96A]/10">
        <Container>
          <h1 className="font-heading text-5xl font-light text-[#2B2B2B] md:text-6xl max-w-2xl">
            {service.name}
          </h1>
          <p className="mt-6 font-body text-lg leading-relaxed text-[#8A8375] max-w-2xl">
            {service.longDescription}
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="rounded-full bg-[#C2A96A] px-8 py-4 font-body font-medium text-white transition-colors hover:bg-[#b8983a]"
            >
              Enquire now
            </Link>
          </div>
        </Container>
      </Section>

      {/* Features */}
      <Section>
        <Container>
          <div className="grid gap-12 md:grid-cols-2 items-start">
            <div>
              <p className="font-body text-xs uppercase tracking-widest text-[#8A8375] mb-8">
                What&apos;s included
              </p>
              <ul className="space-y-4">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-4">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#C2A96A] flex-shrink-0" />
                    <span className="font-body text-sm leading-relaxed text-[#2B2B2B]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[#C2A96A]/20 bg-white/60 p-8 space-y-4">
              <p className="font-heading text-2xl font-light text-[#2B2B2B]">
                Ready to get started?
              </p>
              <p className="font-body text-sm leading-relaxed text-[#8A8375]">
                Share your requirement and we will respond within one business day with a tailored
                approach for your mandate.
              </p>
              <Link
                href="/contact"
                className="inline-block rounded-full bg-[#C2A96A] px-6 py-3 font-body text-sm font-medium text-white transition-colors hover:bg-[#b8983a]"
              >
                Send an enquiry
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Other services */}
      {others.length > 0 && (
        <Section className="bg-white/40">
          <Container>
            <p className="font-body text-xs uppercase tracking-widest text-[#8A8375] mb-8">
              Other services
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {others.map((other) => (
                <Link
                  key={other.slug}
                  href={`/services/${other.slug}`}
                  className="group rounded-2xl border border-[#C2A96A]/20 bg-white/60 p-6 transition-all hover:border-[#C2A96A]/50 hover:shadow-md"
                >
                  <h3 className="font-heading text-xl font-light text-[#2B2B2B] mb-2 group-hover:text-[#C2A96A] transition-colors">
                    {other.name}
                  </h3>
                  <p className="font-body text-xs leading-relaxed text-[#8A8375]">
                    {other.description}
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
