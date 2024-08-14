// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      // Remove existing SVG loader rule
      config.module.rules = config.module.rules.filter((rule) => {
        if (rule.test) {
          // Check if rule.test is a RegExp and matches .svg files
          return !(rule.test instanceof RegExp && rule.test.test('.svg'));
        }
        return true;
      });
  
      // Add SVGR loader for SVGs
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
  
      return config;
    },
  };
  
  export default nextConfig;
  