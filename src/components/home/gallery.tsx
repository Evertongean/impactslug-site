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
      className="size-11 text-muted"
    >
      <rect x="5" y="8" width="38" height="32" stroke="currentColor" />
      <circle cx="17" cy="19" r="4" stroke="currentColor" />
      <path d="m9 35 10-9 7 6 5-5 8 8" stroke="currentColor" />
    </svg>
  );
}

function GalleryPlaceholder({ fileName }: Pick<GalleryItem, "fileName">) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface-muted px-6 text-center">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30 [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:64px_64px]"
      />
      <span
        aria-hidden="true"
        className="absolute top-0 left-8 h-0.5 w-16 bg-accent"
      />
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-0 h-px w-10 bg-line"
      />
      <span
        aria-hidden="true"
        className="absolute top-0 left-1/2 h-10 w-px bg-line"
      />

      <div className="relative flex max-w-xs flex-col items-center">
        <GalleryPlaceholderIcon />
        <p className="mt-5 text-sm font-semibold tracking-[0.14em] text-foreground uppercase">
          Fotografia real pendente
        </p>
        <p className="mt-3 font-mono text-[0.62rem] tracking-[0.12em] text-muted uppercase">
          Arquivo: {fileName}
        </p>
      </div>
    </div>
  );
}

function GalleryCard({ item }: { item: GalleryItem }) {
  const sizeClass = item.featured
    ? "aspect-[4/5] md:row-span-2 md:aspect-auto md:min-h-[680px] xl:min-h-[760px]"
    : "aspect-[4/3] md:aspect-auto md:min-h-0";

  return (
    <figure
      className={`group relative overflow-hidden rounded-sm border border-line bg-surface transition-colors duration-300 hover:border-accent/70 ${sizeClass}`}
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
          className="object-cover transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transform-none motion-reduce:transition-none"
        />
      ) : (
        <GalleryPlaceholder fileName={item.fileName} />
      )}

      <figcaption className="absolute inset-x-0 bottom-0 flex min-h-16 items-center justify-between gap-4 border-t border-line bg-background/90 px-5 backdrop-blur-sm sm:px-6">
        <span className="text-xs font-bold tracking-[0.12em] text-foreground uppercase sm:text-sm">
          {item.label}
        </span>
        <span className="font-mono text-xs tracking-[0.18em] text-accent" aria-hidden="true">
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
      className="scroll-mt-20 border-b border-line bg-surface lg:scroll-mt-24"
    >
      <div className="site-container py-20 md:py-24 lg:py-28 xl:py-32">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] lg:items-end lg:gap-12 xl:gap-20">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-9 bg-accent" aria-hidden="true" />
              <p className="font-mono text-xs font-semibold tracking-[0.2em] text-accent uppercase">
                Portfólio / Impact Slug
              </p>
            </div>

            <h2
              id="gallery-title"
              className="mt-7 max-w-5xl text-[clamp(2.45rem,10vw,5.15rem)] leading-[0.91] font-black tracking-[-0.055em] text-foreground uppercase lg:text-[clamp(3.7rem,5.4vw,6.25rem)]"
            >
              <span className="block">Nosso trabalho</span>
              <span className="block text-accent">em detalhes.</span>
            </h2>
          </div>

          <p className="max-w-xl border-l border-line pl-5 text-base leading-7 text-muted sm:text-lg sm:leading-8 lg:mb-1 lg:justify-self-end lg:pl-7">
            Conheça alguns componentes e trabalhos realizados pela Impact Slug.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.9fr)] md:grid-rows-2 lg:mt-16 xl:gap-5">
          {galleryItems.map((item) => (
            <GalleryCard key={item.number} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
