"use client";

import { useEffect, useRef, useState } from "react";
import {
  campaignRegionalShareLabels,
  campaignShareMethods,
  type CampaignCopy,
  type CampaignShareMethod,
  type Locale,
} from "./i18n";

const campaignCode = "SHARE5";

type CopyShareMethod = "wechat" | "kakao" | "zalo";
type IntentShareMethod = Exclude<CampaignShareMethod, "native" | CopyShareMethod>;
type CopyState = "default" | "loading" | "success" | "error";
type SocialIconName = Exclude<CampaignShareMethod, "native"> | "share";

function SocialIcon({ name }: { name: SocialIconName }) {
  const commonProps = {
    className: "campaign-social-icon",
    viewBox: "0 0 24 24",
    "aria-hidden": true,
    focusable: false,
  } as const;

  if (name === "x") {
    return <svg {...commonProps}><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" /></svg>;
  }

  if (name === "threads") {
    return <svg {...commonProps} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="3.25" /><path d="M15.25 8.75V14c0 1.66 1.09 2.75 2.5 2.75 1.52 0 2.75-1.45 2.75-4.25 0-5.12-3.42-9-8.5-9" /></svg>;
  }

  if (name === "facebook") {
    return <svg {...commonProps}><path fill="currentColor" d="M13.5 22v-8h2.75l.41-3H13.5V9.08c0-.87.24-1.46 1.58-1.46h1.69V4.94a22.5 22.5 0 0 0-2.46-.13c-2.43 0-4.1 1.49-4.1 4.22V11H7.46v3h2.75v8h3.29Z" /></svg>;
  }

  if (name === "bluesky") {
    return <svg {...commonProps}><path fill="currentColor" d="M12 10.8c-1.09-2.11-4.05-6.05-6.8-7.99C2.57.94 1.56.47.9.77.14 1.12 0 2.28 0 2.97c0 .69.38 5.65.62 6.48.82 2.74 3.71 3.66 6.38 3.36-4.81.71-9.1 2.47-3.48 6.75C6.51 21.94 8.17 18.1 8.54 16c.37 2.1 2.02 5.94 5.01 2.56 5.61-6.35 1.33-8.11-3.49-6.75 2.67.3 5.57-.62 6.38-3.36.25-.83.63-5.79.63-6.48 0-.69-.14-1.86-.91-2.2-.66-.3-1.66.17-4.3 2.03C9.11 4.75 6.16 8.69 5.07 10.8" transform="translate(3.46 0) scale(.75 1)" /></svg>;
  }

  if (name === "line") {
    return <svg {...commonProps} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 11.2c0 4.08-3.58 7.38-8 7.38-.83 0-1.63-.12-2.38-.33L5.5 20.5l.9-3.48C4.92 15.67 4 13.62 4 11.2c0-4.08 3.58-7.38 8-7.38s8 3.3 8 7.38Z" /><path d="M8.2 11.2h.01M12 11.2h.01M15.8 11.2h.01" strokeWidth="2.5" /></svg>;
  }

  if (name === "whatsapp") {
    return <svg {...commonProps} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 11.8a8 8 0 0 1-11.8 7L4 20l1.2-4.1A8 8 0 1 1 20 11.8Z" /><path d="M9 7.8c.4 3.2 2 4.8 5.2 5.2l1-1.2 2 .8c-.2 1.6-1.2 2.4-2.8 2.4-4.6 0-8.4-3.8-8.4-8.4 0-1.6.8-2.6 2.4-2.8l.8 2-1.2 1Z" /></svg>;
  }

  if (name === "linkedin") {
    return <svg {...commonProps}><circle cx="6" cy="7" r="1.7" fill="currentColor" /><path fill="currentColor" d="M4.5 10h3v9h-3zm5 0h2.9v1.25c.7-.95 1.75-1.55 3.2-1.55 2.45 0 3.9 1.55 3.9 4.55V19h-3v-4.2c0-1.55-.55-2.4-1.8-2.4-1.4 0-2.2.95-2.2 2.75V19h-3z" /></svg>;
  }

  if (name === "weibo") {
    return <svg {...commonProps} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M17.5 9.5c1.8.6 3 1.8 3 3.3 0 2.7-3.7 4.9-8.3 4.9S4 15.5 4 12.8c0-2 2.1-3.8 5.1-4.5" /><path d="M13.5 8.5c2.5-1.4 4.7-.5 5.2 1.1M13.2 5.5c4-1.7 7.4-.1 8.1 2.7" /><circle cx="10.4" cy="12.7" r="2.1" /></svg>;
  }

  if (name === "qq") {
    return <svg {...commonProps} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="11" r="6" /><path d="M15.5 15.5 19 19M8 18c1.1 1 2.4 1.5 4 1.5s2.9-.5 4-1.5" /></svg>;
  }

  if (name === "naver") {
    return <svg {...commonProps}><path fill="currentColor" d="M4 4h5.1l5.8 8.2V4H20v16h-5.1L9.1 11.8V20H4Z" /></svg>;
  }

  if (name === "wechat" || name === "kakao" || name === "zalo") {
    return <svg {...commonProps} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 15.5c-1 .6-2.2.9-3.5.9-.8 0-1.6-.1-2.3-.4L5 18l.8-3A6.2 6.2 0 0 1 4 10.7C4 7.6 7.1 5 11 5s7 2.6 7 5.7c0 .4-.1.8-.2 1.2" /><path d="M20 15.2c0 2.1-2.1 3.8-4.8 3.8-.6 0-1.1-.1-1.6-.2L11 20l.6-2.1a3.4 3.4 0 0 1-1.2-2.7c0-2.1 2.1-3.8 4.8-3.8s4.8 1.7 4.8 3.8Z" /></svg>;
  }

  return <svg {...commonProps} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15V3m0 0L8 7m4-4 4 4" /><path d="M5 11v8h14v-8" /></svg>;
}

