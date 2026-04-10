import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Enable static export for Vercel (optional — remove if using SSR features)
};

export default withNextIntl(nextConfig);
