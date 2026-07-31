import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { resolveLocale } from "../app/i18n.ts";

async function render(pathname = "/ja/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("selects the first supported browser language", () => {
  assert.equal(resolveLocale(["pt-BR", "fr-FR"]), "fr");
  assert.equal(resolveLocale(["ja-JP", "en-US"]), "ja");
  assert.equal(resolveLocale(["zh-TW"]), "zh-Hant");
  assert.equal(resolveLocale(["zh-CN"]), "zh-Hans");
  assert.equal(resolveLocale(["pt-BR"]), "en");
});

test("server-renders the Capswitch official homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="en">/);
  assert.match(html, /class="hero-title-line">使っていないキーで/);
  assert.match(html, /class="hero-title-line">面倒を減らす/);
  assert.match(html, /Caps Lockを Media／Function切替のスイッチへ/);
  assert.doesNotMatch(html, /そのCaps Lock/);
  assert.doesNotMatch(html, /使っていますか？/);
  assert.doesNotMatch(html, /Caps Lockを他の操作に！/);
  assert.doesNotMatch(html, /Caps LockのLEDもフィードバックに活用！/);
  assert.match(html, /class="wordmark-icon"/);
  assert.ok(
    html.indexOf("<h1>") < html.indexOf('class="hero-lede"'),
    "hero headline should appear before its supporting copy",
  );
  assert.match(html, /LEDで状態を表示/);
  assert.match(html, /状態の種類/);
  assert.match(html, /LEDの表し方/);
  assert.match(html, /対応するモード/);
  assert.match(html, /通常のCaps Lockも使えます/);
  assert.doesNotMatch(html, /通常のCaps Lockも使えます。/);
  assert.match(html, /3・4・5回から選ぶ/);
  assert.match(html, /選んだ回数だけ連打/);
  assert.match(html, /Caps LockをON／OFF/);
  assert.match(html, /class="caps-lock-section"/);
  assert.doesNotMatch(html, /実際の画面。/);
  assert.match(html, /Caps Lockを使っていなかった/);
  assert.match(html, /Fnを押しながらの操作が面倒だった/);
  assert.match(html, /Caps Lockをスイッチにした/);
  assert.match(html, /出番のないキーとLEDを 有効活用したい/);
  assert.match(html, /F1〜F12とメディア操作を使い分けるたび Fnを押す手間をなくしたい/);
  assert.match(html, /Fn \+ F1–F12/);
  assert.doesNotMatch(html, /Media／Function切替が面倒だった/);
  assert.doesNotMatch(html, /F1〜F12を使うたびの切替を なくしたい/);
  assert.match(html, /押すだけで切替 LEDで状態を確認/);
  assert.doesNotMatch(html, /考えました/);
  assert.doesNotMatch(html, /確認できます/);
  assert.match(html, /Caps Lockが スイッチになるまで/);
  assert.match(html, /Functionキー切替だけじゃない/);
  assert.match(html, /10の役割から、1つ選べます/);
  assert.doesNotMatch(html, /モードを、1つ選ぶ/);
  assert.match(html, /class="mode-summary"/);
  assert.match(html, /class="mode-heading"/);
  assert.match(html, /class="origin-story"/);
  assert.match(html, /class="origin-visual origin-visual-unused"/);
  assert.match(html, /class="origin-visual origin-visual-solution"/);
  assert.doesNotMatch(html, /通常のCaps Lockも使用可能/);
  assert.match(html, /favicon\.png/);
  assert.doesNotMatch(html, /favicon\.svg/);
  assert.doesNotMatch(html, /macOS menu bar app/);
  assert.doesNotMatch(html, /LIVE DEMO/);
  assert.doesNotMatch(html, /Caps Lockを押して切り替え/);
  assert.match(html, /状態遷移: メディア操作, 単押し: Functionキー入力/);
  assert.match(html, /単押し[\s\S]{0,80}最初の状態へ/);
  assert.doesNotMatch(html, /↺/);
  assert.match(html, /停止中は連打＋1分／長押し−1分/);
  assert.match(html, />ダウンロード<\/a>/);
  assert.doesNotMatch(html, /14日間試す/);
  assert.doesNotMatch(html, /公開Coreを見る/);
  assert.match(html, /macOS 14以降/);
  assert.doesNotMatch(html, /macOS 14以降 · 14日間無料/);
  assert.match(html, /https:\/\/github\.com\/mumei\/capswitch-releases\/releases/);
  assert.match(html, /https:\/\/buy\.polar\.sh\/polar_cl_UScYXNp1h6aIsYMRZ9aBBZagKU1JAxn0gSxpo3n24fE/);
  assert.match(html, /Capswitchを購入 — \$14\.99/);
  assert.doesNotMatch(html, /正式な購入リンクは公開準備中/);
  assert.match(html, /https:\/\/capswitch-app\.donpok\.chatgpt\.site\/og\.png/);
  assert.match(html, /property="og:locale" content="ja_JP"/);
  assert.match(html, /rel="canonical" href="https:\/\/capswitch-app\.donpok\.chatgpt\.site\/ja\/"/);
  assert.match(html, /hrefLang="en-US" href="https:\/\/capswitch-app\.donpok\.chatgpt\.site\/en\/"/);
  assert.match(html, /name="twitter:card" content="summary_large_image"/);
  assert.match(html, /aria-live="polite"/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
});

