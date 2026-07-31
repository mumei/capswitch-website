import type { Metadata } from "next";
import { LocalizedHome } from "./localized-home";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "Capswitch — 使っていないCaps Lockを Media／Function切替に",
  description:
    "使っていないCaps Lockを、面倒なMedia／Function切替のスイッチとして活用できるmacOSメニューバーアプリ。10種類のモードから1つを選べます。",
};

export default function Home() {
  return <LocalizedHome publicBasePath={publicBasePath} />;
}
