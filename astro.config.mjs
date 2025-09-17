// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import alpinejs from '@astrojs/alpinejs';
import netlify from "@astrojs/netlify";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

import partytown from "@astrojs/partytown";

export default defineConfig({
    adapter: netlify(),
    experimental: {
        fonts: [
            {
                provider: fontProviders.google(),
                name: "Manrope",
                cssVariable: "--font-manrope",
                weights: ["200 800"],
            }
        ],
    },
    integrations: [alpinejs(), sitemap(), partytown()],
    site: 'https://atlasbroncos.com',
    vite: {
        plugins: [tailwindcss()]
    },
});