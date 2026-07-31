import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const output = new URL("../out/", import.meta.url);
const locales = [
  "ja", "en", "de", "zh-Hans", "zh-Hant", "fr", "ko", "es", "it", "vi", "th",
];

async function readPngSize(url) {
  const png = await readFile(url);
  return {
    width: png.readUInt32BE(16),
    height: png.readUInt32BE(20),
  };
}

test("exports a GitHub Pages-ready static site", async () => {
  const html = await readFile(new URL("index.html", output), "utf8");

  assert.match(html, /(?:href|src)="\/_next\//);
  assert.match(html, /(?:\/|\")favicon\.png/);
  assert.match(html, /https:\/\/capswitch\.suruyatu\.com\/og\.png/);
  assert.match(html, /href="\/ja\/"/);
  assert.match(html, /href="\/en\/"/);
  assert.doesNotMatch(html, /\/capswitch-website\//);

  await Promise.all([
    access(new URL("favicon.png", output)),
    ...locales.flatMap((locale) => [
      access(new URL(`screenshots/${locale}/capswitch-settings.png`, output)),
      access(new URL(`screenshots/${locale}/capswitch-menu.png`, output)),
    ]),
    access(new URL("404.html", output)),
  ]);

  for (const locale of locales) {
    const localizedHtml = await readFile(new URL(`${locale}/index.html`, output), "utf8");
    assert.match(localizedHtml, new RegExp(`https://capswitch\\.suruyatu\\.com/${locale}/`));
    assert.match(localizedHtml, /class="origin-story"/);
    assert.match(localizedHtml, /class="origin-visual origin-visual-solution"/);
    assert.match(localizedHtml, /https:\/\/buy\.polar\.sh\/polar_cl_UScYXNp1h6aIsYMRZ9aBBZagKU1JAxn0gSxpo3n24fE/);
    assert.match(localizedHtml, /property="og:locale"/);
    assert.match(localizedHtml, /property="og:locale:alternate"/);
    assert.match(localizedHtml, /name="twitter:card" content="summary_large_image"/);

    assert.deepEqual(
      await readPngSize(new URL(`screenshots/${locale}/capswitch-settings.png`, output)),
      { width: 1936, height: 1360 },
    );
    assert.deepEqual(
      await readPngSize(new URL(`screenshots/${locale}/capswitch-menu.png`, output)),
      { width: 680, height: 370 },
    );
  }
});
