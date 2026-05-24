import React from "react";
import Link from "next/link";
import { site } from "@ekvir/config/site";

const NAV_COLUMNS = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Industries", href: "/industries" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    heading: "Services",
    links: site.services.map((s) => ({
      label: s.name,
      href: `/services/${s.slug}`,
    })),
  },
  {
    heading: "Contact",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: `WhatsApp: +91 ${site.contact.whatsapp}`, href: `https://wa.me/${site.contact.whatsapp}`, external: true },
      { label: site.contact.email, href: `mailto:${site.contact.email}`, external: true },
    ],
  },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#111111] text-white">
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-16 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="font-heading text-2xl font-semibold tracking-widest text-white"
            >
              {site.brand.name}
            </Link>
            <p className="mt-4 font-body text-sm leading-relaxed text-[#8A8375]">
              {site.brand.tagline}
            </p>
            <p className="mt-4 font-body text-sm text-[#8A8375]">
              {site.contact.location}
            </p>
          </div>

          {/* Nav columns */}
          {NAV_COLUMNS.map((col) => (
            <div key={col.heading}>
              <h3 className="font-body text-xs font-semibold uppercase tracking-widest text-[#8A8375] mb-5">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body text-sm text-[#F7F5EF]/70 transition-colors hover:text-[#C2A96A]"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="font-body text-sm text-[#F7F5EF]/70 transition-colors hover:text-[#C2A96A]"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-body text-xs text-[#8A8375]">
            © {year} {site.brand.name}. All rights reserved.
          </p>
          <p className="font-body text-xs text-[#8A8375]">
            Vadodara, Gujarat — India
          </p>
        </div>
      </div>
    </footer>
  );
}
