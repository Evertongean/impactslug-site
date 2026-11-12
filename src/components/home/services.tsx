import type { ReactNode } from "react";

type ServiceCardProps = {
  number: string;
  category: string;
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
};

function MaintenanceIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className="size-7">
      <path
        d="M19.5 8.2a6 6 0 0 0-7.7-7.1l3.4 3.4-4 4-3.4-3.4a6 6 0 0 0 7.1 7.7l10.4 10.4-3.1 3.1-10.4-10.4a6 6 0 0 0-7.7 7.1l3.4-3.4 4 4L8.1 27a6 6 0 0 0 7.1-7.7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

function MachiningIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className="size-7">
      <path
        d="m13.5 2-.8 3.3a11.1 11.1 0 0 0-2.6 1.1L7.2 4.6 4.6 7.2l1.8 2.9a11.1 11.1 0 0 0-1.1 2.6L2 13.5v5l3.3.8a11.1 11.1 0 0 0 1.1 2.6l-1.8 2.9 2.6 2.6 2.9-1.8a11.1 11.1 0 0 0 2.6 1.1l.8 3.3h5l.8-3.3a11.1 11.1 0 0 0 2.6-1.1l2.9 1.8 2.6-2.6-1.8-2.9a11.1 11.1 0 0 0 1.1-2.6l3.3-.8v-5l-3.3-.8a11.1 11.1 0 0 0-1.1-2.6l1.8-2.9-2.6-2.6-2.9 1.8a11.1 11.1 0 0 0-2.6-1.1L18.5 2h-5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="miter"
      />
      <circle cx="16" cy="16" r="4.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function PersonalizationIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className="size-7">
      <path d="M5 8h22M5 16h22M5 24h22" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M11 4v8M22 12v8M14 20v8"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect x="8" y="6" width="6" height="4" fill="#1B1D21" stroke="currentColor" strokeWidth="1.5" />
      <rect x="19" y="14" width="6" height="4" fill="#1B1D21" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11" y="22" width="6" height="4" fill="#1B1D21" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function ServiceCard({
  number,
  category,
  title,
  description,
  icon,
  className = "",
}: ServiceCardProps) {
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-sm border border-line bg-surface p-5 transition-colors duration-200 hover:border-accent/70 sm:p-6 ${className}`}
    >
      <div className="flex items-start justify-between gap-6">
        <span className="grid size-12 shrink-0 place-items-center border border-line text-accent transition-colors duration-200 group-hover:border-accent/50">
          {icon}
        </span>
        <span className="font-mono text-xs tracking-[0.18em] text-muted" aria-hidden="true">
          {number}
        </span>
      </div>

      <div className="my-4 flex items-center" aria-hidden="true">
        <span className="h-px w-10 bg-accent" />
        <span className="h-px flex-1 bg-line" />
      </div>

      <p className="font-mono text-[0.65rem] font-semibold tracking-[0.2em] text-accent uppercase">
        {category}
      </p>
      <h3 className="mt-2 max-w-sm text-xl leading-tight font-bold tracking-[-0.025em] text-foreground sm:text-[1.35rem]">
        {title}
      </h3>
      <p className="mt-3 max-w-md text-sm leading-6 text-muted">
        {description}
      </p>

      <span
        aria-hidden="true"
        className="absolute right-0 bottom-0 h-8 w-px bg-line"
      />
      <span
        aria-hidden="true"
        className="absolute right-0 bottom-0 h-px w-8 bg-line"
      />
    </article>
  );
}

export function Services() {
  return (
    <section
      id="servicos"
      aria-labelledby="services-title"
      className="scroll-mt-20 border-b border-line bg-background lg:scroll-mt-24"
    >
      <div className="site-container py-10 md:py-12 lg:py-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(280px,0.42fr)] lg:items-end lg:gap-10 xl:gap-14">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-accent" aria-hidden="true" />
              <p className="font-mono text-xs font-semibold tracking-[0.2em] text-accent uppercase">
                O que fazemos
              </p>
            </div>

            <h2
              id="services-title"
              className="mt-4 max-w-5xl text-[clamp(2.25rem,9.5vw,3.75rem)] leading-[0.94] font-black tracking-[-0.05em] text-foreground uppercase lg:text-[clamp(2.8rem,4.1vw,3.75rem)]"
            >
              <span className="block lg:inline">Nossas</span>
              <span className="block text-accent lg:ml-3 lg:inline">Especialidades.</span>
            </h2>
          </div>

          <p className="max-w-xl border-l border-line pl-5 text-base leading-7 text-muted lg:mb-1 lg:justify-self-end lg:pl-6">
            Conheça as principais áreas de atuação da Impact Slug.
          </p>
        </div>

        <div className="mt-7 grid items-stretch gap-3 md:grid-cols-2 lg:mt-6 lg:grid-cols-3 xl:gap-4">
          <ServiceCard
            number="01"
            category="Manutenção PCP"
            title="Manutenção Especializada"
            description="Serviços de manutenção e atendimento técnico para carabinas PCP, com atenção aos detalhes e cuidado em cada etapa."
            icon={<MaintenanceIcon />}
          />
          <ServiceCard
            number="02"
            category="Usinagem"
            title="Usinagem de Componentes"
            description="Trabalhos de usinagem e fabricação de componentes metálicos, com foco no acabamento e na qualidade de execução."
            icon={<MachiningIcon />}
          />
          <ServiceCard
            number="03"
            category="Personalização"
            title="Personalização de Peças"
            description="Soluções de personalização e acabamento de componentes, desenvolvidas de acordo com as necessidades de cada projeto."
            icon={<PersonalizationIcon />}
            className="md:col-span-2 lg:col-span-1"
          />
        </div>
      </div>
    </section>
  );
}
