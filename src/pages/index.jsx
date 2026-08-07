import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { ArrowDown, ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import QuickInformation from "@/components/QuickInformation";
import SchoolEvents from "@/components/SchoolEvents";
import LeadersMessages from "@/components/LeadersMessages";
import Gallery from "@/components/Gallery";
import AnnouncementBoard from "@/components/AnnouncementBoard";

const HERO_VIDEO_SRC = "https://res.cloudinary.com/dslrhfcwf/video/upload/v1786081027/hnima38ns9f6nhnyv40r.mp4";

function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current || !("IntersectionObserver" in window)) {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return <div ref={ref} className={`transition-all duration-700 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function VideoFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0A2348]">
      <div className="absolute inset-0 hero-grid opacity-30" />
      <div className="absolute -right-24 -top-24 h-[32rem] w-[32rem] rounded-full border border-[#F4C430]/25" />
      <div className="absolute -bottom-28 -left-28 h-[28rem] w-[28rem] rounded-full bg-[#F4C430]/10 blur-3xl" />
      <p className="absolute bottom-10 right-10 font-display text-3xl italic text-white/70">A campus in motion.</p>
    </div>
  );
}

function HeroVideo() {
  const videoRef = useRef(null);

  return (
    <div className="absolute inset-0 z-0">
      {HERO_VIDEO_SRC ? (
        <video ref={videoRef} autoPlay loop muted playsInline preload="auto" className="h-full w-full object-cover">
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
      ) : <VideoFallback />}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(5,24,48,0.46)_0%,transparent_52%,rgba(5,24,48,0.2)_100%)]" />
    </div>
  );
}

export default function Home() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sbcs.edu.in";

  return (
    <div className="overflow-hidden bg-[#FCFCFD] text-[#1B1F24]">
      <Head>
        <title>Sree Narayana Public School (SNPS) — Kollam</title>
        <meta name="description" content="Sree Narayana Public School in Kollam — nurturing minds, character and curiosity since 1997." />
        <link rel="canonical" href={siteUrl} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap" rel="stylesheet" />
      </Head>

      <section className="relative isolate min-h-[100svh] overflow-hidden bg-[#0A2348]">
        <HeroVideo />
        <div className="pointer-events-none absolute inset-0 z-[1] hero-noise opacity-[0.025]" />

        <header className="absolute inset-x-5 top-1/2 z-20 -translate-y-1/2 text-center sm:inset-x-8 lg:inset-x-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#F4C430] sm:text-xs">Kollam · Est. 1997</p>
          <h1 className="font-display mt-4 text-4xl leading-[0.94] tracking-[-0.04em] text-white drop-shadow-[0_5px_18px_rgba(0,0,0,0.45)] sm:text-6xl lg:text-8xl">Sree Narayana<br />Public School</h1>
          <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-white/90 drop-shadow-md sm:text-base">A community where curiosity, character and confidence grow together.</p>
        </header>

        <div className="absolute bottom-5 left-5 z-40 w-[calc(100%-2rem)] sm:bottom-7 sm:w-auto lg:left-8">
          <AnnouncementBoard />
        </div>

        <a href="#about-us" aria-label="Explore more" className="absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 text-white/90 transition hover:text-[#F4C430] xl:inline-flex"><ArrowDown className="h-5 w-5 animate-bounce" /></a>
      </section>

      <section className="bg-white px-5 py-14 sm:px-6 sm:py-16 lg:px-8">
        <Reveal className="mx-auto grid max-w-7xl items-center gap-8 rounded-[2rem] border border-[#123C73]/10 bg-[#FCFCFD] p-7 shadow-[0_18px_55px_rgba(18,60,115,0.08)] sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:p-12">
          <div className="text-center lg:text-left">
            <p className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#123C73]"><span className="h-px w-8 bg-[#F4C430]" /> Learning beyond the classroom</p>
            <h2 className="font-display mt-5 text-4xl leading-[0.98] tracking-[-0.04em] text-[#123C73] sm:text-5xl">Where bright minds <em className="text-[#0A2348]">find their way.</em></h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#667085] sm:text-base lg:mx-0">An education grounded in curiosity, compassion and the enduring values of Sree Narayana Guru.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a href="/admission" className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-[#123C73] px-6 py-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#0A2348]">Begin your journey <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></a>
            <a href="#about-us" className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#123C73]/15 bg-white px-6 py-4 text-sm font-semibold text-[#123C73] transition hover:border-[#123C73]/35 hover:bg-[#F7F9FC]">Discover SNPS <ChevronRight className="h-4 w-4" /></a>
          </div>
        </Reveal>
      </section>

      <section className="relative bg-[#123C73] py-11 text-center text-white sm:py-14">
        <div className="absolute inset-0 quote-pattern opacity-30" />
        <Reveal className="relative mx-auto max-w-4xl px-5"><Sparkles className="mx-auto h-4 w-4 text-[#F4C430]" /><blockquote className="font-display mt-4 text-2xl leading-snug sm:text-3xl lg:text-4xl">"One caste, one religion, one God for mankind."</blockquote><p className="mt-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#F4C430]">Sree Narayana Guru</p></Reveal>
      </section>

      <section id="about-us" className="relative scroll-mt-20 bg-white py-20 sm:py-24 lg:py-32">
        <div className="absolute left-0 top-0 h-64 w-64 rounded-br-full bg-[#F4C430]/10" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:px-8">
          <Reveal className="relative mx-auto w-full max-w-md lg:mx-0"><div className="absolute -bottom-5 -right-5 h-full w-full rounded-[2rem] border border-[#F4C430]/50" /><div className="relative overflow-hidden rounded-[2rem] bg-[#123C73] p-3 shadow-2xl shadow-[#123C73]/15"><img src="/guru.png" alt="Portrait of Sree Narayana Guru" className="h-[420px] w-full rounded-[1.35rem] object-cover object-center sm:h-[500px]" /><div className="absolute inset-x-8 bottom-8 rounded-2xl bg-white/95 px-5 py-4 text-[#123C73] shadow-lg backdrop-blur-sm"><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#667085]">Our foundation</p><p className="font-display mt-1 text-xl italic">Knowledge that uplifts.</p></div></div></Reveal>
          <div className="text-center lg:text-left"><Reveal><p className="section-kicker justify-center lg:justify-start">A place to become</p><h2 className="font-display mt-6 text-4xl leading-[1.05] tracking-[-0.03em] text-[#1B1F24] sm:text-5xl">Every child deserves an education that feels <em className="text-[#123C73]">expansive.</em></h2></Reveal><Reveal delay={120}><p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-[#667085] lg:mx-0 lg:text-lg">At SNPS, we pair academic rigour with the confidence to ask questions, the care to work together and the courage to serve the world beyond the classroom.</p></Reveal><Reveal delay={200}><div className="mt-9 grid gap-3 text-left sm:grid-cols-2">{[["Rooted in values", "Character shapes everything we do."], ["Ready for tomorrow", "Curiosity grows into capability."]].map(([title, body]) => <div key={title} className="rounded-2xl border border-[#123C73]/10 bg-[#F7F9FC] p-5"><p className="font-semibold text-[#123C73]">{title}</p><p className="mt-1 text-sm leading-6 text-[#667085]">{body}</p></div>)}</div></Reveal><Reveal delay={280}><a href="/the-school/objectives" className="mt-9 inline-flex items-center gap-2 border-b-2 border-[#F4C430] pb-1 text-sm font-bold text-[#123C73] transition hover:gap-3">Explore our philosophy <ArrowRight className="h-4 w-4" /></a></Reveal></div>
        </div>
      </section>

      <div className="bg-[#F7F9FC]"><QuickInformation /><SchoolEvents /><Gallery /><LeadersMessages /></div>

      <style jsx global>{`
        .font-display { font-family: "Playfair Display", Georgia, serif !important; }
        .hero-grid { background-image: linear-gradient(rgba(255,255,255,.16) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,.16) 1px,transparent 1px); background-size: 38px 38px; }
        .hero-noise { background-image: radial-gradient(rgba(255,255,255,.85) .55px, transparent .55px); background-size: 5px 5px; }
        .quote-pattern { background-image: radial-gradient(rgba(244,196,48,.45) 1px, transparent 1px); background-size: 20px 20px; }
        .section-kicker { display: inline-flex; align-items: center; gap: .75rem; color: #123C73; font-size: .7rem; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; }
        .section-kicker::before { content: ""; height: 1px; width: 2rem; background: #F4C430; }
      `}</style>
    </div>
  );
}