test("server-renders a language-aware root gateway", async () => {
  const response = await render("/");
  const html = await response.text();

  assert.match(html, /Choose your language/);
  assert.match(html, /href="\/ja\/"/);
  assert.match(html, /href="\/en\/"/);
  assert.match(html, /property="og:locale" content="en_US"/);
  assert.match(html, /hrefLang="x-default" href="https:\/\/capswitch-app\.donpok\.chatgpt\.site\/"/);
});

test("keeps the Hallmark and responsive contracts in source", async () => {
  const [page, localePage, localizedHome, campaignOffer, redirect, i18n, demo, css, tokens, layout, metadata, analytics] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/[locale]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/localized-home.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/campaign-share-offer.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/language-redirect.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/i18n.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/capswitch-demo.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../tokens.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/site-metadata.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/google-analytics.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(tokens, /^\/\* Hallmark · macrostructure: workbench · genre: modern-minimal/);
  assert.match(tokens, /@media \(prefers-color-scheme: dark\)/);
  assert.match(tokens, /--color-paper: oklch\(15\.5% 0\.018 252\)/);
  assert.match(tokens, /--color-on-graphite:/);
  assert.match(css, /overflow-x:\s*clip/);
  assert.match(css, /color-scheme:\s*light dark/);
  assert.match(css, /\.demo-panel \{[\s\S]*?color: var\(--color-on-graphite\)/);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /minmax\(0,\s*1fr\)/);
  assert.match(css, /white-space:\s*nowrap/);
  assert.match(css, /:focus-visible/);
  assert.match(css, /\.wordmark-icon \{[\s\S]*?width: 2rem; height: 2rem;[\s\S]*?background-size: contain/);
  assert.match(localizedHome, /backgroundImage: .*publicBasePath.*favicon\.png/);
  assert.match(css, /\.hero-lede \{[\s\S]*?margin-top: var\(--space-lg\)/);
  assert.match(css, /\.hero-title-line \{ display: block; white-space: nowrap; \}/);
  assert.match(css, /@media \(max-width: 39\.99rem\)[\s\S]*?h1 \{ max-width: none; font-size: clamp\(1\.75rem, 8vw, 2\.75rem\); \}/);
  assert.match(css, /html:lang\(ja\) h1[\s\S]*?font-size: clamp\(2rem, 9\.4vw, 2\.75rem\)/);
  assert.match(css, /\.led-table \{ display: grid; gap: var\(--space-sm\); \}/);
  assert.match(css, /\.led-row \{[\s\S]*?border-radius: var\(--radius-md\)/);
  assert.match(css, /\.modes-section \.section-intro \{ max-width: 46rem; \}/);
  assert.match(css, /\.origin-story \{[\s\S]*?display: grid/);
  assert.match(css, /\.origin-card \{[\s\S]*?grid-template-rows: auto 1fr/);
  assert.match(css, /\.origin-key-muted::after/);
  assert.match(css, /@media \(min-width: 60rem\)[\s\S]*?\.origin-story \{ grid-template-columns: repeat\(3, minmax\(0, 1fr\)\)/);
  assert.match(css, /html:lang\(ja\) \.price-section h2 \{ white-space: nowrap; \}/);
  assert.match(css, /\.mode-row:nth-child\(odd\) \{ background: var\(--color-panel\); \}/);
  assert.match(css, /\.mode-summary \{[\s\S]*?display: grid/);
  assert.doesNotMatch(css, /\.modes-section \.section-intro \{[\s\S]*?margin-inline-start:/);
  assert.match(page, /LanguageRedirect/);
  assert.match(localePage, /LocalizedHome/);
  assert.match(localePage, /generateStaticParams/);
  assert.match(localizedHome, /CapswitchDemo/);
  assert.match(localizedHome, /CampaignShareOffer/);
  assert.match(campaignOffer, /const campaignCode = "SHARE5"/);
  assert.match(campaignOffer, /Date\.parse\("2026-08-07T15:00:00Z"\)/);
  assert.match(campaignOffer, /window\.location\.hostname === "localhost"/);
  assert.match(campaignOffer, /window\.location\.hostname === "127\.0\.0\.1"/);
  assert.match(campaignOffer, /couponDialogRef\.current\?\.showModal\(\)/);
  assert.match(campaignOffer, /<dialog/);
  assert.match(campaignOffer, /https:\/\/x\.com\/intent\/post/);
  assert.match(campaignOffer, /https:\/\/www\.threads\.net\/intent\/post/);
  assert.match(campaignOffer, /https:\/\/www\.facebook\.com\/sharer\/sharer\.php/);
  assert.match(campaignOffer, /https:\/\/bsky\.app\/intent\/compose/);
  assert.match(campaignOffer, /https:\/\/social-plugins\.line\.me\/lineit\/share/);
  assert.match(campaignOffer, /https:\/\/wa\.me\/\?text=/);
  assert.match(campaignOffer, /https:\/\/www\.linkedin\.com\/sharing\/share-offsite/);
  assert.match(campaignOffer, /https:\/\/service\.weibo\.com\/share\/share\.php/);
  assert.match(campaignOffer, /https:\/\/connect\.qq\.com\/widget\/shareqq\/index\.html/);
  assert.match(campaignOffer, /https:\/\/share\.naver\.com\/web\/shareView/);
  assert.match(campaignOffer, /copyForRegionalApp/);
  assert.match(campaignOffer, /navigator\.share/);
  assert.match(campaignOffer, /aria-live="polite"/);
  assert.match(i18n, /共有して通常14\.99 USDから5 USD割引になるコードをゲットしよう/);
  assert.match(i18n, /Capswitchをチェック！\\nMacの使っていないCaps Lockを\\n便利な切替キーに変えられるよ！\\n\\n#Capswitch/);
  assert.doesNotMatch(i18n, /毎日の面倒な切り替えを、ひとつのキーでもっと簡単に/);
  assert.match(i18n, /ja: \["x", "threads", "line", "facebook", "bluesky", "native"\]/);
  assert.match(i18n, /"zh-Hans": \["wechat", "weibo", "qq", "native"\]/);
  assert.match(i18n, /ko: \["kakao", "naver", "threads", "x", "facebook", "native"\]/);
  assert.match(i18n, /vi: \["zalo", "facebook", "whatsapp", "threads", "x", "native"\]/);
  assert.match(css, /\.campaign-offer \{/);
  assert.match(css, /\.campaign-dialog::backdrop/);
  assert.match(css, /\.campaign-copy-button\[data-state="success"\]/);
  assert.match(css, /\.campaign-copy-button\[data-state="error"\]/);
  assert.match(localizedHome, /window\.location\.assign/);
  assert.match(localizedHome, /new URLSearchParams\(window\.location\.search\)\.get\("preview"\)/);
  assert.match(localizedHome, /nextUrl\.searchParams\.set\("preview", preview\)/);
  assert.match(redirect, /localStorage\.getItem\(localeStorageKey/);
  assert.match(redirect, /window\.location\.replace/);
  assert.match(analytics, /G-M1WVYGYPPL/);
  assert.match(analytics, /consent === "granted"/);
  assert.match(analytics, /capswitch-analytics-consent/);
  assert.match(localizedHome, /document\.documentElement\.lang = locale/);
  assert.match(localizedHome, /origin-visual-unused/);
  assert.match(localizedHome, /origin-visual-friction/);
  assert.match(localizedHome, /origin-visual-solution/);
  assert.match(i18n, /zh-Hans/);
  assert.match(i18n, /zh-Hant/);
  for (const locale of ["ja", "en", "de", "fr", "ko", "es", "it", "vi", "th"]) {
    assert.match(i18n, new RegExp(`(?:^|\\n)  ${locale}: \\{`));
  }
  assert.match(demo, /getModifierState\("CapsLock"\)/);
  assert.match(demo, /addEventListener\("keydown", handleCapsLock\)/);
  assert.match(demo, /addEventListener\("keyup", handleCapsLock\)/);
  assert.match(demo, /event\.type === "keydown" \|\| lastCapsLockState\.current !== capsLockState/);
  assert.match(demo, /aria-pressed/);
  assert.match(demo, /event\.key !== "CapsLock"/);
  assert.match(demo, /hudVisible/);
  assert.match(layout, /lang="en"/);
  assert.match(metadata, /alternateLocale/);
  assert.match(metadata, /"x-default"/);
});
