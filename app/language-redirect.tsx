"use client";

import { useEffect } from "react";
import { languages, resolveLocale } from "./i18n";

const localeStorageKey = "capswitch-site-language";

export function LanguageRedirect({ publicBasePath }: { publicBasePath: string }) {
  useEffect(() => {
    const saved = window.localStorage.getItem(localeStorageKey);
    const deviceLanguages = window.navigator.languages.length > 0
      ? window.navigator.languages
      : [window.navigator.language];
    const locale = resolveLocale(saved ? [saved, ...deviceLanguages] : deviceLanguages);
    window.location.replace(`${publicBasePath}/${locale}/`);
  }, [publicBasePath]);

  return (
    <main className="language-gateway">
      <div className="language-gateway-card">
        <span className="wordmark">Capswitch<span className="wordmark-dot" aria-hidden="true" /></span>
        <h1>Choose your language</h1>
        <p>端末の言語に合わせて移動します</p>
        <nav aria-label="Languages">
          {languages.map(({ code, label }) => (
            <a href={`${publicBasePath}/${code}/`} hrefLang={code} key={code}>{label}</a>
          ))}
        </nav>
      </div>
    </main>
  );
}
