/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
	content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,css,scss}'],
	theme: {
		screens: {
			xs: "480px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
		},
		extend: {
			colors: {
				g: {
					50: "#ebebeb",
					75: "#adadad",
					100: "#8a8a8a",
					200: "#585858",
					300: "#363636",
					400: "#262626",
					500: "#212121",
				},
				w: {
					50: "#fdfdfd",
					75: "#f5f5f5",
					100: "#f1f1f1",
					200: "#eaeaea",
					300: "#e6e6e6",
					400: "#a1a1a1",
					500: "#8c8c8c",
				},
			},
			zIndex: {
				1: "1",
				2: "2",
				3: "3",
				4: "4",
				5: "5",
			},
			spacing: {
				0.25: "0.0625rem",
				0.75: "0.1875rem",
				4.5: "1.125rem",
				5.5: "1.375rem",
				6.5: "1.75rem",
				7.5: "1.875rem",
				8.5: "2.125rem",
				9.5: "2.375rem",
				13: "3.25rem",
				15: "3.75rem",
				17: "4.25rem",
				18: "4.5rem",
				19: "4.75rem",
				21: "5.25rem",
				22: "5.5rem",
				23: "5.75rem",
				25: "6.25rem",
				26: "6.5rem",
				30: "7.5rem",
				34: "8.5rem",
				38: "9.5rem",
				42: "10.5rem",
				54: "13.5rem",
				58: "14.5rem",
			},
			transitionDuration: {
				DEFAULT: "200ms",
			},
			transitionTimingFunction: {
				DEFAULT: "linear",
			},
			borderWidth: {
				DEFAULT: "0.0625rem",
				0: "0",
				2: "0.125rem",
				3: "0.1875rem",
				4: "0.25rem",
				8: "0.5rem",
			},
			fontFamily: {
				sans: ["Inter", ...defaultTheme.fontFamily.sans],
				"inter-tight": ["Inter Tight"],
			},
			fontSize: {
				0: ["0", "0"],
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
