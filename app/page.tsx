import type { Metadata } from "next";
import { LanguageRedirect } from "./language-redirect";
import { rootMetadata } from "./site-metadata";

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = rootMetadata;

export default function Home() {
  return <LanguageRedirect publicBasePath={publicBasePath} />;
}
