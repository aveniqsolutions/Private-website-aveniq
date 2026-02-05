/* All UI components for the AuraMax replica live here. Frontend-only, data mocked. */
import React, { useEffect, useMemo, useRef, useState } from "react";

// Image registry (sourced via vision_expert_agent). Each key used at most once.
export const IMAGES = {
  hero_main: "https://images.unsplash.com/photo-1520170350707-b2da59970118",
  hero_alt_1: "https://images.unsplash.com/photo-1584585696759-1df9872e1eca",
  hero_alt_2: "https://images.pexels.com/photos/2749495/pexels-photo-2749495.jpeg",

  // Materials / Macro
  material_aluminum: "https://images.unsplash.com/photo-1487215078519-e21cc028cb29",
  material_hinge: "https://images.unsplash.com/photo-1617714313606-283484c136be",
  material_leather: "https://images.pexels.com/photos/2858481/pexels-photo-2858481.jpeg",

  // Lifestyle / Model
  model_male_side: "https://images.unsplash.com/photo-1593769645155-d6416081c0c5",
  model_person_moody: "https://images.pexels.com/photos/1812237/pexels-photo-1812237.jpeg",
  model_female: "https://images.pexels.com/photos/2531356/pexels-photo-2531356.jpeg",

  // Smart connectivity
  airpods_dark: "https://images.unsplash.com/photo-1615281612781-4b972bd4e3fe",
  iphone_dark: "https://images.unsplash.com/photo-1632560354926-21886c0e811c",

  // Hi-Res (white/silver)
  hires_white_1: "https://images.unsplash.com/photo-1491927570842-0261e477d937",
  hires_white_2: "https://images.pexels.com/photos/3496992/pexels-photo-3496992.jpeg",

  // Additional product shots for variants/pricing
  variant_sony_grey: "https://images.unsplash.com/photo-1584585696759-1df9872e1eca",
  variant_black_alt: "https://images.pexels.com/photos/2749495/pexels-photo-2749495.jpeg",
  variant_white: "https://images.pexels.com/photos/2123430/pexels-photo-2123430.jpeg",

  // Testimonials (8 distinct portraits)
  t1: "https://images.unsplash.com/photo-1639149888905-fb39731f2e6c",
  t2: "https://images.unsplash.com/photo-1569913486515-b74bf7751574",
  t3: "https://images.unsplash.com/photo-1601455763557-db1bea8a9a5a",
  t4: "https://images.unsplash.com/photo-1581065178047-8ee15951ede6",
  t5: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
  t6: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
  t7: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  t8: "https://images.pexels.com/photos/33338682/pexels-photo-33338682.jpeg",
};

// Utilities
export const useInView = (options = { threshold: 0.2 }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setInView(true);
      });
    }, options);
    obs.observe(el);
    return () => obs.disconnect();
  }, [options]);
  return { ref, inView };
};

export const Section = ({ id, className = "", children }) => (
  <section id={id} className={`section-wrapper ${className}`}>
    <div className="container mx-auto px-6 md:px-8 lg:px-12">{children}</div>
  </section>
);

export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className={`fixed top-0 inset-x-0 z-50 transition-all ${
      scrolled ? "backdrop-blur-sm bg-[rgba(5,5,6,0.6)]/60 border-b border-white/5" : "bg-transparent"
    }`}>
      <div className="container mx-auto px-6 md:px-8 lg:px-12 h-16 flex items-center justify-between">
        <a href="#top" className="font-display text-lg tracking-wide text-white/90 hover:text-white">AuraMax</a>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#features" className="nav-link">Features</a>
          <a href="#design" className="nav-link">Design</a>
          <a href="#specs" className="nav-link">Specs</a>
          <a href="#reviews" className="nav-link">Reviews</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#faq" className="nav-link">FAQ</a>
        </nav>
        <a href="#pricing" className="btn btn-sm">Pre-Order</a>
      </div>
    </div>
  );
};

