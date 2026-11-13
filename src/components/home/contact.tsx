import { contactConfig, getWhatsappUrl } from "@/config/contact";

function MessageIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="contact-icon">
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
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="contact-icon">
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
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="contact-icon">
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

export function Contact() {
  const whatsappUrl = getWhatsappUrl();

  return (
    <section
      id="contato"
      aria-labelledby="contact-title"
      className="contact-section"
    >
      <div className="site-container contact-layout">
        <div className="contact-intro">
          <div className="section-kicker">
            <span
              className="section-kicker-line section-kicker-line--fixed"
              aria-hidden="true"
            />
            <p className="section-kicker-text section-kicker-text--compact">
              Fale com a Impact Slug
            </p>
          </div>

          <h2
            id="contact-title"
            className="contact-title"
          >
            Vamos conversar
            <span className="contact-title-accent">sobre seu projeto?</span>
          </h2>

          <p className="contact-summary">
            Entre em contato com nossa equipe para tirar dúvidas sobre nossos
            serviços e solicitar atendimento.
          </p>
        </div>

        <div className="contact-panel">
          <div className="contact-panel-label">
            <MessageIcon />
            <p className="contact-panel-label-text">
              Atendimento direto
            </p>
          </div>

          <h3 className="contact-panel-title">
            Atendimento pelo WhatsApp
          </h3>
          <p className="contact-panel-description">
            Converse diretamente com nossa equipe para obter informações sobre
            nossos serviços.
          </p>

          {whatsappUrl ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Entrar em contato pelo WhatsApp (abre em nova aba)"
              className="contact-primary-link interactive-arrow-parent"
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
                className="contact-primary-link contact-primary-link--disabled"
              >
                Entrar em contato
                <MessageIcon />
              </button>
              <p
                id="whatsapp-status"
                className="contact-status"
              >
                WhatsApp aguardando confirmação do número.
              </p>
            </>
          )}

          <nav
            aria-label="Outros canais da Impact Slug"
            className="contact-social-nav"
          >
            <ul className="contact-social-list">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.label} da Impact Slug (abre em nova aba)`}
                    className="contact-social-link interactive-arrow-parent"
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
