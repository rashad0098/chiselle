import { useEffect, useMemo, useRef } from "react";
import { STATS } from "../../data/content";
import { srcAssetUrl } from "../../config/assets";
import FadeUpInView from "../common/FadeUpInView";
import FadeUpLines from "../common/FadeUpLines";
import ScrubStagger from "../common/ScrubStagger";
import { ensureScrollTrigger, gsap, ScrollTrigger } from "../../lib/gsapSetup";

const bgTexture = srcAssetUrl("bg-texture-2.svg");
const ABOUT_IMAGE_SRC = srcAssetUrl("nowshiba-founder.jpg");

export default function About() {
  const sectionRef = useRef(null);
  const linePathRef = useRef(null);

  const parsedStats = useMemo(
    () =>
      STATS.map((s) => {
        const match = String(s.value).match(/^(\d+)(.*)$/);
        const target = match ? Number(match[1]) : 0;
        const suffix = match ? match[2] : "";
        return { ...s, target, suffix };
      }),
    [],
  );

  useEffect(() => {
    const section = sectionRef.current;
    const path = linePathRef.current;
    if (!section || !path || typeof window === "undefined") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    ensureScrollTrigger();

    const ctx = gsap.context(() => {
      const pathLength = path.getTotalLength();
      const drawLength = window.innerWidth >= 1024 ? 4000 : pathLength;
      gsap.set(path, {
        strokeDasharray: drawLength,
        strokeDashoffset: drawLength,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 3.2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: section,
          start: "top 65%",
          once: true,
          toggleActions: "play none none none",
          invalidateOnRefresh: true,
        },
      });
    }, section);

    const onResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="overflow-hidden relative py-16 lg:py-[60px]"
    >
      <div
        className="absolute inset-0 opacity-90 pointer-events-none"
        style={{
          backgroundImage: `url(${bgTexture})`,
          backgroundSize: "250px",
          backgroundPosition: "top right",
          backgroundRepeat: "no-repeat",
          opacity: 0.2,
        }}
      />
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 700 600"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            ref={linePathRef}
            d="M-80 620 C 10 590, 80 565, 140 535 C 210 500, 265 505, 150 455 C 90 428, 100 403, 182 387 C 255 372, 320 368, 385 355 C 470 336, 548 292, 590 242 C 630 196, 705 159, 785 136 C 895 104, 1015 94, 1125 74 C 1250 52, 1325 40, 1440 6"
            fill="none"
            stroke="#D9BFA6"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="container relative z-10 pb-12 mx-auto text-center lg:pb-20">
        <FadeUpInView
          as="p"
          scrub={0}
          className="mb-6 text-[14px] leading-[20px] text-secondary uppercase font-primary"
        >
          SO WHAT'S CHISELLE ABOUT
        </FadeUpInView>

        <FadeUpLines
          as="h2"
          className="md:mb-8 font-secondary text-[1.75rem] md:text-[2.4rem] lg:text-[42px] leading-snug tracking-[0.02em] text-brand-primary uppercase"
          fromEnd
        >
          WHERE BEAUTY FEELS LIKE YOU.
          <br className="hidden lg:block" />
          REAL, NATURAL AND INTENTIONAL
        </FadeUpLines>
      </div>

      <div className="relative z-10 container grid items-center gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="flex order-1 justify-center">
          <FadeUpInView
            as="div"
            variant="card"
            className="relative max-w-sm lg:max-w-md"
          >
            <div className="overflow-hidden relative">
              {ABOUT_IMAGE_SRC ? (
                <img
                  src={ABOUT_IMAGE_SRC}
                  alt="Nowshiba Shajahan – Founder & Senior Pro Artist at Chiselle"
                  className="block object-cover w-full h-auto"
                />
              ) : (
                <div className="block w-full h-[420px] bg-gradient-to-b from-brand-gold/60 to-brand-cream" />
              )}
            </div>
          </FadeUpInView>
        </div>

        <ScrubStagger
          as="div"
          variant="text"
          className="order-2 max-w-xl lg:ml-6"
          stagger={0.07}
          scrub={0.45}
        >
          <p
            data-scrub-item
            className="mb-4 text-base font-light leading-relaxed font-primary text-brand-secondary"
          >
            Chiselle was never meant to be loud or overcomplicated. It began
            with one simple belief: makeup should feel comfortable, intentional,
            and still feel like you.
          </p>
          <p
            data-scrub-item
            className="mb-4 text-base font-light leading-relaxed font-primary text-brand-secondary"
          >
            Every look is built slowly and thoughtfully. No forcing trends. Just
            understanding your features, your comfort, and the kind of bride you
            want to be on your wedding day.
          </p>
          <p
            data-scrub-item
            className="mb-8 text-base font-light leading-relaxed font-primary text-brand-secondary"
          >
            Nowshiba brings years of hands-on experience working closely with
            brides, models, and women from all walks of life. That experience
            shows not just in the final look, but in the process. Knowing when
            to add, when to hold back, and when to let your natural self lead.
            We take on a limited number of bookings to ensure every bride
            receives the time, attention, and effortless experience she deserves
            on her special day.
          </p>

          <div
            data-scrub-item
            className="flex flex-wrap gap-8 mb-8 text-brand-primary"
          >
            {parsedStats.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-primary md:text-[32px] leading-10">
                  {s.target}
                  {s.suffix}
                </div>
                <div className="mt-1 text-sm font-primary">{s.label}</div>
              </div>
            ))}
          </div>

          <div data-scrub-item className="space-y-2">
            <p className="text-3xl font-script md:text-4xl text-brand-primary">
              Nowshiba Shajahan
            </p>
            <p className="text-base text-brand-primary font-primary">
              Founder &amp; Senior Pro Artist, Chiselle
            </p>
          </div>

          <div data-scrub-item>
            <a href="/about" className="inline-block mt-6 btn-primary">
              BEHIND CHISELLE
            </a>
          </div>
        </ScrubStagger>
      </div>
    </section>
  );
}
