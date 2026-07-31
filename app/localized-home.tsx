"use client";

import Image from "next/image";
import { Fragment, useEffect, useState } from "react";
import { CapswitchDemo } from "./capswitch-demo";
import { GoogleAnalytics } from "./google-analytics";
import { languages, resolveLocale, translations, type Locale } from "./i18n";

const localeStorageKey = "capswitch-site-language";
const checkoutUrl = "https://buy.polar.sh/polar_cl_UScYXNp1h6aIsYMRZ9aBBZagKU1JAxn0gSxpo3n24fE";

function ModeTransition({
  mode,
  stateFlow,
  backToStart,
}: {
  mode: (typeof translations.ja.modes)[number];
  stateFlow: string;
  backToStart: string;
}) {
  const accessibleFlow = mode.states
    .map((state, index) => index === 0 ? state : `${mode.actions[index - 1]}: ${state}`)
    .join(", ") + (mode.loop ? `, ${backToStart}` : "");

  return (
    <div className="mode-transition" role="img" aria-label={`${stateFlow}: ${accessibleFlow}`}>
      <div className="transition-track" aria-hidden="true">
        {mode.states.map((state, index) => (
          <div className="transition-part" key={`${mode.name}-${state}`}>
            {index > 0 && (
              <span className="transition-action">
                <small>{mode.actions[index - 1]}</small>
                <i>→</i>
              </span>
            )}
            <span className="transition-state">{state}</span>
          </div>
        ))}
        {mode.loop && (
          <span className="transition-return">
            {mode.actions[mode.actions.length - 1]} → {backToStart}
          </span>
        )}
      </div>
      {mode.note && <span className="transition-note">{mode.note}</span>}
    </div>
  );
}

