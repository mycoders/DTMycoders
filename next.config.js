/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript:{
    ignoreBuildErrors: true,

  },
  env:{
    NEXT_PUBLIC_SANITY_PROJECT_ID: 'bzzlj98w',
    NEXT_PUBLIC_SANITY_DATASET: 'production',
    NEXT_PUBLIC_SANITY_API_VERSION: '2023-05-03',
    THIRDWEB_AUTH_PRIVATE_KEY:"0xd5e2ac2d0405047fb9ac6de4a8e77773c68f8583ebe12a8e218c2c9df9d84b77",
    SANITY_SECRET_TOKEN:"skbSVDNdPKGH06VCrbm55EVlVUICQMUKp0H1oZXwkOzhZTxrTjC4QTx681htzvFS4V31caopSxquMo43vdwtzP50Q867mHcupYgwNC25roN281DrdUsUm4asafo8Ab7LtormsLl5rPByHBSZMLwkA3cuQzdXpmoObKGpCbT748rbbJpV2g2H",
    THIRDWEB_AUTH_DOMAIN:"localhost:3000",
    ADMIN_USER_ADDRESS:"0x2aCA2f2dF924cdc0AF7a424A9176702c61a441F6",
  },

  reactStrictMode: true,
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  }

}

module.exports = nextConfig
