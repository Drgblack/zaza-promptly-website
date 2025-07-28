/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve = config.resolve || {};
    config.resolve.alias = config.resolve.alias || {};
    config.resolve.alias['@zaza/shared-components'] = path.resolve(__dirname, '../../shared-components');
    config.resolve.alias['@/components'] = path.resolve(__dirname, './components');
    config.resolve.alias['@/hooks'] = path.resolve(__dirname, './hooks');
    config.resolve.alias['@/ui'] = path.resolve(__dirname, './components/ui');
    config.resolve.alias['@/lib'] = path.resolve(__dirname, './lib');
    return config;
  },
}

export default nextConfig
