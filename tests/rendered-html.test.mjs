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
  assert.match(html, /あまり使わない/);
  assert.match(html, /Caps Lockを活用/);
  assert.match(html, /Caps Lockを他の操作に！/);
  assert.match(html, /Caps LockのLEDもフィードバックに活用！/);
  assert.match(html, /LEDで状態を表示/);
  assert.match(html, /通常のCaps Lockも使えます。/);
  assert.match(html, /設定で回数を3〜5回から選び/);
  assert.match(html, /通常のCaps LockをON／OFFできます。/);
  assert.doesNotMatch(html, /通常のCaps Lockも使用可能/);
  assert.match(html, /favicon\.png/);
  assert.doesNotMatch(html, /favicon\.svg/);
  assert.doesNotMatch(html, /macOS menu bar app/);
  assert.match(html, /LIVE DEMO/);
  assert.match(html, /10 modes/);
  assert.match(html, /状態遷移: メディア操作、単押しでFunctionキー入力/);
  assert.match(html, /単押し(?:<!-- -->)? → 最初の状態へ/);
  assert.doesNotMatch(html, /↺/);
  assert.match(html, /停止中は連打＋1分／長押し−1分/);
  assert.match(html, /14日間試す/);
  assert.match(html, /https:\/\/github\.com\/mumei\/capswitch-releases\/releases/);
  assert.match(html, /https:\/\/capswitch-app\.donpok\.chatgpt\.site\/og\.png/);
  assert.match(html, /aria-live="polite"/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site/);
});

test("keeps the Hallmark and responsive contracts in source", async () => {
  const [page, demo, css, tokens, layout] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
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
  assert.match(css, /\.modes-section \.section-intro \{ max-width: 46rem; \}/);
  assert.match(css, /@media \(min-width: 40rem\)[\s\S]*?\.tour-frame \{[\s\S]*?align-items: start/);
  assert.match(css, /\.signal-line \{[\s\S]*?align-self: start;[\s\S]*?margin-top: calc\(var\(--space-lg\) \+ var\(--text-sm\) \+ var\(--text-md\)\)/);
  assert.doesNotMatch(css, /\.modes-section \.section-intro \{[\s\S]*?margin-inline-start:/);
  assert.match(page, /CapswitchDemo/);
  assert.match(demo, /aria-pressed/);
  assert.match(layout, /lang="ja"/);
});
