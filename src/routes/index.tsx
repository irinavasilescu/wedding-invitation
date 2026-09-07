import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { Phone } from "lucide-react";
import { useRef } from "react";
import noblessePalace from "@/assets/noblesse-palace.png";
import vintagePhone from "@/assets/vintage-phone.png";
import sketchCoupe from "@/assets/sketch-coupe.png";
import sketchFork from "@/assets/sketch-fork.png";
import sketchTicket from "@/assets/sketch-ticket.png";
import sketchTurntable from "@/assets/sketch-turntable.png";

export const Route = createFileRoute("/")({
  component: Invitation,
});

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay: i * 0.15, ease: EASE },
  }),
};

function Letter({ char, delay }: { char: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      className="inline-block"
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

function AnimatedWord({ word, baseDelay = 0 }: { word: string; baseDelay?: number }) {
  return (
    <span className="inline-block">
      {word.split("").map((c, i) => (
        <Letter key={i} char={c} delay={baseDelay + i * 0.05} />
      ))}
    </span>
  );
}

function Section({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className={className}
      style={style}
    >
      {children}
    </motion.section>
  );
}

function AugustCalendar() {
  // August 2026: Aug 1 is a Saturday. Mon-first grid.
  const leadingBlanks = 5; // Mon..Fri before Sat 1
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const cells: (number | null)[] = [
    ...Array(leadingBlanks).fill(null),
    ...days,
  ];
  while (cells.length % 7 !== 0) cells.push(null);
  const weeks: (number | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  const weekdays = ["Lun", "Mar", "Mie", "Joi", "Vin", "Sâm", "Dum"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.4, ease: EASE }}
      className="w-[78%] max-w-[15rem] sm:max-w-sm md:max-w-xl h-full max-h-full flex flex-col justify-center bg-background"
    >
        <div className="text-center mb-4 md:mb-6">
          <h3 className="font-display text-4xl md:text-6xl text-[var(--wood-dark-solid)] tracking-tight">
          August <span className="italic">2026</span>
        </h3>
          <div className="mt-2 text-[var(--wood-dark-soft)] tracking-[0.5em] text-[10px]">·  ·  ·</div>
      </div>

        <div className="grid grid-cols-7 text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-[var(--wood-dark-muted)] mb-1">
        {weekdays.map((d) => (
          <div key={d} className="py-1 text-center">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 border-t border-l" style={{ borderColor: "var(--wood-dark-faint)" }}>
        {cells.map((day, i) => {
          const isNine = day === 9;
          return (
            <div
              key={i}
              className="relative aspect-square border-r border-b flex items-center justify-center font-display text-base md:text-xl text-[var(--wood-dark-solid)]"
              style={{ borderColor: "var(--wood-dark-faint)" }}
            >
              {day ?? ""}
              {isNine && (
                <>
                  <svg
                    viewBox="0 0 100 100"
                    className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
                    aria-hidden
                  >
                    {/* Hand-drawn loop */}
                    <path
                      d="M 68 28
                         C 84 34, 86 58, 74 72
                         C 62 84, 36 84, 24 70
                         C 14 58, 18 36, 34 26
                         C 48 18, 66 20, 78 32"
                      fill="none"
                      stroke="#6b1a1f"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      transform="rotate(-6 50 50)"
                    />
                    {/* Hand-drawn arrow from circle going down-right */}
                    <path
                      d="M 80 78
                         C 96 92, 118 104, 138 112"
                      fill="none"
                      stroke="#6b1a1f"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    {/* Arrowhead */}
                    <path
                      d="M 138 112 L 128 110 M 138 112 L 132 104"
                      fill="none"
                      stroke="#6b1a1f"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span
                    className="absolute font-display italic text-sm md:text-lg text-[#6b1a1f] pointer-events-none whitespace-nowrap"
                    style={{ left: "115%", top: "110%" }}
                  >
                    13:00
                  </span>
                </>
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

function Invitation() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* HERO */}
      <div ref={heroRef} className="relative min-h-[90svh] md:h-[100svh] flex flex-col">
        {/* Scattered hand-drawn sketches */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <motion.img
            src={sketchCoupe}
            alt=""
            data-allow-samsung-filter="true"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.85, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="samsung-dark-image samsung-dark-image--sketch absolute top-[7%] left-[4%] w-22 md:w-40 -rotate-6"
          />
          <motion.img
            src={sketchFork}
            alt=""
            data-allow-samsung-filter="true"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.85, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease: EASE }}
            className="samsung-dark-image samsung-dark-image--sketch absolute top-[6%] right-[5%] w-8 md:w-12 rotate-12"
          />
          <motion.img
            src={sketchTicket}
            alt=""
            data-allow-samsung-filter="true"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.85, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: EASE }}
            className="samsung-dark-image samsung-dark-image--sketch absolute bottom-[12%] left-[6%] w-24 md:w-44 -rotate-12"
          />
          <motion.img
            src={sketchTurntable}
            alt=""
            data-allow-samsung-filter="true"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.85, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28, ease: EASE }}
            className="samsung-dark-image samsung-dark-image--sketch absolute bottom-[12%] right-[4%] w-24 md:w-48 rotate-6"
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="flex justify-center items-center px-6 md:px-14 pt-6 md:pt-8 text-[10px] md:text-xs tracking-[0.35em] uppercase font-medium"
        >
          <span>O invitație</span>
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="flex-1 flex flex-col justify-center items-center text-center px-6 md:px-14 relative pb-8 md:pb-0"
        >
          <h1 className="font-display text-[18vw] md:text-[15vw] leading-[0.88] tracking-[-0.03em] text-[var(--wood-dark-solid)] text-center">
            <div>
              <AnimatedWord word="Irina" baseDelay={0.6} />
            </div>
            <div className="flex items-baseline justify-center gap-[2vw] -mt-[2vw] md:-mt-[1vw] italic text-[var(--claret-solid)]">
              <motion.span
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.55, delay: 0.18, ease: EASE }}
                className="font-display text-[12vw] md:text-[10vw] leading-none"
              >
                &amp;
              </motion.span>
            </div>
            <div>
              <AnimatedWord word="Alex" baseDelay={1.7} />
            </div>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.32 }}
            className="mt-7 md:mt-14 text-xs md:text-sm tracking-[0.45em] uppercase font-medium text-center"
          >
            se căsătoresc.
          </motion.p>
        </motion.div>

        {/* Bottom hero meta */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, delay: 0.38 }}
          className="grid grid-cols-1 gap-2 px-6 md:px-14 pb-6 md:pb-8 text-center md:grid-cols-3 md:gap-0 md:text-left text-[10px] md:text-xs tracking-[0.3em] uppercase font-medium"
        >
          <span>09 / 08 / 2026</span>
          <span className="md:text-center">Palatul Noblesse</span>
          <span className="md:text-right">București</span>
        </motion.div>
      </div>

      {/* THE DAY */}
      <Section className="border-t h-screen flex flex-col px-6 md:px-14 py-6 md:py-10 overflow-hidden" style={{ borderColor: "var(--foreground-faint)" }}>
        <motion.p
          variants={fadeUp}
          custom={0}
          className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-[var(--claret)]"
        >
          Ziua —
        </motion.p>
        <div className="flex-1 min-h-0 flex items-center justify-center">
          <AugustCalendar />
        </div>
      </Section>

      {/* THE PLACE */}
      <Section className="border-t min-h-screen flex flex-col justify-center py-12 md:py-16 px-6 md:px-14" style={{ borderColor: "var(--foreground-faint)" }}>
        <div className="grid md:grid-cols-[1fr_1.8fr] gap-8 md:gap-12 items-center">
          {/* Left: title + details */}
          <div className="flex flex-col">
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-[var(--claret)]"
            >
              Locul —
            </motion.p>

            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-5 font-display text-[13vw] md:text-[5.6vw] leading-[0.9] tracking-[-0.02em] text-[var(--wood-dark)]"
            >
              <span className="italic text-[var(--claret)]">Palatul</span>
              <br />
              <span className="uppercase tracking-[0.02em]">Noblesse.</span>
            </motion.h2>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="mt-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-1 gap-5"
            >
              <div>
                <p className="text-[9px] tracking-[0.35em] uppercase text-muted-foreground">Adresă</p>
                <a
                  href="https://maps.app.goo.gl/9kkrBKqiX6fTXzLP6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 text-sm font-medium underline underline-offset-4 inline-block"
                >
                  Strada Sfinților 7
                </a>
                <p className="text-xs text-muted-foreground">București, România</p>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.35em] uppercase text-muted-foreground">Sosire</p>
                <p className="mt-1.5 text-sm font-medium">De la 13:00</p>
                <p className="text-xs text-muted-foreground">Ușile se deschid devreme</p>
              </div>
              <div>
                <p className="text-[9px] tracking-[0.35em] uppercase text-muted-foreground">Ținută</p>
                <p className="mt-1.5 text-sm font-medium">Ținută de cocktail</p>
                <p className="text-xs text-muted-foreground">În tonuri de vară</p>
              </div>
            </motion.div>
          </div>

          {/* Right: illustration */}
          <motion.div
            variants={fadeUp}
            custom={2}
            className="w-full"
          >
            <motion.a
              href="https://maps.app.goo.gl/9kkrBKqiX6fTXzLP6"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 1.02 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.6, ease: EASE }}
              className="block w-full cursor-pointer"
            >
              <img
                src={noblessePalace}
                alt="Ilustrație desenată manual a fațadei Palatului Noblesse"
                data-allow-samsung-filter="true"
                className="samsung-dark-image samsung-dark-image--palace w-full h-auto max-h-[94vh] object-contain select-none"
                loading="lazy"
              />
            </motion.a>
          </motion.div>
        </div>
      </Section>

      {/* RSVP */}
      <Section className="border-t py-24 md:py-40 px-6 md:px-14 overflow-hidden" style={{ borderColor: "var(--foreground-faint)" }}>
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.img
            src={vintagePhone}
            alt=""
            aria-hidden
            data-allow-samsung-filter="true"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.4, ease: EASE }}
            className="samsung-dark-image samsung-dark-image--phone pointer-events-none select-none block mx-auto w-64 md:w-full md:max-w-[28rem] order-2 md:order-1"
          />
          <div className="order-1 md:order-2">
        <motion.div
          variants={fadeUp}
          custom={0}
          className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-[var(--claret)]"
        >
          R · S · V · P —
        </motion.div>

        <motion.h3
          variants={fadeUp}
          custom={1}
          className="mt-8 font-display text-[13vw] md:text-[5.6vw] leading-[0.9] tracking-[-0.02em] text-[var(--wood-dark)]"
        >
              <span className="italic">Vei fi</span>
              <br />
              <span className="text-[var(--claret)]">alături de noi?</span>
        </motion.h3>

        <motion.div
          variants={fadeUp}
          custom={2}
          className="mt-12 flex flex-col gap-6"
        >
          <a
            href="tel:0730467740"
            className="inline-flex items-center gap-3 text-xs tracking-[0.4em] uppercase font-medium border-b-2 border-foreground pb-2 w-fit"
          >
            <Phone className="w-4 h-4 text-[var(--claret)]" strokeWidth={1.5} />
            Confirmă cu Irina
          </a>
          <a
            href="tel:0729105461"
            className="inline-flex items-center gap-3 text-xs tracking-[0.4em] uppercase font-medium border-b-2 border-foreground pb-2 w-fit"
          >
            <Phone className="w-4 h-4 text-[var(--claret)]" strokeWidth={1.5} />
            Confirmă cu Alex
          </a>
        </motion.div>

        <motion.p
          variants={fadeUp}
          custom={3}
          className="mt-8 text-[10px] md:text-xs tracking-[0.35em] uppercase text-muted-foreground"
        >
          Vă rugăm să confirmați
          <br />
          până pe 1 iulie 2026
        </motion.p>

        <motion.p
          variants={fadeUp}
          custom={3}
          className="mt-20 text-xs tracking-[0.4em] uppercase text-muted-foreground"
        >
          Cu drag,
        </motion.p>
        <motion.p
          variants={fadeUp}
          custom={4}
          className="mt-3 font-display italic text-2xl md:text-4xl text-[var(--claret)]"
        >
          Irina &amp; Alex
        </motion.p>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t py-8 px-6 md:px-14 grid grid-cols-3 text-[10px] tracking-[0.35em] uppercase font-medium" style={{ borderColor: "var(--foreground-faint)" }}>
        <span>09.08.2026</span>
        <span className="text-center">Strada Sfinților 7</span>
        <span className="text-right">Palatul Noblesse</span>
      </footer>
    </main>
  );
}
