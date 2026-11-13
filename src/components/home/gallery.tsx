import Image from "next/image";

type GalleryItem = {
  number: string;
  label: string;
  alt: string;
  fileName: string;
  src: string | null;
  featured?: boolean;
};

const galleryItems = [
  {
    number: "01",
    label: "Componentes usinados",
    alt: "Componentes metálicos usinados pela Impact Slug",
    fileName: "componentes-usinados.jpg",
    src: null,
    featured: true,
  },
  {
    number: "02",
    label: "Acabamento e precisão",
    alt: "Peças metálicas de precisão produzidas pela Impact Slug",
    fileName: "pecas-de-precisao.jpg",
    src: null,
  },
  {
    number: "03",
    label: "Nossa oficina",
    alt: "Torno trabalhando em um componente metálico durante o processo de usinagem",
    fileName: "segundaimg-usinagem.png",
    src: "/images/segundaimg-usinagem.png",
  },
] satisfies readonly GalleryItem[];

function GalleryPlaceholderIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      fill="none"
      className="gallery-placeholder-icon"
    >
      <rect x="5" y="8" width="38" height="32" stroke="currentColor" />
      <circle cx="17" cy="19" r="4" stroke="currentColor" />
      <path d="m9 35 10-9 7 6 5-5 8 8" stroke="currentColor" />
    </svg>
  );
}

function GalleryPlaceholder({ fileName }: Pick<GalleryItem, "fileName">) {
  return (
    <div className="gallery-placeholder">
      <div
        aria-hidden="true"
        className="gallery-placeholder-grid"
      />
      <span
        aria-hidden="true"
        className="gallery-placeholder-accent"
      />
      <span
        aria-hidden="true"
        className="gallery-placeholder-horizontal-mark"
      />
      <span
        aria-hidden="true"
        className="gallery-placeholder-vertical-mark"
      />

      <div className="gallery-placeholder-content">
        <GalleryPlaceholderIcon />
        <p className="gallery-placeholder-title">
          Fotografia real pendente
        </p>
        <p className="gallery-placeholder-file">
          Arquivo: {fileName}
        </p>
      </div>
    </div>
  );
}

function GalleryCard({ item }: { item: GalleryItem }) {
  const sizeClass = item.featured
    ? "gallery-card--featured"
    : "gallery-card--standard";

  return (
    <figure
      className={`gallery-card ${sizeClass}`}
    >
      {item.src ? (
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes={
            item.featured
              ? "(max-width: 767px) calc(100vw - 32px), 60vw"
              : "(max-width: 767px) calc(100vw - 32px), 40vw"
          }
          className="gallery-card-image"
        />
      ) : (
        <GalleryPlaceholder fileName={item.fileName} />
      )}

      <figcaption className="gallery-card-caption">
        <span className="gallery-card-label">
          {item.label}
        </span>
        <span className="gallery-card-number" aria-hidden="true">
          {item.number}
        </span>
      </figcaption>
    </figure>
  );
}

export function Gallery() {
  return (
    <section
      id="galeria"
      aria-labelledby="gallery-title"
      className="gallery-section"
    >
      <div className="site-container gallery-container">
        <div className="gallery-intro">
          <div className="gallery-all">
            <div className="section-kicker">
              <span className="section-kicker-line" aria-hidden="true" />
              <p className="section-kicker-text">
                Portfólio / Impact Slug
              </p>
            </div>

            <h2
              id="gallery-title"
              className="gallery-title"
            >
              <span className="gallery-title-line">Nosso trabalho</span>
              <span className="gallery-title-line accent-text">em detalhes.</span>
            </h2>
          </div>
          <div>
            <p className="gallery-summary">
              Conheça alguns componentes e trabalhos realizados pela Impact Slug.
            </p>
          </div>

        </div>

        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <GalleryCard key={item.number} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