export function LocalizedHome({
  publicBasePath,
}: {
  publicBasePath: string;
}) {
  const [locale, setLocale] = useState<Locale>("ja");
  const copy = translations[locale];

  useEffect(() => {
    const saved = window.localStorage.getItem(localeStorageKey);
    const deviceLanguages = window.navigator.languages.length > 0
      ? window.navigator.languages
      : [window.navigator.language];
    const detected = resolveLocale(saved ? [saved, ...deviceLanguages] : deviceLanguages);
    const timer = window.setTimeout(() => setLocale(detected), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    const timer = window.setTimeout(() => {
      document.title = `Capswitch — ${copy.hero.join(" ")}`;
    }, 50);
    return () => window.clearTimeout(timer);
  }, [copy.hero, locale]);

  function changeLocale(nextLocale: Locale) {
    setLocale(nextLocale);
    window.localStorage.setItem(localeStorageKey, nextLocale);
  }

  return (
    <main>
      <header className="site-nav">
        <a className="wordmark" href="#top" aria-label="Capswitch">
          <span
            className="wordmark-icon"
            style={{ backgroundImage: `url("${publicBasePath}/favicon.png")` }}
            aria-hidden="true"
          />
          Capswitch<span className="wordmark-dot" aria-hidden="true" />
        </a>
        <div className="nav-actions">
          <label className="language-picker">
            <span className="sr-only">{copy.language}</span>
            <span className="language-symbol" aria-hidden="true">文</span>
            <span className="language-current" aria-hidden="true">
              {languages.find((language) => language.code === locale)?.label}
            </span>
            <select
              value={locale}
              onChange={(event) => changeLocale(event.target.value as Locale)}
              aria-label={copy.language}
            >
              {languages.map((language) => (
                <option value={language.code} key={language.code}>{language.label}</option>
              ))}
            </select>
          </label>
          <a className="nav-download" href="https://github.com/mumei/capswitch-releases/releases/latest">
            {copy.download}
          </a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy reveal" style={{ "--i": 0 } as React.CSSProperties}>
          <h1>
            <span className="hero-title-line">{copy.hero[0]}</span>
            <span className="hero-title-line">{copy.hero[1]}</span>
          </h1>
          <p className="hero-lede">{copy.heroLead}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="https://github.com/mumei/capswitch-releases/releases/latest">
              {copy.trial}
            </a>
            <a className="text-link" href="https://github.com/mumei/capswitch-core">
              {copy.viewCore} <span aria-hidden="true">↗</span>
            </a>
          </div>
          <p className="requirements">{copy.requirements}</p>
        </div>
        <CapswitchDemo copy={copy.demo} />
      </section>

      <section className="guided-tour" aria-labelledby="tour-title">
        <div className="section-intro">
          <p className="kicker">{copy.tour.kicker}</p>
          <h2 id="tour-title">{copy.tour.title}</h2>
        </div>
        <div className="tour-story">
          <article className="tour-chapter tour-chapter-settings">
            <div className="tour-step">
              <span className="step-index">01</span>
              <div>
                <h3>{copy.tour.steps[0]}</h3>
                <p>{copy.tour.descriptions[0]}</p>
              </div>
            </div>
            <figure className="tour-screenshot">
              <Image
                src={`${publicBasePath}/screenshots/${locale}/capswitch-settings.png`}
                width="1936"
                height="1360"
                loading="lazy"
                alt={copy.tour.settingsAlt}
              />
            </figure>
          </article>

          <article className="tour-action">
            <div className="tour-step">
              <span className="step-index">02</span>
              <div>
                <h3>{copy.tour.steps[1]}</h3>
                <p>{copy.tour.descriptions[1]}</p>
              </div>
            </div>
            <div className="action-flow" aria-label={copy.tour.steps[1]}>
              <strong>{copy.tour.flow[0]}</strong><span aria-hidden="true">→</span>
              <strong>{copy.tour.flow[1]}</strong><span aria-hidden="true">→</span>
              <strong>{copy.tour.flow[2]}</strong>
            </div>
          </article>

          <article className="tour-chapter tour-chapter-menu">
            <div className="tour-step">
              <span className="step-index">03</span>
              <div>
                <h3>{copy.tour.steps[2]}</h3>
                <p>{copy.tour.descriptions[2]}</p>
              </div>
            </div>
            <figure className="tour-screenshot">
              <Image
                src={`${publicBasePath}/screenshots/${locale}/capswitch-menu.png`}
                width="680"
                height="370"
                loading="lazy"
                alt={copy.tour.menuAlt}
              />
            </figure>
          </article>
        </div>
      </section>

      <section className="caps-lock-section" aria-labelledby="caps-lock-title">
        <div className="section-intro">
          <p className="kicker">{copy.keep.kicker}</p>
          <h2 id="caps-lock-title">{copy.keep.title}</h2>
          <p>{copy.keep.description}</p>
        </div>
        <div className="caps-lock-flow" aria-label={copy.keep.aria}>
          {copy.keep.values.map((value, index) => (
            <Fragment key={copy.keep.labels[index]}>
              {index > 0 && <i aria-hidden="true">→</i>}
              <div>
                <span>{copy.keep.labels[index]}</span>
                <strong>{value}</strong>
              </div>
            </Fragment>
          ))}
        </div>
      </section>

      <section className="modes-section" id="modes" aria-labelledby="modes-title">
        <div className="modes-inner">
          <div className="section-intro">
            <p className="kicker">{copy.modesKicker}</p>
            <h2 id="modes-title">{copy.modesTitle}</h2>
          </div>
          <div className="mode-list" role="list">
            {copy.modes.map((mode, index) => (
              <article className="mode-row" role="listitem" key={mode.name}>
                <span className="mode-number">{String(index + 1).padStart(2, "0")}</span>
                <div className="mode-summary">
                  <div className="mode-heading">
                    <h3>{mode.name}</h3>
                    <span className="mode-type">{mode.type}</span>
                  </div>
                  <p>{mode.description}</p>
                </div>
                <ModeTransition mode={mode} stateFlow={copy.stateFlow} backToStart={copy.backToStart} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="led-section" id="display" aria-labelledby="led-title">
        <div className="led-copy">
          <p className="kicker">{copy.led.kicker}</p>
          <h2 id="led-title">{copy.led.title}</h2>
          <p>{copy.led.description}</p>
        </div>
        <div className="led-table" role="table" aria-label={copy.led.aria}>
          <div className="led-header" role="row">
            {copy.led.columns.map((column) => <span role="columnheader" key={column}>{column}</span>)}
          </div>
          {copy.led.rows.map(([state, pattern, examples]) => (
            <div className="led-row" role="row" key={state}>
              <span className="led-state" role="cell"><small>{copy.led.columns[0]}</small>{state}</span>
              <strong className="led-pattern" role="cell"><small>{copy.led.columns[1]}</small>{pattern}</strong>
              <span className="led-examples" role="cell"><small>{copy.led.columns[2]}</small>{examples}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="price-section" id="download" aria-labelledby="price-title">
        <div><p className="kicker">{copy.price.kicker}</p><h2 id="price-title">{copy.price.title}</h2></div>
        <div className="price-copy">
          <p>{copy.price.description}</p>
          <div className="price-actions">
            <a className="button button-primary" href="https://github.com/mumei/capswitch-releases/releases/latest">{copy.price.button}</a>
            <a className="button" href={checkoutUrl}>{copy.price.purchase}</a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <span>© 2026 Capswitch</span>
        <a href="https://github.com/mumei/capswitch-core">Apache-2.0 Core ↗</a>
      </footer>
      <GoogleAnalytics {...copy.analytics} />
    </main>
  );
}
