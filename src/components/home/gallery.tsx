"use client";

import Image from "next/image";
import {
  useCallback,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from "react";

type GalleryItem = {
  number: string;
  label: string;
  alt: string;
  fileName: string;
  src: string | null;
  orientation: "portrait" | "landscape";
  imageClassName?: string;
};

const galleryItems = [
  {
    number: "01",
    label: "Componentes usinados",
    alt: "Operador realizando o acabamento de um componente metálico usinado",
    fileName: "componentes-usinados.png",
    src: "/images/componentes-usinados.png",
    orientation: "landscape",
    imageClassName: "gallery-card-image--components",
  },
  {
    number: "02",
    label: "Acabamento e precisão",
    alt: "Técnico verificando a pressão de um componente com um manômetro",
    fileName: "manuntenção.png",
    src: "/images/manuntenção.png",
    orientation: "portrait",
    imageClassName: "gallery-card-image--finishing",
  },
  {
    number: "03",
    label: "Nossa oficina",
    alt: "Torno trabalhando em um componente metálico durante o processo de usinagem",
    fileName: "segundaimg-usinagem.png",
    src: "/images/segundaimg-usinagem.png",
    orientation: "landscape",
    imageClassName: "gallery-card-image--workshop",
  },
  {
    number: "04",
    label: "Processo de fabricação",
    alt: "Operador fabricando chumbos em uma prensa manual",
    fileName: "fabricar-chumbo.jpeg",
    src: "/images/fabricar-chumbo.jpeg",
    orientation: "portrait",
    imageClassName: "gallery-card-image--manufacturing",
  },
  {
    number: "05",
    label: "Controle de qualidade",
    alt: "Chumbos sendo conferidos em uma balança de precisão",
    fileName: "chumbo-balança.jpeg",
    src: "/images/chumbo-balança.jpeg",
    orientation: "portrait",
    imageClassName: "gallery-card-image--quality-control",
  },
] satisfies readonly GalleryItem[];

type GalleryPosition = "current" | "previous" | "next" | "hidden";

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

function GalleryArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path
        d={direction === "left" ? "m15 5-7 7 7 7" : "m9 5 7 7-7 7"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swipeStartX = useRef<number | null>(null);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) =>
      (current - 1 + galleryItems.length) % galleryItems.length
    );
  }, []);

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % galleryItems.length);
  }, []);

  const getPosition = (index: number): GalleryPosition => {
    const previousIndex =
      (activeIndex - 1 + galleryItems.length) % galleryItems.length;
    const nextIndex = (activeIndex + 1) % galleryItems.length;

    if (index === activeIndex) return "current";
    if (index === previousIndex) return "previous";
    if (index === nextIndex) return "next";
    return "hidden";
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showPrevious();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showNext();
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    swipeStartX.current = event.clientX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (swipeStartX.current === null) return;

    const distance = event.clientX - swipeStartX.current;
    swipeStartX.current = null;

    if (Math.abs(distance) < 45) return;
    if (distance > 0) showPrevious();
    else showNext();
  };

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

        <div
          className="gallery-carousel"
          role="region"
          aria-roledescription="carrossel"
          aria-label="Trabalhos realizados pela Impact Slug"
        >
          <p className="screen-reader-only" aria-live="polite">
            Slide {activeIndex + 1} de {galleryItems.length}: {galleryItems[activeIndex].label}
          </p>

          <div
            className="gallery-carousel-stage"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              swipeStartX.current = null;
            }}
          >
            {galleryItems.map((item, index) => {
              const position = getPosition(index);
              const isActive = position === "current";
              const imageSizes = item.orientation === "portrait"
                ? "(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) 48vw, 420px"
                : "(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) 72vw, 760px";

              return (
                <figure
                  key={item.number}
                  aria-hidden={!isActive}
                  className={`gallery-carousel-slide gallery-carousel-slide--${item.orientation} gallery-carousel-slide--${position}`}
                >
                  <div className="gallery-carousel-media">
                    {item.src ? (
                      <Image
                        src={item.src}
                        alt={isActive ? item.alt : ""}
                        fill
                        sizes={imageSizes}
                        loading={position === "hidden" ? "lazy" : "eager"}
                        className={`gallery-carousel-image ${item.imageClassName ?? ""}`}
                      />
                    ) : (
                      <GalleryPlaceholder fileName={item.fileName} />
                    )}
                  </div>

                  <figcaption className="gallery-carousel-caption">
                    <span className="gallery-carousel-label">{item.label}</span>
                    <span className="gallery-carousel-number" aria-hidden="true">
                      {item.number}
                    </span>
                  </figcaption>
                </figure>
              );
            })}

            <button
              type="button"
              className="gallery-carousel-arrow gallery-carousel-arrow--previous"
              aria-label="Exibir trabalho anterior"
              onClick={showPrevious}
            >
              <GalleryArrowIcon direction="left" />
            </button>
            <button
              type="button"
              className="gallery-carousel-arrow gallery-carousel-arrow--next"
              aria-label="Exibir próximo trabalho"
              onClick={showNext}
            >
              <GalleryArrowIcon direction="right" />
            </button>
          </div>

          <div className="gallery-carousel-indicators" aria-label="Selecionar trabalho">
            {galleryItems.map((item, index) => (
              <button
                key={item.number}
                type="button"
                className={`gallery-carousel-indicator${index === activeIndex ? " gallery-carousel-indicator--active" : ""}`}
                aria-label={`Exibir slide ${index + 1}: ${item.label}`}
                aria-current={index === activeIndex ? "true" : undefined}
                onClick={() => setActiveIndex(index)}
              >
                <span />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
