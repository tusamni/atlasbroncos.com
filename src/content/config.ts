import { defineCollection, z } from 'astro:content';
import { cosmic } from "@/library/cosmic"

const media = defineCollection({
	loader: async () => {
		let allMedia = [];
		let skip = 0;
		const limit = 100;
		let hasMore = true;

		while (hasMore) {
			try {
				const response = await cosmic.media.find({ type: "image/jpeg" }).props("name, original_name, folder, url, imgix_url, width, height, alt_text, metadata").limit(limit).skip(skip);

				allMedia = allMedia.concat(response.media);

				// Check if there are more items to fetch
				if (response.media.length < limit) {
					hasMore = false;
				} else {
					skip += limit;
				}
			} catch (error) {
				console.error("Error fetching media:", error);
				hasMore = false;
			}
		}

		return allMedia.map((m) => ({
			id: m.name,
			name: m.original_name,
			nameBase: m.name.replace(/\.[^/.]+$/, ""),
			folder: m.folder,
			url: m.url,
			imgix_url: m.imgix_url,
			alt: m.alt_text,
			width: m.width,
			height: m.height,
			...m.metadata
		}));
	}
})

export const collections = { media };
