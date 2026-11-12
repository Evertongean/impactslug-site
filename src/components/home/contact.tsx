import { contactConfig, getWhatsappUrl } from "@/config/contact";

function MessageIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="size-5">
      <path
        d="M4 5h16v11H9l-5 4V5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="miter"
      />
      <path d="M8 9h8M8 12h5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

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

export function Contact() {
  const whatsappUrl = getWhatsappUrl();

  return (
    <section
      id="contato"
      aria-labelledby="contact-title"
      className="scroll-mt-20 bg-surface lg:scroll-mt-24"
    >
      <div className="site-container grid gap-12 py-20 md:gap-16 md:py-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)] lg:gap-16 lg:py-28 xl:gap-24 xl:py-32">
        <div className="lg:self-center">
          <div className="flex items-center gap-3">
            <span className="h-px w-9 shrink-0 bg-accent" aria-hidden="true" />
            <p className="font-mono text-[0.68rem] font-semibold tracking-[0.18em] text-accent uppercase sm:text-xs sm:tracking-[0.2em]">
              Fale com a Impact Slug
            </p>
          </div>

          <h2
            id="contact-title"
            className="mt-7 max-w-4xl text-[clamp(2.35rem,9vw,4.75rem)] leading-[0.94] font-black tracking-[-0.05em] text-foreground uppercase lg:text-[clamp(3.4rem,4.4vw,5rem)]"
          >
            Vamos conversar
            <span className="block text-accent">sobre seu projeto?</span>
          </h2>

          <p className="mt-7 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            Entre em contato com nossa equipe para tirar dúvidas sobre nossos
            serviços e solicitar atendimento.
          </p>
        </div>

        <div className="flex flex-col justify-center lg:border-l lg:border-line lg:pl-12 xl:pl-16">
          <div className="flex items-center gap-3 text-accent">
            <MessageIcon />
            <p className="font-mono text-[0.68rem] font-semibold tracking-[0.18em] uppercase sm:text-xs">
              Atendimento direto
            </p>
          </div>

          <h3 className="mt-6 text-2xl leading-tight font-bold tracking-[-0.025em] text-foreground uppercase sm:text-3xl">
            Atendimento pelo WhatsApp
          </h3>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            Converse diretamente com nossa equipe para obter informações sobre
            nossos serviços.
          </p>

          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Entrar em contato pelo WhatsApp (abre em nova aba)"
              className="group mt-8 inline-flex min-h-13 w-full items-center justify-center gap-3 bg-accent px-6 text-sm font-bold text-background transition-colors duration-200 hover:bg-foreground sm:w-fit sm:px-7 motion-reduce:transition-none"
            >
              Entrar em contato
              <ArrowUpRightIcon />
            </a>
          ) : (
            <>
              <button
                type="button"
                disabled
                aria-describedby="whatsapp-status"
                className="mt-8 inline-flex min-h-13 w-full cursor-not-allowed items-center justify-center gap-3 bg-accent px-6 text-sm font-bold text-background sm:w-fit sm:px-7"
              >
                Entrar em contato
                <MessageIcon />
              </button>
              <p
                id="whatsapp-status"
                className="mt-3 font-mono text-[0.65rem] leading-5 tracking-[0.1em] text-muted uppercase"
              >
                WhatsApp aguardando confirmação do número.
              </p>
            </>
          )}

          <nav
            aria-label="Outros canais da Impact Slug"
            className="mt-10 border-t border-line pt-6"
          >
            <ul className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-7">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.label} da Impact Slug (abre em nova aba)`}
                    className="group inline-flex min-h-11 items-center gap-2.5 text-xs font-bold tracking-[0.12em] text-muted uppercase transition-colors duration-200 hover:text-accent motion-reduce:transition-none"
                  >
                    {link.icon}
                    {link.label}
                    <ArrowUpRightIcon />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
