"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type KeyboardEvent,
} from "react";

type HeroTitlePart = {
  text: string;
  accent?: boolean;
};

type HeroSlide = {
  identifier: string;
  title: readonly (readonly HeroTitlePart[])[];
  description: string;
  caption: string;
  image: string;
  imageAlt: string;
  imageClassName?: string;
};

const heroSlides: readonly HeroSlide[] = [
  {
    identifier: "Nossa história",
    title: [
      [{ text: "Há mais de" }],
      [{ text: "5 anos", accent: true }, { text: " no mercado." }],
    ],
    description:
      "Experiência dedicada à manutenção especializada e aos trabalhos de usinagem para carabinas PCP.",
    caption: "Manutenção especializada",
    image: "/images/manunteção-pcp.jpeg",
    imageAlt: "Carabina PCP desmontada sobre a bancada para manutenção especializada",
    imageClassName: "hero-image--history",
  },
  {
    identifier: "Nosso compromisso",
    title: [
      [{ text: "Precisão em" }],
      [{ text: "cada detalhe.", accent: true }],
    ],
    description:
      "Atenção ao acabamento, ao processo e à qualidade em cada trabalho realizado.",
    caption: "Usinagem de precisão",
    image: "/images/hero/precisao.png",
    imageAlt: "Componentes metálicos durante um processo de usinagem de precisão",
  },
  {
    identifier: "Nosso trabalho",
    title: [
      [{ text: "Manutenção e" }],
      [{ text: "usinagem", accent: true }],
      [{ text: "especializadas." }],
    ],
    description:
      "Conheça os componentes e trabalhos realizados pela Impact Slug.",
    caption: "Fabricação de componentes",
    image: "/images/hero/Operação de Torno Mecânico Verde.png",
    imageAlt: "Torno trabalhando em um componente metálico na oficina",
  },
];

const heroDifferentials = [
  {
    number: "01",
    title: "5+ anos",
    description: "De experiência no mercado",
  },
  {
    number: "02",
    title: "Usinagem de precisão",
    description: "Precisão e acabamento em cada detalhe",
  },
  {
    number: "03",
    title: "PCP & Slugs",
    description: "Manutenção e fabricação especializada",
  },
] as const;

function ArrowUpRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="external-arrow"
      fill="none"
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

function ArrowDownIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 24"
      className="hero-scroll-icon"
      fill="none"
    >
      <path
        d="M8 1v20M2.5 15.5 8 21l5.5-5.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

