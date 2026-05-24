import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Insights on hiring, talent market trends, and workforce strategy from the EKVIR team.",
};

export default function BlogPage() {
  return (
    <>
      <Section className="border-b border-[#C2A96A]/10">
        <Container>
          <p className="font-body text-xs uppercase tracking-widest text-[#8A8375] mb-4">
            Insights
          </p>
          <h1 className="font-heading text-5xl font-light text-[#2B2B2B] md:text-6xl">Blog</h1>
          <p className="mt-5 font-body text-lg leading-relaxed text-[#8A8375] max-w-2xl">
            Hiring strategy, talent market trends, and workforce insights for business leaders in
            Gujarat and beyond.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
            <p className="font-heading text-3xl font-light text-[#2B2B2B]">Articles coming soon.</p>
            <p className="font-body text-sm text-[#8A8375] max-w-md">
              We are working on our first set of articles. In the meantime, reach out directly — we
              are always happy to share what we know.
            </p>
            <Link
              href="/contact"
              className="mt-4 rounded-full border border-[#2B2B2B]/20 px-8 py-3 font-body text-sm font-medium text-[#2B2B2B] transition-colors hover:border-[#C2A96A] hover:text-[#C2A96A]"
            >
              Talk to us
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
