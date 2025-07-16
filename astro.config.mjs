// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import alpinejs from '@astrojs/alpinejs';
import netlify from "@astrojs/netlify";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	adapter: netlify(),
	experimental: {
		fonts: [
			{
				provider: fontProviders.google(),
				name: "Inter",
				cssVariable: "--font-inter",
				weights: ["100 900"],
			},
			{
				provider: fontProviders.google(),
				name: "Manrope",
				cssVariable: "--font-manrope",
				weights: ["200 800"],
			},
			{
				provider: fontProviders.google(),
				name: "Noto Sans",
				cssVariable: "--font-heading",
				weights: ["100 900"],
			},
		],
	},
	integrations: [alpinejs(), sitemap()],
	site: 'https://atlasbroncos.com',
	vite: {
		plugins: [tailwindcss()]
	},
});