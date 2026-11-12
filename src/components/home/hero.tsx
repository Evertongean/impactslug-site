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
  image: string;
  imageAlt: string;
  objectPosition?: string;
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
    image: "/images/hero/experiencia.png",
    imageAlt: "Carabina PCP com mira telescópica apresentada pela Impact Slug",
    objectPosition: "center 58%",
  },
  {
    identifier: "Nosso compromisso",
    title: [
      [{ text: "Precisão em" }],
      [{ text: "cada detalhe.", accent: true }],
    ],
    description:
      "Atenção ao acabamento, ao processo e à qualidade em cada trabalho realizado.",
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
    image: "/images/hero/usinagem.png",
    imageAlt: "Torno trabalhando em um componente metálico na oficina",
  },
];

function ArrowUpRightIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none"
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

const TRANSITION_DURATION = 200;

type TransitionPhase = "idle" | "out" | "in";

export function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitionPhase, setTransitionPhase] =
    useState<TransitionPhase>("idle");
  const [isPointerInteracting, setIsPointerInteracting] = useState(false);
  const [isFocusWithin, setIsFocusWithin] = useState(false);
  const indicatorRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeIndexRef = useRef(0);
  const pendingIndexRef = useRef(0);
  const transitionPhaseRef = useRef<TransitionPhase>("idle");
  const reduceMotionRef = useRef(false);
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const firstAnimationFrameRef = useRef<number | null>(null);
  const secondAnimationFrameRef = useRef<number | null>(null);

  const clearTransitionHandles = useCallback(() => {
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }

    if (firstAnimationFrameRef.current !== null) {
      cancelAnimationFrame(firstAnimationFrameRef.current);
      firstAnimationFrameRef.current = null;
    }

    if (secondAnimationFrameRef.current !== null) {
      cancelAnimationFrame(secondAnimationFrameRef.current);
      secondAnimationFrameRef.current = null;
    }
  }, []);

  const showSlideImmediately = useCallback(
    (index: number) => {
      clearTransitionHandles();
      activeIndexRef.current = index;
      pendingIndexRef.current = index;
      transitionPhaseRef.current = "idle";
      setActiveIndex(index);
      setTransitionPhase("idle");
    },
    [clearTransitionHandles],
  );

  const requestSlide = useCallback(
    (index: number) => {
      const nextIndex =
        ((index % heroSlides.length) + heroSlides.length) % heroSlides.length;

      if (reduceMotionRef.current) {
        showSlideImmediately(nextIndex);
        return;
      }

      if (
        transitionPhaseRef.current === "idle" &&
        nextIndex === activeIndexRef.current
      ) {
        return;
      }

      pendingIndexRef.current = nextIndex;

      if (transitionPhaseRef.current === "out") {
        return;
      }

      clearTransitionHandles();
      transitionPhaseRef.current = "out";
      setTransitionPhase("out");

      transitionTimerRef.current = setTimeout(() => {
        const pendingIndex = pendingIndexRef.current;

        activeIndexRef.current = pendingIndex;
        setActiveIndex(pendingIndex);
        transitionPhaseRef.current = "in";
        setTransitionPhase("in");
        transitionTimerRef.current = null;

        firstAnimationFrameRef.current = requestAnimationFrame(() => {
          firstAnimationFrameRef.current = null;
          secondAnimationFrameRef.current = requestAnimationFrame(() => {
            secondAnimationFrameRef.current = null;
            transitionPhaseRef.current = "idle";
            setTransitionPhase("idle");
          });
        });
      }, TRANSITION_DURATION);
    },
    [clearTransitionHandles, showSlideImmediately],
  );

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

      if (
        motionPreference.matches &&
        transitionPhaseRef.current !== "idle"
      ) {
        showSlideImmediately(pendingIndexRef.current);
      }

      if (
        !motionPreference.matches &&
        !document.hidden &&
        !isPointerInteracting &&
        !isFocusWithin
      ) {
        intervalId = setInterval(() => {
          if (transitionPhaseRef.current === "idle") {
            requestSlide((activeIndexRef.current + 1) % heroSlides.length);
          }
        }, 6000);
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

  useEffect(() => clearTransitionHandles, [clearTransitionHandles]);

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
  const isSlideVisible = transitionPhase === "idle";

  return (
    <section
      id="inicio"
      aria-label="Destaques da Impact Slug"
      aria-roledescription="carrossel"
      className="scroll-mt-20 overflow-hidden border-b border-line bg-background lg:scroll-mt-24"
    >
      <div
        className="site-container flex flex-col justify-center py-8 sm:py-9 md:py-10 lg:min-h-[500px] xl:min-h-[540px] lg:py-6 xl:py-6"
        onPointerEnter={() => setIsPointerInteracting(true)}
        onPointerLeave={() => setIsPointerInteracting(false)}
        onFocusCapture={() => setIsFocusWithin(true)}
        onBlurCapture={handleBlur}
      >
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          Slide {activeIndex + 1} de {heroSlides.length}:{" "}
          {heroSlides[activeIndex].identifier}
        </p>

        <div className="grid items-center gap-7 md:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.85fr)] lg:gap-10 xl:gap-14">
          <div className="flex flex-col justify-center">
            <div className="min-h-[13.5rem] sm:min-h-[14.5rem] lg:min-h-[clamp(13rem,11.67vw,14rem)]">
              <div
                key={activeSlide.identifier}
                className={`transition-opacity duration-200 motion-reduce:transition-none ${
                  isSlideVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="h-px w-9 shrink-0 bg-accent" aria-hidden="true" />
                  <p className="font-mono text-[0.68rem] font-semibold tracking-[0.2em] text-accent uppercase sm:text-xs">
                    {activeSlide.identifier}
                  </p>
                </div>

                <h1
                  aria-label={activeSlide.title
                    .map((line) => line.map((part) => part.text).join(""))
                    .join(" ")}
                  className="max-w-3xl text-[clamp(2.15rem,9vw,3.6rem)] leading-[0.94] font-black tracking-[-0.05em] text-foreground uppercase lg:text-[clamp(2.6rem,3.05vw,3.55rem)]"
                >
                  {activeSlide.title.map((line, lineIndex) => (
                    <span className="block" key={lineIndex}>
                      {line.map((part) => (
                        <span
                          className={part.accent ? "text-accent" : undefined}
                          key={part.text}
                        >
                          {part.text}
                        </span>
                      ))}
                    </span>
                  ))}
                </h1>

                <p className="mt-3 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-7">
                  {activeSlide.description}
                </p>
              </div>
            </div>

            <a
              href="#galeria"
              className="group mt-5 inline-flex min-h-12 w-fit items-center justify-center gap-3 bg-accent px-6 text-sm font-bold text-background transition-colors duration-200 hover:bg-foreground sm:px-7 lg:mt-4 motion-reduce:transition-none"
            >
              VER NOSSOS TRABALHOS
              <ArrowUpRightIcon />
            </a>
          </div>

          <div className="relative grid aspect-[4/3] w-full overflow-hidden rounded-sm bg-surface sm:aspect-[16/10] lg:aspect-[16/9] lg:max-w-[500px] lg:justify-self-end">
            <Image
              key={activeSlide.image}
              src={activeSlide.image}
              alt={activeSlide.imageAlt}
              fill
              preload={activeIndex === 0}
              sizes="(max-width: 1023px) calc(100vw - 32px), 500px"
              style={{ objectPosition: activeSlide.objectPosition }}
              className={`object-cover transition-opacity duration-200 motion-reduce:transition-none ${
                isSlideVisible ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>

        <div
          className="mt-2 flex items-center justify-center gap-1 sm:mt-3"
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
                onKeyDown={(event) => handleIndicatorKeyDown(event, index)}
                className="group grid size-11 place-items-center rounded-full"
              >
                <span
                  aria-hidden="true"
                  className={`block size-2.5 rounded-full transition-[background-color,transform] duration-200 motion-reduce:transform-none motion-reduce:transition-none ${
                    isActive
                      ? "scale-125 bg-accent"
                      : "bg-muted/60 group-hover:bg-accent/70"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
