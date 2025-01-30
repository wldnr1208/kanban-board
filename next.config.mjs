// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["k.kakaocdn.net"], // 카카오 프로필 이미지를 위한 설정
  },
};

export default nextConfig;
