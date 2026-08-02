import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    // Real CDN domains (Instagram/Vicious OS storage) get added here once
    // live images replace the placeholder blocks.
    remotePatterns: [],
  },
};

export default withNextIntl(nextConfig);
