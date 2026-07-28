import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const output = new URL("../out/", import.meta.url);

test("exports a GitHub Pages-ready static site", async () => {
  const html = await readFile(new URL("index.html", output), "utf8");

  assert.match(html, /\/capswitch-website\/_next\//);
  assert.match(html, /\/capswitch-website\/favicon\.png/);
  assert.match(html, /\/capswitch-website\/capswitch-settings\.png/);
  assert.match(html, /\/capswitch-website\/capswitch-menu\.png/);
  assert.match(html, /https:\/\/mumei\.github\.io\/capswitch-website\/og\.png/);
  assert.doesNotMatch(html, /(?:href|src)="\/_next\//);

  await Promise.all([
    access(new URL("favicon.png", output)),
    access(new URL("capswitch-settings.png", output)),
    access(new URL("capswitch-menu.png", output)),
    access(new URL("404.html", output)),
  ]);
});
