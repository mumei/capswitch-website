import type { Metadata } from "next";
import { LocalizedHome } from "./localized-home";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Capswitch — よく使う操作を、Caps Lockに",
  description:
    "Caps Lockを押すだけで、Functionキー、音量、オーディオ出力、入力ソース、タイマーなどを操作できるmacOSメニューバーアプリ。",
};

export default function Home() {
  return <LocalizedHome publicBasePath={publicBasePath} />;
}
