/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

export default {
	content: ['./src/**/*.{astro,html,js,ts,css,scss}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Inter", ...defaultTheme.fontFamily.sans],
				"inter-tight": ["Inter Tight"],
			},
			backgroundImage: {
				"radial-gradient":
					"radial-gradient(90% 100% at 50% 20%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%)",
			},
		},
	},
	plugins: [
		require("@tailwindcss/forms"),
		require("@tailwindcss/typography"),
		require("@tailwindcss/container-queries")
	],
}
