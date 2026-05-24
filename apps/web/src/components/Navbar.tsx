"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { site } from "@ekvir/config/site";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
] as const;

interface TokenPayload {
  userId: string;
  role: string;
  name?: string;
  exp: number;
}

function readUserToken(): TokenPayload | null {
  try {
    const raw = localStorage.getItem("ekvir_user_token");
    if (!raw) return null;
    const part = raw.split(".")[1];
    if (!part) return null;
    const payload = JSON.parse(atob(part)) as TokenPayload;
    if (payload.exp * 1000 < Date.now()) {
      localStorage.removeItem("ekvir_user_token");
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<TokenPayload | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setUser(readUserToken());
  }, [pathname]); // re-check on every navigation (catches login/logout)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function logout() {
    localStorage.removeItem("ekvir_user_token");
    setUser(null);
    router.push("/");
  }

  const firstName = user?.name?.split(" ")[0] ?? "Account";

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "bg-[#F7F5EF]/95 backdrop-blur-md shadow-sm" : "bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-10 lg:px-16">

        {/* Logo */}
        <Link
          href="/"
          className="font-heading text-xl font-semibold tracking-widest text-[#2B2B2B]"
          aria-label={`${site.brand.name} — home`}
        >
          {site.brand.name}
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={[
                "font-body text-sm transition-colors duration-150",
                pathname === href ? "text-[#C2A96A]" : "text-[#2B2B2B] hover:text-[#C2A96A]",
              ].join(" ")}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <span className="font-body text-sm text-[#2B2B2B]">
                Hi, {firstName}
              </span>
              <button
                onClick={logout}
                className="font-body text-sm text-[#8A8375] hover:text-[#2B2B2B] transition-colors"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className={[
                "font-body text-sm transition-colors duration-150",
                pathname === "/login" ? "text-[#C2A96A]" : "text-[#2B2B2B] hover:text-[#C2A96A]",
              ].join(" ")}
            >
              Sign in
            </Link>
          )}
          <Link
            href="/contact"
            className="rounded-full border border-[#C2A96A] px-5 py-2 font-body text-sm text-[#C2A96A] transition-colors hover:bg-[#C2A96A] hover:text-white"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex md:hidden flex-col justify-center items-center gap-1.5 w-8 h-8"
        >
          <span className={["block h-px w-6 bg-[#2B2B2B] transition-all duration-300 origin-center", menuOpen ? "translate-y-[7px] rotate-45" : ""].join(" ")} />
          <span className={["block h-px w-6 bg-[#2B2B2B] transition-all duration-300", menuOpen ? "opacity-0" : ""].join(" ")} />
          <span className={["block h-px w-6 bg-[#2B2B2B] transition-all duration-300 origin-center", menuOpen ? "-translate-y-[7px] -rotate-45" : ""].join(" ")} />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        aria-hidden={!menuOpen}
        className={[
          "md:hidden fixed inset-0 top-16 bg-[#F7F5EF] flex flex-col px-6 py-10 gap-8",
          "transition-all duration-300",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <nav className="flex flex-col gap-6">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              tabIndex={menuOpen ? undefined : -1}
              className={[
                "font-heading text-3xl font-light transition-colors duration-150",
                pathname === href ? "text-[#C2A96A]" : "text-[#2B2B2B]",
              ].join(" ")}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-4">
          <Link
            href="/contact"
            tabIndex={menuOpen ? undefined : -1}
            className="self-start rounded-full border border-[#C2A96A] px-6 py-3 font-body text-[#C2A96A]"
          >
            Contact Us
          </Link>
          {user ? (
            <button
              onClick={logout}
              tabIndex={menuOpen ? undefined : -1}
              className="self-start font-body text-sm text-[#8A8375] hover:text-[#2B2B2B] transition-colors"
            >
              Sign out ({firstName})
            </button>
          ) : (
            <Link
              href="/login"
              tabIndex={menuOpen ? undefined : -1}
              className="self-start font-body text-sm text-[#8A8375] hover:text-[#C2A96A] transition-colors"
            >
              Sign in →
            </Link>
          )}
        </div>

        <p className="mt-auto font-body text-sm text-[#8A8375]">{site.contact.email}</p>
      </div>
    </header>
  );
}