export function CampaignShareOffer({
  copy,
  locale,
  publicBasePath,
  checkoutUrl,
}: {
  copy: CampaignCopy;
  locale: Locale;
  publicBasePath: string;
  checkoutUrl: string;
}) {
  const [canNativeShare, setCanNativeShare] = useState(false);
  const [copyState, setCopyState] = useState<CopyState>("default");
  const couponDialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setCanNativeShare(typeof navigator.share === "function");
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function showCoupon() {
    couponDialogRef.current?.showModal();
  }

  function buildShareUrl(method: CampaignShareMethod) {
    const url = new URL(`${publicBasePath}/${locale}/`, window.location.origin);
    url.searchParams.set("utm_source", method);
    url.searchParams.set("utm_medium", "social");
    url.searchParams.set("utm_campaign", "share5");
    url.searchParams.set("utm_content", "site_share_unlock");
    return url.toString();
  }

  function shareLabel(method: CampaignShareMethod) {
    if (method === "x") return copy.shareX;
    if (method === "threads") return copy.shareThreads;
    if (method === "facebook") return copy.shareFacebook;
    if (method === "bluesky") return copy.shareBluesky;
    if (method === "line") return copy.shareLine;
    if (method === "native") return canNativeShare ? copy.shareOther : copy.copyLink;
    return campaignRegionalShareLabels[locale][method] ?? method;
  }

  function openShareIntent(method: IntentShareMethod) {
    showCoupon();
    const shareUrl = buildShareUrl(method);
    const text = `${copy.shareText}\n\n${shareUrl}`;
    const intentUrls: Record<IntentShareMethod, string> = {
      x: `https://x.com/intent/post?text=${encodeURIComponent(text)}`,
      threads: `https://www.threads.net/intent/post?text=${encodeURIComponent(text)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      bluesky: `https://bsky.app/intent/compose?text=${encodeURIComponent(text)}`,
      line: `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(copy.shareText)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      weibo: `https://service.weibo.com/share/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(copy.shareText)}`,
      qq: `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent("Capswitch")}&summary=${encodeURIComponent(copy.shareText)}`,
      naver: `https://share.naver.com/web/shareView?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(copy.shareText)}`,
    };
    const intentUrl = intentUrls[method];
    window.open(intentUrl, "_blank", "noopener,noreferrer");
  }

  async function copyForRegionalApp(method: CopyShareMethod) {
    showCoupon();
    const url = buildShareUrl(method);
    try {
      await navigator.clipboard.writeText(`${copy.shareText}\n\n${url}`);
    } catch {
      // The coupon remains unlocked even when clipboard access is unavailable.
    }
  }

  async function shareOrCopy() {
    showCoupon();
    const url = buildShareUrl("native");

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: "Capswitch", text: copy.shareText, url });
      } catch {
        // The share action itself unlocks the coupon, even when the share sheet is dismissed.
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(`${copy.shareText}\n\n${url}`);
    } catch {
      // The coupon remains unlocked even when clipboard access is unavailable.
    }
  }

  async function copyCoupon() {
    setCopyState("loading");
    try {
      await navigator.clipboard.writeText(campaignCode);
      setCopyState("success");
      window.setTimeout(() => setCopyState("default"), 2_000);
    } catch {
      setCopyState("error");
    }
  }

  return (
    <aside className="campaign-offer" aria-labelledby="campaign-offer-title">
      <div className="campaign-message">
        <p className="campaign-kicker">{copy.kicker}</p>
        <h3 id="campaign-offer-title">{copy.title}</h3>
        <p className="campaign-description">{copy.description}</p>
      </div>

      <div className="campaign-share-actions" aria-label={copy.shareActionsLabel}>
        {campaignShareMethods[locale].map((method) => (
          <button
            className="button campaign-share-button"
            type="button"
            key={method}
            onClick={() => {
              if (method === "native") {
                void shareOrCopy();
              } else if (method === "wechat" || method === "kakao" || method === "zalo") {
                void copyForRegionalApp(method);
              } else {
                openShareIntent(method);
              }
            }}
          >
            <SocialIcon name={method === "native" ? "share" : method} />
            {shareLabel(method)}
          </button>
        ))}
      </div>

      <dialog
        ref={couponDialogRef}
        className="campaign-dialog"
        aria-labelledby="campaign-dialog-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) couponDialogRef.current?.close();
        }}
      >
        <div className="campaign-dialog-panel">
          <button className="campaign-dialog-close" type="button" onClick={() => couponDialogRef.current?.close()}>
            {copy.close}
          </button>
          <div className="campaign-code-panel" aria-live="polite">
            <h3 id="campaign-dialog-title">{copy.codeLabel}</h3>
            <code>{campaignCode}</code>
            <p>{copy.codeHelp}</p>
            <div className="campaign-code-actions">
              <button
                className="button campaign-copy-button"
                type="button"
                data-state={copyState}
                disabled={copyState === "loading"}
                onClick={() => void copyCoupon()}
              >
                {copyState === "loading" && copy.copying}
                {copyState === "success" && copy.copied}
                {copyState === "error" && copy.copyFailed}
                {copyState === "default" && copy.copyCode}
              </button>
              <a className="button button-primary" href={checkoutUrl}>{copy.checkout}</a>
            </div>
          </div>
        </div>
      </dialog>
    </aside>
  );
}