export const Hero = () => {
  const [open, setOpen] = useState(false);
  return (
    <header id="top" className="relative pt-28 md:pt-32 lg:pt-36 pb-16 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0b0b0c] via-[#0b0b0c] to-[#0b0b0c]" />
      <div className="absolute -top-40 right-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-b from-fuchsia-700/10 via-purple-700/5 to-transparent blur-3xl" />
      <div className="absolute -bottom-40 left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-t from-cyan-700/10 via-emerald-700/5 to-transparent blur-3xl" />

      <div className="container mx-auto px-6 md:px-8 lg:px-12 grid lg:grid-cols-2 gap-10 items-center">
        <div className="order-2 lg:order-1">
          <div className="stacked-heading select-none" aria-hidden="true">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="stack-line">AURAMAX</div>
            ))}
          </div>
          <h1 className="sr-only">AuraMax — Studio-grade audio with industry-leading noise cancellation</h1>
          <p className="mt-6 max-w-xl text-neutral-300 text-base md:text-lg leading-relaxed">
            Experience studio-grade audio with industry-leading noise cancellation and stunning minimalist design.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <button className="btn" onClick={() => setOpen(true)}>Watch Demo</button>
            <div className="text-xs uppercase tracking-widest text-white/60">Ships Starting
              <span className="text-white/90 font-semibold ml-2">July 15</span>
              <span className="mx-2 text-white/30">·</span>
              <span className="text-white/80">Limited Quantities Available</span>
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2 relative">
          <div className="hero-media">
            <img src={IMAGES.hero_main} alt="Matte black over-ear headphones on dark background" loading="eager" className="w-full h-auto object-cover rounded-2xl shadow-2xl ring-1 ring-white/10" />
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-6" onClick={() => setOpen(false)}>
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden ring-1 ring-white/10" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-3 right-3 btn btn-sm" onClick={() => setOpen(false)} aria-label="Close">Close</button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
              title="AuraMax Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </header>
  );
};

export const MeetAura = () => {
  const { ref, inView } = useInView();
  return (
    <Section className="py-16 md:py-24">
      <div ref={ref} className={`grid lg:grid-cols-2 gap-10 items-center fade-up ${inView ? "inview" : ""}`}>
        <div>
          <p className="eyebrow">Meet AuraMax</p>
          <h2 className="h2">Premium wireless headphones that blend precision, power, and comfort.</h2>
          <p className="mt-4 text-neutral-300">
            Featuring adaptive noise cancellation, studio-level clarity, and a fit so light it disappears. Just pure audio, no distractions.
          </p>
        </div>
        <div className="relative">
          <img src={IMAGES.model_male_side} alt="Side profile wearing AuraMax in studio lighting" loading="lazy" className="w-full h-auto rounded-2xl object-cover ring-1 ring-white/10" />
        </div>
      </div>
    </Section>
  );
};

