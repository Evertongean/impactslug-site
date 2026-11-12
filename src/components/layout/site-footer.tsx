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
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
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
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
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
      className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
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
    <footer className="border-t border-line bg-background">
      <div className="site-container">
        <div className="grid gap-12 py-14 sm:py-16 md:grid-cols-2 md:gap-x-16 md:gap-y-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(150px,0.65fr)_minmax(0,1fr)] lg:gap-16 lg:py-20 xl:gap-24">
          <div className="max-w-sm">
            <a
              href="#inicio"
              aria-label="Impact Slug — voltar ao início"
              className="inline-flex"
            >
              <Image
                src="/images/impact-slug.png"
                alt="Impact Slug"
                width={88}
                height={88}
                className="h-[88px] w-[88px] object-contain"
              />
            </a>

            <p className="mt-6 text-sm leading-6 text-muted sm:text-base sm:leading-7">
              Manutenção especializada e soluções de usinagem para carabinas PCP.
            </p>

            <ul className="mt-6 flex items-center gap-3" aria-label="Redes sociais">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.label} da Impact Slug (abre em nova aba)`}
                    className="grid size-11 place-items-center border border-line text-muted transition-colors duration-200 hover:border-accent/70 hover:text-accent motion-reduce:transition-none"
                  >
                    {link.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Navegação do rodapé">
            <h2 className="font-mono text-xs font-semibold tracking-[0.18em] text-foreground uppercase">
              Navegação
            </h2>
            <ul className="mt-6 space-y-1">
              {footerNavigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-10 items-center text-sm text-muted transition-colors duration-200 hover:text-accent motion-reduce:transition-none sm:text-base"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2 lg:col-span-1">
            <h2 className="font-mono text-xs font-semibold tracking-[0.18em] text-foreground uppercase">
              Fale conosco
            </h2>
            <p className="mt-6 max-w-md text-sm leading-6 text-muted sm:text-base sm:leading-7">
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
              className="group mt-7 inline-flex min-h-11 items-center gap-3 border-b border-accent pb-1 text-sm font-bold tracking-[0.08em] text-foreground uppercase transition-colors duration-200 hover:text-accent motion-reduce:transition-none"
            >
              Entrar em contato
              <ArrowUpRightIcon />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-6 text-xs leading-5 text-muted sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <p>
            ©{" "}
            <Suspense fallback={<span aria-hidden="true">—</span>}>
              <CurrentYear />
            </Suspense>{" "}
            Impact Slug. Todos os direitos reservados.
          </p>
          <p className="font-mono tracking-[0.08em] text-foreground sm:text-right">
            Precisão em cada detalhe.
          </p>
        </div>
      </div>
    </footer>
  );
}
