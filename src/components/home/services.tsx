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
    <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className="service-icon-svg">
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
    <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className="service-icon-svg">
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
    <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" className="service-icon-svg">
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

function DimensionalPrecisionIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 40 40"
      fill="none"
      className="slug-feature-icon-svg"
    >
      <circle cx="20" cy="20" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M20 4v9M20 27v9M4 20h9M27 20h9"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m7 10 3-3M30 33l3-3M30 7l3 3M7 30l3 3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="20" cy="20" r="2.5" fill="currentColor" />
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
      className={`service-card ${className}`.trim()}
    >
      <div className="service-card-header">
        <span className="service-card-icon">
          {icon}
        </span>
        <span className="service-card-number" aria-hidden="true">
          {number}
        </span>
      </div>

      <div className="service-card-rule" aria-hidden="true">
        <span className="service-card-rule-accent" />
        <span className="service-card-rule-line" />
      </div>

      <p className="service-card-category">
        {category}
      </p>
      <h3 className="service-card-title">
        {title}
      </h3>
      <p className="service-card-description">
        {description}
      </p>

      <span
        aria-hidden="true"
        className="service-card-corner-vertical"
      />
      <span
        aria-hidden="true"
        className="service-card-corner-horizontal"
      />
    </article>
  );
}

export function Services() {
  return (
    <section
      id="servicos"
      aria-labelledby="services-title"
      className="services-section"
    >
      <div className="site-container services-container">
        <div className="services-intro">
          <div>
            <div className="section-kicker">
              <span className="section-kicker-line" aria-hidden="true" />
              <p className="section-kicker-text">
                O que fazemos
              </p>
            </div>

            <h2
              id="services-title"
              className="services-title"
            >
              <span className="services-title-prefix">Nossas</span>
              <span className="services-title-accent">Especialidades.</span>
            </h2>
          </div>

          <p className="services-summary">
            Conheça as principais áreas de atuação da Impact Slug.
          </p>
        </div>

        <div className="services-grid">
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
            className="service-card--wide-tablet"
          />
        </div>

        <article
          className="slug-feature"
          aria-labelledby="slug-feature-title"
        >
          <div className="slug-feature-copy">
            <div className="slug-feature-heading">
              <span className="slug-feature-icon">
                <DimensionalPrecisionIcon />
              </span>

              <div>
                <p className="slug-feature-eyebrow">
                  Fabricação própria / PCP
                </p>
                <h3 id="slug-feature-title" className="slug-feature-title">
                  Fabricação de <span>Chumbos Slug</span>
                </h3>
              </div>
            </div>

            <p className="slug-feature-description">
              Produzimos chumbos Slug para PCP em diversos tamanhos, com
              atenção a cada detalhe do processo de fabricação. Nosso
              compromisso é oferecer qualidade, precisão dimensional e
              acabamento em cada peça.
            </p>
          </div>

          <ul
            className="slug-feature-highlights"
            aria-label="Diferenciais dos chumbos Slug"
          >
            <li>
              <span aria-hidden="true">01</span>
              Diversos tamanhos disponíveis
            </li>
            <li>
              <span aria-hidden="true">02</span>
              Fabricação própria
            </li>
            <li>
              <span aria-hidden="true">03</span>
              Precisão dimensional
            </li>
            <li>
              <span aria-hidden="true">04</span>
              Atenção ao acabamento
            </li>
          </ul>

          <span className="slug-feature-top-accent" aria-hidden="true" />
          <span className="slug-feature-corner" aria-hidden="true" />
        </article>
      </div>
    </section>
  );
}