export const Features = () => {
  const items = useMemo(() => ([
    {
      title: "Every Note. Exactly as It Was Meant to Be Heard",
      desc: "40mm titanium drivers deliver unmatched clarity and depth — from soaring highs to thunderous lows.",
      tag: "Precision",
      img: IMAGES.material_aluminum,
      alt: "Macro shot of headphone material detail",
    },
    {
      title: "Active Noise Cancellation",
      desc: "Hybrid adaptive ANC intelligently tunes out the world up to 40dB without coloring your music.",
      tag: "Power",
      img: IMAGES.material_hinge,
      alt: "Close-up of hinge detail emphasizing build quality",
    },
    {
      title: "Smart Connectivity",
      desc: "Bluetooth 5.3 with seamless multipoint pairing and ultra-low latency for calls and streams.",
      tag: "Purity",
      img: IMAGES.iphone_dark,
      alt: "iPhone on dark surface representing seamless pairing",
    },
    {
      title: "40-Hour Battery Life",
      desc: "From commute to studio and back — power that lasts. Fast charge via USB-C.",
      tag: "Endurance",
      img: IMAGES.hero_alt_2,
      alt: "Headphones with dramatic shadows suggesting long battery life",
    },
  ]), []);

  return (
    <Section id="features" className="py-16 md:py-24">
      <p className="eyebrow mb-6">Features.</p>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
        {items.map((f, i) => (
          <article key={i} className="card hover-lift">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl ring-1 ring-white/10">
              <img src={f.img} alt={f.alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105" />
              <div className="absolute top-3 left-3 text-[10px] uppercase tracking-[.2em] bg-white/5 text-white/80 px-2 py-1 rounded-full ring-1 ring-white/10">{f.tag}</div>
            </div>
            <div className="mt-5">
              <h3 className="h4">{f.title}</h3>
              <p className="mt-2 text-neutral-300">{f.desc}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <MaterialCard title="Anodized Aluminum Frame" img={IMAGES.material_aluminum} alt="Anodized aluminum finish" />
        <MaterialCard title="Stainless Steel" img={IMAGES.material_hinge} alt="Reinforced stainless hinge" />
        <MaterialCard title="Leather Ear Cushions" img={IMAGES.material_leather} alt="Breathable leather ear cushions" />
      </div>
    </Section>
  );
};

const MaterialCard = ({ title, img, alt }) => (
  <div className="card-sm">
    <div className="relative aspect-[16/9] overflow-hidden rounded-lg ring-1 ring-white/10">
      <img src={img} alt={alt} loading="lazy" className="w-full h-full object-cover" />
    </div>
    <div className="mt-3 flex items-center justify-between">
      <p className="text-white/90 text-sm font-medium">{title}</p>
      <span className="inline-flex items-center text-white/50 text-xs gap-1">Learn More
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="opacity-60"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
    </div>
  </div>
);

export const DesignStyles = () => {
  return (
    <Section id="design" className="py-16 md:py-24">
      <p className="eyebrow">Design &amp; Build.</p>
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="h2">Choose your Style.</h2>
          <p className="mt-4 text-neutral-300">Minimal textures, premium materials, iconic silhouette. Designed for long sessions and everyday carry.</p>
          <ul className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <li className="chip">Graphite Black</li>
            <li className="chip">Steel Grey</li>
            <li className="chip">Forest Green</li>
            <li className="chip">Ocean Blue</li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <ImgTile src={IMAGES.variant_sony_grey} alt="Graphite/Grey variant" label="Steel Grey" />
          <ImgTile src={IMAGES.variant_black_alt} alt="Graphite Black variant" label="Graphite Black" />
          <ImgTile src={IMAGES.hires_white_1} alt="White/Silver variant" label="Silver White" />
          <ImgTile src={IMAGES.airpods_dark} alt="Dark accessory ecosystem" label="Ecosystem" />
        </div>
      </div>
    </Section>
  );
};

const ImgTile = ({ src, alt, label }) => (
  <figure className="relative group aspect-square overflow-hidden rounded-xl ring-1 ring-white/10 hover:shadow-xl">
    <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
    <figcaption className="absolute bottom-2 left-2 text-[11px] px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm ring-1 ring-white/10">{label}</figcaption>
  </figure>
);

export const Specs = () => {
  const rows = [
    ["Driver Size", "40mm Titanium-Coated Dynamic Drivers"],
    ["Frequency Response", "10Hz – 40kHz"],
    ["Impedance", "32Ω"],
    ["Bluetooth Version", "5.3 with Multipoint Connectivity"],
    ["Audio Codecs", "SBC, AAC, aptX™, aptX Adaptive™"],
    ["Noise Cancellation", "Hybrid Active Noise Cancellation (up to 40dB)"],
    ["Battery Life", "Up to 40h (ANC off), 30h (ANC on)"],
    ["Charging Time", "1.5h (USB-C Fast Charge)"],
    ["Microphones", "Dual Beamforming Mics with ENC"],
    ["Weight", "260g"],
  ];
  return (
    <Section id="specs" className="py-16 md:py-24">
      <p className="eyebrow">Technical Specifications</p>
      <h2 className="h2">Engineered to Perform</h2>
      <p className="mt-4 text-neutral-300">All the details that make the AuraMax exceptional.</p>
      <div className="mt-10 grid lg:grid-cols-2 gap-8">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-white/10">
          <img src={IMAGES.hero_alt_1} alt="Product hero alternate" loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="rounded-2xl ring-1 ring-white/10 p-6 md:p-8 bg-white/5">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            {rows.map(([k, v]) => (
              <div key={k} className="border-b border-white/10 pb-3">
                <dt className="text-white/60 text-sm">{k}</dt>
                <dd className="text-white/90 mt-1 font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <Badge title="Design Award Winner" />
        <Badge title="Rated by 10,000+ Users" />
        <Badge title="Trusted by Studio Professionals" />
        <Badge title="Certified Hi-Res Audio" />
        <Badge title="Featured in TechCrunch &amp; Wired" />
        <Badge title="Over 100K Units Sold Worldwide" />
      </div>
    </Section>
  );
};

const Badge = ({ title }) => (
  <div className="rounded-xl ring-1 ring-white/10 p-4 bg-white/[0.03] text-sm text-white/80 flex items-center gap-3">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-emerald-400"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" stroke="currentColor" strokeWidth="1.5"/></svg>
    <span>{title}</span>
  </div>
);

export const Testimonials = () => {
  const people = [
    { img: IMAGES.t1, name: "Beat Craft", handle: "@beatcraft", quote: "These sound better than my studio monitors." },
    { img: IMAGES.t2, name: "Emily L.", handle: "@emilylondon", quote: "I wear them for 8 hours straight — no fatigue." },
    { img: IMAGES.t3, name: "Marcus T.", handle: "@marcusprod", quote: "You’ll hear songs you thought you knew, differently." },
    { img: IMAGES.t4, name: "Alexis", handle: "@alexsound", quote: "Noise cancellation is unreal. Music feels alive." },
    { img: IMAGES.t5, name: "Ren", handle: "@renmix", quote: "Clarity and punch — perfect for editing." },
    { img: IMAGES.t6, name: "Mia", handle: "@miacreates", quote: "Fit disappears — just pure sound all day." },
    { img: IMAGES.t7, name: "Jon", handle: "@jonmix", quote: "The build screams premium. Worth it." },
    { img: IMAGES.t8, name: "Sofia", handle: "@sofia.dev", quote: "My go-to for deep work and flights." },
  ];
  const trackRef = useRef(null);
  const scrollBy = (dir) => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({ left: dir * 420, behavior: "smooth" });
  };
  return (
    <Section id="reviews" className="py-16 md:py-24">
      <p className="eyebrow">Testimonials</p>
      <h2 className="h2">Loved by Audiophiles &amp; Creators</h2>
      <p className="mt-4 text-neutral-300">Trusted by producers, streamers, and everyday listeners worldwide.</p>

      <div className="mt-8 relative">
        <div className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth" ref={trackRef}>
          {people.map((p, i) => (
            <figure key={i} className="min-w-[360px] max-w-[360px] rounded-2xl ring-1 ring-white/10 p-5 bg-white/[0.04]">
              <blockquote className="text-white/90">“{p.quote}”</blockquote>
              <div className="mt-4 flex items-center gap-3">
                <img src={p.img} alt={`${p.name} portrait`} className="w-10 h-10 rounded-full object-cover ring-1 ring-white/10" loading="lazy" />
                <figcaption className="text-sm text-white/70">{p.name}
                  <span className="ml-2 text-white/40">{p.handle}</span>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
        <button className="carousel-btn left-0" aria-label="Previous" onClick={() => scrollBy(-1)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button className="carousel-btn right-0" aria-label="Next" onClick={() => scrollBy(1)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </Section>
  );
};

export const Pricing = () => {
  const perks = ["Travel Case", "USB-C Charger", "2-Year Warranty", "Free Worldwide Shipping"];
  return (
    <Section id="pricing" className="py-16 md:py-24">
      <p className="eyebrow">Pricing</p>
      <h2 className="h2">Pre-Order the AuraMax</h2>
      <p className="mt-3 text-neutral-300">Reserve yours today — limited early-bird pricing.</p>

      <div className="mt-8 grid lg:grid-cols-2 gap-8 items-stretch">
        <div className="rounded-2xl ring-1 ring-white/10 p-6 md:p-8 bg-white/[0.04] flex flex-col justify-between">
          <div>
            <div className="flex items-baseline gap-4">
              <div className="text-5xl md:text-6xl font-extrabold tracking-tight -mr-1">$299</div>
              <div className="text-white/40 line-through text-2xl">$349</div>
            </div>
            <p className="mt-2 text-xs uppercase tracking-widest text-emerald-300/80">Launch Offer (Save $50)</p>
            <ul className="mt-6 grid grid-cols-2 gap-3">
              {perks.map((p) => (
                <li key={p} className="flex items-center gap-2 text-white/80 text-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-emerald-400"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 flex items-center gap-4">
            <a href="#" className="btn">Pre-Order Now</a>
            <span className="text-white/50 text-xs">Ships worldwide</span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <VariantCard img={IMAGES.variant_sony_grey} title="Graphite" />
          <VariantCard img={IMAGES.variant_black_alt} title="Obsidian" />
          <VariantCard img={IMAGES.hires_white_2} title="Glacier" />
          <VariantCard img={IMAGES.model_person_moody} title="Studio" />
        </div>
      </div>
    </Section>
  );
};

const VariantCard = ({ img, title }) => (
  <div className="rounded-xl ring-1 ring-white/10 overflow-hidden bg-white/[0.03]">
    <div className="aspect-square overflow-hidden">
      <img src={img} alt={`${title} variant`} loading="lazy" className="w-full h-full object-cover" />
    </div>
    <div className="p-3 text-center text-sm text-white/80">{title}</div>
  </div>
);

export const FAQ = () => {
  const items = [
    { q: "What’s the battery life like with ANC on?", a: "Up to 30 hours with ANC on; 40 hours with ANC off." },
    { q: "Can I use it wired and wireless?", a: "Yes, Bluetooth 5.3 or 3.5mm analog with included cable." },
    { q: "Is it compatible with iOS and Android?", a: "Fully compatible with iOS, Android, Mac, and Windows." },
    { q: "Does it support multipoint Bluetooth connections?", a: "Yes — connect to two devices simultaneously." },
    { q: "How long does it take to fully charge?", a: "About 1.5 hours via USB‑C Fast Charge." },
    { q: "What’s included in the box?", a: "AuraMax, travel case, USB‑C cable, 3.5mm cable, quick start guide." },
  ];
  return (
    <Section id="faq" className="py-16 md:py-24">
      <h2 className="h2">Got Questions? We’ve Got Answers.</h2>
      <div className="mt-8 divide-y divide-white/10 rounded-2xl ring-1 ring-white/10 overflow-hidden">
        {items.map((it, idx) => (
          <Disclosure key={idx} q={it.q} a={it.a} />
        ))}
      </div>
    </Section>
  );
};

const Disclosure = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white/[0.02]">
      <button className="w-full px-5 py-4 flex items-center justify-between text-left" onClick={() => setOpen(!open)}>
        <span className="text-white/90">{q}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={`transition-transform ${open ? "rotate-45" : ""}`}><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
      </button>
      {open && (
        <div className="px-5 pb-5 -mt-2 text-white/70">{a}</div>
      )}
    </div>
  );
};

export const FooterCta = () => {
  const [email, setEmail] = useState("");
  const submit = (e) => {
    e.preventDefault();
    console.log("Subscribe:", email);
  };
  return (
    <Section className="py-16 md:py-24">
      <div className="rounded-3xl ring-1 ring-white/10 p-8 md:p-12 gradient-panel">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="h2">Stay Tuned for Sound Evolution</h2>
            <p className="mt-3 text-neutral-200">Get early access to future drops, updates, and exclusive content.</p>
          </div>
          <form onSubmit={submit} className="flex gap-3">
            <input type="email" required placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="input flex-1" aria-label="Email address" />
            <button className="btn" type="submit">Join the Sound Club</button>
          </form>
        </div>
      </div>
      <div className="mt-10 text-center text-white/40 text-sm">© {new Date().getFullYear()} AuraMax. All rights reserved.</div>
    </Section>
  );
};

// Shared small components and styles via utility classes in index.css