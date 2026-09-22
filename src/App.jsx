import React, { useEffect, useRef, useState } from 'react';
import { COPY } from './copy.js';

const WA = '50685002402';
const waLink = (msg) =>
  `https://wa.me/${WA}${msg ? `?text=${encodeURIComponent(msg)}` : ''}`;

/* Reveal-on-scroll: adds data-reveal="in" once the element enters the viewport. */
function useReveal() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target;
          const sibs = el.parentElement ? [...el.parentElement.children] : [];
          el.style.animationDelay = `${Math.min(Math.max(0, sibs.indexOf(el)) * 70, 350)}ms`;
          el.setAttribute('data-reveal', 'in');
          io.unobserve(el);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    document.querySelectorAll('[data-reveal="1"]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const S = {
  wrap: { maxWidth: 1280, margin: '0 auto', padding: '72px 24px' },
  kicker: {
    margin: '0 0 14px',
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'var(--color-accent-700)'
  },
  h2: {
    margin: 0,
    fontFamily: 'var(--font-heading)',
    fontWeight: 900,
    fontSize: 'clamp(30px,4.2vw,52px)',
    lineHeight: 1,
    letterSpacing: '-0.015em'
  },
  rule: {
    width: 120,
    height: 4,
    background: 'var(--color-accent)',
    transformOrigin: 'left',
    animation: 'lineIn .7s cubic-bezier(.2,.7,.2,1) both'
  },
  grid: (min) => ({
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit,minmax(min(${min}px,100%),1fr))`
  }),
  tile: {
    background: 'var(--color-bg)',
    padding: '32px 26px',
    borderTop: '4px solid var(--color-accent)',
    transition: 'background .2s ease, transform .2s ease'
  },
  body: { margin: 0, fontSize: 15, color: 'var(--color-neutral-800)', textWrap: 'pretty' },
  btnUpper: { fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase' }
};

function Navbar({ t, lang, setLang }) {
  const [menu, setMenu] = useState(false);
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const onResize = () => setNarrow(window.innerWidth < 1080);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Menú móvil: bloquea el scroll del fondo y se cierra con Escape mientras está abierto.
  useEffect(() => {
    if (!menu) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') setMenu(false); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [menu]);

  // Si la pantalla deja de ser angosta (p. ej. se rota el dispositivo), cerrá el menú.
  useEffect(() => { if (!narrow) setMenu(false); }, [narrow]);

  const langBtn = (active) => ({
    minWidth: 44,
    minHeight: 44,
    padding: '7px 10px',
    border: 0,
    cursor: 'pointer',
    fontFamily: 'var(--font-heading)',
    fontWeight: 800,
    fontSize: 11,
    letterSpacing: '0.1em',
    background: active ? 'var(--color-text)' : 'transparent',
    color: active ? 'var(--color-bg)' : 'var(--color-text)'
  });

  const links = [
    ['#sobre', t.navAbout],
    ['#soluciones', t.navSolutions],
    ['#agendar', t.navBooking],
    ['#contacto', t.navContact]
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'var(--color-bg)',
        borderBottom: '2px solid var(--color-text)',
        animation: 'upIn .5s ease-out both'
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          height: 72
        }}
      >
        <a
          href="#top"
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 900,
            fontSize: 15,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: 'var(--color-text)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            flex: '0 0 auto'
          }}
        >
          <img
            src="/logo-mark.png"
            alt="WebMasterCR"
            style={{
              display: 'block',
              width: 52,
              height: 'auto',
              background: 'var(--color-accent-900)',
              padding: '5px 6px',
              border: '2px solid var(--color-text)'
            }}
          />
          <span>WEB MASTER CR SYSTEMS</span>
        </a>

        <nav style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 28 }}>
          {!narrow && (
            <div style={{ display: 'flex', gap: 24, alignItems: 'center', whiteSpace: 'nowrap' }}>
              {links.map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text)'
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          )}
          {!narrow && (
            <a href="#contacto" className="btn btn-primary" style={{ ...S.btnUpper, fontSize: 12, color: '#fff' }}>
              {t.navCta}
            </a>
          )}
          <div style={{ display: 'flex', border: '2px solid var(--color-text)' }}>
            <button type="button" style={langBtn(lang === 'es')} onClick={() => setLang('es')}>ES</button>
            <button type="button" style={langBtn(lang === 'en')} onClick={() => setLang('en')}>EN</button>
          </div>
          {narrow && (
            <button
              type="button"
              aria-label={menu ? t.close : 'Menu'}
              aria-expanded={menu}
              onClick={() => setMenu((m) => !m)}
              style={{
                position: 'relative',
                zIndex: 65,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                width: 46,
                height: 46,
                padding: 0,
                background: menu ? 'var(--color-text)' : 'none',
                border: '2px solid var(--color-text)',
                cursor: 'pointer',
                transition: 'background .25s ease'
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: 20,
                  height: 2,
                  background: menu ? '#fff' : 'var(--color-text)',
                  transition: 'transform .3s cubic-bezier(.2,.7,.2,1), background .25s ease',
                  transform: menu ? 'translateY(7px) rotate(45deg)' : 'none'
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: 20,
                  height: 2,
                  background: menu ? '#fff' : 'var(--color-text)',
                  transition: 'opacity .2s ease, background .25s ease',
                  opacity: menu ? 0 : 1
                }}
              />
              <span
                style={{
                  display: 'block',
                  width: 20,
                  height: 2,
                  background: menu ? '#fff' : 'var(--color-text)',
                  transition: 'transform .3s cubic-bezier(.2,.7,.2,1), background .25s ease',
                  transform: menu ? 'translateY(-7px) rotate(-45deg)' : 'none'
                }}
              />
            </button>
          )}
        </nav>
      </div>

      {narrow && (
        <div
          onClick={() => setMenu(false)}
          style={{
            position: 'fixed',
            inset: '72px 0 0 0',
            zIndex: 62,
            background: 'rgba(3,28,54,0.5)',
            opacity: menu ? 1 : 0,
            pointerEvents: menu ? 'auto' : 'none',
            transition: 'opacity .25s ease'
          }}
        />
      )}

      {narrow && (
        <div
          id="mobile-menu"
          style={{
            position: 'fixed',
            left: 0,
            right: 0,
            top: 72,
            zIndex: 64,
            background: 'var(--color-bg)',
            borderBottom: '2px solid var(--color-text)',
            boxShadow: 'var(--shadow-lg)',
            maxHeight: menu ? 480 : 0,
            opacity: menu ? 1 : 0,
            overflow: 'hidden',
            transition: 'max-height .35s cubic-bezier(.2,.7,.2,1), opacity .25s ease'
          }}
        >
          {links.map(([href, label], i) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenu(false)}
              style={{
                display: 'block',
                padding: '16px 24px',
                borderBottom: '1px solid var(--color-neutral-300)',
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-text)',
                transition: `opacity .3s ease ${menu ? 60 + i * 50 : 0}ms, transform .3s ease ${menu ? 60 + i * 50 : 0}ms`,
                opacity: menu ? 1 : 0,
                transform: menu ? 'translateY(0)' : 'translateY(-6px)'
              }}
            >
              {label}
            </a>
          ))}
          <div style={{ padding: 18 }}>
            <a
              href="#contacto"
              onClick={() => setMenu(false)}
              className="btn btn-primary btn-block"
              style={{ ...S.btnUpper, justifyContent: 'center', color: '#fff' }}
            >
              {t.navCta}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero({ t }) {
  return (
    <section
      id="top"
      style={{
        position: 'relative',
        borderBottom: '2px solid var(--color-text)',
        background: 'linear-gradient(180deg,var(--color-accent-100) 0%,var(--color-bg) 78%)',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -120,
          right: -80,
          width: 520,
          height: 520,
          background: 'radial-gradient(circle at center,rgba(5,59,112,0.16),transparent 68%)',
          pointerEvents: 'none'
        }}
      />
      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ ...S.grid(300), alignItems: 'stretch' }}>
          <div style={{ containerType: 'inline-size', padding: '64px 0 56px', animation: 'upIn .5s ease-out both' }}>
            <p style={S.kicker}>{t.heroKicker}</p>
            <div style={{ ...S.rule, width: 96, animationDelay: '.15s', marginBottom: 26 }} />
            <h1
              style={{
                margin: 0,
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: 'clamp(38px,12cqw,104px)',
                lineHeight: 0.92,
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                textWrap: 'balance'
              }}
            >
              {t.heroTitleA}
              <br />
              <span style={{ color: 'var(--color-accent)' }}>{t.heroTitleB}</span>
            </h1>
            <p
              style={{
                margin: '28px 0 0',
                maxWidth: '46ch',
                fontSize: 'clamp(16px,1.3vw,19px)',
                color: 'var(--color-neutral-800)',
                textWrap: 'pretty'
              }}
            >
              {t.heroBody}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 36 }}>
              <a href="#problema" className="btn btn-primary" style={{ ...S.btnUpper, color: '#fff' }}>
                {t.heroCta1}
              </a>
              <a href="#soluciones" className="btn btn-secondary" style={S.btnUpper}>
                {t.heroCta2}
              </a>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 32 }}>
              {t.heroChips.map((c) => (
                <span
                  key={c}
                  style={{
                    padding: '7px 12px',
                    background: 'var(--color-bg)',
                    border: '2px solid var(--color-accent-300)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--color-accent-700)'
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          <div
            style={{
              position: 'relative',
              minHeight: 340,
              borderLeft: '2px solid var(--color-text)',
              marginLeft: -2,
              background: 'var(--color-accent-900)'
            }}
          >
            {/* Foto del fundador. Reemplazá /founder.jpg cuando tengas una foto nueva. */}
            <img
              src="/founder.jpg"
              alt={t.heroFounderName}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 22%' }}
            />
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                background: 'var(--color-text)',
                color: '#fff',
                padding: '12px 18px'
              }}
            >
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 13, letterSpacing: '0.03em' }}>{t.heroFounderName}</span>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-accent-300)' }}>{t.heroFounderRole}</span>
            </div>
            <div
              style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: 'var(--color-accent)',
                color: '#fff',
                padding: '12px 18px',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase'
              }}
            >
              <span style={{ display: 'block', width: 8, height: 8, background: '#fff', animation: 'pulse 1.6s ease-in-out infinite' }} />
              {t.heroBadge}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats({ t }) {
  return (
    <section style={{ borderBottom: '2px solid var(--color-text)', background: 'var(--color-accent-900)', color: '#fff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', ...S.grid(200) }}>
        {t.stats.map((st) => (
          <div key={st.label} data-reveal="1" style={{ padding: '32px 24px 32px 0' }}>
            <p style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 44, lineHeight: 1 }}>{st.n}</p>
            <p
              style={{
                margin: '8px 0 0',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-accent-300)'
              }}
            >
              {st.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* Tarjeta que se invierte a azul profundo en hover (problemas, soluciones, proceso). */
function InvertTile({ children, style }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      data-reveal="1"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        ...S.tile,
        ...(hover ? { background: 'var(--color-accent-900)', transform: 'translateY(-4px)' } : null),
        ...style
      }}
    >
      {children(hover ? '#fff' : null)}
    </div>
  );
}

function Problems({ t }) {
  return (
    <section
      id="problema"
      style={{
        borderBottom: '2px solid var(--color-text)',
        background: 'linear-gradient(180deg,var(--color-bg) 0%,var(--color-accent-100) 100%)'
      }}
    >
      <div style={S.wrap}>
        <div data-reveal="1">
          <p style={S.kicker}>01 · {t.s1Kicker}</p>
          <h2 style={{ ...S.h2, maxWidth: '22ch', fontSize: 'clamp(30px,4.2vw,56px)' }}>{t.s1Title}</h2>
        </div>
        <div style={{ ...S.rule, margin: '24px 0 0' }} />
        <div style={{ ...S.grid(260), gap: 2, marginTop: 40, background: 'var(--color-accent-300)' }}>
          {t.problems.map((p) => (
            <InvertTile key={p.n}>
              {(ink) => (
                <>
                  <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 30, lineHeight: 1, color: 'var(--color-accent-400)' }}>{p.n}</p>
                  <h3 style={{ margin: '0 0 10px', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 19, lineHeight: 1.2, color: ink || undefined }}>{p.title}</h3>
                  <p style={{ ...S.body, color: ink || 'var(--color-neutral-800)' }}>{p.body}</p>
                </>
              )}
            </InvertTile>
          ))}
        </div>
      </div>
    </section>
  );
}

function Solutions({ t }) {
  return (
    <section
      id="soluciones"
      style={{
        borderBottom: '2px solid var(--color-text)',
        background: 'linear-gradient(180deg,var(--color-accent-100) 0%,var(--color-bg) 62%)'
      }}
    >
      <div style={S.wrap}>
        <div data-reveal="1">
          <p style={S.kicker}>02 · {t.s2Kicker}</p>
          <h2 style={{ ...S.h2, maxWidth: '24ch', fontSize: 'clamp(30px,4.2vw,56px)', marginBottom: 16 }}>{t.s2Title}</h2>
          <p style={{ margin: 0, maxWidth: '58ch', fontSize: 17, color: 'var(--color-neutral-800)', textWrap: 'pretty' }}>{t.s2Body}</p>
        </div>
        <div style={{ ...S.rule, margin: '24px 0 0' }} />
        <div style={{ ...S.grid(280), gap: 2, marginTop: 40, background: 'var(--color-accent-300)' }}>
          {t.services.map((sv) => (
            <InvertTile key={sv.n} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {(ink) => (
                <>
                  <p style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 30, lineHeight: 1, color: 'var(--color-accent-400)' }}>{sv.n}</p>
                  <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 22, lineHeight: 1.1, textTransform: 'uppercase', color: ink || undefined }}>{sv.title}</h3>
                  <p style={{ ...S.body, color: ink || 'var(--color-neutral-800)' }}>{sv.body}</p>
                  <a
                    href="#contacto"
                    style={{
                      marginTop: 'auto',
                      paddingTop: 14,
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: ink ? 'var(--color-accent-300)' : undefined
                    }}
                  >
                    {t.serviceLink} →
                  </a>
                </>
              )}
            </InvertTile>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits({ t }) {
  return (
    <section id="sobre" style={{ borderBottom: '2px solid var(--color-text)', background: 'var(--color-surface)' }}>
      <div style={{ ...S.wrap, ...S.grid(320), gap: 56 }}>
        <div data-reveal="1">
          <p style={S.kicker}>03 · {t.s3Kicker}</p>
          <h2 style={{ ...S.h2, marginBottom: 16 }}>{t.s3Title}</h2>
          <p style={{ margin: 0, maxWidth: '44ch', fontSize: 17, color: 'var(--color-neutral-800)', textWrap: 'pretty' }}>{t.s3Body}</p>
          <a href="#contacto" className="btn btn-primary" style={{ ...S.btnUpper, marginTop: 28, color: '#fff' }}>
            {t.s3Cta}
          </a>
        </div>
        <div>
          {t.benefits.map((b) => (
            <div key={b.title} data-reveal="1" style={{ display: 'flex', gap: 20, padding: '22px 0', borderTop: '1px solid var(--color-neutral-400)' }}>
              <span style={{ flex: '0 0 auto', width: 10, height: 10, marginTop: 7, background: 'var(--color-accent)' }} />
              <div>
                <h3 style={{ margin: '0 0 6px', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 18 }}>{b.title}</h3>
                <p style={S.body}>{b.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process({ t }) {
  return (
    <section style={{ borderBottom: '2px solid var(--color-text)' }}>
      <div style={S.wrap}>
        <div data-reveal="1">
          <p style={S.kicker}>04 · {t.s4Kicker}</p>
          <h2 style={S.h2}>{t.s4Title}</h2>
        </div>
        <div style={{ ...S.rule, margin: '24px 0 40px' }} />
        <div style={{ ...S.grid(240), gap: 2, background: 'var(--color-accent-300)' }}>
          {t.steps.map((sp) => (
            <InvertTile key={sp.n} style={{ padding: '28px 26px' }}>
              {(ink) => (
                <>
                  <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 44, lineHeight: 1, color: 'var(--color-accent-400)' }}>{sp.n}</p>
                  <h3 style={{ margin: '0 0 8px', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 18, textTransform: 'uppercase', color: ink || undefined }}>{sp.title}</h3>
                  <p style={{ ...S.body, color: ink || 'var(--color-neutral-800)' }}>{sp.body}</p>
                </>
              )}
            </InvertTile>
          ))}
        </div>
      </div>
    </section>
  );
}

function Portfolio({ t, onOpen }) {
  return (
    <section style={{ borderBottom: '2px solid var(--color-text)' }}>
      <div style={S.wrap}>
        <div data-reveal="1">
          <p style={S.kicker}>05 · {t.s5Kicker}</p>
          <h2 style={{ ...S.h2, marginBottom: 12 }}>{t.s5Title}</h2>
          <p style={{ margin: '0 0 40px', fontSize: 15, color: 'var(--color-neutral-700)' }}>{t.s5Note}</p>
        </div>
        <div style={{ ...S.grid(300), gap: 32 }}>
          {t.cases.map((c, i) => (
            <figure key={c.title} data-reveal="1" data-lift="1" style={{ margin: 0, cursor: 'pointer' }} onClick={() => onOpen(i)}>
              <div style={{ aspectRatio: '4 / 3', border: '2px solid var(--color-text)', background: 'var(--color-accent-900)', overflow: 'hidden' }}>
                <img
                  src={c.img}
                  alt={c.label || c.title}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(1)',
                    transition: 'filter .3s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.filter = 'grayscale(0) saturate(1.08) brightness(1.06)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.filter = 'grayscale(1)'; }}
                />
              </div>
              <figcaption
                style={{
                  marginTop: 12,
                  display: 'flex',
                  gap: 12,
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase'
                }}
              >
                <span>{c.label || c.title}</span>
                <button
                  type="button"
                  className="tag-outline"
                  onClick={(e) => { e.stopPropagation(); onOpen(i); }}
                  style={{
                    flex: '0 0 auto',
                    minHeight: 44,
                    background: 'none',
                    border: '2px solid var(--color-accent)',
                    color: 'var(--color-accent-700)',
                    padding: '6px 12px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: 11,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase'
                  }}
                >
                  {t.viewCase} →
                </button>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseModal({ t, index, onClose }) {
  const [activeImg, setActiveImg] = useState(null);
  useEffect(() => { setActiveImg(null); }, [index]);
  if (index < 0) return null;
  const c = t.cases[index];
  const gallery = c.gallery?.length ? c.gallery : [c.img];
  const shownImg = activeImg || gallery[0];
  return (
    <div
      onClick={onClose}
      data-case-modal="1"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(3,28,54,0.74)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '32px 20px',
        overflowY: 'auto',
        animation: 'upIn .22s ease-out both'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ width: '100%', maxWidth: 1040, background: 'var(--color-bg)', border: '2px solid var(--color-text)', boxShadow: 'var(--shadow-lg)' }}
      >
        <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', justifyContent: 'space-between', padding: '22px 26px', borderBottom: '2px solid var(--color-text)' }}>
          <div>
            <p style={{ ...S.kicker, marginBottom: 8 }}>{c.kicker}</p>
            <h3 style={{ ...S.h2, fontSize: 'clamp(22px,3vw,36px)', textTransform: 'uppercase' }}>{c.title}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.close}
            style={{
              flex: '0 0 auto',
              minHeight: 44,
              background: 'none',
              border: '2px solid var(--color-text)',
              padding: '8px 14px',
              cursor: 'pointer',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: 14,
              transition: 'background .2s ease, color .2s ease, transform .2s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-text)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'rotate(90deg)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--color-text)'; e.currentTarget.style.transform = 'none'; }}
          >
            ✕
          </button>
        </div>

        <div style={S.grid(320)}>
          <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--color-surface)' }}>
            <div style={{ position: 'relative', aspectRatio: '16 / 10', background: 'var(--color-accent-900)', overflow: 'hidden' }}>
              <img
                key={shownImg}
                src={shownImg}
                alt={c.title}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', animation: 'upIn .3s ease-out both' }}
              />
              {gallery.length > 1 && (
                <span
                  style={{
                    position: 'absolute',
                    right: 10,
                    bottom: 10,
                    background: 'rgba(3,28,54,0.78)',
                    color: '#fff',
                    padding: '4px 10px',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: '0.08em'
                  }}
                >
                  {gallery.indexOf(shownImg) + 1} / {gallery.length}
                </span>
              )}
            </div>
            {gallery.length > 1 && (
              <div style={{ display: 'flex', gap: 6, padding: 8 }}>
                {gallery.map((src, gi) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveImg(src)}
                    aria-label={`${c.title} ${gi + 1}`}
                    aria-current={src === shownImg}
                    style={{
                      position: 'relative',
                      flex: '1 1 0',
                      aspectRatio: '16 / 10',
                      padding: 0,
                      border: 0,
                      cursor: 'pointer',
                      overflow: 'hidden',
                      background: 'var(--color-accent-900)',
                      opacity: src === shownImg ? 1 : 0.5,
                      outline: src === shownImg ? '2px solid var(--color-accent)' : '2px solid transparent',
                      outlineOffset: -2,
                      transition: 'opacity .2s ease, outline-color .2s ease, transform .2s ease'
                    }}
                    onMouseEnter={(e) => { if (src !== shownImg) e.currentTarget.style.opacity = 0.8; }}
                    onMouseLeave={(e) => { if (src !== shownImg) e.currentTarget.style.opacity = 0.5; }}
                  >
                    <img
                      src={src}
                      alt=""
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div data-case-panel="1" style={{ padding: '28px 26px', borderLeft: '2px solid var(--color-text)', marginLeft: -2 }}>
            <p style={{ margin: '0 0 26px', fontSize: 16, color: 'var(--color-neutral-800)', textWrap: 'pretty' }}>{c.body}</p>

            {!!c.features?.length && (
              <div style={{ margin: '0 0 26px' }}>
                <p style={{ margin: '0 0 14px', fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-neutral-700)' }}>{t.caseFeatures}</p>
                <div style={{ display: 'grid', gap: 2, background: 'var(--color-accent-300)', borderTop: '4px solid var(--color-accent)' }}>
                  {c.features.map((f) => (
                    <p key={f} style={{ margin: 0, background: 'var(--color-bg)', padding: '11px 14px', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 15 }}>{f}</p>
                  ))}
                </div>
              </div>
            )}

            <p style={{ margin: '0 0 14px', fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-neutral-700)' }}>{t.caseSolves}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, borderTop: '1px solid var(--color-neutral-400)', paddingTop: 18 }}>
              {c.solves.map((sv) => (
                <div key={sv.p} style={{ display: 'flex', gap: 14 }}>
                  <span style={{ flex: '0 0 auto', width: 9, height: 9, marginTop: 7, background: 'var(--color-accent)' }} />
                  <div>
                    <p style={{ margin: '0 0 4px', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 16 }}>{sv.p}</p>
                    <p style={{ ...S.body, fontSize: 14 }}>{sv.r}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 26 }}>
              {c.stack.map((tg) => (
                <span key={tg} className="tag tag-outline">{tg}</span>
              ))}
            </div>

            <a
              href={waLink('Hola, vi un proyecto en su sitio y quiero algo similar')}
              target="_blank"
              rel="noopener"
              className="btn btn-primary"
              style={{ ...S.btnUpper, marginTop: 26, color: '#fff' }}
            >
              {t.caseCta}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Testimonials({ t }) {
  return (
    <section style={{ borderBottom: '2px solid var(--color-text)' }}>
      <div style={S.wrap}>
        <div data-reveal="1">
          <p style={S.kicker}>06 · {t.s7Kicker}</p>
          <h2 style={{ ...S.h2, marginBottom: 40 }}>{t.s7Title}</h2>
        </div>
        <div style={{ ...S.grid(280), gap: 2, background: 'var(--color-text)' }}>
          {t.quotes.map((q) => (
            <blockquote key={q.who} data-reveal="1" data-lift="1" style={{ margin: 0, background: 'var(--color-bg)', padding: '32px 28px' }}>
              <p style={{ margin: '0 0 20px', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 19, lineHeight: 1.35, textWrap: 'pretty' }}>“{q.text}”</p>
              <footer style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-neutral-700)' }}>{q.who}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq({ t }) {
  const [open, setOpen] = useState(0);
  return (
    <section style={{ borderBottom: '2px solid var(--color-text)' }}>
      <div style={{ ...S.wrap, ...S.grid(300), gap: 48 }}>
        <div data-reveal="1">
          <p style={S.kicker}>07 · {t.s8Kicker}</p>
          <h2 style={S.h2}>{t.s8Title}</h2>
        </div>
        <div style={{ borderTop: '2px solid var(--color-text)' }}>
          {t.faqs.map((f, i) => (
            <div key={f.q} data-reveal="1" style={{ borderBottom: '1px solid var(--color-neutral-400)' }}>
              <button
                type="button"
                onClick={() => setOpen(open === i ? -1 : i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  gap: 16,
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  background: 'none',
                  border: 0,
                  padding: '20px 0',
                  minHeight: 44,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  fontSize: 17,
                  color: 'var(--color-text)'
                }}
              >
                <span>{f.q}</span>
                <span
                  style={{
                    display: 'inline-block',
                    color: 'var(--color-accent)',
                    fontSize: 20,
                    flex: '0 0 auto',
                    transition: 'transform .3s cubic-bezier(.2,.7,.2,1)',
                    transform: open === i ? 'rotate(135deg)' : 'rotate(0deg)'
                  }}
                >
                  +
                </span>
              </button>
              <div
                style={{
                  overflow: 'hidden',
                  transition: 'max-height .25s ease, opacity .25s ease',
                  maxHeight: open === i ? 260 : 0,
                  opacity: open === i ? 1 : 0
                }}
              >
                <p style={{ ...S.body, padding: '0 0 22px', maxWidth: '60ch' }}>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Carga el embed inline de Cal.com y monta el calendario de reservas de 30 min. */
function useCalEmbed() {
  useEffect(() => {
    (function (C, A, L) {
      const p = (a, ar) => a.q.push(ar);
      const d = C.document;
      C.Cal = C.Cal || function (...ar) {
        const cal = C.Cal;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement('script')).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = (...apiAr) => p(api, apiAr);
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === 'string') {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ['initNamespace', namespace]);
          } else {
            p(cal, ar);
          }
          return;
        }
        p(cal, ar);
      };
    })(window, 'https://app.cal.com/embed/embed.js', 'init');

    window.Cal('init', '30min', { origin: 'https://app.cal.com' });
    window.Cal.config = window.Cal.config || {};
    window.Cal.config.forwardQueryParams = true;

    window.Cal.ns['30min']('inline', {
      elementOrSelector: '#my-cal-inline-30min',
      config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
      calLink: 'jared-arce-hernandez-odlyub/30min'
    });

    window.Cal.ns['30min']('ui', { hideEventTypeDetails: false, layout: 'month_view' });
  }, []);
}

function Booking({ t }) {
  useCalEmbed();
  return (
    <section id="agendar" style={{ borderBottom: '2px solid var(--color-text)', background: 'var(--color-surface)' }}>
      <div style={S.wrap}>
        <div data-reveal="1">
          <p style={S.kicker}>08 · {t.bookKicker}</p>
          <h2 style={{ ...S.h2, marginBottom: 16 }}>{t.bookTitle}</h2>
          <p style={{ margin: 0, maxWidth: '58ch', fontSize: 17, color: 'var(--color-neutral-800)', textWrap: 'pretty' }}>{t.bookBody}</p>
        </div>
        <div style={{ ...S.rule, margin: '24px 0 32px' }} />
        <div
          id="my-cal-inline-30min"
          style={{
            width: '100%',
            minHeight: 700,
            border: '2px solid var(--color-text)',
            background: 'var(--color-bg)',
            boxShadow: 'var(--shadow-md)',
            overflow: 'auto'
          }}
        />
      </div>
    </section>
  );
}

function Contact({ t, lang }) {
  const formRef = useRef(null);

  const submit = (e) => {
    e.preventDefault();
    const f = new FormData(formRef.current);
    const g = (k) => f.get(k) || '—';
    const es = lang === 'es';
    const msg =
      `${es ? 'Hola, soy ' : "Hi, I'm "}${g('name')}\n` +
      `${es ? 'Negocio: ' : 'Business: '}${g('biz')}\n` +
      `${es ? 'Contacto: ' : 'Contact: '}${g('contact')}\n` +
      `${es ? 'Sistema: ' : 'System: '}${g('system')}\n` +
      `${es ? 'Necesito: ' : 'I need: '}${g('need')}`;
    window.open(waLink(msg), '_blank', 'noopener');
  };

  const card = {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: 16,
    background: 'var(--color-bg)',
    padding: '20px 22px'
  };
  const cardLabel = { display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-neutral-700)' };
  const cardValue = { display: 'block', marginTop: 6, fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 19, color: 'var(--color-text)' };

  return (
    <section
      id="contacto"
      style={{
        position: 'relative',
        borderBottom: '2px solid var(--color-text)',
        background: 'linear-gradient(180deg,var(--color-accent-100) 0%,var(--color-surface) 70%)',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -140,
          left: -100,
          width: 460,
          height: 460,
          background: 'radial-gradient(circle at center,rgba(5,59,112,0.14),transparent 68%)',
          pointerEvents: 'none'
        }}
      />
      <div style={{ position: 'relative', ...S.wrap, ...S.grid(320), gap: 48 }}>
        <div data-reveal="1">
          <p style={S.kicker}>09 · {t.s9Kicker}</p>
          <h2 style={S.h2}>{t.s9Title}</h2>
          <div style={{ ...S.rule, margin: '24px 0' }} />
          <p style={{ margin: '0 0 32px', maxWidth: '42ch', fontSize: 17, color: 'var(--color-neutral-800)', textWrap: 'pretty' }}>{t.s9Body}</p>

          <div style={{ display: 'grid', gap: 2, background: 'var(--color-accent-300)', borderTop: '4px solid var(--color-accent)' }}>
            <a href={waLink()} target="_blank" rel="noopener" data-contact-card="1" style={card}>
              <span>
                <span style={cardLabel}>WhatsApp</span>
                <span style={cardValue}>+506 8500 2402</span>
              </span>
              <span style={{ flex: '0 0 auto', color: 'var(--color-accent)', fontWeight: 800 }}>→</span>
            </a>
            <a href="mailto:arcehernandezjared1@gmail.com" data-contact-card="1" style={card}>
              <span style={{ minWidth: 0 }}>
                <span style={cardLabel}>{t.fEmailLabel}</span>
                <span style={{ ...cardValue, fontSize: 16, wordBreak: 'break-all' }}>arcehernandezjared1@gmail.com</span>
              </span>
              <span style={{ flex: '0 0 auto', color: 'var(--color-accent)', fontWeight: 800 }}>→</span>
            </a>
            <div style={{ background: 'var(--color-bg)', padding: '20px 22px' }}>
              <span style={cardLabel}>{t.s9HoursLabel}</span>
              <span style={{ ...cardValue, fontSize: 16 }}>{t.s9Hours}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 22, fontSize: 12, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent-700)' }}>
            <span style={{ display: 'block', width: 8, height: 8, background: 'var(--color-accent)', animation: 'pulse 1.6s ease-in-out infinite' }} />
            {t.fReply}
          </div>
        </div>

        <form ref={formRef} onSubmit={submit} style={{ alignSelf: 'start', background: 'var(--color-bg)', border: '2px solid var(--color-text)', boxShadow: 'var(--shadow-md)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, background: 'var(--color-accent-900)', color: '#fff', padding: '20px 26px' }}>
            <p style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 18, textTransform: 'uppercase' }}>{t.fTitle}</p>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-accent-300)' }}>{t.fStep}</p>
          </div>

          <div style={{ padding: 26, display: 'grid', gap: 18 }}>
            <div style={{ ...S.grid(180), gap: 18 }}>
              <div className="field">
                <label htmlFor="name">{t.fName} <span style={{ color: 'var(--color-accent)' }}>*</span></label>
                <input className="input" id="name" name="name" type="text" required placeholder={t.fNamePh} />
              </div>
              <div className="field">
                <label htmlFor="biz">{t.fBiz}</label>
                <input className="input" id="biz" name="biz" type="text" placeholder={t.fBizPh} />
              </div>
            </div>

            <div className="field">
              <label htmlFor="contact">{t.fContact} <span style={{ color: 'var(--color-accent)' }}>*</span></label>
              <input className="input" id="contact" name="contact" type="text" required placeholder={t.fContactPh} />
            </div>

            <div className="field">
              <label>{t.fSystem}</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 22px', marginTop: 4 }}>
                {t.systemOptions.map((op, i) => (
                  <label key={op} className="radio">
                    <input type="radio" name="system" value={op} defaultChecked={i === 0} />
                    <span className="dot" />
                    {op}
                  </label>
                ))}
              </div>
            </div>

            <div className="field">
              <label htmlFor="need">{t.fNeed} <span style={{ color: 'var(--color-accent)' }}>*</span></label>
              <textarea className="input" id="need" name="need" rows="4" required placeholder={t.fNeedPh} />
            </div>

            <div className="hr" style={{ margin: '2px 0 0' }} />
            <button type="submit" className="btn btn-primary btn-block" style={{ ...S.btnUpper, color: '#fff' }}>{t.fSubmit}</button>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--color-neutral-700)', textWrap: 'pretty' }}>{t.fNote}</p>
          </div>
        </form>
      </div>
    </section>
  );
}

function CtaBanner({ t }) {
  return (
    <section style={{ background: 'var(--color-accent)', color: '#fff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px 24px', display: 'flex', flexWrap: 'wrap', gap: 32, alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div data-reveal="1">
          <p style={{ margin: '0 0 16px', fontSize: 12, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-accent-200)' }}>{t.ctaKicker}</p>
          <h2 style={{ margin: 0, maxWidth: '20ch', fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(34px,5.4vw,72px)', lineHeight: 0.95, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>{t.ctaTitle}</h2>
        </div>
        <a
          href={waLink('Hola, quiero automatizar mi negocio')}
          target="_blank"
          rel="noopener"
          data-reveal="1"
          data-lift="1"
          style={{ flex: '0 0 auto', background: '#fff', color: 'var(--color-text)', padding: '18px 28px', borderRadius: 6, fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 14, letterSpacing: '0.12em', textTransform: 'uppercase', border: '2px solid #fff' }}
        >
          {t.ctaBtn}
        </a>
      </div>
    </section>
  );
}

function Footer({ t }) {
  const link = { fontSize: 14, color: 'var(--color-neutral-200)', transition: 'color .2s ease' };
  const head = { margin: '0 0 14px', fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-neutral-500)' };
  return (
    <footer style={{ background: 'var(--color-text)', color: 'var(--color-neutral-200)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 24px 28px', ...S.grid(220), gap: 40 }}>
        <div data-reveal="1">
          <img src="/logo-lockup.png" alt="WebMasterCR" style={{ display: 'block', width: 220, height: 'auto', marginBottom: 18 }} />
          <p style={{ margin: '0 0 10px', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 15, color: 'var(--color-accent-300)' }}>
            Tecnología que simplifica trabajo y reduce costos.
          </p>
          <p style={{ margin: 0, maxWidth: '34ch', fontSize: 14, color: 'var(--color-neutral-400)' }}>{t.footBlurb}</p>
        </div>
        <div data-reveal="1">
          <p style={head}>{t.footNav}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a href="#sobre" style={link}>{t.navAbout}</a>
            <a href="#soluciones" style={link}>{t.navSolutions}</a>
            <a href="#contacto" style={link}>{t.navContact}</a>
          </div>
        </div>
        <div data-reveal="1">
          <p style={head}>{t.footContact}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a href={waLink()} target="_blank" rel="noopener" style={link}>+506 8500 2402</a>
            <a href="mailto:arcehernandezjared1@gmail.com" style={link}>arcehernandezjared1@gmail.com</a>
            <p style={{ margin: 0, fontSize: 14, color: 'var(--color-neutral-400)' }}>Costa Rica</p>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 24px 40px', borderTop: '1px solid var(--color-neutral-800)', display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between' }}>
        <p style={{ margin: 0, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-neutral-500)' }}>© 2026 Web Master CR Systems</p>
        <p style={{ margin: 0, fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-neutral-500)' }}>{t.footRights}</p>
      </div>
    </footer>
  );
}

export default function App() {
  const [lang, setLang] = useState('es');
  const [work, setWork] = useState(-1);
  const t = COPY[lang];
  useReveal();

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <div style={{ width: '100%', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>
      <Navbar t={t} lang={lang} setLang={setLang} />
      <Hero t={t} />
      <Stats t={t} />
      <Problems t={t} />
      <Solutions t={t} />
      <Benefits t={t} />
      <Process t={t} />
      <Portfolio t={t} onOpen={setWork} />
      <CaseModal t={t} index={work} onClose={() => setWork(-1)} />
      <Testimonials t={t} />
      <Faq t={t} />
      <Booking t={t} />
      <Contact t={t} lang={lang} />
      <CtaBanner t={t} />
      <Footer t={t} />

      <a
        href={waLink('Hola, quiero automatizar mi negocio')}
        target="_blank"
        rel="noopener"
        aria-label="WhatsApp"
        style={{
          position: 'fixed',
          right: 20,
          bottom: 20,
          zIndex: 60,
          background: 'var(--color-accent)',
          color: '#fff',
          padding: '14px 18px',
          borderRadius: 6,
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: 12,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        WhatsApp
      </a>
    </div>
  );
}
