"use client";

import { useEffect } from "react";
import Image from "next/image";
import { GoogleAnalytics } from "./google-analytics";
import { languages, translations, type Locale } from "./i18n";
import { manualTranslations } from "./manual-i18n";

const localeStorageKey = "capswitch-site-language";
const downloadUrl = "https://github.com/mumei/capswitch-releases/releases/latest";
const issuesUrl = "https://github.com/mumei/capswitch-releases/issues/new/choose";

const sectionIds = [
  "quick-start",
  "install",
  "permission",
  "basics",
  "modes",
  "display",
  "license",
  "troubleshooting",
  "support",
] as const;

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="manual-numbered-list">
      {items.map((item, index) => (
        <li key={item}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <p>{item}</p>
        </li>
      ))}
    </ol>
  );
}

export function ManualPage({
  publicBasePath,
  initialLocale,
}: {
  publicBasePath: string;
  initialLocale: Locale;
}) {
  const locale = initialLocale;
  const copy = manualTranslations[locale];
  const siteCopy = translations[locale];
  const sectionLabels = Object.values(copy.sectionTitles);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  function changeLocale(nextLocale: Locale) {
    window.localStorage.setItem(localeStorageKey, nextLocale);
    window.location.assign(`${publicBasePath}/${nextLocale}/manual/`);
  }

  return (
    <main className="manual-page">
      <header className="site-nav manual-site-nav">
        <a className="wordmark" href={`${publicBasePath}/${locale}/`} aria-label="Capswitch">
          <span
            className="wordmark-icon"
            style={{ backgroundImage: `url("${publicBasePath}/favicon.png")` }}
            aria-hidden="true"
          />
          Capswitch<span className="wordmark-dot" aria-hidden="true" />
        </a>
        <div className="nav-actions">
          <a className="nav-manual is-current" href="#manual-top" aria-current="page">{copy.navLabel}</a>
          <label className="language-picker">
            <span className="sr-only">{siteCopy.language}</span>
            <span className="language-symbol" aria-hidden="true">文</span>
            <span className="language-current" aria-hidden="true">
              {languages.find((language) => language.code === locale)?.label}
            </span>
            <select
              value={locale}
              onChange={(event) => changeLocale(event.target.value as Locale)}
              aria-label={siteCopy.language}
            >
              {languages.map((language) => (
                <option value={language.code} key={language.code}>{language.label}</option>
              ))}
            </select>
          </label>
          <a className="nav-download" href={downloadUrl}>{siteCopy.download}</a>
        </div>
      </header>

      <header className="manual-hero" id="manual-top">
        <nav className="manual-breadcrumb" aria-label="Breadcrumb">
          <a href={`${publicBasePath}/${locale}/`}>{copy.homeLabel}</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{copy.navLabel}</span>
        </nav>
        <p className="kicker">{copy.kicker}</p>
        <h1>{copy.title}</h1>
        <p className="manual-lede">{copy.lead}</p>
        <div className="manual-meta" aria-label={`${copy.version}, ${copy.updated}`}>
          <span>{copy.version}</span>
          <span>{copy.updated}</span>
        </div>
        <div className="manual-hero-actions">
          <a className="button mobile-manual-download" href={downloadUrl}>{siteCopy.download}</a>
          <a className="button button-primary" href="#quick-start">{copy.startLink}</a>
          <a className="button" href="#troubleshooting">{copy.troubleLink}</a>
        </div>
      </header>

      <div className="manual-shell">
        <aside className="manual-toc" aria-labelledby="manual-contents-title">
          <details open>
            <summary id="manual-contents-title">{copy.contents}</summary>
            <ol>
              {sectionIds.map((id, index) => (
                <li key={id}>
                  <a href={`#${id}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {sectionLabels[index]}
                  </a>
                </li>
              ))}
            </ol>
          </details>
        </aside>

        <article className="manual-content">
          <section className="manual-section" id="quick-start" aria-labelledby="quick-start-title">
            <header className="manual-section-head">
              <span>01</span>
              <div><h2 id="quick-start-title">{copy.sectionTitles.quick}</h2><p>{copy.quickLead}</p></div>
            </header>
            <ol className="quick-step-grid">
              {copy.quickSteps.map((step, index) => (
                <li key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.detail}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="manual-section" id="install" aria-labelledby="install-title">
            <header className="manual-section-head">
              <span>02</span>
              <div><h2 id="install-title">{copy.sectionTitles.install}</h2><p>{copy.installLead}</p></div>
            </header>
            <div className="manual-two-column">
              <div>
                <NumberedList items={copy.installSteps} />
                <p className="manual-note">{copy.installNote}</p>
              </div>
              <figure className="manual-figure manual-figure-menu">
                <Image
                  src={`${publicBasePath}/screenshots/${locale}/capswitch-menu.png`}
                  width="680"
                  height="370"
                  alt={copy.menuAlt}
                  unoptimized
                />
                <figcaption>{copy.installSteps[3]}</figcaption>
              </figure>
            </div>
          </section>

          <section className="manual-section" id="permission" aria-labelledby="permission-title">
            <header className="manual-section-head">
              <span>03</span>
              <div><h2 id="permission-title">{copy.sectionTitles.permission}</h2><p>{copy.permissionLead}</p></div>
            </header>
            <div className="permission-callout">
              <span>{copy.permissionRequired}</span>
              <strong>{copy.permissionDetail}</strong>
              <p>{copy.systemPath}</p>
            </div>
            <NumberedList items={copy.permissionSteps} />
            <div className="mode-specific-setup">
              <h3>{copy.modeSpecificTitle}</h3>
              <ul>{copy.modeSpecific.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </section>

          <section className="manual-section" id="basics" aria-labelledby="basics-title">
            <header className="manual-section-head">
              <span>04</span>
              <div><h2 id="basics-title">{copy.sectionTitles.basics}</h2><p>{copy.basicsLead}</p></div>
            </header>
            <div className="basic-control-grid">
              {copy.basicCards.map((card) => (
                <article key={card.label}>
                  <span>{card.label}</span>
                  <h3>{card.title}</h3>
                  <p>{card.detail}</p>
                </article>
              ))}
            </div>
            <div className="manual-key-flow" role="img" aria-label={copy.basicsLead}>
              <div className="origin-key" aria-hidden="true"><i /><strong>caps lock</strong></div>
              <span aria-hidden="true">→</span>
              <div className="manual-state-pair" aria-hidden="true">
                <strong>A</strong><i>⇄</i><strong>B</strong>
              </div>
              <span aria-hidden="true">→</span>
              <div className="manual-led-demo" aria-hidden="true"><i /><i className="is-on" /></div>
            </div>
          </section>

          <section className="manual-section" id="modes" aria-labelledby="manual-modes-title">
            <header className="manual-section-head">
              <span>05</span>
              <div><h2 id="manual-modes-title">{copy.sectionTitles.modes}</h2><p>{copy.modesLead}</p></div>
            </header>
            <figure className="manual-figure manual-figure-settings">
              <Image
                src={`${publicBasePath}/screenshots/${locale}/capswitch-settings.png`}
                width="1936"
                height="1360"
                alt={copy.settingsAlt}
                unoptimized
              />
              <figcaption>{copy.modesHint}</figcaption>
            </figure>
            <div className="manual-mode-list">
              {siteCopy.modes.map((mode, index) => (
                <details key={mode.name} open={index === 0}>
                  <summary>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{mode.name}</strong>
                    <small>{mode.type}</small>
                  </summary>
                  <div className="manual-mode-detail">
                    <p>{mode.description}</p>
                    <dl>
                      <div><dt>{copy.modeOperation}</dt><dd>{mode.actions.join(" / ")}</dd></div>
                      <div><dt>{copy.modeStates}</dt><dd>{mode.states.join(" → ")}</dd></div>
                    </dl>
                    {mode.note && <p className="manual-mode-note">{mode.note}</p>}
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section className="manual-section" id="display" aria-labelledby="manual-display-title">
            <header className="manual-section-head">
              <span>06</span>
              <div><h2 id="manual-display-title">{copy.sectionTitles.display}</h2><p>{copy.displayLead}</p></div>
            </header>
            <ul className="manual-check-list">
              {copy.displayItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </section>

          <section className="manual-section" id="license" aria-labelledby="manual-license-title">
            <header className="manual-section-head">
              <span>07</span>
              <div><h2 id="manual-license-title">{copy.sectionTitles.license}</h2><p>{copy.licenseLead}</p></div>
            </header>
            <NumberedList items={copy.licenseItems} />
          </section>

          <section className="manual-section" id="troubleshooting" aria-labelledby="trouble-title">
            <header className="manual-section-head">
              <span>08</span>
              <div><h2 id="trouble-title">{copy.sectionTitles.trouble}</h2><p>{copy.troubleLead}</p></div>
            </header>
            <div className="trouble-list">
              {copy.troubleItems.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="manual-section manual-support" id="support" aria-labelledby="support-title">
            <header className="manual-section-head">
              <span>09</span>
              <div><h2 id="support-title">{copy.sectionTitles.support}</h2><p>{copy.supportLead}</p></div>
            </header>
            <NumberedList items={copy.supportSteps} />
            <p className="manual-privacy-note">{copy.privacyNote}</p>
            <div className="manual-support-actions">
              <a className="button button-primary" href={issuesUrl}>{copy.issueButton}</a>
              <a className="button" href={downloadUrl}>{copy.downloadButton}</a>
            </div>
          </section>
        </article>
      </div>

      <footer className="site-footer manual-footer">
        <span>© 2026 Capswitch</span>
        <a href={`${publicBasePath}/${locale}/`}>{copy.homeLabel}</a>
        <a href="https://github.com/mumei/capswitch-core">Apache-2.0 Core ↗</a>
      </footer>
      <GoogleAnalytics {...siteCopy.analytics} />
    </main>
  );
}