const TRANSITION_DURATION = 700;
const AUTOPLAY_INTERVAL = 5000;

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [wrappingIndex, setWrappingIndex] = useState<number | null>(null);
  const [isPointerInteracting, setIsPointerInteracting] = useState(false);
  const [isFocusWithin, setIsFocusWithin] = useState(false);
  const indicatorRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeIndexRef = useRef(0);
  const pendingIndexRef = useRef<number | null>(null);
  const isTransitioningRef = useRef(false);
  const reduceMotionRef = useRef(false);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestSlideRef = useRef<(index: number) => void>(() => undefined);

  const clearTransitionTimer = useCallback(() => {
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
  }, []);

  const showSlideImmediately = useCallback(
    (index: number) => {
      clearTransitionTimer();
      activeIndexRef.current = index;
      pendingIndexRef.current = null;
      isTransitioningRef.current = false;
      setActiveIndex(index);
      setWrappingIndex(null);
    },
    [clearTransitionTimer],
  );

  const requestSlide = useCallback(
    (index: number) => {
      const nextIndex =
        ((index % heroSlides.length) + heroSlides.length) % heroSlides.length;

      if (reduceMotionRef.current) {
        showSlideImmediately(nextIndex);
        return;
      }

      if (isTransitioningRef.current) {
        pendingIndexRef.current =
          nextIndex === activeIndexRef.current ? null : nextIndex;
        return;
      }

      if (nextIndex === activeIndexRef.current) {
        return;
      }

      clearTransitionTimer();
      pendingIndexRef.current = null;
      isTransitioningRef.current = true;

      const previousIndex = activeIndexRef.current;
      const isMovingForward =
        nextIndex === (previousIndex + 1) % heroSlides.length;
      const indexMovingBehind = isMovingForward
        ? (previousIndex - 1 + heroSlides.length) % heroSlides.length
        : (previousIndex + 1) % heroSlides.length;

      activeIndexRef.current = nextIndex;
      setWrappingIndex(indexMovingBehind);
      setActiveIndex(nextIndex);

      transitionTimerRef.current = setTimeout(() => {
        const queuedIndex = pendingIndexRef.current;

        pendingIndexRef.current = null;
        isTransitioningRef.current = false;
        transitionTimerRef.current = null;
        setWrappingIndex(null);

        if (
          queuedIndex !== null &&
          queuedIndex !== activeIndexRef.current
        ) {
          requestSlideRef.current(queuedIndex);
        }
      }, TRANSITION_DURATION);
    },
    [clearTransitionTimer, showSlideImmediately],
  );

  useEffect(() => {
    requestSlideRef.current = requestSlide;
  }, [requestSlide]);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let intervalId: ReturnType<typeof setInterval> | undefined;

    function stopAutoplay() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = undefined;
      }
    }

    function updateAutoplay() {
      stopAutoplay();
      reduceMotionRef.current = motionPreference.matches;

      if (motionPreference.matches && isTransitioningRef.current) {
        showSlideImmediately(
          pendingIndexRef.current ?? activeIndexRef.current,
        );
      }

      if (
        !motionPreference.matches &&
        !document.hidden &&
        !isPointerInteracting &&
        !isFocusWithin
      ) {
        intervalId = setInterval(() => {
          requestSlide((activeIndexRef.current + 1) % heroSlides.length);
        }, AUTOPLAY_INTERVAL);
      }
    }

    updateAutoplay();
    document.addEventListener("visibilitychange", updateAutoplay);
    motionPreference.addEventListener("change", updateAutoplay);

    return () => {
      stopAutoplay();
      document.removeEventListener("visibilitychange", updateAutoplay);
      motionPreference.removeEventListener("change", updateAutoplay);
    };
  }, [isFocusWithin, isPointerInteracting, requestSlide, showSlideImmediately]);

  useEffect(() => clearTransitionTimer, [clearTransitionTimer]);

  function handleBlur(event: FocusEvent<HTMLDivElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsFocusWithin(false);
    }
  }

  function handleIndicatorKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex: number | undefined;

    if (event.key === "ArrowRight") {
      nextIndex = (index + 1) % heroSlides.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (index - 1 + heroSlides.length) % heroSlides.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = heroSlides.length - 1;
    }

    if (nextIndex !== undefined) {
      event.preventDefault();
      requestSlide(nextIndex);
      indicatorRefs.current[nextIndex]?.focus();
    }
  }

  const activeSlide = heroSlides[activeIndex];

  return (
    <section
      id="inicio"
      aria-label="Destaques da Impact Slug"
      aria-roledescription="carrossel"
      className="hero-section"
    >
      <div
        className="hero-primary hero-container"
        onPointerEnter={() => setIsPointerInteracting(true)}
        onPointerLeave={() => setIsPointerInteracting(false)}
        onFocusCapture={() => setIsFocusWithin(true)}
        onBlurCapture={handleBlur}
      >
        <p className="screen-reader-only" aria-live="polite" aria-atomic="true">
          Slide {activeIndex + 1} de {heroSlides.length}:{" "}
          {heroSlides[activeIndex].identifier}
        </p>

        <div className="hero-layout">
          <div className="hero-copy-column">
            <div className="hero-slide-space">
              <div
                key={activeSlide.identifier}
                className="hero-slide"
              >
                <div className="hero-kicker">
                  <span
                    className="section-kicker-line section-kicker-line--fixed"
                    aria-hidden="true"
                  />
                  <p className="hero-kicker-text">
                    {activeSlide.identifier}
                  </p>
                </div>

                <h1
                  aria-label={activeSlide.title
                    .map((line) => line.map((part) => part.text).join(""))
                    .join(" ")}
                  className="hero-title"
                >
                  {activeSlide.title.map((line, lineIndex) => (
                    <span className="hero-title-line" key={lineIndex}>
                      {line.map((part) => (
                        <span
                          className={part.accent ? "accent-text" : undefined}
                          key={part.text}
                        >
                          {part.text}
                        </span>
                      ))}
                    </span>
                  ))}
                </h1>

                <p className="hero-description">
                  {activeSlide.description}
                </p>
              </div>
            </div>

            <a
              href="#galeria"
              className="hero-cta interactive-arrow-parent"
            >
              VER NOSSOS TRABALHOS
              <ArrowUpRightIcon />
            </a>
          </div>

          <div className="hero-visual-column">
            <div className="hero-media">
              {heroSlides.map((slide, index) => {
                const nextIndex = (activeIndex + 1) % heroSlides.length;
                let positionClass = "hero-carousel-item--previous";

                if (index === activeIndex) {
                  positionClass = "hero-carousel-item--current";
                } else if (index === nextIndex) {
                  positionClass = "hero-carousel-item--next";
                }

                return (
                  <div
                    key={slide.image}
                    aria-hidden={index !== activeIndex}
                    className={`hero-carousel-item ${positionClass}${
                      index === wrappingIndex
                        ? " hero-carousel-item--wrapping"
                        : ""
                    }`}
                  >
                    <Image
                      src={slide.image}
                      alt={index === activeIndex ? slide.imageAlt : ""}
                      fill
                      preload={index === 0}
                      sizes="(max-width: 639px) 76vw, (max-width: 767px) 72vw, (max-width: 1023px) and (orientation: landscape) 38vw, (max-width: 1023px) 68vw, 540px"
                      className={`hero-carousel-image ${
                        slide.imageClassName ?? ""
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            <div className="hero-media-footer">
              <p
                key={activeSlide.caption}
                className="hero-media-caption"
              >
                {activeSlide.caption}
              </p>

              <div
                className="hero-indicators"
                role="group"
                aria-label="Selecionar destaque"
              >
                {heroSlides.map((slide, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={slide.identifier}
                      ref={(element) => {
                        indicatorRefs.current[index] = element;
                      }}
                      type="button"
                      aria-label={`Exibir slide ${index + 1}: ${slide.identifier}`}
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => requestSlide(index)}
                      onKeyDown={(event) =>
                        handleIndicatorKeyDown(event, index)
                      }
                      className="hero-indicator"
                    >
                      <span
                        aria-hidden="true"
                        className={`hero-indicator-dot ${
                          isActive
                            ? "hero-indicator-dot--active"
                            : "hero-indicator-dot--inactive"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="hero-lower">
          <div
            className="hero-differentials"
            aria-label="Diferenciais da Impact Slug"
          >
            {heroDifferentials.map((item) => (
              <div className="hero-differential" key={item.number}>
                <span className="hero-differential-number" aria-hidden="true">
                  {item.number}
                </span>
                <div>
                  <p className="hero-differential-title">{item.title}</p>
                  <p className="hero-differential-description">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <a
            href="#servicos"
            className="hero-scroll-cue"
            aria-label="Rolar para Nossas Especialidades"
          >
            <span>Role para explorar</span>
            <ArrowDownIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
