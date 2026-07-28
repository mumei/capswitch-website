import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the Capswitch official homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="ja">/);
  assert.match(html, /class="hero-title-line">よく使う操作を、/);
  assert.match(html, /class="hero-title-line">Caps Lockに/);
  assert.match(html, /LEDで状態も確認できます/);
  assert.doesNotMatch(html, /あまり使わない/);
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
  assert.match(html, /設定でモードを選ぶ/);
  assert.match(html, /Caps Lockで操作する/);
  assert.match(html, /メニューバーから管理する/);
  assert.match(html, /モードを、1つ選ぶ/);
  assert.doesNotMatch(html, /モードを、1つ選ぶ。/);
  assert.match(html, /class="mode-summary"/);
  assert.match(html, /class="mode-heading"/);
  assert.match(html, /capswitch-settings\.png/);
  assert.match(html, /capswitch-menu\.png/);
  assert.doesNotMatch(html, /通常のCaps Lockも使用可能/);
  assert.match(html, /favicon\.png/);
  assert.doesNotMatch(html, /favicon\.svg/);
  assert.doesNotMatch(html, /macOS menu bar app/);
  assert.doesNotMatch(html, /LIVE DEMO/);
  assert.doesNotMatch(html, /Caps Lockを押して切り替え/);
  assert.match(html, /10モード/);
  assert.match(html, /状態遷移: メディア操作, 単押し: Functionキー入力/);
  assert.match(html, /単押し[\s\S]{0,80}最初の状態へ/);
  assert.doesNotMatch(html, /↺/);
  assert.match(html, /停止中は連打＋1分／長押し−1分/);
  assert.match(html, /14日間試す/);
  assert.match(html, /macOS 14以降/);
  assert.doesNotMatch(html, /macOS 14以降 · 14日間無料/);
  assert.match(html, /https:\/\/github\.com\/mumei\/capswitch-releases\/releases/);
  assert.match(html, /https:\/\/capswitch-app\.donpok\.chatgpt\.site\/og\.png/);
  assert.match(html, /aria-live="polite"/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
});

test("keeps the Hallmark and responsive contracts in source", async () => {
  const [page, localizedHome, i18n, demo, css, tokens, layout] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/localized-home.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/i18n.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/capswitch-demo.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../tokens.css", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(tokens, /^\/\* Hallmark · macrostructure: workbench · genre: modern-minimal/);
  assert.match(css, /overflow-x:\s*clip/);
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
  assert.match(css, /@media \(min-width: 40rem\)[\s\S]*?\.tour-chapter \{[\s\S]*?grid-template-columns: minmax\(12rem, \.6fr\) minmax\(0, 1\.4fr\)/);
  assert.match(css, /\.tour-chapter-menu \.tour-screenshot \{ width: min\(100%, 32rem\); justify-self: start; \}/);
  assert.doesNotMatch(css, /\.tour-chapter-menu \.tour-screenshot \{ order: -1; \}/);
  assert.match(css, /\.tour-screenshot img \{[\s\S]*?width: 100%; height: auto/);
  assert.match(css, /html:lang\(ja\) \.price-section h2 \{ white-space: nowrap; \}/);
  assert.match(css, /\.mode-row:nth-child\(odd\) \{ background: var\(--color-panel\); \}/);
  assert.match(css, /\.mode-summary \{[\s\S]*?display: grid/);
  assert.doesNotMatch(css, /\.modes-section \.section-intro \{[\s\S]*?margin-inline-start:/);
  assert.match(page, /LocalizedHome/);
  assert.match(localizedHome, /CapswitchDemo/);
  assert.match(localizedHome, /localStorage\.setItem\(localeStorageKey/);
  assert.match(localizedHome, /document\.documentElement\.lang = locale/);
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
  assert.match(layout, /lang="ja"/);
});
