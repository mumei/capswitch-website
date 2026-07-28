import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "capswitch-website";
const pagesBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? `/${repositoryName}`;

const nextConfig: NextConfig = {
  ...(isGitHubPages
    ? {
        output: "export",
        basePath: pagesBasePath,
        assetPrefix: pagesBasePath,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
