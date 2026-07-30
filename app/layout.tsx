import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.GITHUB_PAGES === "true"
    ? "https://capswitch.suruyatu.com"
    : "https://capswitch-app.donpok.chatgpt.site");

export const metadata: Metadata = {
  title: { default: "Capswitch", template: "%s · Capswitch" },
  description: "Caps LockをFunctionキー、音量、入力ソース、タイマーなどの操作に変えるmacOSメニューバーアプリ。",
  metadataBase: new URL(`${siteUrl.replace(/\/$/, "")}/`),
  openGraph: {
    title: "Capswitch — Caps Lockを、Macのコントロールキーへ",
    description: "押した結果は物理LEDと短いHUDで。Caps Lockを毎日使う操作に変えます。",
    type: "website", locale: "ja_JP",
    images: [{ url: "og.png", width: 1200, height: 630, alt: "Capswitch" }],
  },
  icons: {
    icon: [{ url: "favicon.png", type: "image/png", sizes: "64x64" }],
    shortcut: "favicon.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body className={`${geist.variable} ${geistMono.variable}`}>{children}</body></html>;
}
