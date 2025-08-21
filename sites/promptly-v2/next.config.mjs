import createMDX from '@next/mdx'

const withMDX = createMDX({
  // Add any MDX options here
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

export default withMDX(nextConfig)
