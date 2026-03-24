import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const repoName = (process.env.GITHUB_PAGES_REPO ?? "outer-haven-framework").replace(
  /^\/+|\/+$/g,
  "",
);
const basePath = isGitHubPages ? `/${repoName}` : undefined;

const nextConfig: NextConfig = {
  transpilePackages: ["@outerhaven/framework"],
  output: isGitHubPages ? "export" : undefined,
  trailingSlash: isGitHubPages,
  images: {
    unoptimized: isGitHubPages,
  },
  basePath,
};

export default nextConfig;
