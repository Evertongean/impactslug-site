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
      className="relative z-10 flex h-14 w-[172px] shrink-0 items-center sm:w-[196px] lg:h-16"
    >
      {logoUnavailable ? (
        <span className="flex items-baseline gap-1.5 font-mono text-base font-black tracking-[0.12em] text-foreground">
          IMPACT <span className="text-accent">SLUG</span>
        </span>
      ) : (
        <Image
          src="/images/impact-slug.png"
          alt="Impact Slug"
          fill
          priority
          sizes="64px"
          className="object-contain object-left"
          onError={() => setLogoUnavailable(true)}
        />
      )}
    </a>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/95 backdrop-blur-md">
      <div className="site-container flex h-20 items-center justify-between lg:grid lg:h-24 lg:grid-cols-[1fr_auto_1fr]">
        <Brand />

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-8 xl:gap-10">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm font-medium text-muted transition-colors duration-200 hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href="#contato"
          className="hidden min-h-11 items-center justify-center justify-self-end border border-accent bg-accent px-6 text-sm font-bold text-background transition-colors duration-200 hover:bg-transparent hover:text-accent lg:inline-flex"
        >
          Fale conosco
        </a>

        <button
          type="button"
          className="relative z-10 ml-auto grid size-11 place-items-center border border-line text-foreground lg:hidden"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span className="sr-only">
            {menuOpen ? "Fechar menu" : "Abrir menu"}
          </span>
          <span aria-hidden="true" className="flex w-5 flex-col gap-1.5">
            <span
              className={`h-px w-full bg-current transition-transform duration-200 ${
                menuOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-full bg-current transition-transform duration-200 ${
                menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="menu-mobile"
        className={`absolute inset-x-0 top-full border-b border-line bg-surface transition-[opacity,visibility] duration-200 lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav
          aria-label="Navegação para dispositivos móveis"
          className="site-container py-5"
        >
          <ul className="divide-y divide-line">
            {navigation.map((item, index) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={closeMenu}
                  className="flex min-h-12 items-center justify-between py-3 text-base font-medium text-foreground"
                >
                  {item.label}
                  <span className="font-mono text-xs text-muted" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contato"
            onClick={closeMenu}
            className="mt-5 flex min-h-12 w-full items-center justify-center bg-accent px-6 text-sm font-bold text-background"
          >
            Fale conosco
          </a>
        </nav>
      </div>
    </header>
  );
}
