"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Member = {
  id: string;
  name: string;
  username: string;
  role: string;
  image: string;
  bio: string;
  links: { label?: string; url?: string }[];
};

type Props = {
  site: {
    title: string;
    shortTitle: string;
    description: string;
    enterTitle: string;
    enterSubtitle: string;
    accent: string;
    background: string;
    discord: string;
  };
  members: Member[];
};

export default function Home({ site, members }: Props) {
  const reduceMotion = useReducedMotion();
  const [entered, setEntered] = useState(false);
  const [selected, setSelected] = useState<Member | null>(null);
  const [sound, setSound] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("revgng-entered");
    const savedSound = window.localStorage.getItem("revgng-sound");
    if (saved === "1") setEntered(true);
    if (savedSound === "1") setSound(true);
  }, []);

  function enter() {
    setEntered(true);
    window.localStorage.setItem("revgng-entered", "1");
  }

  function toggleSound() {
    const next = !sound;
    setSound(next);
    window.localStorage.setItem("revgng-sound", next ? "1" : "0");
  }

  const motionProps = reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7 } };

  return (
    <main className="site" style={{ "--accent": site.accent, "--bg": site.background } as React.CSSProperties}>
      <div className="noise" />
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="grid" />

      <AnimatePresence mode="wait">
        {!entered ? (
          <motion.section
            key="intro"
            className="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.03, filter: "blur(10px)" }}
            transition={{ duration: 0.55 }}
          >
            <div className="intro-line" />
            <motion.p {...motionProps} className="eyebrow">{site.shortTitle} / WORLDWIDE</motion.p>
            <motion.h1 {...motionProps} transition={{ delay: 0.08, duration: 0.7 }}>
              {site.enterTitle}
            </motion.h1>
            <motion.p {...motionProps} transition={{ delay: 0.16, duration: 0.7 }} className="subtitle">
              {site.enterSubtitle}
            </motion.p>
            <motion.button
              className="enter"
              onClick={enter}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              whileHover={reduceMotion ? {} : { y: -3 }}
              whileTap={reduceMotion ? {} : { scale: 0.98 }}
            >
              ENTER <span>↗</span>
            </motion.button>
            <div className="intro-meta">EST. / REVGNG</div>
          </motion.section>
        ) : (
          <motion.div
            key="home"
            className="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.65 }}
          >
            <header className="nav">
              <a className="brand" href="#top">{site.shortTitle}<span>.</span></a>
              <nav>
                <a href="#members">Members</a>
                <a href="#affiliates">Affiliates</a>
              </nav>
              <div className="nav-actions">
                <button onClick={toggleSound} aria-label="Toggle sound">{sound ? "SOUND ON" : "SOUND OFF"}</button>
                <a href={site.discord} target="_blank" rel="noreferrer">DISCORD ↗</a>
              </div>
            </header>

            <section id="top" className="hero">
              <div className="hero-copy">
                <p className="eyebrow">01 / WORLDWIDE</p>
                <h2>luv, revgng<br /><em>& dreamz</em></h2>
                <p className="hero-description">
                  A small collective built around people, projects and the things we create together.
                </p>
                <div className="hero-actions">
                  <a className="primary" href="#members">Meet the members <span>↓</span></a>
                  <a className="text-link" href={site.discord} target="_blank" rel="noreferrer">Join Discord ↗</a>
                </div>
              </div>
              <div className="hero-mark" aria-hidden="true">
                <span>R</span>
              </div>
            </section>

            <section id="members" className="section">
              <div className="section-head">
                <div>
                  <p className="eyebrow">02 / PEOPLE</p>
                  <h3>Members</h3>
                </div>
                <span>{String(members.length).padStart(2, "0")} people</span>
              </div>

              <div className="members-grid">
                {members.map((member, index) => (
                  <motion.button
                    key={member.id}
                    className="member-card"
                    onClick={() => setSelected(member)}
                    initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                    whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ delay: index * 0.06, duration: 0.55 }}
                    whileHover={reduceMotion ? {} : { y: -7 }}
                    whileTap={reduceMotion ? {} : { scale: 0.985 }}
                  >
                    <div className="member-image">
                      <img src={member.image} alt="" />
                      <span className="index">0{index + 1}</span>
                      <span className="open">VIEW ↗</span>
                    </div>
                    <div className="member-info">
                      <div>
                        <h4>{member.name}</h4>
                        <p>{member.username}</p>
                      </div>
                      <span>{member.role}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </section>

            <section id="affiliates" className="section affiliates">
              <div className="section-head">
                <div>
                  <p className="eyebrow">03 / CONNECTIONS</p>
                  <h3>Affiliates</h3>
                </div>
              </div>
              <div className="affiliate-row">
                <span>01</span>
                <strong>YOUR AFFILIATE</strong>
                <span>ADD IN data/site.json</span>
                <span>↗</span>
              </div>
              <div className="affiliate-row">
                <span>02</span>
                <strong>ANOTHER GROUP</strong>
                <span>OPTIONAL</span>
                <span>↗</span>
              </div>
            </section>

            <footer>
              <span>© {new Date().getFullYear()} {site.shortTitle}</span>
              <span>{site.description}</span>
              <a href="#top">BACK TO TOP ↑</a>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.article
              className="modal"
              initial={reduceMotion ? {} : { opacity: 0, y: 30, scale: 0.97 }}
              animate={reduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? {} : { opacity: 0, y: 20, scale: 0.98 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close" onClick={() => setSelected(null)}>CLOSE ×</button>
              <div className="modal-image"><img src={selected.image} alt="" /></div>
              <div className="modal-copy">
                <p className="eyebrow">{selected.role}</p>
                <h3>{selected.name}</h3>
                <p className="username">{selected.username}</p>
                <p className="bio">{selected.bio}</p>
                <div className="modal-links">
                  {selected.links?.map((link) => (
                    <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.label} ↗</a>
                  ))}
                </div>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}