import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/html/index.html", destination: "/", permanent: true },
      { source: "/html/company.html", destination: "/company", permanent: true },
      { source: "/html/service.html", destination: "/service", permanent: true },
      { source: "/html/prices.html", destination: "/prices", permanent: true },
      { source: "/html/clients.html", destination: "/clients", permanent: true },
    ];
  },
};

export default nextConfig;
