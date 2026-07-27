import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: { default: "Capswitch", template: "%s · Capswitch" },
  description: "Caps LockをFunctionキー、音量、入力ソース、タイマーなどの操作に変えるmacOSメニューバーアプリ。",
  metadataBase: new URL("https://capswitch-app.donpok.chatgpt.site"),
  openGraph: {
    title: "Capswitch — Caps Lockを、Macのコントロールキーへ",
    description: "押した結果は物理LEDと短いHUDで。Caps Lockを毎日使う操作に変えます。",
    type: "website", locale: "ja_JP",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Capswitch" }],
  },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body className={`${geist.variable} ${geistMono.variable}`}>{children}</body></html>;
}
