const path = require("path");

// Load the .env file for local development
// .env.development.local by default
require("dotenv").config({
  path: path.resolve(process.cwd(), ".env.development.local"),
});

let backendUrl, imageDomain;
if (process.env.WPGRAPHQL_URL === undefined) {
  backendUrl = `https://${process.env.PANTHEON_CMS_ENDPOINT}`;
} else {
  backendUrl = process.env.WPGRAPHQL_URL;
}
if (process.env.IMAGE_DOMAIN === undefined) {
  imageDomain = backendUrl.replace(/^https:\/\//, "");
  imageDomain = imageDomain.replace("/wp/graphql", "");
} else {
  imageDomain = process.env.IMAGE_DOMAIN;
}
// remove trailing slash if it exists
imageDomain = imageDomain.replace(/\/$/, "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    backendUrl: backendUrl,
  },
  images: {
    domains: [imageDomain],
  },
};

module.exports = nextConfig;