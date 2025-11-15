import type { NextConfig } from 'next';

const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

module.exports = withVanillaExtract(nextConfig);
