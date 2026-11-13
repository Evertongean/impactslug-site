import Image from "next/image";

function MaintenanceIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="about-icon"
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
      className="about-icon"
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
      className="about-icon"
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
      className="about-section"
    >
      <div className="site-container about-layout">
        <figure className="about-visual-frame">
          <div className="about-visual">
            <Image
              src="/images/imagens2usinagem.png"
              alt="Processo de usinagem de componentes metálicos em torno mecânico"
              fill
              sizes="(max-width: 639px) calc(100vw - 64px), (max-width: 767px) calc(100vw - 88px), (max-width: 1023px) calc(100vw - 112px), 50vw"
              className="about-image"
            />
          </div>
        </figure>

        <div className="about-content">
          <div className="section-kicker">
            <span className="section-kicker-line" aria-hidden="true" />
            <p className="section-kicker-text">
              Quem somos
            </p>
          </div>

          <h2
            id="about-title"
            className="about-title"
          >
            Conheça a
            <span className="about-title-line">
              <span className="accent-text">Impact</span> Slug.
            </span>
          </h2>

          <div className="about-description">
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

          <ul className="about-features">
            <li className="about-feature">
              <span className="about-feature-icon">
                <MaintenanceIcon />
              </span>
              <span className="about-feature-label">
                Manutenção especializada
              </span>
            </li>
            <li className="about-feature">
              <span className="about-feature-icon">
                <MachiningIcon />
              </span>
              <span className="about-feature-label">
                Usinagem de componentes
              </span>
            </li>
            <li className="about-feature">
              <span className="about-feature-icon">
                <ServiceIcon />
              </span>
              <span className="about-feature-label">
                Atendimento personalizado
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
