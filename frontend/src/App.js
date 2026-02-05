import React, { useEffect } from "react";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar, Hero, Services, Portfolio, About, Contact, Footer } from "./business-components";

function useGlobalRevealObserver() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll('.reveal-left, .reveal-up'));
    if (!targets.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('inview');
          // Keep permanently: stop observing this element after first reveal
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

function Home() {
  useGlobalRevealObserver();
  return (
    <div className="min-h-screen bg-black text-white">
      <NavBar />
      <Hero />
      <main>
        <Services />
        <Portfolio />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;