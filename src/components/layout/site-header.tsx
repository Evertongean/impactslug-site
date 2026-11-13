"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const navigation = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Galeria", href: "#galeria" },
  { label: "Contato", href: "#contato" },
];

function Brand() {
  const [logoUnavailable, setLogoUnavailable] = useState(false);

  return (
    <a
      href="#inicio"
      aria-label="Impact Slug — voltar ao início"
      className="header-brand"
    >
      {logoUnavailable ? (
        <span className="header-brand-fallback">
          IMPACT <span className="accent-text">SLUG</span>
        </span>
      ) : (
        <Image
          src="/images/impact-slug.png"
          alt="Impact Slug"
          fill
          priority
          sizes="64px"
          className="header-brand-image"
          onError={() => setLogoUnavailable(true)}
        />
      )}
    </a>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const desktopViewport = window.matchMedia("(min-width: 1024px)");

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    function closeOnDesktop() {
      if (desktopViewport.matches) {
        setMenuOpen(false);
      }
    }

    closeOnDesktop();
    window.addEventListener("keydown", closeOnEscape);
    desktopViewport.addEventListener("change", closeOnDesktop);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      desktopViewport.removeEventListener("change", closeOnDesktop);
    };
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="site-container header-container">
        <Brand />

        <nav aria-label="Navegação principal" className="desktop-navigation">
          <ul className="desktop-navigation-list">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="desktop-navigation-link"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#contato"
          className="header-contact-link"
        >
          Fale conosco
        </a>

        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span className="screen-reader-only">
            {menuOpen ? "Fechar menu" : "Abrir menu"}
          </span>
          <span aria-hidden="true" className="mobile-menu-icon">
            <span
              className={`mobile-menu-line ${
                menuOpen ? "mobile-menu-line--top-open" : ""
              }`}
            />
            <span
              className={`mobile-menu-line ${
                menuOpen ? "mobile-menu-line--bottom-open" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="menu-mobile"
        className={`mobile-menu ${
          menuOpen ? "mobile-menu--open" : "mobile-menu--closed"
        }`}
      >
        <nav
          aria-label="Navegação para dispositivos móveis"
          className="site-container mobile-navigation"
        >
          <ul className="mobile-navigation-list">
            {navigation.map((item, index) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={closeMenu}
                  className="mobile-navigation-link"
                >
                  {item.label}
                  <span className="mobile-navigation-number" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contato"
            onClick={closeMenu}
            className="mobile-contact-link"
          >
            Fale conosco
          </a>
        </nav>
      </div>
    </header>
  );
}
