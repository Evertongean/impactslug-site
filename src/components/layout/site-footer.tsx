import Image from "next/image";
import { io } from "next/cache";
import { Suspense } from "react";

import { contactConfig, getWhatsappUrl } from "@/config/contact";

const footerNavigation = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Galeria", href: "#galeria" },
  { label: "Contato", href: "#contato" },
] as const;

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="footer-social-icon">
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="4.75"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.35" cy="6.75" r="1" fill="currentColor" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="footer-social-icon">
      <path
        d="M21 7.4a2.8 2.8 0 0 0-2-2C17.2 5 12 5 12 5s-5.2 0-7 .4a2.8 2.8 0 0 0-2 2C2.5 9.2 2.5 12 2.5 12s0 2.8.5 4.6a2.8 2.8 0 0 0 2 2c1.8.4 7 .4 7 .4s5.2 0 7-.4a2.8 2.8 0 0 0 2-2c.5-1.8.5-4.6.5-4.6s0-2.8-.5-4.6Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="m10 15 5-3-5-3v6Z" fill="currentColor" />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="external-arrow"
    >
      <path
        d="M5 15 15 5M7 5h8v8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

const socialLinks = [
  {
    label: "Instagram",
    href: contactConfig.instagramUrl,
    icon: <InstagramIcon />,
  },
  {
    label: "YouTube",
    href: contactConfig.youtubeUrl,
    icon: <YouTubeIcon />,
  },
] as const;

async function CurrentYear() {
  await io();

  return new Date().getFullYear();
}

export function SiteFooter() {
  const whatsappUrl = getWhatsappUrl();

  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-layout">
          <div className="footer-brand-column">
            <a
              href="#inicio"
              aria-label="Impact Slug — voltar ao início"
              className="footer-logo-link"
            >
              <Image
                src="/images/impact-slug.png"
                alt="Impact Slug"
                width={88}
                height={88}
                className="footer-logo"
              />
            </a>

            <p className="footer-description">
              Manutenção especializada e soluções de usinagem para carabinas PCP.
            </p>

            <ul className="footer-social-list" aria-label="Redes sociais">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.label} da Impact Slug (abre em nova aba)`}
                    className="footer-social-link"
                  >
                    {link.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Navegação do rodapé">
            <h2 className="footer-heading">
              Navegação
            </h2>
            <ul className="footer-navigation-list">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="footer-navigation-link"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-contact-column">
            <h2 className="footer-heading">
              Fale conosco
            </h2>
            <p className="footer-contact-description">
              Estamos disponíveis para conversar sobre nossos serviços e esclarecer
              suas dúvidas.
            </p>
            <a
              href={whatsappUrl ?? "#contato"}
              target={whatsappUrl ? "_blank" : undefined}
              rel={whatsappUrl ? "noopener noreferrer" : undefined}
              aria-label={
                whatsappUrl
                  ? "Entrar em contato pelo WhatsApp (abre em nova aba)"
                  : "Ir para a seção de contato"
              }
              className="footer-contact-link interactive-arrow-parent"
            >
              Entrar em contato
              <ArrowUpRightIcon />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            ©{" "}
            <Suspense fallback={<span aria-hidden="true">—</span>}>
              <CurrentYear />
            </Suspense>{" "}
            Impact Slug. Todos os direitos reservados.
          </p>
          <p className="footer-tagline">
            Precisão em cada detalhe.
          </p>
        </div>
      </div>
    </footer>
  );
}
