/** @type {import('tailwindcss').Config} */

export default {
	content: ['./src/**/*.{astro,html,js,ts,css,scss}'],
	plugins: [
		require("@tailwindcss/forms"),
		require("@tailwindcss/typography"),
		require("@tailwindcss/container-queries")
	],
}
