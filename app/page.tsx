import type { Metadata } from "next";
import { LocalizedHome } from "./localized-home";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "capswitch-website";
const publicBasePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (process.env.GITHUB_PAGES === "true" ? `/${repositoryName}` : "");

export const metadata: Metadata = {
  title: "Capswitch — よく使う操作を、Caps Lockに",
  description:
    "Caps Lockを押すだけで、Functionキー、音量、オーディオ出力、入力ソース、タイマーなどを操作できるmacOSメニューバーアプリ。",
};

export default function Home() {
  return <LocalizedHome publicBasePath={publicBasePath} />;
}
