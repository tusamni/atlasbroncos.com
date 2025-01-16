// @ts-check
import { defineConfig } from 'astro/config';

import alpinejs from '@astrojs/alpinejs';
import netlify from "@astrojs/netlify";
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
	adapter: netlify(),
	integrations: [alpinejs(), tailwind({ applyBaseStyles: true })],
	site: 'https://atlasbroncos.com',
});