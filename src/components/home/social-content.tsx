type SocialNetwork = {
  number: string;
  name: string;
  identification: string;
  description: string;
  linkLabel: string;
  href: string;
  icon: "instagram" | "youtube";
};

const socialNetworks = [
  {
    number: "01",
    name: "Instagram",
    identification: "@impactslug",
    description:
      "Acompanhe novidades, bastidores e registros dos trabalhos da Impact Slug.",
    linkLabel: "Acessar Instagram",
    href: "https://www.instagram.com/impactslug/",
    icon: "instagram",
  },
  {
    number: "02",
    name: "YouTube",
    identification: "Impact PCP",
    description:
      "Explore vídeos e conteúdos técnicos relacionados ao universo das carabinas PCP.",
    linkLabel: "Acessar canal",
    href: "https://www.youtube.com/@ImpactPCP",
    icon: "youtube",
  },
] satisfies readonly SocialNetwork[];

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      fill="none"
      className="size-8"
    >
      <rect
        x="4.5"
        y="4.5"
        width="23"
        height="23"
        rx="6.5"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle cx="16" cy="16" r="5.5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="23.25" cy="8.9" r="1.35" fill="currentColor" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 32 32"
      fill="none"
      className="size-8"
    >
      <path
        d="M28.1 9.1a3.8 3.8 0 0 0-2.7-2.7C23 5.75 16 5.75 16 5.75s-7 0-9.4.65a3.8 3.8 0 0 0-2.7 2.7C3.25 11.5 3.25 16 3.25 16s0 4.5.65 6.9a3.8 3.8 0 0 0 2.7 2.7c2.4.65 9.4.65 9.4.65s7 0 9.4-.65a3.8 3.8 0 0 0 2.7-2.7c.65-2.4.65-6.9.65-6.9s0-4.5-.65-6.9Z"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path d="m13.25 20.25 7-4.25-7-4.25v8.5Z" fill="currentColor" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="none"
      className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
    >
      <path
        d="M6 14 14 6M8 6h6v6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

function SocialIcon({ icon }: Pick<SocialNetwork, "icon">) {
  return icon === "instagram" ? <InstagramIcon /> : <YouTubeIcon />;
}

export function SocialContent() {
  return (
    <section
      id="conteudos"
      aria-labelledby="social-content-title"
      className="scroll-mt-20 border-b border-line bg-background lg:scroll-mt-24"
    >
      <div className="site-container py-20 md:py-24 lg:py-28 xl:py-32">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] lg:items-end lg:gap-12 xl:gap-20">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-9 shrink-0 bg-accent" aria-hidden="true" />
              <p className="font-mono text-[0.68rem] font-semibold tracking-[0.18em] text-accent uppercase sm:text-xs sm:tracking-[0.2em]">
                Conecte-se com a Impact Slug
              </p>
            </div>

            <h2
              id="social-content-title"
              className="mt-7 max-w-5xl text-[clamp(2.35rem,10vw,5.15rem)] leading-[0.91] font-black tracking-[-0.055em] text-foreground uppercase lg:text-[clamp(3.7rem,5.4vw,6.25rem)]"
            >
              <span className="block">Acompanhe nosso</span>
              <span className="block text-accent">trabalho.</span>
            </h2>
          </div>

          <p className="max-w-xl border-l border-line pl-5 text-base leading-7 text-muted sm:text-lg sm:leading-8 lg:mb-1 lg:justify-self-end lg:pl-7">
            Conheça nossos bastidores, acompanhe novidades e explore os
            conteúdos da Impact Slug nas redes sociais.
          </p>
        </div>

        <ul className="mt-12 grid items-stretch gap-4 md:grid-cols-2 lg:mt-16 xl:gap-5">
          {socialNetworks.map((network) => (
            <li key={network.name}>
              <a
                href={network.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${network.linkLabel}: ${network.identification} (abre em nova aba)`}
                className="group relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-sm border border-line bg-surface p-6 transition-[border-color,background-color] duration-200 hover:border-accent/70 hover:bg-surface-muted focus-visible:border-accent sm:min-h-[390px] sm:p-8 lg:min-h-[420px] xl:p-9 motion-reduce:transition-none"
              >
                <div className="flex items-start justify-between gap-6">
                  <span className="grid size-16 shrink-0 place-items-center border border-line text-accent transition-colors duration-200 group-hover:border-accent/60 group-hover:text-foreground motion-reduce:transition-none">
                    <SocialIcon icon={network.icon} />
                  </span>
                  <span
                    className="font-mono text-xs tracking-[0.18em] text-muted"
                    aria-hidden="true"
                  >
                    {network.number} / 02
                  </span>
                </div>

                <div className="my-8 flex items-center" aria-hidden="true">
                  <span className="h-px w-12 bg-accent" />
                  <span className="h-px flex-1 bg-line" />
                </div>

                <p className="font-mono text-[0.65rem] font-semibold tracking-[0.2em] text-accent uppercase">
                  {network.name}
                </p>
                <h3 className="mt-3 text-2xl leading-tight font-bold tracking-[-0.025em] text-foreground uppercase sm:text-[1.7rem]">
                  {network.identification}
                </h3>
                <p className="mt-4 max-w-xl text-[0.95rem] leading-7 text-muted sm:text-base">
                  {network.description}
                </p>

                <span className="mt-auto flex items-center justify-between gap-5 border-t border-line pt-6 text-xs font-bold tracking-[0.12em] text-foreground uppercase transition-colors duration-200 group-hover:text-accent motion-reduce:transition-none sm:text-sm">
                  {network.linkLabel}
                  <ExternalLinkIcon />
                </span>

                <span
                  aria-hidden="true"
                  className="absolute top-0 left-8 h-0.5 w-16 bg-accent"
                />
                <span
                  aria-hidden="true"
                  className="absolute right-0 bottom-0 h-8 w-px bg-line"
                />
                <span
                  aria-hidden="true"
                  className="absolute right-0 bottom-0 h-px w-8 bg-line"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
