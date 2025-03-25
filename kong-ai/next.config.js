/** @type {import('next').NextConfig} */
import nextPwa from "next-pwa";

const withPwa = nextPwa({
  dest: "public",
  swSrc: "public/custom-service-worker.js", // no leading slash
  register: true,
  skipWaiting: true,
  buildExcludes: [/middleware-manifest.json$/, /app-build-manifest.json$/],
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = withPwa({
  reactStrictMode: true,
});

export default nextConfig;
