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
      className="social-network-icon"
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
      className="social-network-icon"
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
      className="external-arrow"
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
      className="social-section"
    >
      <div className="site-container social-container">
        <div className="social-intro">
          <div>
            <div className="section-kicker">
              <span
                className="section-kicker-line section-kicker-line--fixed"
                aria-hidden="true"
              />
              <p className="section-kicker-text section-kicker-text--compact">
                Conecte-se com a Impact Slug
              </p>
            </div>

            <h2
              id="social-content-title"
              className="social-title"
            >
              <span className="social-title-line">Acompanhe nosso</span>
              <span className="social-title-line accent-text">trabalho.</span>
            </h2>
          </div>

          <p className="social-summary">
            Conheça nossos bastidores, acompanhe novidades e explore os
            conteúdos da Impact Slug nas redes sociais.
          </p>
        </div>

        <ul className="social-grid">
          {socialNetworks.map((network) => (
            <li key={network.name}>
              <a
                href={network.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${network.linkLabel}: ${network.identification} (abre em nova aba)`}
                className="social-card interactive-arrow-parent"
              >
                <div className="social-card-header">
                  <span className="social-card-icon-frame">
                    <SocialIcon icon={network.icon} />
                  </span>
                  <span
                    className="social-card-number"
                    aria-hidden="true"
                  >
                    {network.number} / 02
                  </span>
                </div>

                <div className="social-card-rule" aria-hidden="true">
                  <span className="social-card-rule-accent" />
                  <span className="social-card-rule-line" />
                </div>

                <p className="social-card-network">
                  {network.name}
                </p>
                <h3 className="social-card-title">
                  {network.identification}
                </h3>
                <p className="social-card-description">
                  {network.description}
                </p>

                <span className="social-card-link-label">
                  {network.linkLabel}
                  <ExternalLinkIcon />
                </span>

                <span
                  aria-hidden="true"
                  className="social-card-top-accent"
                />
                <span
                  aria-hidden="true"
                  className="social-card-corner-vertical"
                />
                <span
                  aria-hidden="true"
                  className="social-card-corner-horizontal"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
