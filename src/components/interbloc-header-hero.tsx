"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type PointerEvent,
} from "react";
import "./interbloc-header-hero.css";

// Adapted from the supplied InterblocHeaderHero: the same photography framing
// is shared by the base, all 14 curtains and the pointer's preview window.
const SLICE_COUNT = 14;
const SWEEP_MS = 1250;
const AUTOPLAY_MS = 5500;
const slides = [
  {
    id: "concreto",
    image: "/images/pilhas-pisos-intertravados.png",
    position: "center 48%",
    eyebrow: "INTER BLOC / SOLUÇÕES EM CONCRETO",
    heading: [
      { text: "O CONCRETO " },
      { text: "DÁ FORMA", muted: true },
      { text: " AO SEU PROJETO." },
    ],
    description:
      "Conheça as soluções da Inter Bloc e encontre o que sua obra precisa.",
    caption: "Pisos intertravados / produção Inter Bloc",
  },
  {
    id: "obra",
    image: "/images/patio-producao-intertravados.png",
    position: "center 58%",
    eyebrow: "MATERIAIS PARA CONSTRUIR",
    heading: [
      { text: "CADA OBRA " },
      { text: "COMEÇA", muted: true },
      { text: " COM BOAS ESCOLHAS." },
    ],
    description:
      "Explore os produtos e converse com nossa equipe sobre o seu projeto.",
    caption: "Pátio de produção / Fortaleza, CE",
  },
  {
    id: "detalhes",
    image: "/images/estoque-blocos-concreto.png",
    position: "center 50%",
    eyebrow: "INTER BLOC / FORTALEZA",
    heading: [
      { text: "SOLUÇÕES " },
      { text: "EM CONCRETO", muted: true },
      { text: " PARA O SEU DIA A DIA." },
    ],
    description:
      "Veja os produtos e solicite atendimento de forma simples e direta.",
    caption: "Peças de concreto / estoque Inter Bloc",
  },
];
const navLinks = [
  { label: "Produtos", href: "#produtos" },
  { label: "A Inter Bloc", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];
const subscribeHydration = () => () => {};
const subscribeMotion = (notify: () => void) => {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
};
const subscribeVisibility = (notify: () => void) => {
  document.addEventListener("visibilitychange", notify);
  return () => document.removeEventListener("visibilitychange", notify);
};

function Arrow({ down = false }: { down?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d={down ? "M5 12h14m-6-6 6 6-6 6" : "M5 19 19 5M5 5h14v14"} />
    </svg>
  );
}

export default function InterblocHeaderHero({
  quoteHref,
}: {
  quoteHref: string;
}) {
  const [current, setCurrent] = useState(0);
  const [target, setTarget] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [focusWithin, setFocusWithin] = useState(false);
  const [inView, setInView] = useState(true);
  const hydrated = useSyncExternalStore(
    subscribeHydration,
    () => true,
    () => false,
  );
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );
  const pageVisible = useSyncExternalStore(
    subscribeVisibility,
    () => document.visibilityState === "visible",
    () => true,
  );
  const root = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const pointerFrame = useRef<number | null>(null);
  const transitionLock = useRef(false);
  const readyImages = useRef(new Set<number>());
  const [imageVersion, setImageVersion] = useState(0);
  const active = slides[current];
  const nextIndex = (current + 1) % slides.length;
  const incoming = target === null ? null : slides[target];
  const animate = hydrated && !reducedMotion;
  const playing =
    animate && !paused && !focusWithin && !menuOpen && pageVisible && inView;

  const goTo = useCallback(
    (index: number) => {
      if (
        transitionLock.current ||
        index === current ||
        !readyImages.current.has(index)
      )
        return;
      if (reducedMotion) {
        setCurrent(index);
        return;
      }
      transitionLock.current = true;
      root.current?.removeAttribute("data-preview");
      setTarget(index);
    },
    [current, reducedMotion],
  );

  useEffect(() => {
    if (target === null) return;
    // CSS runs the staggered curtains. The lock also covers rapid keyboard clicks.
    const timer = window.setTimeout(
      () => {
        setCurrent(target);
        setTarget(null);
        transitionLock.current = false;
      },
      reducedMotion ? 0 : SWEEP_MS,
    );
    return () => window.clearTimeout(timer);
  }, [target, reducedMotion]);

  useEffect(() => {
    if (!playing || target !== null || !readyImages.current.has(nextIndex))
      return;
    const timer = window.setTimeout(() => goTo(nextIndex), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [playing, target, nextIndex, goTo, imageVersion]);

  useEffect(() => {
    const element = root.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting),
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(
    () => () => {
      if (pointerFrame.current !== null)
        cancelAnimationFrame(pointerFrame.current);
    },
    [],
  );

  const movePointer = (event: PointerEvent<HTMLElement>) => {
    if (
      event.pointerType !== "mouse" ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      !animate ||
      transitionLock.current ||
      !readyImages.current.has(nextIndex)
    )
      return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const left = Math.min(
      92,
      Math.max(0, ((event.clientX - bounds.left) / bounds.width) * 100 - 4),
    );
    const element = event.currentTarget;
    if (pointerFrame.current !== null)
      cancelAnimationFrame(pointerFrame.current);
    pointerFrame.current = requestAnimationFrame(() => {
      element.style.setProperty("--preview-left", `${left}%`);
      element.style.setProperty("--preview-right", `${92 - left}%`);
      element.setAttribute("data-preview", "true");
      pointerFrame.current = null;
    });
  };
  const clearPointer = () => {
    if (pointerFrame.current !== null)
      cancelAnimationFrame(pointerFrame.current);
    pointerFrame.current = null;
    root.current?.removeAttribute("data-preview");
  };

  return (
    <header
      id="inicio"
      ref={root}
      className="ib-hero"
      aria-label="Inter Bloc — apresentação"
      onPointerMove={movePointer}
      onPointerLeave={clearPointer}
      onFocusCapture={() => setFocusWithin(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocusWithin(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && menuOpen) {
          setMenuOpen(false);
          menuButton.current?.focus();
        }
      }}
    >
      <div className="ib-hero-photographs" aria-hidden="true">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="ib-hero-photo-frame"
            style={{ opacity: index === current ? 1 : 0 }}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              sizes="100vw"
              preload={index === 0}
              loading={index === 0 ? undefined : "eager"}
              className="ib-hero-photo"
              style={{ objectPosition: slide.position }}
              onLoad={() => {
                readyImages.current.add(index);
                setImageVersion((version) => version + 1);
              }}
            />
          </div>
        ))}
      </div>
      {incoming && !reducedMotion && (
        <div className="ib-hero-curtains" aria-hidden="true" key={incoming.id}>
          {Array.from({ length: SLICE_COUNT }, (_, index) => (
            <div
              key={index}
              className="ib-hero-slice"
              style={
                {
                  "--slice-left": `${(index * 100) / SLICE_COUNT}%`,
                  "--slice-right": `${100 - ((index + 1) * 100) / SLICE_COUNT}%`,
                  "--slice-delay": `${index * 45}ms`,
                } as CSSProperties
              }
            >
              <Image
                src={incoming.image}
                alt=""
                fill
                sizes="100vw"
                className="ib-hero-photo"
                style={{ objectPosition: incoming.position }}
              />
            </div>
          ))}
        </div>
      )}
      <div className="ib-hero-preview" aria-hidden="true">
        <Image
          src={slides[nextIndex].image}
          alt=""
          fill
          sizes="100vw"
          className="ib-hero-photo"
          style={{ objectPosition: slides[nextIndex].position }}
        />
      </div>
      <div className="ib-hero-shade" aria-hidden="true" />

      <div className="ib-hero-navigation">
        <nav className="ib-hero-desktop-nav" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="ib-hero-nav-quote" href={quoteHref}>
          Solicitar orçamento <Arrow />
        </a>
        <button
          ref={menuButton}
          className="ib-hero-menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="interbloc-mobile-nav"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span aria-hidden="true">
            {menuOpen ? (
              "×"
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M3 8h18M3 16h18" />
              </svg>
            )}
          </span>
        </button>
        <nav
          id="interbloc-mobile-nav"
          className="ib-hero-mobile-nav"
          aria-label="Navegação para celular"
          hidden={!menuOpen}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
              <Arrow down />
            </a>
          ))}
          <a href={quoteHref} onClick={() => setMenuOpen(false)}>
            Solicitar orçamento <Arrow />
          </a>
        </nav>
      </div>

      <div className="ib-hero-content">
        <div className="ib-hero-location">
          <span>FORTALEZA / CE</span>
          <span>FABRICAÇÃO E VENDA</span>
        </div>
        <div className="ib-hero-editorial">
          <p className="ib-hero-eyebrow">{active.eyebrow}</p>
          <h1
            id="hero-title"
            className={`ib-hero-title ${animate ? "ib-hero-typing" : ""}`}
            key={`${active.id}-${animate}`}
          >
            <span className="ib-hero-sr-only">
              {active.heading.map((part) => part.text).join("")}
            </span>
            {slides.map((slide) => (
              <span
                key={slide.id}
                className="ib-hero-title-size"
                aria-hidden="true"
              >
                {slide.heading.map((part) => part.text).join("")}
              </span>
            ))}
            <span className="ib-hero-title-copy" aria-hidden="true">
              {active.heading.map((part, partIndex) => {
                const offset = active.heading
                  .slice(0, partIndex)
                  .reduce((total, item) => total + item.text.length, 0);
                return (
                  <span
                    key={partIndex}
                    className={
                      "muted" in part && part.muted
                        ? "ib-hero-muted"
                        : undefined
                    }
                  >
                    {Array.from(part.text).map((character, index) => (
                      <span
                        key={index}
                        className="ib-hero-character"
                        style={
                          {
                            "--character-delay": `${(offset + index) * 24}ms`,
                          } as CSSProperties
                        }
                      >
                        {character}
                      </span>
                    ))}
                  </span>
                );
              })}
            </span>
          </h1>
          <p className="ib-hero-description">{active.description}</p>
          <div className="ib-hero-actions">
            <a className="ib-hero-primary" href={quoteHref}>
              Solicitar orçamento <Arrow />
            </a>
            <a className="ib-hero-secondary" href="#produtos">
              Ver produtos <Arrow down />
            </a>
          </div>
        </div>
        <div className="ib-hero-bottom">
          <div
            className="ib-hero-controls"
            role="group"
            aria-label="Controles do carrossel"
          >
            <span className="ib-hero-current" aria-hidden="true">
              {String(current + 1).padStart(2, "0")}
            </span>
            {slides.map((slide, index) => (
              <button
                type="button"
                key={slide.id}
                className="ib-hero-indicator"
                aria-label={`Ver slide ${index + 1}: ${slide.heading.map((part) => part.text).join("")}`}
                aria-current={index === current ? "true" : undefined}
                disabled={target !== null}
                onClick={() => goTo(index)}
              >
                <span />
              </button>
            ))}
            <span className="ib-hero-total" aria-hidden="true">
              / {String(slides.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              className="ib-hero-pause"
              disabled={reducedMotion}
              aria-label={
                paused || reducedMotion
                  ? "Retomar carrossel automático"
                  : "Pausar carrossel automático"
              }
              aria-pressed={paused || reducedMotion}
              onClick={() => setPaused(!paused)}
            >
              {paused || reducedMotion ? (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="m5 3 8 5-8 5z" />
                </svg>
              ) : (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M4 3h3v10H4zm5 0h3v10H9z" />
                </svg>
              )}
            </button>
          </div>
          <p className="ib-hero-caption">{active.caption}</p>
          <span
            className="ib-hero-sr-only"
            role="status"
            aria-live={
              focusWithin || paused || reducedMotion ? "polite" : "off"
            }
          >
            Imagem {current + 1} de {slides.length}
          </span>
        </div>
      </div>
    </header>
  );
}
