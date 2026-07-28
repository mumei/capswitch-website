# Capswitch Website

Capswitch公式Webサイトのソースです。

## 開発

```sh
npm install
npm run dev
```

ローカルでは `http://localhost:3000` を開きます。

## 確認

```sh
npm run lint
npm test
npm run test:pages
```

## GitHub Pages

`main` ブランチへのpushで静的サイトをビルドし、GitHub Pagesへ自動公開します。

- 公開URL: https://mumei.github.io/capswitch-website/
- ワークフロー: `.github/workflows/pages.yml`

## 関連リポジトリ

- [Capswitch Core](https://github.com/mumei/capswitch-core) — 公開Core
- [Capswitch Releases](https://github.com/mumei/capswitch-releases) — 公式配布

Capswitchの商用ライセンス処理と公式アプリ層は、非公開リポジトリで管理しています。
