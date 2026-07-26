"use client";

import { useEffect, useState } from "react";
import { BUY_URL } from "../site-config";

const navLinks = [
  { href: "#book", label: "The Book" },
  { href: "#lenses", label: "Four Lenses" },
  { href: "#authors", label: "Authors" },
  { href: "#workshops", label: "Workshops" },
];

/**
 * Fixed over the hero so the buy CTA is always reachable. It starts
 * transparent against the crimson hero and picks up a dark bar once the
 * page scrolls onto the light sections below.
 */
export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll(); // catch a restored scroll position on load
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="site-header__inner container">
        <a className="site-header__mark" href="#top">
          Shakespeare&apos;s World
        </a>

        <nav className="site-header__nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a
          className="button button--primary site-header__buy"
          href={BUY_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Buy now
        </a>
      </div>
    </header>
  );
}
