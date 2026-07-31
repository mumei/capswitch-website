"use client";

import Script from "next/script";
import { useEffect, useState } from "react";

const measurementId = "G-M1WVYGYPPL";
const consentStorageKey = "capswitch-analytics-consent";

type Consent = "unknown" | "granted" | "denied";

export function GoogleAnalytics({
  message,
  allow,
  decline,
}: {
  message: string;
  allow: string;
  decline: string;
}) {
  const [consent, setConsent] = useState<Consent>("unknown");

  useEffect(() => {
    const saved = window.localStorage.getItem(consentStorageKey);
    if (saved === "granted" || saved === "denied") setConsent(saved);
  }, []);

  function choose(nextConsent: Exclude<Consent, "unknown">) {
    window.localStorage.setItem(consentStorageKey, nextConsent);
    setConsent(nextConsent);
  }

  return (
    <>
      {consent === "unknown" && (
        <aside className="analytics-consent" aria-live="polite">
          <p>{message}</p>
          <div>
            <button className="button button-primary" type="button" onClick={() => choose("granted")}>
              {allow}
            </button>
            <button className="button" type="button" onClick={() => choose("denied")}>
              {decline}
            </button>
          </div>
        </aside>
      )}
      {consent === "granted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${measurementId}');
            `}
          </Script>
        </>
      )}
    </>
  );
}
