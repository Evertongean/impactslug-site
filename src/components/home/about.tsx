import Image from "next/image";

function MaintenanceIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
    >
      <path
        d="M14.5 6.5a4 4 0 0 0-5-5l2.4 2.4-2.8 2.8-2.4-2.4a4 4 0 0 0 5 5L19 16.6 16.6 19l-7.3-7.3a4 4 0 0 0-5 5l2.4-2.4 2.8 2.8-2.4 2.4a4 4 0 0 0 5-5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

function MachiningIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
    >
      <path
        d="M8 3h8l4 4v10l-4 4H8l-4-4V7l4-4Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="12" r="3.25" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 3v3M21 12h-3M12 21v-3M3 12h3" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function ServiceIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
    >
      <path
        d="M4 5h16v11H9l-5 4V5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="miter"
      />
      <path d="M8 9h8M8 12h5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function About() {
  return (
    <section
      id="sobre"
      aria-labelledby="about-title"
      className="scroll-mt-20 border-b border-line bg-surface lg:scroll-mt-24"
    >
      <div className="site-container grid items-stretch gap-12 py-20 md:gap-16 md:py-24 lg:grid-cols-2 lg:gap-12 lg:py-28 xl:gap-20 xl:py-32">
        <figure className="relative min-h-[420px] overflow-hidden border border-line bg-background p-4 sm:min-h-[520px] sm:p-6 lg:min-h-[680px]">
          <div className="relative h-full min-h-[386px] overflow-hidden border border-line bg-surface-muted sm:min-h-[470px] lg:min-h-[628px]">
            <Image
              src="/images/imagens2usinagem.png"
              alt="Processo de usinagem de componentes metálicos em torno mecânico"
              fill
              sizes="(max-width: 1023px) calc(100vw - 64px), 50vw"
              className="object-cover"
            />
          </div>
        </figure>

        <div className="flex flex-col justify-center lg:py-8">
          <div className="flex items-center gap-3">
            <span className="h-px w-9 bg-accent" aria-hidden="true" />
            <p className="font-mono text-xs font-semibold tracking-[0.2em] text-accent uppercase">
              Quem somos
            </p>
          </div>

          <h2
            id="about-title"
            className="mt-7 max-w-3xl text-[clamp(2.65rem,8.5vw,5.25rem)] leading-[0.91] font-black tracking-[-0.055em] text-foreground uppercase lg:text-[clamp(3.5rem,4.8vw,5.5rem)]"
          >
            Conheça a
            <span className="block">
              <span className="text-accent">Impact</span> Slug.
            </span>
          </h2>

          <div className="mt-8 max-w-2xl space-y-5 text-base leading-7 text-muted sm:mt-10 sm:text-lg sm:leading-8">
            <p>
              A Impact Slug atua na manutenção de carabinas PCP e no
              desenvolvimento de soluções de usinagem e personalização de
              componentes.
            </p>
            <p>
              Nosso trabalho reúne atenção aos detalhes, cuidado na execução e
              dedicação a cada projeto, buscando oferecer um atendimento
              próximo e especializado.
            </p>
          </div>

          <ul className="mt-10 divide-y divide-line border-y border-line xl:grid xl:grid-cols-3 xl:divide-x xl:divide-y-0">
            <li className="flex min-h-20 items-center gap-3 py-4 xl:px-4 xl:first:pl-0">
              <span className="grid size-9 shrink-0 place-items-center border border-line text-accent">
                <MaintenanceIcon />
              </span>
              <span className="text-sm leading-5 font-semibold text-foreground">
                Manutenção especializada
              </span>
            </li>
            <li className="flex min-h-20 items-center gap-3 py-4 xl:px-4">
              <span className="grid size-9 shrink-0 place-items-center border border-line text-accent">
                <MachiningIcon />
              </span>
              <span className="text-sm leading-5 font-semibold text-foreground">
                Usinagem de componentes
              </span>
            </li>
            <li className="flex min-h-20 items-center gap-3 py-4 xl:px-4 xl:last:pr-0">
              <span className="grid size-9 shrink-0 place-items-center border border-line text-accent">
                <ServiceIcon />
              </span>
              <span className="text-sm leading-5 font-semibold text-foreground">
                Atendimento personalizado
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
