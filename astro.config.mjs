// @ts-check
import { defineConfig } from 'astro/config';

import alpinejs from '@astrojs/alpinejs';
import netlify from "@astrojs/netlify";
import sitemap from "@astrojs/sitemap";
import tailwind from '@astrojs/tailwind';

export default defineConfig({
	adapter: netlify(),
	integrations: [alpinejs(), sitemap(), tailwind({ applyBaseStyles: true })],
	site: 'https://atlasbroncos.com',
});